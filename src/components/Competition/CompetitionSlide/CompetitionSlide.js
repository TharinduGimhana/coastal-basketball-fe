import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import { Link } from "react-router-dom";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import "./CompetitionSlide.css";
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
        <div className="representative-slide competition-slide">
            <div className="academy-slide-content">
                <Link to="#" className="slide-subtitle" onClick={handleShowRegistration}>COMPETE FOR YOUR SCHOOL</Link>
                {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                <AnimatedSection type="top"><h1 className="slide-title">COASTAL BASKETBALL UNITED<br />
                    <span>HIGH SCHOOL LEAGUE</span></h1>
                </AnimatedSection>
                <div className="slide-description">
                    <AnimatedSection type="right">
                        The Coastal Basketball High School League is a competitive
                        platform for high schools in Bunbury, Eaton, and Australind.
                        The league provides students with the opportunity to represent
                        their schools, compete against peers, and develop their basketball skills.
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

export default AcademyCBATop;