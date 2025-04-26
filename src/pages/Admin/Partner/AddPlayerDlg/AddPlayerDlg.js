import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Select, message, Typography, Image, notification, Switch, Spin } from 'antd';
import Toast from 'components/Toast/Toast';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, openDangerNotification } from "constants/global";

import "./AddPlayerDlg.css";
import { apiPost } from 'ajax/apiServices';
import { UrlAdminSavePlayerPartner } from 'ajax/apiUrls';
function AddPlayerDlg(props) {
    const { show, proceed, title, info, typeList } = props;


    const [formData, setFormData] = useState({});
    const [selAvatarFile, setSelAvatarFile] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

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
                avatar: "",
                name: "",
                point: "",
                position: "",
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

        errorList = isEmpty(formData, "name", errorList);
        errorList = isEmpty(formData, "position", errorList);
        errorList = isEmpty(formData, "point", errorList);

        if (selAvatarFile === "" && formData.avatar === "") {
            errorList = [...errorList, "avatar"]
        }

        if (selLogoFile === "" && formData.logo === "") {
            errorList = [...errorList, "logo"]
        }
        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            setLoading(true)
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("avatar", selAvatarFile);
            formDataToSend.append("position", formData.position);
            formDataToSend.append("point", formData.point);
            formDataToSend.append("logo", selLogoFile);

            apiPost(UrlAdminSavePlayerPartner, formDataToSend)
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
    const onDropAvatar = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setAvatarUrl(URL.createObjectURL(files[0]));
        setSelAvatarFile(files[0]);
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
            className="add-player-partner-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <Spin spinning={loading}>
                <div>
                    <Row gutter={[16, 16]} align={'middle'} justify={'center'} style={{ marginTop: 20 }}>
                        <Col xs={24} md={24}>
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
                        <Col xs={24} md={24}>
                            <div className="avatar_uploader">
                                <label htmlFor="avatar_uploader">
                                    <input
                                        type="file"
                                        id="avatar_uploader"
                                        name="avatar_uploader"
                                        style={{ display: "none" }}
                                        accept="image/x-png, image/jpeg, image/jpg"
                                        onChange={onDropAvatar}
                                    />
                                    <span
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("avatar")
                                                ? `upload-logo-button error`
                                                : `upload-logo-button`
                                        }
                                    >
                                        Upload Avatar
                                    </span>
                                </label>
                            </div>
                            {avatarUrl == "" && formData.avatar != "" && (
                                <div style={{ marginTop: 10 }}>
                                    <Image width={160} src={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${formData.avatar}`} />
                                </div>
                            )}
                            {avatarUrl != "" && (
                                <div style={{ marginTop: 10 }}>
                                    <Image width={160} src={avatarUrl} />
                                </div>
                            )}
                        </Col>
                        <Col xs={24} md={24}>
                            <Input
                                name="position"
                                value={formData.position}
                                placeholder="Position"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("position")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={handleInputChange}
                            />

                        </Col>
                        <Col xs={24} md={24}>
                            <Input
                                name="point"
                                type='number'
                                value={formData.point}
                                placeholder="POINT"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("point")
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

export default confirmable(AddPlayerDlg);
