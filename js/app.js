/* =============================================
   SELF SCI DEMO — App Logic
   ============================================= */

// ── ESTADO GLOBAL ──
const state = {
  currentScreen: 'screen-login',
  rolSelected: null,
  roleName: null,
  assessmentScore: 0,
  assessmentPts: 0,
  currentQuestion: 0,
  answers: [],
  npsValue: null
};

// ══════════════════════════════════════════════════
//  DATOS REALES — Roles y Capabilities (Base SCI)
// ══════════════════════════════════════════════════

// 8 capabilities evaluadas en el assessment
const CAPS = [
  'MBWA',
  'Gestión de Equipos',
  'Gestión por sistemas',
  'Toma de Decisiones',
  'Grit (resilencia + empuje)',
  'Orientación a datos',
  'Resolución de problemas',
  'Mejora continua'
];

// 3 roles T2 extraídos de "Base de datos Roles Capabilities SCI.xlsx"
const rolesData = {
  'Supervisor de Almacén': {
    id: 1,
    area: 'T2', nivel: 'Competent', puntaje: 1.89,
    icono: '🏭', color: 'var(--cyan)',
    descripcion: 'Planifica, coordina y estandariza las operaciones del almacén garantizando eficiencia, seguridad y precisión en el inventario.',
    capabilities: {
      'MBWA':                        { puntaje: 2.0, nivel: 'Competent' },
      'Gestión de Equipos':          { puntaje: 1.9, nivel: 'Competent' },
      'Gestión por sistemas':        { puntaje: 2.0, nivel: 'Competent' },
      'Toma de Decisiones':          { puntaje: 2.0, nivel: 'Competent' },
      'Grit (resilencia + empuje)':  { puntaje: 1.8, nivel: 'Competent' },
      'Orientación a datos':         { puntaje: 1.8, nivel: 'Competent' },
      'Resolución de problemas':     { puntaje: 1.9, nivel: 'Competent' },
      'Mejora continua':             { puntaje: 1.9, nivel: 'Competent' }
    },
    tags: ['Inventarios', 'Almacén', 'Operaciones', 'WMS']
  },
  'Supervisor de Distribución': {
    id: 2,
    area: 'T2', nivel: 'Competent', puntaje: 1.95,
    icono: '🚛', color: 'var(--purple)',
    descripcion: 'Garantiza el servicio y entrega de producto, gestionando operaciones de distribución, flota y cumplimiento de indicadores de servicio al cliente.',
    capabilities: {
      'MBWA':                        { puntaje: 2.0, nivel: 'Competent' },
      'Gestión de Equipos':          { puntaje: 2.0, nivel: 'Competent' },
      'Gestión por sistemas':        { puntaje: 2.0, nivel: 'Competent' },
      'Toma de Decisiones':          { puntaje: 2.1, nivel: 'Competent' },
      'Grit (resilencia + empuje)':  { puntaje: 1.9, nivel: 'Competent' },
      'Orientación a datos':         { puntaje: 1.9, nivel: 'Competent' },
      'Resolución de problemas':     { puntaje: 2.0, nivel: 'Competent' },
      'Mejora continua':             { puntaje: 1.9, nivel: 'Competent' }
    },
    tags: ['Distribución', 'Servicio al cliente', 'Last-mile', 'Flota']
  },
  'Gerente de Operaciones de Distribución': {
    id: 3,
    area: 'T2', nivel: 'Proficient', puntaje: 2.33,
    icono: '🎯', color: 'var(--magenta)',
    descripcion: 'Lidera las operaciones de distribución, optimiza procesos, desarrolla equipos y garantiza niveles de servicio, eficiencia y rentabilidad operativa.',
    capabilities: {
      'MBWA':                        { puntaje: 2.3, nivel: 'Proficient' },
      'Gestión de Equipos':          { puntaje: 2.4, nivel: 'Proficient' },
      'Gestión por sistemas':        { puntaje: 2.4, nivel: 'Proficient' },
      'Toma de Decisiones':          { puntaje: 2.3, nivel: 'Proficient' },
      'Grit (resilencia + empuje)':  { puntaje: 2.1, nivel: 'Competent' },
      'Orientación a datos':         { puntaje: 2.2, nivel: 'Competent' },
      'Resolución de problemas':     { puntaje: 2.3, nivel: 'Proficient' },
      'Mejora continua':             { puntaje: 2.4, nivel: 'Proficient' }
    },
    tags: ['Liderazgo', 'Estrategia', 'Mejora operativa', 'Finanzas']
  }
};

// Mapa actividades exploración → capabilities relevantes
const actividadCaps = {
  'Supervisión de equipos':              ['MBWA', 'Gestión de Equipos'],
  'Análisis de datos / KPIs':            ['Orientación a datos', 'Gestión por sistemas'],
  'Resolución de problemas operativos':  ['Resolución de problemas', 'Mejora continua'],
  'Coordinación interdepartamental':     ['Toma de Decisiones', 'MBWA'],
  'Elaboración de reportes':             ['Orientación a datos', 'Gestión por sistemas'],
  'Gestión de objetivos / metas':        ['Toma de Decisiones', 'Grit (resilencia + empuje)']
};
const retoCaps = {
  'Gestión del tiempo y prioridades':       ['Gestión por sistemas', 'Grit (resilencia + empuje)'],
  'Liderazgo y motivación del equipo':      ['Gestión de Equipos', 'MBWA'],
  'Comunicación efectiva':                  ['MBWA', 'Gestión de Equipos'],
  'Cumplimiento de indicadores':            ['Orientación a datos', 'Gestión por sistemas'],
  'Manejo del cambio y adaptabilidad':      ['Grit (resilencia + empuje)', 'Mejora continua'],
  'Toma de decisiones bajo presión':        ['Toma de Decisiones', 'Resolución de problemas']
};

