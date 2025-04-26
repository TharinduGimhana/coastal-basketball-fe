import './RoundButton.css'
export const RoundButton = (props) => {
    const {text, onClick, className, style } = props;
    return (
        <div className={`round-button-rect ${className === undefined ? "" : className}`} onClick={()=>{
            if (onClick == undefined) return
            onClick()
        }} style={style}>{props.children}</div>
    )
}