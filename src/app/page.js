"use client";
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════
// DECORATIVE CORNER ORNAMENT (Paisley/Mandala SVG)
// ═══════════════════════════════════════════════
function CornerOrnaments({ color = "#D4AF37" }) {
    const svg = (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5 C5 5, 45 5, 55 15 C65 25, 65 45, 55 55 C45 65, 25 65, 15 55 C5 45, 5 25, 15 15 C20 10, 30 8, 40 12" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M10 10 C10 10, 40 10, 48 18 C56 26, 56 46, 48 48 C40 50, 20 50, 18 42 C16 34, 18 20, 28 14" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="20" cy="20" r="3" fill={color} opacity="0.4" />
            <circle cx="40" cy="15" r="2" fill={color} opacity="0.3" />
            <circle cx="15" cy="40" r="2" fill={color} opacity="0.3" />
            <path d="M5 5 Q15 5 15 15" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M5 5 Q5 15 15 15" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
    );
    return (
        <>
            <div className="corner-ornament corner-tl">{svg}</div>
            <div className="corner-ornament corner-tr">{svg}</div>
            <div className="corner-ornament corner-bl">{svg}</div>
            <div className="corner-ornament corner-br">{svg}</div>
        </>
    );
}



// ═══════════════════════════════════════════════
// SVG HEART (Stylized, not emoji)
// ═══════════════════════════════════════════════
function GoldenHeart({ size = 40 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="heart-beat">
            <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF2D55" />
                    <stop offset="50%" stopColor="#FF375F" />
                    <stop offset="100%" stopColor="#D4145A" />
                </linearGradient>
                <filter id="heartGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path
                d="M25 43 C25 43, 5 30, 5 18 C5 10, 12 5, 18 5 C22 5, 25 8, 25 12 C25 8, 28 5, 32 5 C38 5, 45 10, 45 18 C45 30, 25 43, 25 43Z"
                fill="url(#heartGrad)"
                filter="url(#heartGlow)"
            />
        </svg>
    );
}

