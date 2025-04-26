import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, ConfigProvider, DatePicker, Form, Input, Checkbox, Spin } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "assets/png/logo.png";

import { Typography } from "antd";
import useStyle from './useStyle';
import { UrlChangePassword, UrlVerifyLink } from "ajax/apiUrls";
import { apiPost } from "ajax/apiServices";
import Toast from "components/Toast/Toast";

export const NotFound = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { styles } = useStyle();
  useEffect(async () => {
    const formData = new FormData();
    formData.append("verify_link", location.pathname);
    apiPost(UrlVerifyLink, formData)
      .then((res) => {
        setShowPassword(true);
      })
      .catch((err) => {
      });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("email", localStorage.getItem("forgot_email"));

    apiPost(UrlChangePassword, formData)
      .then((res) => {
        setLoading(false);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1800);
      })
      .catch((err) => {
        setLoading(false);
        Toast(err, 2);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {
        !showPassword ? (
          <Typography variant="h2">404: page not found!</Typography>
        ) : (
          <div className="client-auth-content">
            <div className="client-auth-card">
              <div className="mb-30 center">
                <img src={Logo} alt="Modal Image" />
              </div>
              <div>
                <h3 className="mb-30 text-left">Please type your new password</h3>
                <ConfigProvider
                  button={{
                    className: styles.linearGradientButton,
                  }}
                >
                  <Form
                    name="signup"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="New Password"
                      name="password"
                      rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                      <Input.Password
                        placeholder="New Password"
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
                      <Button type="primary" htmlType="submit" block>
                        {loading ? (
                          <>
                            <Spin size="small" style={{ marginRight: 8, color: 'white' }} />
                            Loading...
                          </>
                        ) : (
                          <>
                            Change
                          </>
                        )}
                      </Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
};