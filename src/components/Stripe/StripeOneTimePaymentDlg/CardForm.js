import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { numberWithCommas } from "constants/global";
import { Button, Spin, notification } from "antd";
import Toast from "components/Toast/Toast";

import { apiPost } from "ajax/apiServices";
import { UrlCreatePaymentIntent } from "ajax/apiUrls";

export default function CardForm(props) {
    const { fee, onPayFinished, termCheck, userId, email } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const [gst, setGST] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [stripeFee, setStripeFee] = useState(0);

    // useEffect(() => {
    //     if (fee) {
    //         let curTotal = parseFloat(fee);
    //         let tmpGst = curTotal * 0.1;
    //         setGST(tmpGst);
    //         let stripe_total = (curTotal + tmpGst + 0.30) / (1 - 0.0175);
    //         let stripe_fee = stripe_total - curTotal - tmpGst;
    //         setStripeFee(stripe_fee);
    //         setTotalAmount(stripe_total);
    //     }
    // }, [fee])

    const onCheckout = async (event) => {
        if (loading) return;
        if (!termCheck) {
            notification.error({
                message: 'Error Notification',
                description: "Please check terms & condition",
            });
            return;
        }
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }


        try {
            setLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append("cost", fee);
            formDataToSend.append("user_id", userId);
            formDataToSend.append("email", email);
            apiPost(UrlCreatePaymentIntent, formDataToSend)
                .then((res) => {
                    setLoading(false);
                    onPay(res.clientSecret);
                })
                .catch((err) => {
                    Toast(err, 2);
                    setLoading(false)
                });
        } catch (error) {
            Toast("Error processing membership", 2);
        }
    };

    const onPay = async (clientSecret) => {
        setLoading(true);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            Toast(result.error.message, 2);
        } else {
            if (result.paymentIntent.status === "succeeded") {
                onPayFinished(clientSecret);
            }
        }
        setLoading(false);
    }
    return (
        <Spin spinning={loading}>
            <div className="card-rect">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            lineHeight: '50px'
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={onCheckout} block style={{ width: '240px', padding: '20px', fontSize: 20 }}>
                    Confirm and pay ${numberWithCommas(fee)}
                </Button>
            </div>
        </Spin>
    );
}
