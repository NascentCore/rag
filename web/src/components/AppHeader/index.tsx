import { Button, Drawer, Dropdown, Flex } from 'antd';
import React, { useState, useCallback } from 'react';
import styles from './index.less';
import {
  AreaChartOutlined,
  EllipsisOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import KnowledgeList from '@/pages/Chat/KnowledgeList';
import { detectDeviceType } from '@/utils';

const deviceType = detectDeviceType();

const CommonButton = ({ icon: Icon, text, onClick }) => (
  <Button onClick={onClick} size={'large'} icon={<Icon />} type={'link'} style={{ color: '#fff' }}>
    {text}
  </Button>
);

const Index: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleCloseDrawer = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <div className={styles.NavBar}>
        {deviceType === 'pc' && <div className={styles.logoWrap}>国研科技</div>}

        {deviceType === 'mobile' && (
          <>
            <Button
              className={styles.menuButton}
              onClick={() => setOpen(true)}
              size={'large'}
              icon={<MenuUnfoldOutlined />}
              type={'link'}
            ></Button>
            <Drawer
              title={null}
              placement={'left'}
              width={280}
              onClose={handleCloseDrawer}
              open={open}
              closeIcon={false}
              bodyStyle={{ padding: 0 }}
              destroyOnClose
            >
              <div>
                <KnowledgeList setDrawerOpen={setOpen} />
              </div>
            </Drawer>
          </>
        )}
        <CommonButton icon={ReadOutlined} text="知识库" onClick={() => {}} />

        {deviceType === 'pc' && (
          <>
            <CommonButton icon={MailOutlined} text="合作咨询" onClick={() => {}} />
            <CommonButton icon={AreaChartOutlined} text="数据统计" onClick={() => {}} />
          </>
        )}
        {deviceType === 'mobile' && (
          <Dropdown
            className={styles.dropdownButton}
            placement="bottomRight"
            overlayStyle={{ backgroundColor: '#26293b', borderRadius: 4 }}
            dropdownRender={() => (
              <Flex vertical={true} gap={5} style={{ marginTop: 10 }}>
                <CommonButton icon={MailOutlined} text="合作咨询" onClick={() => {}} />
                <CommonButton icon={AreaChartOutlined} text="数据统计" onClick={() => {}} />
              </Flex>
            )}
          >
            <Button size={'large'} type={'link'} icon={<EllipsisOutlined />}></Button>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default Index;
