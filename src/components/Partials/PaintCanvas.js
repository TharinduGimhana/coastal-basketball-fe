import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Modal, Space } from "antd";
import { InboxOutlined } from '@ant-design/icons';

const PaintCanvas = ({ setSignatureData, errorFields, setErrorFields, defaultImage }) => {
  const sigCanvas = useRef({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signature, setSignature] = useState(null); // Rename this variable

  // To clear the signature pad
  const clear = () => {
    sigCanvas.current.clear();
  };

  // Save signature
  const save = () => {
    if (!sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      setSignatureData(signatureData); // Use the prop to save the signature
      setSignature(signatureData); // Update the local state with the signature
      setIsModalVisible(false); // Close modal after saving
      if (errorFields.includes("signature")) {
        let errors = errorFields.filter((x) => x != "signature");
        setErrorFields([...errors]);
      }
    }
  };

  return (
    <>
      {(!signature && !defaultImage) &&
        <div
          onClick={() => setIsModalVisible(true)}
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            padding: '10px',
            cursor: 'pointer',
            justifyContent: 'center'
          }}
        >
          <InboxOutlined />
        </div>
      }
      <Modal
        title="Sign Here"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered // This prop centers the modal
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
        <Space>
          <Button onClick={clear} style={{ marginRight: '10px' }}>Clear</Button>
          <Button type="primary" onClick={save}>
            Save
          </Button>
        </Space>
      </Modal>

      {(signature || defaultImage != "") && ( // Use the renamed local state
        <div>
          <img src={signature || `${process.env.REACT_APP_API_BASE_URL}uploads/media/${defaultImage}`} alt="Signature" width='100%' style={{ marginTop: '10px', cursor: 'pointer', maxHeight: 140, width: '100%', height: 'auto' }} onClick={() => setIsModalVisible(true)} />
        </div>
      )}
    </>
  );
};

export default PaintCanvas;
