import "./CommunityItem.css";
import Icon from "@ant-design/icons";
import PostBg from "assets/png/post_bg.png";
import CustomerIcon from "assets/png/customer1.png";
import { ReactComponent as OptionIcon } from "assets/svg/ic_option.svg";
import { ReactComponent as LikeIcon } from "assets/svg/ic_like_text.svg";
import { ReactComponent as CommentIcon } from "assets/svg/ic_comment.svg";
import { ReactComponent as ShareIcon } from "assets/svg/ic_share.svg";
import { Col, Divider, Input, Row } from "antd";
import SocialActionButton from "components/ButtonWidget/SocialActionButton/SocialActionButton";
import TagListWidget from "components/TagListWidget/TagListWidget";
export const CommunityItem = (props) => {
  const { item } = props;
  const onClickLike = () => {};
  const onClickComment = () => {};
  const onClickShare = () => {};
  return (
    <div className="community-rect">
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle" gutter={16}>
            <Col>
              <img className="community-avatar-img" src={CustomerIcon} />
            </Col>
            <Col>
              <p className="font-15 bold">{item.user_name}</p>
              <p className="font-14">{item.user_info}</p>
            </Col>
          </Row>
        </Col>
        <Col>
          <Icon component={OptionIcon} className={`community-option-icon`} />
        </Col>
      </Row>
      <div className="mt-10">
        <p className="font-14">{item.description}</p>
      </div>
      <div>
        <TagListWidget TagList={['Thank you']} />
      </div>
      <div className="community-img-rect">
        <img className="community-img" src={PostBg} />
      </div>
      <Row justify="space-between" className="mt-10">
        <Col>
          <p className="font-13">{item.like_count} Likes</p>
        </Col>
        <Col>
          <p className="font-13">{item.comment_count} Comments</p>
        </Col>
      </Row>
      <Divider />
      <div className="newsfeed-item-social-info">
        <Row align={"middle"} justify="space-between">
          <Col>
            <SocialActionButton
              icon={LikeIcon}
              title={"Like"}
              isActive={true}
              onClickAction={onClickLike}
            />
          </Col>
          <Col>
            <SocialActionButton
              icon={CommentIcon}
              title={"Comment"}
              isActive={false}
              onClickAction={onClickComment}
            />
          </Col>
          <Col>
            <SocialActionButton
              icon={ShareIcon}
              title={"Share"}
              isActive={true}
              onClickAction={onClickShare}
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <Row align="middle" gutter={8}>
        <Col flex={"40px"}>
          <img className="community-user-avatar" src={CustomerIcon} />
        </Col>
        <Col flex={"auto"}>
          <Input
            className="community-comment-input"
            placeholder="Write a comment..."
          />
        </Col>
      </Row>
    </div>
  );
};
