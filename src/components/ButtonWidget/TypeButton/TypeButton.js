import './TypeButton.css'
export const TypeButton = (props) => {
    const { checked, onClick } = props;
    return (
        <div className={`type-button-rect ${checked === true ? "checked" : ""}`} onClick={() => {
            if (onClick == undefined) return
            onClick()
        }}>{props.children}</div>
    )
}