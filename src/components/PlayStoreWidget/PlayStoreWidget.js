import { CircleImageButton } from "components/ButtonWidget/CircleImageButton/CircleImageButton";
import "./PlayStoreWidget.css";
import IconGoogle from "assets/png/ic_google.png";
import IconApple from "assets/png/ic_apple.png";
import IconHuawei from "assets/png/ic_hw.png";
import { IconWidget } from "components/IconWidget/IconWidget";
export const PlayStoreWidget = (props) => {
  return (
    <div>
      <IconWidget src={IconApple} className="app-button" />
      <IconWidget src={IconGoogle} className="app-button" />
      <IconWidget src={IconHuawei} className="app-button" />
    </div>
  );
};