// ── PREGUNTAS DEL ASSESSMENT ──
// Cada pregunta evalúa una capability específica del marco SCI (Dreyfus level: Competent)
const questions = [
  {
    id: 1,
    capability: 'MBWA',
    competencia: 'Management by Walking Around',
    text: 'Llegas a tu turno en el centro de distribución y notas que una zona de almacenamiento opera más lento de lo habitual, aunque no hay ningún reporte formal de problema. ¿Cuál es tu primera acción?',
    options: [
      { text: 'Esperar el briefing formal de handover para conocer el estado oficial de las operaciones.', correct: false },
      { text: 'Enviar un mensaje al supervisor de turno anterior solicitando un reporte escrito.', correct: false },
      { text: 'Recorrer físicamente la zona, dialogar con los operadores directamente, identificar el cuello de botella en ese momento y tomar acción antes del briefing.', correct: true },
      { text: 'Revisar el WMS desde la oficina para detectar anomalías en el sistema.', correct: false }
    ],
    feedback_correct: '✅ Correcto. El MBWA (Competent) consiste en liderar presencialmente: recorrer, observar e interactuar de forma directa con el equipo para identificar y resolver problemas operativos en tiempo real, no desde la distancia.',
    feedback_wrong: '📚 El nivel Competente de MBWA implica presencia activa en el piso de operaciones. Esperar reportes o revisar sistemas de forma remota puede retrasar la detección de problemas. El líder efectivo ve, pregunta y actúa directamente.'
  },
  {
    id: 2,
    capability: 'Gestión de Equipos',
    competencia: 'Gestión de Equipos',
    text: 'Un operador con 5 años de experiencia resiste los nuevos procedimientos de picking. Paralelamente, un operador reciente muestra mucho interés en aprender pero necesita más acompañamiento. ¿Qué haces?',
    options: [
      { text: 'Asignas al operador nuevo una capacitación en línea y dejas al veterano en su zona habitual sin intervenir.', correct: false },
      { text: 'Llamas al operador veterano a tu oficina y le adviertes que debe seguir los nuevos procedimientos o habrá consecuencias.', correct: false },
      { text: 'Asignas al veterano como instructor del nuevo procedimiento, defines metas de mejora conjunta y das seguimiento mensual con retroalimentación estructurada.', correct: true },
      { text: 'Escala el caso a Recursos Humanos para que intervenga formalmente.', correct: false }
    ],
    feedback_correct: '🌟 Excelente. El nivel Competente de Gestión de Equipos implica delegar tareas de desarrollo, proporcionar retroalimentación constructiva y aprovechar el talento interno para multiplicar capacidades. Convertir al veterano en coach resuelve dos problemas a la vez.',
    feedback_wrong: '📚 La Gestión de Equipos Competente va más allá de la autoridad o la escalada. Implica identificar el potencial individual, asignar roles de desarrollo y dar seguimiento. Ignorar o amenazar no desarrolla talento — lo bloquea.'
  },
  {
    id: 3,
    capability: 'Gestión por sistemas',
    competencia: 'Gestión por sistemas',
    text: 'Tus indicadores del fin de semana muestran que el fill rate bajó de 97% a 91%. Los niveles de inventario están dentro del rango, pero el sistema reporta alta tasa de "no encontrado" en picking. ¿Cómo actúas?',
    options: [
      { text: 'Ordenas un conteo físico total del inventario y suspendes el picking hasta completarlo.', correct: false },
      { text: 'Cruzas en el WMS los registros de ubicación vs. inventario reciente, identificas discrepancias de ubicación en SKUs de alto movimiento y coordinas la corrección con tu equipo de forma inmediata.', correct: true },
      { text: 'Contactas al proveedor de mayor rotación para acelerar el siguiente pedido y compensar el faltante.', correct: false },
      { text: 'Informas a tu gerente y esperas instrucciones antes de tomar alguna acción.', correct: false }
    ],
    feedback_correct: '📊 Correcto. Gestión por sistemas Competente significa usar los datos del sistema para diagnosticar antes de actuar. Cruzar el WMS con el inventario físico permite identificar la causa raíz (desalineación de ubicaciones) sin detener operaciones innecesariamente.',
    feedback_wrong: '📚 El nivel Competente en Gestión por sistemas implica aprovechar los estándares y herramientas del sistema para diagnosticar y resolver. Suspender operaciones sin análisis o escalar sin propuesta genera mayor impacto negativo.'
  },
  {
    id: 4,
    capability: 'Toma de Decisiones',
    competencia: 'Toma de Decisiones',
    text: 'Un envío crítico para un cliente clave lleva 3 horas de retraso por falla del camión. Opciones: esperar 2 horas más la reparación, o contratar transporte de emergencia al 40% de costo adicional con entrega en 1 hora. ¿Qué haces?',
    options: [
      { text: 'Esperas la reparación para no exceder el presupuesto, sin consultar a nadie.', correct: false },
      { text: 'Escala de inmediato a tu gerente y esperas su decisión sin proponer ninguna alternativa.', correct: false },
      { text: 'Calculas el costo de la penalización del SLA vs. el transporte adicional, presentas la recomendación justificada a tu gerente, comunicas proactivamente al cliente la situación y gestionas la autorización.', correct: true },
      { text: 'Llamas al cliente, informas del retraso y confirmas entrega para el día siguiente sin consultar el SLA.', correct: false }
    ],
    feedback_correct: '🎯 Correcto. Toma de Decisiones Competente implica analizar datos (costos, SLA, impacto), proponer alternativas con justificación y comunicar a los interesados. No esperar instrucciones, pero tampoco decidir unilateralmente algo de alto impacto.',
    feedback_wrong: '📚 La toma de decisiones efectiva combina análisis de datos, proactividad y comunicación. Esperar sin proponer o decidir sin análisis refleja niveles Novice/Advanced Beginner. El nivel Competente genera opciones respaldadas con datos.'
  },
  {
    id: 5,
    capability: 'Grit (resilencia + empuje)',
    competencia: 'Grit (Resiliencia y Empuje)',
    text: 'En plena semana pico, tres operadores de tu turno reportan incapacidad, el sistema WMS cae 4 horas y tu gerente añade un embarque prioritario con ventana de entrega de 6 horas. ¿Cuál es tu respuesta?',
    options: [
      { text: 'Informas a tu gerente que el embarque prioritario no es posible dadas las circunstancias y documentas todo para cubrirte.', correct: false },
      { text: 'Atiendes primero el sistema, luego el personal y al final el embarque, siguiendo el orden lógico de los problemas.', correct: false },
      { text: 'Haces triaje de las tres crisis simultáneamente: reasignas personal disponible, activas proceso manual de respaldo, comunicas tiempos realistas a todos los interesados y das seguimiento directo al embarque prioritario.', correct: true },
      { text: 'Te enfocas únicamente en el embarque prioritario y dejas el resto para el siguiente turno.', correct: false }
    ],
    feedback_correct: '💪 Excelente. El Grit Competente consiste en perseverar ante dificultades significativas, adaptarse a situaciones cambiantes y mantener al equipo motivado. El triaje simultáneo refleja resiliencia operativa real.',
    feedback_wrong: '📚 El nivel Competente de Grit va más allá de la perseverancia individual: implica mantener el desempeño del equipo bajo presión múltiple. Renunciar ante la adversidad o atender los problemas secuencialmente refleja niveles inferiores.'
  },
  {
    id: 6,
    capability: 'Orientación a datos',
    competencia: 'Orientación a datos',
    text: 'Tu gerente te pide una proyección de necesidades de personal para el siguiente mes. Tienes datos de throughput histórico, pedidos proyectados, ajustes estacionales del año anterior y métricas individuales de productividad. ¿Cómo construyes la proyección?',
    options: [
      { text: 'Usas el mismo número de personal del mes pasado con un 10% de margen de seguridad.', correct: false },
      { text: 'Basas la proyección únicamente en los pedidos proyectados del siguiente mes.', correct: false },
      { text: 'Cruzas el throughput histórico con los pedidos proyectados, aplicas ajustes estacionales y modelas tres escenarios (bajo, base, alto) usando métricas de productividad individual para dimensionar el equipo con precisión.', correct: true },
      { text: 'Pides a RH que calcule el personal según el presupuesto disponible.', correct: false }
    ],
    feedback_correct: '📈 Correcto. Orientación a datos Competente implica recopilar, cruzar e interpretar múltiples fuentes para construir análisis accionables. El modelo de tres escenarios es una práctica de planificación basada en datos reconocida en supply chain.',
    feedback_wrong: '📚 El nivel Competente requiere ir más allá de los datos simples o del criterio subjetivo. Usar solo una fuente (pedidos) o delegar el análisis a otro es un indicador de nivel Advanced Beginner.'
  },
  {
    id: 7,
    capability: 'Resolución de problemas',
    competencia: 'Resolución de Problemas',
    text: 'Por tercer mes consecutivo, tu área registra una tasa de daño de producto del 5%, por encima del 2% objetivo. Distintos miembros del equipo señalan causas distintas: velocidad de montacargas, calidad del empaque y prácticas de apilamiento. ¿Qué haces primero?',
    options: [
      { text: 'Implementas las tres acciones correctivas simultáneamente para cubrir todas las causas posibles.', correct: false },
      { text: 'Emites un comunicado al equipo recordando los estándares de manejo con cuidado.', correct: false },
      { text: 'Realizas un análisis de causa raíz estructurado (5 Porqués o espina de pescado), recopilas datos segmentados por turno, zona y equipo, identificas la causa principal, implementas una acción correctiva específica y mides el impacto en 30 días.', correct: true },
      { text: 'Cambias al proveedor de empaque asumiendo que es el origen del problema.', correct: false }
    ],
    feedback_correct: '🔍 Correcto. La Resolución de problemas Competente requiere análisis estructurado antes de actuar. Identificar la causa raíz con datos segmentados evita corregir síntomas y permite soluciones duraderas.',
    feedback_wrong: '📚 Implementar varias acciones sin análisis genera ruido y desperdicio. Un comunicado es insuficiente para problemas recurrentes. El nivel Competente exige metodología (5 Porqués, espina de pescado) y medición del impacto de la solución.'
  },
  {
    id: 8,
    capability: 'Mejora continua',
    competencia: 'Mejora Continua',
    text: 'El proceso de recepción de tu área toma 45 minutos por camión. El benchmark sectorial es 28 minutos y tu meta es llegar a 30. El equipo trabaja duro pero los tiempos no mejoran. ¿Cuál es tu enfoque?',
    options: [
      { text: 'Contratas personal adicional para tener más manos en el proceso.', correct: false },
      { text: 'Presionas al equipo para que trabaje más rápido y reduces los tiempos de descanso.', correct: false },
      { text: 'Mapeas el proceso actual paso a paso, identificas actividades sin valor añadido (esperas, reprocesos, movimientos innecesarios), pruebas el flujo mejorado con un turno piloto, mides los resultados y escalas al resto del equipo.', correct: true },
      { text: 'Solicitas inversión en automatización para reemplazar los pasos manuales sin antes analizar el flujo.', correct: false }
    ],
    feedback_correct: '🔄 Excelente. Mejora continua Competente implica mapear el proceso, eliminar desperdicios con metodología Lean, pilotar antes de escalar y medir el impacto. Agregar recursos o presión sin análisis de flujo no resuelve el problema.',
    feedback_wrong: '📚 El nivel Competente en Mejora continua requiere análisis del proceso antes de cualquier solución. Contratar más personal o presionar sin diagnóstico añade costo sin mejorar el sistema. La automatización sin análisis puede perpetuar ineficiencias.'
  }
];

