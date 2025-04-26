import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import { Link } from "react-router-dom";
import "./AcademyCBATop.css";
import { useSelector } from "react-redux";

const AcademyCBATop = () => {
    const userInfo = useSelector((state) => state.user);
    const userSubscription = useSelector((state) => state.subscription);
    const baseMembership = useSelector((state) => state.base_membership);
    const [modal2Open, setModal2Open] = useState(false);
    const handleShowRegistration = () => {
        if (localStorage.getItem("token")) {
            setModal2Open(true);
        } else {
            window.location.href = "/signin"
        }
    }

    return (
        <div className="academy-slide">
            <div className="academy-slide-content">
                <Link to="#" className="slide-subtitle" onClick={handleShowRegistration}>DEVELOPING THE FUTURE OF BASKETBALL</Link>
                {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                <AnimatedSection type="top">
                    <h1 className="slide-title">COASTAL BASKETBALL <br />
                        ACADEMY <span>[CBA]</span>
                    </h1>
                </AnimatedSection>
                <p className="slide-description">
                    <AnimatedSection type="right">
                        <div className="program-desc-title">Coastal Basketball Academy (CBA)</div>
                        Changing the way traditional basketball development has been done to date by focusing on what truly matters. We coach and train athletes to become multi skilled players who make great decisions and enjoy the game. Rather than following strict age brackets, we allow each player's true abilities to determine their path forward, always challenging them at the appropriate level.
                    </AnimatedSection>
                </p>
            </div>
        </div >
    )
}

export default AcademyCBATop;