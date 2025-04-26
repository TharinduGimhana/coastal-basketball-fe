import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import { Link } from "react-router-dom";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import "./JCBLSlide.css";
import { useSelector } from "react-redux";

const JCBLSlide = () => {
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
        <div className="JCBL-slide">
            <div className="CBC-slide-content">
                <Link to="#" className="slide-subtitle" onClick={handleShowRegistration}>START YOUR JOURNEY</Link>
                {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                <AnimatedSection type="top"><h1 className='slide-title'>JUNIOR COASTAL <br />BASKETBALL LEAGUE <span>(JCBL)</span></h1></AnimatedSection>
                <div className="slide-description">
                    <AnimatedSection type="right">
                        The Junior Coastal Basketball League (JCBL) provides young athletes with the opportunity
                        to develop their basketball skills in a competitive and supportive environment.
                        The league is open to players across Bunbury, Eaton, Australind, Busselton, and Harvey.
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

export default JCBLSlide;