// ── NAVEGACIÓN ENTRE PANTALLAS ──
function navigate(screenId) {
  // Ocultar pantalla actual
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

  // Mostrar nueva pantalla
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    state.currentScreen = screenId;
    window.scrollTo(0, 0);
  }

  // Acciones especiales al entrar a pantallas
  if (screenId === 'screen-seleccion-rol') {
    setTimeout(renderRoleCards, 80);
  }
  if (screenId === 'screen-assessment') {
    state.currentQuestion = 0;
    state.assessmentPts = 0;
    state.assessmentScore = 0;
    state.answers = [];
    renderQuestion();
  }
  if (screenId === 'screen-resultados') {
    setTimeout(initResultadosCharts, 150);
  }
  if (screenId === 'screen-dashboard') {
    setTimeout(() => {
      initDashboardCharts();
      showPtsPopup();
    }, 300);
  }

  // Admin screens — render on navigate
  if (screenId === 'screen-admin-empresa-config') {
    setTimeout(() => {
      renderTablaParticipantes();
      renderModulosConfig();
      renderSesionesSync();
    }, 80);
  }
  if (screenId === 'screen-admin-modulos') {
    setTimeout(renderModulosGrid, 80);
  }
  if (screenId === 'screen-admin-permisos') {
    setTimeout(renderPermisosTabla, 80);
  }
}

// ── SELECCIÓN DE ROL ──
function selectRol(id) {
  state.rolSelected = id;
  // Store role name for later use in charts
  const rolEntry = Object.entries(rolesData).find(([, r]) => r.id === id);
  state.roleName = rolEntry ? rolEntry[0] : null;

  document.querySelectorAll('.rol-card').forEach(c => {
    c.style.borderColor = 'rgba(255,255,255,0.08)';
    c.style.background = 'rgba(255,255,255,0.03)';
    c.style.boxShadow = 'none';
  });
  const selected = document.querySelector(`.rol-card[data-rol="${id}"]`);
  if (selected) {
    const rol = rolEntry ? rolEntry[1] : null;
    const color = rol ? rol.color : 'var(--cyan)';
    selected.style.borderColor = color;
    selected.style.background = `rgba(0,216,218,0.08)`;
    selected.style.boxShadow = `0 0 24px rgba(0,216,218,0.2)`;
  }
  const btn = document.getElementById('btn-iniciar-assessment');
  if (btn) btn.disabled = false;
  showToast('✓ Rol seleccionado — ¡Listo para el diagnóstico!', 'success');
}

// ── RENDER ROLE CARDS ──
function renderRoleCards() {
  const container = document.getElementById('rol-cards');
  if (!container) return;

  // Compute profile match from exploration checkboxes
  const profileCaps = new Set();
  document.querySelectorAll('#screen-exploracion .radio-card input:checked').forEach(cb => {
    const label = cb.closest('.radio-card')?.querySelector('.radio-card-label')?.textContent?.trim();
    if (label) {
      (actividadCaps[label] || retoCaps[label] || []).forEach(c => profileCaps.add(c));
    }
  });

  const matchScores = {};
  Object.entries(rolesData).forEach(([name, rol]) => {
    const rolCapNames = Object.keys(rol.capabilities);
    const overlap = [...profileCaps].filter(pc =>
      rolCapNames.some(rc => rc.toLowerCase().includes(pc.toLowerCase().substring(0, 10)))
    ).length;
    const base = profileCaps.size > 0 ? Math.round(55 + (overlap / Math.max(profileCaps.size, 1)) * 38) : 72;
    matchScores[name] = Math.min(98, base + rol.id * 3);
  });
  // Ensure role 1 > role 2 > role 3 for "recommendation" feel
  const names = Object.keys(rolesData);
  const sorted = [...Object.values(matchScores)].sort((a, b) => b - a);
  names.forEach((n, i) => { matchScores[n] = sorted[i]; });

  container.innerHTML = Object.entries(rolesData).map(([name, rol], i) => {
    const match = matchScores[name];
    const isTop = i === 0;
    const capEntries = Object.entries(rol.capabilities).slice(0, 4);
    const colorVar = rol.color;
    return `
    <div class="card rol-card" data-rol="${rol.id}" onclick="selectRol(${rol.id})"
         style="cursor:pointer;position:relative;border-color:${isTop ? colorVar : 'rgba(255,255,255,0.08)'};">
      ${isTop ? `<div style="position:absolute;top:14px;right:14px;"><span class="badge badge-cyan">⭐ Recomendado</span></div>` : ''}
      <div style="font-size:44px;margin-bottom:10px;">${rol.icono}</div>
      <h3 style="font-size:16px;font-weight:700;color:${colorVar};margin-bottom:6px;padding-right:${isTop?'90px':'0'}">${name}</h3>
      <p style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.5;margin-bottom:14px;">${rol.descripcion}</p>

      <div style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:5px;">
          <span>Coincidencia con tu perfil</span>
          <span style="color:${colorVar};font-weight:700;">${match}%</span>
        </div>
        <div class="progress-bar-wrap" style="height:6px;">
          <div class="progress-bar-fill" style="width:${match}%;background:${colorVar === 'var(--cyan)' ? 'linear-gradient(90deg,var(--cyan),var(--purple))' : colorVar === 'var(--purple)' ? 'linear-gradient(90deg,var(--purple),var(--magenta))' : 'linear-gradient(90deg,var(--magenta),var(--purple))'}"></div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.8px;">Capabilities clave</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${capEntries.map(([cap]) => `<span style="font-size:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:5px;padding:3px 7px;color:rgba(255,255,255,0.55);">${cap}</span>`).join('')}
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.35);">
        <span>Área ${rol.area} · Score ${rol.puntaje}</span>
        <span style="color:${colorVar};font-weight:600;">${rol.nivel}</span>
      </div>
    </div>`;
  }).join('');
}

