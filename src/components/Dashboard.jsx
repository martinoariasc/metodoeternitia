import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════
   ETERNITIA — Mini-App Dashboard (PWA)
   100% automatizado. 0 dependencia del creador.
   Herramientas: Foco, Hábitos, Generador, Recursos.
═══════════════════════════════════════════════════════ */

const TABS = [
    { id: 'focus', label: 'Foco', icon: '🎯', desc: 'Tu prioridad del día' },
    { id: 'habits', label: 'Hábitos', icon: '📊', desc: 'Tu racha visible' },
    { id: 'generator', label: 'Generador', icon: '⚡', desc: 'Copy con IA' },
    { id: 'resources', label: 'Recursos', icon: '📚', desc: 'Lo que funciona' },
];

// ── Habit Tracker Data (12 habits x 30 days, stored in localStorage)
const DEFAULT_HABITS = [
    'Despertar antes de las 7',
    'Escribir 3 prioridades',
    'Bloque de foco (25 min)',
    'Ejercicio o caminar',
    'Leer 10 páginas',
    'Sin redes hasta las 12',
];

function loadData(key, fallback) {
    try { const d = localStorage.getItem(`era_${key}`); return d ? JSON.parse(d) : fallback; }
    catch { return fallback; }
}
function saveData(key, data) {
    localStorage.setItem(`era_${key}`, JSON.stringify(data));
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('focus');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>

            {/* ═══ NAV ═══ */}
            <nav style={{
                padding: '1rem 2rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid var(--border-color)',
                background: 'rgba(250,249,246,0.92)', backdropFilter: 'blur(16px)',
                position: 'sticky', top: 0, zIndex: 50,
            }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)' }}>
                    ETERNITIA
                </span>
                <span className="badge">Tu Espacio</span>
            </nav>

            {/* ═══ TAB BAR ═══ */}
            <div style={{
                display: 'flex', gap: '0', borderBottom: '1px solid var(--border-color)',
                overflowX: 'auto', background: 'var(--bg-color)',
            }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1, minWidth: '90px',
                            padding: '1rem 0.5rem',
                            background: 'transparent', border: 'none',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                            cursor: 'pointer', textAlign: 'center',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.3rem' }}>{tab.icon}</span>
                        <span style={{
                            fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                            fontWeight: activeTab === tab.id ? 500 : 300,
                            fontFamily: 'var(--font-body)',
                        }}>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* ═══ CONTENT ═══ */}
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
                {activeTab === 'focus' && <FocusPanel />}
                {activeTab === 'habits' && <HabitsPanel />}
                {activeTab === 'generator' && <GeneratorPanel />}
                {activeTab === 'resources' && <ResourcesPanel />}
            </main>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   TAB 1: FOCO — Prioridad del día + Pomodoro
═══════════════════════════════════════════════════════ */
function FocusPanel() {
    const [priority, setPriority] = useState(() => loadData('today_priority', ''));
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessions, setSessions] = useState(() => loadData('sessions_today', 0));

    useEffect(() => { saveData('today_priority', priority); }, [priority]);

    useEffect(() => {
        if (!isActive || timeLeft <= 0) return;
        const id = setInterval(() => setTimeLeft(t => {
            if (t <= 1) { setIsActive(false); setSessions(s => { const n = s + 1; saveData('sessions_today', n); return n; }); return 25 * 60; }
            return t - 1;
        }), 1000);
        return () => clearInterval(id);
    }, [isActive, timeLeft]);

    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>¿Cuál es tu única prioridad hoy?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '100%' }}>
                    No 10 cosas. Una. La que, si la completas, hace que todo el día valga la pena.
                </p>
            </div>

            <input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Ej: Terminar el diseño de la landing page..."
                style={{
                    width: '100%', padding: '1.2rem 1.5rem',
                    background: 'var(--surface-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    color: 'var(--text-primary)', marginBottom: '2.5rem',
                    outline: 'none',
                }}
            />

            {/* Timer */}
            <div style={{
                background: 'var(--bg-secondary)', borderRadius: '20px',
                padding: '3rem 2rem', textAlign: 'center',
                border: '1px solid var(--border-color)',
            }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>
                    Bloque de Foco · Pomodoro
                </p>

                <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(4rem, 12vw, 7rem)',
                    fontWeight: 400, lineHeight: 1,
                    color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    marginBottom: '2rem',
                    transition: 'color 0.3s ease',
                }}>
                    {m}:{s}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="btn btn-primary btn-shimmer"
                        style={{ padding: '0.9rem 2.5rem' }}
                    >
                        {isActive ? 'PAUSAR' : 'INICIAR FOCO'}
                    </button>
                    <button
                        onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
                        style={{
                            padding: '0.9rem 1.5rem', background: 'transparent',
                            border: '1px solid var(--border-color)', borderRadius: '100px',
                            color: 'var(--text-tertiary)', fontSize: '0.75rem',
                            cursor: 'pointer', letterSpacing: '0.1em',
                        }}
                    >
                        REINICIAR
                    </button>
                </div>

                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    Sesiones hoy: <strong style={{ color: 'var(--accent)' }}>{sessions}</strong>
                </p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   TAB 2: HÁBITOS — Tracker visual diario
