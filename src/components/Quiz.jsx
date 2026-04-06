import { useState, useMemo } from 'react';

const questions = [
  {
    id: 1, tag: 'stage',
    text: '¿Dónde estás hoy con tus ventas?',
    options: [
      { label: 'Quiero arrancar pero no sé por dónde empezar.', value: 'novice', points: 1 },
      { label: 'Trabajo mucho pero la plata no refleja mi esfuerzo.', value: 'stagnant', points: 1 },
      { label: 'Vendo, pero siempre me piden rebajas o eligen al más barato.', value: 'cheap', points: 1 },
    ],
  },
  {
    id: 2, tag: 'goal',
    text: 'Si hoy pudieras cambiar una sola cosa de tu vida financiera, ¿cuál sería?',
    options: [
      { label: 'Tener un sistema que me genere ingresos sin estar encima todo el día.', value: 'scale', points: 1 },
      { label: 'Saber exactamente cómo atraer clientes sin sufrir cada mes.', value: 'peace', points: 1 },
      { label: 'Cobrar lo que realmente vale mi trabajo, sin negociar a la baja.', value: 'worth', points: 1 },
    ],
  },
  {
    id: 3, tag: 'barrier',
    text: '¿Qué es lo que más te frena hoy para vender más?',
    options: [
      { label: 'La tecnología me confunde. No sé usar herramientas nuevas.', value: 'tech', points: 1 },
      { label: 'Me da cosa ofrecer. Siento que molesto o parezco desesperado.', value: 'annoy', points: 1 },
      { label: 'Hago esfuerzo, creo contenido, pero nadie termina pagando.', value: 'exhaustion', points: 1 },
    ],
  },
  {
    id: 4, tag: 'talent',
    text: '¿Alguna vez pensaste "yo no nací para vender"?',
    options: [
      { label: 'Sí. Siento que otros nacieron con un don que yo no tengo.', value: 'gift', points: 1 },
      { label: 'Me frustra ver a otros ganar fácil mientras yo lucho por poco.', value: 'unfair', points: 1 },
      { label: 'Sí. Esa inseguridad me frena cada vez que tengo que ofrecer algo.', value: 'insecure', points: 1 },
    ],
  },
  {
    id: 5, tag: 'revelation',
    text: 'Dato real: NADIE nace sabiendo vender. Las corporaciones millonarias no ganan por talento; aplican principios estructurados. ¿Cómo te hace sentir saber que tu problema no es falta de talento?',
    options: [
      { label: 'Me alivia. Siempre creí que era mi culpa.', value: 'relief', points: 1 },
      { label: 'Me da esperanza. Si es algo que se aprende, yo puedo lograrlo.', value: 'hope', points: 1 },
      { label: 'Tiene sentido. Siempre supe que me faltaba la información correcta.', value: 'makesense', points: 1 },
    ],
  },
  {
    id: 6, tag: 'ai',
    text: 'Si tuvieras un método probado + Inteligencia Artificial para aplicarlo rápido, ¿cómo lo usarías?',
    options: [
      { label: 'Para dejar de adivinar y saber qué funciona de verdad.', value: 'time', points: 1 },
      { label: 'Para aprender la base y que la IA me ayude a armar todo.', value: 'assistant', points: 1 },
      { label: 'Para ir directo al grano y ver resultados lo antes posible.', value: 'results', points: 1 },
    ],
  },
  {
    id: 7, tag: 'effort',
    text: 'No existen atajos mágicos. Aplicar esto requiere tu parte. ¿Cómo te ves?',
    options: [
      { label: 'Si me muestran el camino, yo pongo el esfuerzo. Sin problema.', value: 'hardwork', points: 1 },
      { label: 'Odio perder tiempo. Por eso prefiero el camino más inteligente.', value: 'smartwork', points: 1 },
      { label: 'Si me demuestran que funciona, me comprometo. Pero no quiero perder más energía en cosas que no sirven.', value: 'skeptic', points: 1 },
    ],
  },
  {
    id: 8, tag: 'learning',
    text: '¿Estás listo para soltar lo que creías saber sobre "vender" y aprender cómo funciona de verdad?',
    options: [
      { label: 'Empiezo de cero. No tengo vicios, estoy listo para absorber todo.', value: 'zero', points: 1 },
      { label: 'Harto de lo que no funcionó. Listo para reaprender.', value: 'rewrite', points: 1 },
      { label: 'Mente abierta. Díganme qué hacer y yo lo aplico.', value: 'open', points: 1 },
    ],
  },
];

