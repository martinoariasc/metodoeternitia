export default function SalesPage({ diagnosisScore, onProceedToCheckout }) {
    return (
        <div className="w-full fade-in pb-24">

            {/* 1. Hero Section (Ultra Minimal) */}
            <div className="text-center mb-20 pt-16">
                <div className="inline-block px-3 py-1 border border-border-color rounded-md text-[11px] font-medium tracking-[0.2em] text-text-secondary mb-8 uppercase bg-[#111]">
                    Diagnóstico Completado
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-primary">
                    Tu cerebro no está roto. <br />
                    <span className="text-text-secondary">Tu sistema sí.</span>
                </h1>
                <p className="text-xl md:text-2xl text-text-tertiary max-w-2xl mx-auto font-light leading-relaxed">
                    Tienes 100 posts guardados en TikTok, 5 PDFs descargados y 0 ejecución. La sobreinformación te está ahogando.
                </p>
            </div>

            {/* 2. El Espejo (Dolor Crudo) */}
            <div className="os-card mb-24 max-w-4xl mx-auto border-transparent bg-gradient-to-b from-surface-color to-bg-color">
                <div className="space-y-6 text-lg text-text-secondary font-light leading-relaxed">
                    <p>
                        <strong className="text-primary font-medium">Seamos clínicos:</strong> Estás operando al 20% de tu capacidad. Tu problema no es la falta de motivación ni de inteligencia. Tu problema es que dependes de tu propia fuerza de voluntad en un mundo digital diseñado por ingenieros multimillonarios para secuestrar tu atención.
                    </p>
                    <p>
                        Te levantas a la 1 de la tarde y comes frente a una pantalla porque el esfuerzo de arrancar el día es titánico. Y cuando por fin decides "trabajar", te paralizas frente a la computadora sin saber por dónde empezar.
                    </p>
                    <p className="text-primary font-medium">
                        La motivación dura 3 horas. Los sistemas duran para siempre.
                    </p>
                </div>
            </div>

            {/* 3. La Solución (Protocolo O.S.) */}
            <div className="text-center mb-16 max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Presentando Protocolo O.S.
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-16 font-light">
                    No es un curso. No es un PDF motivacional de 10 páginas. Es un <strong>Sistema Operativo Diario</strong> para emprendedores. Un espacio de trabajo aislado del ruido, anclado en tu celular.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="os-card bg-[#0a0a0a]">
                        <div className="text-2xl mb-4 text-text-secondary">01.</div>
                        <h4 className="font-medium text-lg mb-2 text-primary">El Foco (Pomodoro)</h4>
                        <p className="text-sm text-text-secondary font-light">Una interfaz ultra-minimalista. Ecribes tu "Única Prioridad Diaria" y activas el cronómetro. Destruye la multitarea.</p>
                    </div>
                    <div className="os-card bg-[#0a0a0a]">
                        <div className="text-2xl mb-4 text-text-secondary">02.</div>
                        <h4 className="font-medium text-lg mb-2 text-primary">La Bóveda Curada</h4>
                        <p className="text-sm text-text-secondary font-light">Acceso a mi librería personal de Prompts de IA "Copy-Paste", estructuras de Meta Ads y resúmenes quirúrgicos de Dale Carnegie.</p>
                    </div>
                    <div className="os-card bg-[#0a0a0a]">
                        <div className="text-2xl mb-4 text-text-secondary">03.</div>
                        <h4 className="font-medium text-lg mb-2 text-primary">Generador de Copy</h4>
                        <p className="text-sm text-text-secondary font-light">Un framework de software. Responde 3 preguntas sobre tu cliente, y la App te escupe la estructura exacta de un anuncio que vende.</p>
                    </div>
                    <div className="os-card bg-[#0a0a0a]">
                        <div className="text-2xl mb-4 text-text-secondary">04.</div>
                        <h4 className="font-medium text-lg mb-2 text-primary">Manual Clínico (PDF)</h4>
                        <p className="text-sm text-text-secondary font-light">Tu Workbook Estratégico descargable. El campo de batalla táctil para hacer tu purga de hábitos y diseñar tu arquitectura de valor a mano.</p>
                    </div>
                </div>
            </div>

            {/* Visual Mockup Placeholder */}
            <div className="w-full max-w-5xl mx-auto aspect-[21/9] bg-[#111] rounded-2xl border border-border-color mb-24 flex items-center justify-center relative overflow-hidden glass-panel">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.03)] to-transparent"></div>
                <p className="text-text-tertiary font-medium tracking-widest text-sm uppercase">Interfaz de Protocolo O.S.</p>
            </div>

            {/* 4. Precio y Cierre */}
            <div className="max-w-2xl mx-auto text-center border-t border-border-color pt-16">
                <h3 className="text-3xl font-bold mb-6 text-primary tracking-tight">El Filtro de Ejecutores</h3>
                <p className="text-text-secondary mb-8 font-light leading-relaxed text-lg">
                    El software tradicional (Notion, ClickUp, ChatGPT Plus) te cuesta más de $97 al mes en suscripciones que ni usas.
                </p>
                <p className="text-primary mb-12 font-medium text-lg">
                    Protocolo O.S. requiere un solo pago de <span className="line-through text-text-tertiary mr-2">$147</span> $27 USD.
                </p>
                <p className="text-text-secondary mb-12 font-light text-sm">
                    No ofrezco esto gratis porque la mente humana no valora lo regalado. El pago de $27 (lo que cuesta una salida a tomar de fin de semana) es el filtro psicológico exacto para separar a los curiosos baratos de los verdaderos ejecutores. Paga el precio, siente la obligación, y ponte a trabajar.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={onProceedToCheckout}
                        className="os-btn os-btn-primary w-full sm:w-auto px-12 py-4 text-lg"
                    >
                        INICIAR TERMINAL O.S. — $27
                    </button>
                    <div className="flex items-center gap-2 text-[11px] text-text-tertiary uppercase tracking-widest">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        Acceso Inmediato Encriptado
                    </div>
                </div>
            </div>

        </div>
    );
}
