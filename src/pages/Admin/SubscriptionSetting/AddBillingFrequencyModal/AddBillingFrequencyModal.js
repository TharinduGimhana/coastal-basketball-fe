import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, notification, Spin, Select } from 'antd';
import Toast from 'components/Toast/Toast';
import { isEmpty } from "constants/global";

import "./AddBillingFrequencyModal.css";
import { apiPost } from 'ajax/apiServices';
import { UrlAdminSaveBillingFrequency, UrlAdminSaveSubscriptionSetting } from 'ajax/apiUrls';
const { TextArea } = Input;
const { Option } = Select;
function AddBillingFrequencyModal(props) {
    const { show, proceed, title, info } = props;


    const [formData, setFormData] = useState({});

    const [errorFields, setErrorFields] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (info) {
            setFormData({ ...formData, ...info })
        } else {
            setFormData({
                id: "",
                title: "",
                term: ""
            })
        }
    }, [info])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (errorFields.includes(name)) {
            let errors = errorFields.filter((x) => x != name);
            setErrorFields([...errors]);
        }
        let tmpVal = value;
        setFormData({ ...formData, [name]: tmpVal });
    };

    const validateFields = () => {
        var errorList = Array();

        errorList = isEmpty(formData, "title", errorList);
        errorList = isEmpty(formData, "term", errorList);

        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("term", formData.term);

            apiPost(UrlAdminSaveBillingFrequency, formDataToSend)
                .then((res) => {
                    Toast("Saved successfully!", 1)
                    setLoading(false);
                    proceed(true);
                })
                .catch((err) => {
                    Toast(err, 2);
                    setLoading(false)
                });


        } else {
            Toast("Please confirm your information again", 2);
        }
    }

    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="add-billing-freq-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <Spin spinning={loading}>
                <div>
                    <Row gutter={[16, 16]} align={'middle'} justify={'center'} style={{ marginTop: 20 }}>
                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>Billing Frequency</span>
                            <Input
                                name="title"
                                value={formData.title}
                                placeholder="Billing Frequency"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("title")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={handleInputChange}
                            />

                        </Col>

                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>Term (days)</span>
                            <Input
                                name="term"
                                type='number'
                                min={1}
                                value={formData.term}
                                placeholder="ex: 7 days"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("term")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={handleInputChange}
                            />

                        </Col>

                    </Row>
                    <Row justify={'center'} align={'middle'} style={{ marginTop: 20, textAlign: 'center' }}>
                        <Col xs={24} md={24}>
                            <Button type="primary" onClick={doRegister} htmlType="submit" block className="add-user-button">
                                {info ? "Update" : "Add"}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Spin>
        </Modal>
    );
}

export default confirmable(AddBillingFrequencyModal);
