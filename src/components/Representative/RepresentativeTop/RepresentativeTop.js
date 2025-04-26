import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import { Link } from "react-router-dom";
import "./RepresentativeTop.css";
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
        <div className="representative-slide">
            <div className="academy-slide-content">
                <Link to="#" className="slide-subtitle" onClick={handleShowRegistration}>REPRESENTING THE REGION</Link>
                {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                <AnimatedSection type="top">
                    <h1 className="slide-title">COASTAL BASKETBALL UNITED<br />
                        <span>[CB UNITED]</span></h1>
                </AnimatedSection>

                <div className="slide-description">
                    <AnimatedSection type="right">
                        Coastal Basketball United (CB United) is the representative
                        arm of Coastal Basketball, bringing together the best talent
                        from our leagues and academy to compete at state and national
                        levels. CB United provides a platform for elite players to
                        showcase their skills and represent the South West region in
                        high-profile tournaments.
                    </AnimatedSection>
                </div>

            </div>
        </div>
    )
}

export default AcademyCBATop;