// ═══════════════════════════════════════════════
// MARIGOLD PETALS (Improved flower-like shapes)
// ═══════════════════════════════════════════════
function MarigoldRain() {
    const petals = useMemo(() => {
        const colors = [
            'radial-gradient(circle at 30% 30%, #FFD700, #FF8C00)',
            'radial-gradient(circle at 30% 30%, #FFA500, #CC7000)',
            'radial-gradient(circle at 30% 30%, #FFB347, #E67300)',
            'radial-gradient(circle at 30% 30%, #FFCC33, #B8860B)',
            'radial-gradient(circle at 30% 30%, #FF9900, #8B6914)',
            'radial-gradient(circle at 30% 30%, #DAA520, #996515)',
        ];
        return Array.from({ length: 45 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 14 + Math.random() * 14, // 14-28px (bigger!)
            bg: colors[Math.floor(Math.random() * colors.length)],
            delay: Math.random() * 8,
            duration: 6 + Math.random() * 6,
        }));
    }, []);

    return (
        <div className="marigold-rain">
            {petals.map(p => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                    }}
                >
                    {/* Multi-layer petal to simulate flower */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: p.bg,
                        borderRadius: '50% 50% 50% 10%',
                        position: 'relative',
                        boxShadow: `0 0 8px rgba(255, 165, 0, 0.3)`,
                    }}>
                        <div style={{
                            position: 'absolute',
                            width: '70%',
                            height: '70%',
                            top: '15%',
                            left: '15%',
                            background: p.bg,
                            borderRadius: '10% 50% 50% 50%',
                            opacity: 0.7,
                            transform: 'rotate(90deg)',
                        }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════
// SPARKLE PARTICLES
// ═══════════════════════════════════════════════
function Sparkles({ count = 30 }) {
    const sparkles = useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            size: 2 + Math.random() * 4,
        })), [count]
    );

    return (
        <div className="sparkle-container">
            {sparkles.map(s => (
                <div
                    key={s.id}
                    className="sparkle"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: s.size,
                        height: s.size,
                        animationDelay: `${s.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════
// PROGRESS INDICATOR
// ═══════════════════════════════════════════════
function ProgressDots({ current, total = 5 }) {
    return (
        <div className="flex items-center gap-2 justify-center">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`progress-dot ${i + 1 === current ? 'active' : ''}`}
                />
            ))}
        </div>
    );
}

// ═══════════════════════════════════════════════
// GOLD DIVIDER LINE
// ═══════════════════════════════════════════════
function GoldDivider({ width = "60%" }) {
    return <div className="gold-divider" style={{ width }} />;
}

// ═══════════════════════════════════════════════
//  MAIN WEDDING INVITATION
// ═══════════════════════════════════════════════
export default function WeddingInvitation() {
    const [isStarted, setIsStarted] = useState(false);
    const [step, setStep] = useState(1);
    const audioRef = useRef(null);
    const touchStartRef = useRef(null);
    const TOTAL_STEPS = 5;

    // ──── Audio Setup ────
    useEffect(() => {
        const fileName = encodeURIComponent('Vakratunda Mahakaya वकरतड महकय  Ganesh Mantra #god #bhakti.mp3');
        const audio = new Audio('/audio/' + fileName);
        audio.loop = true;
        audio.volume = 0.6;
        audio.preload = 'auto';
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    // ──── Start the invitation ────
    const handleStart = useCallback(() => {
        setIsStarted(true);
        // Guaranteed to work — user just tapped!
        if (audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
    }, []);

    // ──── Auto-advance: 5 seconds per step ────
    useEffect(() => {
        if (!isStarted) return;
        if (step >= TOTAL_STEPS) return;
        const timer = setTimeout(() => {
            setStep(prev => prev + 1);
        }, 5000);
        return () => clearTimeout(timer);
    }, [step, isStarted]);

    // ──── Navigation ────
    const goToStep = useCallback((newStep) => {
        if (newStep < 1 || newStep > TOTAL_STEPS) return;
        setStep(newStep);
    }, []);

    const handleReplay = useCallback(() => {
        setStep(1);
    }, []);

    // ──── Swipe Gesture Support ────
    const handleTouchStart = useCallback((e) => {
        touchStartRef.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback((e) => {
        if (touchStartRef.current === null) return;
        const diff = touchStartRef.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToStep(Math.min(step + 1, TOTAL_STEPS));
            } else {
                goToStep(Math.max(step - 1, 1));
            }
        }
        touchStartRef.current = null;
    }, [step, goToStep]);

    // ──── Dynamic Background ────
    const bgGradient = useMemo(() => {
        if (!isStarted) return 'radial-gradient(ellipse at 50% 40%, #1a0800 0%, #0a0000 50%, #000000 100%)';
        switch (step) {
            case 1: return 'radial-gradient(ellipse at 50% 30%, #1a0500 0%, #0a0000 50%, #000000 100%)';
            case 2: return 'radial-gradient(ellipse at 50% 50%, #1a0800 0%, #0d0200 60%, #050000 100%)';
            case 3: return 'radial-gradient(ellipse at 50% 50%, #1a1000 0%, #0d0800 60%, #050200 100%)';
            case 4: return 'radial-gradient(ellipse at 50% 30%, #2a0000 0%, #150000 50%, #0a0000 100%)';
            case 5: return 'radial-gradient(ellipse at 50% 70%, #1a0d00 0%, #0a0500 50%, #050000 100%)';
            default: return '#0a0000';
        }
    }, [step, isStarted]);

    const easeOut = [0.22, 1, 0.36, 1];

    // ╔══════════════════════════════════════════╗
    // ║  SPLASH SCREEN: TAP TO OPEN             ║
    // ╚══════════════════════════════════════════╝
    if (!isStarted) {
        return (
            <main
                className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center cursor-pointer"
                style={{ background: bgGradient }}
                onClick={handleStart}
                onTouchEnd={handleStart}
            >
                <Sparkles count={25} />

                {/* Envelope / Invitation Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Envelope */}
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                        className="text-7xl mb-6"
                        style={{ filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.5))' }}
                    >
                        💌
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="gold-text-3d text-3xl md:text-4xl mb-3"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        You&#39;re Invited
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm tracking-[0.3em] mb-1 font-light"
                        style={{ color: 'rgba(212, 175, 55, 0.6)', fontFamily: "'Poppins', sans-serif" }}
                    >
                        Panwar &amp; Khandelwal
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs tracking-[0.4em] uppercase font-light"
                        style={{ color: 'rgba(212, 175, 55, 0.35)' }}
                    >
                        Family
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs tracking-wider uppercase"
                        style={{ color: 'rgba(212, 175, 55, 0.35)' }}
                    >
                        19 — 20 April 2026
                    </motion.p>
                </motion.div>

                {/* Tap instruction */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
                    className="absolute bottom-16 flex flex-col items-center gap-2"
                >
                    <span className="text-2xl">👆</span>
                    <span
                        className="text-xs tracking-[0.25em] uppercase font-medium"
                        style={{ color: 'rgba(212, 175, 55, 0.5)' }}
                    >
                        Tap to Open
                    </span>
                </motion.div>
            </main>
        );
    }

    // ╔══════════════════════════════════════════╗
    // ║  MAIN INVITATION                        ║
    // ╚══════════════════════════════════════════╝
    return (
        <main
            className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center"
            style={{ background: bgGradient, transition: 'background 1.5s ease-in-out' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Ambient Sparkles */}
            <Sparkles count={35} />

            {/* Marigold Rain (Steps 3+) */}
            {step >= 3 && <MarigoldRain />}


            {/* ════ MAIN CONTENT ════ */}
            <div className="relative z-10 w-full max-w-[400px] flex-1 flex flex-col items-center justify-center px-5">
                <AnimatePresence mode="wait">

                    {/* ╔══════════════════════════════════════╗
                       ║  STEP 1: THE DIVINE OPENING (0-4s)  ║
                       ╚══════════════════════════════════════╝ */}
                    {step === 1 && (
                        <motion.div
                            key="step-divine"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 6, filter: "blur(30px)" }}
                            transition={{ duration: 1.5, ease: easeOut }}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            {/* ॥ श्री गणेशाय नमः ॥ */}
                            <motion.h2
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="gold-text-3d text-xl md:text-2xl font-bold tracking-[0.25em] mb-10"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                            >
                                ॥ श्री गणेशाय नमः ॥
                            </motion.h2>

                            {/* Ganesha Icon with spinning mandala rings */}
                            <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
                                {/* Outer golden ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full glow-pulse"
                                    style={{
                                        border: '2px solid rgba(212, 175, 55, 0.5)',
                                        borderTopColor: '#D4AF37',
                                        borderRightColor: '#FF8C00',
                                    }}
                                />
                                {/* Inner counter-ring */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute rounded-full"
                                    style={{
                                        inset: 12,
                                        border: '1px solid rgba(255, 140, 0, 0.35)',
                                        borderTopColor: '#FF8C00',
                                        borderLeftColor: '#D4AF37',
                                    }}
                                />
                                {/* Ambient glow */}
                                <div className="absolute rounded-full" style={{
                                    inset: 20,
                                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
                                }} />
                                {/* Ganesha Image */}
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img
                                        src="/ganesha.png"
                                        alt="Lord Ganesha"
                                        width={130}
                                        height={130}
                                        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 140, 0, 0.4))' }}
                                    />
                                </motion.div>
                            </div>

                            {/* Continuously scrolling mantra */}
                            <div className="mt-10 w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)' }}>
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="mantra-scroll">
                                        <span className="mantra-text">
                                            ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                                        </span>
                                        <span className="mantra-text">
                                            ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* ╔══════════════════════════════════════╗
                       ║  STEP 2: THE INTRODUCTION (4-8s)    ║
                       ╚══════════════════════════════════════╝ */}
                    {step === 2 && (
                        <motion.div
                            key="step-intro"
                            initial={{ opacity: 0, filter: "blur(20px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -60, filter: "blur(15px)" }}
                            transition={{ duration: 1.2, ease: easeOut }}
                            className="flex flex-col items-center justify-center text-center w-full"
                        >
                            {/* Blessings */}
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs uppercase tracking-[0.35em] mb-2 font-light"
                                style={{ color: 'rgba(212, 175, 55, 0.55)' }}
                            >
                                With the blessings of our beloved
                            </motion.p>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xs uppercase tracking-[0.35em] mb-4 font-light"
                                style={{ color: 'rgba(212, 175, 55, 0.55)' }}
                            >
                                parents & elders
                            </motion.p>

                            {/* Shubh Vivah */}
                            <motion.h3
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                                className="text-2xl md:text-3xl font-bold mb-8 text-shadow-gold"
                                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: '#D4AF37' }}
                            >
                                शुभ विवाह निमंत्रण
                            </motion.h3>

                            {/* Decorative line top */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <GoldDivider width="160px" />
                            </motion.div>

                            {/* Names */}
                            <div className="my-4">
                                <motion.h1
                                    initial={{ x: -60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8, ease: easeOut }}
                                    className="gold-text-3d"
                                    style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3rem, 11vw, 5rem)', lineHeight: 1.2 }}
                                >
                                    Bharat
                                </motion.h1>

                                {/* SVG Heart */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                                    className="flex justify-center my-2"
                                >
                                    <GoldenHeart size={36} />
                                </motion.div>

                                <motion.h1
                                    initial={{ x: 60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8, ease: easeOut }}
                                    className="gold-text-3d"
                                    style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3rem, 11vw, 5rem)', lineHeight: 1.2 }}
                                >
                                    Parul
                                </motion.h1>
                            </div>

                            {/* Decorative line bottom */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <GoldDivider width="160px" />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ╔══════════════════════════════════════╗
                       ║  STEP 3: DAY 1 — HALDI & DJ (8-13s) ║
                       ╚══════════════════════════════════════╝ */}
                    {step === 3 && (
                        <motion.div
                            key="step-day1"
                            initial={{ opacity: 0, x: 80, filter: "blur(12px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -80, filter: "blur(12px)" }}
                            transition={{ duration: 0.8, ease: easeOut }}
                            className="w-full"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
                            >
                                <CornerOrnaments color="#B8860B" />

                                {/* Ambient glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-40 bg-amber-300 rounded-full blur-[80px] opacity-20 pointer-events-none" />

                                {/* Date Badge */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-6 text-center"
                                >
                                    <span
                                        className="inline-block px-7 py-2 rounded-full font-bold text-white text-base shadow-lg"
                                        style={{ background: 'linear-gradient(135deg, #FF8C00, #E67300, #FF6B00)' }}
                                    >
                                        🗓 19 April 2026
                                    </span>
                                </motion.div>

                                <div className="space-y-5 relative z-10">
                                    {/* Haldi */}
                                    <motion.div
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center relative py-4 rounded-2xl"
                                        style={{ background: 'rgba(255, 215, 0, 0.08)' }}
                                    >
                                        <h4
                                            className="text-2xl font-bold mb-1"
                                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: '#5D4037' }}
                                        >
                                            हल्दी समारोह 🌼
                                        </h4>
                                        <p className="font-semibold text-xs tracking-[0.2em]" style={{ color: '#8B6914' }}>
                                            MORNING • 10:00 AM
                                        </p>
                                    </motion.div>

                                    <GoldDivider width="60%" />

                                    {/* DJ Night */}
                                    <motion.div
                                        initial={{ x: 30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-center relative py-4 rounded-2xl"
                                        style={{ background: 'rgba(75, 0, 130, 0.04)' }}
                                    >
                                        <h4
                                            className="text-2xl font-bold mb-1"
                                            style={{
                                                fontFamily: "'Noto Sans Devanagari', sans-serif",
                                                color: '#5D4037',
                                                textShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
                                            }}
                                        >
                                            डीजे नाइट 🎵
                                        </h4>
                                        <p className="font-semibold text-xs tracking-[0.2em]" style={{ color: '#8B6914' }}>
                                            EVENING • 07:00 PM
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ╔══════════════════════════════════════════╗
                       ║  STEP 4: DAY 2 — PHERAS & RECEPTION     ║
                       ╚══════════════════════════════════════════╝ */}
                    {step === 4 && (
                        <motion.div
                            key="step-day2"
                            initial={{ opacity: 0, scale: 0.85, filter: "blur(15px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 60, filter: "blur(15px)" }}
                            transition={{ duration: 0.8, ease: easeOut }}
                            className="w-full"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                className="glass-card rounded-3xl p-6 relative overflow-hidden"
                                style={{ background: 'rgba(60, 0, 0, 0.75)', borderColor: 'rgba(212, 175, 55, 0.3)' }}
                            >
                                <CornerOrnaments color="#D4AF37" />

                                {/* Havan fire glow */}
                                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-600 rounded-full blur-[60px] opacity-25 animate-pulse pointer-events-none" />
                                {/* Chandelier glow */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-200 rounded-full blur-[60px] opacity-10 pointer-events-none" />

                                {/* Date */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-6 text-center"
                                >
                                    <h3
                                        className="text-lg font-bold tracking-[0.25em] pb-3"
                                        style={{ color: '#D4AF37', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}
                                    >
                                        🗓 20 April 2026
                                    </h3>
                                </motion.div>

                                <div className="space-y-6 relative z-10">
                                    {/* Pheras */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center relative py-4 rounded-2xl"
                                        style={{ background: 'rgba(255, 140, 0, 0.08)' }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500 rounded-full blur-[40px] opacity-30 animate-pulse -z-10 pointer-events-none" />
                                        <h4
                                            className="text-2xl md:text-3xl font-bold text-white text-shadow-white mb-1"
                                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                        >
                                            पाणिग्रहण संस्कार 🔥
                                        </h4>
                                        <p className="text-sm tracking-[0.15em] font-medium" style={{ color: '#D4AF37' }}>
                                            MORNING • 09:00 AM
                                        </p>
                                    </motion.div>

                                    <GoldDivider width="60%" />

                                    {/* Reception */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-center relative py-4 rounded-2xl"
                                        style={{ background: 'rgba(212, 175, 55, 0.05)' }}
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-14 bg-yellow-100 rounded-full blur-[40px] opacity-10 -z-10 pointer-events-none" />
                                        <h4
                                            className="text-2xl md:text-3xl font-bold text-white text-shadow-white mb-1"
                                            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                                        >
                                            प्रीतिभोज एवं स्वागत 🥂
                                        </h4>
                                        <p className="text-sm tracking-[0.15em] font-medium" style={{ color: '#D4AF37' }}>
                                            EVENING • 07:30 PM
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ╔══════════════════════════════════════╗
                       ║  STEP 5: VENUE & CLOSING (18s+)     ║
                       ╚══════════════════════════════════════╝ */}
                    {step === 5 && (
                        <motion.div
                            key="step-venue"
                            initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: easeOut }}
                            className="w-full"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="rounded-2xl p-6 relative overflow-hidden text-center"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(255, 248, 225, 0.93), rgba(255, 240, 200, 0.90))',
                                    backdropFilter: 'blur(24px)',
                                    border: '2px solid #D4AF37',
                                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.2), 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
                                }}
                            >
                                <CornerOrnaments color="#B8860B" />

                                {/* Inner decorative border */}
                                <div className="absolute inset-3 border border-amber-400/30 rounded-xl pointer-events-none" />

                                {/* Palace Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    className="text-5xl mb-3 relative z-10"
                                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
                                >
                                    🏰
                                </motion.div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-2xl font-bold mb-1 relative z-10"
                                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: '#5D4037' }}
                                >
                                    समारोह ग्रीन रिसॉर्ट
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-6 text-sm font-medium relative z-10 tracking-wide"
                                    style={{ color: '#8B6914' }}
                                >
                                    📍 डाली बाई सर्कल, जोधपुर
                                </motion.p>

                                {/* Directions Button */}
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open('https://maps.google.com/?q=Samaroh+Green+Resort,+Jodhpur', '_blank')}
                                    className="venue-btn px-8 py-3.5 rounded-full font-bold w-full mb-6 relative z-10 text-sm tracking-wider"
                                    style={{ color: '#3E2723' }}
                                >
                                    📍 Get Directions
                                </motion.button>

                                <GoldDivider width="50%" />

                                {/* Closing Message */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="gold-text-3d relative z-10 mt-5"
                                    style={{
                                        fontFamily: "'Great Vibes', cursive",
                                        fontSize: 'clamp(1.6rem, 7vw, 2.5rem)',
                                        lineHeight: 1.4,
                                    }}
                                >
                                    We look forward to<br />seeing you!
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* ════ BOTTOM BAR: Progress + Controls ════ */}
            <div className="relative z-50 w-full max-w-[400px] px-5 pb-5 flex items-center justify-between">
                {/* Progress Dots */}
                <ProgressDots current={step} total={TOTAL_STEPS} />

                {/* Controls */}
                <div className="flex gap-2">
                    {step === 5 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleReplay}
                            className="nav-btn"
                        >
                            ↻ Replay
                        </motion.button>
                    )}
                    {step < TOTAL_STEPS && (
                        <button
                            onClick={() => goToStep(step + 1)}
                            className="nav-btn"
                        >
                            Next →
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}