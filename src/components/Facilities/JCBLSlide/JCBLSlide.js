import React from "react";
import { Link } from "react-router-dom";
import "./JCBLSlide.css";

const JCBLSlide = () => {
    return (
        <div className="JCBL-slide">
            <div className="CBC-slide-content">
                <Link to="#" className="slide-subtitle">START YOUR JOURNEY</Link>
                <h1 className="slide-title">JUNIOR COASTAL</h1>
                <h1 className='slide-title'>BASKETBALL LEAGUE <span>(JCBL)</span></h1>
                <p className="slide-description">
                The Junior Coastal Basketball League (JCBL) provides young athletes with the opportunity 
                to develop their basketball skills in a competitive and supportive environment.
                 The league is open to players across Bunbury, Eaton, Australind, Busselton, and Harvey.
                </p>
            </div>
        </div>
    )
}

export default JCBLSlide;