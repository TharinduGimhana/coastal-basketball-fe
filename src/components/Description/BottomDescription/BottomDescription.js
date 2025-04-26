import AnimatedSection from '../../AnimatedSection/AnimatedSection';
import TypingEffect from '../../AnimatedSection/TypingEffect';
import './BottomDescription.css'
export const BottomDescription = (props) => {
    const { className, style, title1, title2, content } = props;
    return (
        <div className={`${className ? className : ''} responsive-branch`} style={style}>
            <div className="bottom-title">
                <div className='font-48 typo-blue'>
                    <AnimatedSection type="fade">{title1} <span className='font-48 typo-red'>{title2 === "Admin Panel" || title2 === "BRANCHES" ? <br />:''}{title2}</span></AnimatedSection>
                </div>

            </div>
        </div>
    )
}