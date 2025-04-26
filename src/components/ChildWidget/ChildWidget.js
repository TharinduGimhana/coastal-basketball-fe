import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import "./ChildWidget.css";
const ChildWidget = (props) => {
    const { childList, setChildList } = props;

    const onClick = (e, k) => {
        let tmpList = [...childList]
        let tmpIndex = tmpList.findIndex(t => t.user_id == k.user_id)
        tmpList[tmpIndex]["checked"] = e.target.checked;
        setChildList(tmpList)
    }
    return <div>
        <div className="child-select-txt" style={{ marginTop: 0 }}>
            Please select the child you would like to subscribe to
        </div>
        {!(childList.length == 1 && childList.filter((t) => t.type == "individual")) && <div className="child-widget">
            {childList.map((x, index) => {
                return <div
                    key={index}>
                    <Checkbox
                        checked={x.checked}
                        onChange={(e) => {
                            onClick(e, x)
                        }}>
                        {x.first_name + " " + x.last_name}
                    </Checkbox>
                </div>
            })}
        </div>}

    </div>

}
export default ChildWidget;