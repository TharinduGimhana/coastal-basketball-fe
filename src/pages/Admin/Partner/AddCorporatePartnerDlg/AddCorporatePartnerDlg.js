import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Select, message, Typography, Image, notification, Switch } from 'antd';
import Toast from 'components/Toast/Toast';
import axios from 'axios';
import dayjs from 'dayjs';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, openDangerNotification } from "constants/global";

import "./AddCorporatePartnerDlg.css";
import { UrlAdminSaveCoporatePartner } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';
const { TextArea } = Input;

function AddCorporatePartnerDlg(props) {
    const { show, proceed, title, info, typeList } = props;


    const [formData, setFormData] = useState({});
    const [selLogoFile, setSelLogoFile] = useState("");
    const [logoUrl, setLogoUrl] = useState("");


    const [errorFields, setErrorFields] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (info) {
            setFormData({ ...formData, ...info })
        } else {
            setFormData({
                id: "",
                season: "",
                name: "",
                phone: "",
                email: "",
                website: "",
                brand: "",
                logo: ""
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
        if (name.includes("name")) {
            tmpVal = capitalizeFirstLetter(value)
        } else {
            tmpVal = value
        }

        setFormData({ ...formData, [name]: tmpVal });
    };

    const validateFields = () => {
        var errorList = Array();

        errorList = isEmpty(formData, "type", errorList);
        errorList = isEmpty(formData, "name", errorList);
        errorList = isEmpty(formData, "phone", errorList);
        errorList = isEmpty(formData, "email", errorList);
        errorList = isEmpty(formData, "website", errorList);
        errorList = isEmpty(formData, "brand", errorList);
        errorList = isEmpty(formData, "content", errorList);

        if (selLogoFile === "" && formData.logo === "") {
            errorList = [...errorList, "logo"]
        }
        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("type", formData.type);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("website", formData.website);
            formDataToSend.append("brand", formData.brand);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("logo", selLogoFile);

            apiPost(UrlAdminSaveCoporatePartner, formDataToSend)
                .then((res) => {
                    Toast("Saved successfully!", 1)
                    proceed(true);
                    setLoading(false)
                })
                .catch((err) => {
                    Toast(err, 2);
                    setLoading(false)
                });
        } else {
            Toast("Please confirm your information again", 2);
        }
    }
    const onDropLogo = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setLogoUrl(URL.createObjectURL(files[0]));
        setSelLogoFile(files[0]);
    };
    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="add-corporate-partner-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <div>
                <Row gutter={[16, 16]} align={'middle'} justify={'center'}>
                    <Col xs={24} md={12}>
                        <Select
                            showSearch
                            style={{ width: '100%', height: 44 }}
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("type")
                                    ? `common-select-error`
                                    : `common-select`
                            }
                            placeholder="Select a Club"
                            value={formData?.type || undefined}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={typeList}
                            onChange={(value) => {
                                if (errorFields.includes("type")) {
                                    let errors = errorFields.filter((x) => x != "type");
                                    setErrorFields([...errors]);
                                }
                                setFormData({ ...formData, type: value });
                            }}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            name="name"
                            value={formData.name}
                            placeholder="NAME"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("name")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />

                    </Col>

                    <Col xs={24} md={12}>
                        <Input
                            name="phone"
                            value={formData.phone}
                            placeholder="Phone"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("phone")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />

                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            name="email"
                            type='email'
                            autoComplete='off'
                            value={formData.email}
                            placeholder="EMAIL ADDRESS"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("email")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />

                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            name="website"
                            value={formData.website}
                            prefix="https://"
                            placeholder="WEBSITE"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("website")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            name="brand"
                            value={formData.brand}
                            placeholder="COMPANY/BRAND"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("brand")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={24}>
                        <TextArea
                            name='content'
                            value={formData.content}
                            rows={8}
                            placeholder="Content"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("content")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="logo_uploader">
                            <label htmlFor="logo_uploader">
                                <input
                                    type="file"
                                    id="logo_uploader"
                                    name="logo_uploader"
                                    style={{ display: "none" }}
                                    accept="image/x-png, image/jpeg, image/jpg"
                                    onChange={onDropLogo}
                                />
                                <span
                                    className={
                                        errorFields !== undefined &&
                                            errorFields.includes("logo")
                                            ? `upload-logo-button error`
                                            : `upload-logo-button`
                                    }
                                >
                                    Upload Logo
                                </span>
                            </label>
                        </div>
                        {logoUrl == "" && formData.logo != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${formData.logo}`} />
                            </div>
                        )}
                        {logoUrl != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={logoUrl} />
                            </div>
                        )}
                    </Col>
                    <Col xs={24} md={12}></Col>

                </Row>
                <Row justify={'center'} align={'middle'} style={{ marginTop: 20, textAlign: 'center' }}>
                    <Col xs={24} md={24}>
                        <Button type="primary" onClick={doRegister} htmlType="submit" block className="add-user-button">
                            {info ? "Update" : "Add"}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}

export default confirmable(AddCorporatePartnerDlg);
