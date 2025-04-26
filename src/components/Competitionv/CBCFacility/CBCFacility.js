import React from 'react';
import "./CBCFacility.css";
import { Card, Col, Row } from 'antd';
import ImgCBCFacility1 from '../../../assets/png/image1.png';
import ImgCBCFacility2 from '../../../assets/png/image2.png';

const CBCFacility = () => {
    return (
        <div className='CBC-content'>
            <h1><span className='typo-blue'>CBC</span> <span className='typo-red'>FACILITIES</span></h1>
            <h4>Explore our all of cour facilites on CBC</h4>
            
                <Row className='court-content' gutter={[32, 32]} justify="center" align="middle">
                    {/* Modern Courts Section */}
                    <Col xs={24} md={12}>
                        <Card
                            bordered={false}
                            cover={<img alt="Modern Courts" src={ImgCBCFacility1} />}
                        >
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="courts-info">
                            <h2>MODERN COURTS</h2>
                            <p>
                                Our courts are equipped with high-quality flooring and
                                professional-grade hoops to ensure an optimal playing experience.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className='court-content' gutter={[32, 32]} justify="center" align="middle">
                    {/* Shooting Bays Section */}
                    <Col xs={24} md={12}>
                        <div className="courts-info">
                            <h2>SHOOTING BAYS</h2>
                            <p>
                                Improve your shooting skills with our dedicated shooting bays,
                                featuring advanced basketball machines.
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card
                            bordered={false}
                            cover={<img alt="Shooting Bays" src={ImgCBCFacility2} />}
                        >
                        </Card>
                    </Col>
                </Row>
            
        </div>
    )
}

export default CBCFacility;