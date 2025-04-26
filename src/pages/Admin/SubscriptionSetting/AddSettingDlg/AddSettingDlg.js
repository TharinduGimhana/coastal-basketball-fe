import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, notification, Spin, Select, Switch } from 'antd';
import Toast from 'components/Toast/Toast';
import { isEmpty } from "constants/global";

import "./AddSettingDlg.css";
import { apiPost } from 'ajax/apiServices';
import { UrlAdminSaveSubscriptionSetting } from 'ajax/apiUrls';
const { TextArea } = Input;
const { Option } = Select;
function AddSettingDlg(props) {
    const { show, proceed, title, info, packageTypeList, billingFreqList, benefitList } = props;


    const [formData, setFormData] = useState({});

    const [errorFields, setErrorFields] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (info) {
            setFormData({ ...formData, ...info, benefit: info.benefit != "" ? info.benefit.split(",") : [], period_check: info.period > 0 })
        } else {
            setFormData({
                id: "",
                package: "",
                fee: "",
                period: 0,
                period_check: false,
                billing_frequency: "",
                benefit: [],
                ideal: ""
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

        errorList = isEmpty(formData, "package", errorList);
        errorList = isEmpty(formData, "fee", errorList);
        errorList = isEmpty(formData, "billing_frequency", errorList);
        if (formData.period_check) {
            if (formData.period <= 0) {
                errorList = [...errorList, "period"]
            }
        }
        errorList = isEmpty(formData, "billing_desc", errorList);
        if (formData.benefit.length == 0) {
            errorList = [...errorList, "benefit"];
        }
        errorList = isEmpty(formData, "ideal", errorList);

        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("package", formData.package);
            formDataToSend.append("fee", formData.fee);
            formDataToSend.append("billing_frequency", formData.billing_frequency);
            formDataToSend.append("period", formData.period);
            formDataToSend.append("billing_desc", formData.billing_desc);
            formDataToSend.append("benefit", formData.benefit.join(","));
            formDataToSend.append("ideal", formData.ideal);

            apiPost(UrlAdminSaveSubscriptionSetting, formDataToSend)
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
            className="add-subscription-setting-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <Spin spinning={loading}>
                <div>
                    <Row gutter={[16, 16]} align={'middle'} justify={'center'} style={{ marginTop: 20 }}>
                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>Membership Package</span>
                            <Select
                                placeholder="Membership Package"
                                style={{ width: '100%' }}
                                value={formData.package || undefined}
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("package")
                                        ? `common-select-error`
                                        : `common-select`
                                }
                                onSelect={(v) => {
                                    if (errorFields.includes("package")) {
                                        let errors = errorFields.filter(
                                            (y) => y != "package"
                                        );
                                        setErrorFields([...errors]);
                                    }
                                    setFormData({
                                        ...formData,
                                        package: v,
                                    });
                                }}
                            >
                                {packageTypeList.map((x, index) => {
                                    return <Option value={x.id} key={index}>{x.title}</Option>
                                })}
                            </Select>

                        </Col>

                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>Billing Frequency</span>
                            <Select
                                placeholder="Billing Frequency"
                                style={{ width: '100%' }}
                                value={formData.billing_frequency || undefined}
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("billing_frequency")
                                        ? `common-select-error`
                                        : `common-select`
                                }
                                onSelect={(v) => {
                                    if (errorFields.includes("billing_frequency")) {
                                        let errors = errorFields.filter(
                                            (y) => y != "billing_frequency"
                                        );
                                        setErrorFields([...errors]);
                                    }
                                    setFormData({
                                        ...formData,
                                        billing_frequency: v,
                                    });
                                }}
                            >
                                {billingFreqList.map((x, index) => {
                                    return <Option value={x.id} key={index}>{x.title}</Option>
                                })}
                            </Select>
                        </Col>

                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>MemberShip Fee</span>
                            <Input
                                name="fee"
                                type='number'
                                value={formData.fee}
                                placeholder="Yearly MemberShip Fee"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("fee")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={handleInputChange}
                            />

                        </Col>

                        <Col xs={24} md={24}>
                            <span style={{ paddingBottom: 3 }}>Set Lock Period</span>
                            <Switch
                                style={{ marginLeft: 10 }}
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                                checked={formData.period_check}
                                onChange={(e) => {
                                    setFormData({ ...formData, period_check: e })
                                }} />
                        </Col>
                        {formData.period_check &&
                            <Col xs={24} md={24}>
                                <span style={{ paddingBottom: 3 }}>Period</span>
                                <Input
                                    name="period"
                                    type='number'
                                    suffix={"Months"}
                                    min={0}
                                    value={formData.period}
                                    placeholder="period"
                                    className={
                                        errorFields !== undefined &&
                                            errorFields.includes("period")
                                            ? `common-input-error`
                                            : `common-input`
                                    }
                                    onChange={handleInputChange}
                                />
                            </Col>
                        }

                        <Col xs={24}>
                            <span style={{ paddingBottom: 3 }}>Billing Description</span>
                            <TextArea
                                name='billing_desc'
                                value={formData.billing_desc}
                                rows={4}
                                placeholder="Billing Description"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("billing_desc")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col xs={24}>
                            <span style={{ paddingBottom: 3 }}>Key Benefits</span>
                            <Select
                                mode="multiple"
                                placeholder="Please select"
                                value={formData.benefit || undefined}
                                onChange={(e) => {
                                    if (errorFields.includes("benefit")) {
                                        let errors = errorFields.filter(
                                            (y) => y != "benefit"
                                        );
                                        setErrorFields([...errors]);
                                    }
                                    setFormData({
                                        ...formData,
                                        benefit: e,
                                    });
                                }}
                                style={{
                                    width: '100%',
                                }}
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("benefit")
                                        ? `common-select-error`
                                        : `common-select`
                                }
                                options={benefitList.map((x) => { return { value: x.id, label: x.title } })}
                            />
                        </Col>
                        <Col xs={24}>
                            <span style={{ paddingBottom: 3 }}>Ideal For</span>
                            <TextArea
                                name='ideal'
                                value={formData.ideal}
                                rows={4}
                                placeholder="Ideal For"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("ideal")
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

export default confirmable(AddSettingDlg);
