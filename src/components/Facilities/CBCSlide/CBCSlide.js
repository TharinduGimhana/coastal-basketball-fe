import React from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import { Link } from "react-router-dom";
import "./CBCSlide.css";

const CBCSlide = () => {
    return (
        <div className="CBC-slide">
            <div className="CBC-slide-content">
                <Link to="#" className="slide-subtitle">THE AGE OF MODERN BASKETBALL</Link>
                <AnimatedSection type="top">
                <h1 className="slide-title">COASTAL BASKETBALL <br />
                CENTRE <span>(CBC)</span>
                </h1>
                </AnimatedSection>
                <AnimatedSection type="right">  
                <p className="slide-description">
                    The Coastal Basketball Centre (CBC) is the heartbeat of our basketball operations,
                    offering Custom design facilities to nurture talent and host competitive
                    events. Located in Bunbury, CBC is the first of several planned centres aimed at
                    providing basketball amenities to the region.
                </p>
                </AnimatedSection>
            </div>
        </div>
    )
}

export default CBCSlide;