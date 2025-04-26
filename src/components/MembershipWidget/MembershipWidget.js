import React, { useState } from "react";
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import "./MembershipWidget.css";
import Toast from "components/Toast/Toast";
const MembershipWidget = (props) => {
    const { baseSubscriptionInfo, setBaseMembership, subscriptionSettings, setSubscriptionSettings, currentSubscription, selSubscription, setSelSubscription, onBuy, onCancel } = props;
    const onClickItem = (index) => {

        if (index == -1) {
            setSelSubscription({ ...baseSubscriptionInfo })
            setBaseMembership({ ...baseSubscriptionInfo, checked: true })
            let tmpList = [...subscriptionSettings]
            tmpList = tmpList.map((x, key) => {
                let tmpObj = { ...x }
                tmpObj.checked = false;
                return tmpObj
            })
            setSubscriptionSettings(tmpList)
        } else {
            Toast("For the all access membership packages, we will open from the Thursday 28th April", 2);
            return;
            setBaseMembership({ ...baseSubscriptionInfo, checked: false })
            let tmpList = [...subscriptionSettings]
            tmpList = tmpList.map((x, key) => {
                let tmpObj = { ...x }
                if (key == index) {
                    tmpObj.checked = true;
                    setSelSubscription({ ...tmpObj })
                } else {
                    tmpObj.checked = false;
                }
                return tmpObj
            })
            setSubscriptionSettings(tmpList)
        }

    }
    return <div>
        <div className="txt-optional-feature" style={{ marginTop: 0 }}>
            FOUNDATION
        </div>
        <div className={`base-membership-item ${baseSubscriptionInfo?.checked}`} onClick={() => {
            onClickItem(-1)
        }}>
            <p className="membership-title">{baseSubscriptionInfo?.package_type_info.title}</p>
            {currentSubscription?.id == baseSubscriptionInfo?.id && <div className="current-rect">CURRENT</div>}
            <div className="membership-year-fee">
                {/* <div className="fee-rect">
                    <div className="fee-symbol">$</div>
                    <div className="fee-amount">{baseSubscriptionInfo?.fee}</div>
                </div>
                <div className="fee-year-rect">
                    <div className="fee-year">/year</div>
                </div> */}
                ${baseSubscriptionInfo?.fee} / YEAR
            </div>
            <div className="membership-billing">
                <div className="membership-billing-label">Billing: </div>
                <div className="membership-billing-desc">{baseSubscriptionInfo?.billing_desc}</div>
            </div>
            <div className="membership-benefit">
                <div className="membership-benefit-label">Benefits: </div>
                <div className="membership-benefit-desc">{baseSubscriptionInfo?.benefit_info}</div>
            </div>
            <div className="membership-ideal">
                <div className="membership-ideal-label"><p>Ideal&nbsp;For: </p></div>
                <div className="membership-ideal-desc">{baseSubscriptionInfo?.ideal}</div>
            </div>
            <div className="buy-rect">
                {currentSubscription?.id == baseSubscriptionInfo?.id ?
                    <Button className="btn-cancel-now" onClick={() => {
                        onClickItem(-1);
                        setTimeout(() => {
                            onCancel(-1);
                        }, 1000)
                    }}>Cancel Now</Button>
                    :
                    <Button className="btn-buy-now" onClick={() => {
                        onClickItem(-1);
                        setTimeout(() => {
                            onBuy(-1);
                        }, 1000)
                    }}>Buy Now</Button>}
            </div>
        </div>
        <div className="txt-optional-feature">
            OPTIONAL PACKAGES
        </div>
        <Row gutter={[24, 24]} justify={"center"} align={"middle"} style={{ marginTop: 20, marginBottom: 20 }}>
            {subscriptionSettings.map((x, index) => {
                return <Col key={index}>
                    <div className={`membership-item ${x.checked}`} onClick={() => {
                        onClickItem(index)
                    }}>
                        <p className="membership-title">{x.package_type_info.title}</p>
                        {x.period != "0" && <p className="membership-period">{x.period} Month</p>}
                        {currentSubscription?.id == x.id && <div className="current-rect">CURRENT</div>}
                        <div className="membership-year-fee">
                            {/* ${parseFloat(x?.fee).toFixed(2)} / {x?.billing_frequency_info.title} */}
                            ${parseFloat(parseFloat(x?.fee) / 2).toFixed(2)} / Weekly
                            {/* <div className="fee-rect">
                                <div className="fee-symbol">$</div>
                                <div className="fee-amount">{x.year_fee}</div>
                            </div>
                            <div className="fee-year-rect">
                                <div className="fee-year">/year</div>
                            </div> */}
                        </div>
                        <div className="membership-billing">
                            <div className="membership-billing-label">Billing: </div>
                            <div className="membership-billing-desc">{x.billing_desc}</div>
                        </div>
                        <div className="membership-benefit">
                            <div className="membership-benefit-label">Benefits: </div>
                            <div className="membership-benefit-desc">{x.benefit_info}</div>
                        </div>
                        <div className="membership-ideal">
                            <div className="membership-ideal-label"><p>Ideal&nbsp;For: </p></div>
                            <div className="membership-ideal-desc">{x.ideal}</div>
                        </div>
                        <div className="buy-rect">
                            {currentSubscription?.id == x.id ?
                                <Button className="btn-cancel-now" onClick={() => {
                                    // onClickItem(index);
                                    // setTimeout(() => {
                                    //     onCancel(x.id);
                                    // }, 1000)
                                }}>Cancel Now</Button>
                                :
                                <Button className="btn-buy-now" onClick={() => {
                                    // onClickItem(index);
                                    // setTimeout(() => {
                                    //     onBuy(x.id);
                                    // }, 1000)
                                }}>Buy Now</Button>}
                        </div>
                    </div>

                </Col>
            })}
        </Row></div>
}
export default MembershipWidget;