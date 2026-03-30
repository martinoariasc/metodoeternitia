import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver-based
   Staggered fade-up reveal on viewport entry
   Per taste-skill §4: No scroll listeners
═══════════════════════════════════════════ */
function useScrollReveal() {
  const containerRef = useRef(null);
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    // Target all sections within the landing page container
    const targets = root.querySelectorAll('section, .reveal-on-scroll');
    if (!targets.length) return;

    // Mark all targets for CSS transition
    targets.forEach((el, i) => {
      if (!el.classList.contains('landing-hero-section')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((el) => {
      if (!el.classList.contains('landing-hero-section')) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return containerRef;
}


/* ═══════════════════════════════════════════════════════
   LANDING PAGE — MÉTODO ETERNITIA
   
   RULES:
   ❌ NEVER mention Carnegie, Cialdini, psychology by name
   ❌ NEVER explain what methods are inside
   ❌ NEVER satisfy curiosity — only AMPLIFY it
   ✅ Only show RESULTS and TRANSFORMATIONS
   ✅ Speak about THEM, never about us
   ✅ Create mystery around what's inside
═══════════════════════════════════════════════════════ */

function CountdownTimer() {
  const [time, setTime] = useState({ minutes: 14, seconds: 59 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 14;
          seconds = 59;
        }
        return { minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className="countdown">
      {[{ v: time.minutes, l: 'MIN' }, { v: time.seconds, l: 'SEG' }].map((u, i) => (
        <div key={i} className="countdown-unit">
          <span className="countdown-number">{pad(u.v)}</span>
          <span className="countdown-label">{u.l}</span>
        </div>
      ))}
    </div>
  );
}

function UrgencyDateTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 59, seconds: 59 });
  
  useEffect(() => {
    const deadlineKey = 'eternitia_price_deadline';
    let deadlinePosix = localStorage.getItem(deadlineKey);
    if (!deadlinePosix) {
      deadlinePosix = Date.now() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (59 * 60 * 1000);
      localStorage.setItem(deadlineKey, deadlinePosix);
    }
    
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, deadlinePosix - now);
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const pad = (n) => String(n).padStart(2, '0');
  
  return (
    <div className="countdown" style={{ margin: '1rem auto' }}>
      {[{ v: timeLeft.days, l: 'DÍAS' }, { v: timeLeft.hours, l: 'HRS' }, { v: timeLeft.minutes, l: 'MIN' }, { v: timeLeft.seconds, l: 'SEG' }].map((u, i) => (
        <div key={i} className="countdown-unit" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <span className="countdown-number" style={{ color: '#EF4444' }}>{pad(u.v)}</span>
          <span className="countdown-label" style={{ color: '#FCA5A5' }}>{u.l}</span>
        </div>
      ))}
    </div>
  );
}

function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);
  const msgs = [
    { name: 'Matías R.', flag: '🇦🇷', text: 'acaba de acceder al sistema completo' },
    { name: 'Camila V.', flag: '🇵🇾', text: 'descargó todo hace 3 min' },
    { name: 'Andrés L.', flag: '🇨🇴', text: 'completó su acceso' },
    { name: 'Sofía M.', flag: '🇲🇽', text: 'accedió al paquete completo hace 8 min' },
    { name: 'Lucas T.', flag: '🇨🇱', text: 'acaba de empezar el sistema' },
  ];
  useEffect(() => {
    const showPopup = () => {
      setShow(true);
      setTimeout(() => { setShow(false); setIdx(p => (p + 1) % msgs.length); }, 4500);
    };
    const t1 = setTimeout(showPopup, 6000);
    const iv = setInterval(showPopup, 22000);
    return () => { clearTimeout(t1); clearInterval(iv); };
  }, []);
  if (!show) return null;
  const m = msgs[idx];
  return (
    <div className="social-popup">
      <span style={{ fontSize: '1.5rem' }}>{m.flag}</span>
      <div>
        <strong style={{ fontWeight: 500 }}>{m.name}</strong><br />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{m.text}</span>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   FAQ ACCORDION — Objection handlers
   Glassmorphism cards with smooth expand
═══════════════════════════════════════════ */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    {
      q: 'No sé nada de Inteligencia Artificial',
      a: 'El sistema está diseñado para principiantes absolutos. Todo está explicado paso a paso, con instrucciones simples que podés seguir desde el celular. Si sabés usar WhatsApp, podés usar las herramientas de IA que incluye el método.'
    },
    {
      q: '¿Y si creo algo y nadie lo compra?',
      a: 'El sistema no te enseña a crear un producto al azar. Primero entendés por qué la gente compra — y después armás algo que el mercado ya quiere. Así eliminás el riesgo de crear algo que nadie necesita.'
    },
    {
      q: 'No tengo tiempo para otro curso más',
      a: 'Esto no es un curso de 80 horas con videos interminables. Es un sistema de lectura estratégica que podés leer a tu ritmo, en el celular o la computadora. Cada capítulo tiene ejercicios prácticos que podés aplicar en el momento.'
    },
    {
      q: '¿Funciona si no tengo experiencia vendiendo?',
      a: 'Especialmente para vos. La mayoría de personas que usan el sistema nunca habían vendido nada antes. Los principios que vas a aprender funcionan porque están basados en cómo piensa la gente, no en "trucos de marketing".'
    },
    {
      q: '¿No será demasiado básico por el precio?',
      a: 'Es mi mejor contenido. 15 técnicas probadas con resultados reales y herramientas de IA listas para usar. El precio es accesible a propósito — quiero que la mayor cantidad de personas puedan acceder y transformar cómo venden.'
    },
    {
      q: '¿Necesito invertir en herramientas caras?',
      a: 'No. Todas las herramientas de IA que usamos tienen versiones gratuitas. Tu inversión total además del sistema no supera los $20 al mes — y muchas son 100% gratis.'
    },
    {
      q: '¿Y si no logro aplicar lo que enseñás?',
      a: 'Tenés 7 días de garantía. Si leés el material, hacés los ejercicios y sentís que no te ayudó, te devolvemos tu dinero. Solo pedimos que lo intentes de verdad.'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {faqs.map((faq, i) => (
        <div 
          key={i}
          style={{
            background: openIdx === i ? 'rgba(12,15,27,0.7)' : 'rgba(12,15,27,0.45)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${openIdx === i ? 'rgba(0, 247, 255,0.12)' : 'rgba(255,255,255,0.05)'}`,
            borderRadius: '14px',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
        >
          <div style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            padding: '1.1rem 1.4rem', gap: '1rem'
          }}>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 450 }}>{faq.q}</span>
            <span style={{ 
              color: 'var(--accent)', fontSize: '1.2rem', flexShrink: 0, 
              transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>+</span>
          </div>
          <div style={{
            maxHeight: openIdx === i ? '200px' : '0',
            opacity: openIdx === i ? 1 : 0,
            padding: openIdx === i ? '0 1.4rem 1.2rem' : '0 1.4rem',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.65 }}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


export default function LandingPage({ onPurchase }) {
  const [showVipModal, setShowVipModal] = useState(false);
  const [vipActivated, setVipActivated] = useState(false);
  const [modalTriggered, setModalTriggered] = useState(false);

  const scrollToPricing = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Show VIP modal early on entry to present the $27 offer immediately
    const timer = setTimeout(() => {
      if (!vipActivated && !showVipModal && !modalTriggered) {
        setModalTriggered(true);
        setShowVipModal(true);
      }
    }, 1500); // Trigger 1.5 seconds after page load

    return () => clearTimeout(timer);
  }, [vipActivated, showVipModal, modalTriggered]);

  const totalValue = 298;
  const inflatedPrice = 97;
  const vipPrice = 27;
  const finalPrice = 9.99;

  const [finalOfferActive, setFinalOfferActive] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [finalModalTriggered, setFinalModalTriggered] = useState(false);

  const currentPrice = finalOfferActive ? finalPrice : (vipActivated ? vipPrice : inflatedPrice);

  // Trigger final offer 50s after VIP activation
  useEffect(() => {
    if (!vipActivated || finalModalTriggered) return;
    const timer = setTimeout(() => {
      setFinalModalTriggered(true);
      setShowFinalModal(true);
    }, 50000);
    return () => clearTimeout(timer);
  }, [vipActivated, finalModalTriggered]);

  const handleActivateVip = () => {
    setShowVipModal(false);
    setTimeout(() => {
      setVipActivated(true);
    }, 400);
  };

  const handleActivateFinalOffer = () => {
    setShowFinalModal(false);
    setTimeout(() => {
      setFinalOfferActive(true);
    }, 400);
  };
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef}>
      <SocialProofPopup />

      {/* ═══ VIP URGENCY BANNER (Hidden until VIP activated) ═══ */}
      {finalOfferActive && (
        <div className="eternitia-top-bar bar-active">
          <div className="bar-content">
            <span style={{color: '#0C0F1B', fontWeight: 600}}>✓ Has desbloqueado el Pase de Acceso Total Confidencial</span>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg-color)' }}>

        {/* ═══ HERO — Clean Gradient Mesh + Floating Particles ═══ */}
        <section className="landing-section landing-hero-section">
          {/* Animated Mesh Orbs — Global across section */}
          <div className="hero-mesh-bg">
            <div className="hero-mesh-orb hero-mesh-orb-1" />
            <div className="hero-mesh-orb hero-mesh-orb-2" />
            <div className="hero-mesh-orb hero-mesh-orb-3" />
          </div>

          <div className="landing-narrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Brand mark — centered */}
            <img src="/landing/logos/logo-horizontal-web-eternitia.png" alt="Método EternitIA" className="fade-in-up" style={{ maxWidth: '180px', marginBottom: '2rem', opacity: 0.85 }} />

            <h1 className="fade-in-up fade-in-up-delay-1 landing-headline">
              Aprende a vender<br />
              <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TODO LO QUE TE IMAGINES</em><br />
              con Inteligencia Artificial
            </h1>

            <p className="fade-in-up fade-in-up-delay-2 landing-subheadline">
              Un sistema paso a paso que te enseña <strong>por qué la gente compra</strong> y 
              cómo usar <strong>Inteligencia Artificial</strong> para que tu producto se venda{' '}
              <strong>sin que vos tengas que estar encima todo el día.</strong>
            </p>

            {/* Hero mockup preview */}
            <div className="fade-in-up fade-in-up-delay-2" style={{ margin: '2rem auto', display: 'flex', justifyContent: 'center' }}>
              <img src="/landing/mockup-ebooks.png" alt="Método EternitIA" style={{ maxWidth: '320px', width: '80%', borderRadius: '16px', animation: 'levitate 6s ease-in-out infinite', filter: 'drop-shadow(0 30px 80px rgba(0, 247, 255, 0.15))' }} />
            </div>

            <span className="badge fade-in-up fade-in-up-delay-2" style={{ marginBottom: '1.5rem' }}>SISTEMA PASO A PASO · 100% EN ESPAÑOL</span>

            <div className="fade-in-up fade-in-up-delay-3">
              <button onClick={scrollToPricing} className="btn btn-cta btn-large btn-shimmer">
                QUIERO ACCEDER — ${currentPrice}
              </button>
              <p className="trust-micro">Acceso inmediato · Garantía de 7 días · Pago seguro</p>
            </div>
          </div>
        </section>


        {/* ═══ EBOOK SHOWCASE — Visual with Gradient Orb ═══ */}
        <section className="ebook-showcase" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Animated Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.6 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '3s' }} />
          </div>
          <div className="ebook-showcase-inner">
            <span className="badge">EL SISTEMA</span>
            <h2 className="landing-h2" style={{ textAlign: 'center' }}>
              Todo lo que necesitás{' '}
              <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>en un solo lugar.</em>
            </h2>

            {/* Product Mockup — Large */}
            <div style={{ margin: '2rem auto', display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', border: '1px solid rgba(0, 247, 255,0.06)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ringPulse 4s ease-in-out infinite', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(0, 247, 255,0.04)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ringPulse 4s ease-in-out infinite 1.5s', pointerEvents: 'none' }} />
              <img
                src="/landing/grafico-metodo.png"
                alt="Gráfico Sistema EternitIA"
                style={{ maxWidth: '420px', width: '95%', animation: 'levitate 6s ease-in-out infinite', filter: 'drop-shadow(0 30px 60px rgba(0, 247, 255, 0.2))', position: 'relative', zIndex: 1 }}
              />
            </div>

            <p className="landing-body" style={{ textAlign: 'center', margin: '0 auto' }}>
              15 técnicas probadas para vender + herramientas de Inteligencia Artificial listas para usar.
              Explicado paso a paso para que puedas aplicarlo desde el primer día, sin experiencia previa.
            </p>


          </div>
        </section>


        {/* ═══ PAIN — Empathy (speaks about THEM) ═══ */}
        <section className="landing-section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.5 }}>
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '2s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '5s' }} />
          </div>
          <div className="landing-narrow">
            <span className="badge">¿TE SUENA FAMILIAR?</span>
            <h2 className="landing-h2">Si alguna de estas frases te describe,<br />este sistema fue creado para vos.</h2>

            <div className="pain-list">
              {[
                '"Veo a todos ganando plata y yo no sé ni por dónde empezar"',
                '"Ya compré cursos y no sirvieron — estoy harto de promesas vacías"',
                '"Quiero vender pero me da miedo parecer un vendedor molesto"',
                '"No tengo plata para invertir en agencias ni herramientas caras"',
                '"La IA me intimida, siento que se necesita ser programador"',
                '"Tengo un producto pero no sé cómo hacer que la gente lo compre"',
              ].map((pain, i) => (
                <div key={i} className="pain-card">{pain}</div>
              ))}
            </div>

            <p className="landing-bridge">
              Si te identificaste con al menos una...{' '}
              <strong>
                tranquilo, no sos el único.
              </strong>{' '}
              Este sistema fue creado justamente para <strong>ayudarte a salir de ahí, paso a paso.</strong>
            </p>
          </div>
        </section>


        {/* ═══ STORY BRIDGE — Institutional Authority ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.55 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" style={{ animationDelay: '4s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" />
          </div>
          {/* CSS geometric accent lines */}
          <div style={{ position: 'absolute', top: '15%', right: '5%', width: '200px', height: '200px', border: '1px solid rgba(0, 247, 255,0.04)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: '120px', height: '120px', border: '1px solid rgba(0, 247, 255,0.03)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 10s ease-in-out infinite 3s' }} />
          <div className="landing-narrow">
            <div className="gradient-divider" style={{ marginBottom: '3rem' }} />
            <div className="pull-quote">
              "La diferencia entre alguien que vende y alguien que no,
              no es talento. Es tener el método correcto."
            </div>

            <p className="landing-body">
              Las marcas más exitosas del mundo no venden porque son las mejores —{' '}
              venden porque <strong>entienden cómo piensa la gente.</strong>{' '}
              Son técnicas simples que llevan décadas funcionando.
            </p>

            <p className="landing-body">
              El problema es que nadie te las enseña de forma práctica y accesible.{' '}
              <strong>Hasta hoy.</strong>
            </p>

            <p className="landing-impact">
              Tomamos esas técnicas probadas y las combinamos con Inteligencia Artificial para que cualquier persona pueda usarlas.
            </p>

            <p className="landing-body">
              No es teoría. Es un sistema listo para usar.{' '}
              <strong>Paso a paso</strong>, sin experiencia previa,{' '}
              empezás a aplicarlo <strong>desde el primer día</strong>.
            </p>
          </div>
        </section>

        {/* ═══ DATA LEAK / CASE STUDY ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.5 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" style={{ animationDelay: '1s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '6s' }} />
          </div>
          <div className="landing-narrow" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="badge" style={{ color: '#F1F5F9', borderColor: 'rgba(0, 247, 255, 0.3)' }}>
                RESULTADOS REALES — MENOS DE 30 DÍAS
              </span>
            </div>
            
            <h2 className="landing-h2" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Mirá lo que logramos en <em style={{ color: 'var(--accent)' }}>menos de un mes</em> con este método.
            </h2>
            
            <p className="landing-body" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Sin editar, sin filtros. Estas son <strong>capturas reales directas del celular</strong>, logradas aplicando el Método EternitIA en un mercado latino.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem' }}>
              <div className="proof-image-wrapper">
                <img className="proof-image" src="/landing/proof/pruebametrica2.jpg" alt="Captura de conversiones en Meta Ads Manager" />
              </div>
              <div className="proof-image-wrapper">
                <img className="proof-image" src="/landing/proof/meta-roas.jpg" alt="Captura de ROAS en Meta Ads Manager" />
              </div>
              <div className="proof-image-wrapper">
                <img className="proof-image" src="/landing/proof/pruebametrica3.jpg" alt="Metricas reales de ventas adicionales" />
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <p className="metric-label">Facturación Mensual</p>
                <h3 className="metric-value" style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$16,000 USD</h3>
                <p className="metric-sub">Más de 116 millones de Guaraníes generados con este sistema.</p>
              </div>
              <div className="metric-card">
                <p className="metric-label">Retorno Inversión (ROAS)</p>
                <h3 className="metric-value">28.2x</h3>
                <p className="metric-sub">Picos de hasta 32.4x. Por cada $1 que inviertes, recibes ~$28 de vuelta.</p>
              </div>
              <div className="metric-card">
                <p className="metric-label">Costo por Cliente Nuevo</p>
                <h3 className="metric-value">$1.05 USD</h3>
                <p className="metric-sub">Adquirir un comprador a ₲ 7,692. Cuesta menos que un café de máquina.</p>
              </div>
            </div>
            
            <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', textAlign: 'center', fontStyle: 'italic', maxWidth: '580px', margin: '3rem auto 0 auto', lineHeight: '1.5' }}>
              * Los montos en pantalla están en Guaraníes (₲), la moneda de Paraguay (1 USD ≈ ₲7,000). Estos resultados son reales pero no garantizan que todos obtengan lo mismo. Cada caso depende del esfuerzo y la aplicación.
            </p>
          </div>
        </section>


        {/* ═══ WHAT IT DOES FOR YOU (results only, no methods) ═══ */}
        <section className="landing-section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.55 }}>
            <div className="hero-mesh-orb hero-mesh-orb-2" />
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '3s' }} />
          </div>
          {/* CSS geometric accent */}
          <div style={{ position: 'absolute', top: '30%', left: '3%', width: '150px', height: '150px', border: '1px solid rgba(0, 247, 255,0.03)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 12s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '6%', width: '80px', height: '80px', border: '1px solid rgba(0, 247, 255,0.03)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 9s ease-in-out infinite 2s' }} />
          <div className="landing-narrow">
            <span className="badge">LO QUE VA A PASAR CUANDO ACCEDAS</span>
            <h2 className="landing-h2">Esto es lo que cambia en tu vida.<br /><em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cuando tenés las herramientas correctas.</em></h2>

            <div className="result-list">
              {[
                { before: 'No sabés qué vender ni por dónde empezar', after: 'Sabés exactamente qué vender y tenés el plan paso a paso' },
                { before: 'Publicás cosas y nadie las compra', after: 'Entendés por qué la gente dice "sí" — y lo aplicás a cualquier cosa' },
                { before: 'La IA te parece complicada y lejana', after: 'Tenés herramientas de IA trabajando como tu equipo de marketing gratuito' },
                { before: 'Ves a otros ganar y sentís que es inalcanzable', after: 'Tenés tu propio sistema generando tu primera venta real' },
                { before: 'No sabés cómo mostrar lo que vendés al mundo', after: 'Tu producto está en internet vendiendo 24/7 sin que estés presente' },
                { before: 'Dependés de un sueldo que no te alcanza', after: 'Tenés una habilidad que funciona para siempre y nadie te puede quitar' },
              ].map((r, i) => (
                <div key={i} className="result-row">
                  <div className="result-col result-col-before">
                    <span className="result-label">✕</span>
                    <span>{r.before}</span>
                  </div>
                  <span className="result-arrow-icon">→</span>
                  <div className="result-col result-col-after">
                    <span className="result-label result-label-after">✦</span>
                    <span>{r.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ UNIVERSAL MESSAGE ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.5 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" style={{ animationDelay: '2s' }} />
          </div>
          <div className="landing-narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 className="landing-h2">
              Esto no es un curso de "marketing digital".<br />
              Esto es la habilidad de <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>vender lo que te imagines.</em>
            </h2>
            <p className="landing-body" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 2rem' }}>
              Los principios que vas a dominar funcionan para productos digitales, productos físicos, servicios, bienes raíces,
              comida, ropa, tecnología, consultoría, arte... lo que quieras. Porque están basados en cómo funciona la mente humana.
              Y la mente humana es la misma en todos lados.
            </p>
            <div className="universal-grid">
              {['Productos digitales', 'Productos físicos', 'Bienes raíces', 'Gastronomía', 'Servicios creativos', 'Consultoría', 'Moda y ropa', 'Lo que te imagines'].map((item, i) => (
                <span key={i} className="universal-tag" style={{ background: 'rgba(12,15,27,0.6)', border: '1px solid rgba(0, 247, 255,0.08)', borderRadius: '100px', padding: '0.6rem 1.4rem', fontSize: '0.78rem', fontWeight: 400, letterSpacing: '0.02em', color: 'var(--text-secondary)', backdropFilter: 'blur(8px)', transition: 'border-color 0.4s, color 0.4s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0, 247, 255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 247, 255,0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >{item}</span>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ 4 PILLARS SECTION ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.55 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '4s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '7s' }} />
          </div>
          <div className="landing-narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <span className="badge">EL ECOSISTEMA</span>
            <h2 className="landing-h2">
              4 pilares que trabajan <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>como un sistema.</em>
            </h2>
            <p className="landing-body" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3rem' }}>
              No es teoría que leés y te olvidás. Es un sistema de 4 capas diseñado para transformar cómo vendés para siempre.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {[
                { num: '01', title: 'La Mente', sub: 'Entendé por qué la gente compra. Psicología de persuasión que funciona en cualquier nicho.' },
                { num: '02', title: 'El Vehículo', sub: 'Tu producto o servicio listo para venderse. Sin importar si es físico, digital o freelance.' },
                { num: '03', title: 'La Máquina', sub: 'Herramientas de IA que trabajan como tu equipo de marketing 24/7. Gratis.' },
                { num: '04', title: 'El Motor', sub: 'Estrategias de tráfico y conversión para que tu sistema funcione en automático.' },
              ].map((p, i) => (
                <div key={i} className="pillar-card" style={{ background: 'rgba(12,15,27,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'left', transition: 'border-color 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)', position: 'relative', overflow: 'hidden', cursor: 'default', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,12,20,0.4)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0, 247, 255,0.15)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0, 247, 255,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,12,20,0.4)'; }}
                >
                  {/* Top gradient line */}
                  <div style={{ position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0, 247, 255,0.15), transparent)' }} />
                  {/* Number index */}
                  <span style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.04em', display: 'block', marginBottom: '1rem', background: 'linear-gradient(135deg, rgba(0, 247, 255,0.25), rgba(0, 228, 153, 0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{p.num}</span>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.82rem', lineHeight: 1.65 }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ACREDITACIÓN OFICIAL ═══ */}
        <section className="landing-section" style={{ borderTop: '1px solid rgba(0, 247, 255, 0.05)', position: 'relative', overflow: 'hidden' }}>
          <div className="hero-mesh-bg" style={{ opacity: 0.35 }}>
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '0s', background: 'radial-gradient(circle, rgba(0,247,255,0.4) 0%, transparent 70%)' }} />
          </div>
          <div className="landing-narrow" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <span className="badge">EL RETO FINAL</span>
                <h2 className="landing-h2" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>
                  Gánate el Estatus de Especialista Eternit<span className="gradient-text">IA</span>
                </h2>
                <p className="landing-lead" style={{ marginBottom: '2.5rem' }}>
                  No compres un eBook para dejarlo juntando polvo. Esto es un sistema de ejecución. Al completar las guías, tendrás el reto de construir tu propio embudo de ventas para obtener tu certificación oficial y posicionarte en el Top 1% de tu mercado.
                </p>
              </div>

              <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ position: 'absolute', inset: -30, background: 'radial-gradient(circle, rgba(0,247,255,0.15) 0%, transparent 70%)', zIndex: 0, filter: 'blur(30px)' }} />
                <img 
                  src="/landing/Certificado.svg" 
                  alt="Certificado Oficial"
                  style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '1rem', width: '100%' }}>
                <div style={{ flex: '1 1 250px', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--accent-start, #00F7FF)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>1</div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Ejecución de Arquitectura</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Aplica el Método completo de forma autodidacta construyendo tu propio embudo de alta conversión y una identidad visual de nivel élite.</span>
                </div>
                <div style={{ flex: '1 1 250px', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--accent-start, #00F7FF)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>2</div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Validación de Resultados</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Envíanos el link de tu sistema armado. Buscamos alumnos que obtengan conversiones reales aplicando las bases de EternitIA.</span>
                </div>
                <div style={{ flex: '1 1 250px', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--accent-start, #00F7FF)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>3</div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Autoridad Absoluta</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, display: 'block' }}>Al superar el reto, recibirás tu diploma de alta resolución encriptado, elevando tu estatus y posicionamiento en el mercado.</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'center', width: '100%' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  * Dentro del material recibirás el documento "Reglamento de Certificación" con los pasos exactos para enviar tu embudo a evaluación.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ═══ VALUE STACK ═══ */}
        <section id="pricing-section" className="landing-section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.55 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" style={{ animationDelay: '1s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '5s' }} />
          </div>
          <div className="landing-narrow">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="badge">TU ACCESO COMPLETO</span>
              <h2 className="landing-h2">Todo lo que recibís hoy</h2>
            </div>

            <div className="value-stack">
              {[
                { name: 'El Sistema Completo "Véndelo Todo"', sub: '4 guías estratégicas · De cero a tu primera venta', val: '$97', img: '/landing/mockup-ebooks.png' },
                { name: 'BONUS: Pack AbundancIA', sub: '50+ fórmulas listas para copiar, pegar y vender', val: '$37' },
                { name: 'BONUS: La Bóveda IA', sub: 'El arsenal completo de herramientas para reemplazar una agencia', val: '$67' },
                { name: 'BONUS: Arquitectura Web con IA', sub: 'Creá tu propia web profesional sin saber programar', val: '$97' },
              ].map((item, i) => (
                <div key={i} className="value-item" style={{ alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {item.img ? (
                      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '4px' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.2rem' }}>✦</div>
                    )}
                    <div>
                      <div className="value-item-name">
                        <strong>{item.name}</strong>
                      </div>
                      <p className="value-item-sub">{item.sub}</p>
                    </div>
                  </div>
                  <span className="price-original">{item.val}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card */}
            <div className="pricing-card-wrapper">
              <div className="savings-badge">
                AHORRÁS ${totalValue - currentPrice} USD
              </div>
              <div className="pricing-card">
                <p className="pricing-label">VALOR DE TODO POR SEPARADO</p>
                <span className="price-original" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', display: 'block', margin: '0.5rem 0' }}>
                  ${totalValue} USD
                </span>

                {/* ═══ MOCKUP IN CHECKOUT ═══ */}
                <div style={{ margin: '1.5rem auto', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src="/landing/mockup-ebooks.png"
                    alt="Método EternitIA"
                    style={{ maxWidth: '320px', width: '80%', borderRadius: '16px', animation: 'levitate 6s ease-in-out infinite', filter: 'drop-shadow(0 30px 80px rgba(0, 247, 255, 0.15))' }}
                  />
                </div>

                <p className="pricing-label" style={{ marginTop: '1.5rem' }}>HOY ACCEDÉS POR</p>
                
                {!vipActivated ? (
                  <span className="price-current" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', display: 'block', lineHeight: 1 }}>
                    ${inflatedPrice}
                  </span>
                ) : !finalOfferActive ? (
                  <>
                    <span className="price-slashed" style={{ fontSize: '2rem', textDecoration: 'line-through', color: 'var(--text-tertiary)', marginBottom: '0.5rem', display: 'block' }}>
                      ${inflatedPrice}
                    </span>
                    <span className="price-current price-new" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', display: 'block', lineHeight: 1, color: 'var(--accent)', animation: 'popIn 0.5s var(--ease-out)' }}>
                      ${vipPrice}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="price-slashed" style={{ fontSize: '1.4rem', textDecoration: 'line-through', color: 'var(--text-tertiary)', marginBottom: '0.25rem', display: 'block' }}>
                      ${inflatedPrice}
                    </span>
                    <span className="price-slashed" style={{ fontSize: '1.8rem', textDecoration: 'line-through', color: 'var(--text-tertiary)', marginBottom: '0.5rem', display: 'block' }}>
                      ${vipPrice}
                    </span>
                    <span className="price-current price-new" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', display: 'block', lineHeight: 1, color: 'var(--accent)', animation: 'popIn 0.5s var(--ease-out)' }}>
                      ${finalPrice}
                    </span>
                  </>
                )}

                <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid rgba(0, 247, 255, 0.2)', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <strong style={{ color: 'var(--accent)', fontSize: '0.95rem', letterSpacing: '0.05em' }}>EL EMPUJÓN QUE NECESITÁS</strong>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Sé lo que pasa. Si dejás esto para mañana, se convierte en nunca. Por eso asumo el riesgo yo y te pongo un límite. <strong>Este acceso casi regalado dura exactamente 15 minutos.</strong> Es mi empujón silencioso para obligarte, con empatía, a que hoy des el paso por tu propio bien.
                  </p>
                  <CountdownTimer />
                </div>
                {finalOfferActive && (
                  <div style={{ margin: '1.5rem 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: '#EF4444', marginBottom: '0.5rem', fontWeight: 600 }}>OFERTA VIP APLICADA EN EL BOTÓN</p>
                  </div>
                )}
                <button onClick={onPurchase} className="btn btn-cta btn-large btn-shimmer" style={{ margin: (vipActivated ? '0 auto' : '1.5rem auto 0'), display: 'flex' }}>
                  SÍ, QUIERO ACCEDER AHORA
                </button>

                {/* Trust Icons — SVG */}
                <div className="trust-icons-row">
                  <div className="trust-icon-item">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                    <span className="trust-icon-label">Pago seguro</span>
                  </div>
                  <div className="trust-icon-item">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    <span className="trust-icon-label">Acceso inmediato</span>
                  </div>
                  <div className="trust-icon-item">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span className="trust-icon-label">Garantía 7 días</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ═══ GUARANTEE ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.5 }}>
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '2s' }} />
          </div>
          <div className="landing-narrow" style={{ position: 'relative', zIndex: 1 }}>
            <div className="guarantee-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
                  Tu tranquilidad es lo primero
                </h3>
                <p className="guarantee-text">
                  Si en 7 días leés el material, hacés los ejercicios y sentís que no te ayudó —
                  te devolvemos tu dinero. Solo mandanos un mensaje mostrando que lo intentaste.
                  Queremos que te vaya bien de verdad, no que pagues por algo que no te sirve.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ═══ FAQ — Reduce friction ═══ */}
        <section className="landing-section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="hero-mesh-bg" style={{ opacity: 0.5 }}>
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '1s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '4s' }} />
          </div>
          <div className="landing-narrow" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge">DUDAS FRECUENTES</span>
              <h2 className="landing-h2">Antes de decidir, leé esto</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>


        {/* ═══ TESTIMONIALS — 4 layers of proof ═══ */}
        <section className="landing-section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs */}
          <div className="hero-mesh-bg" style={{ opacity: 0.25 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" style={{ animationDelay: '3s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '6s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" />
          </div>
          {/* CSS geometric accent */}
          <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', border: '1px solid rgba(0, 247, 255,0.03)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 10s ease-in-out infinite' }} />
          <div className="landing-wide" style={{ position: 'relative', zIndex: 1 }}>
            {/* Layer 1: Big number */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="badge">¿POR QUÉ CONFIAR EN ESTE SISTEMA?</span>
              <h2 className="landing-h2" style={{ marginBottom: '1.5rem' }}>3 años de prueba y error<br /><em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>resumidos para vos.</em></h2>
              <p className="landing-body" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>Este sistema no nació en un fin de semana. Es el resultado de 3 años de investigación, miles de dólares invertidos en herramientas y anuncios, y cientos de errores reales. Todo lo que funcionó quedó adentro. Todo lo que no, fue eliminado para que vos no pierdas el tiempo ni la plata que yo perdí.</p>
            </div>

            {/* Layer 2: Trust points */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { icon: '📖', title: '+300 páginas', sub: 'de estrategia pura curada y organizada' },
                { icon: '🧠', title: '15 técnicas probadas', sub: 'basadas en psicología real del consumidor' },
                { icon: '🤖', title: 'Herramientas de IA', sub: 'listas para copiar, pegar y usar en cualquier nicho' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(12,15,27,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.75rem' }}>{item.icon}</span>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>{item.title}</strong>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══ FINAL CTA — Emotional close ═══ */}
        <section className="landing-section" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Mesh Orbs — Full glow for dramatic finish */}
          <div className="hero-mesh-bg" style={{ opacity: 0.6 }}>
            <div className="hero-mesh-orb hero-mesh-orb-1" />
            <div className="hero-mesh-orb hero-mesh-orb-2" style={{ animationDelay: '2s' }} />
            <div className="hero-mesh-orb hero-mesh-orb-3" style={{ animationDelay: '5s' }} />
          </div>
          {/* CSS geometric accent */}
          <div style={{ position: 'absolute', top: '20%', right: '5%', width: '180px', height: '180px', border: '1px solid rgba(0, 247, 255,0.03)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringPulse 11s ease-in-out infinite 1s' }} />
          <div className="landing-narrow" style={{ position: 'relative', zIndex: 1 }}>
            <div className="gradient-divider" style={{ marginBottom: '3rem' }} />
            <h2 className="landing-h2" style={{ marginBottom: '1.5rem' }}>
              Las personas que cambiaron su vida<br />
              no eran las más inteligentes.<br />
              <em style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Eran las que decidieron dejar de esperar.</em>
            </h2>

            <p className="landing-body" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
              A la mayoría de emprendedores les toma años de errores y miles de dólares perdidos descifrar esto. 
              Con el Sistema EternitIA de tu lado, vos podés acortar ese camino a un par de semanas.
              La única pregunta es: ¿seguís esperando, o empezás ahora?
            </p>

            <button onClick={onPurchase} className="btn btn-cta btn-large btn-shimmer">
              ACCEDER AL SISTEMA — ${currentPrice}
            </button>

            {/* Trust Icons — SVG */}
            <div className="trust-icons-row">
              <div className="trust-icon-item">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                <span className="trust-icon-label">Pago seguro SSL</span>
              </div>
              <div className="trust-icon-item">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                <span className="trust-icon-label">Descarga inmediata</span>
              </div>
              <div className="trust-icon-item">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="trust-icon-label">Garantía 7 días</span>
              </div>
            </div>

            {/* Footer */}
            <div className="landing-footer">
              <img src="/landing/logos/logo-horizontal-web-eternitia.png" alt="Método EternitIA" style={{ maxWidth: '140px', marginBottom: '1rem', opacity: 0.5 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-tertiary)', display: 'block' }}>axiom.</span>
              <p className="footer-legal">© 2026 axiom. · Método Eternit<span style={{ color: 'var(--accent)' }}>IA</span>. Todos los derechos reservados.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ STICKY CTA (Mobile) ═══ */}
      <div className="sticky-cta">
        <div style={{ flex: 1 }}>
          <span className="price-original" style={{ fontSize: '0.8rem' }}>${totalValue}</span>
          <span className="price-current" style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>${currentPrice}</span>
        </div>
        <button onClick={onPurchase} className="btn btn-cta btn-shimmer" style={{ padding: '0.75rem 1.5rem', fontSize: '0.7rem' }}>
          ACCEDER AHORA
        </button>
      </div>

      {/* ═══ VIP MODAL ═══ */}
      <div className={`vip-modal-overlay ${showVipModal ? 'modal-show' : ''}`}>
        <div className="vip-modal-content" style={{ position: 'relative' }}>
          <button 
            onClick={handleActivateVip} 
            style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer', padding: '5px' }}
            aria-label="Cerrar"
          >
            ✕
          </button>
          
          <span className="vip-badge">Solo por hoy</span>
          <h2 className="vip-title" style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tengo un regalo para ti</h2>
          <p className="vip-text">Entiendo que es una decisión importante. Por eso activé un <strong>acceso especial</strong> para que puedas empezar con la menor barrera posible. Es mi forma de darte el empujón que a mí me hubiera gustado tener cuando empecé.</p>
          
          <div className="vip-reward-wrap">
            <p className="vip-discount-value">-${inflatedPrice - vipPrice} OFF</p>
            <p className="vip-discount-sub">Descuento aplicado automáticamente</p>
          </div>
          
          <button className="vip-btn" onClick={handleActivateVip}>Quiero aprovechar este descuento →</button>
        </div>
      </div>

      {/* ═══ FINAL OFFER MODAL ($27 → $9.99) ═══ */}
      <div className={`vip-modal-overlay ${showFinalModal ? 'modal-show' : ''}`}>
        <div className="vip-modal-content" style={{ position: 'relative' }}>
          <button 
            onClick={handleActivateFinalOffer} 
            style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer', padding: '5px' }}
            aria-label="Cerrar"
          >
            ✕
          </button>
          
          <span className="vip-badge" style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}>Última oportunidad</span>
          <h2 className="vip-title" style={{ background: 'linear-gradient(135deg, #00F7FF, #00E499)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Esperá, no te vayas todavía</h2>
          <p className="vip-text">Sé que a veces cuesta dar el primer paso. Por eso quiero hacértelo aún más fácil. <strong>Accedé al sistema completo por menos de lo que cuesta un café con medialunas.</strong></p>
          
          <div className="vip-reward-wrap">
            <p style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>${vipPrice}</p>
            <p className="vip-discount-value" style={{ fontSize: '4rem' }}>${finalPrice}</p>
            <p className="vip-discount-sub">Acceso completo · Para siempre</p>
          </div>
          
          <div style={{ margin: '1.5rem 0' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>ESTE ENLACE CONFIDENCIAL ESTÁ PROTEGIDO</p>
          </div>
          
          <button className="vip-btn" onClick={handleActivateFinalOffer}>SÍ, QUIERO ACCEDER POR ${finalPrice} →</button>
        </div>
      </div>
    </div>
  );
}


