/* =============================================
   SELF SCI DEMO — App Logic
   ============================================= */

// ── ESTADO GLOBAL ──
const state = {
  currentScreen: 'screen-login',
  rolSelected: null,
  assessmentScore: 0,
  assessmentPts: 0,
  currentQuestion: 0,
  answers: [],
  npsValue: null
};

// ── PREGUNTAS DEL ASSESSMENT ──
const questions = [
  {
    id: 1,
    competencia: 'Liderazgo Operativo',
    text: 'Tu línea tiene un retraso del 15% en el turno actual. El operador clave reporta fallas intermitentes en la máquina principal. ¿Cuál es tu primera acción?',
    options: [
      { text: 'Esperar a que el operador resuelva el problema por su cuenta.', correct: false },
      { text: 'Notificar a mantenimiento, reasignar al operador y registrar el incidente.', correct: true },
      { text: 'Reportar el retraso a tu jefe sin tomar ninguna acción inmediata.', correct: false },
      { text: 'Detener completamente la línea hasta resolver la falla.', correct: false }
    ],
    feedback_correct: '¡Correcto! 🎯 La acción simultánea de resolver el problema técnico, reasignar al operador y documentar el incidente es la respuesta más efectiva. Esto refleja liderazgo proactivo y gestión de contingencias.',
    feedback_wrong: '📚 La respuesta correcta era: Notificar a mantenimiento, reasignar al operador y registrar el incidente. Un líder efectivo actúa en paralelo: resuelve el problema técnico, gestiona a las personas y documenta para el análisis posterior.'
  },
  {
    id: 2,
    competencia: 'Gestión de Equipos',
    text: 'Dos operadores de tu turno tienen un conflicto personal que está afectando el ambiente laboral. ¿Cómo lo gestionas?',
    options: [
      { text: 'Ignorarlo y esperar que se resuelva solo.', correct: false },
      { text: 'Llamar a cada uno por separado, escuchar ambas perspectivas y llegar a un acuerdo.', correct: true },
      { text: 'Amenazar con cambiarlos de turno si no se arreglan.', correct: false },
      { text: 'Reportarlo directamente a Recursos Humanos sin intervenir.', correct: false }
    ],
    feedback_correct: '¡Excelente! 🌟 La mediación activa —escuchar a ambas partes por separado y facilitar un acuerdo— es el enfoque más efectivo de liderazgo situacional para resolver conflictos.',
    feedback_wrong: '📚 Lo ideal es escuchar a cada persona de forma individual antes de cualquier confrontación conjunta. Esto reduce la tensión y permite entender el origen real del conflicto.'
  },
  {
    id: 3,
    competencia: 'KPIs y Métricas',
    text: '¿Cuál de los siguientes indicadores te permite identificar de manera más directa la eficiencia global de tu línea de producción?',
    options: [
      { text: 'Número de operadores presentes en el turno.', correct: false },
      { text: 'OEE (Overall Equipment Effectiveness).', correct: true },
      { text: 'Horas extras utilizadas en el mes.', correct: false },
      { text: 'Temperatura ambiente del área de trabajo.', correct: false }
    ],
    feedback_correct: '✅ Correcto. El OEE integra disponibilidad, rendimiento y calidad, siendo el indicador más completo para evaluar la eficiencia operativa de una línea.',
    feedback_wrong: '📚 El OEE (Overall Equipment Effectiveness) es el estándar internacional para medir eficiencia en manufactura, ya que integra tres dimensiones clave: disponibilidad del equipo, rendimiento y calidad del producto.'
  },
  {
    id: 4,
    competencia: 'Comunicación Efectiva',
    text: 'Al inicio del turno, ¿cuál es la forma más efectiva de asegurarte que tu equipo entendió los objetivos del día?',
    options: [
      { text: 'Publicar los objetivos en el tablero del área y asumir que los leyeron.', correct: false },
      { text: 'Enviar un mensaje de WhatsApp con los objetivos.', correct: false },
      { text: 'Realizar una reunión breve de 5 minutos, comunicar objetivos y pedir confirmación de comprensión.', correct: true },
      { text: 'Confiar en que el turno anterior les transmitió la información.', correct: false }
    ],
    feedback_correct: '🎯 Exacto. Las reuniones de arranque de turno ("stand-up" o "daily brief") son una práctica de liderazgo efectiva que asegura alineación, permite resolver dudas y activa al equipo.',
    feedback_wrong: '📚 La comunicación bidireccional cara a cara (aunque breve) es la más efectiva para asegurar comprensión real. Publicar información o depender de terceros genera brechas de comunicación.'
  },
  {
    id: 5,
    competencia: 'Toma de Decisiones',
    text: 'Al finalizar el turno, tu línea quedó al 88% de la meta. Tu jefe te pregunta la causa. ¿Qué haces?',
    options: [
      { text: 'Explicar que fue por factores externos fuera de tu control.', correct: false },
      { text: 'Presentar un análisis de causa raíz con datos concretos y las acciones que tomarás.', correct: true },
      { text: 'Prometer que mañana se cumplirá sin más explicaciones.', correct: false },
      { text: 'Culpar al turno anterior por el retraso acumulado.', correct: false }
    ],
    feedback_correct: '💪 ¡Correcto! Un líder basado en datos presenta hechos, identifica causas raíz y propone soluciones concretas. Esto construye credibilidad y confianza con la dirección.',
    feedback_wrong: '📚 La respuesta correcta implica presentar datos, análisis de causa raíz y plan de acción. Culpar a factores externos o a terceros sin análisis refleja ausencia de metodología y liderazgo reactivo.'
  },
  {
    id: 6,
    competencia: 'Bienestar y Seguridad',
    text: 'Un operador llega al turno con señales visibles de cansancio extremo. ¿Cuál es tu acción prioritaria?',
    options: [
      { text: 'Ignorarlo y asignarlo a su puesto normal para no afectar la producción.', correct: false },
      { text: 'Hablar con él en privado, evaluar su estado y si hay riesgo, asignarlo a una actividad de menor riesgo o dar intervención médica.', correct: true },
      { text: 'Reportarlo a RH sin hablar con él directamente.', correct: false },
      { text: 'Pedirle que se tome un café y continúe normalmente.', correct: false }
    ],
    feedback_correct: '🌟 Excelente. La seguridad de las personas está siempre por encima de la productividad. Este enfoque está alineado con la NOM-035 sobre factores de riesgo psicosocial.',
    feedback_wrong: '📚 La NOM-035 y las buenas prácticas de liderazgo priorizan el bienestar del trabajador. Asignar a una persona con fatiga extrema a puestos de riesgo puede resultar en accidentes graves.'
  },
  {
    id: 7,
    competencia: 'Mejora Continua',
    text: 'Identificas que un proceso en tu área genera desperdicio de material de forma constante. ¿Qué metodología aplicarías primero?',
    options: [
      { text: 'Ignorarlo si el impacto económico es pequeño.', correct: false },
      { text: '5S para organizar el área.', correct: false },
      { text: 'Análisis de causa raíz con la herramienta 5 Porqués y propuesta de mejora.', correct: true },
      { text: 'Comprar nuevo equipo de producción.', correct: false }
    ],
    feedback_correct: '✅ Correcto. Los 5 Porqués permiten identificar la causa raíz del problema antes de implementar soluciones. Actuar sin conocer la causa raíz puede ser costoso e inefectivo.',
    feedback_wrong: '📚 El análisis de causa raíz (5 Porqués) debe ser el primer paso antes de cualquier solución. El 5S es una buena práctica pero no resuelve problemas de proceso específicos, y comprar equipo nuevo sin diagnóstico es un error costoso.'
  },
  {
    id: 8,
    competencia: 'Desarrollo de Talento',
    text: 'Tienes un operador con alto potencial que ya domina su proceso. Para retenerlo y desarrollarlo, ¿qué harías?',
    options: [
      { text: 'Dejarlo en su puesto actual porque trabaja bien.', correct: false },
      { text: 'Asignarle responsabilidades de formación de nuevos operadores y un plan de desarrollo.', correct: true },
      { text: 'Subirle el sueldo y no hacer nada más.', correct: false },
      { text: 'Esperar a que RH tome la iniciativa.', correct: false }
    ],
    feedback_correct: '🏆 Perfecto. El desarrollo de talento es una responsabilidad del líder directo. Convertir a un operador experto en multiplicador de conocimiento genera valor para toda la organización.',
    feedback_wrong: '📚 Los empleados de alto potencial necesitan retos y planes de desarrollo para no caer en el estancamiento y eventualmente buscar otras oportunidades. El líder directo tiene rol fundamental en esto.'
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
  if (screenId === 'screen-assessment') {
    state.currentQuestion = 0;
    state.assessmentPts = 0;
    state.answers = [];
    renderQuestion();
  }
  if (screenId === 'screen-resultados') {
    setTimeout(initResultadosCharts, 100);
    renderDesglose();
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
  document.querySelectorAll('.rol-card').forEach(c => {
    c.style.borderColor = 'rgba(255,255,255,0.08)';
    c.style.background = 'rgba(255,255,255,0.03)';
  });
  const selected = document.querySelector(`.rol-card[data-rol="${id}"]`);
  if (selected) {
    selected.style.borderColor = 'var(--cyan)';
    selected.style.background = 'rgba(0,216,218,0.08)';
    selected.style.boxShadow = '0 0 20px rgba(0,216,218,0.2)';
  }
  const btn = document.getElementById('btn-iniciar-assessment');
  if (btn) btn.disabled = false;
  showToast('✓ Rol seleccionado — ¡Listo para el diagnóstico!', 'success');
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

// ── GRÁFICAS: RESULTADOS ──
function initResultadosCharts() {
  // Donut score
  const donutCtx = document.getElementById('donut-score');
  if (donutCtx && !donutCtx._chart) {
    donutCtx._chart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [62, 38],
          backgroundColor: ['#00d8da', 'rgba(255,255,255,0.06)'],
          borderColor: ['#00d8da', 'rgba(255,255,255,0.04)'],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { duration: 1200, easing: 'easeInOutQuart' }
      }
    });
  }

  // Radar competencias
  const radarCtx = document.getElementById('radar-competencias');
  if (radarCtx && !radarCtx._chart) {
    radarCtx._chart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Liderazgo', 'Comunicación', 'KPIs', 'Decisiones', 'Bienestar', 'Mejora Continua', 'Talento'],
        datasets: [{
          label: 'Tu nivel actual',
          data: [65, 50, 80, 55, 70, 60, 45],
          borderColor: '#00d8da',
          backgroundColor: 'rgba(0,216,218,0.12)',
          borderWidth: 2,
          pointBackgroundColor: '#00d8da',
          pointRadius: 4
        }, {
          label: 'Nivel esperado del rol',
          data: [85, 80, 85, 80, 80, 75, 75],
          borderColor: 'rgba(117,114,233,0.6)',
          backgroundColor: 'rgba(117,114,233,0.06)',
          borderWidth: 1.5,
          borderDash: [5,3],
          pointBackgroundColor: '#7572e9',
          pointRadius: 3
        }]
      },
      options: {
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false },
            grid: { color: 'rgba(255,255,255,0.08)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: { color: 'rgba(255,255,255,0.6)', font: { size: 11, family: 'Outfit' } }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.5)', font: { size: 11, family: 'Outfit' }, boxWidth: 14 }
          }
        },
        animation: { duration: 1200 }
      }
    });
  }

  renderDesglose();
}

