import React, { useState } from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import bgImg from "assets/png/court_players.png";
import { Link } from "react-router-dom";
import "./PackageTop.css";

const PackageTop = () => {
    return (
        <div className="membership-package-rect">
            <div className="top">
                <AnimatedSection type="top">
                    <h2 className="slide-title">Support Basketball in the South West and Be Part of the Game!</h2>
                </AnimatedSection>
                <div className="slide-description">
                    <AnimatedSection type="right">
                        Join Coastal Basketball with an Annual Foundation Membership and help grow basketball competitions and facilities in the region.
                    </AnimatedSection>
                </div>
            </div>
            {/* <div className="membership-bg-img-rect">
                <img src={bgImg} className="membership-bg-img"/>
            </div> */}
        </div>
    )
}

export default PackageTop;