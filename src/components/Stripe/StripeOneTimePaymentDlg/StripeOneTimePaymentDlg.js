import React, { useState, useEffect } from 'react';
import { confirmable } from "react-confirm";
import { Modal, Button, Col, Input, Row, Typography, Checkbox } from 'antd';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { numberWithCommas } from 'constants/global';
import "./StripeOneTimePaymentDlg.css";
import CardForm from './CardForm';


const { Link } = Typography;

function StripeOneTimePaymentDlg(props) {
    const { show, proceed, userList, email, userId, fee, bookingFee } = props;
    const [loading, setLoading] = useState([]);
    const [termCheck, setTermCheck] = useState(false);
    const termsPdfUrl = `${process.env.REACT_APP_API_BASE_URL}uploads/pdf/terms.pdf`;
    const [gst, setGST] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [stripeFee, setStripeFee] = useState(0);

    const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);


    useEffect(() => {
        let curTotal = 0;
        userList.map((x) => {
            curTotal += parseFloat(fee);
            if (!x.is_member) {
                curTotal += parseFloat(bookingFee);
            }
        })
        let tmpGst = curTotal * 0.1;
        setGST(tmpGst);
        let stripe_total = (curTotal + tmpGst + 0.30) / (1 - 0.0175);
        let stripe_fee = stripe_total - curTotal - tmpGst;
        setStripeFee(stripe_fee);
        setTotalAmount(stripe_total);
    }, [])

    const onPayFinished = (clientSecret) => {
        proceed(clientSecret);
    }

    return (
        <Modal
            visible={show}
            destroyOnClose={true}
            onCancel={() => {
                proceed(null);
            }}
            className="onetime-payment-modal"
            closable={true}
            maskClosable={false}
            title={"Registration Payment"}
            footer={null}
        >
            <div>
                <div className="signup-form-order">
                    <div className="payment">

                        {userList.map((x, index) => {
                            return <div
                                key={index}>
                                <div style={{ fontSize: 18 }}>
                                    {x.type == "individual" ? "Parent - " : "Kid - "} {x.first_name} {x.last_name}
                                </div>
                                <div className='payment-rect'>
                                    <Row justify={"space-between"}>
                                        <Col className="payment-label">Registration Cost</Col>
                                        <Col className="payment-amount">${numberWithCommas(fee)}</Col>
                                    </Row>
                                    {!x.is_member && <Row justify={"space-between"}>
                                        <Col className="payment-label">Booking Fee</Col>
                                        <Col className="payment-amount">${numberWithCommas(bookingFee)}</Col>
                                    </Row>}
                                </div>
                            </div>
                        })}

                        <Row justify={"space-between"} style={{ marginTop: 10 }}>
                            <Col className="payment-label" style={{ fontSize: 18 }}>GST</Col>
                            <Col className="payment-amount" style={{ fontSize: 18 }}>${numberWithCommas(gst)}</Col>
                        </Row>
                        <Row justify={"space-between"}>
                            <Col className="payment-label" style={{ fontSize: 18 }}>Professing Fee</Col>
                            <Col className="payment-amount" style={{ fontSize: 18 }}>${numberWithCommas(stripeFee)}</Col>
                        </Row>
                        <div className="payment-total">
                            <Row justify={"space-between"}>
                                <Col className="payment-total-label">Checkout Total</Col>
                                <Col className="payment-total-label">${numberWithCommas(totalAmount)}</Col>
                            </Row>
                        </div>
                        <div className="payment-check-rect">
                            <Checkbox
                                checked={termCheck}
                                className="pay-check"
                                onChange={(e) => {
                                    setTermCheck(e.target.checked)
                                }}
                            >
                                <Link href={termsPdfUrl} target="_blank" rel="noopener noreferrer">
                                    I have read and agree to the terms and conditions
                                </Link>
                            </Checkbox>
                        </div>
                    </div>
                </div>
                <Elements stripe={stripePromise}>
                    <CardForm
                        onPayFinished={onPayFinished}
                        fee={totalAmount}
                        userId={userId}
                        email={email}
                        loading={loading}
                        setLoading={setLoading}
                        termCheck={termCheck} />
                </Elements>
            </div>
        </Modal>
    );
}

export default confirmable(StripeOneTimePaymentDlg);
