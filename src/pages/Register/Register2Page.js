import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import { Button, Col, Input, Row, Select, message, Typography, Upload, DatePicker, Radio, Checkbox, Form, notification, Spin } from 'antd';
import "./Register1Page.css";
import Toast from 'components/Toast/Toast';
import dayjs from 'dayjs';
import PaintCanvas from 'components/Partials/PaintCanvas';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, isOver18, openDangerNotification } from 'constants/global';
import { UrlAddIndividualPlayer, UrlGetPrevRegistrationInfo } from 'ajax/apiUrls';
import { apiPost } from 'ajax/apiServices';
import { useSelector } from 'react-redux';
import { showStripeOneTimePaymentDlg } from 'components/Stripe/StripeOneTimePaymentDlg/showStripeOneTimePaymentDlg';
import ChildRegisterWidget from 'components/ChildWidget/ChildRegisterWidget';


const { Option } = Select;
const { Link, Text } = Typography;
const { TextArea } = Input;

const Register2Page = ({ history }) => {
    const userInfo = useSelector((state) => state.user);
    const userSubscription = useSelector((state) => state.subscription);
    const termsPdfUrl = `${process.env.REACT_APP_API_BASE_URL}uploads/pdf/terms.pdf`;
    const waiverPdfUrl = `${process.env.REACT_APP_API_BASE_URL}uploads/pdf/waiver.pdf`;

    const [signatureData, setSignatureData] = useState(null);
    const [isChild, setIsChild] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birthday: '',
        email: '',
        phone_number: '',
        city: '',
        address: '',
        postal_code: '',
        emegency_contact_name: '',
        relationship: '',
        emegency_phone_number: '',
        competition_level: 'SCHOOL TEAM',
        clubs: '',
        years_experience: '',
        preffered_position: 'POINT GUARD(PG)',
        height: '',
        dominant: 'Left',
        medical_conditions: 'No',
        medications: 'None',
        signature_img_path: '',
        signature_date: '',
        available_training: ''
    });

    const [errorFields, setErrorFields] = useState([]);
    const [waverCheck, setWaverCheck] = useState(false);
    const [photoCheck, setPhotoCheck] = useState(false);
    const [termCheck, setTermCheck] = useState(false);
    const [childList, setChildList] = useState([]);
    const [seasonInfo, setSeasonInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/');
        } else {
            let user_id = userInfo.id;
            if (user_id) {
                fecthPrevData();
            }
        }
    }, [history]);
    const fecthPrevData = async () => {
        const formData = new FormData();
        formData.append("user_id", userInfo.id);
        formData.append("type", "individual");
        formData.append("season_id", localStorage.getItem('season_id'));

        apiPost(UrlGetPrevRegistrationInfo, formData)
            .then((res) => {
                if (res.user_list) {
                    setChildList(res.user_list);
                }
                if (res.season_info) {
                    setSeasonInfo(res.season_info)
                    if (res.season_info['league_traing'] == "1") {
                        setFormData({ ...formData, available_training: "BOTH" })
                    } else {
                        setFormData({ ...formData, available_training: "" })
                    }
                }
                if (res.form_data) {
                    let tmpBirthday = res.form_data.birthday;
                    if (isOver18(tmpBirthday)) {
                        setIsChild(false);
                    } else {
                        setIsChild(true);
                    }

                    setFormData({ ...formData, ...res.form_data })
                } else {
                    setFormData({
                        name: '',
                        gender: '',
                        birthday: '',
                        email: '',
                        phone_number: '',
                        city: '',
                        address: '',
                        postal_code: '',
                        emegency_contact_name: '',
                        relationship: '',
                        emegency_phone_number: '',
                        competition_level: 'SCHOOL TEAM',
                        clubs: '',
                        years_experience: '',
                        preffered_position: 'POINT GUARD(PG)',
                        height: '',
                        dominant: 'Left',
                        medical_conditions: 'No',
                        medications: 'None',
                        signature_img_path: '',
                        signature_date: '',
                        available_training: ''
                    })
                }
            })
            .catch((err) => {
                Toast(err, 2);
            });


    }

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

    const validateFields = () => {
        var errorList = Array();
        errorList = isEmpty(formData, "name", errorList);
        errorList = isEmpty(formData, "birthday", errorList);
        errorList = isEmpty(formData, "gender", errorList);
        errorList = isEmpty(formData, "email", errorList);
        errorList = isEmpty(formData, "phone_number", errorList);
        errorList = isEmpty(formData, "address", errorList);
        errorList = isEmpty(formData, "city", errorList);
        errorList = isEmpty(formData, "postal_code", errorList);
        errorList = isEmpty(formData, "emegency_contact_name", errorList);
        errorList = isEmpty(formData, "relationship", errorList);
        errorList = isEmpty(formData, "emegency_phone_number", errorList);
        errorList = isEmpty(formData, "competition_level", errorList);
        errorList = isEmpty(formData, "clubs", errorList);
        errorList = isEmpty(formData, "years_experience", errorList);
        errorList = isEmpty(formData, "preffered_position", errorList);
        errorList = isEmpty(formData, "height", errorList);
        errorList = isEmpty(formData, "dominant", errorList);
        errorList = isEmpty(formData, "medical_conditions", errorList);
        errorList = isEmpty(formData, "medications", errorList);
        errorList = isEmpty(formData, "signature_date", errorList);
        errorList = isEmpty(formData, "consenting_person", errorList);
        if (!photoCheck) {
            errorList = [...errorList, "photo_check"]
        }
        if (!waverCheck) {
            errorList = [...errorList, "waver_check"]
        }
        if (!termCheck) {
            errorList = [...errorList, "term_check"]
        }
        if (isChild) {
            errorList = isEmpty(formData, "relationship_child", errorList);
        }
        if (!signatureData && formData.signature_img_path == "") {
            errorList = [...errorList, "signature"]
        }

        setErrorFields([...errorList]);
        return errorList.length == 0;
    };


    const doRegister = async () => {
        let tmpList = [...childList]
        tmpList = tmpList.filter((x) => x.checked && x.available)
        if (tmpList.length == 0) {
            Toast("Please select player", 2);
            return false;
        }
        if (validateFields()) {
            const { signature_img_path, id, ...rest } = formData;
            const formDataToSend = new FormData();
            let selUserList = [...childList].filter((x) => x.checked)
            let dlgRes = await showStripeOneTimePaymentDlg({
                fee: parseFloat(seasonInfo?.reg_cost).toFixed(2),
                bookingFee: parseFloat(seasonInfo?.booking_fee).toFixed(2),
                userList: selUserList,
                userId: userInfo.id,
                email: userInfo.email
            })
            if (dlgRes == null) return;

            formDataToSend.append("client_secret", dlgRes);
            Object.entries(rest).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataToSend.append(key, value);
                }
            });

            formDataToSend.append('user_id', userInfo.id);
            formDataToSend.append('email', userInfo.email);
            formDataToSend.append('season', localStorage.getItem('season_id'));
            formDataToSend.append('is_wait', seasonInfo?.is_available == "true");

            if (signatureData) {
                const blob = await (await fetch(signatureData)).blob(); // Convert to Blob
                formDataToSend.append('new_image', true); // Append Blob
                formDataToSend.append('signature_img_path', blob, 'signature.png'); // Append Blob
            } else {
                formDataToSend.append('new_image', false); // Append Blob
                formDataToSend.append('signature_img_path', signature_img_path); // Append Blob
            }

            formDataToSend.append("user_list", JSON.stringify(tmpList));

            setIsLoading(true);
            apiPost(UrlAddIndividualPlayer, formDataToSend)
                .then(async (res) => {
                    Toast("Registration successful", 1);
                    localStorage.setItem("season_id", "");
                    setTimeout(() => {
                        setIsLoading(false);
                        history.push("thank_you")
                    }, 500)
                })
                .catch((err) => {
                    setIsLoading(false);
                    Toast(err, 2);
                });

        } else {
            Toast("Please confirm your information again", 2);
        }
    }



    return (
        <HomeLayout>
            <Spin spinning={isLoading}>
                <div className='register-content'>
                    <div className='register-adv'>
                        <h1>JOIN THE GAME <span className="mt-10">REGISTER</span> YOUR</h1>
                        <h1> INTEREST <span>NOW!</span></h1>
                        <p>Ready to showcase your skills? Whether you're aiming for the big leagues in the CBL or starting your journey in the JCBL,
                            this is your first step to becoming a part of Coastal Basketball. Register now to get started!
                        </p>
                    </div>

                    <div className='register2-logo'>

                    </div>

                    <div className='register-form'>
                        <div className='register-form-title'>
                            <h1>COASTAL BASKETBALL LEAGUE REGISTRATION FORM</h1>
                        </div>

                        {childList.length != 0 && <Row className='register-form-row' gutter={[16, 16]}>
                            <Col span={24} style={{ padding: '0px 8px' }}>
                                <ChildRegisterWidget
                                    childList={childList}
                                    setChildList={setChildList}
                                /></Col>
                        </Row>}

                        <Row className='register-form-row' gutter={[16, 16]}>
                            <Col span={24} style={{ padding: '0px 8px' }}>
                                {
                                    seasonInfo?.detail && (
                                        <div
                                            style={{
                                                border: '1px solid #BAB9B9',
                                                padding: '10px',
                                                borderRadius: '6px',
                                                fontSize: '16px',
                                            }}
                                        >
                                            <div>{seasonInfo?.detail}</div>
                                        </div>
                                    )
                                }
                            </Col>
                            <Col xs={24} md={6}>
                                <h2>SEASON</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <div className="text-left"
                                    style={{
                                        color: '#515151',
                                        fontWeight: 'bold',
                                        lineHeight: '1.7'
                                    }}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            Season Name: {seasonInfo?.name} <br />
                                            Season Type: {seasonInfo?.type} <br />
                                            Start Date: {formatToDDMMYYYY(seasonInfo?.start_date)} <br />
                                            End Date: {formatToDDMMYYYY(seasonInfo?.end_date)} <br />
                                        </Col>
                                        <Col span={12}>
                                            Registration Start Date: {formatToDDMMYYYY(seasonInfo?.registration_start_date)} <br />
                                            Registration End Date: {formatToDDMMYYYY(seasonInfo?.registration_end_date)} <br />
                                            Registration Cost: {parseFloat(seasonInfo?.reg_cost).toFixed(2)} AUD<br />
                                            Booking Fee: {parseFloat(seasonInfo?.booking_fee).toFixed(2)} AUD
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>PERSONAL INFORMATION</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Input
                                            value={formData.name}
                                            placeholder="FULL NAME"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("name")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "name")
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24} md={12}>

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
                                                let tmpName = "";
                                                if (isOver18(str)) {
                                                    tmpName = formData.name;
                                                    setIsChild(false);
                                                    if (errorFields.includes("consenting_person")) {
                                                        let errors = errorFields.filter((x) => x != "consenting_person");
                                                        setErrorFields([...errors]);
                                                    }
                                                } else {
                                                    setIsChild(true);
                                                    if (errorFields.includes("relationship_child")) {
                                                        let errors = errorFields.filter((x) => x != "relationship_child");
                                                        setErrorFields([...errors]);
                                                    }
                                                }

                                                if (errorFields.includes("birthday")) {
                                                    let errors = errorFields.filter((x) => x != "birthday");
                                                    setErrorFields([...errors]);
                                                }

                                                setFormData({ ...formData, consenting_person: tmpName, birthday: str })

                                            }}
                                        />

                                    </Col>

                                    <Col xs={24} md={12}>
                                        <Select
                                            placeholder="GENDER"
                                            style={{ width: '100%' }}
                                            value={formData.gender || undefined}
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("gender")
                                                    ? `common-select-error`
                                                    : `common-select`
                                            }
                                            onSelect={(v) => {
                                                if (errorFields.includes("gender")) {
                                                    let errors = errorFields.filter(
                                                        (y) => y != "gender"
                                                    );
                                                    setErrorFields([...errors]);
                                                }
                                                setFormData({
                                                    ...formData,
                                                    gender: v,
                                                });
                                            }}
                                        >
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                            <Option value="Other">Other</Option>
                                        </Select>
                                    </Col>
                                    <Col xs={24} md={12}>
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
                                        <Input
                                            value={formData.phone_number}
                                            placeholder="PHONE NUMBER"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("phone_number")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "phone_number")
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Input
                                            value={formData.address}
                                            placeholder="ADDRESS"
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
                                        <Input
                                            value={formData.city}
                                            placeholder="CITY/SUBURB"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("city")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "city")
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Input
                                            value={formData.postal_code}
                                            placeholder="POSTAL CODE"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("postal_code")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "postal_code")
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>EMERGENCY CONTACT INFORMATION</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Input
                                            value={formData.emegency_contact_name}
                                            placeholder="EMERGENCY CONTACT NAME"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("emegency_contact_name")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "emegency_contact_name")
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Select placeholder="RELATIONSHIP" style={{ width: '100%' }}
                                            value={formData.relationship || undefined}
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("relationship")
                                                    ? `common-select-error`
                                                    : `common-select`
                                            }
                                            onSelect={(v) => {
                                                if (errorFields.includes("relationship")) {
                                                    let errors = errorFields.filter(
                                                        (y) => y != "relationship"
                                                    );
                                                    setErrorFields([...errors]);
                                                }
                                                setFormData({
                                                    ...formData,
                                                    relationship: v,
                                                });
                                            }}
                                        >
                                            <Option value="Parent">Parent</Option>
                                            <Option value="Guardian">Guardian</Option>
                                            <Option value="Sibling">Sibling</Option>
                                            <Option value="Other">Other</Option>
                                        </Select>
                                    </Col>

                                    <Col xs={24} md={24}>
                                        <Input
                                            value={formData.emegency_phone_number}
                                            placeholder="EMERGENCY CONTACT PHONE NUMBER"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("emegency_phone_number")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "emegency_phone_number")
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>BASKETBALL EXPERIENCE</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Col xs={24} md={24}>
                                    <h3>Highest Level of Competition Played:</h3>
                                </Col>
                                <Radio.Group onChange={(e) => {
                                    setFormData({ ...formData, competition_level: e.target.value });
                                }} value={formData.competition_level} className="custom-radio-group">
                                    <Row gutter={[12, 12]}>
                                        <Col xs={24} md={12}>
                                            <Radio.Button value="SCHOOL TEAM">SCHOOL TEAM</Radio.Button>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Radio.Button value="LOCAL CLUB/ASSOCIATION">LOCAL CLUB/ASSOCIATION</Radio.Button>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Radio.Button value="STATE LEVEL">STATE LEVEL</Radio.Button>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Radio.Button value="NATIONAL LEVEL">NATIONAL LEVEL</Radio.Button>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Radio.Button value="OTHER">OTHER (PLEASE SPECIFY)</Radio.Button>
                                        </Col>
                                    </Row>
                                </Radio.Group>

                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={12}>
                                        <h3 className="mt-10">Previous Teams/Clubs</h3>

                                        <Input
                                            value={formData.clubs}
                                            placeholder="ADD YOUR TEAM"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("clubs")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "clubs")
                                            }}
                                        />

                                    </Col>

                                    <Col xs={24} md={12}>
                                        <h3 className="mt-10">Years of Experience</h3>
                                        <Select placeholder="SELECT EXPERIENCE" style={{ width: '100%' }}
                                            value={formData.years_experience || undefined}
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("years_experience")
                                                    ? `common-select-error`
                                                    : `common-select`
                                            }
                                            onSelect={(v) => {
                                                if (errorFields.includes("years_experience")) {
                                                    let errors = errorFields.filter(
                                                        (y) => y != "years_experience"
                                                    );
                                                    setErrorFields([...errors]);
                                                }
                                                setFormData({
                                                    ...formData,
                                                    years_experience: v,
                                                });
                                            }}
                                        >
                                            <Option value="2">2</Option>
                                            <Option value="4">4</Option>
                                            <Option value="6">6</Option>
                                            <Option value="8">8</Option>
                                            <Option value="10">10</Option>
                                            <Option value="More than 10">More than 10</Option>
                                        </Select>


                                    </Col>
                                </Row>

                                <Row className='row-padding-top'>
                                    <Col xs={24} md={24}>
                                        <h3>Preffered Playing Position(s):</h3>
                                    </Col>
                                    <Radio.Group onChange={(e) => {
                                        setFormData({ ...formData, preffered_position: e.target.value });
                                    }} value={formData.preffered_position} className="custom-radio-group">
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} md={12}>
                                                <Radio.Button value="POINT GUARD(PG)">POINT GUARD(PG)</Radio.Button>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Radio.Button value="SHOOTING GUARD(SG)">SHOOTING GUARD(SG)</Radio.Button>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Radio.Button value="SMALL FORWARD(SF)">SMALL FORWARD(SF)</Radio.Button>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Radio.Button value="POWER FORWARD(PF)">POWER FORWARD(PF)</Radio.Button>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Radio.Button value="CENTER(C)">CENTER(C)</Radio.Button>
                                            </Col>
                                        </Row>
                                    </Radio.Group>
                                </Row>

                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={12}>
                                        <h3>Height(cm):</h3>
                                        <Input
                                            value={formData.height}
                                            type="number"
                                            placeholder="Height"
                                            className={
                                                errorFields !== undefined &&
                                                    errorFields.includes("height")
                                                    ? `common-input-error`
                                                    : `common-input`
                                            }
                                            onChange={(e) => {
                                                handleInputChange(e.target.value, "height")
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[12, 12]} className="mt-10">
                                    <Col xs={24} md={24}>
                                        <Col xs={24} md={24}>
                                            <h3 className="mt-10">Dominant Hand</h3>
                                        </Col>
                                        <Radio.Group onChange={(e) => {
                                            setFormData({ ...formData, dominant: e.target.value });
                                        }} value={formData.dominant} className="custom-radio-group" style={{ "width": "100%" }}>
                                            <Row gutter={[12, 12]}>
                                                <Col xs={24} md={12}>
                                                    <Radio.Button value="Right">RIGHT</Radio.Button>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Radio.Button value="Left">LEFT</Radio.Button>
                                                </Col>
                                            </Row>
                                        </Radio.Group>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>MEDIAL INFORMATION</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Col xs={24} md={24}>
                                    <h3>Any Medical Conditions or Allergies: </h3>
                                </Col>
                                <Radio.Group onChange={(e) => {
                                    let tmpMedications = "";
                                    if (e.target.value == "No") {
                                        tmpMedications = "None";
                                    }
                                    setFormData({ ...formData, medications: tmpMedications, medical_conditions: e.target.value });
                                }} value={formData.medical_conditions} className="custom-radio-group" style={{ "width": "100%" }}>
                                    <Row gutter={[12, 12]}>
                                        <Col xs={24} md={24}>
                                            <Radio.Button value="No">NO</Radio.Button>
                                        </Col>
                                        <Col xs={24} md={24}>
                                            <Radio.Button value="Yes">YES(PLEASE SPECIFY)</Radio.Button>
                                        </Col>
                                    </Row>
                                </Radio.Group>

                                <Col xs={24} md={24}>
                                    <h3>Medications Currently Taking: </h3>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Input
                                        value={formData.medications}
                                        placeholder="Please provide your medical taking"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("medications")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={(e) => {
                                            handleInputChange(e.target.value, "medications")
                                        }}
                                    />
                                </Col>
                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[16, 16]}>
                            <Col xs={24} md={6}>
                                <h2>CONSENT & AGREEMENT</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Col xs={24} md={24}>
                                    <h3>Photography/Videography Consent: </h3>
                                </Col>

                                <Col xs={24} md={24}>
                                    <Checkbox
                                        checked={photoCheck}
                                        className="pay-check"
                                        onChange={(e) => {
                                            setPhotoCheck(e.target.checked)
                                            if (e.target.checked) {
                                                if (errorFields.includes("photo_check")) {
                                                    let errors = errorFields.filter((x) => x != "photo_check");
                                                    setErrorFields([...errors]);
                                                }
                                            }
                                        }}
                                    >
                                        I CONSENT TO COASTAL BASKETBALL USING PHOTOS OR VIDEOS OF ME/MY CHILD FOR PROMOTIONAL PURPOSES.
                                    </Checkbox>
                                    {errorFields.includes("photo_check") && <div style={{ color: 'red', paddingBottom: 10 }}>Please check for photography/videography Consent</div>}
                                </Col>
                                <Col xs={24} md={24}>

                                    <Link href={waiverPdfUrl} target="_blank" rel="noopener noreferrer">
                                        <h3 style={{ marginTop: 10, textDecoration: 'underline', textUnderlineOffset: 4 }}>Wavier and Release of Liability: </h3>
                                    </Link>
                                </Col>
                                <Col xs={24} md={24}>
                                    <Checkbox
                                        checked={waverCheck}
                                        className="pay-check"
                                        onChange={(e) => {
                                            setWaverCheck(e.target.checked)
                                            if (e.target.checked) {
                                                if (errorFields.includes("waver_check")) {
                                                    let errors = errorFields.filter((x) => x != "waver_check");
                                                    setErrorFields([...errors]);
                                                }
                                            }
                                        }}
                                    >
                                        I HAVE READ AND AGREE TO THE TERMS AND CONDITIONS OF PARTICIPATION, INCLUDING THE WAVIER AND RELEASE OF LIABILITY.
                                    </Checkbox>
                                    {errorFields.includes("waver_check") && <div style={{ color: 'red', paddingBottom: 10 }}>Please check for Wavier and Release of Liability</div>}
                                </Col>
                                <Col md={24}>
                                    <Row gutter={[12, 12]}>
                                        <Col sm={24} md={12}>
                                            <div>
                                                <h3 className="mt-10">Name of Consenting Person</h3>
                                                <Input
                                                    value={formData.consenting_person}
                                                    placeholder="Name of Consenting Person"
                                                    className={
                                                        errorFields !== undefined &&
                                                            errorFields.includes("consenting_person")
                                                            ? `common-input-error`
                                                            : `common-input`
                                                    }
                                                    onChange={(e) => {
                                                        handleInputChange(e.target.value, "consenting_person")
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="mt-10">Relationship to Child</h3>
                                                <TextArea
                                                    value={formData.relationship_child}
                                                    disabled={!isChild}
                                                    rows={8}
                                                    placeholder="Relationship to Child"
                                                    className={
                                                        errorFields !== undefined &&
                                                            errorFields.includes("relationship_child")
                                                            ? `common-input-error`
                                                            : `common-input`
                                                    }
                                                    onChange={(e) => {
                                                        handleInputChange(e.target.value, "relationship_child")
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={24} md={12}>
                                            <div>
                                                <h3 className="mt-10">Signature Date</h3>
                                                <DatePicker
                                                    style={{
                                                        width: "100%",
                                                        cursor: "pointer",
                                                    }}
                                                    placeholder="SELECT A DATE"
                                                    format="DD-MM-YYYY"
                                                    allowClear={false}
                                                    value={
                                                        formData.signature_date == "" ? "" : dayjs(formData.signature_date, "DD-MM-YYYY")
                                                    }

                                                    className={
                                                        errorFields !== undefined &&
                                                            errorFields.includes("signature_date")
                                                            ? `date-picker common-input-error`
                                                            : `date-picker common-input`
                                                    }
                                                    onChange={(v, str) => {
                                                        handleInputChange(str, "signature_date")
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="mt-10">Signature</h3>
                                                <div className={
                                                    errorFields !== undefined &&
                                                        errorFields.includes("signature")
                                                        ? `signature-uploader error`
                                                        : `signature-uploader`
                                                }>
                                                    <PaintCanvas
                                                        errorFields={errorFields}
                                                        setErrorFields={setErrorFields}
                                                        setSignatureData={setSignatureData}
                                                        defaultImage={formData.signature_img_path
                                                        }
                                                    />
                                                    {!signatureData && !formData.signature_img_path && <p className="ant-upload-text">CLICK TO SIGN</p>}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={24}>
                                            <Checkbox
                                                checked={termCheck}
                                                className="pay-check"
                                                onChange={(e) => {
                                                    setTermCheck(e.target.checked)
                                                    if (e.target.checked) {
                                                        if (errorFields.includes("term_check")) {
                                                            let errors = errorFields.filter((x) => x != "term_check");
                                                            setErrorFields([...errors]);
                                                        }
                                                    }
                                                }}
                                            >
                                                <Link href={termsPdfUrl} target="_blank" rel="noopener noreferrer">
                                                    <span style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}> I have read and agree to the terms and conditions</span>
                                                </Link>
                                            </Checkbox>
                                            {errorFields.includes("term_check") && <div style={{ color: 'red', marginBottom: 10 }}>Please accept the terms and conditions</div>}
                                        </Col>
                                    </Row>
                                </Col>

                            </Col>
                        </Row>

                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>LEAGUE Training</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Row gutter={[16, 16]}>
                                    {seasonInfo?.league_traing != "1" && <Col sm={24}>
                                        <h3>{seasonInfo?.league_traing == "1" ? "Applicable" : "Not Applicable"}</h3>
                                    </Col>}


                                    {seasonInfo?.league_traing == "1" && <><Col xs={24} md={24}>
                                        <h3>Available for Training/Matches: </h3>
                                    </Col>
                                        <Radio.Group
                                            onChange={(e) => {
                                                setFormData({ ...formData, available_training: e.target.value });
                                            }}
                                            value={formData.available_training}
                                            className={seasonInfo?.league_traing == "1" ? "custom-radio-group" : "custom-radio-group none"}
                                            style={{ width: "100%", marginBottom: "20px" }}
                                        >
                                            <Row gutter={[12, 12]}>
                                                {seasonInfo?.league_traing == "1" ? <>
                                                    <Col xs={24} md={12}>
                                                        <Radio.Button value="WEEKENDS">WEEKENDS</Radio.Button>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Radio.Button value="WEEKDAYS(EVENINGS)">WEEKDAYS(EVENINGS)</Radio.Button>
                                                    </Col>
                                                    <Col xs={24} md={24}>
                                                        <Radio.Button value="BOTH">BOTH</Radio.Button>
                                                    </Col>
                                                </> : <>
                                                    <Col xs={24} md={12}>
                                                        <Radio.Button value="WEEKENDS" disabled>WEEKENDS</Radio.Button>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Radio.Button value="WEEKDAYS(EVENINGS)" disabled>WEEKDAYS(EVENINGS)</Radio.Button>
                                                    </Col>
                                                    <Col xs={24} md={24}>
                                                        <Radio.Button value="BOTH" disabled>BOTH</Radio.Button>
                                                    </Col></>}

                                            </Row>


                                        </Radio.Group></>}
                                </Row>
                            </Col>
                        </Row>
                        <Row className='register-form-row' gutter={[12, 12]}>
                            <Col xs={24} md={6}>
                                <h2>SUBMIT</h2>
                            </Col>
                            <Col xs={24} md={18}>
                                <Button type="primary" block className="submit-button home-little-letter white bold" onClick={doRegister}>
                                    SUBMIT YOUR FORM
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>
        </HomeLayout>
    )
}

export default withRouter(Register2Page);