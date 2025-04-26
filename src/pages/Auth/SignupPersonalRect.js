import React, { useState } from "react";
import { Row, Col, Form, Input, DatePicker } from "antd";
import { capitalizeFirstLetter, isNumber, isOver18 } from "constants/global";
import dayjs from 'dayjs';
const SignupPersonalRect = (props) => {
    const { formData, setFormData, errorFields, setErrorFields } = props;
    const { TextArea } = Input;
    const handleInputChange = (e, type) => {
        if (errorFields.includes(type)) {
            let errors = errorFields.filter((x) => x != type);
            setErrorFields([...errors]);
        }
        let tmpData = { ...formData }
        if (type.includes("name")) {
            tmpData[type] = capitalizeFirstLetter(e)
        } else {
            tmpData[type] = e
        }

        setFormData(tmpData);
    };

    return <div className="signup-form-personal">
        <Row gutter={[16, 16]}>
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
                    value={formData.address}
                    placeholder="123 Main St, City, Country"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("address")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={(e) => {
                        handleInputChange(e.target.value, "address")
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
            <Col xs={24} md={12}>
                <p className="label-txt">Password</p>
                <Input
                    type='password'
                    value={formData.password}
                    placeholder="Password"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("password")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={(e) => {
                        handleInputChange(e.target.value, "password")
                    }}
                />
            </Col>
            <Col xs={24} md={12}>
                <p className="label-txt">Confirm Password</p>
                <Input
                    type='password'
                    value={formData.confirm_password}
                    placeholder="Password"
                    className={
                        errorFields !== undefined &&
                            errorFields.includes("confirm_password")
                            ? `common-input-error`
                            : `common-input`
                    }
                    onChange={(e) => {
                        handleInputChange(e.target.value, "confirm_password")
                    }}
                />
            </Col>
        </Row>
    </div>
}
export default SignupPersonalRect;