// ── ASSESSMENT: RENDER PREGUNTA ──
function renderQuestion() {
  const q = questions[state.currentQuestion];
  if (!q) return;

  const total = questions.length;
  const current = state.currentQuestion + 1;
  const progress = (current / total) * 100;

  // Actualizar UI header
  document.getElementById('q-current').textContent = current;
  document.getElementById('q-total').textContent = total;
  document.getElementById('assessment-progress').style.width = `${progress}%`;
  document.getElementById('q-num').textContent = String(current).padStart(2, '0');
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-competencia').textContent = q.competencia;

  // Ocultar feedback
  const feedbackBox = document.getElementById('feedback-box');
  if (feedbackBox) { feedbackBox.style.display = 'none'; feedbackBox.innerHTML = ''; }

  // Render opciones
  const container = document.getElementById('options-container');
  if (!container) return;
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'radio-card';
    div.style.cursor = 'pointer';
    div.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <div style="width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);
                    display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;
                    flex-shrink:0;color:rgba(255,255,255,0.5);">${String.fromCharCode(65+i)}</div>
        <div class="radio-card-label" style="font-size:14px;line-height:1.6;">${opt.text}</div>
      </div>
    `;
    div.addEventListener('click', () => selectAnswer(div, i, opt.correct, q));
    container.appendChild(div);
  });

  // Deshabilitar botón siguiente
  const btnNext = document.getElementById('btn-next-question');
  if (btnNext) btnNext.disabled = true;

  // Capi mensaje
  const capiMsg = document.getElementById('capi-msg');
  const capiMsgs = [
    'Lee con atención y elige la mejor opción. ¡Confía en tu experiencia! 💪',
    'Recuerda: no hay trampa, solo reflexión. ¿Qué harías tú en esta situación?',
    '¡Vas muy bien! Mantén el enfoque 🎯',
    'Esta pregunta es sobre comunicación — un pilar clave del liderazgo.',
    '¡A la mitad del diagnóstico! Tu esfuerzo vale mucho. 🌟',
    'La seguridad y el bienestar siempre van primero en un buen líder.',
    '¡Casi terminamos! Solo un par más. ¡Tú puedes! 🦫',
    '¡Última pregunta! Dalo todo. 🏁'
  ];
  if (capiMsg) capiMsg.innerHTML = capiMsgs[state.currentQuestion] || capiMsgs[0];
}

// ── ASSESSMENT: SELECCIONAR RESPUESTA ──
function selectAnswer(element, index, isCorrect, q) {
  // Verificar si ya respondió
  const container = document.getElementById('options-container');
  if (container.dataset.answered === 'true') return;
  container.dataset.answered = 'true';

  // Deshabilitar todas las opciones
  container.querySelectorAll('.radio-card').forEach((card, i) => {
    card.style.cursor = 'default';
    if (q.options[i].correct) {
      card.style.borderColor = '#00ff88';
      card.style.background = 'rgba(0,255,136,0.1)';
    }
  });

  if (isCorrect) {
    element.style.borderColor = '#00ff88';
    element.style.background = 'rgba(0,255,136,0.15)';
    const pts = 100;
    state.assessmentPts += pts;
    state.assessmentScore++;
    document.getElementById('assessment-pts').textContent = state.assessmentPts;
    showToast('✅ ¡Correcto! +100 pts', 'success');
    showFloatingPoints(pts);

    const feedback = document.getElementById('feedback-box');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(0,255,136,0.08)';
      feedback.style.border = '1px solid rgba(0,255,136,0.3)';
      feedback.innerHTML = `<div style="display:flex;gap:10px;"><span style="font-size:18px;">✅</span><p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.85);">${q.feedback_correct}</p></div>`;
    }
  } else {
    element.style.borderColor = 'var(--magenta)';
    element.style.background = 'rgba(248,0,250,0.1)';
    showToast('❌ Respuesta incorrecta', 'error');

    const feedback = document.getElementById('feedback-box');
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.background = 'rgba(248,0,250,0.06)';
      feedback.style.border = '1px solid rgba(248,0,250,0.3)';
      feedback.innerHTML = `<div style="display:flex;gap:10px;"><span style="font-size:18px;">📚</span><p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,0.85);">${q.feedback_wrong}</p></div>`;
    }
  }

  state.answers.push({ question: q, correct: isCorrect, selectedIndex: index });

  // Habilitar botón siguiente
  const btnNext = document.getElementById('btn-next-question');
  if (btnNext) {
    btnNext.disabled = false;
    if (state.currentQuestion >= questions.length - 1) {
      btnNext.textContent = '';
      btnNext.innerHTML = 'Ver mi Informe <i class="fas fa-chart-bar"></i>';
    }
  }
}

// ── ASSESSMENT: SIGUIENTE PREGUNTA ──
function nextQuestion() {
  const container = document.getElementById('options-container');
  if (container) delete container.dataset.answered;

  state.currentQuestion++;
  if (state.currentQuestion >= questions.length) {
    navigate('screen-resultados');
  } else {
    renderQuestion();
  }
}

// ── UTILIDAD: calcular scores por capability desde respuestas ──
function getCapabilityScores() {
  // Correct = 2.0 (Competent), Incorrect = 1.0 (Advanced Beginner), per Dreyfus scale
  const scores = {};
  CAPS.forEach((cap, i) => {
    const ans = state.answers.find(a => a.question.capability === cap);
    scores[cap] = ans ? (ans.correct ? 2.0 : 1.0) : 1.0;
  });
  return scores;
}

function getRequiredScores() {
  const rol = state.roleName ? rolesData[state.roleName] : rolesData['Supervisor de Distribución'];
  const scores = {};
  CAPS.forEach(cap => {
    scores[cap] = rol.capabilities[cap]?.puntaje || 1.8;
  });
  return scores;
}

function getDreyfusLabel(score) {
  if (score >= 2.5) return { label: 'Proficiente', color: '#00d8da' };
  if (score >= 2.0) return { label: 'Competente', color: '#00ff88' };
  if (score >= 1.5) return { label: 'Avanzado Principiante', color: 'orange' };
  return { label: 'Novato', color: 'var(--magenta)' };
}

