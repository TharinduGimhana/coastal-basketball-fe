import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducers/userSlice";
import { updateSubscription } from "../../redux/reducers/subscriptionSlice";
import { Link } from "react-router-dom";
import { Button, ConfigProvider, Form, Input, Checkbox, Spin, Modal, Row, Col } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import Logo from "assets/png/logo.png";
import { UrlSignin } from "ajax/apiUrls";
import { apiPost } from "ajax/apiServices";
import Toast from "components/Toast/Toast";

import './index.css';
import useStyle from './useStyle';
import { updateBaseMembership } from "../../redux/reducers/membershipSlice";
import { useHistory } from "react-router-dom";
import { ROUTE_USER_SUBSCRIPTION } from "constants/navigation_constants";
const Signin = (props) => {
    const history = useHistory();
    const userInfo = useSelector((state) => state.user);
    const userSubscription = useSelector((state) => state.subscription);
    const baseMembership = useSelector((state) => state.base_membership);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [signinResponse, setSigninResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalLoginConfirm, setLoginConfirm] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const { styles } = useStyle();
    const dispatch = useDispatch();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = "/";
        }
    }, [])

    const onSigninFinish = async (values) => {
        setSigninResponse("");
        setLoading(true);
        const formData = new FormData();
        formData.append("password", values.password);
        formData.append("email", values.email);

        apiPost(UrlSignin, formData)
            .then((res) => {
                localStorage.removeItem('admin_token');
                localStorage.setItem("token", res.token);
                dispatch(setUserInfo(res.user_info));
                dispatch(updateSubscription(res.subscription));
                dispatch(updateBaseMembership(res.base_membership));
                setTimeout(() => {
                    setLoading(false);
                    if (window.location.search.includes("?ref=")) {
                        history.push(ROUTE_USER_SUBSCRIPTION)
                    } else {
                        if (res.user_info.signup_type == "parent") {
                            let tmpChildList = [...res.user_info.child_info]
                            tmpChildList = tmpChildList.filter((x) => x.subscription == "")
                            if (tmpChildList.length > 0) {
                                history.push(ROUTE_USER_SUBSCRIPTION)
                            } else {
                                setLoginConfirm(true);
                            }
                        } else {
                            if (res.subscription?.status.toLowerCase() == "active") {
                                setLoginConfirm(true);
                            } else {
                                history.push(ROUTE_USER_SUBSCRIPTION)
                            }
                        }
                    }
                }, 1000)

            })
            .catch((err) => {
                Toast(err, 2);
                setLoading(false)
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleChange = (e) => {
        setSigninResponse("");
    };

    const handleBack = () => {
        window.location.href = "/";
    }

    const handleShowLogin = (type) => {
        if (type == "ok") {
            setModal2Open(true);
            setLoginConfirm(false);
        } else {
            window.location.href = "/";  // Navigate to the signin page if not authenticated
        }
    };

    return (
        <>
            <div className="client-auth-content">
                <div className="client-auth-card">
                    <a href="#" onClick={handleBack} type="button" className="btn-back-icon btn-back-signin-icon"><ArrowLeftOutlined style={{ fontSize: '20px' }} /></a>
                    <div className="mb-30 center">
                        <img src={Logo} alt="Modal Image" />
                    </div>
                    <h2 className="mb-30 text-center">Login to your account</h2>
                    <ConfigProvider
                        button={{
                            className: styles.linearGradientButton,
                        }}
                    >
                        <Form
                            name="signup"
                            layout="vertical"
                            onFinish={onSigninFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email address" },
                                    { type: "email", message: "Please enter a valid email" },
                                ]}
                            >
                                <Input placeholder="john.doe@example.com" onChange={handleChange} className="client-auth-input" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                validateStatus={passwordsMatch ? '' : 'error'} // Remove icons by leaving the status blank
                                rules={[
                                    { required: true, message: 'Please enter your password' },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Password"
                                    onChange={handleChange}
                                    iconRender={(visible) =>
                                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                                    }
                                    visibilityToggle={{
                                        visible: passwordVisible,
                                        onVisibleChange: setPasswordVisible,
                                    }}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Row justify={"space-between"} align="middle" gutter={[16, 16]}>
                                    <Col><Checkbox>Keep me signed in</Checkbox>
                                    </Col>
                                    <Col><Link to="/forgot-password" className="client-auth-text">Forgot Password?</Link>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <p style={{ color: 'red', marginTop: '-10px', marginBottom: '10px' }}>{signinResponse}</p>
                                <Button type="primary" htmlType="submit" block>
                                    {loading ? (
                                        <>
                                            <Spin size="small" style={{ marginRight: 8, color: 'white' }} />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                        </>
                                    )}
                                </Button>
                            </Form.Item>
                            <div className="center">
                                <Link to="/signup" className="client-auth-text">Don't have an account?</Link>
                            </div>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
            {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
            <Modal
                centered
                open={modalLoginConfirm}
                onOk={() => handleShowLogin("ok")}
                onCancel={() => handleShowLogin("cancel")}
                okText="Yes"
                cancelText="No"
                closable={false} // Removes the close (×) button
            >
                <div style={{ textAlign: 'center' }}>
                    <Link to="/">
                        <img src={Logo} alt="Modal Image" style={{ maxWidth: '100%', marginBottom: '20px' }} />
                    </Link>
                    <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                        <div style={{ margin: 'auto', width: 'auto', textAlign: 'left' }}>
                            Press Yes to continue to Registration screen, <br />Press No to continue browsing the site
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default withRouter(Signin);