import React, { useState, useEffect } from 'react';
import Toast from 'components/Toast/Toast';

import './index.css';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import ImgAuth from 'assets/png/logos/Coastal Basketball.png';
import { ROUTE_ADMIN_DASHBOARD } from 'constants/navigation_constants';
import { UrlAdminLogin } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';
import { useDispatch } from 'react-redux';
import { setAdminInfo } from '../../../../redux/reducers/adminSlice';
const LoginWidget = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            window.location.href = ROUTE_ADMIN_DASHBOARD;
        }
    }, [history]);

    const onFinish = async (formValues) => {

        setLoading(true)
        const formData = new FormData();
        formData.append("email", formValues.email);
        formData.append("password", formValues.password);
        apiPost(UrlAdminLogin, formData)
            .then((res) => {
                setLoading(false);
                localStorage.removeItem('token');
                localStorage.setItem('admin_token', res.token);
                dispatch(setAdminInfo(res.user_info));
                window.location.href = ROUTE_ADMIN_DASHBOARD;
            })
            .catch((err) => {
                setLoading(false);
                Toast(err, 2);
            });

    };

    return (
        <Row gutter={16} className="admin-signin-content" justify={"center"}>
            <Col sm={24} className="auth-part">
                <img className="" width="380" src={ImgAuth} alt="" />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{ marginTop: 20 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: '40px' }}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item >
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginWidget;