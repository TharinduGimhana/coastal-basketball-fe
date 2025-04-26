import { CircleImageButton } from "components/ButtonWidget/CircleImageButton/CircleImageButton";
import "./FollowusWidget.css";
import IconFc from "assets/png/social_facebook.png";
import IconTw from "assets/png/social_linkedin.png";
import IconIn from "assets/png/social_xed.png";
export const FollowusWidget = (props) => {
  return (
    <div style={{display:'flex'}}>
      <CircleImageButton src={IconFc} socialType="https://www.facebook.com" className="social-circle-rect"/>
      <CircleImageButton src={IconTw} socialType="https://www.linkedin.com" className="social-circle-rect" />
      <CircleImageButton src={IconIn} socialType="https://twitter.com" className="social-circle-rect" />
    </div>
  );
};
