import { Col, Row } from "antd";
import RightArrowIcon from "assets/png/ic_right_arrow.png";
import "./RightArrowDescription.css";
export const RightArrowDescription = (props) => {
  const { className, style, title } = props;
  return (
    <Row gutter={8}>
      <Col flex={"auto"}>
        <p className="font-16 bold mb-10">{title}</p>
      </Col>
      <Col flex={"20px"}>
        <img className="right-back-img" src={RightArrowIcon} />
      </Col>
    </Row>
  );
};
