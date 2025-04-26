import React, { useState } from "react";
import { Checkbox, Row, Col } from "antd";
import "./ChildWidget.css";
const ChildRegisterWidget = (props) => {
    const { childList, setChildList } = props;

    const onClick = (e, k) => {
        let tmpList = [...childList]
        let tmpIndex = tmpList.findIndex(t => t.user_id == k.user_id)
        tmpList[tmpIndex]["checked"] = e.target.checked;
        setChildList(tmpList)
    }
    return <div>
        <div className="child-select-txt" style={{ marginTop: 0 }}>
            Please select the player you would like to register to
        </div>
        <div className="child-widget">
            <Row justify={"space-between"} gutter={8} style={{ marginBottom: 5, color: 'var(--mainRedColor)' }}>
                <Col sm={12}>
                    UserName
                </Col>
                <Col sm={12}>
                    <Row>
                        <Col sm={12}>
                            Membership Status
                        </Col>
                        <Col sm={12}>
                            Status
                        </Col>
                    </Row>
                </Col>
            </Row>
            {childList.map((x, index) => {
                return <div
                    key={index}>
                    <Row justify={"space-between"} style={x.available ? { color: 'black' } : { color: '#9c9c9c' }}>
                        <Col sm={12}>
                            <Checkbox
                                disabled={!x.available}
                                style={x.available ? { color: 'black' } : { color: '#9c9c9c' }}
                                value={x.checked}
                                onChange={(e) => {
                                    onClick(e, x)
                                }}>
                                {x.first_name} {x.last_name}
                            </Checkbox>
                        </Col>
                        <Col sm={12}>
                            <Row>
                                <Col sm={12}>
                                    {x.is_member ? "Member" : "Non-Member"}
                                </Col>
                                <Col sm={12}>
                                    {x.available ? "Available" : "Unavailable"}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            })}

        </div>
    </div>

}
export default ChildRegisterWidget;