import './RoundImageButton.css'
export const RoundImageButton = (props) => {
    const {text, onClick, className, style } = props;
    return (
        <div className={`round-image-button-rect ${className === undefined ? "" : className}`} onClick={()=>{
            if (onClick == undefined) return
            onClick()
        }} style={style}>{props.children}</div>
    )
}