import React from 'react';
import "./JCBLIntro.css";
import { Col, Row } from 'antd';

const JCBLIntro = () => {
    return (
        <div className='jcblintro-content'>
            <h1>HOW TO JOIN</h1>
            <Row className='jcbl-background'>
                <Col className='jcblintro-col-1' xs={24} md={12}>
                    <h2>REGISTRATION</h2>
                    <p> Players can register for trail online. Successful applicants will be placed on teams based on their age group  and skill level.</p>
                </Col>
                <Col className='jcblintro-col' xs={24} md={12}>
                    <div className='jcbl-center-box'>
                        <h2>SCHEDULE</h2>
                        <p>The league runs in sync with the school calendar, with games held on weekend at various locations, including Coastal Basketball Centre.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default JCBLIntro;