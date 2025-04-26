import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Select, message, Typography, Image, notification, Switch } from 'antd';
import Toast from 'components/Toast/Toast';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, openDangerNotification } from "constants/global";

import "./AddBranchDlg.css";
import { UrlAdminSaveBranch } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';
const { TextArea } = Input;

function AddBranchDlg(props) {
    const { show, proceed, title, info } = props;
    const [formData, setFormData] = useState({});
    const [selImageFile, setImageFile] = useState("");
    const [imagePath, setImagePath] = useState("");

    const [selLogoFile, setSelLogoFile] = useState("");
    const [logoUrl, setLogoUrl] = useState("");

    const [errorFields, setErrorFields] = useState([]);

    useEffect(() => {
        if (info) {
            setFormData({ ...formData, ...info })
        } else {
            setFormData({
                id: "",
                image_path: "",
                logo_path: "",
                title: "",
                content: "",
                image_path_status: false,
                logo_path_status: true
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
        if (name.includes("title")) {
            tmpVal = capitalizeFirstLetter(value)
        } else {
            tmpVal = value
        }

        setFormData({ ...formData, [name]: tmpVal });
    };

    const validateFields = () => {
        var errorList = Array();

        errorList = isEmpty(formData, "title", errorList);
        errorList = isEmpty(formData, "content", errorList);

        if (selImageFile === "" && formData.image_path === "") {
            errorList = [...errorList, "image_path"]
        }

        if (selLogoFile === "" && formData.logo_path === "") {
            errorList = [...errorList, "logo"]
        }
        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("image_path_status", formData.image_path_status);
            formDataToSend.append("logo_path_status", formData.logo_path_status);
            formDataToSend.append("image_path", selImageFile);
            formDataToSend.append("logo_path", selLogoFile);

            apiPost(UrlAdminSaveBranch, formDataToSend)
                .then((res) => {
                    Toast("Saved Successfully!", 1)
                    proceed(true);
                })
                .catch((err) => {
                    Toast(err, 2);
                });

        } else {
            Toast("Please confirm your information again", 2);
        }
    }
    const onDropContentImage = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setImagePath(URL.createObjectURL(files[0]));
        setImageFile(files[0]);
    };
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
            className="add-branch-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <div>
                <Row gutter={[16, 16]} align={'middle'} justify={'center'} style={{ marginTop: 20 }}>
                    <Col xs={24} md={24}>
                        <span style={{ paddingBottom: 3 }}>Title</span>
                        <Input
                            name="title"
                            value={formData.title}
                            placeholder="Title"
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
                        <div className="avatar_uploader">
                            <label htmlFor="avatar_uploader">
                                <input
                                    type="file"
                                    id="avatar_uploader"
                                    name="avatar_uploader"
                                    style={{ display: "none" }}
                                    accept="image/x-png, image/jpeg, image/jpg"
                                    onChange={onDropContentImage}
                                />
                                <span
                                    className={
                                        errorFields !== undefined &&
                                            errorFields.includes("image_path")
                                            ? `upload-logo-button error`
                                            : `upload-logo-button`
                                    }
                                >
                                    Upload Background Image
                                </span>
                            </label>
                        </div>
                        {imagePath == "" && formData.image_path != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${formData.image_path}`} />
                            </div>
                        )}
                        {imagePath != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={imagePath} />
                            </div>
                        )}
                    </Col>
                    <Col xs={24} md={24}>
                        <span style={{ paddingBottom: 3 }}>Background Image Visible</span>
                        <Switch
                            style={{ marginLeft: 10 }}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            checked={formData.image_path_status}
                            onChange={(e) => {
                                setFormData({ ...formData, image_path_status: e })
                            }} />
                    </Col>
                    <Col xs={24} md={24}>
                        <span style={{ paddingBottom: 3 }}>Content</span>
                        <TextArea
                            name='content'
                            value={formData.content}
                            rows={5}
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

                    <Col xs={24} md={24}>
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
                        {logoUrl == "" && formData.logo_path != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${formData.logo_path}`} />
                            </div>
                        )}
                        {logoUrl != "" && (
                            <div style={{ marginTop: 10 }}>
                                <Image width={160} src={logoUrl} />
                            </div>
                        )}
                    </Col>
                    <Col xs={24} md={24}>
                        <span style={{ paddingBottom: 3 }}>Logo Image Visible</span>
                        <Switch
                            style={{ marginLeft: 10 }}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            checked={formData.logo_path_status}
                            onChange={(e) => {
                                setFormData({ ...formData, logo_path_status: e })
                            }} />
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
        </Modal>
    );
}

export default confirmable(AddBranchDlg);
