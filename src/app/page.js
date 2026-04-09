"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const EVENTS = [
  { title: "विनायक", date: "18 अप्रैल", time: "सुबह 7 बजे" },
  { title: "हल्दी एवं मेहंदी", date: "19 अप्रैल", time: "सुबह 12 बजे" },
  { title: "संगीत", date: "19 अप्रैल", time: "शाम 7 बजे" },
  { title: "फेरे", date: "20 अप्रैल", time: "सुबह 11 बजे" },
  { title: "प्रीतिभोज", date: "20 अप्रैल", time: "शाम 7 बजे" },
  { title: "विदाई", date: "21 अप्रैल", time: "सुबह 8 बजे" },
];

const WEDDING_DATE = new Date("2026-04-20T11:00:00+05:30");
const AUDIO_FILE = encodeURIComponent(
  "Vakratunda Mahakaya वकरतड महकय  Ganesh Mantra #god #bhakti.mp3"
);

function getTimeLeft(targetDate) {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00", finished: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    finished: false,
  };
}

function OrnamentalDivider() {
  return (
    <div className="ornamental-divider" aria-hidden="true">
      <span />
      <em>❦</em>
      <span />
    </div>
  );
}

function EventCard({ event, index }) {
  return (
    <article className="event-card reveal">
      <div className="event-card-number">0{index + 1}</div>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <span>{event.time}</span>
    </article>
  );
}

