import React from 'react';
import { Row, Col } from 'antd';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import "./HomeSlide.css";

const HomeSlide = () => {
    return (
        <div className='home-slide'>
            <Row justify='center' className='bg-slide pb-60'>
                <Col xs={24} sm={24} md={12} xl={12} xxl={12}></Col>
                <Col className="bg-left-slide" xs={24} sm={24} md={12} xl={12} xxl={12}>
                    <div className='landing-text-rect'>
                        <AnimatedSection type="top">
                            <h1 className='font-56 bold white mt-20 mb-10'>WELCOME TO COASTAL BASKETBALL</h1>
                        </AnimatedSection>
                        <AnimatedSection type="right">
                            <p className='font-18 bold white'>
                            Welcome to Coastal Basketball, a destination for basketball development and 
                            competition in the South West region of Western Australia. Whether you're a 
                            junior player just starting out or an elite athlete looking to compete at the 
                            highest level, Coastal Basketball offers a pathway to help you achieve your goals.
                            </p>
                        </AnimatedSection>
                    </div>
                </Col>
                {/* <Col xs={24} sm={24} md={14} xl={14} xxl={11} className='landing-img-rect'>
                    <Row gutter={[20, 20]} className="landing-text-rect">
                        <Col className="slider">
                            <div style={{ position: 'absolute', bottom: '0', width: 'calc(100% - 20px)' }}>
                                <Row justify="space-between">
                                    <Col className="font-12 bold grey home-little-letter">DECEMBER MATCH</Col>
                                    <Col className="font-12 bold white home-little-letter">3.5$</Col>
                                </Row>
                                <Progress percent={70} showInfo={false} />
                            </div>
                        </Col>
                        <Col className='blog-img-rect'>
                            <img src={BlogHero1} alt="Blog Hero 1" />
                        </Col>
                        <Col className='blog-img-rect'>
                            <img src={BlogHero2} alt="Blog Hero 2" />
                        </Col>
                    </Row>
                </Col> */}
            </Row>
        </div>
    );
};

export default HomeSlide;
