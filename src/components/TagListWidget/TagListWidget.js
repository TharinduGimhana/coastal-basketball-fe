import React from "react";
import { useHistory } from "react-router-dom";
import "./TagListWidget.css";
const TagListWidget = (props) => {
  const { TagList } = props;
  const history = useHistory();
  if (TagList == undefined) {
    return <></>;
  }
  const onClickTag = (tag) => {
    // history.push(ROUTE_TAG_PAGE + "/" + tag);
  };
  return (
    <>
      {TagList.map((tag) => {
        return (
          <span
            key={`tag-string-${tag}`}
            style={{ color: "var(--mainColor)", margin: "0px 5px" }}
            className="tag-rect"
            onClick={() => {
              onClickTag(tag);
            }}
          >
            #{tag}
          </span>
        );
      })}
    </>
  );
};

export default TagListWidget;
