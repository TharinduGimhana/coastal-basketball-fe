import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, message, ConfigProvider } from 'antd';
import Toast from 'components/Toast/Toast';
import './index.css';
import useStyle from './useStyle';
import { apiPost } from 'ajax/apiServices';
import { UrlSendOtpCode, UrlVerifyOtpCode } from 'ajax/apiUrls';

const OTP_LENGTH = 6;

const SignupOtp = (props) => {
  const { verified, setVerified, signupForm, loading, setLoading } = props
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [verifyResponse, setVerifyResponse] = useState("");
  const { styles } = useStyle();
  const inputRefs = useRef([]);

  useEffect(() => {
    handleResend(false)
  }, [])
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
      setLoading(true)
      const formData = new FormData();
      formData.append("main_email", signupForm.parent_info[0].email);
      formData.append("other_email", signupForm.parent_info.length > 1 ? signupForm.parent_info[1].email : "");
      formData.append("otp", otpCode);
      apiPost(UrlVerifyOtpCode, formData)
        .then((res) => {
          setVerified(true);
          setLoading(false)
        })
        .catch((err) => {
          Toast(err, 2);
          setLoading(false)
        });

    } else {
      setVerifyResponse('Otp type issue');
    }
  };

  // Handle resend OTP
  const handleResend = async (flag) => {
    setLoading(true);
    setOtp(new Array(OTP_LENGTH).fill(""));
    setActiveInput(0);
    setIsResendDisabled(true);
    inputRefs.current[0].focus();
    Toast(flag ? "Sent Verification Code again" : "Sent Verification Code", 1);

    const formData = new FormData();
    formData.append("main_email", signupForm.parent_info[0].email);
    formData.append("other_email", signupForm.parent_info.length > 1 ? signupForm.parent_info[1].email : "");
    formData.append("first_name", signupForm.parent_info[0].first_name);
    formData.append("other_first_name", signupForm.parent_info.length > 1 ? signupForm.parent_info[1].first_name : "");
    apiPost(UrlSendOtpCode, formData)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        Toast(err, 2);
        setLoading(false);
      });

    setLoading(false);

  };

  const handleBack = () => {
    window.history.back();
  }

  return (
    <div className="client-auth-content">
      <div className="client-otp-card">
        <div>
          To complete your registration, we've sent verification code to your mail <a href={`mailto:${signupForm.parent_info[0].email}`}>{signupForm.parent_info[0].email}</a>
          {signupForm.parent_info.length > 1 ? <>, <a href={`mailto:${signupForm.parent_info[1].email}`}>{signupForm.parent_info[1].email}</a></> : ""}.
          Please check your mail box.
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default SignupOtp;