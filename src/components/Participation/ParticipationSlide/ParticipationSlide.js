import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import { Link } from "react-router-dom";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import ImgCrl from "../../../assets/png/league_hero.jpg";
import "./ParticipationSlide.css";
import { useSelector } from "react-redux";

const ParticipationSlide = () => {
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
        <div className="representative-slide participation-slide">
            <div className="academy-slide-content">
                <Link to="#" className="slide-subtitle" onClick={handleShowRegistration}>JOIN THE COMPETITIVE EDGE</Link>
                {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
                <AnimatedSection type="top">
                    <h1 className="slide-title">COASTAL BASKETBALL <br />LEAGUE
                        <span> [CBL]</span></h1>
                </AnimatedSection>
                <div className="slide-description">
                    <AnimatedSection type="right">
                        The Coastal Basketball League [CBL] is designed for players looking to
                        compete in a structured, high-stakes environment.
                        CBL offers a competitive league format that brings together top
                        talent from across the state.
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

export default ParticipationSlide;