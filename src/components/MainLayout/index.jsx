import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Pagination, Typography } from 'antd';
import { HomeOutlined, IdcardOutlined, RocketOutlined } from '@ant-design/icons';
import Logo from '../../assets/satellite.svg';
import './style.css';

export default function MainLayout({ children, totalPages, currentPage, contentClassName }) {
  const [getCollapsed, setCollapsed] = useState(true);
  const [getLiStyle, setLiStyle] = useState('menu-item');

  useEffect(() => {
    setLiStyle(getCollapsed ? 'menu-item' : '');
  }, [getCollapsed]);

  function collapsed() {
    setCollapsed(!getCollapsed);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme="light" collapsible collapsed={getCollapsed} onCollapse={collapsed}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item
            className={getLiStyle}
            key="1"
            icon={<HomeOutlined style={{ fontSize: '32px' }} />}
          >
            Company
          </Menu.Item>
          <Menu.Item
            className={getLiStyle}
            key="2"
            icon={<IdcardOutlined style={{ fontSize: '32px' }} />}
          >
            Crew
          </Menu.Item>
          <Menu.Item
            className={getLiStyle}
            key="3"
            icon={<RocketOutlined style={{ fontSize: '32px' }} />}
          >
            Launches
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout className="site-layout">
        <Layout.Header style={{ padding: '0', background: '#FFF' }} className="header">
          <Typography.Title className="page-title">SpaceX Wiki</Typography.Title>
        </Layout.Header>
        <Layout.Content style={{ margin: '0 16px' }} className={contentClassName}>
          {children}
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }} className="footer">
          {totalPages !== null ? (
            <Pagination
              total={totalPages * 10}
              onChange={(page) => currentPage(page)}
              className="pagination"
            />
          ) : null}
          Modified by Lucas, Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

MainLayout.propsTypes = {
  children: PropTypes.node.isRequired,
  totalPages: PropTypes.node.isRequired,
  page: PropTypes.func,
  contentClassName: PropTypes.string.isRequired,
};
