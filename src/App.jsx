import { useState, useRef, useEffect } from 'react';
import Quiz from './components/Quiz';
import Report from './components/Report';
import LandingPage from './components/LandingPage';
import './App.css';

/* ═══════════════════════════════════════════
   CONSTELLATION PARTICLES — Canvas-based mesh
   Particles float + connect with teal lines
   when within proximity. GPU-accelerated.
═══════════════════════════════════════════ */
function ConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let animId;
    let particles = [];
    const PARTICLE_COUNT = 40;
    const CONNECTION_DIST = 140;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.2 + Math.random() * 1.2,
        alpha: 0.15 + Math.random() * 0.25,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 247, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 247, 255, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

function App() {
  const [step, setStep] = useState('hero');
  const [quizProfile, setQuizProfile] = useState(null);

  const handleQuizComplete = (profile) => {
    setQuizProfile(profile);
    setStep('analyzing');
    window.scrollTo(0, 0);
  };

  const handlePortalComplete = () => {
    setStep('landing');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* ═══ CONSTELLATION PARTICLES — Canvas mesh across ENTIRE site ═══ */}
      <ConstellationCanvas />

      {/* ═══ CONTENT ═══ */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {step === 'hero' && (
          <HeroSection onStart={() => { setStep('quiz'); window.scrollTo(0, 0); }} />
        )}
        {step === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}
        {step === 'analyzing' && (
          <AnalyzingScreen onComplete={() => { setStep('report'); window.scrollTo(0, 0); }} />
        )}
        {step === 'report' && (
          <Report
            profile={quizProfile}
            onProceedToSales={() => { setStep('portal'); window.scrollTo(0, 0); }}
          />
        )}
        {step === 'portal' && (
          <PortalTransition onComplete={handlePortalComplete} />
        )}
        {step === 'landing' && (
          <LandingPage onPurchase={() => { setStep('thanks'); window.scrollTo(0, 0); }} />
        )}
        {step === 'thanks' && <ThankYouPage />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ANALYZING SCREEN — Anticipation & Authority Builder
═══════════════════════════════════════════ */
function AnalyzingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const texts = [
    "Recopilando respuestas...",
    "Evaluando bloqueos de conversión...",
    "Identificando tu fuga de capital oculto...",
    "Generando diagnóstico personalizado..."
  ];

  useEffect(() => {
    const styleId = "analyzing-spin-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes spinPulse {
          0% { transform: rotate(0deg); filter: drop-shadow(0 0 5px rgba(0, 247, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 20px rgba(0, 247, 255, 0.6)); }
          100% { transform: rotate(360deg); filter: drop-shadow(0 0 5px rgba(0, 247, 255, 0.2)); }
        }
      `;
      document.head.appendChild(style);
    }

    const DURATION = 4500; // 4.5 seconds for dramatic authority effect
    const interval = 50; 
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += (interval / DURATION) * 100;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // 400ms pause at 100%
      } else {
        setProgress(Math.min(currentProgress, 100));
        setPhase(Math.floor(currentProgress / 25)); // 4 phases total
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      {/* Small top logo */}
      <img src="/landing/logos/logo-horizontal-web-eternitia.png" alt="Método EternitIA" className="fade-in-up" style={{ maxWidth: '140px', marginBottom: '4rem', opacity: 0.5 }} />
      
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '3rem' }}>
        {/* Outer subtle ring */}
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0, 247, 255, 0.1)', borderRadius: '50%' }} />
        
        {/* Animated glowing spinner */}
        <div style={{ 
          position: 'absolute', inset: -2, 
          border: '2px solid transparent', 
          borderTopColor: '#00F7FF',
          borderRightColor: '#00E499',
          borderRadius: '50%',
          animation: 'spinPulse 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
        }} />
        
        {/* Glow center orb */}
        <div style={{ position: 'absolute', inset: 20, background: 'radial-gradient(circle, rgba(0,247,255,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(5px)' }} />

        {/* Center percentage */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Dynamic text phase */}
      <div style={{ height: '60px' }}>
        <h2 className="fade-in-up" key={phase} style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 400, margin: 0 }}>
          {texts[Math.min(phase, texts.length - 1)]}
        </h2>
      </div>
      
      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', maxWidth: '300px', lineHeight: 1.6, marginTop: '1rem', opacity: 0.6 }}>
        Cruzando datos del perfil con arquitecturas validadas de alta conversión...
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PORTAL TRANSITION — CSS-only teal warp
   Replaces old door video with premium animation
═══════════════════════════════════════════ */
function PortalTransition({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  const triggerExit = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 1800);
  };

  useEffect(() => {
    const timer = setTimeout(triggerExit, 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`portal-overlay ${exiting ? 'portal-exit' : ''}`} onClick={triggerExit}>
      {/* Animated teal rings */}
      <div className="portal-ring portal-ring-1" />
      <div className="portal-ring portal-ring-2" />
      <div className="portal-ring portal-ring-3" />
      
      <div className="portal-text-overlay">
        <h2 className="portal-title">El umbral está abierto...</h2>
        <p className="portal-subtitle">Estás a un paso de descubrir el secreto mejor guardado de las corporaciones más grandes del mundo. Preparando la transferencia del conocimiento...</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO — Maximum curiosity, ZERO reveals
   Pure CSS animated background — no images
═══════════════════════════════════════════ */
function HeroSection({ onStart }) {
  return (
    <div className="hero-container">
      <div className="hero-bg-glow" />
      
      {/* Floating Particles System */}
      <div className="particles-container" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${(i * 5 + 2) % 100}%`,
              top: `${(i * 4.7 + 5) % 100}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 5) * 1.6}s`,
              opacity: 0.15 + (i % 4) * 0.07,
            }}
          />
        ))}
      </div>

      {/* Animated Teal Ring */}
      <div className="hero-ring" aria-hidden="true">
        <div className="hero-ring-inner" />
      </div>

      <div className="hero-content">
        <div className="fade-in-up">
          <img src="/landing/logos/logo-horizontal-web-eternitia.png" alt="Método EternitIA" className="fade-in-up" style={{ maxWidth: '180px', marginBottom: '2rem', opacity: 0.85 }} />
        </div>

        <h1 className="fade-in-up fade-in-up-delay-1 hero-title">
          Existe una habilidad que el <span style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1% de las personas</span> utiliza para dominar su mercado.
        </h1>

        <p className="fade-in-up fade-in-up-delay-2 hero-subtitle">
          Una ventaja tan profunda que las corporaciones más poderosas del mundo invierten millones en mantenerla oculta. Hoy, esa habilidad puede ser tuya.
        </p>

        <p className="fade-in-up fade-in-up-delay-2 hero-subtitle" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
          Completá este test rápido para descubrir qué Arquitectura de Ventas se adapta a tu situación actual.
        </p>

        <div className="fade-in-up fade-in-up-delay-3">
          <button onClick={onStart} className="btn btn-primary btn-large btn-shimmer">
            HACER MI TEST GRATIS
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="hero-trust-line">
            Gratuito · 2 minutos · Sin spam · Resultado personalizado
          </p>
        </div>

        <div className="fade-in-up fade-in-up-delay-4 hero-proof-row">
          {[
            { n: '2,847', t: 'personas ya lo hicieron' },
            { n: '4.9/5', t: 'satisfacción' },
            { n: '100%', t: 'gratuito' },
          ].map((item, i) => (
            <div key={i} className="hero-proof-item">
              <strong>{item.n}</strong>
              <span>{item.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   THANK YOU — Post-purchase
═══════════════════════════════════════════ */
function ThankYouPage() {
  return (
    <div className="thankyou-container">
      <div className="fade-in-up thankyou-content">
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '2rem', background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦</span>
        <h1 style={{ fontWeight: 400, marginBottom: '1.5rem' }}>
          ¡Tu acceso <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>está listo</em>!
        </h1>
        <p className="thankyou-text">
          Tomaste una decisión importante. Ahora viene la parte más emocionante: empezar a aplicar lo que vas a aprender. Estamos acá para acompañarte en cada paso.
        </p>
        <div className="thankyou-steps">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 400, marginBottom: '1rem' }}>
            Empezá por acá:
          </h3>
          {[
            'Revisá tu email (y la carpeta de spam). Tu acceso llega en minutos.',
            'Abrí el material y leé el Prólogo. Te va a dar mucha claridad.',
            'Hacé el primer ejercicio del Capítulo 1 hoy. Es simple y vas a ver resultados rápido.',
          ].map((s, i) => (
            <div key={i} className="thankyou-step">
              <span className="thankyou-step-num">{i + 1}.</span>
              {s}
            </div>
          ))}
        </div>
        <img src="/landing/logos/logo-horizontal-web-eternitia.png" alt="Método EternitIA" className="fade-in-up" style={{ maxWidth: '180px', marginBottom: '2rem', opacity: 0.85, marginTop: '3rem', display: 'block' }} />
      </div>
    </div>
  );
}

export default App;
