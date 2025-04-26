import React, { useState } from "react";
import { Row, Col, Typography } from 'antd';
import './JCBLIntro.css';
import EnrollmentImage from "../../../assets/png/Footer.jpg";
import { Link } from "react-router-dom";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import { useSelector } from "react-redux";

const { Title, Paragraph } = Typography;

const JCBLIntro = () => {
    const userInfo = useSelector((state) => state.user);
    const userSubscription = useSelector((state) => state.subscription);
    const baseMembership = useSelector((state) => state.base_membership);
    const [modal2Open, setModal2Open] = useState(false);
    const handleShowRegistration = () => {
        if (localStorage.getItem("token")) {
            setModal2Open(true);
        } else {
            window.location.href = "/signin"
        }
    }
    return (
        <div>
            <Row justify="center news-rect jcbl-join-content part-join-content">
                <Col className="font-48 typo-red">How To JOIN</Col>
            </Row>
            <div className="enrollment-section participation-content">
                <Row className="w-full">
                    <Col xs={24} md={12} className="how-to-join-content">
                        <div className="info-box how-to-join">
                            <Link to="#" onClick={handleShowRegistration} style={{ background: 'none', border: 'none', outline: 'none' }}><Title level={2}>REGISTRATION</Title></Link>
                            {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                            <Paragraph className="white">
                                Players can register for trail online. Successful
                                applicants will be placed on teams based on their age group  and skill level.
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="training-schedule-content">
                        <div className="info-box training-schedule">
                            <Title className="academy-train-title darkPurple" level={2}>SCHEDULE</Title>
                            <Paragraph>
                                The league runs in sync with the school calendar, with games held on weekend at
                                various locations, including Coastal Basketball Centre.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default JCBLIntro;