export default function Quiz({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const progress = ((current) / questions.length) * 100;
  const q = questions[current];

  const handleSelect = (option) => {
    if (animating) return;
    setSelected(option);
    setAnimating(true);

    setTimeout(() => {
      const answerWithTag = { ...option, questionTag: q.tag };
      const newAnswers = [...answers.slice(0, current), answerWithTag];
      setAnswers(newAnswers);

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        const answerMap = {};
        newAnswers.forEach(a => { answerMap[a.questionTag] = a.value; });

        let level, title, description;
        
        // Diagnóstico altamente dinámico basado en las respuestas específicas del usuario
        if (answerMap.stage === 'novice') {
          level = 'Tu Perfil: El Iniciador Intacto';
          title = 'Tu mayor ventaja es que no tenés vicios que desaprender.';
          description = 'Notamos tus ganas de empezar. Lo que te enseñaron tradicionalmente sobre vender no aplica a ti porque empezás en blanco. Has evitado cometer los errores críticos, y hoy evaluamos tu perfil para darte los principios exactos por donde empezar.';
        } else if (answerMap.stage === 'stagnant') {
          level = 'Tu Perfil: El Esforzado sin Sistema';
          title = 'No te falta trabajo, te falta la palanca de un ecosistema estructurado.';
          description = 'Notamos tu enorme esfuerzo reciente. Lo que te enseñaron tradicionalmente sobre "perseguir clientes" es exactamente lo que está frenando tus ingresos. Has estado compitiendo sin tener las herramientas tácticas. Hoy eso cambia.';
        } else if (answerMap.stage === 'cheap') {
          level = 'Tu Perfil: El Valor Oculto';
          title = 'El problema no es tu precio, es la percepción de autoridad.';
          description = 'Entendemos tu frustración. Cuando el cliente pide rebajas, es porque no ve el valor, y eso es una falla de estructura persuasiva. Las corporaciones no bajan el precio, elevan la percepción. Evaluamos tu perfil y sabemos exactamente cómo darle un giro a esto.';
        } else {
          level = 'Tu Perfil: Acelerador Nato';
          title = 'Estás en el punto de ignición exacto para escalar tus ingresos.';
          description = 'Sabemos identificar a quienes tienen la mentalidad. Y hemos empaquetado los principios que mueven fortunas para que construyas tu propio sistema.';
        }

        // Personalized insights
        const insights = [];

        if (answerMap.barrier === 'tech') {
          insights.push({ icon: '🤖', title: 'La tecnología como asistente, no como barrera', text: 'Usaremos la IA para simplificarte cosas que antes tomaban meses. Si sabés apretar botones, vas a dominarla.' });
        } else if (answerMap.barrier === 'annoy') {
          insights.push({ icon: '🧠', title: 'Vender enseñando, nunca molestando', text: 'El método se basa en principios psicológicos. El cliente viene a vos, no al revés. Se terminaron los mensajes en frío.' });
        } else {
          insights.push({ icon: '⚡', title: 'Esfuerzo inteligente vs esfuerzo bruto', text: 'Dejarás de gastar energía en crear contenido a ciegas para empezar a usar sistemas probados que traen clientes enfocados.' });
        }

        if (answerMap.talent === 'gift' || answerMap.talent === 'insecure') {
           insights.push({ icon: '🎯', title: 'El talento es un mito. La estructura es real.', text: 'No naciste sin un don, naciste sin la información de las corporaciones. Hoy te entregaremos esa información de forma estructurada.' });
        } else {
           insights.push({ icon: '💎', title: 'Sentido de iniquidad justificado', text: 'Tenés razón: es injusto ver a otros facturar si no sabés lo que ellos saben (los principios ocultos). La cancha está a punto de nivelarse.' });
        }

        if (answerMap.effort === 'smartwork') {
           insights.push({ icon: '♟️', title: 'Inteligencia sobre Fuerza', text: 'Si odiás el trabajo innecesario, amarás implementar algoritmos de IA que sistematicen tus conversiones.' });
        } else {
           insights.push({ icon: '🧱', title: 'El esfuerzo bien canalizado', text: 'Sabemos que sos disciplinado. Lo único que faltaba era un mapa exacto para no pisar en falso.' });
        }

        const closingLine = 'Hemos empaquetado los principios que mueven fortunas. Te enseñaremos cómo usar toda la potencia de la Inteligencia Artificial para que construyas tu sistema de ventas y aprendas, por fin, a vender de verdad.';

        onComplete({ score: 100, level, title, description, insights, closingLine, answerMap, answers: newAnswers });
      }
    }, 600);
  };

  const handleBack = () => {
    if (current === 0 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(current - 1);
      setSelected(answers[current - 1] || null);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="quiz-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles */}
      <div className="particles-container" aria-hidden="true">
        {useMemo(() => Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" style={{ left: `${(i * 8.3) % 100}%`, top: `${(i * 7.7 + 15) % 100}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, animationDelay: `${i * 0.7}s`, animationDuration: `${6 + (i % 5) * 1.6}s`, opacity: 0.1 + (i % 4) * 0.06 }} />
        )), [])}
      </div>

      {/* Subtle background orb */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,247,255,0.04) 0%, transparent 70%)', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', filter: 'blur(80px)' }} />

      {/* Progress Bar */}
      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="quiz-header">
          {current > 0 && (
            <button onClick={handleBack} className="quiz-back-btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              ATRÁS
            </button>
          )}
          <span className="quiz-counter">
            PREGUNTA {current + 1} DE {questions.length}
          </span>
        </div>

        {/* Decorative ring behind question */}
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', border: '1px solid rgba(0,247,255,0.06)', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ringPulse 6s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />

        {/* Question */}
        <h2 key={q.id} className="fade-in-up quiz-question" style={{ position: 'relative', zIndex: 1 }}>{q.text}</h2>

        {/* Options */}
        <div className="quiz-options" style={{ position: 'relative', zIndex: 1 }}>
          {q.options.map((option, i) => {
            const prev = answers[current];
            const isPrev = prev && prev.value === option.value;
            const isActive = selected === option || isPrev;

            return (
              <button key={`${q.id}-${i}`} onClick={() => handleSelect(option)}
                className={`fade-in-up quiz-option ${isActive ? 'quiz-option-active' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p className="quiz-trust">🔒 100% confidencial · Sin spam · Resultado instantáneo</p>
      </div>
    </div>
  );
}
