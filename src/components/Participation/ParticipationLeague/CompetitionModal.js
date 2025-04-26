import React from "react";
import { Modal, Row, Col, Button } from "antd";
import Logo from "../../../assets/png/logo.png";
import { Link } from "react-router-dom";
import { LinkOutlined } from "@ant-design/icons"; 

const CompetitionModal = ({ modalOpen, setModalOpen, content, title }) => {
  return (
    <Modal
      wrapClassName="vertical-center-modal"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    >
      <div style={{ textAlign: 'center' }}>
        <h2>{title}</h2>
        {content}
      </div>
    </Modal>
  );
};

export default CompetitionModal;