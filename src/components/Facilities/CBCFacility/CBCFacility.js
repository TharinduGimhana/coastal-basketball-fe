import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import TypingEffect from 'components/AnimatedSection/TypingEffect';
import "./CBCFacility.css";
import { Card, Col, Row } from 'antd';
import ImgCBCFacility1 from '../../../assets/png/image1.png';
import ImgCBCFacility2 from '../../../assets/png/image2.png';


const CBCFacility = () => {
    return (
        <>
            <div className='CBC-content'>
                <h1><AnimatedSection type="fade"><span className='typo-blue'>CBC</span> <span className='typo-red'>FACILITIES</span></AnimatedSection></h1>
                {/* <h4>Explore our all of cour facilites on CBC</h4> */}

                <Row className='court-content represent-left-content mt-30' gutter={[32, 32]} justify="center" align="middle">
                    <Col xs={24} md={12}>
                        <Card
                            bordered={false}
                            cover={<img alt="Modern Courts" src={ImgCBCFacility1} />}
                        >
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="courts-info">
                            <h2><TypingEffect text='MODERN COURTS' /></h2>
                            <p>
                                The courts feature premium DreamCourt flooring and professional-grade
                                hoops, providing an exceptional experience for both playing and training
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className='court-content represent-left-content' gutter={[32, 32]} justify="center" align="middle">
                    <Col xs={24} md={12} className="order-left">
                        <div className="courts-info">
                            <h2><TypingEffect text='SHOOTING BAYS' /></h2>
                            <p>
                                Improve your shooting skills with our dedicated shooting bays,
                                featuring advanced basketball machines.
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="order-right">
                        <Card
                            bordered={false}
                            cover={<img alt="Shooting Bays" src={ImgCBCFacility2} />}
                        >
                        </Card>
                    </Col>
                </Row>
            </div>
        </>

    )
}

export default CBCFacility;