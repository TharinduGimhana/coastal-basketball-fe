import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            if (ref.current && typeof ref.current.destroy === 'function') {
                ref.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (inView) {
            let index = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, index + 1));  // Use slice to ensure all characters are added
                index++;
                if (index === text.length) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);  // Clean up the interval on unmount
        }
    }, [inView, text]);

    return (
        <div ref={ref}>
            <div>{displayedText}</div>
        </div>
    );
};

export default TypingEffect;