// ── DESGLOSE POR COMPETENCIA ──
function renderDesglose() {
  const container = document.getElementById('desglose-items');
  if (!container) return;

  const items = [
    { name: 'KPIs y Métricas', score: 80, color: '#00d8da', icon: '📊', nivel: 'Bueno' },
    { name: 'Bienestar y Seguridad', score: 70, color: '#00ff88', icon: '🌿', nivel: 'Bueno' },
    { name: 'Liderazgo Operativo', score: 65, color: '#7572e9', icon: '👷', nivel: 'En desarrollo' },
    { name: 'Mejora Continua', score: 60, color: '#F800fa', icon: '🔄', nivel: 'En desarrollo' },
    { name: 'Toma de Decisiones', score: 55, color: 'orange', icon: '🎯', nivel: 'Área de oportunidad' },
    { name: 'Comunicación Efectiva', score: 50, color: 'orange', icon: '💬', nivel: 'Área de oportunidad' },
    { name: 'Desarrollo de Talento', score: 45, color: '#F800fa', icon: '💡', nivel: 'Área de oportunidad' }
  ];

  container.innerHTML = items.map(item => `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span>${item.icon}</span>
          <span style="font-size:14px;font-weight:600;">${item.name}</span>
          <span class="badge" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);font-size:11px;">${item.nivel}</span>
        </div>
        <span style="font-size:16px;font-weight:800;color:${item.color};">${item.score}%</span>
      </div>
      <div class="progress-bar-wrap" style="height:10px;">
        <div style="width:${item.score}%;height:100%;border-radius:10px;background:${item.color};transition:width 1s ease;opacity:0.85;"></div>
      </div>
    </div>
  `).join('');
}

