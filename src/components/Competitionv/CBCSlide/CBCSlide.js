import React from "react";
import { Link } from "react-router-dom";
import "./CBCSlide.css";

const CBCSlide = () => {
    return (
        <div className="CBC-slide">
            <div className="CBC-slide-content">
                <Link to="#" className="slide-subtitle">THE AGE OF MODERN BASKETBALL</Link>
                <h1 className="slide-title">COASTAL BASKETBALL</h1>
                <h1 className='slide-title'>CENTRE <span>(CBC)</span></h1>
                <p className="slide-description">
                    The Coastal Basketball Centre (CBC) is the heartbeat of our basketball operations,
                    offering state-of-the-art facilities designed to nurture talent and host competitive
                    events. Located in Bunbury, CBC is the first of several planned centres aimed at
                    providing world-class basketball amenities to the region.
                </p>
            </div>
        </div>
    )
}

export default CBCSlide;