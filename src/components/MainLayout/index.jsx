import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu, Pagination, Typography } from 'antd';
import { HomeOutlined, IdcardOutlined, RocketOutlined } from '@ant-design/icons';
import Logo from '../../assets/satellite.svg';
import './style.css';

const items = [
  { key: '1', label: 'Company', path: '/', icon: <HomeOutlined style={{ fontSize: '32px' }} /> },
  { key: '2', label: 'Crew', path: '/crew', icon: <IdcardOutlined style={{ fontSize: '32px' }} /> },
  {
    key: '3',
    label: 'Rockets',
    path: '/rockets',
    icon: <RocketOutlined style={{ fontSize: '32px' }} />,
  },
];

export default function MainLayout({ children, totalPages, currentPage, contentClassName }) {
  const history = useHistory();
  const location = useLocation();
  const [getCollapsed, setCollapsed] = useState(
    location.state === undefined ? true : location.state.collapsed,
  );
  const [getLiStyle, setLiStyle] = useState(getCollapsed ? 'menu-item' : '');
  const currentKey = items.find((_item) => location.pathname === _item.path).key;

  useEffect(() => {
    setLiStyle(getCollapsed ? 'menu-item' : '');
  }, [getCollapsed]);

  function collapsed() {
    setCollapsed(!getCollapsed);
  }

  function changePage(redirect) {
    history.push({
      pathname: redirect,
      state: { collapsed: getCollapsed },
    });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme="light" collapsible collapsed={getCollapsed} onCollapse={collapsed}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Menu theme="light" selectedKeys={[currentKey]} mode="inline">
          {items.map((item) => (
            <Menu.Item
              className={getLiStyle}
              key={item.key}
              icon={item.icon}
              onClick={() => changePage(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
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
