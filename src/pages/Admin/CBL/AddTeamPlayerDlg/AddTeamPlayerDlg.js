import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Select, message, Typography, Upload, DatePicker, Form, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Toast from 'components/Toast/Toast';
import PaintCanvas from "components/Partials/PaintCanvas";
import dayjs from 'dayjs';
import { capitalizeFirstLetter, formatToDDMMYYYY, isEmpty, openDangerNotification } from "constants/global";

import "./AddTeamPlayerDlg.css";
import { apiPost } from 'ajax/apiServices';
import { UrlAddTeamPlayer } from 'ajax/apiUrls';
const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

function AddTeamPlayerDlg(props) {
    const { show, proceed, seasons, title, data, adminInfo } = props;
    const [selectedSeasonId, setSelectedSeasonId] = useState("");
    const [selectedSeason, setSelectedSeason] = useState({
        id: "",
        detail: "",
        end_date: "",
        league_traing: "",
        name: "",
        registration_end_date: "",
        registration_start_date: "",
        start_date: "",
        status: "",
        type: "",
        ui_type: "",
    });

    const [signatureData, setSignatureData] = useState(null);
    const [playerFile, setPlayerFile] = useState(null);
    const [playerFileName, setPlayerFileName] = useState('');

    const [formData, setFormData] = useState({
        school_name: '',
        address: '',
        city: '',
        postal_code: '',
        contact_number: '',
        email: '',
        team_name: '',
        age_group: '',
        coach_name: '',
        coach_contact_number: '',
        coach_email: '',
        player_number: '',
        player_file_name: '',
        player_file_path: '',
        approving_school_name: '',
        position: '',
        signature_path: '',
        signature_date: '',
        registration_fee: ''
    });
    const [errorFields, setErrorFields] = useState([]);

    useEffect(() => {
        if (data) {
            setFormData({ ...formData, ...data });
            setSelectedSeasonId(data.season)
        }
    }, [data])

    const handleUploadPlayerDataChange = (info) => {

        if (info.file.size / 1000 / 1000 > 30) { // 5MB size limit
            message.error('File size should not be greater than 30Mb.');
            return;
        } else {
            if (info.fileList.length > 0) {
                setPlayerFile(info.fileList[0].originFileObj);
                setPlayerFileName(info.file.name);
                if (errorFields.includes("player_file")) {
                    let errors = errorFields.filter((x) => x != "player_file");
                    setErrorFields([...errors]);
                }
            }
        }

    };
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

    const validateFields = () => {
        var errorList = Array();

        errorList = isEmpty(formData, "school_name", errorList);
        errorList = isEmpty(formData, "address", errorList);
        errorList = isEmpty(formData, "city", errorList);
        errorList = isEmpty(formData, "postal_code", errorList);
        errorList = isEmpty(formData, "contact_number", errorList);
        errorList = isEmpty(formData, "email", errorList);
        errorList = isEmpty(formData, "team_name", errorList);
        errorList = isEmpty(formData, "age_group", errorList);
        errorList = isEmpty(formData, "coach_name", errorList);
        errorList = isEmpty(formData, "coach_contact_number", errorList);
        errorList = isEmpty(formData, "coach_email", errorList);
        errorList = isEmpty(formData, "player_number", errorList);
        errorList = isEmpty(formData, "approving_school_name", errorList);
        errorList = isEmpty(formData, "position", errorList);
        errorList = isEmpty(formData, "signature_date", errorList);
        errorList = isEmpty(formData, "registration_fee", errorList);

        if (!signatureData && formData.signature_path == "") {
            errorList = [...errorList, "signature"]
        }
        if (!playerFile && formData.player_file_name == "") {
            errorList = [...errorList, "player_file"]
        }

        setErrorFields([...errorList]);
        return errorList.length == 0;
    }
    const doRegister = async () => {
        if (validateFields()) {
            const { player_file_path, player_file_name, signature_path, id, ...rest } = formData;

            const formDataToSend = new FormData();
            Object.entries(rest).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            formDataToSend.append('user_id', 0);
            formDataToSend.append('season', selectedSeasonId);


            if (playerFile) {
                formDataToSend.append('new_player_file', true);
                formDataToSend.append('player_file', playerFile);
                formDataToSend.append('player_file_name', playerFileName);
            } else {
                formDataToSend.append('new_player_file', false);
                formDataToSend.append('player_file', player_file_path);
                formDataToSend.append('player_file_name', player_file_name);
            }

            if (signatureData) {
                const blob = await (await fetch(signatureData)).blob(); // Convert to Blob
                formDataToSend.append('new_image', true); // Append Blob
                formDataToSend.append('signature_path', blob, 'signature.png'); // Append Blob
            } else {
                formDataToSend.append('new_image', false); // Append Blob
                formDataToSend.append('signature_path', signature_path); // Append Blob
            }

            apiPost(UrlAddTeamPlayer, formDataToSend)
                .then((res) => {
                    Toast("Registration successful", 1);
                    proceed(true);
                })
                .catch((err) => {
                    Toast(err, 2);
                });
        } else {
            Toast("Please confirm your information again", 2);
        }
    }

    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="add-individual-player-modal"
            closable={true}
            maskClosable={false}
            title={title}
            footer={null}
        >
            <div>

                <div>
                    <Row className='register-form-row top' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>SEASON</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <Select
                                showSearch
                                style={{ marginBottom: '11px', width: '250px' }}
                                className={
                                    errorFields !== undefined &&
                                        errorFields.includes("season")
                                        ? `common-select-error`
                                        : `common-select`
                                }
                                placeholder="Select a season"
                                value={selectedSeasonId || undefined}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={seasons.map((season) => ({
                                    value: season.id,
                                    label: season.name,
                                }))}
                                onChange={async (value) => {
                                    let tmpVal = [...seasons].filter((x) => x.id == value)[0]
                                    setSelectedSeason(tmpVal)
                                    setSelectedSeasonId(value);

                                }}
                            />
                            <div className="text-left"
                                style={{
                                    color: '#515151',
                                    fontWeight: 'bold',
                                    lineHeight: '1.7'
                                }}
                            >
                                <Row gutter={16}>
                                    <Col sm={24}>
                                        {selectedSeason.detail && <div
                                            style={{
                                                border: '1px solid #BAB9B9',
                                                padding: '10px',
                                                borderRadius: '6px'
                                            }}
                                        >
                                            {selectedSeason.detail}
                                        </div>}
                                    </Col>
                                    <Col span={12}>

                                        Season Name: {selectedSeason.name} <br />
                                        Season Type: {selectedSeason.type} <br />
                                        Start Date: {formatToDDMMYYYY(selectedSeason.start_date)} <br />
                                        End Date: {formatToDDMMYYYY(selectedSeason.end_date)} <br />
                                    </Col>
                                    <Col span={12}>
                                        Registration Start Date: {formatToDDMMYYYY(selectedSeason.registration_start_date)} <br />
                                        Registration End Date: {formatToDDMMYYYY(selectedSeason.registration_end_date)}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>SCHOOL INFORMATION</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="school_name"
                                        value={formData.school_name}
                                        placeholder="SCHOOL NAME"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("school_name")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />

                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        placeholder="ADDRESS"
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
                                    <Input
                                        name="city"
                                        value={formData.city}
                                        placeholder="CITY/SUBURB"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("city")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />

                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="postal_code"
                                        value={formData.postal_code}
                                        placeholder="POSTAL CODE"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("postal_code")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />

                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="contact_number"
                                        value={formData.contact_number}
                                        placeholder="CONTACT NUMBER"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("contact_number")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </Col>
                                <Col xs={24} md={12}>
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
                            </Row>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>TEAM INFORMATION</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="team_name"
                                        value={formData.team_name}
                                        placeholder="TEAM NAME"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("team_name")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Select
                                        placeholder="AGE GROUP"
                                        style={{ width: '100%' }}
                                        value={formData.age_group || undefined}
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("age_group")
                                                ? `common-select-error`
                                                : `common-select`
                                        }
                                        onSelect={(v) => {
                                            if (errorFields.includes("age_group")) {
                                                let errors = errorFields.filter(
                                                    (y) => y != "age_group"
                                                );
                                                setErrorFields([...errors]);
                                            }
                                            setFormData({
                                                ...formData,
                                                age_group: v,
                                            });
                                        }}
                                    >
                                        <Option value="Under 10 years old">Under 10 years old</Option>
                                        <Option value="Under 20 years old">Under 20 years old</Option>
                                        <Option value="Under 30 years old">Under 30 years old</Option>
                                        <Option value="Under 40 years old">Under 40 years old</Option>
                                        <Option value="Under 50 years old">Under 50 years old</Option>
                                        <Option value="Under 60 years old">Under 60 years old</Option>
                                        <Option value="Under 80 years old">Under 80 years old</Option>
                                    </Select>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="player_number"
                                        value={formData.player_number}
                                        type="number"
                                        placeholder="NUMBER OF PLAYERS"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("player_number")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />

                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="coach_name"
                                        value={formData.coach_name}
                                        placeholder="COACH NAME"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("coach_name")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="coach_contact_number"
                                        value={formData.coach_contact_number}
                                        placeholder="COACH CONTACT NUMBER"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("coach_contact_number")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />

                                </Col>
                                <Col xs={24} md={12}>
                                    <Input
                                        name="coach_email"
                                        type='email'
                                        value={formData.coach_email}
                                        placeholder="COACH EMAIL ADDRESS"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("coach_email")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>PLAYER DETAILS</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <div className="upload-section">
                                <Text className="upload-title">Upload Player Roster (Excel/PDF)</Text>
                                <Dragger
                                    name='file'
                                    multiple='false'
                                    className={
                                        errorFields !== undefined &&
                                            errorFields.includes("player_file")
                                            ? `player-file-error`
                                            : `player-file`
                                    }
                                    maxCount={1}
                                    accept=".csv, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    action={() => false}
                                    beforeUpload={(file) => {
                                        if (file.size / 1000 / 1000 > 30) { // 5MB size limit
                                            setTimeout(() => {
                                                message.error('File size should not be greater than 30Mb.');
                                            }, 10)
                                        }
                                        return false;
                                    }}
                                    onChange={(e) => {
                                        setTimeout(() => {
                                            handleUploadPlayerDataChange(e)
                                        }, 10)
                                    }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">CLICK TO UPLOAD OR DRAG & DROP</p>
                                </Dragger>
                                {formData.player_file_name && <div>
                                    <Text className="upload-instructions">
                                        <span className="upload-instructions-title">Prev File:</span> <a href={`${process.env.REACT_APP_API_BASE_URL}uploads/media/${formData.player_file_path}`} download={formData.player_file_name}>{formData.player_file_name}</a>
                                    </Text>
                                </div>}
                                <Text className="upload-instructions">
                                    <span className="upload-instructions-title">Instructions:</span> Include player names, dates of birth. (files must be less than 30MB in size)
                                </Text>
                            </div>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>CONSENT & AGREEMENT</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <div className="consent-form">
                                <h3>Consent for Use of Images and Logos</h3>
                                <p>
                                    By registering for the Coastal Basketball High School League, the school consents to the use of its logo, team, and player images in promotional materials, including the league’s website, social media, and other media. The school confirms that all necessary parental consents have been obtained for players under 18.
                                </p>
                                <div className="form-fields">
                                    <Input
                                        name="approving_school_name"
                                        value={formData.approving_school_name}
                                        placeholder="NAME OF APPROVING SCHOOL OFFICIAL"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("approving_school_name")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-fields">
                                    <Input
                                        name="position"
                                        value={formData.position}
                                        placeholder="POSITION"
                                        className={
                                            errorFields !== undefined &&
                                                errorFields.includes("position")
                                                ? `common-input-error`
                                                : `common-input`
                                        }
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <Row className="signature-section" gutter={[32, 32]}>
                                    <Col xs={24} md={12}>
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
                                                defaultImage={formData.signature_path
                                                }
                                            />
                                            {!signatureData && !formData.signature_img_path && <p className="ant-upload-text">CLICK TO SIGN</p>}
                                        </div>

                                    </Col>
                                    <Col xs={24} md={12}>
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
                                                if (errorFields.includes("signature_date")) {
                                                    let errors = errorFields.filter((x) => x != "signature_date");
                                                    setErrorFields([...errors]);
                                                }
                                                setFormData({ ...formData, "signature_date": str });
                                            }}
                                        />

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>PAYMENT INFORMATION</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <div className="payment-form">
                                <h3>Registration Fee</h3>
                                <Text className="fee-description">
                                    Text information about registration fee’s amount.
                                </Text>
                                <Select
                                    placeholder="PAYMENT METHOD"
                                    style={{ width: '100%' }}
                                    value={formData.registration_fee || undefined}
                                    className={
                                        errorFields !== undefined &&
                                            errorFields.includes("registration_fee")
                                            ? `common-select-error`
                                            : `common-select`
                                    }
                                    onSelect={(v) => {
                                        if (errorFields.includes("registration_fee")) {
                                            let errors = errorFields.filter(
                                                (y) => y != "registration_fee"
                                            );
                                            setErrorFields([...errors]);
                                        }
                                        setFormData({
                                            ...formData,
                                            registration_fee: v,
                                        });
                                    }}
                                >
                                    <Option value="Credit Card">Credit Card</Option>
                                    <Option value="PayPal">PayPal</Option>
                                    <Option value="Bank Transfer">Bank Transfer</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>

                    <Row className='register-form-row' gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <h2>SUBMIT</h2>
                        </Col>
                        <Col xs={24} md={18}>
                            <Button type="primary" onClick={doRegister} htmlType="submit" block className="submit-button home-little-letter white bold">
                                SUBMIT YOUR FORM
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
}

export default confirmable(AddTeamPlayerDlg);
