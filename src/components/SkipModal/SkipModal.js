import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Button, Modal, Row, Col } from 'antd';
import "./SkipModal.css";
import { RoundButton } from 'components/ButtonWidget/RoundButton/RoundButton';
import ChildWidget from 'components/ChildWidget/ChildWidget';
import Toast from 'components/Toast/Toast';

function SkipModal(props) {
    const { show, proceed, childList, setChildList } = props;
    const onYes = () => {
        let tmpList = [...childList]
        tmpList = tmpList.filter((x) => x.checked)
        if (tmpList.length == 0) {
            Toast("Please select user to subscribe");
            return;
        }
        proceed(true)
    }
    const onCancel = () => {
        proceed(null)
    }
    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="skip-modal"
            closable={true}
            maskClosable={false}
            title={"Do you want to become a Coastal Basketball Annual Member?"}
            footer={null}
        >
            {childList.length != 0 && <ChildWidget
                childList={childList}
                setChildList={setChildList}
            />}
            <div>
                <p className='txt-info1'>DONT MISS OUT ON...</p>
                <p className='txt-info2'>No Booking Fees</p>
                <p className='txt-info2'>Early Access to competition, academies, training clinics & holiday camp registrations (There will be limited spots - secure your place first!)</p>
                <p className='txt-info2'>Monthly giveaways for Annual members.</p>
                <p className='txt-info2'>Member exclusive camps, clinics and competitions.</p>
                <p className='txt-info2'>Support Future Basketball Facilities in the South-West and help create more sporting opportunities.</p>
                <p className='txt-info1'>$50 per year</p>
                <Row justify={"center"} gutter={16} style={{ marginTop: 20 }}>
                    <Col>
                        <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: '1px solid #a7192f' }}>
                            <RoundButton onClick={onYes}>Yes</RoundButton>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: '1px solid var(--darkPurple)' }}>
                            <RoundButton onClick={onCancel} style={{ backgroundColor: '#1b4c98' }}>No</RoundButton>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}

export default confirmable(SkipModal);
