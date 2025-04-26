import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, message, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import Toast from 'components/Toast/Toast';
import './index.css';
import useStyle from './useStyle';
import { apiPost } from 'ajax/apiServices';
import { UrlReSendOtpCode, UrlVerifyOtpCode } from 'ajax/apiUrls';

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [otpResponse, setOtpResponse] = useState("");
  const [activeInput, setActiveInput] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [verifyResponse, setVerifyResponse] = useState("");
  const { styles } = useStyle();
  const inputRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (isResendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      setTimer(30);
    }

    return () => clearInterval(countdown);
  }, [isResendDisabled, timer]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if it exists
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        // If it's the last input, trigger the API call
        handleSubmit(newOtp.join("").trim());
      }
    }
  };

  // Handle keyboard input navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle pasting OTP
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.length === OTP_LENGTH && /^\d+$/.test(pastedText)) {
      setOtp(pastedText.split(""));
      setActiveInput(OTP_LENGTH - 1);
      inputRefs.current[OTP_LENGTH - 1].focus();
      // Trigger API call after pasting the OTP
      handleSubmit(pastedText);
    }
  };

  // Handle OTP submission
  const handleSubmit = async (otpCode) => {
    if (otpCode.length === OTP_LENGTH) {
      const formData = new FormData();
      formData.append("email", localStorage.getItem('forgot_email'));
      formData.append("otp", otpCode);

      apiPost(UrlVerifyOtpCode, formData)
        .then((res) => {
          setTimeout(() => {
            window.location.href = "/signin";
          }, 1000);
        })
        .catch((err) => {
          setVerifyResponse(err);
        });

    } else {
      setVerifyResponse('Otp type issue');
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setOtp(new Array(OTP_LENGTH).fill(""));
    setActiveInput(0);
    setIsResendDisabled(true);
    inputRefs.current[0].focus();
    Toast("OTP Resent!", 1);

    const formData = new FormData();
    formData.append("email", localStorage.getItem('forgot_email'));

    apiPost(UrlReSendOtpCode, formData)
      .then((res) => {
        setVerifyResponse("OTP code has been sent to your email again. Please check your inbox.");
      })
      .catch((err) => {
        setVerifyResponse(err);
      });
  };

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="client-auth-content">
      <div className="client-otp-card">
        <div style={{ position: 'relative' }}>
          <a href="#" onClick={handleBack} type="button" style={{ position: 'absolute', left: '0', border: 'none', background: 'none', color: 'black' }}><ArrowLeftOutlined style={{ fontSize: '20px' }} /></a>
          <h3 className="text-center mb-40">Please Enter Your CODE</h3>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <div className="otp-input-container" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setActiveInput(index)}
                  style={{
                    height: "50px",
                    textAlign: "center",
                    margin: "0 5px",
                    border: "none",
                    borderBottom: "2px solid #1890ff",
                    outline: "none",
                    fontSize: "18px",
                  }}
                />
              ))}
            </div>

            <div className="resend-container">
              <Button
                type="link"
                disabled={isResendDisabled}
                onClick={handleResend}
                style={{ float: 'right' }}
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend"}
              </Button>
            </div><br />

            <p style={{ color: 'red', marginBottom: '10px' }}>{verifyResponse}</p>
            <Button
              type="primary"
              onClick={() => handleSubmit(otp.join(""))}
              className="verify-send-btn"
              style={{ marginTop: "20px" }}
            >
              SEND
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;