const capIcons = {
  'MBWA': '👁️',
  'Gestión de Equipos': '👥',
  'Gestión por sistemas': '⚙️',
  'Toma de Decisiones': '🎯',
  'Grit (resilencia + empuje)': '💪',
  'Orientación a datos': '📊',
  'Resolución de problemas': '🔍',
  'Mejora continua': '🔄'
};

// ── GRÁFICAS: RESULTADOS ──
function initResultadosCharts() {
  const userScores = getCapabilityScores();
  const reqScores  = getRequiredScores();

  const correctCount = state.answers.filter(a => a.correct).length;
  const totalQ = questions.length;
  const pct = Math.round((correctCount / totalQ) * 100);

  // Dreyfus level del candidato
  const avgScore = Object.values(userScores).reduce((s, v) => s + v, 0) / CAPS.length;
  const { label: dreyfusLabel } = getDreyfusLabel(avgScore);

  // Destroy existing charts if re-entering
  ['donut-score','radar-competencias'].forEach(id => {
    const el = document.getElementById(id);
    if (el?._chart) { el._chart.destroy(); el._chart = null; }
  });

  // Donut — % correcto
  const donutCtx = document.getElementById('donut-score');
  if (donutCtx) {
    donutCtx._chart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [pct, 100 - pct],
          backgroundColor: ['#00d8da', 'rgba(255,255,255,0.06)'],
          borderColor: ['#00d8da', 'rgba(255,255,255,0.04)'],
          borderWidth: 2, hoverOffset: 4
        }]
      },
      options: {
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 1200, easing: 'easeInOutQuart' }
      }
    });
    // Update the score text overlaid on donut
    const overlay = donutCtx.parentElement?.querySelector('.donut-overlay-score');
    if (overlay) { overlay.innerHTML = `<span style="font-size:36px;font-weight:900;color:var(--cyan);">${pct}%</span>`; }
  }

  // Radar — usuario vs. rol requerido (escala 0–3)
  const radarCtx = document.getElementById('radar-competencias');
  if (radarCtx) {
    const shortLabels = CAPS.map(c => c.split(' ').slice(0, 2).join(' '));
    radarCtx._chart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: shortLabels,
        datasets: [{
          label: 'Tu nivel actual',
          data: CAPS.map(c => userScores[c]),
          borderColor: '#00d8da',
          backgroundColor: 'rgba(0,216,218,0.13)',
          borderWidth: 2,
          pointBackgroundColor: '#00d8da',
          pointRadius: 5
        }, {
          label: `Requerido: ${state.roleName || 'Rol seleccionado'}`,
          data: CAPS.map(c => reqScores[c]),
          borderColor: 'rgba(117,114,233,0.7)',
          backgroundColor: 'rgba(117,114,233,0.07)',
          borderWidth: 1.5,
          borderDash: [5, 3],
          pointBackgroundColor: '#7572e9',
          pointRadius: 3
        }]
      },
      options: {
        scales: {
          r: {
            min: 0, max: 3,
            ticks: { display: false, stepSize: 1 },
            grid: { color: 'rgba(255,255,255,0.08)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: { color: 'rgba(255,255,255,0.65)', font: { size: 11, family: 'Outfit' } }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.5)', font: { size: 11, family: 'Outfit' }, boxWidth: 14 }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const v = ctx.raw;
                const lvl = getDreyfusLabel(v).label;
                return ` ${ctx.dataset.label}: ${v.toFixed(1)} (${lvl})`;
              }
            }
          }
        },
        animation: { duration: 1200 }
      }
    });
  }

  // Update dynamic elements in results screen
  const overlay = document.getElementById('donut-overlay');
  if (overlay) overlay.innerHTML = `<span style="font-size:36px;font-weight:900;color:var(--cyan);">${pct}%</span><span style="font-size:11px;color:rgba(255,255,255,0.4);">Puntaje Global</span>`;
  const dreyfusBadge = document.getElementById('dreyfus-badge');
  if (dreyfusBadge) dreyfusBadge.innerHTML = `🔶 ${dreyfusLabel}`;

  renderDesglose();
}

// ── DESGLOSE POR CAPABILITY ──
function renderDesglose() {
  const container = document.getElementById('desglose-items');
  if (!container) return;

  const userScores = getCapabilityScores();
  const reqScores  = getRequiredScores();
  const rolNombre  = state.roleName || 'el rol seleccionado';

  // Sort: biggest gap first
  const items = CAPS.map(cap => {
    const user = userScores[cap];
    const req  = reqScores[cap];
    const gap  = req - user;
    return { cap, user, req, gap };
  }).sort((a, b) => b.gap - a.gap);

  container.innerHTML = items.map(({ cap, user, req, gap }) => {
    const { label, color } = getDreyfusLabel(user);
    const reqPct  = Math.round((req / 3) * 100);
    const userPct = Math.round((user / 3) * 100);
    const hasGap  = gap > 0;
    return `
    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:8px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">${capIcons[cap] || '⚡'}</span>
          <span style="font-size:14px;font-weight:600;">${cap}</span>
          <span class="badge" style="font-size:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:${color};">${label}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;font-size:12px;">
          <span style="color:${color};font-weight:700;">${user.toFixed(1)}</span>
          <span style="color:rgba(255,255,255,0.3);">vs</span>
          <span style="color:rgba(117,114,233,0.8);font-weight:600;">${req.toFixed(1)} req.</span>
          ${hasGap ? `<span style="color:var(--magenta);font-size:11px;font-weight:700;">−${gap.toFixed(1)} brecha</span>` : `<span style="color:#00ff88;font-size:11px;font-weight:700;">✓ Cumple</span>`}
        </div>
      </div>
      <div style="position:relative;height:10px;background:rgba(255,255,255,0.06);border-radius:10px;overflow:hidden;">
        <div style="position:absolute;left:0;top:0;height:100%;width:${reqPct}%;background:rgba(117,114,233,0.2);border-radius:10px;"></div>
        <div style="position:absolute;left:0;top:0;height:100%;width:${userPct}%;background:${hasGap ? 'linear-gradient(90deg,'+color+',rgba(117,114,233,0.5))' : 'linear-gradient(90deg,#00ff88,var(--cyan))'};border-radius:10px;transition:width 1s ease;"></div>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:4px;text-align:right;">
        Requerido para ${rolNombre.split(' ').slice(0,3).join(' ')}: ${req.toFixed(1)}
      </div>
    </div>`;
  }).join('');
}

