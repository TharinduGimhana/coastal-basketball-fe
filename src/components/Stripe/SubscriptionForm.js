import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { numberWithCommas } from "constants/global";
import { Button, Spin, notification } from "antd";
import "./StripeForm.css";
import Toast from "components/Toast/Toast";
import { UrlSubscribe } from "ajax/apiUrls";
import { apiPost } from "ajax/apiServices";

export default function SubscriptionForm(props) {
    const { selSubscription, email, onPayFinished, termCheck, userId, userList } = props;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    const onPay = async (event) => {
        if (loading) return;
        if (!termCheck) {
            notification.error({
                message: 'Error Notification',
                description: "Please check terms & condition",
            });
            return;
        }
        event.preventDefault();

        // if (isChild && childSubscription.length == 0) {
        //     notification.error({
        //         message: 'Error Notification',
        //         description: "Please select the child you would like to subscribe to",
        //     });
        //     return
        // }
        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("email", email);
            formData.append("user_id", userId);
            formData.append("token", paymentMethod.id);
            formData.append("subscription_plan_id", selSubscription.id);
            formData.append("user_list", JSON.stringify(userList));
            apiPost(UrlSubscribe, formData)
                .then((res) => {
                    Toast("Membership Created Successfully!", 1)
                    setTimeout(() => {
                        setLoading(false);
                        onPayFinished(res)
                    }, 1000)
                })
                .catch((err) => {
                    Toast(err, 2);
                    setLoading(false)
                });
        } catch (error) {
            setMessage("Error processing membership");
        }
    };

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
                <Button type="primary" onClick={onPay} block style={{ width: '240px', padding: '20px', fontSize: 20 }}>
                    Confirm and pay ${numberWithCommas(totalAmount)}
                </Button>
            </div>
        </Spin>
    );
}
