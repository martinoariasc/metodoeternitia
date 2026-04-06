import { useState, useMemo } from 'react';

const questions = [
  {
    id: 1, tag: 'stage',
    text: 'Para poder darte la información correcta, necesitamos saber: ¿En qué etapa te encontrás hoy con tus ventas?',
    options: [
      { label: 'Quiero empezar mi primer negocio para generar ingresos, pero no arranco.', value: 'novice', points: 1 },
      { label: 'Trabajo muchísimo todos los días, pero a fin de mes el dinero no refleja mi esfuerzo real.', value: 'stagnant', points: 1 },
      { label: 'Intento vender, pero siempre me piden rebajas o buscan lo más barato. Siento que mi producto no se valora.', value: 'cheap', points: 1 },
    ],
  },
  {
    id: 2, tag: 'goal',
    text: 'Hablemos de resultados financieros. Si pudieras aprender y dominar los principios que aplican las grandes corporaciones, ¿qué meta buscarías alcanzar primero?',
    options: [
      { label: 'Escalar mis ingresos rápidamente de manera constante, apoyándome en un sistema automático.', value: 'scale', points: 1 },
      { label: 'Generar el dinero suficiente para tener tranquilidad, sabiendo exactamente cómo atraer ventas sin sufrir.', value: 'peace', points: 1 },
      { label: 'Tener la certeza de cobrar lo que realmente vale mi tiempo, sin depender de rogarle a nadie.', value: 'worth', points: 1 },
    ],
  },
  {
    id: 3, tag: 'barrier',
    text: 'Sé sincero, ¿qué es lo que más te frustra hoy cuando intentas generar más ventas?',
    options: [
      { label: 'La tecnología. Siento confusión y me paralizo al intentar usar herramientas nuevas.', value: 'tech', points: 1 },
      { label: 'Sentir que molesto. Me bloquea la idea de parecer un vendedor pesado y desesperado.', value: 'annoy', points: 1 },
      { label: 'El agotamiento. Me la paso creando contenido y haciendo esfuerzo, pero nadie termina pagando.', value: 'exhaustion', points: 1 },
    ],
  },
  {
    id: 4, tag: 'talent',
    text: 'Al ver a otros generar muchísimo dinero de forma aparente, ¿alguna vez pensaste "yo no nací para vender"?',
    options: [
      { label: 'Sí, a veces siento que nacieron con un don y yo nunca igualaré sus resultados.', value: 'gift', points: 1 },
      { label: 'Me frustra ver a otros facturar de forma fácil mientras yo trabajo el doble y cobro poco.', value: 'unfair', points: 1 },
      { label: 'Sí, siento que me falta una habilidad natural y eso me genera mucha inseguridad frente a mis clientes.', value: 'insecure', points: 1 },
    ],
  },
  {
    id: 5, tag: 'revelation',
    text: 'Queremos ser directos: NADIE nace sabiendo vender. Las grandes corporaciones no ganan millones por "talento", lo hacen aplicando principios estructurados. ¿Cómo te hace sentir descubrir que tu problema nunca fue falta de talento, sino falta de esa información?',
    options: [
      { label: 'Me alivia, porque siempre creí que era mi culpa o que no servía para los negocios.', value: 'relief', points: 1 },
      { label: 'Me da esperanza saber que lograr resultados es una habilidad que puedo aprender si me enseñan.', value: 'hope', points: 1 },
      { label: 'Tiene mucho sentido. Siempre supe que me faltaba acceder a la información correcta.', value: 'makesense', points: 1 },
    ],
  },
  {
    id: 6, tag: 'ai',
    text: 'Entender realmente la mente del comprador toma años de estudios y fracasos. Si tuvieras en tus manos el método exacto y aprendieras a usar la Inteligencia Artificial como herramienta para aplicarlo rápido y ahorrarte esos años, ¿cómo cambiaría tu enfoque?',
    options: [
      { label: 'Aprovecharía la tecnología para no perder tiempo intentando adivinar qué es lo que realmente funciona.', value: 'time', points: 1 },
      { label: 'Comprendería la estrategia base y usaría la IA como asistente para armar toda mi estructura de ventas.', value: 'assistant', points: 1 },
      { label: 'Me apoyaría totalmente en las herramientas para ir directo al grano y ver resultados financieros mucho más pronto.', value: 'results', points: 1 },
    ],
  },
  {
    id: 7, tag: 'effort',
    text: 'No creemos en trucos mágicos. Aprender a aplicar los principios empresariales requiere disposición de tu parte para que funcionen. ¿Cómo te consideras frente a tener que aplicar este sistema?',
    options: [
      { label: 'Entiendo que todo gran cambio financiero exige trabajo. Estoy dispuesto a estudiar y hacer mi parte.', value: 'hardwork', points: 1 },
      { label: 'Odio el esfuerzo innecesario. Precisamente por eso prefiero invertir tiempo en aprender el método más eficiente.', value: 'smartwork', points: 1 },
      { label: 'Si me demuestran que la información funciona, yo asumo el compromiso. Pero no quiero seguir desperdiciando energía en cosas que no sirven.', value: 'skeptic', points: 1 },
    ],
  },
  {
    id: 8, tag: 'learning',
    text: 'Aprender a vender de verdad implica entender bases nuevas. Te entregaremos todo el método estructurado. ¿Qué tan preparado te sientes para soltar tus viejas creencias sobre "cómo vender"?',
    options: [
      { label: 'Arranco desde cero, no tengo viejos vicios y estoy listo para absorber el método puro.', value: 'zero', points: 1 },
      { label: 'Estoy harto de mis viejos métodos que no funcionaron. Listo para soltar y reaprender.', value: 'rewrite', points: 1 },
      { label: 'Mi mente está abierta. Solo quiero la información exacta que consigue resultados; si me dicen qué hacer, yo lo aplico.', value: 'open', points: 1 },
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
