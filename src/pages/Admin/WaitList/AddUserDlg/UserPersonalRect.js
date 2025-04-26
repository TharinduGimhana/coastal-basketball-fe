import React, { useState } from "react";
import { Row, Col, Switch, Input, DatePicker } from "antd";
import { capitalizeFirstLetter, isNumber, isOver18 } from "constants/global";
import dayjs from 'dayjs';
const UserPersonalRect = (props) => {
    const { userData, formData, setFormData, errorFields, setErrorFields } = props;
    const { TextArea } = Input;
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

    return <div className="signup-form-personal">
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <p className="label-txt">First Name</p>
                <Input
                    name="first_name"
                    value={formData.first_name}
                    placeholder="John"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("first_name")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={handleInputChange}
                />
            </Col>
            <Col xs={24} md={12}>
                <p className="label-txt">Last Name</p>
                <Input
                    name="last_name"
                    value={formData.last_name}
                    placeholder="Doe"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("last_name")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={handleInputChange}
                />
            </Col>

            <Col xs={24} md={12}>
                <p className="label-txt">Date of Birth</p>
                <DatePicker
                    placeholder="DATE OF BIRTH"
                    format="DD-MM-YYYY"
                    allowClear={false}
                    value={
                        formData.birthday == "" ? "" : dayjs(formData.birthday, "DD-MM-YYYY")
                    }
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("birthday")
                            ? `date-picker common-input-error`
                            : `date-picker common-input`
                    }
                    onChange={(v, str) => {
                        if (errorFields.includes("birthday")) {
                            let errors = errorFields.filter((x) => x != "birthday");
                            setErrorFields([...errors]);
                        }
                        setFormData({ ...formData, birthday: str })
                    }}
                />
            </Col>
            <Col xs={24} md={12}>
                <p className="label-txt">Address</p>
                <Input
                    name="address"
                    value={formData.address}
                    placeholder="123 Main St, City, Country"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("address")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={handleInputChange}
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
                        let tmpPhone = "";
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
                    name="email"
                    type='email'
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                    />
                </Col>
            </>}
        </Row>
    </div>
}
export default UserPersonalRect;