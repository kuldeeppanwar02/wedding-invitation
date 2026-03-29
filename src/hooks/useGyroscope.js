"use client";
import { useState, useEffect } from 'react';

export function useGyroscope() {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleOrientation = (event) => {
            // Normalize values for subtle effect
            let x = event.gamma ? event.gamma / 45 : 0; 
            let y = event.beta ? (event.beta - 45) / 45 : 0;
            
            // Clamp between -1 and 1
            x = Math.max(-1, Math.min(1, x));
            y = Math.max(-1, Math.min(1, y));

            setTilt({ x, y });
        };

        if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation);
        }
        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, []);

    return tilt;
}