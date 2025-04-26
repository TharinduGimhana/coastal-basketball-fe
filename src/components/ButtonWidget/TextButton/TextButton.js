import './TextButton.css'
export const TextButton = (props) => {
    const {text, onClick, className, style } = props;
    return (
        <div className={`text-button-rect ${className === undefined ? "" : className}`} onClick={()=>{
            if (onClick == undefined) return
            onClick()
        }} style={style}>{props.children}</div>
    )
}