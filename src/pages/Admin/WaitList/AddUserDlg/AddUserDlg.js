import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Radio, Row, Spin } from 'antd';
import Toast from 'components/Toast/Toast';
import axios from 'axios';
import { isEmpty, ValidateEmail } from "constants/global";

import "./AddUserDlg.css";
import UserPersonalRect from './UserPersonalRect';
import UserParentRect from './UserParentRect';
import { UrlAdminCreateUser } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';



function AddUserDlg(props) {
    const { show, proceed, title, userData } = props;
    const [formData, setFormData] = useState({
        signup_type: "individual",
        child_info: [
            {
                first_name: "",
                last_name: "",
                birthday: "",
                gender: "",
                address: "",
                note: ""
            }
        ],
        first_name: "",
        last_name: "",
        birthday: "",
        address: "",
        gender: "",
        note: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [errorFields, setErrorFields] = useState([]);
    const [childErrorFields, setChildErrorFields] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({ ...formData, ...userData, is_default_password: false, password: "" })
        } else {
            setFormData({
                id: '',
                first_name: '',
                last_name: '',
                birthday: '',
                address: '',
                email: '',
                password: '',
                signup_type: 'individual',
                phone_number: "",
                gender: "",
                email: "",
                note: "",
                confirm_password: '',
                is_default_password: false,
                child_info: [
                    {
                        first_name: "",
                        last_name: "",
                        birthday: "",
                        gender: "",
                        address: "",
                        note: ""
                    }
                ],
            })
        }
    }, [userData])


    const validateFields = () => {
        var errorList = Array();
        var childErrorList = Array();
        errorList = isEmpty(formData, "first_name", errorList);
        errorList = isEmpty(formData, "last_name", errorList);
        errorList = isEmpty(formData, "phone_number", errorList);
        errorList = isEmpty(formData, "email", errorList);
        if (!errorList.includes("email")) {
            if (!ValidateEmail(formData.email)) {
                errorList = [...errorList, "email"]
            }
        }
        if (formData.signup_type == "parent") {
            let tmpList = [...formData.child_info];
            tmpList.map((x, index) => {
                childErrorList = isEmpty(x, "first_name", childErrorList, index);
                childErrorList = isEmpty(x, "last_name", childErrorList, index);
                childErrorList = isEmpty(x, "birthday", childErrorList, index);
                childErrorList = isEmpty(x, "gender", childErrorList, index);
                childErrorList = isEmpty(x, "address", childErrorList, index);
            })
        } else {
            errorList = isEmpty(formData, "birthday", errorList);
            errorList = isEmpty(formData, "address", errorList);
        }

        if (formData.is_default_password) {
            errorList = isEmpty(formData, "password", errorList);
            errorList = isEmpty(formData, "confirm_password", errorList);
            if (formData.password != formData.confirm_password) {
                errorList = [...errorList, "confirm_password"]
            }
        }
        setErrorFields([...errorList]);
        setChildErrorFields([...childErrorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            setLoading(true);
            const ipResponse = await axios.get('https://api.ipify.org?format=json');
            const userIp = ipResponse.data.ip;

            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("first_name", formData.first_name);
            formDataToSend.append("last_name", formData.last_name);
            formDataToSend.append("birthday", formData.birthday);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("phone_number", formData.phone_number);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("signup_type", formData.signup_type);
            formDataToSend.append("child_info", formData.signup_type == "parent" ? JSON.stringify(formData.child_info) : "");
            formDataToSend.append("gender", formData.gender);
            formDataToSend.append("note", formData.note);
            formDataToSend.append("ip_address", userIp);
            formDataToSend.append("is_default_password", formData.is_default_password);

            apiPost(UrlAdminCreateUser, formDataToSend)
                .then((res) => {
                    if (formData.id) {
                        proceed(res);
                    } else {
                        proceed(1);
                    }

                    setLoading(false);
                })
                .catch((err) => {
                    Toast(err, 2);
                    setLoading(false);
                });

        } else {
            Toast("Please confirm your information again", 2);
        }
    }

    const addMore = () => {
        let tmpList = [...formData.child_info]
        tmpList = [...tmpList, {
            first_name: "",
            last_name: "",
            birthday: "",
            gender: "",
            address: "",
            note: ""
        }]
        setFormData({ ...formData, child_info: tmpList })
    }

    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="add-user-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <Spin spinning={loading}>
                <div>
                    <div className="signup-form-personal" style={{ padding: 20 }}>
                        <Radio.Group disabled={userData} onChange={(e) => {
                            setFormData({ ...formData, signup_type: e.target.value });
                        }} value={formData.signup_type} className="signup-custom-radio-group">
                            <Row gutter={[12, 12]}>
                                <Col xs={24} md={12}>
                                    <Radio.Button value="individual">Individual User Account</Radio.Button>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Radio.Button value="parent">Parent/Guardian Account</Radio.Button>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </div>
                    <div>
                        {formData.signup_type == "individual" ?
                            <UserPersonalRect
                                userData={userData}
                                formData={formData}
                                setFormData={setFormData}
                                errorFields={errorFields}
                                setErrorFields={setErrorFields} /> :
                            <UserParentRect
                                userData={userData}
                                formData={formData}
                                setFormData={setFormData}
                                errorFields={errorFields}
                                setErrorFields={setErrorFields}
                                childErrorFields={childErrorFields}
                                setChildErrorFields={setChildErrorFields}
                                addMore={addMore}
                            />}
                    </div>
                    <Row justify={'center'} align={'middle'} style={{ marginTop: 20, textAlign: 'center' }}>
                        <Col xs={24} md={24}>
                            <Button type="primary" onClick={doRegister} htmlType="submit" block className="add-user-button">
                                {userData ? "Update" : "Add"}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Spin>
        </Modal>
    );
}

export default confirmable(AddUserDlg);
