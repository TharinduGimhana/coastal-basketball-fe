import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { Modal, Row, Col, Button, ConfigProvider, Space, Form, Input, Spin } from "antd";
import { createStyles } from 'antd-style';
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from 'axios';
import Toast from 'components/Toast/Toast';
import './index.css';
import useStyle from './useStyle';
import Logo from "assets/png/logo.png";
import { UrlForgotPassword } from "ajax/apiUrls";
import { apiPost } from "ajax/apiServices";

function Forgotpassword(props) {
  const [showType, setShowType] = useState(1);
  const [signinResponse, setSigninResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { styles } = useStyle();
  const onSigninFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    localStorage.setItem("forgot_email", values.email);

    apiPost(UrlForgotPassword, formData)
      .then((res) => {
        console.log("res:", res)
        setShowType(2);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Toast(err, 2);
      });

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e) => {
    setSigninResponse("");
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/signin";
      setLoading(false);
    }, 500);

  }
  const handleBack = () => {
    window.history.back();
  }
  return (
    <div className="client-auth-content">
      <div className="client-auth-card">
        <div className="mb-30 center">
          <img src={Logo} alt="Modal Image" />
        </div>
        {showType == 1 ? (
          <div>
            <h2 className="mb-30 text-center">Forgot Password</h2>
            <a href="#" onClick={handleBack} type="button" className="btn-back-icon btn-back-forgot-icon"><ArrowLeftOutlined style={{ fontSize: '20px' }} /></a>
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
                        Send Password Reset Email
                      </>
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        ) : (
          <div>
            <h3 className="mb-30 text-left">Hi, Check Your Mail</h3>
            <p>We have a sent new password to your email.</p>
            <ConfigProvider
              button={{
                className: styles.linearGradientButton,
              }}
            >
              {/* <Button
                      type="primary"
                      onClick={() => handleSubmit()}
                      className="verify-send-btn"
                      style={{ marginTop: "20px" }}
                    >
                      Sign In
                    </Button> */}
              <Button
                type="primary"
                onClick={() => handleSubmit()}
                className="verify-send-btn"
                style={{ marginTop: "20px" }}
              >
                {loading ? (
                  <>
                    <Spin size="small" style={{ marginRight: 8, color: 'white' }} />
                    Loading...
                  </>
                ) : (
                  <>
                    Sign In
                  </>
                )}
              </Button>
            </ConfigProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Forgotpassword);