// ── GRÁFICAS: DASHBOARD ──
function initDashboardCharts() {
  const userScores = getCapabilityScores();
  const reqScores  = getRequiredScores();
  const shortLabels = CAPS.map(c => c.split(' ').slice(0, 2).join(' '));

  // Convert Dreyfus 0–3 scale → 0–100 for bar chart
  const userPcts = CAPS.map(c => Math.round((userScores[c] / 3) * 100));
  const reqPcts  = CAPS.map(c => Math.round((reqScores[c]  / 3) * 100));

  const correctCount = state.answers.filter(a => a.correct).length;
  const diagScore    = Math.round((correctCount / questions.length) * 100);

  // Destroy on re-entry
  ['progress-bars-chart', 'kirkpatrick-chart'].forEach(id => {
    const el = document.getElementById(id);
    if (el?._chart) { el._chart.destroy(); el._chart = null; }
  });

  // Barras: nivel actual vs. nivel requerido por rol
  const barsCtx = document.getElementById('progress-bars-chart');
  if (barsCtx) {
    barsCtx._chart = new Chart(barsCtx, {
      type: 'bar',
      data: {
        labels: shortLabels,
        datasets: [
          {
            label: 'Tu nivel actual',
            data: userPcts,
            backgroundColor: 'rgba(0,216,218,0.25)',
            borderColor: '#00d8da',
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: `Requerido: ${state.roleName ? state.roleName.split(' ').slice(0, 3).join(' ') : 'Rol seleccionado'}`,
            data: reqPcts,
            backgroundColor: 'rgba(117,114,233,0.25)',
            borderColor: '#7572e9',
            borderWidth: 1.5,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 11, family: 'Outfit' } },
            grid: { color: 'rgba(255,255,255,0.04)' }
          },
          y: {
            min: 0, max: 100,
            ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        },
        plugins: {
          legend: {
            labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11, family: 'Outfit' }, boxWidth: 14 }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const v = ctx.raw;
                const dreyfus = getDreyfusLabel(v / 100 * 3).label;
                return ` ${ctx.dataset.label}: ${v}% (${dreyfus})`;
              }
            }
          }
        },
        animation: { duration: 1000 }
      }
    });
  }

  // Kirkpatrick — nivel 2 refleja el diagnóstico real
  const kirkCtx = document.getElementById('kirkpatrick-chart');
  if (kirkCtx) {
    kirkCtx._chart = new Chart(kirkCtx, {
      type: 'bar',
      data: {
        labels: ['Nivel 1\nReacción', 'Nivel 2\nAprendizaje', 'Nivel 3\nAplicación', 'Nivel 4\nResultados'],
        datasets: [
          {
            label: 'Diagnóstico inicial',
            data: [0, diagScore, 0, 0],
            backgroundColor: 'rgba(248,0,250,0.3)',
            borderColor: '#F800fa',
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: 'Proyección al finalizar',
            data: [85, Math.min(95, diagScore + 20), 75, 70],
            backgroundColor: 'rgba(0,216,218,0.25)',
            borderColor: '#00d8da',
            borderWidth: 1.5,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10, family: 'Outfit' } },
            grid: { display: false }
          },
          y: {
            min: 0, max: 100,
            ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        },
        plugins: {
          legend: {
            labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11, family: 'Outfit' }, boxWidth: 14 }
          }
        },
        animation: { duration: 1200, delay: 200 }
      }
    });
  }
}

// ── QUIZ EN MÓDULO ──
function checkQuiz(element, isCorrect) {
  const container = document.getElementById('quiz-opts');
  if (!container || container.dataset.answered === 'true') return;
  container.dataset.answered = 'true';

  container.querySelectorAll('.radio-card').forEach(c => { c.style.cursor = 'default'; });

  if (isCorrect) {
    element.style.borderColor = '#00ff88';
    element.style.background = 'rgba(0,255,136,0.15)';
    showToast('✅ ¡Correcto! Aplicarías S2: Entrenar. +50 pts', 'success');
    showFloatingPoints(50);
  } else {
    element.style.borderColor = 'var(--magenta)';
    element.style.background = 'rgba(248,0,250,0.1)';
    const opts = container.querySelectorAll('.radio-card');
    if (opts[1]) {
      opts[1].style.borderColor = '#00ff88';
      opts[1].style.background = 'rgba(0,255,136,0.08)';
    }
    showToast('La respuesta correcta es S2: Entrenar', 'error');
  }
}

// ── NPS ──
function selectNPS(btn) {
  document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected-nps'));
  btn.classList.add('selected-nps');
  const val = parseInt(btn.dataset.v);
  let msg = val >= 9 ? '¡Gracias! Tu feedback nos impulsa 🚀' : val >= 7 ? '¡Gracias por tu valoración! 👍' : '¡Gracias! Trabajaremos para mejorar.';
  showToast(msg, 'success');
}

// ── COMPARTIR REPORTE ──
function shareReport() {
  navigator.clipboard?.writeText('https://selfsci.app/reporte/ana-garcia-2025').then(() => {
    showToast('🔗 Enlace del reporte copiado al portapapeles', 'success');
  }).catch(() => {
    showToast('🔗 Liga generada: selfsci.app/reporte/ana-garcia-2025', 'info');
  });
}

// ── COMPARTIR LINKEDIN ──
function shareLinkedIn() {
  const text = encodeURIComponent('¡Completé mi programa de desarrollo profesional "Supervisión de Producción de Alto Rendimiento" con SELF SCI! 🎓 40 horas de capacitación, nivel Competente alcanzado. #SELFSCI #DesarrolloProfesional #Liderazgo');
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://selfsci.app/diploma/SCI-2025-4821')}&summary=${text}`, '_blank');
  showToast('🔗 Abriendo LinkedIn...', 'info');
}

// ── TOAST ──
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── FLOATING POINTS ──
function showFloatingPoints(pts) {
  const popup = document.createElement('div');
  popup.className = 'points-popup';
  popup.textContent = `+${pts} pts ⭐`;
  popup.style.top = '120px';
  popup.style.right = '24px';
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1300);
}

// ── PUNTOS POP EN DASHBOARD ──
function showPtsPopup() {
  const popup = document.getElementById('pts-popup');
  if (popup) {
    popup.style.display = 'block';
    popup.style.top = '120px';
    popup.style.right = '24px';
    setTimeout(() => { popup.style.display = 'none'; }, 1400);
  }
}

// ── CARD INTERACTIVITY: radio-cards ──
document.addEventListener('click', function(e) {
  const card = e.target.closest('.radio-card');
  if (!card) return;
  const group = card.parentElement;
  const radios = group.querySelectorAll('input[type="radio"]');
  if (radios.length > 0) {
    const name = radios[0]?.name;
    if (name) {
      document.querySelectorAll(`.radio-card input[name="${name}"]`).forEach(r => {
        r.closest('.radio-card').classList.remove('selected');
      });
    } else {
      group.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
    }
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }
});

// ══════════════════════════════════════════════════
//  ADMIN — Funciones de la sección de administración
// ══════════════════════════════════════════════════

// ── Tab switching (Config Empresa) ──
function showConfigTab(tabId, btn) {
  document.querySelectorAll('.config-tab-content').forEach(t => { t.style.display = 'none'; });
  document.querySelectorAll('.config-tab').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = 'rgba(255,255,255,0.5)';
  });
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.style.display = 'block';
  if (btn) {
    btn.style.background = 'linear-gradient(135deg,var(--cyan),var(--purple))';
    btn.style.color = 'white';
  }
  if (tabId === 'participantes')  renderTablaParticipantes();
  if (tabId === 'modulos-config') renderModulosConfig();
  if (tabId === 'sesiones-sync')  renderSesionesSync();
}

