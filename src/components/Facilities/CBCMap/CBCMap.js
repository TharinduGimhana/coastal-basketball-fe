import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import ImgCBCCommunity from "../../../assets/png/CBCCommunity.jpg";
import "./CBCMap.css";
import { Card, Col, Row } from 'antd';

const CBCMap = () => {
    return (
        <div className="CBC-map">
            <Row>
                <Col className='community-info mb-30' xs={24} md={14}>

                    <h2><AnimatedSection type="top">EXPANDING TO SERVE OUR BASKETBALL <span>COMMUNITY</span> </AnimatedSection></h2>

                    <p>New Facilities and opportunities across the region</p>
                </Col>
            </Row>

            <Row>
            <iframe
                title="Mount Waverley Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25193.81299674542!2d145.10785086085957!3d-37.87838250537929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66b2665fa6e53%3A0x5045675218cdaf0!2sMount%20Waverley%20VIC%203149%2C%20Australia!5e0!3m2!1sen!2s!4v1729561115056!5m2!1sen!2s"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                />
            </Row>
        </div>
    )
}

export default CBCMap;