import { Col, Input, Row, Select } from "antd";
import React from "react";
import SearchIcon from "assets/png/ic_search.png";

import "./SearchWidget.css";
import { useState } from "react";
import { RoundSelect } from "components/SelectWidget/RoundSelect";

const SearchWidget = (props) => {
  const screenWidthSize = window.innerWidth;
  const [typeList, setTypeList] = useState([
    { id: 0, value: "0", label: "All Departments" },
  ]);
  const [selType, setSelType] = useState("0");
  return (
    <div className="search-section">
      <Row align="middle" gutter={[0, 8]} justify="center">
          <Col xs={10} sm={10} md={10} xl={6} xxl={6}>
            <span className="search-menu-item">Sell</span>
            <span className="search-menu-item">Wishlist</span>
          </Col>
          <Col xs={14} sm={14} md={14} xl={0} xxl={0}>
            <RoundSelect
              value={selType}
              onChange={setSelType}
              optionList={typeList}
            />
          </Col>
          <Col xs={0} sm={0} md={0} xl={12} xxl={12} className="pl-20 pr-20">
            <Input
              className="search-input"
              prefix={<img className="search-icon" src={SearchIcon} />}
              placeholder="Search for your favourite brands, products or stores..."
            />
          </Col>
          <Col xs={0} sm={0} md={0} xl={6} xxl={6}>
            <RoundSelect
              value={selType}
              onChange={setSelType}
              optionList={typeList}
            />
          </Col>
          <Col xs={24} sm={24} md={24} xl={0} xxl={0}>
            <Input
              className="search-input"
              prefix={<img className="search-icon" src={SearchIcon} />}
              placeholder="Search for your favourite brands, products or stores..."
            />
          </Col>
        </Row>
    </div>
  );
};

export default SearchWidget;
