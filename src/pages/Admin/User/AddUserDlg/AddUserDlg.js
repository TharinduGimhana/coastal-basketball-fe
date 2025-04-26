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
        signup_type: "parent",
        parent_info: [
            {
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: "",
                confirm_password: ""
            }
        ],
        child_info: [
            {
                first_name: "",
                last_name: "",
                birthday: "",
                gender: "",
                address: "",
                note: ""
            }
        ]
    });
    const [errorFields, setErrorFields] = useState([]);
    const [childErrorFields, setChildErrorFields] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({ ...formData, ...userData, is_default_password: false, password: "" })
        } else {
            setFormData({
                signup_type: "parent",
                parent_info: [
                    {
                        first_name: "",
                        last_name: "",
                        email: "",
                        phone_number: "",
                        password: "",
                        confirm_password: ""
                    }
                ],
                child_info: [
                    {
                        first_name: "",
                        last_name: "",
                        birthday: "",
                        gender: "",
                        address: "",
                        note: ""
                    }
                ]
            })
        }
    }, [userData])


    const validateFields = () => {
        var errorList = Array();
        var childErrorList = Array();
        let tmpAdultList = [...formData.parent_info];
        tmpAdultList.map((x, index) => {
            errorList = isEmpty(x, "first_name", errorList, index);
            errorList = isEmpty(x, "last_name", errorList, index);
            errorList = isEmpty(x, "phone_number", errorList, index);
            errorList = isEmpty(x, "email", errorList, index);
            if (!errorList.includes("email")) {
                if (!ValidateEmail(x.email)) {
                    errorList = [...errorList, index + "email"]
                }
            }
            errorList = isEmpty(x, "password", errorList, index);
            errorList = isEmpty(x, "confirm_password", errorList, index);
            if (!errorList.includes("password") && !errorList.includes("confirm_password")) {
                if (x.password != x.confirm_password) {
                    errorList = [...errorList, index + "confirm_password"]
                }
            }
            if (index == 1) {
                if (x.email != "" && x.email == formData.parent_info[0].email) {
                    errorList = [...errorList, index + "email"]
                    Toast("Email address is duplicated", 2);
                }
                if (x.phone_number != "" && x.phone_number == formData.parent_info[0].phone_number) {
                    errorList = [...errorList, index + "phone_number"]
                    Toast("Phone number is duplicated", 2);
                }
                if (x.password != "" && x.password == formData.parent_info[0].password) {
                    errorList = [...errorList, index + "password"]
                    Toast("Password is duplicated", 2);
                }
            }
        })

        let tmpList = [...formData.child_info];
        tmpList.map((x, index) => {
            childErrorList = isEmpty(x, "first_name", childErrorList, index);
            childErrorList = isEmpty(x, "last_name", childErrorList, index);
            childErrorList = isEmpty(x, "birthday", childErrorList, index);
            childErrorList = isEmpty(x, "gender", childErrorList, index);
            childErrorList = isEmpty(x, "address", childErrorList, index);
        })

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
            formDataToSend.append("signup_type", formData.signup_type);
            formDataToSend.append("parent_info", JSON.stringify(formData.parent_info));
            formDataToSend.append("child_info", JSON.stringify(formData.child_info));
            formDataToSend.append("password", formData.password);
            formDataToSend.append("ip_address", userIp);

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

    const onDeleteChild = (key) => {
        let tmpList = [...formData.child_info]
        tmpList = tmpList.filter((x, index) => index != key);
        setFormData({ ...formData, child_info: tmpList })
    }
    const addMoreAdult = () => {
        let tmpList = [...formData.parent_info]
        tmpList = [...tmpList, {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: ""
        }]
        setFormData({ ...formData, parent_info: tmpList })
    }
    const onDeleteParent = (key) => {
        let tmpList = [...formData.parent_info]
        tmpList = tmpList.filter((x, index) => index != key);
        setFormData({ ...formData, parent_info: tmpList })
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
                    {/* <div className="signup-form-personal" style={{ padding: 20 }}>
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
                    </div> */}
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
                                onDeleteChild={onDeleteChild}
                                addMoreAdult={addMoreAdult}
                                onDeleteParent={onDeleteParent}
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
