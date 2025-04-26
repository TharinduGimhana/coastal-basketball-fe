import React, { useState } from "react";
import { Row, Col, Select, Input, Button, DatePicker, Divider, Switch } from "antd";
import { capitalizeFirstLetter, isNumber, isOver18 } from "constants/global";
import dayjs from 'dayjs';
import { DeleteOutlined } from "@ant-design/icons";
const UserParentRect = (props) => {
    const { formData, setFormData, errorFields, setErrorFields, addMore, onDeleteChild, addMoreAdult, onDeleteParent, childErrorFields, setChildErrorFields } = props;
    const { TextArea } = Input;
    const { Option } = Select;
    const handleParentInputChange = (e, type, key = null) => {
        let searchKey = key == null ? "" : key;
        if (errorFields.includes(searchKey + type)) {
            let errors = errorFields.filter((x) => x != searchKey + type);
            setErrorFields([...errors]);
        }
        let tmpList = [...formData.parent_info]
        if (type.includes("name")) {
            tmpList[key][type] = capitalizeFirstLetter(e);
        } else {
            tmpList[key][type] = e;
        }
        setFormData({ ...formData, parent_info: tmpList });
    };
    const handleInputChange = (e, type, key = null) => {
        let searchKey = key == null ? "" : key;
        if (childErrorFields.includes(searchKey + type)) {
            let errors = childErrorFields.filter((x) => x != searchKey + type);
            setChildErrorFields([...errors]);
        }
        let tmpList = [...formData.child_info]
        if (type.includes("name")) {
            tmpList[key][type] = capitalizeFirstLetter(e);
        } else {
            tmpList[key][type] = e;
        }
        setFormData({ ...formData, child_info: tmpList });
    };
    return <div className="signup-form-personal">

        <div className="block">
            <Row justify="space-between">
                <Col>
                    <span className="title">Parent Info</span>
                </Col>
                <Col>

                </Col>
            </Row>

            <Divider
                style={{ borderTop: "2px solid #11111121", marginBottom: 20 }}
            ></Divider>

            {formData.parent_info.map((info, key) => {
                return <div key={key} style={{ marginTop: 20 }}>
                    <Row justify={"space-between"} align={"middle"}>
                        <Col><p className="txt-kid">Adult {key + 1} {key == 1 && "(Optional)"}</p></Col>
                        {key > 0 && <Col><DeleteOutlined onClick={() => {
                            onDeleteParent(key);
                        }} style={{ color: 'red', cursor: 'pointer' }} /></Col>}
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <p className="label-txt">First Name</p>
                            <Input
                                value={info.first_name}
                                placeholder="John"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "first_name")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e) => {
                                    handleParentInputChange(e.target.value, "first_name", key)
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className="label-txt">Last Name</p>
                            <Input
                                value={info.last_name}
                                placeholder="Doe"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "last_name")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e) => {
                                    handleParentInputChange(e.target.value, "last_name", key)
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className="label-txt">Phone Number</p>
                            <Input
                                type="text"
                                value={info.phone_number}
                                placeholder="____-___-___"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "phone_number")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e, w) => {
                                    let str = e.target.value;
                                    let filStr = str.replace(/[- ]/g, "");
                                    if (filStr == "" || filStr.length == 0) {
                                        let tmpList = [...formData.parent_info]
                                        tmpList[key]['phone_number'] = "";
                                        setFormData({
                                            ...formData,
                                            parent_info: tmpList,
                                        });
                                        return;
                                    }
                                    if (!isNumber(filStr)) {
                                        return;
                                    }
                                    if (filStr.length > 10) {
                                        return;
                                    }
                                    if (errorFields.includes(key + "phone_number")) {
                                        let errors = errorFields.filter((y) => y != "phone_number");
                                        setErrorFields([...errors]);
                                    }
                                    if (filStr.length > 4 && filStr.length < 7) {
                                        str = filStr.slice(0, 4) + "-" + filStr.slice(4);
                                    }

                                    if (filStr.length > 7) {
                                        str =
                                            filStr.slice(0, 4) +
                                            "-" +
                                            filStr.slice(4, 7) +
                                            "-" +
                                            filStr.slice(7);
                                    }
                                    let tmpList = [...formData.parent_info]
                                    tmpList[key]['phone_number'] = str;
                                    setFormData({
                                        ...formData,
                                        parent_info: tmpList,
                                    });
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className="label-txt">Email Address</p>
                            <Input
                                type='email'
                                value={info.email}
                                placeholder="EMAIL ADDRESS"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "email")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e) => {
                                    handleParentInputChange(e.target.value, "email", key)
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className="label-txt">Password</p>
                            <Input.Password
                                type='password'
                                visibilityToggle={true}
                                value={info.password}
                                placeholder="Password"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "password")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e) => {
                                    handleParentInputChange(e.target.value, "password", key)
                                }}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <p className="label-txt">Confirm Password</p>
                            <Input.Password
                                type='password'
                                visibilityToggle={true}
                                value={info.confirm_password}
                                placeholder="Password"
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes(key + "confirm_password")
                                        ? `common-input-error`
                                        : `common-input`
                                }
                                onChange={(e) => {
                                    handleParentInputChange(e.target.value, "confirm_password", key)
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            })}
            {formData.parent_info.length < 2 && <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                    <Button className="btn-add-more" onClick={addMoreAdult}>Add More Adult (Optional)</Button>
                </Col>
            </Row>}

            <Row justify="space-between" align={"middle"} style={{ marginTop: 20 }}>
                <Col>
                    <span className="title">Child Info</span>
                </Col>
            </Row>
            <Divider
                style={{ borderTop: "2px solid #11111121", marginBottom: 20 }}
            ></Divider>
            {
                formData.child_info.map((info, key) => {
                    return <div key={key} style={{ marginTop: 20 }}>
                        <Row justify={"space-between"} align={"middle"}>
                            <Col><p className="txt-kid">Kid {key + 1}</p></Col>
                            {key > 0 && <Col><DeleteOutlined onClick={() => {
                                onDeleteChild(key);
                            }} style={{ color: 'red', cursor: 'pointer' }} /></Col>}
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12}>
                                <p className="label-txt">First Name</p>
                                <Input
                                    value={info.first_name}
                                    placeholder="John"
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "first_name")
                                            ? `common-input-error`
                                            : `common-input`
                                    }
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, "first_name", key)
                                    }}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <p className="label-txt">Last Name</p>
                                <Input
                                    value={info.last_name}
                                    placeholder="Doe"
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "last_name")
                                            ? `common-input-error`
                                            : `common-input`
                                    }
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, "last_name", key)
                                    }}
                                />
                            </Col>

                            <Col xs={24} md={12}>
                                <p className="label-txt">Date of Birth</p>
                                <DatePicker
                                    placeholder="DATE OF BIRTH"
                                    format="DD-MM-YYYY"
                                    allowClear={false}
                                    value={
                                        info.birthday == "" ? "" : dayjs(info.birthday, "DD-MM-YYYY")
                                    }
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "birthday")
                                            ? `date-picker common-input-error`
                                            : `date-picker common-input`
                                    }
                                    onChange={(v, str) => {
                                        if (childErrorFields.includes(key + "birthday")) {
                                            let errors = childErrorFields.filter((x) => x != key + "birthday");
                                            setChildErrorFields([...errors]);
                                        }
                                        let tmpList = [...formData.child_info]
                                        tmpList[key]["birthday"] = str;
                                        setFormData({ ...formData, child_info: tmpList })
                                    }}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <p className="label-txt">Gender</p>
                                <Select
                                    placeholder="GENDER"
                                    style={{ width: '100%', height: 44 }}
                                    value={info.gender || undefined}
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "gender")
                                            ? `common-select-error`
                                            : `common-select`
                                    }
                                    onSelect={(v) => {
                                        if (childErrorFields.includes(key + "gender")) {
                                            let errors = childErrorFields.filter(
                                                (y) => y != key + "gender"
                                            );
                                            setChildErrorFields([...errors]);
                                        }
                                        let tmpList = [...formData.child_info]
                                        tmpList[key]["gender"] = v;
                                        setFormData({ ...formData, child_info: tmpList })
                                    }}
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Col>
                            <Col xs={24} md={12}>
                                <p className="label-txt">Address</p>
                                <TextArea
                                    value={info.address}
                                    rows={3}
                                    placeholder="123 Main St, City, Country"
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "address")
                                            ? `common-input-error`
                                            : `common-input`
                                    }
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, "address", key)
                                    }}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <p className="label-txt">Note</p>
                                <TextArea
                                    value={info.note}
                                    rows={3}
                                    placeholder=""
                                    className={
                                        childErrorFields !== undefined &&
                                            childErrorFields.includes(key + "note")
                                            ? `common-input-error`
                                            : `common-input`
                                    }
                                    onChange={(e) => {
                                        handleInputChange(e.target.value, "note", key)
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                })
            }
            <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                    <Button className="btn-add-more" onClick={addMore}>Add More</Button>
                </Col>
            </Row>
        </div>

    </div >
}
export default UserParentRect;