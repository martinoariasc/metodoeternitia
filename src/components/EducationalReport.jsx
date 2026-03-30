export default function EducationalReport({ diagnosisScore, onProceedToSales }) {

    // Calculate a realistic-sounding "Execution Capacity" based on the score
    const executionCapacity = diagnosisScore * 20; // Max 5 * 20 = 100%
    const isCritical = executionCapacity <= 60;

    return (
        <div className="w-full max-w-4xl mx-auto fade-in pb-24 pt-12 text-left">

            {/* Header: The Diagnosis */}
            <div className="mb-12 border-b border-border-color pb-12">
                <div className="inline-block px-3 py-1 border border-border-color rounded-md text-[11px] font-medium tracking-[0.2em] text-text-secondary mb-6 uppercase bg-[#111]">
                    Informe Confidencial
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
                    Tu Capacidad Operativa actual es del <span className={isCritical ? 'text-error-color' : 'text-primary'}>{executionCapacity}%</span>
                </h1>
                <p className="text-xl text-text-secondary font-light">
                    {isCritical
                        ? "Estás operando en números rojos. La mayor parte de tu energía mental se está fugando en tareas que no generan ingresos."
                        : "Tienes una base decente, pero el desorden sistémico te está impidiendo escalar. Estás estancado en el micromanagement."}
                </p>
            </div>

            {/* Empathy Section (Carnegie Principle: Validate them) */}
            <div className="space-y-8 text-lg font-light text-text-secondary leading-relaxed mb-16">
                <p>
                    <strong className="text-primary font-medium">Respira profundo. Lo que te pasa es normal.</strong>
                </p>
                <p>
                    Sé exactamente cómo te sientes. Te sientas frente a la computadora con la intención de "esculpir tu futuro", pero terminas scrolleando en redes sociales disfrazando de "investigación de mercado" lo que en realidad es <em>procrastinación pura</em>.
                </p>
                <p>
                    Termina el día. Estás exhausto. Sientes que trabajaste 10 horas, pero cuando miras tu cuenta bancaria, no hay un solo dólar nuevo. Te frustras contigo mismo. Te dices: <em>"Mañana sí le echo ganas. Mañana sí madrugo y la rompo."</em>
                </p>

                {/* Visual Placeholder: Pain Agitation */}
                <div className="bg-[#050505] border border-border-color rounded-xl p-8 my-10 flex flex-col items-center justify-center min-h-[300px] relative glass-panel text-center">
                    <p className="text-sm text-text-tertiary uppercase tracking-widest mb-2 font-mono">
                        [ REEMPLAZAR POR IMAGEN 1: DOLOR E INFORMACIÓN ]
                    </p>
                    <p className="text-xs text-text-secondary max-w-xs">Inserta aquí la imagen del emprendedor exhausto frente a pantallas oscuras generada por IA.</p>
                </div>

                <h3 className="text-2xl font-medium text-primary mt-12 mb-6 tracking-tight">El Problema NO Eres Tú</h3>
                <p>
                    El problema es que la industria del desarrollo personal te mintió. Te vendieron que el éxito depende de tu "fuerza de voluntad". Te vendieron diarios de gratitud y calendarios de hábitos arcoíris.
                </p>
                <p>
                    Pero la fuerza de voluntad es una batería que se agota a las 3 horas de despertarte. <strong>No puedes depender de estar motivado todos los días. Es humanamente imposible.</strong> Los ingenieros de Meta y TikTok ganan millones de dólares diseñando algoritmos para robarse tu atención. Tú intentas combatirlos con una agenda de papel y "ganas". Vas a perder siempre.
                </p>
            </div>

            {/* The Pivot (Educational Value) */}
            <div className="os-card bg-surface-color border-l-4 border-l-text-secondary mb-16">
                <h3 className="text-xl font-medium text-primary mb-4">El Secreto de los Ejecutores del 1%</h3>
                <p className="text-text-secondary font-light">
                    Ellos no tienen más fuerza de voluntad que tú. Ellos operan dentro de un <strong>Sistema Cerrado</strong>. Eliminan las opciones. No se levantan a pensar "qué hacer hoy". Tienen arquitecturas diseñadas donde solo pueden hacer lo que importa.
                </p>
            </div>

            {/* The Bridge to the Offer */}
            <div className="text-center pt-8 border-t border-border-color">
                <h2 className="text-3xl font-bold tracking-tight text-primary mb-6">¿Cómo construyes este sistema?</h2>
                <p className="text-lg text-text-secondary font-light mb-10 max-w-3xl mx-auto">
                    Puedes pasar los próximos 6 meses leyendo sobre productividad, armando un Notion hiper-complejo que abandonarás en una semana, y perdiendo más dinero... o puedes simplemente instalar en tu vida el sistema que ya programé, validé y uso todos los días.
                </p>

                {/* Hand-off to Sales Page */}
                <button
                    onClick={onProceedToSales}
                    className="os-btn os-btn-primary px-10 py-4 text-lg w-full sm:w-auto"
                >
                    VER LA SOLUCIÓN TÉCNICA
                </button>
            </div>

        </div>
    );
}
