import './CircleImageButton.css';
import { Link } from "react-router-dom";

export const CircleImageButton = (props) => {
    const { src, onClick, className, style, imageStyle, socialType } = props;
      const isExternalLink = socialType.startsWith('http');
    return (
        <div className={`circle-image-button ${className === undefined ? "" : className}`} style={style} onClick={() => {
            if (onClick == undefined) return
            onClick()
        }} >
             <a href={socialType} target='_blank'>
                <img src={src} style={imageStyle} className="circle-image" width="40" height="40" />
            </a>
        </div>
    )
}