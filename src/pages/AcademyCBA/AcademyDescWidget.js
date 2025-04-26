import React from "react";
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
const AcademyDescWidget = () => {
    return <div className="academy-desc-widget">
        <p className="slide-description" style={{ textAlign: 'left', marginTop: 0 }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Why Our Academy Stands Out</div>
                Skill-Based Progression: Our four-level programs—CB Beginner, CB Prep, CB Next Gen, and CB Elite—provides flexible paths. Players advance by demonstrating specific skill proficiency, much like swimming lessons or martial arts belt levels.
            </AnimatedSection>
        </p>
        <p className="slide-description" style={{ textAlign: 'left' }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Smart & Coachable Players:</div>
                We aim for our basketball players to succeed not just physically, but mentally. Training is designed to sharpen game IQ, encourage flexibility, and build a humble, growth-oriented mindset.
            </AnimatedSection>
        </p>
        <p className="slide-description" style={{ textAlign: 'left' }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Elite Finishing, Shooting & Defense</div>
                From contested finishes to on-ball defense training, our teaching model is based on the foundation of creating high-level skills. We intensely target shooting mechanics and high-pressure decision making to provide every player the ability to compete in clutch-game situations.
            </AnimatedSection>
        </p>
        <p className="slide-description" style={{ textAlign: 'left' }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Overall Athlete Development:</div>
                We mix basketball fundamentals with strength, agility, and conditioning, so even those who aren’t naturally the quickest can maximize their potential. We want every athlete to leave our program feeling confident, resilient, and prepared for higher-level competition.
            </AnimatedSection>
        </p>
        <p className="slide-description" style={{ textAlign: 'left' }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Our Four Programs</div>
                <div style={{ fontWeight: '600' }}>1. CB Beginner </div>
                <div style={{ paddingLeft: 15 }}>Recommended for newer players (around ages 6–9). Focuses on fun, foundational skills—like ball handling, basic shooting form, and simple footwork—while instilling a love for the game.</div>
                <div>2. CB Prep </div>
                <div style={{ paddingLeft: 15 }}>Ideal for athletes building on fundamentals (around ages 9–12). Emphasizes contested finishes, decision-making drills, and defensive positioning. Introduces structured skill assessments to prepare for more advanced challenges.</div>
                <div>3. CB Next Gen </div><div style={{ paddingLeft: 15 }}>Suitable for intermediate to advanced athletes (around ages 12–15). Focuses on refining elite shooting techniques, dynamic defensive tactics, and high-pressure decision making. Integrates video analysis and performance tracking to drive measurable growth.</div>
                <div>4. CB Elite </div><div style={{ paddingLeft: 15 }}> Designed for players with advanced skills (around ages 15+ or younger athletes who’ve shown higher mastery). This level features intense, game-speed training and deeper tactical insights. We concentrate on harnessing each athlete’s strength and agility while honing leadership and adaptability for top-tier competitive play.</div>
            </AnimatedSection>
        </p>
        <p className="slide-description" style={{ textAlign: 'left' }}>
            <AnimatedSection type="right">
                <div className="program-desc-title">Join the Coastal Basketball Family</div>
                Whether you’re stepping onto the court for the first time or you’re striving for the next level, Coastal Basketball Academy provides a community that champions growth, tenacity, and excellence. Our coaches are committed to helping every athlete become an intelligent, confident, and highly skilled player who’s ready to stand out in any game situation.
                Ready to elevate your game? Contact us to find the perfect Coastal Basketball Academy program for you or your aspiring athlete. Let’s work together to build players who are smart, coachable, and unstoppable on the court.
            </AnimatedSection>
        </p>
    </div>
}

export default AcademyDescWidget;