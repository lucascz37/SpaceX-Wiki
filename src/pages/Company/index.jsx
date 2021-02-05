import React, { useEffect, useState } from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { getCompany } from '../../api/index';

import './style.css';

export default function Company() {
  const [getContent, setContent] = useState({});

  useEffect(() => {
    getCompany().then((res) => {
      setContent(res.data);
    });
  }, [getContent]);

  return (
    <MainLayout totalPages={null} contentClassName="company">
      {getCompany === {} ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} />} />
      ) : (
        <div className="company-info">
          <Typography.Title level={2}>{getContent.name}</Typography.Title>
          <Typography.Title level={3}>{`Founder: ${getContent.founder}`}</Typography.Title>
          <Typography.Title level={3}>{`Founded: ${getContent.founded}`}</Typography.Title>
          <Typography.Title level={3}>{getContent.summary}</Typography.Title>
        </div>
      )}
    </MainLayout>
  );
}
