// AnimatedSection.js
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const AnimatedSection = ({ children, name, type }) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const handleIntersect = ([entry]) => {

            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    setInView(true);
                });
                observer.disconnect(); // Stop observing once in view
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            threshold: [0], // Trigger when any part is visible
            rootMargin: '0px 0px -10% 0px',
        });

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            if (currentRef && typeof currentRef.destroy === 'function') {
                currentRef.destroy();
            }
        };
    }, []);

    return (
        <div className={`animated-section-${type} ${inView ? 'in-view' : ''}`} ref={ref} id={name}>
            {children}
        </div>
    );
};

export default AnimatedSection;
