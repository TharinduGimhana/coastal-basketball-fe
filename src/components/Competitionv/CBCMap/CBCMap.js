import React from 'react';
import ImgCBCCommunity from "../../../assets/png/CBCCommunity.jpg";
import "./CBCMap.css";
import { Card, Col, Row } from 'antd';

const CBCMap = () => {
    return (
        <div className="CBC-map">
            <Row>
                <Col className='community-info' xs={24} md={14}>
                    <h2>EXPANDING TO SERVE OUR BASKETBALL <span>COMMUNITY</span></h2>

                    <p>New Facilities and opportunities across the region</p>
                </Col>

                <Col xs={24} md={10}>
                    <Card
                        bordered={false}
                        cover={<img alt="Modern Courts" src={ImgCBCCommunity} />}
                    >
                    </Card>
                </Col>
            </Row>

            <Row>
            <iframe
                    title="CBC Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.96305761531956!3d-37.81621797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577c9e1dd2d0b0!2sMelbourne!5e0!3m2!1sen!2sau!4v1604374356124!5m2!1sen!2sau"
                    width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"
                ></iframe>
            </Row>
        </div>
    )
}

export default CBCMap;