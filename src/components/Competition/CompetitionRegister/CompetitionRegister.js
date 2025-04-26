import { Row, Col, Typography } from 'antd';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import './CompetitionRegister.css';
import EnrollmentImage from "../../../assets/png/Footer.jpg";

const { Title, Paragraph } = Typography;

const AcademyCBAEnrolment = () => {
  return (
    <div>
        <Row justify="center" className="high-school-content">
           
            <Col className="font-48 typo-blue"> <AnimatedSection type="fade">How To</AnimatedSection> </Col>
            <Col className="font-48 typo-red"> <AnimatedSection type="fade">{'\u00A0'}REGISTER</AnimatedSection></Col>
        
        </Row>
        <div className="enrollment-section competition-content">
                <Row className="w-full">
                    <Col xs={24} md={12} className="training-schedule-content cbl-school-regist">
                        <div className="info-box training-schedule">
                            <Title className="academy-train-title darkPurple" level={2}>SCHOOL REGISTRATION</Title>
                            <Paragraph>
                                Schools can register their teams online. Each team must be accompanied
                                by a coach or school representative.
                            </Paragraph>
                        </div>
                    </Col>

                    <Col xs={24} md={12} className="how-to-join-content">
                        <div className="info-box how-to-join">
                            <Title level={2}>PLAYER REGISTRATION</Title>
                            <Paragraph className="white">
                                Students can register through their school 
                                , with permission from their parents or guardians.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

        </div>
    </div>
  );
};

export default AcademyCBAEnrolment;