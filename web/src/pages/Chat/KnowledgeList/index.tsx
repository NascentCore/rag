import { SettingOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import { detectDeviceType } from '@/utils';
import AddKnowledge from './AddKnowledge';
import PopoverContent from './PopoverContent';
const deviceType = detectDeviceType();
const Index: React.FC<{ setDrawerOpen?: any }> = ({ setDrawerOpen }) => {
  const { knowledgeList, knowledgeListSelect, setKnowledgeListSelect } = useModel('chat');

  const knowledgeItemHandleClick = (item: any) => {
    console.log('click knowledgeListItem', item.kb_id);
    if (knowledgeListSelect.includes(item.kb_id)) {
      const _selectList = knowledgeListSelect.filter((id: any) => id !== item.kb_id);
      setKnowledgeListSelect(_selectList);
    } else {
      const _selectList = [...knowledgeListSelect];
      _selectList.push(item.kb_id);
      setKnowledgeListSelect(_selectList);
    }
  };

  return (
    <div className={styles.knowledgeList}>
      <AddKnowledge />
      {knowledgeList
        ?.filter((item: any) => !item.kb_id.includes('_FAQ'))
        ?.map((item: any) => {
          return (
            <>
              {deviceType === 'pc' && (
                <Popover
                  key={item.kb_id}
                  placement="right"
                  color={'#333647'}
                  overlayInnerStyle={{ padding: 10, backgroundColor: '#333647' }}
                  content={<PopoverContent item={item} setDrawerOpen={setDrawerOpen} />}
                  title={null}
                  trigger="hover"
                >
                  <div
                    className={classNames(
                      styles.knowledgeListItem,
                      knowledgeListSelect.includes(item.kb_id) && styles.knowledgeListItem_select,
                    )}
                    onClick={() => knowledgeItemHandleClick(item)}
                  >
                    {item.kb_name}
                  </div>
                </Popover>
              )}

              {deviceType === 'mobile' && (
                <>
                  <div
                    className={classNames(
                      styles.knowledgeListItem,
                      knowledgeListSelect.includes(item.kb_id) && styles.knowledgeListItem_select,
                    )}
                    onClick={() => knowledgeItemHandleClick(item)}
                  >
                    {item.kb_name}
                    <Popover
                      key={item.kb_id}
                      placement="right"
                      color={'#333647'}
                      overlayInnerStyle={{ padding: 10, backgroundColor: '#333647' }}
                      content={<PopoverContent item={item} setDrawerOpen={setDrawerOpen} />}
                      title={null}
                      trigger={'click'}
                    >
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        type={'text'}
                        style={{ marginLeft: 'auto', color: '#fff' }}
                        icon={<SettingOutlined />}
                      ></Button>
                    </Popover>
                  </div>
                </>
              )}
            </>
          );
        })}
    </div>
  );
};

export default Index;