// ── GRÁFICAS: DASHBOARD ──
function initDashboardCharts() {
  // Barras de progreso por competencia
  const barsCtx = document.getElementById('progress-bars-chart');
  if (barsCtx && !barsCtx._chart) {
    barsCtx._chart = new Chart(barsCtx, {
      type: 'bar',
      data: {
        labels: ['Liderazgo', 'Comunicación', 'KPIs', 'Decisiones', 'Bienestar', 'Mejora'],
        datasets: [
          {
            label: 'Pre-diagnóstico',
            data: [65, 50, 80, 55, 70, 60],
            backgroundColor: 'rgba(0,216,218,0.25)',
            borderColor: '#00d8da',
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: 'Post-estimado',
            data: [78, 72, 88, 74, 82, 78],
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
          }
        },
        animation: { duration: 1000 }
      }
    });
  }

  // Kirkpatrick
  const kirkCtx = document.getElementById('kirkpatrick-chart');
  if (kirkCtx && !kirkCtx._chart) {
    kirkCtx._chart = new Chart(kirkCtx, {
      type: 'bar',
      data: {
        labels: ['Nivel 1\nReacción', 'Nivel 2\nAprendizaje', 'Nivel 3\nAplicación', 'Nivel 4\nResultados'],
        datasets: [
          {
            label: 'Inicio del programa',
            data: [0, 62, 0, 0],
            backgroundColor: 'rgba(248,0,250,0.3)',
            borderColor: '#F800fa',
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: 'Proyección al finalizar',
            data: [85, 82, 75, 70],
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
