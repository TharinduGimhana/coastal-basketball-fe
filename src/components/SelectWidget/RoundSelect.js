import { Select } from "antd";
import DropIcon from "assets/png/ic_drop.png";
import "./RoundSelect.css";
const { Option } = Select;
export const RoundSelect = (props) => {
  const { onChange, value, optionList, style } = props;
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <Select
      onChange={handleChange}
      value={value}
      style={style}
      className="round-select"
      suffixIcon={<img src={DropIcon} />}
    >
      {optionList.map((x, index) => {
        return (
          <Option key={index} value={x.value} className="round-select-item">
            {x.label}
          </Option>
        );
      })}
    </Select>
  );
};
