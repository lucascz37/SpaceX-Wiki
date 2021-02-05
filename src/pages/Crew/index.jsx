import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { getCrew } from '../../api';

import './style.css';

export default function Crew() {
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getContent, setContent] = useState(null);
  const [getTotalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setContent(null);
    getCrew(getCurrentPage).then((res) => {
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
      contentClassName="crew-list"
    >
      {getContent === null ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} />} />
      ) : (
        getContent.docs.map((crewMember) => (
          <Card
            hoverable
            cover={<img alt="astronaut" src={crewMember.image} className="crew-image" />}
            className="crew-card"
            key={crewMember.id}
          >
            <Card.Meta title={crewMember.name} description={crewMember.agency} />
          </Card>
        ))
      )}
    </MainLayout>
  );
}
