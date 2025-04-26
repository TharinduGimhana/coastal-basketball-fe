import { Input } from 'antd';
import './InputWidget.css'
export const InputWidget = (props) => {
    const {value, setValue, placeholder, multiple, className, style } = props;
    return <Input 
        placeholder={placeholder}
        value={value}
        onChange={(e)=>{
            
        }}
    />
}