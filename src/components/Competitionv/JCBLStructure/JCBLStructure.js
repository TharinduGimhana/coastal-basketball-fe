import { Col, Row } from 'antd';
import React from 'react';
import { FaBullseye, FaRoute, FaUsers } from 'react-icons/fa';
import "./JCBLStructure.css";

const JCBLStructure = () => {
    return (
        <div className="league-structure-section">
            <h1 className="league-title">
                LEAGUE <span className="highlight">STRUCTURE</span>
            </h1>
            <Row className="league-content" gutter={[32, 32]} justify="center" align="middle">
                <Col xs={24} md={12} >
                    <Row className='card-info' align="middle">
                        <Col span={20}>
                            <h2 className='league-subtitle'>AGE GROUPS</h2>
                            <p className="pcontent">The league is divided into two age groups: Year 9/10 and Year 11/12.
                                Teams are formed through trials held before the start of each season.
                            </p>
                        </Col>
                        <Col span={4}>
                            <FaUsers className='icon-info'/>
                        </Col>
                        
                    </Row>
                    <Row className='card-info' justify="center" align="middle">
                        <Col span={20}>
                            <h2 className='league-subtitle'>PATHWAY TO CBL</h2>
                            <p className="pcontent">JCBL serves as a stepping stone to the Coastal Basketball League,
                                providing young players with the experience needed to compete at higher levels.
                            </p>
                        </Col>
                        <Col span={4}>

                            <FaRoute  className='icon-info'/>

                        </Col>
                    </Row>
                </Col>

                <Col xs={24} md={12}>
                    <Row align="middle" className='card-info-right' >
                        <Col span={4} className="card-info-right-arrow">
                            <FaBullseye className='icon-info' />
                        </Col>
                        <Col span={20}>
                            <h2 className='league-subtitle-left'>DEVELOPMENT FOCUS</h2>
                            <p className='p-left'>JCBL emphasizes skill development, teamwork, and sportsmanship,
                                with experienced coaches guiding each team.
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default JCBLStructure;