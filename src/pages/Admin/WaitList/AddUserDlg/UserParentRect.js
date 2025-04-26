import React, { useState } from "react";
import { Row, Col, Select, Input, Button, DatePicker, Divider, Switch } from "antd";
import { capitalizeFirstLetter, isNumber, isOver18 } from "constants/global";
import dayjs from 'dayjs';
const UserParentRect = (props) => {
    const { userData, formData, setFormData, errorFields, setErrorFields, addMore, childErrorFields, setChildErrorFields } = props;
    const { TextArea } = Input;
    const { Option } = Select;
    const handleInputChange = (e, type, key = null) => {
        let searchKey = key == null ? "" : key;
        if (key == null) {
            if (errorFields.includes(type)) {
                let errors = errorFields.filter((x) => x != type);
                setErrorFields([...errors]);
            }
            let tmpData = { ...formData }
            if (type.includes("name")) {
                tmpData[type] = capitalizeFirstLetter(e);
            } else {
                tmpData[type] = e;
            }
            setFormData(tmpData);
        } else {
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
        }
    };

    return <div className="signup-form-personal">

        <div className="block">
            <Row justify="space-between" align={"middle"}>
                <Col>
                    <span className="title">Child Info</span>
                </Col>
                <Col>
                    <Button className="btn-add-more" onClick={addMore}>Add More</Button>
                </Col>
            </Row>
            <Divider
                style={{ borderTop: "2px solid #11111121", marginBottom: 20 }}
            ></Divider>
            {
                formData.child_info.map((info, key) => {
                    return <div key={key}>
                        <p className="txt-kid">Kid {key + 1}</p>
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
            <Row justify="space-between" style={{ marginTop: 20 }}>
                <Col>
                    <span className="title">Parent Info</span>
                </Col>
                <Col>

                </Col>
            </Row>
            <Divider
                style={{ borderTop: "2px solid #11111121", marginBottom: 20 }}
            ></Divider>
            <Row justify="space-between" style={{ marginTop: 20 }}>
                <Col>
                    <span className="title">Parent Info</span>
                </Col>
                <Col>

                </Col>
            </Row>
            <Divider
                style={{ borderTop: "2px solid #11111121", marginBottom: 20 }}
            ></Divider>
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col xs={24} md={12}>
                    <p className="label-txt">First Name</p>
                    <Input
                        value={formData.first_name}
                        placeholder="John"
                        className={
                            errorFields !== undefined &&
                                errorFields.includes("first_name")
                                ? `common-input-error`
                                : `common-input`
                        }
                        onChange={(e) => {
                            handleInputChange(e.target.value, "first_name")
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <p className="label-txt">Last Name</p>
                    <Input
                        value={formData.last_name}
                        placeholder="Doe"
                        className={
                            errorFields !== undefined &&
                                errorFields.includes("last_name")
                                ? `common-input-error`
                                : `common-input`
                        }
                        onChange={(e) => {
                            handleInputChange(e.target.value, "last_name")
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <p className="label-txt">Phone Number</p>
                    <Input
                        type="text"
                        value={formData.phone_number}
                        placeholder="____-___-___"
                        className={
                            errorFields !== undefined &&
                                errorFields.includes("phone_number")
                                ? `common-input-error`
                                : `common-input`
                        }
                        onChange={(e, w) => {
                            let str = e.target.value;
                            let filStr = str.replace(/[- ]/g, "");
                            if (filStr == "" || filStr.length == 0) {
                                setFormData({
                                    ...formData,
                                    phone_number: "",
                                });
                                return;
                            }
                            if (!isNumber(filStr)) {
                                return;
                            }
                            if (filStr.length > 10) {
                                return;
                            }
                            if (errorFields.includes("phone_number")) {
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
                            setFormData({
                                ...formData,
                                phone_number: str,
                            });
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <p className="label-txt">Email Address</p>
                    <Input
                        type='email'
                        value={formData.email}
                        placeholder="EMAIL ADDRESS"
                        className={
                            errorFields !== undefined &&
                                errorFields.includes("email")
                                ? `common-input-error`
                                : `common-input`
                        }
                        onChange={(e) => {
                            handleInputChange(e.target.value, "email")
                        }}
                    />
                </Col>
                <Col xs={24} md={24}>
                    {userData ? <span>Reset Password</span> : <span>Set Password (Default Password: 123456)</span>}
                    <Switch
                        style={{ marginLeft: 10 }}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        checked={formData.is_default_password}
                        onChange={(e) => {
                            setFormData({ ...formData, is_default_password: e })
                        }} />
                </Col>
                {formData.is_default_password && <>
                    <Col xs={24} md={12}>
                        <p className="label-txt">Password</p>
                        <Input
                            name="password"
                            type='password'
                            autoComplete='off'
                            value={formData.password}
                            placeholder="PASSWORD"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("password")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={(e) => handleInputChange(e.target.value, "password")}
                        />

                    </Col>
                    <Col xs={24} md={12}>
                        <p className="label-txt">Confirm Password</p>
                        <Input
                            name="confirm_password"
                            type='password'
                            value={formData.confirm_password}
                            placeholder="CONFIRM PASSWORD"
                            className={
                                errorFields !== undefined &&
                                    errorFields.includes("confirm_password")
                                    ? `common-input-error`
                                    : `common-input`
                            }
                            onChange={(e) => handleInputChange(e.target.value, "confirm_password")}
                        />
                    </Col>
                </>}
            </Row>
        </div>

    </div >
}
export default UserParentRect;