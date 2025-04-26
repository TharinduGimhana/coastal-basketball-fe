import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Input, DatePicker, Checkbox } from "antd";
import { numberWithCommas } from "constants/global";


const { Link } = Typography;
const SubscriptionOrder = (props) => {
    const { userList, selSubscription, termCheck, setTermCheck, loading, setLoading } = props;
    const termsPdfUrl = `${process.env.REACT_APP_API_BASE_URL}uploads/pdf/terms.pdf`;

    const [gst, setGST] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [stripeFee, setStripeFee] = useState(0);

    useEffect(() => {
        if (selSubscription) {
            let curTotal = 0;
            userList.filter((x) => x.checked).map((y, index) => {
                curTotal += parseFloat(selSubscription.fee);
            })
            let tmpGst = curTotal * 0.1;
            setGST(tmpGst);
            let stripe_total = (curTotal + tmpGst + 0.30) / (1 - 0.0175);
            let stripe_fee = stripe_total - curTotal - tmpGst;
            setStripeFee(stripe_fee);
            setTotalAmount(stripe_total);
        }
    }, [selSubscription])


    return <div className="signup-form-order">
        <div className="payment">
            {userList.filter((x) => x.checked).map((y, index) => {
                return <div key={index} className="payment" style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 18 }}>
                        {y.type == "individual" ? "Parent - " : "Kid - "} {y.first_name} {y.last_name}
                    </div>
                    <Row justify={"space-between"} style={{ marginTop: 5 }}>
                        <Col className="payment-label">Membership {selSubscription?.billing_frequency_info?.title} Fee</Col>
                        <Col className="payment-amount">${numberWithCommas(selSubscription.fee)}</Col>
                    </Row>
                </div>
            })}
            <Row justify={"space-between"} className="payment" style={{ marginTop: 10 }}>
                <Col className="payment-label">GST</Col>
                <Col className="payment-amount">${numberWithCommas(gst)}</Col>
            </Row>
            <Row justify={"space-between"} className="payment">
                <Col className="payment-label">Professing Fee</Col>
                <Col className="payment-amount">${numberWithCommas(stripeFee)}</Col>
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
}
export default SubscriptionOrder;