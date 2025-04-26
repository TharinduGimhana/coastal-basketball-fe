import { Row, Col } from "antd";
import React from "react";
import "./TrendingBrandWidget.css";
const TrendingBrandWidget = (props) => {
  const { dataList, all, onClick } = props;
  if (dataList == undefined) return;
  return (
    <Row gutter={[4, 2]}>
      {dataList.map((x, index) => {
        return (
          <Col key={index} md={8}>
            <div className="trending-brand-item" onClick={onClick}>
              <img src={x.logo} className="trending-brand-item-img"/>
              <p className="font-12">{x.title}</p>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default TrendingBrandWidget;
