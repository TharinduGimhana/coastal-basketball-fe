import React from "react"
import { CommunityItem } from "./CommunityItem";

const CommunityWidget = (props) => {
    const { dataList } = props;

    if (dataList == undefined) {
      return;
    }
    return (
      <div className="community-widget">
        {dataList.map((x, index) => {
          return <CommunityItem key={index} item={x} />;
        })}
      </div>
    );
};

export default CommunityWidget;