export default function WeddingInvitationPage() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(WEDDING_DATE));
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);

  const countdownUnits = useMemo(
    () => [
      { label: "दिन", value: timeLeft.days },
      { label: "घंटे", value: timeLeft.hours },
      { label: "मिनट", value: timeLeft.minutes },
      { label: "सेकंड", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(WEDDING_DATE));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio(`/audio/${AUDIO_FILE}`);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));

    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  async function toggleMusic() {
    if (!audioRef.current) {
      return;
    }

    if (musicEnabled) {
      audioRef.current.pause();
      setMusicEnabled(false);
      return;
    }

    try {
      await audioRef.current.play();
      setMusicEnabled(true);
    } catch {
      setMusicEnabled(false);
    }
  }

  return (
    <>
      <main className="invitation-page">
        <div className="floral-haze" aria-hidden="true" />
        <div className="floral-haze floral-haze-secondary" aria-hidden="true" />

        <button
          type="button"
          className="music-toggle"
          onClick={toggleMusic}
          aria-pressed={musicEnabled}
          aria-label={musicEnabled ? "पृष्ठभूमि संगीत बंद करें" : "पृष्ठभूमि संगीत शुरू करें"}
        >
          <span>{musicEnabled ? "संगीत बंद करें" : "संगीत शुरू करें"}</span>
          <strong>{musicEnabled ? "♪" : "♫"}</strong>
        </button>

        <section className="hero-section reveal reveal-visible">
          <div className="hero-shell">
            <p className="hero-mantra">|| श्री गणेशाय नमः ||</p>
            <h1 className="hero-title">शुभ विवाह</h1>
            <p className="hero-subtitle">स्वर्णिम शुभारंभ • राजसी स्नेह • पारिवारिक उत्सव</p>

            <OrnamentalDivider />

            <div className="couple-stack" aria-label="दूल्हा और दुल्हन के नाम">
              <span className="couple-role">वधू</span>
              <h2 className="name name-top">Parul</h2>
              <div className="weds-mark">
                <span />
                <p>weds</p>
                <span />
              </div>
              <span className="couple-role">वर</span>
              <h2 className="name name-bottom">Bharat</h2>
            </div>

            <p className="invitation-line">आपको सपरिवार सादर आमंत्रित किया जाता है</p>

            <div className="countdown-panel">
              <div className="countdown-copy">
                <p className="section-tag">मंगल मुहूर्त की ओर</p>
                <h3>विवाह उत्सव प्रारंभ होने में</h3>
              </div>

              <div className="countdown-grid" role="timer" aria-live="polite">
                {countdownUnits.map((item) => (
                  <div key={item.label} className="countdown-box">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {timeLeft.finished && (
                <p className="countdown-finished">मंगलमय विवाह उत्सव आरंभ हो चुका है।</p>
              )}
            </div>
          </div>
        </section>

        <section className="content-section reveal">
          <div className="section-heading">
            <p className="section-tag">अनुष्ठान</p>
            <h2>विवाह के पावन कार्यक्रम</h2>
            <p>हर रस्म को सुगंध, संगीत और अपनत्व के साथ संजोया गया है।</p>
          </div>

          <div className="events-grid">
            {EVENTS.map((event, index) => (
              <EventCard key={`${event.title}-${event.date}`} event={event} index={index} />
            ))}
          </div>
        </section>

        <section className="content-section venue-section reveal">
          <div className="section-heading">
            <p className="section-tag">स्थान</p>
            <h2>विवाह स्थल</h2>
          </div>

          <div className="venue-panel">
            <div>
              <p className="venue-name">Samaroh Green Resort</p>
              <p className="venue-address">Dali Bai Circle</p>
              <p className="venue-note">
                गुलाबी शाम, स्वर्णिम रोशनी और अपनेपन से भरा एक भव्य उत्सव स्थल।
              </p>
            </div>

            <a
              className="venue-link"
              href="https://maps.google.com/?q=Samaroh+Green+Resort,+Dali+Bai+Circle"
              target="_blank"
              rel="noreferrer"
            >
              स्थान देखें
            </a>
          </div>
        </section>

        <footer className="footer-section reveal">
          <OrnamentalDivider />
          <p>आपकी उपस्थिति हमारे लिए सौभाग्य होगी</p>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          --cream-050: #fffaf2;
          --cream-100: #f6ead8;
          --cream-200: #ebdcc5;
          --maroon-700: #6d1736;
          --maroon-800: #4e0d25;
          --gold-400: #d6a74e;
          --gold-500: #b98322;
          --gold-600: #8d5f13;
          --ink-700: #533a31;
          --shadow-soft: 0 24px 60px rgba(102, 36, 57, 0.12);
          --shadow-card: 0 18px 40px rgba(122, 62, 43, 0.13);
          --border-soft: rgba(150, 91, 47, 0.18);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(185, 131, 34, 0.14), transparent 24%),
            radial-gradient(circle at 80% 10%, rgba(109, 23, 54, 0.08), transparent 26%),
            linear-gradient(180deg, #fffdf8 0%, var(--cream-050) 36%, var(--cream-100) 100%);
          color: var(--ink-700);
        }

        .invitation-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          padding: 88px 20px 64px;
          isolation: isolate;
        }

        .invitation-page::before,
        .invitation-page::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -3;
        }

        .invitation-page::before {
          opacity: 0.48;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(138, 94, 36, 0.12) 1px, transparent 0),
            linear-gradient(135deg, rgba(109, 23, 54, 0.035) 25%, transparent 25%),
            linear-gradient(45deg, rgba(109, 23, 54, 0.03) 25%, transparent 25%);
          background-size: 22px 22px, 120px 120px, 120px 120px;
          background-position: 0 0, 0 0, 60px 60px;
        }

        .invitation-page::after {
          opacity: 0.22;
          background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.28), transparent 38%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.2), transparent 30%);
        }

        .floral-haze {
          position: absolute;
          width: 340px;
          height: 340px;
          top: -80px;
          left: -100px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 30%, rgba(214, 167, 78, 0.32), transparent 40%),
            radial-gradient(circle at 65% 60%, rgba(109, 23, 54, 0.13), transparent 46%);
          filter: blur(18px);
          opacity: 0.8;
          pointer-events: none;
          z-index: -1;
        }

        .floral-haze-secondary {
          top: auto;
          bottom: 8%;
          left: auto;
          right: -120px;
          width: 400px;
          height: 400px;
          opacity: 0.55;
        }

        .music-toggle {
          position: fixed;
          top: 20px;
          right: 18px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(185, 131, 34, 0.28);
          border-radius: 999px;
          padding: 12px 16px;
          background: rgba(255, 251, 243, 0.88);
          color: var(--maroon-800);
          box-shadow: 0 12px 30px rgba(88, 42, 32, 0.12);
          backdrop-filter: blur(18px);
          font: inherit;
          cursor: pointer;
          z-index: 20;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .music-toggle:hover,
        .music-toggle:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px rgba(88, 42, 32, 0.16);
          border-color: rgba(185, 131, 34, 0.52);
          outline: none;
        }

        .music-toggle span {
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 0.92rem;
        }

        .music-toggle strong {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8d183f, #c69239);
          color: #fff6e8;
          font-size: 0.95rem;
        }

        .hero-section,
        .content-section,
        .footer-section {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .hero-shell {
          position: relative;
          padding: clamp(36px, 7vw, 72px);
          border-radius: 36px;
          background:
            linear-gradient(150deg, rgba(255, 251, 244, 0.96), rgba(244, 232, 210, 0.9)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.08));
          box-shadow: var(--shadow-soft);
          border: 1px solid rgba(185, 131, 34, 0.18);
          overflow: hidden;
        }

        .hero-shell::before,
        .hero-shell::after {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 28px;
          pointer-events: none;
        }

        .hero-shell::before {
          border: 1px solid rgba(185, 131, 34, 0.26);
        }

        .hero-shell::after {
          inset: auto;
          width: 220px;
          height: 220px;
          right: -65px;
          bottom: -65px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109, 23, 54, 0.12), transparent 68%);
        }

        .hero-mantra,
        .section-tag,
        .invitation-line,
        .venue-note,
        .footer-section p,
        .section-heading p,
        .event-card p,
        .event-card span {
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .hero-mantra,
        .hero-title,
        .section-heading h2,
        .countdown-copy h3,
        .venue-name,
        .footer-section p {
          background: linear-gradient(135deg, #8d5f13 0%, #e4c067 24%, #7e4b08 48%, #efcf82 72%, #8a5911 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldFlow 8s ease-in-out infinite;
        }

        .hero-mantra {
          margin: 0;
          text-align: center;
          letter-spacing: 0.14em;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          text-transform: uppercase;
        }

        .hero-title {
          margin: 18px 0 10px;
          text-align: center;
          font-size: clamp(3rem, 10vw, 5.75rem);
          line-height: 0.94;
          font-weight: 700;
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .hero-subtitle {
          margin: 0;
          text-align: center;
          color: rgba(109, 23, 54, 0.7);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 0.82rem;
        }

        .ornamental-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 28px auto;
          width: min(300px, 100%);
        }

        .ornamental-divider span {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(185, 131, 34, 0.75), transparent);
        }

        .ornamental-divider em {
          font-style: normal;
          color: var(--maroon-700);
          font-size: 1.05rem;
        }

        .couple-stack {
          text-align: center;
          padding: 20px 0;
        }

        .couple-role {
          display: inline-block;
          margin-bottom: 8px;
          color: rgba(109, 23, 54, 0.62);
          font-size: 0.85rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .name {
          margin: 0;
          line-height: 0.9;
          font-weight: 400;
          color: var(--maroon-800);
          font-family: "Great Vibes", cursive;
          text-shadow: 0 12px 24px rgba(109, 23, 54, 0.08);
        }

        .name-top,
        .name-bottom {
          font-size: clamp(4rem, 10vw, 7rem);
        }

        .weds-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 18px 0;
        }

        .weds-mark span {
          width: min(96px, 18vw);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(109, 23, 54, 0.45), transparent);
        }

        .weds-mark p {
          margin: 0;
          font-size: 1.1rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(109, 23, 54, 0.65);
        }

        .invitation-line {
          margin: 12px auto 0;
          max-width: 720px;
          text-align: center;
          font-size: clamp(1.12rem, 2.2vw, 1.35rem);
          color: var(--maroon-700);
        }

        .countdown-panel {
          margin-top: 34px;
          padding: 24px;
          border-radius: 26px;
          background: rgba(255, 253, 248, 0.72);
          border: 1px solid rgba(185, 131, 34, 0.15);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .countdown-copy {
          text-align: center;
          margin-bottom: 20px;
        }

        .countdown-copy .section-tag {
          margin-bottom: 8px;
        }

        .countdown-copy h3 {
          margin: 0;
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .countdown-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .countdown-box {
          padding: 18px 14px;
          border-radius: 22px;
          text-align: center;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(245, 232, 211, 0.82));
          border: 1px solid rgba(185, 131, 34, 0.14);
        }

        .countdown-box strong {
          display: block;
          margin-bottom: 6px;
          font-size: clamp(1.65rem, 4vw, 2.6rem);
          color: var(--maroon-800);
          font-family: "Times New Roman", serif;
          font-weight: 700;
        }

        .countdown-box span {
          display: block;
          color: rgba(83, 58, 49, 0.78);
          font-size: 0.92rem;
        }

        .countdown-finished {
          margin: 18px 0 0;
          text-align: center;
          color: var(--maroon-700);
          font-size: 1rem;
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .content-section {
          margin-top: 52px;
          padding: 0 4px;
        }

        .section-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 26px;
        }

        .section-tag {
          margin: 0 0 8px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          font-size: 0.78rem;
          color: rgba(109, 23, 54, 0.7);
        }

        .section-heading h2 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.05;
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .section-heading p {
          margin: 12px auto 0;
          color: rgba(83, 58, 49, 0.8);
          font-size: 1.02rem;
          max-width: 620px;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .event-card {
          position: relative;
          padding: 26px 22px;
          border-radius: 28px;
          background: linear-gradient(160deg, rgba(255, 253, 248, 0.92), rgba(244, 232, 211, 0.86));
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .event-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top right, rgba(109, 23, 54, 0.12), transparent 28%),
            linear-gradient(135deg, rgba(214, 167, 78, 0.14), transparent 36%);
          opacity: 0.8;
          pointer-events: none;
        }

        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 26px 46px rgba(109, 23, 54, 0.16);
          border-color: rgba(185, 131, 34, 0.32);
        }

        .event-card-number {
          position: absolute;
          top: 18px;
          right: 18px;
          font-size: 0.78rem;
          color: rgba(109, 23, 54, 0.42);
          letter-spacing: 0.16em;
        }

        .event-card h3,
        .venue-name {
          margin: 0 0 10px;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 1.4rem;
          color: var(--maroon-800);
        }

        .event-card p {
          margin: 0 0 6px;
          color: rgba(83, 58, 49, 0.82);
          font-size: 1rem;
        }

        .event-card span {
          color: var(--gold-600);
          font-size: 0.98rem;
          letter-spacing: 0.08em;
        }

        .venue-panel {
          display: grid;
          grid-template-columns: 1.25fr auto;
          gap: 24px;
          align-items: center;
          padding: clamp(26px, 4vw, 38px);
          border-radius: 34px;
          background:
            linear-gradient(140deg, rgba(89, 18, 42, 0.96), rgba(130, 34, 61, 0.92)),
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent);
          box-shadow: 0 24px 56px rgba(77, 20, 37, 0.22);
          position: relative;
          overflow: hidden;
        }

        .venue-panel::before {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(228, 192, 103, 0.24);
          border-radius: 24px;
          pointer-events: none;
        }

        .venue-panel * {
          position: relative;
          z-index: 1;
        }

        .venue-name {
          font-size: clamp(2rem, 4.2vw, 3rem);
        }

        .venue-address {
          margin: 0 0 10px;
          color: rgba(255, 242, 220, 0.92);
          font-size: 1.12rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .venue-note {
          margin: 0;
          max-width: 520px;
          color: rgba(255, 239, 218, 0.78);
          font-size: 1rem;
        }

        .venue-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          padding: 15px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #f8e8c2, #d6a74e);
          color: #521128;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 14px 28px rgba(20, 12, 7, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .venue-link:hover,
        .venue-link:focus-visible {
          transform: translateY(-3px);
          box-shadow: 0 20px 34px rgba(20, 12, 7, 0.28);
          outline: none;
        }

        .footer-section {
          padding: 40px 0 18px;
          text-align: center;
        }

        .footer-section p {
          margin: 0;
          font-size: clamp(1.45rem, 3vw, 2.4rem);
          font-family: "Noto Sans Devanagari", sans-serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes goldFlow {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        @media (max-width: 980px) {
          .events-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .venue-panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .invitation-page {
            padding: 84px 14px 42px;
          }

          .music-toggle {
            top: 14px;
            right: 14px;
            padding: 10px 14px;
            gap: 10px;
          }

          .music-toggle span {
            font-size: 0.82rem;
          }

          .hero-shell {
            border-radius: 28px;
            padding: 30px 22px;
          }

          .countdown-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .events-grid {
            grid-template-columns: 1fr;
          }

          .event-card {
            padding: 24px 18px;
          }

          .venue-link {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
