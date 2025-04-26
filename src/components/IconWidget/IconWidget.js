import './IconWidget.css'
export const IconWidget = (props) => {
    const {src, onClick, className, style } = props;
    return <img src={src} className={`icon-widget ${className === undefined ? "" : className}`} onClick={()=>{
        if (onClick == undefined) return
        onClick()
    }} style={style} />
}