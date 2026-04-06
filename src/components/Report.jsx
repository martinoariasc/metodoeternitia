export default function Report({ profile, onProceedToSales }) {
  if (!profile) return null;
  const { score, level, title, description, insights, closingLine } = profile;

  return (
    <div className="report-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles */}
      <div className="particles-container" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="particle" style={{ left: `${(i * 6.7 + 5) % 100}%`, top: `${(i * 8.3 + 10) % 100}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, animationDelay: `${i * 0.5}s`, animationDuration: `${6 + (i % 5) * 1.6}s`, opacity: 0.1 + (i % 4) * 0.06 }} />
        ))}
      </div>

      {/* Top gradient orb */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,247,255,0.04) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', filter: 'blur(80px)' }} />

      {/* Bottom gradient orb */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,228,153,0.03) 0%, transparent 70%)', bottom: '5%', right: '-10%', pointerEvents: 'none', filter: 'blur(60px)' }} />

      <div className="report-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Overview */}
        <div className="fade-in-up report-score-section">
          <span className="report-label">TU DIAGNÓSTICO PERSONAL</span>
          <div style={{ height: '2rem' }} />
          <div className="report-level-badge">{level}</div>
        </div>

        {/* Main */}
        <div className="fade-in-up fade-in-up-delay-1">
          <h2 className="report-title">{title}</h2>
          <p className="report-desc">{description}</p>
        </div>

        <div className="gradient-divider" />

        {/* Personalized Insights */}
        <div className="fade-in-up fade-in-up-delay-2">
          <span className="report-insights-label">BASADO EN TUS RESPUESTAS</span>
          <div className="report-insights">
            {insights && insights.map((ins, i) => (
              <div key={i} className="report-insight-card" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Subtle top gradient */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,247,255,0.12), transparent)' }} />
                <span className="report-insight-icon">{ins.icon}</span>
                <div>
                  <h4 className="report-insight-title">{ins.title}</h4>
                  <p className="report-insight-text">{ins.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="pull-quote fade-in-up fade-in-up-delay-3" style={{ margin: '3rem 0' }}>
          {closingLine}
        </div>

        {/* What you need — NEVER reveals methods */}
        <div className="fade-in-up fade-in-up-delay-3 report-need-box">
          <h3 style={{ fontSize: '1.3rem', fontWeight: 400, marginBottom: '1rem' }}>
            No estás solo. El 99% lucha con esto.
          </h3>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--text-tertiary)' }}>
            La buena noticia es que existe una habilidad que solo el 1% domina. No son trucos de redes sociales, sino los mismos secretos de venta que usan las grandes marcas, ahora disponibles para cualquier persona gracias a la Inteligencia Artificial.
          </p>
          <div className="report-need-list">
            {[
              'Un ecosistema paso a paso que funciona sin importar qué vendas',
              'Inteligencia Artificial que trabaja por vos las 24 horas',
              'Arquitectura de ofertas imposibles de ignorar',
              'El arte de conversar y cerrar clientes sin objeciones',
            ].map((item, i) => (
              <div key={i} className="report-need-item">
                <span className="accent-diamond">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fade-in-up fade-in-up-delay-4" style={{ textAlign: 'center' }}>
          <p className="report-quote-cta">
            "La diferencia entre los que logran lo que quieren<br />
            y los que solo lo sueñan, es una sola decisión."
          </p>
          <button onClick={onProceedToSales} className="btn btn-cta btn-large btn-shimmer">
            QUIERO VER EL SISTEMA
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="trust-micro">Sin compromiso · Sin riesgo · Acceso inmediato</p>
        </div>
      </div>
    </div>
  );
}
