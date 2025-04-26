import './CircleShadowButton.css'
export const CircleShadowButton = (props) => {
    const { src, text, onClick, className, style, imageStyle } = props;
    return (
        <div className={`circle-shadow ${className === undefined ? "" : className}`} style={style} onClick={() => {
            if (onClick == undefined) return
            onClick()
        }} >
            <img src={src} style={imageStyle} className="circle-shadow-image"/>
            <div className='circle-shadow-text'>{text}</div>
        </div>
    )
}