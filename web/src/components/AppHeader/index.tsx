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

const Index: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.NavBar}>
        <div className={styles.logoWrap}>国研科技</div>
        <Button
          className={styles.menuButton}
          onClick={() => {
            setOpen(true);
          }}
          size={'large'}
          icon={
            <>
              <MenuUnfoldOutlined />
            </>
          }
          type={'link'}
        ></Button>
        <Button
          className={styles.title}
          onClick={() => {}}
          size={'large'}
          icon={
            <>
              <ReadOutlined />
            </>
          }
          type={'link'}
        >
          知识库
        </Button>

        <Button
          className={styles.consultationButton}
          onClick={() => {}}
          size={'large'}
          icon={
            <>
              <MailOutlined />
            </>
          }
          type={'link'}
        >
          合作咨询
        </Button>
        <Button
          className={styles.statisticsButton}
          onClick={() => {}}
          size={'large'}
          icon={
            <>
              <AreaChartOutlined />
            </>
          }
          type={'link'}
        >
          数据统计
        </Button>
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
                    icon={
                      <>
                        <MailOutlined />
                      </>
                    }
                    type={'link'}
                  >
                    合作咨询
                  </Button>
                  <Button
                    onClick={() => {}}
                    style={{ color: '#fff' }}
                    size={'large'}
                    icon={
                      <>
                        <AreaChartOutlined />
                      </>
                    }
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
      </div>
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
      >
        <div>
          <KnowledgeList />
        </div>
      </Drawer>
    </>
  );
};

export default Index;