═══════════════════════════════════════════════════════ */
function HabitsPanel() {
    const today = new Date().toISOString().slice(0, 10);
    const [habits, setHabits] = useState(() => loadData('habits_list', DEFAULT_HABITS));
    const [checks, setChecks] = useState(() => loadData('habit_checks', {}));
    const [newHabit, setNewHabit] = useState('');

    const toggleCheck = (habitIdx) => {
        const key = `${today}_${habitIdx}`;
        const updated = { ...checks, [key]: !checks[key] };
        setChecks(updated);
        saveData('habit_checks', updated);
    };

    const addHabit = () => {
        if (!newHabit.trim()) return;
        const updated = [...habits, newHabit.trim()];
        setHabits(updated);
        saveData('habits_list', updated);
        setNewHabit('');
    };

    const removeHabit = (idx) => {
        const updated = habits.filter((_, i) => i !== idx);
        setHabits(updated);
        saveData('habits_list', updated);
    };

    // Calculate streak (consecutive past days with at least 1 check)
    const getStreak = () => {
        let streak = 0;
        for (let d = 0; d < 365; d++) {
            const date = new Date();
            date.setDate(date.getDate() - d);
            const ds = date.toISOString().slice(0, 10);
            const hasAny = habits.some((_, i) => checks[`${ds}_${i}`]);
            if (d === 0 && !hasAny) continue; // today might not be done yet
            if (hasAny) streak++;
            else break;
        }
        return streak;
    };

    const completedToday = habits.filter((_, i) => checks[`${today}_${i}`]).length;
    const pct = habits.length ? Math.round((completedToday / habits.length) * 100) : 0;

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Tus hábitos de hoy</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '100%' }}>
                        Marca lo que ya hiciste. Tu racha se construye un día a la vez.
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>
                        {getStreak()}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        días de racha
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Progreso de hoy</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>{pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', background: 'var(--accent)', borderRadius: '10px',
                        width: `${pct}%`, transition: 'width 0.4s ease',
                    }} />
                </div>
            </div>

            {/* Habit list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                {habits.map((habit, i) => {
                    const checked = !!checks[`${today}_${i}`];
                    return (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem 1.25rem',
                            background: checked ? 'var(--accent-light)' : 'var(--surface-color)',
                            border: `1px solid ${checked ? 'var(--accent)' : 'var(--border-color)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                            onClick={() => toggleCheck(i)}
                        >
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '7px', flexShrink: 0,
                                border: `2px solid ${checked ? 'var(--accent)' : 'var(--border-color)'}`,
                                background: checked ? 'var(--accent)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease',
                            }}>
                                {checked && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>}
                            </div>
                            <span style={{
                                flex: 1,
                                fontSize: '0.9rem',
                                color: checked ? 'var(--accent)' : 'var(--text-primary)',
                                textDecoration: checked ? 'line-through' : 'none',
                                fontWeight: 300,
                            }}>{habit}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeHabit(i); }}
                                style={{
                                    background: 'none', border: 'none', color: 'var(--text-tertiary)',
                                    cursor: 'pointer', fontSize: '0.85rem', padding: '0.2rem',
                                    opacity: 0.5,
                                }}
                            >×</button>
                        </div>
                    );
                })}
            </div>

            {/* Add habit */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addHabit()}
                    placeholder="Agregar nuevo hábito..."
                    style={{
                        flex: 1, padding: '0.9rem 1.2rem',
                        background: 'var(--surface-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                        color: 'var(--text-primary)', outline: 'none',
                    }}
                />
                <button
                    onClick={addHabit}
                    className="btn btn-primary"
                    style={{ padding: '0.9rem 1.5rem', fontSize: '0.7rem' }}
                >
                    AGREGAR
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   TAB 3: GENERADOR — Copy automático
═══════════════════════════════════════════════════════ */
function GeneratorPanel() {
    const [pain, setPain] = useState('');
    const [product, setProduct] = useState('');
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);

    const templates = [
        {
            name: 'Gancho para Reel',
            generate: (p, s) => `🛑 PARA.\n\nSi ${p.toLowerCase()}, necesitas leer esto.\n\nNo es tu culpa. El problema es que nadie te dio un sistema.\n\nYo también estuve ahí hasta que descubrí ${s}.\n\n¿Resultado? Mi rutina cambió en 7 días.\n\nLink en bio. 🔗`,
        },
        {
            name: 'Copy para Ad',
            generate: (p, s) => `[ATENCIÓN] Si estás lidiando con ${p.toLowerCase()}, detén lo que estás haciendo.\n\nEl 87% de las personas intentan resolver esto con más fuerza de voluntad. Pero la ciencia dice que necesitas mejor infraestructura.\n\n${s} fue diseñado exactamente para eso.\n\nNo es motivación. Es un sistema.\n\n👉 Haz clic en "Más información" para verlo.`,
        },
        {
            name: 'Historia para Story',
            generate: (p, s) => `Hace 6 meses yo ${p.toLowerCase()}.\n\nProbé de TODO:\n❌ Apps de productividad\n❌ Rutinas de YouTube\n❌ "Solo necesitas disciplina"\n\nNada funcionaba.\n\nHasta que cambié de enfoque: en vez de buscar motivación, construí un sistema.\n\n${s} es ese sistema.\n\nHoy mis mañanas son completamente diferentes.\n\n¿Quieres ver cómo? ⬆️ Link en bio.`,
        },
        {
            name: 'Bio de Perfil',
            generate: (p, s) => `🎯 Ayudo a personas que ${p.toLowerCase()}\n📓 Creador de ${s}\n⚡ Sistema probado · Sin fuerza de voluntad\n👇 Tu diagnóstico gratuito:`,
        },
    ];

    const [selectedTemplate, setSelectedTemplate] = useState(0);

    const handleGenerate = () => {
        if (!pain || !product) return;
        setResult(templates[selectedTemplate].generate(pain, product));
        setCopied(false);
    };

    const handleCopy = () => {
        if (result) { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    };

    return (
        <div className="fade-in">
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Genera tu copy en segundos</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '100%' }}>
                Responde 2 preguntas, elige un formato, y copia el resultado. Listo para publicar.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                        ¿Cuál es el dolor de tu cliente?
                    </label>
                    <input
                        value={pain}
                        onChange={(e) => setPain(e.target.value)}
                        placeholder="Ej: No pueden mantener hábitos más de 3 días..."
                        style={{
                            width: '100%', padding: '1rem 1.2rem',
                            background: 'var(--surface-color)', border: '1px solid var(--border-color)',
                            borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                            color: 'var(--text-primary)', outline: 'none',
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                        ¿Cómo se llama tu solución?
                    </label>
                    <input
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        placeholder="Ej: EternitIA, mi método de ventas con IA..."
                        style={{
                            width: '100%', padding: '1rem 1.2rem',
                            background: 'var(--surface-color)', border: '1px solid var(--border-color)',
                            borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                            color: 'var(--text-primary)', outline: 'none',
                        }}
                    />
                </div>
            </div>

            {/* Template selector */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {templates.map((t, i) => (
                    <button key={i} onClick={() => setSelectedTemplate(i)} style={{
                        padding: '0.6rem 1rem', borderRadius: '100px',
                        border: `1px solid ${i === selectedTemplate ? 'var(--accent)' : 'var(--border-color)'}`,
                        background: i === selectedTemplate ? 'var(--accent)' : 'transparent',
                        color: i === selectedTemplate ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.75rem', cursor: 'pointer',
                        transition: 'all 0.2s ease',
                    }}>
                        {t.name}
                    </button>
                ))}
            </div>

            <button onClick={handleGenerate} className="btn btn-primary btn-shimmer" style={{ width: '100%', padding: '1rem', marginBottom: '2rem' }}>
                GENERAR COPY
            </button>

            {/* Result */}
            {result && (
                <div style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    borderRadius: '16px', padding: '2rem', position: 'relative',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                            Resultado — {templates[selectedTemplate].name}
                        </span>
                        <button onClick={handleCopy} style={{
                            padding: '0.4rem 1rem', borderRadius: '100px',
                            background: copied ? 'var(--accent)' : 'var(--surface-color)',
                            color: copied ? '#fff' : 'var(--text-secondary)',
                            border: `1px solid ${copied ? 'var(--accent)' : 'var(--border-color)'}`,
                            fontSize: '0.7rem', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}>
                            {copied ? '✓ Copiado' : 'Copiar'}
                        </button>
                    </div>
                    <pre style={{
                        whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-primary)',
                        margin: 0,
                    }}>{result}</pre>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   TAB 4: RECURSOS — Curación automática (reemplaza comunidad)
═══════════════════════════════════════════════════════ */
const RESOURCES = [
    {
        category: 'Libros que cambian el juego',
        items: [
            { title: 'Hábitos Atómicos', author: 'James Clear', why: 'El libro #1 de hábitos. No es motivación, es ciencia del comportamiento. Capítulo 1 ya vale todo el libro.', type: '📖' },
            { title: 'La Semana Laboral de 4 Horas', author: 'Tim Ferriss', why: 'Te enseña a automatizar, delegar y diseñar tu tiempo. Cambió mi perspectiva sobre el trabajo.', type: '📖' },
            { title: 'Piense y Hágase Rico', author: 'Napoleon Hill', why: 'El abuelo de todos los libros de mentalidad. Los 13 principios siguen funcionando 90 años después.', type: '📖' },
            { title: 'Cómo Ganar Amigos', author: 'Dale Carnegie', why: 'No es sobre manipulación. Es sobre entender que la gente compra de quien les hace sentir importantes.', type: '📖' },
            { title: 'El Monje que Vendió su Ferrari', author: 'Robin Sharma', why: 'Ritual matutino, gestión de energía y propósito. Simple pero profundo.', type: '📖' },
        ]
    },
    {
        category: 'Canales de YouTube imprescindibles',
        items: [
            { title: 'Ali Abdaal', author: 'Productividad', why: 'Sistemas reales de productividad explicados con ciencia. Su método de "Aligned" es brillante.', type: '🎬' },
            { title: 'Thomas Frank', author: 'Hábitos + Notion', why: 'Si quieres aprender a organizar tu vida digital, no hay mejor canal. Sus templates de Notion son oro.', type: '🎬' },
            { title: 'Alex Hormozi', author: 'Ventas + Negocios', why: 'Explica cómo crear ofertas irresistibles. Su libro "$100M Offers" debería ser lectura obligatoria.', type: '🎬' },
            { title: 'Matt D\'Avella', author: 'Minimalismo + Hábitos', why: 'Documentales hermosos sobre simplificar la vida. Su reto de 30 días me inspiró a empezar.', type: '🎬' },
        ]
    },
    {
        category: 'Herramientas gratuitas que uso a diario',
        items: [
            { title: 'ChatGPT', author: 'OpenAI', why: 'Con los prompts correctos (los de La Bóveda), puedes automatizar el 80% de tareas repetitivas.', type: '🔧' },
            { title: 'Canva', author: 'Diseño', why: 'Diseño profesional sin ser diseñador. Úsalo para todo: posts, PDFs, presentaciones.', type: '🔧' },
            { title: 'Notion', author: 'Organización', why: 'Mi segundo cerebro. Proyectos, notas, bases de datos. Todo en un solo lugar.', type: '🔧' },
            { title: 'Hotmart', author: 'Ventas digitales', why: 'La plataforma para vender productos digitales en LATAM. Pagos, entregas, todo automático.', type: '🔧' },
        ]
    },
];

function ResourcesPanel() {
    const [openCategory, setOpenCategory] = useState(0);

    return (
        <div className="fade-in">
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Recursos curados para ti</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: '100%' }}>
                No es una lista random de internet. Es exactamente lo que funciona, con mi opinión honesta de cada uno.
            </p>

            {RESOURCES.map((cat, catIdx) => (
                <div key={catIdx} style={{ marginBottom: '1rem' }}>
                    <button
                        onClick={() => setOpenCategory(openCategory === catIdx ? -1 : catIdx)}
                        style={{
                            width: '100%', textAlign: 'left',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1.2rem 1.5rem',
                            background: openCategory === catIdx ? 'var(--bg-secondary)' : 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: openCategory === catIdx ? '14px 14px 0 0' : '14px',
                            cursor: 'pointer', transition: 'all 0.2s ease',
                        }}
                    >
                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>{cat.category}</span>
                        <span style={{ color: 'var(--text-tertiary)', fontSize: '1.2rem', transform: openCategory === catIdx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}>
                            ▾
                        </span>
                    </button>

                    {openCategory === catIdx && (
                        <div style={{
                            border: '1px solid var(--border-color)', borderTop: 'none',
                            borderRadius: '0 0 14px 14px', overflow: 'hidden',
                        }}>
                            {cat.items.map((item, i) => (
                                <div key={i} style={{
                                    padding: '1.25rem 1.5rem',
                                    borderBottom: i < cat.items.length - 1 ? '1px solid var(--border-color)' : 'none',
                                    background: 'var(--surface-color)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                        <span style={{ fontSize: '1rem' }}>{item.type}</span>
                                        <strong style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.title}</strong>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>· {item.author}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '1.75rem', maxWidth: '100%' }}>
                                        {item.why}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
