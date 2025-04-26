import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import TypingEffect from 'components/AnimatedSection/TypingEffect';
import './RepresentativeOpportunity.css';
import { Card, Col, Row } from 'antd';
import ImgRepreOpp1 from '../../../assets/png/Opportunities.jpg';
import ImgRepreOpp2 from '../../../assets/png/Opportunities-1.jpg';
import ImgRepreOpp3 from '../../../assets/png/Opportunities-2.jpg';

const RepresentativeOpportunity = () => {
    return (
        <div className='CBC-content programs-section'>
            <h1 className='typo-blue font-48'><TypingEffect text='OPPORTUNITIES' /></h1>
            <h4 className="mb-30">Explore the CB UNITED opportunities</h4>
            
                <Row className='court-content represent-left-content' gutter={[32, 32]} justify="center" align="middle">
                    <Col xs={24} md={12}>
                        <Card
                            bordered={false}
                            cover={<img alt="Player Selection" src={ImgRepreOpp1} />}
                        >
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="courts-info">
                            <h2><TypingEffect text='PLAYER SELECTION' /></h2>
                            <p>
                                Players from CBL, JCBL, and members of the Coastal Basketball 
                                Academy are eligible to be selected for CB United teams. Selection 
                                is based on performance, potential, and commitment.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className='court-content represent-left-content' gutter={[32, 32]} justify="center" align="middle">
                    <Col xs={24} md={12} className="order-left">
                        <div className="courts-info">
                            <h2><TypingEffect text='TOURNAMENTS' /></h2>
                            <p>
                                CB United teams will participate in a variety of tournaments across Australia, 
                                with future plans to compete in AAU tournaments in the United States.
                            </p>
                        </div>
                    </Col>
                    <Col xs={24} md={12} className="order-right">
                        <Card
                            bordered={false}
                            cover={<img alt="Tournaments" src={ImgRepreOpp2} />}
                        >
                        </Card>
                    </Col>
                </Row>
            
                <Row className='court-content represent-left-content' gutter={[32, 32]} justify="center" align="middle">
                    <Col xs={24} md={12}>
                        <Card
                            bordered={false}
                            cover={<img alt="Development" src={ImgRepreOpp3} />}
                        >
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className="courts-info">
                            <h2><TypingEffect text='DEVELOPMENT' /></h2>
                            <p>
                                Being part of CB United includes access to advanced training sessions, 
                                exposure to higher-level competition, and opportunities for individual player growth.
                            </p>
                        </div>
                    </Col>
                </Row>
        </div>
    )
}

export default RepresentativeOpportunity;