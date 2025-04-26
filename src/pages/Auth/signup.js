import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Button, Col, Input, Row, Select, Radio, Typography, Upload, DatePicker, notification, Form, Spin, ConfigProvider } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, LoadingOutlined, DotNetOutlined } from "@ant-design/icons";
import "../Register/Register1Page.css";
import ImgRegisterLogo from "assets/png/slide-back.jpg"
import useStyle from './useStyle';
import axios from 'axios';
import "./index.css";
import SignupPersonalRect from "./SignupPersonalRect";
import { isEmpty, numberWithCommas, ValidateEmail } from "constants/global";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionForm from "components/Stripe/SubscriptionForm";
import SignupOtp from "./SignupOtp";
import Toast from "components/Toast/Toast";
import SignupParentRect from "./SignupParentRect";
import MembershipWidget from "components/MembershipWidget/MembershipWidget";
import SubscriptionOrder from "components/Stripe/SubscriptionOrder";
import { apiGet, apiPost } from "ajax/apiServices";
import { UrlAddSubscription, UrlGetSubscriptionSetting, UrlSignup } from "ajax/apiUrls";
import { showSkipModal } from "components/SkipModal/showSkipModal";
import ChildWidget from "components/ChildWidget/ChildWidget";
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);


const SignUp = ({ history }) => {

    const [signupResponse, setSignupResponse] = useState("");
    const [signupForm, setSignupForm] = useState({
        signup_type: "parent",
        parent_info: [
            {
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                password: "",
                confirm_password: ""
            }
        ],
        child_info: [
            {
                first_name: "",
                last_name: "",
                birthday: "",
                gender: "",
                address: "",
                note: ""
            }
        ]
    })
    const [childList, setChildList] = useState([]);
    const [subscriptionSettings, setSubscriptionSettings] = useState([]);
    const [baseMembership, setBaseMembership] = useState(null);
    const [selSubscription, setSelSubscription] = useState(null);
    const [termCheck, setTermCheck] = useState(false);
    const [step, setStep] = useState(0);
    const [verified, setVerified] = useState(false);
    const [errorFields, setErrorFields] = useState([]);
    const [childErrorFields, setChildErrorFields] = useState([]);

    const [loading, setLoading] = useState(false);
    const { styles } = useStyle();


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (verified) {
            onSignup();
        }
    }, [verified])
    const fetchData = async () => {
        setLoading(true);
        apiGet(UrlGetSubscriptionSetting)
            .then((res) => {
                let tmpSubList = []
                res.map((x, index) => {
                    let tmpObj = { ...x }
                    tmpObj = { ...tmpObj, checked: false }
                    if (parseInt(tmpObj.package) == 1) {
                        setBaseMembership(tmpObj);
                    } else {
                        tmpSubList = [...tmpSubList, tmpObj]
                    }
                })
                setSubscriptionSettings(tmpSubList);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };


    const validateFields = () => {
        var errorList = Array();
        var childErrorList = Array();
        let tmpAdultList = [...signupForm.parent_info];
        tmpAdultList.map((x, index) => {
            errorList = isEmpty(x, "first_name", errorList, index);
            errorList = isEmpty(x, "last_name", errorList, index);
            errorList = isEmpty(x, "phone_number", errorList, index);
            errorList = isEmpty(x, "email", errorList, index);
            if (!errorList.includes("email")) {
                if (!ValidateEmail(x.email)) {
                    errorList = [...errorList, index + "email"]
                }
            }
            errorList = isEmpty(x, "password", errorList, index);
            errorList = isEmpty(x, "confirm_password", errorList, index);
            if (!errorList.includes("password") && !errorList.includes("confirm_password")) {
                if (x.password != x.confirm_password) {
                    errorList = [...errorList, index + "confirm_password"]
                }
            }
            if (index == 1) {
                if (x.email != "" && x.email == signupForm.parent_info[0].email) {
                    errorList = [...errorList, index + "email"]
                    Toast("Email address is duplicated", 2);
                }
                if (x.phone_number != "" && x.phone_number == signupForm.parent_info[0].phone_number) {
                    errorList = [...errorList, index + "phone_number"]
                    Toast("Phone number is duplicated", 2);
                }
                if (x.password != "" && x.password == signupForm.parent_info[0].password) {
                    errorList = [...errorList, index + "password"]
                    Toast("Password is duplicated", 2);
                }
            }
        })

        let tmpList = [...signupForm.child_info];
        tmpList.map((x, index) => {
            childErrorList = isEmpty(x, "first_name", childErrorList, index);
            childErrorList = isEmpty(x, "last_name", childErrorList, index);
            childErrorList = isEmpty(x, "birthday", childErrorList, index);
            childErrorList = isEmpty(x, "gender", childErrorList, index);
            childErrorList = isEmpty(x, "address", childErrorList, index);
        })

        setErrorFields([...errorList]);
        setChildErrorFields([...childErrorList]);
        return errorList.length == 0;
    }
    const onSubmit = async () => {
        if (loading) return
        setSignupResponse("");
        if (step == 0) {
            let validate = await validateFields();
            if (!validate) return;
        }
        if (step == 1 && !verified) {
            return;
        }
        if (step == 2 && !selSubscription) {
            Toast("You are registered in Non-Member", 1)
            setTimeout(() => {
                window.location.href = "/signin";
            }, 1000)
        } else {
            setStep(step + 1);
        }
    };
    const onPayFinished = () => {
        Toast("Your membership registration has been completed successfully!", 1)
        setTimeout(() => {
            window.location.href = "/signin";
        }, 1000)
    }

    const onSignup = async () => {
        setLoading(true);
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const userIp = ipResponse.data.ip;

        const formData = new FormData();
        formData.append("signup_type", signupForm.signup_type);
        formData.append("parent_info", JSON.stringify(signupForm.parent_info));
        formData.append("child_info", JSON.stringify(signupForm.child_info));
        formData.append("password", signupForm.password);
        formData.append("ip_address", userIp);
        apiPost(UrlSignup, formData)
            .then((res) => {
                setLoading(false);
                Toast("Your account has been created successfully!", 1)
                setStep(step + 1);
                let tmpList = [];
                tmpList = [...tmpList, { user_id: res.user_id, first_name: signupForm.first_name, last_name: signupForm.last_name, type: "individual", checked: false }]

                res.child_ids.map((x) => {
                    tmpList = [...tmpList, { ...x, user_id: x.id, checked: true, type: "child" }]
                })
                setChildList(tmpList)
            })
            .catch((err) => {
                Toast(err, 2);
                setLoading(false)
            });
    }

    const onPrev = () => {
        setStep(step - 1)
    }
    const addMore = () => {
        let tmpList = [...signupForm.child_info]
        tmpList = [...tmpList, {
            first_name: "",
            last_name: "",
            birthday: "",
            gender: "",
            address: "",
            note: ""
        }]
        setSignupForm({ ...signupForm, child_info: tmpList })
    }
    const onDeleteChild = (key) => {
        let tmpList = [...signupForm.child_info]
        tmpList = tmpList.filter((x, index) => index != key);
        setSignupForm({ ...signupForm, child_info: tmpList })
    }
    const addMoreAdult = () => {
        let tmpList = [...signupForm.parent_info]
        tmpList = [...tmpList, {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: ""
        }]
        setSignupForm({ ...signupForm, parent_info: tmpList })
    }
    const onDeleteParent = (key) => {
        let tmpList = [...signupForm.parent_info]
        tmpList = tmpList.filter((x, index) => index != key);
        setSignupForm({ ...signupForm, parent_info: tmpList })
    }
    const onBuy = () => {
        let tmpList = [...childList]
        tmpList = tmpList.filter((x) => x.checked)
        if (tmpList.length == 0) {
            Toast("Please select user to subscribe");
            return;
        }
        setTimeout(() => {
            setStep(step + 1);
        }, 1000)
    }
    const onCancel = () => {

    }

    return (
        <HomeLayout>
            <div style={{ background: '#f3f3ea' }}>
                <div className='signup-logo'>
                    <img src={ImgRegisterLogo} width="100%" />
                </div>

                <div className='signup-form auth'>
                    <h1 className="mb-30">Welcome Here!</h1>
                </div>
                <div className='register-form signup-form'>
                    <Spin spinning={loading}>
                        <div className='register-form-title'>
                            {step == 0 && <h1>Your Information</h1>}
                            {step == 1 && <h1>Please verify</h1>}
                            {step == 2 && <h1>Membership Plan</h1>}
                            {step == 3 && <h1>Order Summary</h1>}
                            {step != 0 && <div className="register-form-back" onClick={onPrev}><ArrowLeftOutlined /></div>}
                        </div>
                        <ConfigProvider
                            button={{
                                className: styles.linearGradientButton,
                            }}
                        >
                            <Spin spinning={loading}>
                                <div
                                    className="auth-form"
                                >
                                    {step == 0 && <>
                                        {signupForm.signup_type == "individual" ?
                                            <SignupPersonalRect
                                                formData={signupForm}
                                                setFormData={setSignupForm}
                                                errorFields={errorFields}
                                                setErrorFields={setErrorFields}
                                            /> : <SignupParentRect
                                                formData={signupForm}
                                                setFormData={setSignupForm}
                                                errorFields={errorFields}
                                                setErrorFields={setErrorFields}
                                                childErrorFields={childErrorFields}
                                                setChildErrorFields={setChildErrorFields}
                                                addMore={addMore}
                                                onDeleteChild={onDeleteChild}
                                                addMoreAdult={addMoreAdult}
                                                onDeleteParent={onDeleteParent}
                                            />}
                                    </>}
                                    {step == 1 && <SignupOtp
                                        signupForm={signupForm}
                                        verified={verified}
                                        loading={loading}
                                        setLoading={setLoading}
                                        setVerified={setVerified}
                                    />}
                                    {step == 2 && childList.length != 0 && <ChildWidget
                                        childList={childList}
                                        setChildList={setChildList}
                                    />}
                                    {step == 2 && <MembershipWidget
                                        baseSubscriptionInfo={baseMembership}
                                        setBaseMembership={setBaseMembership}
                                        subscriptionSettings={subscriptionSettings}
                                        setSubscriptionSettings={setSubscriptionSettings}
                                        selSubscription={selSubscription}
                                        setSelSubscription={setSelSubscription}
                                        onBuy={onBuy}
                                        onCancel={onCancel}
                                    />
                                    }
                                    {step == 3 && <>
                                        <SubscriptionOrder
                                            userList={childList}
                                            selSubscription={selSubscription}
                                            termCheck={termCheck}
                                            setTermCheck={setTermCheck}
                                            loading={loading}
                                            setLoading={setLoading}
                                        />
                                        <div>
                                            <Elements stripe={stripePromise}>
                                                <SubscriptionForm
                                                    onPayFinished={onPayFinished}
                                                    selSubscription={selSubscription}
                                                    email={signupForm.email}
                                                    loading={loading}
                                                    setLoading={setLoading}
                                                    userList={childList}
                                                    termCheck={termCheck} />
                                            </Elements>
                                        </div>
                                    </>}
                                    <div className="signup-form-personal">
                                        <Row className='signup-form-row' gutter={[16, 16]} style={{ marginTop: '50px !important' }}>
                                            <Col xs={24} md={24}>
                                                <Form.Item>
                                                    <p style={{ color: 'red', marginBottom: '10px' }}>{signupResponse}</p>
                                                    <Row justify={step == 3 ? "center" : "center"} gutter={[100, 8]}>
                                                        <Col>{(step == 1 || step == 2) &&
                                                            <Button type="primary" onClick={onPrev} block style={{ width: '140px', padding: '20px' }}>
                                                                <ArrowLeftOutlined /> Prev
                                                            </Button>}
                                                        </Col>
                                                        <Col>
                                                            {(step == 0 || step == 1) && <Button type="primary" onClick={onSubmit} block style={{ minWidth: '140px', padding: '20px' }}>
                                                                Next <ArrowRightOutlined />
                                                            </Button>}
                                                            {step == 2 && <Button type="primary" onClick={onSubmit} block style={{ minWidth: '140px', padding: '20px' }}>
                                                                {selSubscription?.id ? <>Next</> : <>Skip</>} <ArrowRightOutlined />
                                                            </Button>}
                                                            {step == 3 && <Button type="primary" onClick={onSubmit} block style={{ width: '240px', padding: '20px', fontSize: 20, display: "none" }}>
                                                                Submit <ArrowRightOutlined />
                                                            </Button>}
                                                            {/* <Button type="primary" onClick={onSubmit} block style={step == 3 ? { width: '240px', padding: '20px', fontSize: 20, display: "none" } : { minWidth: '140px', padding: '20px' }}>
                                                                {
                                                                    (
                                                                        step != 3 ? <>
                                                                            Next <ArrowRightOutlined />
                                                                        </> : loading ? <>
                                                                            <Spin size="small" style={{ marginRight: 8, color: 'white' }} />
                                                                        </> : <>
                                                                        </>
                                                                    )
                                                                }
                                                            </Button> */}
                                                        </Col>
                                                    </Row>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Spin>
                        </ConfigProvider>
                    </Spin>
                </div>
            </div>
        </HomeLayout>
    )
}

export default withRouter(SignUp);