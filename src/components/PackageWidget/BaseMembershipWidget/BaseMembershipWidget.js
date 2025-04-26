import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import TypingEffect from 'components/AnimatedSection/TypingEffect';
import './BaseMembershipWidget.css';
import { Card, Col, Row } from 'antd';
import ImgRepreOpp1 from '../../../assets/png/member_player.png';

const BaseMembershipWidget = () => {
    return (
        <div className='base-membership-top-rect'>
            <h1 className='typo-blue font-36'><TypingEffect text='Annual Membership – Support & Play!' /></h1>
            <Row className='membership-base-content' gutter={[32, 32]} justify="center" align="top">
                <Col xs={24} md={12}>
                    <Card
                        bordered={false}
                        cover={<img alt="Purchase membership" className='membership-base-player-img' src={ImgRepreOpp1} />}
                    >
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <div className="base-membership-info">
                        <h2><TypingEffect text='Purchase membership' /></h2>
                        <p className='membership-desc-p'>
                            Joining as a <span style={{fontWeight: '600'}}>Coastal Base Member</span> unlocks exclusive perks designed to support basketball in the South West.
                        </p>
                        <p className='membership-desc-p'>
                            While anyone can register for competitions, camps, and events—<span style={{fontWeight: '600'}}>members get more:</span> early access to registrations, no booking fees, and automatic entry into <span style={{fontWeight: '600'}}>monthly member giveaways</span> and our <span style={{fontWeight: '600'}}>annual major prize draw</span>.
                        </p>
                        <p className='membership-desc-p'>
                            From there, you can upgrade to <span style={{fontWeight: '600'}}>Coastal All-Access</span> packages for even more benefits like 24/7 facility access and guaranteed shooting bay reservations.
                        </p>
                        <p className='membership-desc-p'>
                            Memberships are open to everyone. It’s your way to support the game and get rewarded along the way.
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default BaseMembershipWidget;