import { history, useIntl } from '@umijs/max';
import { Button, Drawer, Dropdown, Flex, MenuProps, Result } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import {
  AreaChartOutlined,
  EllipsisOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import KnowledgeList from '@/pages/Chat/KnowledgeList';
import { detectDeviceType } from '@/utils';

const deviceType = detectDeviceType();
const Index: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.NavBar}>
        {deviceType === 'pc' && <div className={styles.logoWrap}>国研科技</div>}

        {deviceType === 'mobile' && (
          <>
            <Button
              className={styles.menuButton}
              onClick={() => {
                setOpen(true);
              }}
              size={'large'}
              icon={<MenuUnfoldOutlined />}
              type={'link'}
            ></Button>
            <Drawer
              title={null}
              placement={'left'}
              width={280}
              onClose={() => {
                setOpen(false);
              }}
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
        <Button
          className={styles.title}
          onClick={() => {}}
          size={'large'}
          icon={<ReadOutlined />}
          type={'link'}
        >
          知识库
        </Button>

        {deviceType === 'pc' && (
          <Button
            className={styles.consultationButton}
            onClick={() => {}}
            size={'large'}
            icon={<MailOutlined />}
            type={'link'}
          >
            合作咨询
          </Button>
        )}
        {deviceType === 'pc' && (
          <Button
            className={styles.statisticsButton}
            onClick={() => {}}
            size={'large'}
            icon={<AreaChartOutlined />}
            type={'link'}
          >
            数据统计
          </Button>
        )}
        {deviceType === 'mobile' && (
          <Dropdown
            className={styles.dropdownButton}
            placement="bottomRight"
            overlayStyle={{ backgroundColor: '#26293b', borderRadius: 4 }}
            dropdownRender={() => {
              return (
                <>
                  <Flex vertical={true} gap={5} style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => {}}
                      style={{ color: '#fff' }}
                      size={'large'}
                      icon={<MailOutlined />}
                      type={'link'}
                    >
                      合作咨询
                    </Button>
                    <Button
                      onClick={() => {}}
                      style={{ color: '#fff' }}
                      size={'large'}
                      icon={<AreaChartOutlined />}
                      type={'link'}
                    >
                      数据统计
                    </Button>
                  </Flex>
                </>
              );
            }}
          >
            <Button
              style={{ color: '#fff' }}
              size={'large'}
              type={'link'}
              icon={
                <>
                  <EllipsisOutlined />
                </>
              }
            ></Button>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default Index;
