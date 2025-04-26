import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import './CompetitionDetail.css';
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";

import CompDetailsImage from "../../../assets/png/Competition Details.jpg";
import CompDetailsImage1 from "../../../assets/png/Competition Details-1.jpg";
import CompDetailsImage2 from "../../../assets/png/Competition Details-2.jpg";

const CompetitionDetail = () => {
    const items = [
    {
      title: `SEASON SCHEDULE`,
      content: 'The league runs from February to July, culminating in a finals series that coincides with the Country Week for schools.',
      imageUrl: CompDetailsImage,
    },
    {
      title: `TEAM FORMATION`,
      content: 'Schools are invited to enter teams in the league, with each team representing their school in weekly competitions.',
      imageUrl: CompDetailsImage1,
    },
    {
      title: `PRIZES AND RECOGNITION`,
      content: 'Teams compete for school pride, trophies, and individual awards, with standout players being recognized for their contributions.',
      imageUrl: CompDetailsImage2,
    },
    ];

  return (
    <div>
        <div className="programs-section competition-cvontent cbl-section">
            <BottomDescription
                title1="COMPETITION"
                title2="DETAILS"
                content="Explore the details of competition"
            />

            <Row className="mt-40" gutter={45} justify="space-between">
            {items.length > 0 ? items.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                    <Card
                        hoverable
                        cover={
                            <div style={{ padding: '15px' }}>
                                <img alt={item.title} src={item.imageUrl} style={{ width: '100%', height: 'auto' }} />
                            </div>
                        }
                    >
                        <h2 className="bold academy-program-title">{item.title}</h2>
                        <p>{item.content}</p>
                    </Card>
                </Col>
            )) : <p className="home-little-letter">No items available.</p>}
            </Row>
        </div>
    </div>
  );
};

export default CompetitionDetail;
