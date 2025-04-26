import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Select, message, Typography, Image, notification, Switch } from 'antd';
import Toast from 'components/Toast/Toast';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, openDangerNotification } from "constants/global";

import "./AddEventDlg.css";
import { UrlAdminSaveEvent } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';

function AddEventDlg(props) {
    const { show, proceed, title, info } = props;
    const [formData, setFormData] = useState({});
    const [selImageFile, setImageFile] = useState("");
    const [imagePath, setImagePath] = useState("");

    const [errorFields, setErrorFields] = useState([]);

    useEffect(() => {
        if (info) {
            setFormData({ ...formData, ...info })
        } else {
            setFormData({
                id: "",
                image_path: "",
                title: "",
                link: "",
                active: true
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
        errorList = isEmpty(formData, "link", errorList);

        if (selImageFile === "" && formData.image_path === "") {
            errorList = [...errorList, "image_path"]
        }
        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const formDataToSend = new FormData();
            formDataToSend.append("id", formData.id);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("link", formData.link);
            formDataToSend.append("active", formData.active);
            formDataToSend.append("image_path", selImageFile);

            apiPost(UrlAdminSaveEvent, formDataToSend)
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
    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="add-event-modal"
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
                        <span style={{ paddingBottom: 3 }}>Link</span>
                        <Input
                            name="link"
                            prefix="https://"
                            value={formData.link}
                            placeholder="Link"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("link")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={handleInputChange}
                        />

                    </Col>
                    <Col xs={24} md={24}>
                        <span style={{ paddingBottom: 3 }}>Status</span>
                        <Switch
                            style={{ marginLeft: 10 }}
                            checkedChildren="Active"
                            unCheckedChildren="In Active"
                            checked={formData.active}
                            onChange={(e) => {
                                setFormData({ ...formData, active: e })
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

export default confirmable(AddEventDlg);
