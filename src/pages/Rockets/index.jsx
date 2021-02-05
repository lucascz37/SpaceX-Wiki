import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { getRockets } from '../../api';

import './style.css';

export default function Rockets() {
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getContent, setContent] = useState(null);
  const [getTotalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setContent(null);
    getRockets(getCurrentPage).then((res) => {
      setContent(res.data);
      if (getTotalPages === null) {
        setTotalPages(res.data.totalPages);
      }
    });
  }, [getCurrentPage]);

  return (
    <MainLayout
      totalPages={getTotalPages}
      currentPage={setCurrentPage}
      contentClassName="rocket-list"
    >
      {getContent === null ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} />} />
      ) : (
        getContent.docs.map((rocket) => (
          <Card
            hoverable
            cover={<img alt="rocket" src={rocket.flickr_images[0]} className="rocket-image" />}
            className="rocket-card"
          >
            <Card.Meta
              title={rocket.name}
              description={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <p className="active-status">
                  Active:
                  {rocket.active ? (
                    <CheckCircleOutlined style={{ color: '#00b545' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: '#800000' }} />
                  )}
                </p>
              }
            />
          </Card>
        ))
      )}
    </MainLayout>
  );
}
