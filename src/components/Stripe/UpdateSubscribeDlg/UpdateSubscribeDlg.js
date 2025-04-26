import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, notification } from 'antd';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./UpdateSubscribeDlg.css";
import SubscriptionOrder from '../SubscriptionOrder';
import SubscriptionForm from '../SubscriptionForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);


function UpdateSubscribeDlg(props) {
    const { show, proceed, userInfo, selSubscription, userList } = props;

    const [loading, setLoading] = useState([]);
    const [termCheck, setTermCheck] = useState(false);

    const onPayFinished = () => {
        proceed(true);
    }
    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="update-subscription-modal"
            closable={true}
            maskClosable={false}
            title={"Update Membership"}
            footer={null}
        >
            <div>
                <SubscriptionOrder
                    userList={userList}
                    selSubscription={selSubscription}
                    termCheck={termCheck}
                    setTermCheck={setTermCheck}
                    loading={loading}
                    setLoading={setLoading}
                />
                <div>
                    <Elements stripe={stripePromise}>
                        <SubscriptionForm
                            onPayFinished={onPayFinished}
                            selSubscription={selSubscription}
                            email={userInfo.email}
                            loading={loading}
                            userId={userInfo.id}
                            userList={userList}
                            setLoading={setLoading}
                            termCheck={termCheck} />
                    </Elements>
                </div>
            </div>
        </Modal>
    );
}

export default confirmable(UpdateSubscribeDlg);
