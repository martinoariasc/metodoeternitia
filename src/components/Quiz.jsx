import { useState, useMemo } from 'react';

const questions = [
  {
    id: 1, tag: 'fear',
    text: '¿Sentís que la IA va a dejarte atrás... pero no sabés cómo usarla a tu favor?',
    options: [
      { label: 'Sí, me preocupa mucho', value: 'high', points: 3 },
      { label: 'Un poco, pero no sé por dónde empezar', value: 'mid', points: 2 },
      { label: 'No, ya la estoy usando', value: 'low', points: 1 },
    ],
  },
  {
    id: 2, tag: 'hours',
    text: '¿Cuántas horas al día dedicás a generar ingresos por tu cuenta?',
    options: [
      { label: 'Cero. Todavía no empecé', value: 'zero', points: 3 },
      { label: '1-3 horas, pero sin resultados claros', value: 'some', points: 2 },
      { label: 'Más de 3 horas y ya genero algo', value: 'active', points: 1 },
    ],
  },
  {
    id: 3, tag: 'situation',
    text: '¿Cuál de estas frases te describe mejor?',
    options: [
      { label: 'Quiero independencia financiera pero no sé cómo lograrla', value: 'desire', points: 3 },
      { label: 'Ya intenté vender algo online y no funcionó', value: 'failed', points: 2 },
      { label: 'Tengo un negocio pero quiero crecer con IA', value: 'scaling', points: 1 },
    ],
  },
  {
    id: 4, tag: 'whatToSell',
    text: 'Si pudieras vender algo mañana, ¿qué sería?',
    options: [
      { label: 'No tengo idea qué podría vender', value: 'nothing', points: 3 },
      { label: 'Un producto digital (curso, ebook, guía)', value: 'digital', points: 2 },
      { label: 'Un producto físico o servicio que ya tengo', value: 'physical', points: 1 },
    ],
  },
  {
    id: 5, tag: 'obstacle',
    text: '¿Cuál es tu mayor obstáculo HOY para generar dinero?',
    options: [
      { label: 'No sé qué vender ni cómo empezar', value: 'lost', points: 3 },
      { label: 'No tengo dinero para invertir', value: 'budget', points: 2 },
      { label: 'No sé cómo atraer clientes', value: 'traffic', points: 1 },
    ],
  },
  {
    id: 6, tag: 'belief',
    text: 'Cuando ves a alguien que gana bien vendiendo online, ¿qué pensás?',
    options: [
      { label: 'Seguro es una estafa o tiene algún truco', value: 'skeptic', points: 3 },
      { label: 'Me gustaría pero siento que no es para mí', value: 'insecure', points: 2 },
      { label: 'Sé que es posible, yo quiero lo mismo', value: 'believer', points: 1 },
    ],
  },
  {
    id: 7, tag: 'investment',
    text: '¿Cuánto invertiste hasta hoy en cursos o herramientas de marketing?',
    options: [
      { label: '$0 — nunca gasté nada', value: 'nothing', points: 3 },
      { label: 'Menos de $100 pero sin resultados', value: 'little', points: 2 },
      { label: 'Más de $100 y algo me sirvió', value: 'invested', points: 1 },
    ],
  },
  {
    id: 8, tag: 'sellFeeling',
    text: '¿Qué sentís cuando escuchás la palabra "vender"?',
    options: [
      { label: 'Me incomoda, siento que es manipular', value: 'uncomfortable', points: 3 },
      { label: 'Es necesario pero no sé cómo hacerlo bien', value: 'neutral', points: 2 },
      { label: 'Me gusta, sé que es una habilidad valiosa', value: 'positive', points: 1 },
    ],
  },
  {
    id: 9, tag: 'time',
    text: '¿Hace cuánto venís pensando en generar ingresos por internet?',
    options: [
      { label: 'Hace meses o años pero nunca arranqué', value: 'long', points: 3 },
      { label: 'Recientemente, y quiero empezar ya', value: 'recent', points: 2 },
      { label: 'Ya estoy en acción, busco mejorar', value: 'active', points: 1 },
    ],
  },
  {
    id: 10, tag: 'environment',
    text: 'Las personas cercanas a vos (familia, amigos), ¿qué opinan de emprender?',
    options: [
      { label: 'Creen que es riesgoso o una pérdida de tiempo', value: 'negative', points: 3 },
      { label: 'No opinan mucho, no les interesa', value: 'indifferent', points: 2 },
      { label: 'Me apoyan o también están emprendiendo', value: 'supportive', points: 1 },
    ],
  },
  {
    id: 11, tag: 'commitment',
    text: 'Si tuvieras el sistema correcto, ¿cuánto tiempo le dedicarías por día?',
    options: [
      { label: 'Al menos 1-2 horas, sin excusa', value: 'committed', points: 1 },
      { label: 'Lo que pueda, tengo poco tiempo libre', value: 'limited', points: 2 },
      { label: 'No estoy seguro/a de poder comprometerme', value: 'unsure', points: 3 },
    ],
  },
  {
    id: 12, tag: 'intent',
    text: 'Última pregunta: si existiera un sistema paso a paso para vender lo que quieras usando IA... ¿qué harías?',
    options: [
      { label: 'Lo probaría de inmediato', value: 'ready', points: 3 },
      { label: 'Investigaría más antes de decidir', value: 'cautious', points: 2 },
      { label: 'Solo lo compraría si tiene garantía', value: 'skeptic', points: 1 },
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
        const totalPoints = newAnswers.reduce((sum, a) => sum + a.points, 0);
        const maxPoints = questions.length * 3;
        const score = Math.round((totalPoints / maxPoints) * 100);

        const answerMap = {};
        newAnswers.forEach(a => { answerMap[a.questionTag] = a.value; });

        let level, title, description;
        
        // Diagnóstico altamente dinámico basado en las respuestas específicas del usuario
        if (answerMap.obstacle === 'lost' && answerMap.sellFeeling === 'uncomfortable') {
          level = 'Tu Perfil: El Creador Estancado';
          title = 'Tenés las ideas, pero odias vender. Necesitas un sistema que venda por vos.';
          description = 'El error más común es intentar crear algo perfecto sin saber cómo presentarlo. Necesitás automatizar la captación con un diseño innegable para no depender de tu persuasión manual.';
        } else if (answerMap.obstacle === 'budget') {
          level = 'Tu Perfil: Potencial Sin Apalancamiento';
          title = 'No te falta capital, te falta apalancamiento tecnológico.';
          description = 'Hoy podés construir un ecosistema de ventas que luce como el de una empresa de un millón de dólares sin gastar un centavo. Solo necesitás los comandos correctos de IA.';
        } else if (answerMap.sellFeeling === 'uncomfortable') {
          level = 'Tu Perfil: Arquitecto Silencioso';
          title = 'Odiás perseguir clientes, pero sabés que necesitás facturar.';
          description = 'Tu ventaja oculta es que un ecosistema bien diseñado (embudos oscuros, estética de autoridad) reemplaza al vendedor pesado. Tu diseño filtrará a los clientes por vos.';
        } else if (answerMap.situation === 'desire' && score > 50) {
          level = 'Tu Perfil: Visionario en Cero';
          title = 'Tenés la ambición, pero necesitás un mapa exacto.';
          description = 'El peor error que podés cometer hoy es empezar vendiendo productos físicos que no dejan margen. Necesitás empaquetar conocimiento digital usando IA y testear el mercado hoy mismo.';
        } else if (answerMap.situation === 'failed') {
          level = 'Tu Perfil: Ejecutor Frustrado';
          title = 'Ya intestaste y no funcionó. La culpa no es tuya, fue el método.';
          description = 'Vender en 2024 con tácticas del 2018 ya no sirve. Hoy, la estética premium y la Inteligencia Artificial son las únicas variables que separan a los que facturan de los que ruegan atención.';
        } else {
          // Fallback ultra-optimizado por nivel de intensidad
          if (score >= 70) {
            level = 'Tu Perfil: Acelerador Nato';
            title = 'Estás en el punto de ignición exacto para escalar tus ingresos.';
            description = 'Tu nivel de compromiso y mentalidad son más altos que el 90% del mercado. Lo único que te separa de resultados drásticos es un sistema que conecte todo tu potencial de forma estructurada.';
          } else {
            level = 'Tu Perfil: Analista Cauteloso';
            title = 'Estás investigando el mercado, pero el tiempo corre en tu contra.';
            description = 'No necesitas seguir acumulando teoría. Necesitas un protocolo directo y aplicable que te permita ver pequeñas victorias económicas (como vender tu primer producto digital) hoy mismo.';
          }
        }

        // Personalized insights
        const insights = [];

        if (answerMap.fear === 'high') {
          insights.push({ icon: '🧠', title: 'Tu miedo es tu mayor ventaja disfrazada', text: 'Los que ignoran el cambio son los que realmente van a quedarse atrás. Vos ya diste el primer paso: reconocer que necesitás actuar.' });
        } else if (answerMap.fear === 'mid') {
          insights.push({ icon: '🔍', title: 'Tu curiosidad es el motor que te va a separar del resto', text: 'El 99% se queda en "algún día voy a aprender". Vos estás acá ahora. Eso ya te pone adelante.' });
        } else {
          insights.push({ icon: '⚡', title: 'Ya usás IA — ahora necesitás convertirla en ingresos', text: 'Saber usar herramientas es genial. Pero sin el sistema correcto para monetizar, es como tener el auto más rápido sin conocer la ruta.' });
        }

        if (answerMap.obstacle === 'lost') {
          insights.push({ icon: '🗺️', title: 'No es que te falten ideas. Te falta el mapa', text: 'Cuando tenés el sistema paso a paso, la pregunta "¿qué vendo?" se responde sola. Literalmente podés vender lo que te imagines: desde un ebook hasta una propiedad.' });
        } else if (answerMap.obstacle === 'budget') {
          insights.push({ icon: '💡', title: 'Los que más facturan empezaron con $0', text: 'No necesitás dinero para empezar. Necesitás inteligencia aplicada. Las mejores herramientas tienen versiones gratuitas. Tu única inversión real es aprender.' });
        } else {
          insights.push({ icon: '🎯', title: 'El problema no es tu producto. Es cómo lo comunicás', text: 'Hay un método específico para que las personas correctas encuentren lo que ofrecés y digan "necesito esto". Y se puede automatizar.' });
        }

        if (answerMap.sellFeeling === 'uncomfortable') {
          insights.push({ icon: '💛', title: 'Si vender te incomoda, este sistema es especialmente para vos', text: 'Existe una forma de vender donde no manipulás, no forzás, no incomodás a nadie. Solo servís. Y el dinero llega como consecuencia. Es lo opuesto a lo que imaginás.' });
        } else if (answerMap.sellFeeling === 'neutral') {
          insights.push({ icon: '🔑', title: 'Sabés que vender es importante — ahora falta el "cómo"', text: 'El "cómo" no es intuición ni talento natural. Es un sistema replicable que cualquier persona puede aprender y aplicar desde el primer día.' });
        } else {
          insights.push({ icon: '🔥', title: 'Tu mentalidad ya está lista. Solo falta el acelerador', text: 'Ya entendés que vender es una habilidad de vida. Lo que vas a descubrir es cómo multiplicar esa habilidad usando herramientas que no existían hace 2 años.' });
        }

        let closingLine;
        if (answerMap.situation === 'desire') {
          closingLine = 'La independencia financiera no empieza con un millón. Empieza con tu primera venta. Y esa primera venta está más cerca de lo que pensás.';
        } else if (answerMap.situation === 'failed') {
          closingLine = 'Que algo no haya funcionado antes no significa que no funcione. Significa que faltaba una pieza. Ahora está completa.';
        } else {
          closingLine = 'Ya tenés la base. Lo que falta es el sistema que une todo y lo multiplica. Estás a un paso.';
        }

        onComplete({ score, level, title, description, insights, closingLine, answerMap, answers: newAnswers });
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