// ── Toggle forms ──
function toggleNuevoUsuario() {
  const f = document.getElementById('form-nuevo-usuario');
  if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
}
function toggleNewEmpresa() {
  const f = document.getElementById('form-nueva-empresa');
  if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

// ── Mock data ──
const mockParticipantes = [
  { nombre:'Ana García',       correo:'ana.garcia@manufactura.mx',  rol:'Participante',     avance:88, estado:'Activo'   },
  { nombre:'Carlos Méndez',    correo:'c.mendez@manufactura.mx',    rol:'Líder / Manager',  avance:65, estado:'Activo'   },
  { nombre:'Laura Torres',     correo:'l.torres@manufactura.mx',    rol:'Participante',     avance:42, estado:'Activo'   },
  { nombre:'Roberto Silva',    correo:'r.silva@manufactura.mx',     rol:'RH',               avance:95, estado:'Activo'   },
  { nombre:'María López',      correo:'m.lopez@manufactura.mx',     rol:'Participante',     avance:71, estado:'Activo'   },
  { nombre:'José Hernández',   correo:'j.hernandez@manufactura.mx', rol:'Participante',     avance:30, estado:'Inactivo' },
  { nombre:'Sofía Ramírez',    correo:'s.ramirez@manufactura.mx',   rol:'Participante',     avance:58, estado:'Activo'   },
  { nombre:'Diego Castillo',   correo:'d.castillo@manufactura.mx',  rol:'Líder / Manager',  avance:80, estado:'Activo'   },
];

const mockModulosConfig = [
  { nombre:'Liderazgo Operativo',        icono:'⚡', semana:'Semana 1–2',   duracion:'4 horas',   obligatorio:true,  activo:true  },
  { nombre:'Gestión de Equipos',         icono:'👥', semana:'Semana 3–4',   duracion:'3 horas',   obligatorio:true,  activo:true  },
  { nombre:'KPIs y Métricas',            icono:'📊', semana:'Semana 5–6',   duracion:'3.5 horas', obligatorio:true,  activo:true  },
  { nombre:'Comunicación Efectiva',      icono:'💬', semana:'Semana 7–8',   duracion:'2.5 horas', obligatorio:false, activo:true  },
  { nombre:'Bienestar Laboral (NOM-035)',icono:'🧘', semana:'Semana 9–10',  duracion:'2 horas',   obligatorio:true,  activo:true  },
  { nombre:'Seguridad e Higiene',        icono:'🦺', semana:'Semana 11–12', duracion:'3 horas',   obligatorio:false, activo:false },
];

const mockSesiones = [
  { titulo:'Kick-off del programa',      tipo:'Zoom',       fecha:'16 Abr 2025', hora:'10:00 AM', duracion:'90 min',  facilitador:'Dr. Santiago Rueda', inscritos:48, max:50 },
  { titulo:'Taller: Liderazgo en acción',tipo:'Teams',      fecha:'30 Abr 2025', hora:'3:00 PM',  duracion:'120 min', facilitador:'Lic. Andrea Mora',   inscritos:32, max:40 },
  { titulo:'Cierre y diplomas',          tipo:'Presencial', fecha:'10 Jul 2025', hora:'9:00 AM',  duracion:'180 min', facilitador:'Equipo SELF SCI',     inscritos:0,  max:50 },
];

const mockModulosGrid = [
  { nombre:'Liderazgo Operativo',  icono:'⚡', nivel:'Nivel 1 — Novato',       temas:['Gestión del turno','Delegación','Resolución de problemas'], duracion:'4h',   activos:3 },
  { nombre:'Gestión de Equipos',   icono:'👥', nivel:'Nivel 2 — Principiante', temas:['Comunicación','Retroalimentación','Trabajo en equipo'],     duracion:'3h',   activos:2 },
  { nombre:'KPIs y Métricas',      icono:'📊', nivel:'Nivel 2 — Principiante', temas:['OEE','Productividad','Análisis de datos'],                  duracion:'3.5h', activos:2 },
  { nombre:'Comunicación Efectiva',icono:'💬', nivel:'Nivel 3 — Competente',   temas:['Escucha activa','Negociación','Presentaciones'],            duracion:'2.5h', activos:1 },
  { nombre:'Bienestar Laboral',    icono:'🧘', nivel:'Nivel 3 — Competente',   temas:['NOM-035','Manejo del estrés','PERMA'],                      duracion:'2h',   activos:1 },
  { nombre:'Seguridad e Higiene',  icono:'🦺', nivel:'Nivel 4 — Avanzado',     temas:['Normas STPS','Riesgos laborales','Planes de emergencia'],   duracion:'3h',   activos:0 },
];

const mockPermisos = [
  { func:'Ver mi propio dashboard',         admin:true,  rh:true,  manager:true,  empleado:true  },
  { func:'Ver dashboard del equipo',        admin:true,  rh:true,  manager:true,  empleado:false },
  { func:'Ver resultados globales',         admin:true,  rh:true,  manager:false, empleado:false },
  { func:'Exportar reportes',              admin:true,  rh:true,  manager:false, empleado:false },
  { func:'Agregar / editar participantes', admin:true,  rh:true,  manager:false, empleado:false },
  { func:'Configurar módulos del programa',admin:true,  rh:false, manager:false, empleado:false },
  { func:'Ver rutas de aprendizaje',        admin:true,  rh:true,  manager:true,  empleado:true  },
  { func:'Completar módulos',              admin:false, rh:true,  manager:true,  empleado:true  },
  { func:'Obtener y ver diploma',          admin:false, rh:true,  manager:true,  empleado:true  },
  { func:'Acceso al panel de administración',admin:true, rh:false, manager:false, empleado:false },
  { func:'Invitar participantes por email', admin:true,  rh:true,  manager:false, empleado:false },
  { func:'Ver sesiones síncronas',          admin:true,  rh:true,  manager:true,  empleado:true  },
];

// ── Render: Tabla de participantes ──
function renderTablaParticipantes() {
  const tbody = document.getElementById('tabla-participantes');
  if (!tbody) return;
  tbody.innerHTML = mockParticipantes.map(p => {
    const colorAvance = p.avance >= 80 ? 'var(--cyan)' : p.avance >= 50 ? 'var(--purple)' : 'orange';
    return `
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
      <td style="padding:12px 16px;font-weight:600;">${p.nombre}</td>
      <td style="padding:12px 16px;color:rgba(255,255,255,0.45);font-size:12px;">${p.correo}</td>
      <td style="text-align:center;padding:12px 16px;">
        <span style="font-size:11px;background:rgba(117,114,233,0.12);color:var(--purple);border:1px solid rgba(117,114,233,0.3);border-radius:6px;padding:3px 8px;">${p.rol}</span>
      </td>
      <td style="padding:12px 16px;min-width:130px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="progress-bar-wrap" style="flex:1;height:5px;"><div class="progress-bar-fill" style="width:${p.avance}%;background:linear-gradient(90deg,${colorAvance},var(--purple));"></div></div>
          <span style="font-size:12px;color:${colorAvance};min-width:28px;">${p.avance}%</span>
        </div>
      </td>
      <td style="text-align:center;padding:12px 16px;">
        <span class="badge ${p.estado === 'Activo' ? 'badge-green' : 'badge-orange'}">${p.estado}</span>
      </td>
      <td style="text-align:center;padding:12px 16px;">
        <div style="display:flex;gap:6px;justify-content:center;">
          <button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:11px;" onclick="showToast('✏️ Editando a ${p.nombre.split(' ')[0]}','info')"><i class="fas fa-pen"></i></button>
          <button class="btn btn-sm" style="padding:4px 10px;font-size:11px;background:rgba(0,216,218,0.1);border:1px solid rgba(0,216,218,0.3);color:var(--cyan);" onclick="showToast('📧 Invitación enviada a ${p.nombre.split(' ')[0]}','success')"><i class="fas fa-envelope"></i></button>
          <button class="btn btn-sm" style="padding:4px 10px;font-size:11px;background:rgba(248,0,250,0.08);border:1px solid rgba(248,0,250,0.25);color:var(--magenta);" onclick="showToast('🗑️ Participante eliminado','info')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ── Render: Lista de módulos con tiempos ──
function renderModulosConfig() {
  const container = document.getElementById('modulos-config-list');
  if (!container) return;
  container.innerHTML = mockModulosConfig.map((m, i) => `
    <div class="card" style="padding:16px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="width:44px;height:44px;border-radius:10px;background:rgba(0,216,218,0.09);border:1px solid rgba(0,216,218,0.2);display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0;">${m.icono}</div>
      <div style="flex:1;min-width:150px;">
        <div style="font-weight:700;margin-bottom:2px;">${m.nombre}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.4);">${m.duracion} · ${m.obligatorio ? '<span style="color:var(--magenta);">Obligatorio</span>' : '<span style="color:rgba(255,255,255,0.3);">Opcional</span>'}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;min-width:220px;">
        <label style="font-size:12px;color:rgba(255,255,255,0.4);white-space:nowrap;"><i class="fas fa-calendar-days" style="margin-right:4px;color:var(--cyan);"></i>Disponible:</label>
        <input class="form-input" value="${m.semana}" style="font-size:12px;padding:7px 10px;width:130px;" onchange="showToast('📅 Fecha actualizada','info')"/>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:12px;color:rgba(255,255,255,0.4);">Activo</span>
        <div style="position:relative;width:42px;height:24px;cursor:pointer;" onclick="this.dataset.on=this.dataset.on==='1'?'0':'1';this.querySelector('.toggle-knob').style.left=this.dataset.on==='1'?'20px':'3px';this.querySelector('.toggle-track').style.background=this.dataset.on==='1'?'var(--cyan)':'rgba(255,255,255,0.1)';showToast(this.dataset.on==='1'?'✅ Módulo activado':'⏸️ Módulo desactivado','info');" data-on="${m.activo ? '1' : '0'}">
          <div class="toggle-track" style="position:absolute;inset:0;border-radius:24px;background:${m.activo ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'};transition:0.3s;"></div>
          <div class="toggle-knob" style="position:absolute;width:18px;height:18px;background:white;border-radius:50%;top:3px;left:${m.activo ? '20px' : '3px'};transition:0.3s;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" style="font-size:12px;padding:7px 14px;" onclick="showToast('📋 Config avanzada: ${m.nombre}','info')">
        <i class="fas fa-sliders"></i> Detalles
      </button>
    </div>
  `).join('');
}

// ── Render: Sesiones síncronas ──
function renderSesionesSync() {
  const container = document.getElementById('sesiones-sync-list');
  if (!container) return;
  const iconoTipo = { 'Zoom':'🎥', 'Teams':'💼', 'Presencial':'🏢' };
  container.innerHTML = mockSesiones.map(s => `
    <div class="card" style="padding:18px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;border-color:rgba(0,216,218,0.12);">
      <div style="width:48px;height:48px;border-radius:12px;background:rgba(0,216,218,0.09);border:1px solid rgba(0,216,218,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${iconoTipo[s.tipo] || '📅'}</div>
      <div style="flex:1;min-width:160px;">
        <div style="font-weight:700;margin-bottom:3px;">${s.titulo}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.4);">${s.facilitador} · <span style="color:var(--cyan);">${s.tipo}</span></div>
      </div>
      <div style="text-align:center;min-width:110px;">
        <div style="font-size:13px;font-weight:700;">${s.fecha}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.4);">${s.hora} · ${s.duracion}</div>
      </div>
      <div style="text-align:center;min-width:70px;">
        <div style="font-size:15px;font-weight:700;color:var(--purple);">${s.inscritos}/${s.max}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">inscritos</div>
      </div>
      <div style="display:flex;gap:6px;flex-shrink:0;">
        <button class="btn btn-outline btn-sm" style="font-size:12px;padding:6px 10px;" onclick="showToast('🔗 Liga copiada al portapapeles','success')" title="Copiar liga"><i class="fas fa-link"></i></button>
        <button class="btn btn-outline btn-sm" style="font-size:12px;padding:6px 10px;" onclick="showToast('✏️ Editando sesión','info')" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="btn btn-sm" style="font-size:12px;padding:6px 10px;background:rgba(248,0,250,0.08);border:1px solid rgba(248,0,250,0.25);color:var(--magenta);" onclick="showToast('🗑️ Sesión eliminada','info')" title="Eliminar"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

// ── Render: Grid de módulos (biblioteca) ──
function renderModulosGrid() {
  const container = document.getElementById('modulos-grid');
  if (!container) return;
  container.innerHTML = mockModulosGrid.map(m => `
    <div class="card" style="border-color:rgba(0,216,218,0.14);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;">
        <div style="width:46px;height:46px;border-radius:11px;background:rgba(0,216,218,0.09);border:1px solid rgba(0,216,218,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;">${m.icono}</div>
        <span style="font-size:10px;font-weight:700;background:rgba(117,114,233,0.1);color:var(--purple);border:1px solid rgba(117,114,233,0.25);border-radius:6px;padding:3px 8px;">${m.nivel}</span>
      </div>
      <h3 style="font-weight:700;margin-bottom:8px;font-size:15px;">${m.nombre}</h3>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px;">
        ${m.temas.map(t => `<span style="font-size:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:6px;padding:3px 8px;color:rgba(255,255,255,0.55);">${t}</span>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:16px;">
        <span><i class="fas fa-clock" style="color:var(--cyan);margin-right:4px;"></i>${m.duracion}</span>
        <span><i class="fas fa-building" style="color:var(--purple);margin-right:4px;"></i>${m.activos} empresa${m.activos !== 1 ? 's' : ''}</span>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-outline btn-sm" style="flex:1;font-size:12px;" onclick="showToast('✏️ Editando: ${m.nombre}','info')"><i class="fas fa-pen"></i> Editar</button>
        <button class="btn btn-primary btn-sm" style="flex:1;font-size:12px;" onclick="showToast('📋 Módulo duplicado','success')"><i class="fas fa-copy"></i> Duplicar</button>
      </div>
    </div>
  `).join('');
}

// ── Render: Matriz de permisos ──
function renderPermisosTabla() {
  const tbody = document.getElementById('permisos-tabla');
  if (!tbody) return;
  const roles = ['admin','rh','manager','empleado'];
  tbody.innerHTML = mockPermisos.map((p, i) => `
    <tr style="border-bottom:1px solid rgba(255,255,255,0.04);${i % 2 === 0 ? '' : 'background:rgba(255,255,255,0.015);'}">
      <td style="padding:13px 16px;font-size:13px;color:rgba(255,255,255,0.8);">${p.func}</td>
      ${roles.map(rol => `
        <td style="text-align:center;padding:13px 16px;">
          <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;">
            <input type="checkbox" ${p[rol] ? 'checked' : ''}
              style="width:16px;height:16px;accent-color:var(--cyan);cursor:pointer;"
              onchange="showToast('🔐 Permiso actualizado','info')"/>
          </label>
        </td>
      `).join('')}
    </tr>
  `).join('');
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  console.log('🦫 SELF SCI Demo loaded!');
  // Asegurar que la landing sea la pantalla inicial
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const landing = document.getElementById('screen-landing');
  if (landing) landing.classList.add('active');
});
