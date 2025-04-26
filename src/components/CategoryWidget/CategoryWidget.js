import { Row, Col } from "antd";
import React from "react";
import "./CategoryWidget.css";
const CategoryWidget = (props) => {
  const { dataList, all, allClick, onClick } = props;
  if (dataList == undefined) return;
  return (
    <Row gutter={[8, 8]}>
      {dataList.map((x, index) => {
        return (
          <Col key={index} md={12}>
            <div className="category-item" onClick={onClick}>{x.title}</div>
          </Col>
        );
      })}
      {all != undefined && all && (
        <Col key={-1} md={12}>
          <div className="category-item all" onClick={allClick}>View All</div>
        </Col>
      )}
    </Row>
  );
};

export default CategoryWidget;
