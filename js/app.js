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

// 61 roles extraídos de "Base de datos Roles Capabillities SCI.xlsx"
const rolesData = {
  "MBL": {
    id:1, area:"Transformation", nivel:"Proficient", puntaje:2.6,
    icono:"🔄", color:"#7572e9",
    descripcion:"Participiante del MBL es un ejeutivo inmerso directa o indirectamente en la cadena de suministro. Idealmente cuenta con experiencia multicultural y en otras compañías/industrias. S",
    capabilities: {
      "MBWA": { puntaje:2.29, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.5, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.6, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.29, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.5, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.29, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.29, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.29, nivel:"Proficient" },
    },
    tags:["Finanzas","Gestión por sistemas","Grit (resilencia + empuje)"]
  },
  "Supervisor de Almacén": {
    id:2, area:"T2", nivel:"Competent", puntaje:1.89,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Planificar, coordinar, estandarizar y medir las operaciones de los almacenes de los CDD (Centros de Distribución), a través del cumplimiento de las políticas y procedimientos estab",
    capabilities: {
      "MBWA": { puntaje:2, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.9, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.8, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.8, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.66, nivel:"Competent" },
      "Mejora continua": { puntaje:1.66, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Management by Walking Around (MBWA)","Gestión de equipos"]
  },
  "Supervisor de Distribución": {
    id:3, area:"T2", nivel:"Competent", puntaje:1.95,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Garantizar el buen servicio y entrega de los productos de la empresa a la totalidad de los clientes, al más bajo costo; con la mayor productividad posible. ",
    capabilities: {
      "MBWA": { puntaje:2, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.1, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.9, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.72, nivel:"Competent" },
      "Mejora continua": { puntaje:1.72, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Customer Centricity","Gestión por sistemas"]
  },
  "Gerente Flota T2": {
    id:4, area:"T2", nivel:"Proficient", puntaje:2.28,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Gestionar de forma efectiva el mantenimiento preventivo, predictivo y correctivo de la flota. Participar de forma activa en la elaboración de presupuestos de garantizar la ejecució",
    capabilities: {
      "MBWA": { puntaje:2.3, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.01, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.5, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.01, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.01, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.01, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.01, nivel:"Proficient" },
    },
    tags:["Grit (resilencia + empuje)","Gestión de interesados","Gestión de flota"]
  },
  "Gerente de Ruteo": {
    id:5, area:"T2", nivel:"Proficient", puntaje:2.38,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Liderar y dirigir la implementación estándar de estrategias de planificación de territorios, rutas y monitoreo de flotas de acuerdo a las políticas definidas para cada región, aseg",
    capabilities: {
      "MBWA": { puntaje:2.4, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.4, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.09, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.6, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.09, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.09, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.09, nivel:"Proficient" },
    },
    tags:["Grit (resilencia + empuje)","Gestión de equipos","Gestión de interesados"]
  },
  "Especialista de Ruteo": {
    id:6, area:"T2", nivel:"Competent", puntaje:2.13,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Planificar las rutas diarias de entrega de los vehículos de distribución de la Región asignada, mediante el uso correcto de la herramienta de ruteo, garantizando el cumplimiento de",
    capabilities: {
      "MBWA": { puntaje:1.87, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.87, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.1, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.87, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.1, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.1, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.87, nivel:"Competent" },
      "Mejora continua": { puntaje:1.87, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Data Driven / Analítico","Ruteo"]
  },
  "Gerente de Monitoreo": {
    id:7, area:"T2", nivel:"Competent", puntaje:2.26,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Garantizar la disponibilidad, confiabilidad y rendimiento óptimo de los sistemas y servicios críticos a través de una supervisión efectiva, coordinación de actividades, gestión de ",
    capabilities: {
      "MBWA": { puntaje:1.99, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.99, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.6, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.4, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:1.99, nivel:"Competent" },
      "Mejora continua": { puntaje:1.99, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Gestión de equipos","Operaciónes de Distribución de T2"]
  },
  "Coordinador de Monitoreo": {
    id:8, area:"T2", nivel:"Competent", puntaje:2.06,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Coordinar las actividades, entrenamientos del equipo de monitoristas safety, productividad, desarrollo; con el objetivo de garantizar los resultados esperados en cada pilar y para ",
    capabilities: {
      "MBWA": { puntaje:1.81, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.1, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.1, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.81, nivel:"Competent" },
      "Mejora continua": { puntaje:1.81, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Data Driven / Analítico","Operaciónes de Distribución de T2"]
  },
  "Especialista de Monitoreo": {
    id:9, area:"T2", nivel:"Competent", puntaje:1.89,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Gestionar alertas de safety y productividad de las unidades de T2 en tiempo real, asegurando la seguridad de los tripulantes; a partir de dar visibilidad de lo que sucede en la cal",
    capabilities: {
      "MBWA": { puntaje:1.66, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.66, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.7, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.66, nivel:"Competent" },
      "Mejora continua": { puntaje:1.66, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Data Driven / Analítico","Ruteo y monitoreo (digital control tower)"]
  },
  "Coordinador de Control T2": {
    id:10, area:"T2", nivel:"Competent", puntaje:2.04,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Controlar las operaciones para la prevención de Pérdidas y dar seguimiento a que se cumplan todos los procesos en el almacén de acuerdo con los establecidos en los padrones de la c",
    capabilities: {
      "MBWA": { puntaje:1.8, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.8, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.1, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.8, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.1, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.9, nivel:"Competent" },
      "Mejora continua": { puntaje:1.8, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Data Driven / Analítico","Pensamiento crítico"]
  },
  "Especialista DRP": {
    id:11, area:"Planning", nivel:"Proficient", puntaje:2.27,
    icono:"📊", color:"#00d8da",
    descripcion:"Mantener el plan de inventario frente a las realidades operativas para generar planes de reubicación que maximicen las ganancias.",
    capabilities: {
      "MBWA": { puntaje:2, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.5, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2.5, nivel:"Proficient" },
      "Mejora continua": { puntaje:2, nivel:"Proficient" },
    },
    tags:["DRP con O9","Orientación a datos","Colaboración"]
  },
  "Gerente - Logística inversa": {
    id:12, area:"Planning", nivel:"Proficient", puntaje:2.37,
    icono:"📊", color:"#00d8da",
    descripcion:"Optimiza los niveles de inventario de empaques para satisfacer la demanda de productos terminados mientras minimizas los costos logísticos, pérdidas e inversión.",
    capabilities: {
      "MBWA": { puntaje:2.09, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.09, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.3, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.3, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.8, nivel:"Expert" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.09, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.3, nivel:"Proficient" },
    },
    tags:["Orientación a datos","Colaboración","Gestión de inventarios"]
  },
  "Especialista - CONA": {
    id:13, area:"Planning", nivel:"Competent", puntaje:2.12,
    icono:"📊", color:"#00d8da",
    descripcion:"Calcula rutas de transferencia óptimas para suministrar producto terminado y mínimos costos teniendo en cuenta los requisitos de distribución y las limitaciones de capacidad al men",
    capabilities: {
      "MBWA": { puntaje:1.87, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.87, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.87, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.87, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.87, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Competent" },
      "Mejora continua": { puntaje:1.87, nivel:"Competent" },
    },
    tags:["Colaboración","Inglés","Orientación a datos"]
  },
  "Especialista - NPI": {
    id:14, area:"Planning", nivel:"Proficient", puntaje:2.31,
    icono:"📊", color:"#00d8da",
    descripcion:"Gestionar y coordinar el proceso de desarrollo y lanzamiento de nuevos productos al mercado de manera eficiente y efectiva,  optimizazando la integración de nuevos productos en la ",
    capabilities: {
      "MBWA": { puntaje:2.03, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.03, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.03, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.03, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.03, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2.03, nivel:"Proficient" },
      "Mejora continua": { puntaje:2, nivel:"Competent" },
    },
    tags:["Colaboración","Inglés","Orientación a datos"]
  },
  "Especialista - MRP Táctico": {
    id:15, area:"Planning", nivel:"Proficient", puntaje:2.19,
    icono:"📊", color:"#00d8da",
    descripcion:"\"Optimiza los niveles de inventario de materiales para cumplir con la  demanda de productos terminados,  Se centra en la estrategia y en la alineación de los recursos de la empresa",
    capabilities: {
      "MBWA": { puntaje:1.93, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:1.93, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:1.93, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:1.93, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.93, nivel:"Proficient" },
      "Mejora continua": { puntaje:1.93, nivel:"Proficient" },
    },
    tags:["Colaboración","Inglés","Orientación a datos"]
  },
  "Especialista - WSNP": {
    id:16, area:"Planning", nivel:"Proficient", puntaje:2.23,
    icono:"📊", color:"#00d8da",
    descripcion:"Crea planes óptimos de producción y distribución para satisfacer la demanda, teniendo en cuenta los niveles de inventario objetivo, las asignaciones de DPG y las decisiones de S&OP",
    capabilities: {
      "MBWA": { puntaje:1.96, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:1.96, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:1.96, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:1.96, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:3, nivel:"Expert" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:3, nivel:"Expert" },
      "Mejora continua": { puntaje:1.96, nivel:"Proficient" },
    },
    tags:["Colaboración","Inglés","Orientación a datos"]
  },
  "Especialista - Retpack": {
    id:17, area:"Planning", nivel:"Competent", puntaje:2,
    icono:"📊", color:"#00d8da",
    descripcion:"Analizar los niveles de inventario de envase/empaque para generar planes de compra, fabricación y distribución para mantener inventarios sanos para habilitar el plan de demanda, mi",
    capabilities: {
      "MBWA": { puntaje:1.76, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.76, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.76, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.76, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.76, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:1.5, nivel:"Advanced Beginner" },
      "Mejora continua": { puntaje:1.76, nivel:"Competent" },
    },
    tags:["Colaboración","Inglés","Orientación a datos"]
  },
  "Especialista - DP Operativo": {
    id:18, area:"Planning", nivel:"Competent", puntaje:2.08,
    icono:"📊", color:"#00d8da",
    descripcion:"La planeación de la demanda operativa se centra en la gestión a corto plazo de la demanda, asegurando que los productos estén disponibles para satisfacer las necesidades inmediatas",
    capabilities: {
      "MBWA": { puntaje:1.83, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.83, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.83, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.83, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.83, nivel:"Competent" },
      "Orientación a datos": { puntaje:3, nivel:"Expert" },
      "Resolución de problemas": { puntaje:1.83, nivel:"Competent" },
      "Mejora continua": { puntaje:1.83, nivel:"Competent" },
    },
    tags:["Excel","Inglés","Orientación a datos"]
  },
  "Gerente - CONA": {
    id:19, area:"Planning", nivel:"Competent", puntaje:2.04,
    icono:"📊", color:"#00d8da",
    descripcion:"Calcula rutas de transferencia óptimas para suministrar producto terminado y mínimos costos teniendo en cuenta los requisitos de distribución y las limitaciones de capacidad al men",
    capabilities: {
      "MBWA": { puntaje:1.8, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.8, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.8, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.8, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.8, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:2, nivel:"Competent" },
    },
    tags:["Finanzas empresariales","Inglés","Orientación a datos"]
  },
  "Especialista DP Estadistico": {
    id:20, area:"Planning", nivel:"Competent", puntaje:2.12,
    icono:"📊", color:"#00d8da",
    descripcion:"Crear pronósticos de demanda confiables como la referencia para el acuerdo sobre planes de negocios conjuntos para equilibrar el nivel de servicio deseado al costo óptimo",
    capabilities: {
      "MBWA": { puntaje:1.87, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.87, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.87, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.87, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.87, nivel:"Competent" },
      "Orientación a datos": { puntaje:3, nivel:"Expert" },
      "Resolución de problemas": { puntaje:1.87, nivel:"Competent" },
      "Mejora continua": { puntaje:1.87, nivel:"Competent" },
    },
    tags:["Excel","Inglés","Orientación a datos"]
  },
  "Gerente DP Operativo": {
    id:21, area:"Planning", nivel:"Expert", puntaje:2.73,
    icono:"📊", color:"#00d8da",
    descripcion:"La planeación de la demanda operativa se centra en la gestión a corto plazo de la demanda, asegurando que los productos estén disponibles para satisfacer las necesidades inmediatas",
    capabilities: {
      "MBWA": { puntaje:2.4, nivel:"Expert" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Expert" },
      "Gestión por sistemas": { puntaje:2.6, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.4, nivel:"Expert" },
      "Grit (resilencia + empuje)": { puntaje:2.4, nivel:"Expert" },
      "Orientación a datos": { puntaje:3, nivel:"Expert" },
      "Resolución de problemas": { puntaje:2.4, nivel:"Expert" },
      "Mejora continua": { puntaje:2.5, nivel:"Proficient" },
    },
    tags:["Excel","Inglés","Orientación a datos"]
  },
  "Gerente - DRP": {
    id:22, area:"Planning", nivel:"Expert", puntaje:2.56,
    icono:"📊", color:"#00d8da",
    descripcion:"Mantener el plan de inventario frente a las realidades operativas para generar planes de reubicación que maximicen las ganancias.",
    capabilities: {
      "MBWA": { puntaje:2.25, nivel:"Expert" },
      "Gestión de Equipos": { puntaje:2.25, nivel:"Expert" },
      "Gestión por sistemas": { puntaje:2.25, nivel:"Expert" },
      "Toma de Decisiones": { puntaje:2.5, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.25, nivel:"Expert" },
      "Mejora continua": { puntaje:2.5, nivel:"Proficient" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Gerente - WSNP": {
    id:23, area:"Planning", nivel:"Competent", puntaje:2.04,
    icono:"📊", color:"#00d8da",
    descripcion:"El Gerente WSNP (Wholesale & Retail Network Planning) juega un papel crucial en la gestión de la cadena de suministro, liderando la creación de planes óptimos de producción y distr",
    capabilities: {
      "MBWA": { puntaje:1.8, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.8, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.8, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Competent" },
      "Mejora continua": { puntaje:2, nivel:"Competent" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Gerente - Retpack": {
    id:24, area:"Planning", nivel:"Expert", puntaje:2.53,
    icono:"📊", color:"#00d8da",
    descripcion:"Analizar los niveles de inventario de envase/empaque para generar planes de compra, fabricación y distribución para mantener inventarios sanos para habilitar el plan de demanda, mi",
    capabilities: {
      "MBWA": { puntaje:2.23, nivel:"Expert" },
      "Gestión de Equipos": { puntaje:2.23, nivel:"Expert" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.23, nivel:"Expert" },
      "Grit (resilencia + empuje)": { puntaje:2.23, nivel:"Expert" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:3, nivel:"Expert" },
      "Mejora continua": { puntaje:2.6, nivel:"Proficient" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Gerente - MRP Táctico": {
    id:25, area:"Planning", nivel:"Expert", puntaje:2.83,
    icono:"📊", color:"#00d8da",
    descripcion:"Optimiza los niveles de inventario de materiales para cumplir con la  demanda de productos terminados,  Se centra en la estrategia y en la alineación de los recursos de la empresa ",
    capabilities: {
      "MBWA": { puntaje:2.49, nivel:"Expert" },
      "Gestión de Equipos": { puntaje:2.49, nivel:"Expert" },
      "Gestión por sistemas": { puntaje:2.49, nivel:"Expert" },
      "Toma de Decisiones": { puntaje:2.5, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:3, nivel:"Expert" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.49, nivel:"Expert" },
      "Mejora continua": { puntaje:2.5, nivel:"Proficient" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Especialista - MRP Operativo": {
    id:26, area:"Planning", nivel:"Proficient", puntaje:2.32,
    icono:"📊", color:"#00d8da",
    descripcion:"Optimiza los niveles de inventario de materiales para cumplir con la  demanda de productos terminados minimizando costos, centrándose en la ejecución detallada del plan de producci",
    capabilities: {
      "MBWA": { puntaje:2.04, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.04, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.04, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.04, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Competent" },
      "Mejora continua": { puntaje:2.04, nivel:"Proficient" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Gerente - MRP Operativo": {
    id:27, area:"Planning", nivel:"Competent", puntaje:2.32,
    icono:"📊", color:"#00d8da",
    descripcion:"Optimiza los niveles de inventario de materiales para cumplir con la  demanda de productos terminados minimizando costos, centrándose en la ejecución detallada del plan de producci",
    capabilities: {
      "MBWA": { puntaje:2.04, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.04, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.04, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.04, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Competent" },
      "Mejora continua": { puntaje:2.04, nivel:"Competent" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Especialista - Programación de la producción": {
    id:28, area:"Planning", nivel:"Proficient", puntaje:2.27,
    icono:"📊", color:"#00d8da",
    descripcion:"Desarrolla métodos, técnicas y herramientas para la planificación eficiente de planes y programaciones que sincronizan eficazmente la demanda con la capacidad de producción, consid",
    capabilities: {
      "MBWA": { puntaje:2, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.5, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Proficient" },
      "Mejora continua": { puntaje:2, nivel:"Proficient" },
    },
    tags:["Inglés","Orientación a datos","Colaboración"]
  },
  "Gerente Regional de Operaciones - GRO": {
    id:29, area:"T2", nivel:"Proficient", puntaje:2.6,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"\"Coordinar las actividades de Almacén y Rutas de Entrega del territorio en referencia optimizando los recursos apalancados en productividad  y enfocados en garantizar el mejor nive",
    capabilities: {
      "MBWA": { puntaje:2.29, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.8, nivel:"Expert" },
      "Gestión por sistemas": { puntaje:2.6, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.29, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.5, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.29, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.29, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.29, nivel:"Proficient" },
    },
    tags:["Grit (resilencia + empuje)","Mentalidad de crecimiento","Gestión por sistemas"]
  },
  "Gerente Operaciones de Distribución (GOD)": {
    id:30, area:"T2", nivel:"Competent", puntaje:2.33,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Coordinar las actividades de almacén y rutas de entrega optimizando los recursos apalancados en productividad  y enfocados en garantizar el mejor nivel de servicio, desarrollando r",
    capabilities: {
      "MBWA": { puntaje:2.5, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.4, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.05, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.05, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2.05, nivel:"Competent" },
      "Mejora continua": { puntaje:2.05, nivel:"Competent" },
    },
    tags:["Grit (resilencia + empuje)","Gestión por sistemas","Gestion de Interesados"]
  },
  "Gerente - DP Estadístico": {
    id:31, area:"Planning", nivel:"Competent", puntaje:2.13,
    icono:"📊", color:"#00d8da",
    descripcion:"Crear pronósticos de demanda confiables como la referencia para el acuerdo sobre planes de negocio conjuntos para equilibrar el nivel de servicio deseado al costo óptimo.",
    capabilities: {
      "MBWA": { puntaje:1.87, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.87, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.5, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:1.87, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.87, nivel:"Competent" },
      "Orientación a datos": { puntaje:3, nivel:"Expert" },
      "Resolución de problemas": { puntaje:1.87, nivel:"Competent" },
      "Mejora continua": { puntaje:2, nivel:"Competent" },
    },
    tags:["Excel","Inglés","Orientación a datos"]
  },
  "Especialista - Logística inversa": {
    id:32, area:"Planning", nivel:"Proficient", puntaje:2.25,
    icono:"📊", color:"#00d8da",
    descripcion:"Optimiza los niveles de inventario de empaques para satisfacer la demanda de productos terminados mientras minimizas los costos logísticos, pérdidas e inversión.",
    capabilities: {
      "MBWA": { puntaje:1.98, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:1.98, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:1.98, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:1.98, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.5, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2.5, nivel:"Proficient" },
      "Mejora continua": { puntaje:1.98, nivel:"Proficient" },
    },
    tags:["Orientación a datos","Colaboración","Gestión de inventarios"]
  },
  "Gerente PPM": {
    id:33, area:"PPM", nivel:"Proficient", puntaje:2.6,
    icono:"🎯", color:"var(--magenta)",
    descripcion:"Proporciona visibilidad y precisión del costo de SC mediante análisis de datos durante las rutinas en los niveles más altos de la organización. Es responsable de analizar las finan",
    capabilities: {
      "MBWA": { puntaje:2.29, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.5, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.29, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.29, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.29, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.29, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.29, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.29, nivel:"Proficient" },
    },
    tags:["Storytelling","Gestión de riesgo","Análisis de Costos"]
  },
  "Ana-Esp PPM": {
    id:34, area:"PPM", nivel:"Competent", puntaje:2.16,
    icono:"🎯", color:"var(--magenta)",
    descripcion:"Lidera el apoyo clave para aumentar la visibilidad y la precisión de los proyectos mediante el aporte de información analítica. Es responsable del análisis financiero y otros indic",
    capabilities: {
      "MBWA": { puntaje:1.9, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.9, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.9, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.9, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.9, nivel:"Competent" },
      "Mejora continua": { puntaje:1.9, nivel:"Competent" },
    },
    tags:["Storytelling","Gestión de riesgo","Análisis de Costos"]
  },
  "Site PPM": {
    id:35, area:"PPM", nivel:"Competent", puntaje:1.8,
    icono:"🎯", color:"var(--magenta)",
    descripcion:"Sus actividades incluyen (entre otras) la estrecha colaboración con el equipo local, la comunicación del calendario del plan anual, los hitos y los indicadores clave de rendimiento",
    capabilities: {
      "MBWA": { puntaje:1.58, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.58, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.58, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.58, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.58, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.58, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.58, nivel:"Competent" },
      "Mejora continua": { puntaje:1.58, nivel:"Competent" },
    },
    tags:["Storytelling","Gestión de riesgo","Análisis de Costos"]
  },
  "Gerente de Logística": {
    id:36, area:"T1", nivel:"Competent", puntaje:2.01,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Gerente de Logística es validar los planos tácticos de producción y elaboración de cerveza, así como operación de la recepción y asegurar el almacenamiento y sumini",
    capabilities: {
      "MBWA": { puntaje:1.77, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.3, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.8, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.77, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.77, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.77, nivel:"Competent" },
    },
    tags:["Gestión de equipos","Gestion de Interesados","Gestión de la cadena de suministro"]
  },
  "Especialista de Simulación": {
    id:37, area:"T1", nivel:"Competent", puntaje:2.2,
    icono:"🏭", color:"var(--purple)",
    descripcion:"Prepara modelos de simulación sobre FlexSim, apegándose a las mejores prácticas de simulación, metodologías y planes de trabajo establecidos; para comparar escenarios u optimizació",
    capabilities: {
      "MBWA": { puntaje:1.94, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.94, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.94, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.94, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.94, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.8, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.94, nivel:"Competent" },
      "Mejora continua": { puntaje:1.94, nivel:"Competent" },
    },
    tags:["Empuje / Orientación a resultados","Programación Estructurada","Data Driven / Analítico"]
  },
  "Gerente de Almacén BU": {
    id:38, area:"T1", nivel:"Competent", puntaje:1.98,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Gerente de Almacén es asegurar la eficiencia operativa y vigilar el cumplimiento de los indicadores y metas estratégicas; acompañando en el diseño, evolución y eval",
    capabilities: {
      "MBWA": { puntaje:1.74, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.3, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.8, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2.1, nivel:"Competent" },
      "Mejora continua": { puntaje:1.74, nivel:"Competent" },
    },
    tags:["Gestión de equipos","Gestion de Interesados","Grit (resilencia + empuje)"]
  },
  "Gerente de Transporte (TM) T1": {
    id:39, area:"T1", nivel:"Proficient", puntaje:2.21,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El Gerente Nacional de Transporte T1 es responsable de liderar las operaciones de transporte a nivel nacional, y es responsable de la planificación, coordinación y supervisión de l",
    capabilities: {
      "MBWA": { puntaje:1.94, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.94, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.1, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.3, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:1.94, nivel:"Proficient" },
      "Mejora continua": { puntaje:1.94, nivel:"Proficient" },
    },
    tags:["Gestion de Interesados","Gestión de equipos","Data Driven / Analítico"]
  },
  "Especialista de Transporte (TM) T1": {
    id:40, area:"T1", nivel:"Competent", puntaje:1.77,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El Especialista de Transporte  es responsable de planificar, coordinar y optimizar el transporte de bienes y materiales. Este rol implica asegurar la eficiencia en las rutas, la pu",
    capabilities: {
      "MBWA": { puntaje:1.56, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.56, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.7, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.56, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.56, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.56, nivel:"Competent" },
    },
    tags:["Logística del Transporte","Data Driven / Analítico","Gestión de la cadena de suministro"]
  },
  "Gerente de Flota (TM) T1": {
    id:41, area:"T1", nivel:"Competent", puntaje:2.02,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El Gerente Nacional de Flota T1 es responsable de la gestión integral de una flota de vehículos a nivel nacional. Este rol incluye la supervisión del mantenimiento de la flota, la ",
    capabilities: {
      "MBWA": { puntaje:1.9, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.3, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.78, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.8, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.78, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.78, nivel:"Competent" },
    },
    tags:["Gestión de flota","Gestion de Interesados","Gestión de equipos"]
  },
  "Especialista de Transport Scheduling": {
    id:42, area:"T1", nivel:"Competent", puntaje:1.82,
    icono:"🏭", color:"var(--purple)",
    descripcion:"Brindar soporte continuo y eficiente a las operaciones diarias y rutinarias de TMS, generando información para el análisis de indicadores clave de desempeño que permitan monitorear",
    capabilities: {
      "MBWA": { puntaje:1.6, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.6, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.7, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.6, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.6, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.7, nivel:"Competent" },
      "Mejora continua": { puntaje:1.6, nivel:"Competent" },
    },
    tags:["Sistemas de gestión de transporte​","Comunicación","ITIL + COBIT"]
  },
  "Gerente de Transport Scheduling": {
    id:43, area:"T1", nivel:"Proficient", puntaje:1.95,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El manager de Transport Management System lidera las actualizaciones y mejoras del Sistema de Gestión de Transporte, garantizando el soporte continuo y eficiente a las operaciones ",
    capabilities: {
      "MBWA": { puntaje:1.72, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.2, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.8, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.72, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:1.72, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:2, nivel:"Competent" },
      "Mejora continua": { puntaje:1.8, nivel:"Competent" },
    },
    tags:["Gestion de Interesados","Gestión de equipos","Data Driven / Analítico"]
  },
  "Gerente de Transport Execution": {
    id:44, area:"T1", nivel:"Proficient", puntaje:2.05,
    icono:"🏭", color:"var(--purple)",
    descripcion:"Garantizar la eficiente y segura operación de la flota de transporte, optimizando la ejecución de las entregas y recogidas de mercancías, minimizando costos y mejorando la satisfac",
    capabilities: {
      "MBWA": { puntaje:1.8, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.1, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.1, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.8, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.8, nivel:"Proficient" },
    },
    tags:["Gestión de equipos","Gestion de Interesados","Grit (resilencia + empuje)"]
  },
  "Coordinador de Transport Execution": {
    id:45, area:"T1", nivel:"Competent", puntaje:1.82,
    icono:"🏭", color:"var(--purple)",
    descripcion:"Este rol tiene como objetivo supervisar y coordinar las operaciones diarias de transporte, asegurando que las mercancías se entreguen de manera eficiente, segura y puntual.",
    capabilities: {
      "MBWA": { puntaje:1.6, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.6, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.6, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.8, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.9, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.7, nivel:"Competent" },
      "Mejora continua": { puntaje:1.6, nivel:"Competent" },
    },
    tags:["Gestión por sistemas","Gestion de Interesados","Gestión de crisis"]
  },
  "Gerente de Control Tower T1": {
    id:46, area:"T1", nivel:"Competent", puntaje:2.01,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El Gerente de Control Tower se encarga de gestionar el seguimiento a las unidades de transporte de T1 para la prevención de accidentes y riesgos en las rutas de Transporte y el cum",
    capabilities: {
      "MBWA": { puntaje:1.77, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.3, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.9, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.77, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.77, nivel:"Competent" },
    },
    tags:["Gestión de equipos","Gestión de crisis","Gestión por sistemas"]
  },
  "Coordinador de Control Tower T1 ": {
    id:47, area:"T1", nivel:"Competent", puntaje:1.81,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El coordinador de Control Tower de T1 tiene como objetivo supervisar y gestionar la ejecución de las operaciones diarias de las unidades de transporte, asegurando la eficiencia y l",
    capabilities: {
      "MBWA": { puntaje:1.59, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.2, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.7, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.59, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.8, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.6, nivel:"Advanced Beginner" },
      "Mejora continua": { puntaje:1.59, nivel:"Competent" },
    },
    tags:["Gestión por sistemas","Gestión de equipos","Comunicación"]
  },
  "Responsable de Almacén Operación": {
    id:48, area:"T1", nivel:"Competent", puntaje:1.77,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Responsable de Almacén es brindar seguimiento a la operación de acuerdo a los recursos que se tiene, asegurando se cumpla al 100% con la correcta operación de los p",
    capabilities: {
      "MBWA": { puntaje:2.1, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.1, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.8, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.5, nivel:"Advanced Beginner" },
      "Grit (resilencia + empuje)": { puntaje:1.56, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.56, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.56, nivel:"Competent" },
      "Mejora continua": { puntaje:1.56, nivel:"Competent" },
    },
    tags:["Gestión de equipos","Management by Walking Around (MBWA)","Gestión de inventarios"]
  },
  "Responsable de Control Operación": {
    id:49, area:"T1", nivel:"Competent", puntaje:1.86,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Responsable de Control Operación se encarga de inspeccionar los procesos de control de materiales en las operaciones, la implementación de rutinas de control con el",
    capabilities: {
      "MBWA": { puntaje:1.9, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.64, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.1, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.64, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.7, nivel:"Competent" },
      "Mejora continua": { puntaje:1.64, nivel:"Competent" },
    },
    tags:["Gestión de inventarios","Data Driven / Analítico","Toma de Decisiones"]
  },
  "Responsable de Planeación Operación": {
    id:50, area:"T1", nivel:"Competent", puntaje:1.81,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Responsable de Planeación Operación directo en la operación de planta es ejecutar las actividades relacionadas a la planeación de producción detallada de producto t",
    capabilities: {
      "MBWA": { puntaje:1.59, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.59, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.5, nivel:"Advanced Beginner" },
      "Toma de Decisiones": { puntaje:1.59, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.59, nivel:"Competent" },
      "Mejora continua": { puntaje:1.59, nivel:"Competent" },
    },
    tags:["Gestión de la cadena de suministro","Gestión de riesgos","Técnicas de programación"]
  },
  "Especialista de Almacenaje de BU T1": {
    id:51, area:"T1", nivel:"Competent", puntaje:1.78,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Especialista de Almacén de BU es centralizar los resultados que arrojan las diferentes plantas en sus operaciones, para vigilar el cumplimiento de los indicadores y",
    capabilities: {
      "MBWA": { puntaje:1.6, nivel:"Advanced Beginner" },
      "Gestión de Equipos": { puntaje:1.57, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.7, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.57, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.9, nivel:"Competent" },
      "Orientación a datos": { puntaje:2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.9, nivel:"Competent" },
      "Mejora continua": { puntaje:1.7, nivel:"Competent" },
    },
    tags:["Gestión de inventarios","Pensamiento crítico","Data Driven / Analítico"]
  },
  "Especialista de Control de BU T1": {
    id:52, area:"T1", nivel:"Competent", puntaje:1.85,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El objetivo del Especialista de Control  en BU es inspeccionar los procesos de control de materiales en las operaciones, la implementación de rutinas de control con el objetivo de ",
    capabilities: {
      "MBWA": { puntaje:1.63, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.63, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.7, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.63, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.63, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.9, nivel:"Competent" },
      "Mejora continua": { puntaje:1.9, nivel:"Competent" },
    },
    tags:["Data Driven / Analítico","Gestión de inventarios","Gestion de Interesados"]
  },
  "Gerente de Control y Productividad": {
    id:53, area:"T1", nivel:"Competent", puntaje:1.87,
    icono:"🏭", color:"var(--purple)",
    descripcion:"El Gerente de Control y Productividad en el área de Almacenaje tiene el objetivo de asegurar la eficiencia operativa y la maximización de recursos dentro de la planta, alineando lo",
    capabilities: {
      "MBWA": { puntaje:1.65, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.9, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.65, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.65, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.65, nivel:"Competent" },
      "Mejora continua": { puntaje:1.65, nivel:"Competent" },
    },
    tags:["Data Driven / Analítico","Gestion de Interesados","Gestión de inventarios"]
  },
  "Gerente Senior COMEX": {
    id:54, area:"COMEX", nivel:"Competent", puntaje:2.2,
    icono:"🌐", color:"#ffa500",
    descripcion:"Asegurar el cumplimiento de los requerimientos de la BU y stakeholders, en el mejor tiempo posible, siempre cuidando los costos y evitando hacer extracostos.",
    capabilities: {
      "MBWA": { puntaje:1.94, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2.1, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.1, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.2, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.94, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.94, nivel:"Competent" },
      "Mejora continua": { puntaje:1.94, nivel:"Competent" },
    },
    tags:["Gestion de Interesados","Finanzas","Planificación de la estrategia"]
  },
  "Coordinador de COMEX": {
    id:55, area:"COMEX", nivel:"Competent", puntaje:1.94,
    icono:"🌐", color:"#ffa500",
    descripcion:"Monitrear el flujo de información y datos de manera diaria, semanal y mensual que se generan en la torre de comercio exterior, informando sobre el comportamiento de los KPI`s del á",
    capabilities: {
      "MBWA": { puntaje:1.71, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.71, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.9, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.71, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.71, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.1, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.71, nivel:"Competent" },
      "Mejora continua": { puntaje:1.71, nivel:"Competent" },
    },
    tags:["Autonomía","Data Driven / Analítico","Pensamiento crítico"]
  },
  "Gerente Junior COMEX": {
    id:56, area:"COMEX", nivel:"Competent", puntaje:1.97,
    icono:"🌐", color:"#ffa500",
    descripcion:"Supervisar las actividades de trabajo de los especialistas de importación y exportación; a fin de garantizar la coordinación de emabaques, la importación y exportación de materias ",
    capabilities: {
      "MBWA": { puntaje:1.73, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:2, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.1, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.9, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.9, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.73, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.9, nivel:"Competent" },
      "Mejora continua": { puntaje:1.73, nivel:"Competent" },
    },
    tags:["Finanzas","Gestión por sistemas","Gestion de Interesados"]
  },
  "Especialista Import-Export": {
    id:57, area:"COMEX", nivel:"Competent", puntaje:1.77,
    icono:"🌐", color:"#ffa500",
    descripcion:"Coordianar las actividades para la importación de materia prima en tiempo, evitando la genracion de extra costos y cumpliendo con las necesidades de nuestros clientes.  ",
    capabilities: {
      "MBWA": { puntaje:1.56, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.56, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.8, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:1.56, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.8, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.6, nivel:"Advanced Beginner" },
      "Resolución de problemas": { puntaje:1.8, nivel:"Competent" },
      "Mejora continua": { puntaje:1.56, nivel:"Competent" },
    },
    tags:["Finanzas","Conocimiento de Comercio Exterior","Planificación y Organización"]
  },
  "Analista Import-Export": {
    id:58, area:"COMEX", nivel:"Competent", puntaje:1.6,
    icono:"🌐", color:"#ffa500",
    descripcion:"Coordianar las actividades para la exportación de producto terminado en tiempo, evitando la genracion de extra costos y cumpliendo con las necesidades de nuestros clientes.  ",
    capabilities: {
      "MBWA": { puntaje:1.41, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.41, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:1.6, nivel:"Advanced Beginner" },
      "Toma de Decisiones": { puntaje:1.41, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.41, nivel:"Competent" },
      "Orientación a datos": { puntaje:1.5, nivel:"Advanced Beginner" },
      "Resolución de problemas": { puntaje:1.5, nivel:"Advanced Beginner" },
      "Mejora continua": { puntaje:1.41, nivel:"Competent" },
    },
    tags:["Finanzas","Conocimiento de Comercio Exterior","Planificación y Organización"]
  },
  "Gerente de Planning BU": {
    id:59, area:"Planning", nivel:"Proficient", puntaje:2.38,
    icono:"📊", color:"#00d8da",
    descripcion:"Este rol es responsable de liderar, supervisar y optimizar los procesos de planificación en todas las áreas de una o más BUs, asegurando la alineación táctica y operativa con los o",
    capabilities: {
      "MBWA": { puntaje:2.09, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.6, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.09, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2.4, nivel:"Proficient" },
      "Grit (resilencia + empuje)": { puntaje:2.3, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.09, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.09, nivel:"Proficient" },
    },
    tags:["Gestión de la cadena de suministro","Gestión de equipos","Gestión de interesados"]
  },
  "Especialista DPO": {
    id:60, area:"T2", nivel:"Competent", puntaje:2.13,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"Garantizar la correcta implementación y ejecución del programa de gestión DPO.",
    capabilities: {
      "MBWA": { puntaje:1.87, nivel:"Competent" },
      "Gestión de Equipos": { puntaje:1.87, nivel:"Competent" },
      "Gestión por sistemas": { puntaje:2.4, nivel:"Proficient" },
      "Toma de Decisiones": { puntaje:2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:1.87, nivel:"Competent" },
      "Orientación a datos": { puntaje:2.2, nivel:"Competent" },
      "Resolución de problemas": { puntaje:1.87, nivel:"Competent" },
      "Mejora continua": { puntaje:2, nivel:"Competent" },
    },
    tags:["Empuje / Orientación a resultados","Gestión por sistemas","Comunicación"]
  },
  "Manager DPO- Safety": {
    id:61, area:"T2", nivel:"Proficient", puntaje:2.3,
    icono:"🚛", color:"var(--cyan)",
    descripcion:"El Gerente DPO-Safety es el responsable de la implementación de estándares de gestión de DPO para T2, garantizando que su personal aplique los procedimientos, recomendaciones y pil",
    capabilities: {
      "MBWA": { puntaje:2.02, nivel:"Proficient" },
      "Gestión de Equipos": { puntaje:2.4, nivel:"Proficient" },
      "Gestión por sistemas": { puntaje:2.2, nivel:"Competent" },
      "Toma de Decisiones": { puntaje:2.2, nivel:"Competent" },
      "Grit (resilencia + empuje)": { puntaje:2.3, nivel:"Proficient" },
      "Orientación a datos": { puntaje:2.5, nivel:"Proficient" },
      "Resolución de problemas": { puntaje:2.02, nivel:"Proficient" },
      "Mejora continua": { puntaje:2.02, nivel:"Proficient" },
    },
    tags:["Seguridad","Data Driven / Analítico","Gestión de riesgos"]
  },
};;

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
  if (screenId === 'screen-admin-contenido') setTimeout(renderAdminContenido, 80);
  if (screenId === 'screen-modulo') { loadState(); setTimeout(() => renderDia(currentDia), 150); }
  if (screenId === 'screen-admin-dashboard') {
    setTimeout(renderKpiAvancePromedio, 80);
    setTimeout(renderCalendarioGlobal, 80);
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

// ── OTRO: mostrar/ocultar input en selects ──
function toggleOtroSelect(sel) {
  const inp = sel.parentElement.querySelector('.otro-select-input');
  if (!inp) return;
  const isOtro = sel.value === 'otro';
  inp.style.display = isOtro ? 'block' : 'none';
  if (isOtro) inp.focus();
}

// ── ROLE SELECTION STATE ──
let activeAreaFilter = 'all';
let showFullCatalog  = false;

function filterRoleArea(area) {
  activeAreaFilter = area;
  renderRoleCards();
}

function toggleFullCatalog(show) {
  showFullCatalog  = show;
  activeAreaFilter = 'all';
  renderRoleCards();
}

// ── RENDER ROLE CARDS ──
function renderRoleCards() {
  const container = document.getElementById('rol-cards');
  if (!container) return;

  // ════════════════════════════════════════════════════
  //  LECTURA DEL PERFIL DEL USUARIO (formulario 01–04)
  // ════════════════════════════════════════════════════

  // 1. Área del formulario (sección 01, segundo select)
  const areaSelects = document.querySelectorAll('#screen-exploracion select.form-select');
  const userAreaRaw = areaSelects[0]?.value || '';

  // 2. Años de experiencia (tercer select en sección 01)
  const expRaw = areaSelects[1]?.value || '';
  // Mapear experiencia → puntaje Dreyfus estimado del usuario (escala 0–3)
  const EXP_TO_PUNTAJE = {
    'Menos de 6 meses': 0.8,
    '6 meses – 1 año':  1.1,
    '1 – 3 años':       1.5,
    '3 – 5 años':       2.0,
    'Más de 5 años':    2.3
  };
  const userPuntaje = EXP_TO_PUNTAJE[expRaw] ?? 1.5; // default: Advanced Beginner

  // 3. Puesto libre (sección 01, primer input de texto) — señales de nivel
  const puestoTexto = (document.querySelector('#screen-exploracion .form-input')?.value || '').toLowerCase();
  const puestoLevelBoost = /(gerente|director|jefe de|head of|vp |vp\b|manager senior|sr\.?)/.test(puestoTexto) ? 0.4
                         : /(coordinador|líder|lider|lead|analista sr|especialista sr)/.test(puestoTexto)        ? 0.2
                         : /(supervisor|analista|especialista|planner)/.test(puestoTexto)                       ? 0.0
                         : /(aux|asistente|auxiliar|operador|becario)/.test(puestoTexto)                        ? -0.3
                         : 0.0;
  const userLevel = Math.min(2.8, Math.max(0.5, userPuntaje + puestoLevelBoost));

  // 4. Capabilities del perfil (actividades + retos seleccionados)
  const profileCaps = new Set();
  document.querySelectorAll('#screen-exploracion .radio-card input:checked').forEach(cb => {
    const card = cb.closest('.radio-card');
    if (!card) return;
    if (card.dataset.otro === 'true') {
      const customText = (card.querySelector('.otro-input')?.value || '').toLowerCase().trim();
      if (customText) {
        CAPS.forEach(cap => {
          if (customText.split(/\s+/).some(w => w.length > 3 && cap.toLowerCase().includes(w))) profileCaps.add(cap);
        });
        Object.keys(actividadCaps).forEach(k => { if (customText.includes(k.toLowerCase().substring(0,8))) actividadCaps[k].forEach(c => profileCaps.add(c)); });
        Object.keys(retoCaps).forEach(k => { if (customText.includes(k.toLowerCase().substring(0,8))) retoCaps[k].forEach(c => profileCaps.add(c)); });
      }
      return;
    }
    const label = card.querySelector('.radio-card-label')?.textContent?.trim();
    if (label) (actividadCaps[label] || retoCaps[label] || []).forEach(c => profileCaps.add(c));
  });

  // ════════════════════════════════════════════════════
  //  TABLAS DE COMPATIBILIDAD
  // ════════════════════════════════════════════════════

  // Área del usuario → afinidad con áreas de roles (0–100)
  const AREA_COMPAT = {
    'Operaciones / Producción': { T2:55, T1:70, Planning:55, COMEX:20, PPM:100, Transformation:45 },
    'Calidad':                  { T2:50, T1:75, Planning:45, COMEX:20, PPM:90,  Transformation:50 },
    'Logística':                { T2:100,T1:85, Planning:70, COMEX:65, PPM:45,  Transformation:30 },
    'Recursos Humanos':         { T2:30, T1:35, Planning:55, COMEX:30, PPM:45,  Transformation:100 },
    'Seguridad Industrial':     { T2:45, T1:90, Planning:25, COMEX:15, PPM:85,  Transformation:45 },
    'Mantenimiento':            { T2:35, T1:85, Planning:25, COMEX:15, PPM:90,  Transformation:40 },
    'Administración':           { T2:40, T1:40, Planning:100,COMEX:90, PPM:30,  Transformation:60 }
  };

  function getAreaScore(userArea, roleArea) {
    const map = AREA_COMPAT[userArea];
    if (!map) return 55; // sin área definida → neutral
    return map[roleArea] ?? 40;
  }

  // Nivel del usuario vs. nivel del rol (puntaje 0–3)
  // La zona ideal es que el rol esté ligeramente por encima del usuario (reto alcanzable)
  function getLevelScore(uLevel, rolPuntaje) {
    const delta = rolPuntaje - uLevel; // positivo = rol más senior que usuario
    if (delta >= -0.15 && delta <= 0.35) return 100; // mismo nivel o pequeño stretch
    if (delta >  0.35  && delta <= 0.75) return 78;  // rol moderadamente superior (buen reto)
    if (delta >  0.75  && delta <= 1.20) return 50;  // rol muy por encima
    if (delta >  1.20)                   return 20;  // demasiado senior para el usuario
    if (delta <  -0.15 && delta >= -0.6) return 70;  // usuario ya supera ligeramente el rol
    return 35; // usuario muy por encima del rol
  }

  // Relevancia de las capabilities del usuario dentro del rol
  // Usa tags (top-3 caps reales del Excel) y puntaje para ponderar
  function getCapScore(pCaps, rol) {
    if (pCaps.size === 0) return 55;
    let total = 0;
    pCaps.forEach(pc => {
      const capData = rol.capabilities[pc];
      const inTags  = rol.tags.some(t => t.toLowerCase().includes(pc.toLowerCase().substring(0, 8)));
      if (inTags)                              total += 100; // cap es top-3 del rol
      else if (capData?.puntaje >= 2.0)        total += 72;  // cap importante para el rol
      else if (capData?.puntaje >= 1.5)        total += 45;  // cap moderadamente relevante
      else                                     total += 12;  // cap apenas aparece en el rol
    });
    return Math.round(total / pCaps.size);
  }

  // ════════════════════════════════════════════════════
  //  CÁLCULO DEL MATCH (3 factores ponderados)
  // ════════════════════════════════════════════════════
  //  40% Nivel     — ¿es el rol apropiado para la experiencia del usuario?
  //  38% Área      — ¿coincide el área del usuario con el área del rol?
  //  22% Capabilities — ¿ejercita el usuario las caps clave del rol?
  // ════════════════════════════════════════════════════

  const matchScores = {};
  Object.entries(rolesData).forEach(([name, rol]) => {
    const areaScore  = getAreaScore(userAreaRaw, rol.area);
    const levelScore = getLevelScore(userLevel, rol.puntaje);
    const capScore   = getCapScore(profileCaps, rol);

    const raw = areaScore * 0.38 + levelScore * 0.40 + capScore * 0.22;
    // Escalar al rango 52–96 para que los números sean informativos pero no extremos
    matchScores[name] = Math.round(Math.min(96, Math.max(52, raw)));
  });

  // ── Todos los roles ordenados por match ──
  const allSorted = Object.entries(rolesData)
    .sort((a, b) => matchScores[b[0]] - matchScores[a[0]]);

  // ── Render helper: one card ──
  function cardHtml(name, rol, isTop) {
    const match   = matchScores[name];
    const color   = rol.color;
    const barGrad = `linear-gradient(90deg,${color},rgba(117,114,233,0.7))`;
    return `
    <div class="card rol-card" data-rol="${rol.id}" onclick="selectRol(${rol.id})"
         style="cursor:pointer;position:relative;border-color:${isTop ? color : 'rgba(255,255,255,0.08)'};transition:border-color 0.2s;">
      ${isTop ? `<div style="position:absolute;top:12px;right:12px;z-index:1;"><span class="badge badge-cyan">⭐ Recomendado</span></div>` : ''}
      <div style="font-size:36px;margin-bottom:8px;">${rol.icono}</div>
      <h3 style="font-size:14px;font-weight:700;color:${color};margin-bottom:4px;padding-right:${isTop?'90px':'0'};line-height:1.4;">${name}</h3>
      <p style="font-size:11px;color:rgba(255,255,255,0.45);line-height:1.5;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${rol.descripcion}</p>
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:4px;">
          <span>Coincidencia con tu perfil</span>
          <span style="color:${color};font-weight:700;">${match}%</span>
        </div>
        <div class="progress-bar-wrap" style="height:5px;">
          <div class="progress-bar-fill" style="width:${match}%;background:${barGrad};"></div>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">
        ${rol.tags.slice(0,3).map(t => `<span style="font-size:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:5px;padding:2px 6px;color:rgba(255,255,255,0.5);">${t}</span>`).join('')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);">
        <span>${rol.area} · ${rol.puntaje.toFixed(2)}</span>
        <span style="color:${color};font-weight:600;">${rol.nivel}</span>
      </div>
    </div>`;
  }

  // ════════════════════════════════
  //  MODO SUGERENCIA — top 3
  // ════════════════════════════════
  if (!showFullCatalog) {
    const top3 = allSorted.slice(0, 3);
    container.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-bottom:24px;">
        ${top3.map(([name, rol], i) => cardHtml(name, rol, i === 0)).join('')}
      </div>
      <div style="text-align:center;padding:20px;border:1px dashed rgba(255,255,255,0.1);border-radius:16px;background:rgba(255,255,255,0.02);">
        <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:12px;">
          ¿No encuentras tu rol? Tenemos <strong style="color:rgba(255,255,255,0.65);">61 roles</strong> en la base SCI.
        </p>
        <button onclick="toggleFullCatalog(true)"
                style="padding:9px 22px;border-radius:10px;border:1.5px solid rgba(0,216,218,0.4);
                       background:rgba(0,216,218,0.07);color:var(--cyan);font-size:13px;font-weight:600;
                       font-family:'Outfit',sans-serif;cursor:pointer;">
          Explorar catálogo completo →
        </button>
      </div>`;
    return;
  }

  // ════════════════════════════════
  //  MODO CATÁLOGO — todos con filtros
  // ════════════════════════════════
  const AREA_LABELS = { all:'Todos', T2:'T2 · Distribución', T1:'T1 · Logística', Planning:'Planning', COMEX:'COMEX', PPM:'PPM', Transformation:'Transformation' };
  const areaCounts  = { all: Object.keys(rolesData).length };
  Object.values(rolesData).forEach(r => { areaCounts[r.area] = (areaCounts[r.area] || 0) + 1; });

  const filtered     = allSorted.filter(([, r]) => activeAreaFilter === 'all' || r.area === activeAreaFilter);
  const topMatchName = filtered[0]?.[0];

  const filtersHtml = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <button onclick="toggleFullCatalog(false)"
              style="padding:6px 14px;border-radius:20px;border:1.5px solid rgba(0,216,218,0.4);
                     background:rgba(0,216,218,0.07);color:var(--cyan);font-size:12px;font-weight:600;
                     font-family:'Outfit',sans-serif;cursor:pointer;">
        ← Ver sugeridos
      </button>
      <span style="font-size:12px;color:rgba(255,255,255,0.3);">Catálogo completo · ${Object.keys(rolesData).length} roles</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
      ${['all','T2','T1','Planning','COMEX','PPM','Transformation'].map(area => {
        const isActive = area === activeAreaFilter;
        const count = areaCounts[area] || 0;
        if (!count && area !== 'all') return '';
        return `<button onclick="filterRoleArea('${area}')"
          style="padding:5px 12px;border-radius:20px;border:1.5px solid ${isActive?'rgba(0,216,218,0.6)':'rgba(255,255,255,0.1)'};
                 background:${isActive?'rgba(0,216,218,0.12)':'rgba(255,255,255,0.03)'};
                 color:${isActive?'var(--cyan)':'rgba(255,255,255,0.45)'};
                 font-size:11px;font-weight:${isActive?'700':'400'};font-family:'Outfit',sans-serif;cursor:pointer;">
          ${AREA_LABELS[area]||area} <span style="opacity:0.55;">${count}</span>
        </button>`;
      }).join('')}
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,0.25);margin-bottom:16px;">
      ${filtered.length} roles · ordenados por coincidencia
    </p>`;

  container.innerHTML = filtersHtml +
    `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">` +
    filtered.map(([name, rol]) => cardHtml(name, rol, name === topMatchName)).join('') +
    `</div>`;
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

  // Kirkpatrick — Diagnóstico inicial vs Evaluación Final
  const kirkCtx = document.getElementById('kirkpatrick-chart');
  if (kirkCtx) {
    kirkCtx._chart = new Chart(kirkCtx, {
      type: 'bar',
      data: {
        labels: ['N1 Reacción', 'N2 Aprendizaje', 'N3 Aplicación', 'N4 Resultados'],
        datasets: [
          {
            label: 'Diagnóstico inicial',
            data: [72, diagScore, 45, 38],
            backgroundColor: 'rgba(248,0,250,0.3)',
            borderColor: '#F800fa',
            borderWidth: 1.5,
            borderRadius: 4
          },
          {
            label: 'Evaluación final (proyectado)',
            data: [90, Math.min(95, diagScore + 28), 78, 72],
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
            ticks: {
              color: 'rgba(255,255,255,0.4)', font: { size: 10 },
              callback: v => v + '%'
            },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        },
        plugins: {
          legend: {
            labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11, family: 'Outfit' }, boxWidth: 14 }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%`
            }
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
function selectNPS(btn, diaNum) {
  document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected-nps'));
  btn.classList.add('selected-nps');
  const val = parseInt(btn.dataset.v);
  let msg = val >= 9 ? '¡Gracias! Tu feedback nos impulsa 🚀' : val >= 7 ? '¡Gracias por tu valoración! 👍' : '¡Gracias! Trabajaremos para mejorar.';
  showToast(msg, 'success');
  // Mark NPS done and unlock complete button
  if (diaNum) {
    diaRecursos['nps'] = true;
    if (!diasEstado[diaNum]) diasEstado[diaNum] = {};
    diasEstado[diaNum].nps = val;
    saveState();
    verificarCompletarDia();
    // Show comentarios button
    const btnCom = document.getElementById('btn-comentarios-' + diaNum);
    if (btnCom) btnCom.style.display = 'inline-block';
  }
}

function toggleComentarios(diaNum) {
  const sec = document.getElementById('comentarios-section-' + diaNum);
  if (sec) {
    const visible = sec.style.display !== 'none';
    sec.style.display = visible ? 'none' : 'block';
  }
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
  ptsAcumulados += pts;
  saveState();
  const acumEl = document.getElementById('pts-acumulados-display');
  if (acumEl) acumEl.textContent = ptsAcumulados + ' pts';
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

// ── CARD INTERACTIVITY: radio-cards y checkbox-cards ──
document.addEventListener('click', function(e) {
  const card = e.target.closest('.radio-card');
  if (!card) return;
  const group = card.parentElement;

  // Checkbox cards: sync .selected class + show/hide Otro text input
  const checkbox = card.querySelector('input[type="checkbox"]');
  if (checkbox) {
    setTimeout(() => {
      card.classList.toggle('selected', checkbox.checked);
      if (card.dataset.otro === 'true') {
        const otroInput = card.querySelector('.otro-input');
        if (otroInput) {
          otroInput.style.display = checkbox.checked ? 'block' : 'none';
          if (checkbox.checked) otroInput.focus();
        }
      }
    }, 0);
    return;
  }

  // Radio cards: deselect siblings, mark this one
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
  if (tabId === 'participantes')       renderTablaParticipantes();
  if (tabId === 'modulos-config')      renderModulosConfig();
  if (tabId === 'sesiones-sync')       renderSesionesSync();
  if (tabId === 'calendario')          { calState._manuallyChanged = false; renderCalendario(); }
  if (tabId === 'dashboard-empresa')   renderDashboardEmpresa();
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
  {
    id: 'connected-customer',
    nombre: 'Connected Customer & Product',
    icono: '🌐',
    nivel: 'Nivel 4 — Avanzado',
    semanas: '2 semanas',
    descripcion: 'Comprende cómo la cadena de suministro centrada en el cliente y el producto conectado transforman las operaciones y la experiencia del cliente.',
    temas: ['Cliente conectado', 'Omnicanalidad', 'Gestión de portafolio', 'Órdenes sin fricción', 'Servicios de campo'],
    duracion: '10 días',
    activos: 3,
    contenido: [
      { dia:1, titulo:'La mejor cadena de suministro centrada en el cliente', pregunta:'¿Qué significa hoy una "mejor cadena de suministro"?', objetivo:'Distinguir la nueva definición de excelencia en la cadena de suministro para identificar los elementos que hoy generan valor al cliente.', recursos:[{tipo:'video',titulo:'¿Qué es la cadena de suministro?',duracion:'5 min',url:'#sharepoint'},{tipo:'video',titulo:'Cadena de suministro centrada en el cliente',duracion:'7 min',url:'#sharepoint'},{tipo:'infografia',titulo:'La historia de éxito de la cadena de suministro de Amazon',duracion:'5 min',url:'https://www.deloitte.com'},{tipo:'articulo',titulo:'Conectividad del consumidor',duracion:'7 min',url:'https://www.deloitte.com'}], actividad:{titulo:'Descubre qué define hoy a la mejor cadena de suministro',puntos:10,url:'#sharepoint'} },
      { dia:2, titulo:'Transformación de la cadena de suministro', pregunta:'¿Por qué y cómo cambió la cadena de suministro?', objetivo:'Identificar las fuerzas tecnológicas, sociales y económicas que transformaron la cadena de suministro.', recursos:[{tipo:'video',titulo:'Conexiones que transforman la experiencia',duracion:'5 min',url:'#sharepoint'},{tipo:'video',titulo:'De la cadena a la red',duracion:'8 min',url:'#sharepoint'},{tipo:'video',titulo:'El auge de las cadenas de suministro centradas en el cliente',duracion:'7 min',url:'https://www.scmr.com'},{tipo:'articulo',titulo:'¿Por qué el futuro de la experiencia del cliente exige la cadena de suministro de la experiencia?',duracion:'7 min',url:'https://www.pwc.com'}], actividad:{titulo:'Riesgos de no transformarse',puntos:10,url:'#sharepoint'} },
      { dia:3, titulo:'El cliente conectado', pregunta:'¿Quién impulsó el cambio de la cadena de suministro?', objetivo:'Analizar las características del cliente conectado y relacionarlas con las nuevas exigencias que impone a los procesos logísticos.', recursos:[{tipo:'video',titulo:'El cliente conectado',duracion:'6 min',url:'#sharepoint'},{tipo:'podcast',titulo:'Mapa del recorrido del cliente',duracion:'15 min',url:'#sharepoint'},{tipo:'articulo',titulo:'Logística 4.0 y el auge del cliente conectado',duracion:'2 min',url:'https://www.logisticsexecutive.com'}], actividad:{titulo:'Reescribe la promesa',puntos:10,url:'#sharepoint'} },
      { dia:4, titulo:'La nueva realidad: cadenas visibles, digitales y preparadas', pregunta:'¿Cómo responder al nuevo entorno de la cadena de suministro centrada en el cliente?', objetivo:'Examinar los habilitadores modernos: resiliencia, nearshoring, digitalización y sostenibilidad.', recursos:[{tipo:'articulo',titulo:'Creación de cadenas de suministro resilientes y sostenibles',duracion:'3 min',url:'https://www.ibm.com'},{tipo:'articulo',titulo:'Nearshoring: Superando los obstáculos',duracion:'5 min',url:'https://www.bain.com'},{tipo:'video',titulo:'Tendencias logísticas 2026',duracion:'7 min',url:'https://www.acrosslogistics.com'},{tipo:'video',titulo:'La última milla',duracion:'6 min',url:'#pendiente'},{tipo:'infografia',titulo:'¿Qué esperan los consumidores de los servicios de última milla?',duracion:'3 min',url:'#pendiente'}], actividad:{titulo:'Nearshoring con estrategia',puntos:10,url:'#sharepoint'} },
      { dia:5, titulo:'Experiencia omnicanal customizada', pregunta:'¿Cómo se traduce esto a la experiencia del cliente?', objetivo:'Analizar cómo los modelos omnicanal integran operaciones físicas y digitales para explicar su impacto en la experiencia del cliente conectado.', recursos:[{tipo:'video',titulo:'Omnicanalidad',duracion:'5 min',url:'#pendiente'},{tipo:'articulo',titulo:'Experiencia del cliente B2C frente a B2B',duracion:'6 min',url:'https://www.medallia.com'},{tipo:'articulo',titulo:'Cómo la personalización habilitada por IA está transformando las cadenas de suministro omnicanal',duracion:'6 min',url:'#pendiente'},{tipo:'infografia',titulo:'Un futuro diseñado por la logística omnicanal',duracion:'3 min',url:'#pendiente'}], actividad:{titulo:'Omnicanal para B2B vs B2C: igual de claro, pero con reglas distintas',puntos:10,url:'#sharepoint'} },
      { dia:6, titulo:'Gestión del portafolio de productos', pregunta:'¿Cómo equilibrar oferta, rentabilidad y valor al cliente?', objetivo:'Interpretar los criterios de gestión del portafolio y comparar cómo distintas combinaciones de productos afectan la rentabilidad.', recursos:[{tipo:'podcast',titulo:'Gestión de la cartera de productos',duracion:'9 min',url:'https://www.businessmap.io'},{tipo:'articulo',titulo:'¿Qué es la racionalización de SKU?',duracion:'7 min',url:'https://www.shopify.com'},{tipo:'articulo',titulo:'Evolucionar las carteras de productos para adaptarlas a las necesidades cambiantes',duracion:'8 min',url:'https://www.gartner.com'}], actividad:{titulo:'Limpieza inteligente del portafolio',puntos:10,url:'#sharepoint'} },
      { dia:7, titulo:'Órdenes sin fricción', pregunta:'¿Cómo eliminar barreras en la experiencia del cliente?', objetivo:'Identificar los principales puntos de fricción en el proceso pedido–cumplimiento y analizar cómo eliminarlos.', recursos:[{tipo:'video',titulo:'De la fricción a la fluidez',duracion:'6 min',url:'#pendiente'},{tipo:'articulo',titulo:'Eliminar la fricción en las cadenas de suministro para obtener una ventaja competitiva',duracion:'3 min',url:'#pendiente'},{tipo:'articulo',titulo:'Experiencia sin fricciones: La clave para retener clientes en la era digital',duracion:'9 min',url:'#pendiente'}], actividad:{titulo:'Diseña un pedido "sin fricción" para un cliente nuevo',puntos:10,url:'#sharepoint'} },
      { dia:8, titulo:'Servicio al cliente', pregunta:'¿Cómo medimos y mejoramos esa experiencia del cliente?', objetivo:'Comprender las dimensiones del servicio al cliente en la cadena de suministro y valorar qué métricas permiten mejorar la atención.', recursos:[{tipo:'podcast',titulo:'Servicio al cliente vs Experiencia de cliente',duracion:'13 min',url:'https://podcasts.apple.com'},{tipo:'articulo',titulo:'El papel del servicio al cliente en la mejora de la gestión de la cadena de suministro',duracion:'5 min',url:'#pendiente'},{tipo:'articulo',titulo:'¿Customer Effort Score o Net Promoter Score?',duracion:'5 min',url:'#pendiente'}], actividad:{titulo:'¿Qué estás midiendo?',puntos:10,url:'#sharepoint'} },
      { dia:9, titulo:'Servicios de campo conectados', pregunta:'¿Cómo integramos todo el ecosistema para crear valor sostenible?', objetivo:'Reconocer los elementos operativos, técnicos y digitales del servicio de campo para sintetizar cómo generan valor sostenible.', recursos:[{tipo:'video',titulo:'Servicios de campo conectados',duracion:'4 min',url:'#pendiente'},{tipo:'articulo',titulo:'La diferencia entre servicio de campo y servicio de campo conectado',duracion:'5 min',url:'#pendiente'},{tipo:'infografia',titulo:'Comprendiendo el servicio de campo conectado',duracion:'6 min',url:'#pendiente'},{tipo:'articulo',titulo:'Equipos conectados, clientes satisfechos',duracion:'8 min',url:'#pendiente'}], actividad:{titulo:'Primera visita resuelta, evita la segunda vuelta',puntos:10,url:'#sharepoint'} },
      { dia:10, titulo:'Evaluación final', pregunta:'¿Cómo se ve reflejado todo lo aprendido?', objetivo:'Integrar y demostrar los conocimientos adquiridos a lo largo del módulo.', recursos:[], actividad:{titulo:'Examen final del módulo',puntos:50,url:'#pendiente'} }
    ]
  },
  { id:'planificacion-sincronica', nombre:'Planeación Sincrónica', icono:'🔄', nivel:'Nivel 4 — Avanzado', semanas:'2 semanas', descripcion:'Domina las técnicas de sincronización entre demanda, producción y distribución para optimizar el flujo de materiales e información.', temas:['S&OP','Demand Sensing','Planeación colaborativa','CPFR','Restricciones'], duracion:'10 días', activos:2, contenido:[] },
  { id:'smart-operations', nombre:'Smart Operations', icono:'⚙️', nivel:'Nivel 4 — Avanzado', semanas:'2 semanas', descripcion:'Aplica tecnologías digitales e inteligencia artificial para transformar las operaciones en sistemas más inteligentes y eficientes.', temas:['IoT','Automatización','Gemelos digitales','Analítica avanzada','IA operativa'], duracion:'10 días', activos:2, contenido:[] },
  { id:'dynamic-fulfillment', nombre:'Dynamic Fulfillment', icono:'🚀', nivel:'Nivel 4 — Avanzado', semanas:'2 semanas', descripcion:'Diseña y gestiona redes de cumplimiento dinámicas que respondan con agilidad a la demanda del cliente conectado.', temas:['Microfulfilment','Last mile','Cross-docking','Inventario dinámico','Promesa de entrega'], duracion:'10 días', activos:2, contenido:[] },
  { id:'game-changers', nombre:'Game Changers', icono:'🎯', nivel:'Nivel 5 — Experto', semanas:'5 semanas', descripcion:'Desarrolla las habilidades que distinguen a los líderes de alto impacto: negociación, innovación, liderazgo, y dominio de la IA aplicada.', temas:['Negociación','Innovación','Liderazgo','Citizen AI'], duracion:'25 días', activos:1, contenido:[] },
  { id:'lean', nombre:'Lean', icono:'🎯', nivel:'Nivel 2 — Principiante', semanas:'2 semanas', descripcion:'Comprende y aplica los principios Lean para eliminar desperdicios, mejorar flujos y crear valor sostenible en la cadena de operaciones.', temas:['Value Stream','5S','Kaizen','Kanban','A3'], duracion:'10 días', activos:1, contenido:[] },
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
  const gen = getGenData();
  // Actualizar conteo en el título
  const tituloH3 = document.querySelector('#tab-participantes h3.section-title');
  if (tituloH3) tituloH3.innerHTML = `<span>Participantes</span> registrados (${gen.participantes})`;
  // Subtítulo de generación
  let genInfo = document.getElementById('participantes-gen-info');
  if (!genInfo) {
    genInfo = document.createElement('p');
    genInfo.id = 'participantes-gen-info';
    genInfo.style.cssText = 'font-size:12px;color:rgba(255,255,255,0.35);margin:0 0 12px 0;';
    tituloH3 && tituloH3.parentElement && tituloH3.parentElement.after(genInfo);
  }
  if (genInfo) genInfo.textContent = `${gen.nombre} · Inicio: ${gen.inicio} · Cierre: ${gen.cierre}`;
  const lista = gen.participantesData || mockParticipantes;
  tbody.innerHTML = lista.map((p, idx) => {
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
          <button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:11px;" title="Editar" onclick="editarParticipanteInline(${idx})"><i class="fas fa-pen"></i></button>
          <button class="btn btn-sm" style="padding:4px 10px;font-size:11px;background:rgba(0,216,218,0.1);border:1px solid rgba(0,216,218,0.3);color:var(--cyan);" title="Enviar invitación" onclick="enviarInvitacion(${idx})"><i class="fas fa-envelope"></i></button>
          <button class="btn btn-sm" style="padding:4px 10px;font-size:11px;background:rgba(248,0,250,0.08);border:1px solid rgba(248,0,250,0.25);color:var(--magenta);" title="Eliminar" onclick="eliminarParticipante(${idx})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ── Render: Lista de módulos con tiempos ──
function renderModulosConfig() {
  const container = document.getElementById('modulos-config-list');
  if (!container) return;
  const gen = getGenData();
  const mods = gen.modulosConfig || mockModulosConfig;
  // Subtítulo con info de generación
  const sub = document.getElementById('modulos-config-subtitle');
  if (sub) sub.textContent = `${gen.nombre} · Inicio: ${gen.inicio} · Cierre: ${gen.cierre}`;
  container.innerHTML = mods.map((m, i) => `
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
  const gen = getGenData();
  const sesiones = gen.sesiones || mockSesiones;
  const iconoTipo = { 'Zoom':'🎥', 'Teams':'💼', 'Presencial':'🏢' };
  container.innerHTML = sesiones.map((s, idx) => `
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
        <button class="btn btn-outline btn-sm" style="font-size:12px;padding:6px 10px;" onclick="copiarLigaSesion(${idx})" title="Copiar liga"><i class="fas fa-link"></i></button>
        <button class="btn btn-outline btn-sm" style="font-size:12px;padding:6px 10px;" onclick="editarSesionInline(${idx})" title="Editar"><i class="fas fa-pen"></i></button>
        <button class="btn btn-sm" style="font-size:12px;padding:6px 10px;background:rgba(248,0,250,0.08);border:1px solid rgba(248,0,250,0.25);color:var(--magenta);" onclick="eliminarSesion(${idx})" title="Eliminar"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

// ── Render: Grid de módulos (biblioteca) ──
let modulosFiltro = 'todos';

function renderModulosGrid() {
  const container = document.getElementById('modulos-grid');
  if (!container) return;
  const visible = modulosFiltro === 'todos'
    ? mockModulosGrid
    : mockModulosGrid.filter(m => m.nivel.toLowerCase().includes(modulosFiltro.toLowerCase()));
  container.innerHTML = visible.map(m => {
    const realIdx = mockModulosGrid.indexOf(m);
    return `
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
        <button class="btn btn-outline btn-sm" style="flex:1;font-size:12px;" onclick="editarModulo(${realIdx})"><i class="fas fa-pen"></i> Editar</button>
        <button class="btn btn-primary btn-sm" style="flex:1;font-size:12px;" onclick="duplicarModulo(${realIdx})"><i class="fas fa-copy"></i> Duplicar</button>
      </div>
    </div>`;
  }).join('');
}

function filterModulos(btn, nivel) {
  modulosFiltro = nivel;
  document.querySelectorAll('.btn-filter-modulo').forEach(b => {
    b.className = 'btn btn-secondary btn-sm btn-filter-modulo';
  });
  if (btn) btn.className = 'btn btn-primary btn-sm btn-filter-modulo';
  renderModulosGrid();
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

// ══════════════════════════════════════════════════
//  ACCIONES REALES — Descargas, Modales, Edición
// ══════════════════════════════════════════════════

// ── Descarga genérica de blob ──
function downloadBlobFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Copiar al portapapeles ──
function copiarAlPortapapeles(text, mensaje) {
  navigator.clipboard?.writeText(text).then(() => {
    showToast('✅ ' + (mensaje || 'Copiado al portapapeles'), 'success');
  }).catch(() => {
    showToast('📋 ' + text.substring(0, 60), 'info');
  });
}

// ── Descargar evento .ics (calendario) ──
function downloadICS(titulo, fechaISO, horaStr, duracionMin) {
  // fechaISO: "20250418", horaStr: "100000", duracionMin: number
  const pad = n => String(n).padStart(2, '0');
  const h = parseInt(horaStr.slice(0, 2));
  const m = parseInt(horaStr.slice(2, 4));
  const totalEnd = h * 60 + m + parseInt(duracionMin);
  const endHora = `${pad(Math.floor(totalEnd / 60))}${pad(totalEnd % 60)}00`;
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SELF SCI//Demo//ES',
    'BEGIN:VEVENT',
    `DTSTART:${fechaISO}T${horaStr}`,
    `DTEND:${fechaISO}T${endHora}`,
    `SUMMARY:${titulo}`,
    'DESCRIPTION:Sesión grupal SELF SCI — Programa de Desarrollo',
    'ORGANIZER;CN=SELF SCI:mailto:noreply@selfsci.app',
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  downloadBlobFile(ics, titulo.replace(/[^a-zA-Z0-9]/g, '_') + '.ics', 'text/calendar');
  showToast('📅 Evento guardado en tu calendario', 'success');
}

// ── Imprimir diploma ──
function printDiploma() {
  const style = document.createElement('style');
  style.id = 'print-diploma-style';
  style.textContent = `
    @media print {
      body > *:not(#app) { display:none!important; }
      .screen { display:none!important; }
      #screen-diploma { display:flex!important; }
      nav.navbar, .capi-container, [style*="gap:16px"][style*="justify-content:center"],
      .capi-avatar, .card:last-child { display:none!important; }
      #diploma { box-shadow:none!important; border:2px solid #ccc!important; }
    }`;
  document.head.appendChild(style);
  window.print();
  setTimeout(() => document.getElementById('print-diploma-style')?.remove(), 1500);
  showToast('🖨️ Abriendo vista de impresión...', 'info');
}

// ── Imprimir reporte (dashboard) ──
function printReporte() {
  window.print();
  showToast('🖨️ Abriendo vista de impresión...', 'info');
}

// ── Modal de sesión (Unirse) ──
function abrirModalSesion(titulo, fechaHora, link) {
  let modal = document.getElementById('modal-sesion');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-sesion';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px);';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  }
  modal.innerHTML = `
    <div style="background:#0d0d1a;border:1.5px solid rgba(0,216,218,0.3);border-radius:20px;padding:36px;max-width:440px;width:100%;position:relative;">
      <button onclick="document.getElementById('modal-sesion').style.display='none'"
              style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.07);border:none;color:rgba(255,255,255,0.5);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:15px;">✕</button>
      <div style="font-size:40px;margin-bottom:16px;">📹</div>
      <h3 style="font-size:18px;font-weight:700;margin-bottom:6px;color:white;">${titulo}</h3>
      <p style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:24px;"><i class="fas fa-calendar" style="color:var(--cyan);margin-right:6px;"></i>${fechaHora}</p>
      <div style="background:rgba(0,216,218,0.07);border:1px solid rgba(0,216,218,0.2);border-radius:12px;padding:14px 16px;margin-bottom:20px;">
        <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:5px;text-transform:uppercase;letter-spacing:1px;">Liga de acceso</div>
        <div style="font-size:13px;color:var(--cyan);word-break:break-all;">${link}</div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary" style="flex:1;"
                onclick="window.open('${link}','_blank');document.getElementById('modal-sesion').style.display='none'">
          <i class="fas fa-video"></i> Unirse ahora
        </button>
        <button class="btn btn-secondary"
                onclick="copiarAlPortapapeles('${link}','Liga de sesión copiada')">
          <i class="fas fa-link"></i> Copiar
        </button>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

// ── Modal de video (reproductor) ──
function abrirVideoPlayer() {
  let modal = document.getElementById('modal-video');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-video';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px);';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  }
  modal.innerHTML = `
    <div style="background:#0d0d1a;border:1.5px solid rgba(0,216,218,0.2);border-radius:20px;max-width:700px;width:100%;overflow:hidden;position:relative;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:2px;">MÓDULO 1 · Lección 2</div>
          <div style="font-weight:700;font-size:15px;">Estilos de Liderazgo Situacional — 8:32 min</div>
        </div>
        <button onclick="document.getElementById('modal-video').style.display='none'"
                style="background:rgba(255,255,255,0.07);border:none;color:rgba(255,255,255,0.5);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:15px;">✕</button>
      </div>
      <div style="position:relative;padding-top:56.25%;background:#000;">
        <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
          src="https://www.youtube.com/embed/qp0HIF3SfI4?autoplay=1&rel=0&modestbranding=1"
          allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div style="padding:14px 20px;background:rgba(255,255,255,0.02);display:flex;align-items:center;gap:10px;">
        <span class="badge badge-magenta">🔥 En curso — Lección 2</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.4);margin-left:auto;">Fuente: TED · Simon Sinek</span>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

// ── Descargar recursos de lección ──
function descargarRecurso(tipo) {
  const recursos = {
    'guia': {
      nombre: 'Guía_Liderazgo_Situacional.txt',
      contenido: `SELF SCI — Guía de Liderazgo Situacional\n${'═'.repeat(50)}\n\nModelo de Hersey y Blanchard\n\nS1 · DIRIGIR\n  Alta tarea / baja relación.\n  Para colaboradores nuevos o sin experiencia.\n\nS2 · ENTRENAR\n  Alta tarea + alta relación.\n  Explica el porqué y da soporte emocional.\n\nS3 · APOYAR\n  Baja tarea / alta relación.\n  El colaborador decide; tú das soporte.\n\nS4 · DELEGAR\n  Baja tarea + baja relación.\n  Colaborador experto y autónomo.\n\n${'─'.repeat(50)}\n© 2025 SELF SCI · Supply Chain Institute`
    },
    'autoevaluacion': {
      nombre: 'Autoevaluación_Estilo_Liderazgo.txt',
      contenido: `SELF SCI — Autoevaluación de Estilo de Liderazgo\n${'═'.repeat(50)}\n\nResponde del 1 (nunca) al 5 (siempre):\n\n[ ] 1. Doy instrucciones detalladas para cada tarea.\n[ ] 2. Explico el razonamiento detrás de mis decisiones.\n[ ] 3. Involucro al equipo en la toma de decisiones.\n[ ] 4. Delego proyectos completos con confianza.\n[ ] 5. Adapto mi estilo según la persona y situación.\n\nInterpretación:\n  5–8  → Estilo S1 Directivo\n  9–14 → Estilo S2 Entrenador\n  15–20→ Estilo S3 Apoyo\n  21–25→ Estilo S4 Delegador\n\n${'─'.repeat(50)}\n© 2025 SELF SCI · Supply Chain Institute`
    }
  };
  const r = recursos[tipo];
  if (!r) return;
  downloadBlobFile(r.contenido, r.nombre, 'text/plain;charset=utf-8');
  showToast(`📥 Descargando: ${r.nombre}`, 'success');
}

// ── Plantilla CSV de participantes ──
function descargarPlantilla() {
  const csv = [
    'Nombre completo,Correo,Contraseña inicial,Rol,Área',
    'Juan Pérez García,juan.perez@empresa.com,Temp2025!,Participante,Operaciones',
    'María López Torres,m.lopez@empresa.com,Temp2025!,Líder / Manager,Logística',
    'Carlos Hernández Ruiz,c.hernandez@empresa.com,Temp2025!,RH,Recursos Humanos'
  ].join('\n');
  downloadBlobFile(csv, 'plantilla-participantes.csv', 'text/csv;charset=utf-8');
  showToast('📥 Plantilla descargada: plantilla-participantes.csv', 'success');
}

// ── Importar participantes (file input real) ──
function importarParticipantes() {
  let fi = document.getElementById('__import-fi');
  if (!fi) {
    fi = document.createElement('input');
    fi.type = 'file'; fi.id = '__import-fi'; fi.accept = '.csv,.xlsx,.xls';
    fi.style.display = 'none';
    document.body.appendChild(fi);
    fi.addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      showToast(`📤 Procesando: ${f.name}...`, 'info');
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = new Uint8Array(ev.target.result);
          const wb   = XLSX.read(data, { type: 'array' });
          const ws   = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
          if (!rows.length) { showToast('⚠️ El archivo está vacío', 'error'); return; }
          // Normalizar headers
          const normaliza = str => String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
          const keys = Object.keys(rows[0]).map(normaliza);
          const iNombre = keys.findIndex(h => h.includes('nombre'));
          const iCorreo = keys.findIndex(h => h.includes('correo') || h.includes('email') || h.includes('usuario'));
          const iRol    = keys.findIndex(h => h.includes('rol'));
          const iArea   = keys.findIndex(h => h.includes('area'));
          if (iNombre < 0 || iCorreo < 0) {
            showToast('⚠️ El archivo debe tener columnas: Nombre, Correo, Rol, Área', 'error');
            return;
          }
          const origKeys = Object.keys(rows[0]);
          let agregados = 0;
          rows.forEach(row => {
            const nombre = String(row[origKeys[iNombre]] || '').trim();
            const correo = String(row[origKeys[iCorreo]] || '').trim();
            if (!nombre || !correo) return;
            const rol  = iRol  >= 0 ? String(row[origKeys[iRol]]  || 'Participante').trim() : 'Participante';
            const area = iArea >= 0 ? String(row[origKeys[iArea]] || '—').trim() : '—';
            mockParticipantes.push({ nombre, correo, rol, area, avance: 0, estado: 'Activo' });
            agregados++;
          });
          fi.value = '';
          renderTablaParticipantes();
          showToast(`✅ ${agregados} participante(s) importado(s) desde ${f.name}`, 'success');
        } catch(err) {
          showToast('⚠️ Error al leer el archivo: ' + err.message, 'error');
        }
      };
      reader.readAsArrayBuffer(f);
    });
  }
  fi.click();
}

// ── Subir logo (file input real + actualiza preview) ──
function subirLogo() {
  let fi = document.getElementById('__logo-fi');
  if (!fi) {
    fi = document.createElement('input');
    fi.type = 'file'; fi.id = '__logo-fi'; fi.accept = 'image/png,image/svg+xml,image/jpeg';
    fi.style.display = 'none';
    document.body.appendChild(fi);
    fi.addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const src = ev.target.result;
        // Update upload zone
        const zone = document.getElementById('logo-upload-zone');
        if (zone) zone.innerHTML = `<img src="${src}" style="max-height:72px;max-width:180px;object-fit:contain;border-radius:8px;"/><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:8px;">${f.name}</div>`;
        // Update navbar preview
        const prev = document.getElementById('preview-logo-icon');
        if (prev) prev.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:contain;border-radius:7px;"/>`;
        showToast(`✅ Logo actualizado: ${f.name}`, 'success');
      };
      reader.readAsDataURL(f);
      fi.value = '';
    });
  }
  fi.click();
}

// ── Eliminar participante ──
function eliminarParticipante(idx) {
  if (!confirm(`¿Eliminar a ${mockParticipantes[idx]?.nombre}?`)) return;
  mockParticipantes.splice(idx, 1);
  renderTablaParticipantes();
  showToast('🗑️ Participante eliminado', 'info');
}

// ── Enviar invitación ──
function enviarInvitacion(idx) {
  const p = mockParticipantes[idx];
  if (!p) return;
  showToast(`📧 Invitación enviada a ${p.correo}`, 'success');
  // Animate the badge to show "Activo" if was inactive
  if (p.estado === 'Inactivo') {
    mockParticipantes[idx].estado = 'Activo';
    setTimeout(() => renderTablaParticipantes(), 600);
  }
}

// ── Editar participante inline ──
function editarParticipanteInline(idx) {
  const tbody = document.getElementById('tabla-participantes');
  if (!tbody) return;
  const row = tbody.querySelectorAll('tr')[idx];
  if (!row) return;
  const p = mockParticipantes[idx];
  row.innerHTML = `
    <td style="padding:8px 12px;" colspan="2">
      <input class="form-input" id="ep-nombre-${idx}" value="${p.nombre}"
             style="margin-bottom:6px;font-size:12px;padding:6px 10px;" placeholder="Nombre completo"/>
      <input class="form-input" id="ep-correo-${idx}" value="${p.correo}"
             style="font-size:12px;padding:6px 10px;" placeholder="Correo"/>
    </td>
    <td style="padding:8px 12px;">
      <select class="form-select" id="ep-rol-${idx}" style="font-size:12px;padding:6px 10px;">
        <option ${p.rol==='Participante'?'selected':''}>Participante</option>
        <option ${p.rol==='Líder / Manager'?'selected':''}>Líder / Manager</option>
        <option ${p.rol==='RH'?'selected':''}>RH</option>
      </select>
    </td>
    <td></td>
    <td style="text-align:center;padding:8px 12px;">
      <span class="badge ${p.estado==='Activo'?'badge-green':'badge-orange'}">${p.estado}</span>
    </td>
    <td style="text-align:center;padding:8px 12px;">
      <div style="display:flex;gap:6px;justify-content:center;">
        <button class="btn btn-primary btn-sm" style="padding:5px 12px;font-size:11px;" onclick="guardarParticipante(${idx})">
          <i class="fas fa-check"></i> Guardar
        </button>
        <button class="btn btn-secondary btn-sm" style="padding:5px 10px;font-size:11px;" onclick="renderTablaParticipantes()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </td>`;
}

function guardarParticipante(idx) {
  const nombre  = document.getElementById(`ep-nombre-${idx}`)?.value?.trim();
  const correo  = document.getElementById(`ep-correo-${idx}`)?.value?.trim();
  const rol     = document.getElementById(`ep-rol-${idx}`)?.value;
  if (nombre) mockParticipantes[idx].nombre = nombre;
  if (correo) mockParticipantes[idx].correo = correo;
  if (rol)    mockParticipantes[idx].rol    = rol;
  renderTablaParticipantes();
  showToast('✅ Participante actualizado', 'success');
}

// ── Copiar liga de sesión ──
function copiarLigaSesion(idx) {
  const s = mockSesiones[idx];
  const link = `https://selfsci.app/sesion/${encodeURIComponent(s.titulo.replace(/\s+/g, '-').toLowerCase())}`;
  copiarAlPortapapeles(link, 'Liga de sesión copiada');
}

// ── Eliminar sesión ──
function eliminarSesion(idx) {
  if (!confirm(`¿Eliminar la sesión "${mockSesiones[idx]?.titulo}"?`)) return;
  mockSesiones.splice(idx, 1);
  renderSesionesSync();
  showToast('🗑️ Sesión eliminada', 'info');
}

// ── Editar sesión inline ──
function editarSesionInline(idx) {
  const s = mockSesiones[idx];
  const container = document.getElementById('sesiones-sync-list');
  if (!container) return;
  const cards = container.querySelectorAll('.card');
  const card = cards[idx];
  if (!card) return;
  card.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;flex:1;">
      <div class="form-group" style="margin:0;">
        <label class="form-label" style="font-size:11px;">Título</label>
        <input class="form-input" id="es-titulo-${idx}" value="${s.titulo}" style="font-size:12px;padding:7px 10px;"/>
      </div>
      <div class="form-group" style="margin:0;">
        <label class="form-label" style="font-size:11px;">Fecha</label>
        <input class="form-input" id="es-fecha-${idx}" value="${s.fecha}" style="font-size:12px;padding:7px 10px;"/>
      </div>
      <div class="form-group" style="margin:0;">
        <label class="form-label" style="font-size:11px;">Facilitador</label>
        <input class="form-input" id="es-facilitador-${idx}" value="${s.facilitador}" style="font-size:12px;padding:7px 10px;"/>
      </div>
    </div>
    <div style="display:flex;gap:8px;align-items:flex-end;flex-shrink:0;">
      <button class="btn btn-primary btn-sm" onclick="guardarSesion(${idx})"><i class="fas fa-check"></i> Guardar</button>
      <button class="btn btn-secondary btn-sm" onclick="renderSesionesSync()"><i class="fas fa-times"></i></button>
    </div>`;
  card.style.flexWrap = 'wrap';
  card.style.gap = '12px';
}

function guardarSesion(idx) {
  const titulo      = document.getElementById(`es-titulo-${idx}`)?.value?.trim();
  const fecha       = document.getElementById(`es-fecha-${idx}`)?.value?.trim();
  const facilitador = document.getElementById(`es-facilitador-${idx}`)?.value?.trim();
  if (titulo)      mockSesiones[idx].titulo      = titulo;
  if (fecha)       mockSesiones[idx].fecha       = fecha;
  if (facilitador) mockSesiones[idx].facilitador = facilitador;
  renderSesionesSync();
  showToast('✅ Sesión actualizada', 'success');
}

// ── Editar módulo (modal) ──
let _moduloEditIdx = null;
function editarModulo(idx) {
  _moduloEditIdx = idx;
  const m = mockModulosGrid[idx];
  let modal = document.getElementById('modal-editar-modulo');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-editar-modulo';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(6px);';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
  }
  modal.innerHTML = `
    <div style="background:#0d0d1a;border:1.5px solid rgba(248,0,250,0.3);border-radius:20px;padding:32px;max-width:500px;width:100%;position:relative;">
      <button onclick="document.getElementById('modal-editar-modulo').style.display='none'"
              style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.07);border:none;color:rgba(255,255,255,0.5);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:15px;">✕</button>
      <h3 style="font-weight:700;margin-bottom:20px;font-size:17px;color:var(--white);">Editar Módulo</h3>
      <div class="form-group">
        <label class="form-label">Nombre del módulo</label>
        <input class="form-input" id="em-nombre" value="${m.nombre}"/>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
        <div class="form-group">
          <label class="form-label">Nivel</label>
          <select class="form-select" id="em-nivel">
            ${['Nivel 1 — Novato','Nivel 2 — Principiante','Nivel 3 — Competente','Nivel 4 — Avanzado','Nivel 5 — Experto']
              .map(n => `<option ${m.nivel===n?'selected':''}>${n}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Duración</label>
          <input class="form-input" id="em-duracion" value="${m.duracion}" placeholder="Ej: 4h"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Temas (separados por coma)</label>
        <input class="form-input" id="em-temas" value="${m.temas.join(', ')}" placeholder="Liderazgo, Comunicación, Delegación"/>
      </div>
      <div style="display:flex;gap:10px;margin-top:8px;">
        <button class="btn btn-primary" style="flex:1;" onclick="guardarEdicionModulo()"><i class="fas fa-save"></i> Guardar cambios</button>
        <button class="btn btn-secondary" onclick="document.getElementById('modal-editar-modulo').style.display='none'">Cancelar</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
}

function guardarEdicionModulo() {
  if (_moduloEditIdx === null) return;
  const nombre   = document.getElementById('em-nombre')?.value?.trim();
  const nivel    = document.getElementById('em-nivel')?.value;
  const duracion = document.getElementById('em-duracion')?.value?.trim();
  const temasStr = document.getElementById('em-temas')?.value;
  if (nombre)   mockModulosGrid[_moduloEditIdx].nombre   = nombre;
  if (nivel)    mockModulosGrid[_moduloEditIdx].nivel    = nivel;
  if (duracion) mockModulosGrid[_moduloEditIdx].duracion = duracion;
  if (temasStr) mockModulosGrid[_moduloEditIdx].temas    = temasStr.split(',').map(t => t.trim()).filter(Boolean);
  document.getElementById('modal-editar-modulo').style.display = 'none';
  renderModulosGrid();
  showToast('✅ Módulo actualizado', 'success');
}

// ── Duplicar módulo ──
function duplicarModulo(idx) {
  const copia = { ...mockModulosGrid[idx], nombre: mockModulosGrid[idx].nombre + ' (copia)', temas: [...mockModulosGrid[idx].temas] };
  mockModulosGrid.splice(idx + 1, 0, copia);
  renderModulosGrid();
  showToast('📋 Módulo duplicado — puedes editarlo', 'success');
}

// ── Toggle form nuevo módulo ──
function toggleNuevoModulo() {
  let form = document.getElementById('form-nuevo-modulo');
  if (!form) {
    form = document.createElement('div');
    form.id = 'form-nuevo-modulo';
    const grid = document.getElementById('modulos-grid');
    if (grid) grid.parentElement.insertBefore(form, grid);
  }
  if (!form.innerHTML || form.style.display === 'none') {
    form.style.display = 'block';
    form.innerHTML = `
      <div class="card" style="border-color:rgba(248,0,250,0.35);margin-bottom:20px;">
        <h3 class="section-title" style="margin-bottom:20px;"><span>Nuevo</span> Módulo</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div class="form-group" style="margin:0;">
            <label class="form-label">Nombre del módulo *</label>
            <input class="form-input" id="nm-nombre" placeholder="Ej: Gestión de Conflictos"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Nivel</label>
            <select class="form-select" id="nm-nivel">
              <option>Nivel 1 — Novato</option><option>Nivel 2 — Principiante</option>
              <option selected>Nivel 3 — Competente</option><option>Nivel 4 — Avanzado</option><option>Nivel 5 — Experto</option>
            </select>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Duración</label>
            <input class="form-input" id="nm-duracion" placeholder="Ej: 3h" value="2h"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Ícono (emoji)</label>
            <input class="form-input" id="nm-icono" value="📚" style="font-size:20px;"/>
          </div>
          <div class="form-group" style="margin:0;grid-column:1/-1;">
            <label class="form-label">Temas (separados por coma)</label>
            <input class="form-input" id="nm-temas" placeholder="Liderazgo, Comunicación, Equipos"/>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <button class="btn btn-magenta" onclick="crearNuevoModulo()">Crear módulo <i class="fas fa-plus"></i></button>
          <button class="btn btn-secondary" onclick="document.getElementById('form-nuevo-modulo').style.display='none'">Cancelar</button>
        </div>
      </div>`;
  } else {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

function crearNuevoModulo() {
  const nombre   = document.getElementById('nm-nombre')?.value?.trim();
  const nivel    = document.getElementById('nm-nivel')?.value;
  const duracion = document.getElementById('nm-duracion')?.value || '2h';
  const icono    = document.getElementById('nm-icono')?.value || '📚';
  const temasStr = document.getElementById('nm-temas')?.value || '';
  if (!nombre) { showToast('⚠️ El nombre del módulo es requerido', 'error'); return; }
  mockModulosGrid.push({ nombre, icono, nivel, temas: temasStr.split(',').map(t => t.trim()).filter(Boolean), duracion, activos: 0 });
  document.getElementById('form-nuevo-modulo').style.display = 'none';
  renderModulosGrid();
  showToast(`✅ Módulo "${nombre}" creado`, 'success');
}

// ── Toggle form nueva sesión síncrona ──
function toggleNuevaSesion() {
  let form = document.getElementById('form-nueva-sesion');
  if (!form) {
    form = document.createElement('div');
    form.id = 'form-nueva-sesion';
    const list = document.getElementById('sesiones-sync-list');
    if (list) list.parentElement.insertBefore(form, list);
  }
  if (!form.innerHTML || form.style.display === 'none') {
    form.style.display = 'block';
    form.innerHTML = `
      <div class="card" style="border-color:rgba(0,216,218,0.3);margin-bottom:16px;">
        <h4 style="margin-bottom:16px;color:var(--cyan);">Nueva sesión síncrona</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group" style="margin:0;">
            <label class="form-label">Título *</label>
            <input class="form-input" id="ns-titulo" placeholder="Ej: Taller de Liderazgo"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Tipo</label>
            <select class="form-select" id="ns-tipo">
              <option>Zoom</option><option>Teams</option><option>Presencial</option>
            </select>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Fecha</label>
            <input class="form-input" type="date" id="ns-fecha"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Hora</label>
            <input class="form-input" type="time" id="ns-hora" value="10:00"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Facilitador</label>
            <input class="form-input" id="ns-facilitador" placeholder="Nombre del facilitador"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Duración (minutos)</label>
            <input class="form-input" type="number" id="ns-duracion" value="90" min="15" step="15"/>
          </div>
          <div class="form-group" style="margin:0;">
            <label class="form-label">Máx. participantes</label>
            <input class="form-input" type="number" id="ns-max" value="40"/>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <button class="btn btn-primary" onclick="crearNuevaSesion()">Agregar sesión <i class="fas fa-plus"></i></button>
          <button class="btn btn-secondary" onclick="document.getElementById('form-nueva-sesion').style.display='none'">Cancelar</button>
        </div>
      </div>`;
  } else {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

function crearNuevaSesion() {
  const titulo      = document.getElementById('ns-titulo')?.value?.trim();
  const tipo        = document.getElementById('ns-tipo')?.value;
  const fechaRaw    = document.getElementById('ns-fecha')?.value;
  const hora        = document.getElementById('ns-hora')?.value || '10:00';
  const facilitador = document.getElementById('ns-facilitador')?.value?.trim() || 'Por definir';
  const duracion    = parseInt(document.getElementById('ns-duracion')?.value) || 90;
  const max         = parseInt(document.getElementById('ns-max')?.value) || 40;
  if (!titulo) { showToast('⚠️ El título es requerido', 'error'); return; }
  const fechaDisplay = fechaRaw
    ? new Date(fechaRaw + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Por confirmar';
  mockSesiones.push({ titulo, tipo, fecha: fechaDisplay, hora: hora + ' hrs', duracion: duracion + ' min', facilitador, inscritos: 0, max });
  document.getElementById('form-nueva-sesion').style.display = 'none';
  renderSesionesSync();
  showToast(`✅ Sesión "${titulo}" agregada`, 'success');
}

// ── Crear empresa y navegar a config ──
function crearEmpresaYConfigurar() {
  const nombre = document.querySelector('#form-nueva-empresa input[placeholder*="Grupo"]')?.value?.trim();
  if (!nombre) { showToast('⚠️ El nombre de la empresa es requerido', 'error'); return; }
  // Update the config screen header with the new company name
  const h1 = document.querySelector('#screen-admin-empresa-config h1.page-title');
  if (h1) h1.textContent = nombre;
  toggleNewEmpresa();
  navigate('screen-admin-empresa-config');
  showToast(`✅ Empresa "${nombre}" creada — completa la configuración`, 'success');
}

// ── Guardar configuración empresa (animated) ──
function guardarCambiosEmpresa(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
  btn.disabled = true;
  btn.style.opacity = '0.8';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
    btn.style.background = 'linear-gradient(135deg,#00ff88,#00d8da)';
    btn.style.opacity = '1';
    showToast('✅ Configuración guardada correctamente', 'success');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
    }, 2500);
  }, 900);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  console.log('🦫 SELF SCI Demo loaded!');
  // Asegurar que la landing sea la pantalla inicial
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const landing = document.getElementById('screen-landing');
  if (landing) landing.classList.add('active');
});

// ══════════════════════════════════════
//  CALENDARIO DINÁMICO
// ══════════════════════════════════════

const calState = { year: 2025, month: 3 }; // 0-indexed: 3 = Abril

const PROGRAM_START = new Date(2025, 3, 16); // 16 Abr 2025

const MESES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const MESES_ABBR = { 'Ene':0,'Feb':1,'Mar':2,'Abr':3,'May':4,'Jun':5,
                     'Jul':6,'Ago':7,'Sep':8,'Oct':9,'Nov':10,'Dic':11 };

const MODULE_COLORS = [
  { color: 'var(--cyan)',    bg: 'rgba(0,216,218,0.25)'   },
  { color: 'var(--purple)',  bg: 'rgba(117,114,233,0.25)' },
  { color: '#00ff88',        bg: 'rgba(0,255,136,0.2)'    },
  { color: 'var(--magenta)', bg: 'rgba(248,0,250,0.2)'    },
  { color: 'orange',         bg: 'rgba(255,165,0,0.2)'    },
  { color: '#ff6b6b',        bg: 'rgba(255,107,107,0.2)'  },
];

function getModuleCalEvents() {
  const gen = getGenData();
  const mods = gen.modulosConfig || mockModulosConfig;
  const programStart = gen.startDate || PROGRAM_START;
  return mods
    .filter(m => m.activo)
    .map((m, i) => {
      const match = m.semana.match(/Semana (\d+)[-–](\d+)/);
      if (!match) return null;
      const w1 = parseInt(match[1]);
      const w2 = parseInt(match[2]);
      const startDate = new Date(programStart);
      startDate.setDate(startDate.getDate() + (w1 - 1) * 7);
      const endDate = new Date(programStart);
      endDate.setDate(endDate.getDate() + w2 * 7 - 1);
      const clr = MODULE_COLORS[i % MODULE_COLORS.length];
      return { startDate, endDate, label: m.icono + ' ' + m.nombre, type: 'modulo', color: clr.color, bg: clr.bg };
    })
    .filter(Boolean);
}

function getSessionCalEvents() {
  const gen = getGenData();
  const sesiones = gen.sesiones || mockSesiones;
  return sesiones.map(s => {
    const parts = s.fecha.split(' ');
    const month = MESES_ABBR[parts[1]];
    if (month === undefined) return null;
    const date = new Date(parseInt(parts[2]), month, parseInt(parts[0]));
    return { date, label: s.titulo, hora: s.hora, type: 'sesion' };
  }).filter(Boolean);
}

function renderCalendario() {
  const label = document.getElementById('cal-mes-label');
  const grid  = document.getElementById('calendario-grid');
  if (!label || !grid) return;

  // Si el calState no fue cambiado manualmente, posicionarlo en el mes de inicio de la generación
  const gen = getGenData();
  if (!calState._manuallyChanged) {
    const start = gen.startDate || PROGRAM_START;
    calState.year  = start.getFullYear();
    calState.month = start.getMonth();
  }

  const { year, month } = calState;
  label.textContent = MESES_ES[month] + ' ' + year;

  const modEvents = getModuleCalEvents();
  const sesEvents = getSessionCalEvents();

  const firstDay  = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const DIAS = ['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'];

  // Lunes=0 ... Domingo=6
  let startDow = (firstDay.getDay() + 6) % 7;

  function eventsForDay(d) {
    const events = [];
    const cur = new Date(year, month, d);
    modEvents.forEach(e => {
      if (cur >= e.startDate && cur <= e.endDate) {
        const isStart = cur.getTime() === e.startDate.getTime();
        events.push({
          label: isStart ? e.label : '',
          color: e.color, bg: e.bg,
          isBar: true, isStart
        });
      }
    });
    sesEvents.forEach(e => {
      if (e.date.getFullYear()===year && e.date.getMonth()===month && e.date.getDate()===d)
        events.push({ label: e.label + (e.hora ? ' · ' + e.hora : ''), color:'var(--magenta)', bg:'rgba(248,0,250,0.15)' });
    });
    return events;
  }

  // Construir celdas
  let cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const headerHtml = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid rgba(255,255,255,0.08);">
      ${DIAS.map((d,i) => `<div style="padding:10px;text-align:center;font-size:12px;font-weight:700;color:${i>=5?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.4)'};">${d}</div>`).join('')}
    </div>`;

  const bodyHtml = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);">
      ${cells.map((day, idx) => {
        const isLastRow  = idx >= cells.length - 7;
        const isLastCol  = (idx + 1) % 7 === 0;
        const isWeekend  = idx % 7 >= 5;
        const borderB = isLastRow ? '' : 'border-bottom:1px solid rgba(255,255,255,0.05);';
        const borderR = isLastCol ? '' : 'border-right:1px solid rgba(255,255,255,0.05);';
        if (!day) return `<div style="padding:10px;min-height:80px;${borderR}${borderB}"></div>`;
        const evHtml = eventsForDay(day).map(e => {
          if (e.isBar) {
            return `<div style="margin-top:3px;padding:2px 6px;background:${e.bg};border-left:${e.isStart?'3px solid var(--cyan)':'0px'};border-radius:${e.isStart?'4px':'0 4px 4px 0'};font-size:11px;color:${e.color};line-height:1.4;">${e.label || '&nbsp;'}</div>`;
          }
          return `<div style="margin-top:3px;padding:3px 6px;background:${e.bg};border-left:2px solid ${e.color};border-radius:4px;font-size:11px;color:${e.color};line-height:1.3;">${e.label}</div>`;
        }).join('');
        return `<div style="padding:10px;min-height:80px;${borderR}${borderB}">
          <div style="font-size:13px;color:${isWeekend?'rgba(255,255,255,0.25)':'inherit'};">${day}</div>
          ${evHtml}
        </div>`;
      }).join('')}
    </div>`;

  grid.innerHTML = `<div class="card" style="padding:0;overflow:hidden;">${headerHtml}${bodyHtml}</div>`;
}

function calendarPrev() {
  calState._manuallyChanged = true;
  calState.month--;
  if (calState.month < 0) { calState.month = 11; calState.year--; }
  renderCalendario();
}

function calendarNext() {
  calState._manuallyChanged = true;
  calState.month++;
  if (calState.month > 11) { calState.month = 0; calState.year++; }
  renderCalendario();
}

// ══════════════════════════════════════
//  KPI: AVANCE PROMEDIO DINÁMICO
// ══════════════════════════════════════
function renderKpiAvancePromedio() {
  const el = document.getElementById('kpi-avance-promedio');
  if (!el) return;
  const avances = [72, 58, 0]; // avances de las 3 empresas mock
  const promedio = Math.round(avances.reduce((a, b) => a + b, 0) / avances.filter(a => a > 0).length);
  el.textContent = promedio + '%';
}

// ══════════════════════════════════════
//  CALENDARIO GLOBAL (Panel Admin)
// ══════════════════════════════════════
const calGlobalState = { year: 2025, month: 3 };

// Datos de empresas: inicio del programa y color
const mockEmpresas = [
  { nombre: 'Manufactura Avanzada', color: 'rgba(0,216,218,0.7)', border: 'var(--cyan)',   start: new Date(2025, 3, 16) },
  { nombre: 'Grupo Salud Integral', color: 'rgba(117,114,233,0.7)', border: 'var(--purple)', start: new Date(2025, 4, 1)  },
  { nombre: 'Retail Express MX',    color: 'rgba(255,165,0,0.7)',   border: 'orange',        start: null },
];

const mockGeneraciones = [
  {
    id:'mayo-2025', nombre:'Generación Mayo 2025',
    inicio:'28 Abr 2025', cierre:'8 Ago 2025',
    startDate: new Date(2025, 3, 28),
    estado:'En curso', participantes:24,
    participantesData: [
      { nombre:'Ana García',       correo:'ana.garcia@manufactura.mx',  rol:'Participante',    avance:88, estado:'Activo'   },
      { nombre:'Carlos Méndez',    correo:'c.mendez@manufactura.mx',    rol:'Líder / Manager', avance:65, estado:'Activo'   },
      { nombre:'Laura Torres',     correo:'l.torres@manufactura.mx',    rol:'Participante',    avance:42, estado:'Activo'   },
      { nombre:'Roberto Silva',    correo:'r.silva@manufactura.mx',     rol:'RH',              avance:95, estado:'Activo'   },
      { nombre:'María López',      correo:'m.lopez@manufactura.mx',     rol:'Participante',    avance:71, estado:'Activo'   },
      { nombre:'José Hernández',   correo:'j.hernandez@manufactura.mx', rol:'Participante',    avance:30, estado:'Inactivo' },
      { nombre:'Sofía Ramírez',    correo:'s.ramirez@manufactura.mx',   rol:'Participante',    avance:58, estado:'Activo'   },
      { nombre:'Diego Castillo',   correo:'d.castillo@manufactura.mx',  rol:'Líder / Manager', avance:80, estado:'Activo'   },
      { nombre:'Valeria Cruz',     correo:'v.cruz@manufactura.mx',      rol:'Participante',    avance:66, estado:'Activo'   },
      { nombre:'Andrés Morales',   correo:'a.morales@manufactura.mx',   rol:'Participante',    avance:62, estado:'Activo'   },
      { nombre:'Patricia Reyes',   correo:'p.reyes@manufactura.mx',     rol:'RH',              avance:59, estado:'Activo'   },
      { nombre:'Fernando Guzmán',  correo:'f.guzman@manufactura.mx',    rol:'Participante',    avance:55, estado:'Inactivo' },
      { nombre:'Isabel Vega',      correo:'i.vega@manufactura.mx',      rol:'Participante',    avance:53, estado:'Activo'   },
      { nombre:'Miguel Ramos',     correo:'m.ramos@manufactura.mx',     rol:'Participante',    avance:49, estado:'Activo'   },
      { nombre:'Carmen Ortiz',     correo:'c.ortiz@manufactura.mx',     rol:'Líder / Manager', avance:46, estado:'Activo'   },
      { nombre:'Eduardo Jiménez',  correo:'e.jimenez@manufactura.mx',   rol:'Participante',    avance:44, estado:'Activo'   },
      { nombre:'Lucía Flores',     correo:'l.flores@manufactura.mx',    rol:'Participante',    avance:41, estado:'Activo'   },
      { nombre:'Héctor Domínguez', correo:'h.dominguez@manufactura.mx', rol:'Participante',    avance:38, estado:'Activo'   },
      { nombre:'Gabriela Medina',  correo:'g.medina@manufactura.mx',    rol:'Participante',    avance:35, estado:'Inactivo' },
      { nombre:'Ricardo Peña',     correo:'r.pena@manufactura.mx',      rol:'Participante',    avance:32, estado:'Activo'   },
      { nombre:'Alejandra Vargas', correo:'a.vargas@manufactura.mx',    rol:'Participante',    avance:30, estado:'Activo'   },
      { nombre:'Jorge Soto',       correo:'j.soto@manufactura.mx',      rol:'Participante',    avance:27, estado:'Activo'   },
      { nombre:'Natalia Aguilar',  correo:'n.aguilar@manufactura.mx',   rol:'RH',              avance:25, estado:'Activo'   },
      { nombre:'Claudia Ríos',     correo:'c.rios@manufactura.mx',      rol:'Participante',    avance:11, estado:'Inactivo' },
    ],
    modulosConfig: [
      { nombre:'Connected Customer & Product',  icono:'🌐', semana:'Semana 1–2',   duracion:'10 días',   obligatorio:true,  activo:true  },
      { nombre:'Planeación Sincrónica',          icono:'🔄', semana:'Semana 3–4',   duracion:'10 días',   obligatorio:true,  activo:true  },
      { nombre:'Smart Operations',               icono:'⚙️', semana:'Semana 5–7',   duracion:'10 días',   obligatorio:true,  activo:true  },
      { nombre:'Dynamic Fulfillment',            icono:'🚀', semana:'Semana 8–10',  duracion:'10 días',   obligatorio:true,  activo:true  },
      { nombre:'Game Changers',                  icono:'🎯', semana:'Semana 11–15', duracion:'25 días',   obligatorio:false, activo:true  },
    ],
    sesiones: [
      { titulo:'Kick-off Generación Mayo 2025', tipo:'Zoom',       fecha:'28 Abr 2025', hora:'10:00 AM', duracion:'90 min',  facilitador:'Dr. Santiago Rueda', inscritos:24, max:30 },
      { titulo:'Taller: Liderazgo en acción',   tipo:'Teams',      fecha:'15 May 2025', hora:'3:00 PM',  duracion:'120 min', facilitador:'Lic. Andrea Mora',   inscritos:20, max:30 },
      { titulo:'Cierre y diplomas',             tipo:'Presencial', fecha:'8 Ago 2025',  hora:'9:00 AM',  duracion:'180 min', facilitador:'Equipo SELF SCI',    inscritos:0,  max:30 },
    ],
  },
  {
    id:'ene-2025', nombre:'Generación Enero 2025',
    inicio:'13 Ene 2025', cierre:'2 May 2025',
    startDate: new Date(2025, 0, 13),
    estado:'Completada', participantes:18,
    participantesData: [
      { nombre:'Beatriz Fuentes',  correo:'b.fuentes@manufactura.mx',   rol:'Participante',    avance:100, estado:'Activo' },
      { nombre:'Ramón Castañeda',  correo:'r.castaneda@manufactura.mx', rol:'Líder / Manager', avance:100, estado:'Activo' },
      { nombre:'Gloria Espinoza',  correo:'g.espinoza@manufactura.mx',  rol:'Participante',    avance:98,  estado:'Activo' },
      { nombre:'Arturo Núñez',     correo:'a.nunez@manufactura.mx',     rol:'RH',              avance:96,  estado:'Activo' },
      { nombre:'Diana Guerrero',   correo:'d.guerrero@manufactura.mx',  rol:'Participante',    avance:94,  estado:'Activo' },
      { nombre:'Sergio Mendoza',   correo:'s.mendoza@manufactura.mx',   rol:'Participante',    avance:91,  estado:'Activo' },
      { nombre:'Lorena Delgado',   correo:'l.delgado@manufactura.mx',   rol:'Participante',    avance:89,  estado:'Activo' },
      { nombre:'Tomás Ibáñez',     correo:'t.ibanez@manufactura.mx',    rol:'Líder / Manager', avance:87,  estado:'Activo' },
      { nombre:'Claudia Ríos',     correo:'c.rios2@manufactura.mx',     rol:'Participante',    avance:84,  estado:'Activo' },
      { nombre:'Esteban Salinas',  correo:'e.salinas@manufactura.mx',   rol:'Participante',    avance:82,  estado:'Activo' },
      { nombre:'Miriam Córdova',   correo:'m.cordova@manufactura.mx',   rol:'RH',              avance:78,  estado:'Activo' },
      { nombre:'Rubén Herrera',    correo:'r.herrera@manufactura.mx',   rol:'Participante',    avance:75,  estado:'Activo' },
      { nombre:'Sandra Velázquez', correo:'s.velazquez@manufactura.mx', rol:'Participante',    avance:72,  estado:'Activo' },
      { nombre:'Cristóbal Mora',   correo:'c.mora@manufactura.mx',      rol:'Participante',    avance:68,  estado:'Activo' },
      { nombre:'Alicia Barrera',   correo:'a.barrera@manufactura.mx',   rol:'Participante',    avance:65,  estado:'Activo' },
      { nombre:'Ernesto Pacheco',  correo:'e.pacheco@manufactura.mx',   rol:'Participante',    avance:62,  estado:'Activo' },
      { nombre:'Verónica Rivas',   correo:'v.rivas@manufactura.mx',     rol:'Líder / Manager', avance:55,  estado:'Activo' },
      { nombre:'Omar Villanueva',  correo:'o.villanueva@manufactura.mx', rol:'Participante',   avance:40,  estado:'Inactivo' },
    ],
    modulosConfig: [
      { nombre:'Connected Customer & Product',  icono:'🌐', semana:'Semana 1–2',   duracion:'10 días', obligatorio:true,  activo:true },
      { nombre:'Planeación Sincrónica',          icono:'🔄', semana:'Semana 3–4',   duracion:'10 días', obligatorio:true,  activo:true },
      { nombre:'Smart Operations',               icono:'⚙️', semana:'Semana 5–7',   duracion:'10 días', obligatorio:true,  activo:true },
      { nombre:'Dynamic Fulfillment',            icono:'🚀', semana:'Semana 8–10',  duracion:'10 días', obligatorio:true,  activo:true },
      { nombre:'Game Changers',                  icono:'🎯', semana:'Semana 11–15', duracion:'25 días', obligatorio:false, activo:true },
    ],
    sesiones: [
      { titulo:'Kick-off Generación Enero 2025', tipo:'Zoom',       fecha:'13 Ene 2025', hora:'10:00 AM', duracion:'90 min',  facilitador:'Dr. Santiago Rueda', inscritos:18, max:20 },
      { titulo:'Taller de Integración',          tipo:'Teams',      fecha:'5 Feb 2025',  hora:'3:00 PM',  duracion:'120 min', facilitador:'Lic. Andrea Mora',   inscritos:16, max:20 },
      { titulo:'Cierre y diplomas Gen. Enero',   tipo:'Presencial', fecha:'2 May 2025',  hora:'9:00 AM',  duracion:'180 min', facilitador:'Equipo SELF SCI',    inscritos:17, max:20 },
    ],
  },
];

// Participantes extendidos con métricas para el Dashboard Admin
const mockParticipantesStats = [
  { nombre:'Roberto Silva',    pts:1820, aprov:91, delta:+22, nps:10, medallas:8, ranking:1 },
  { nombre:'Ana García',       pts:1740, aprov:87, delta:+19, nps:9,  medallas:7, ranking:2 },
  { nombre:'María López',      pts:1680, aprov:84, delta:+21, nps:9,  medallas:6, ranking:3 },
  { nombre:'Diego Castillo',   pts:1590, aprov:80, delta:+18, nps:8,  medallas:6, ranking:4 },
  { nombre:'Sofía Ramírez',    pts:1520, aprov:76, delta:+16, nps:8,  medallas:5, ranking:5 },
  { nombre:'Carlos Méndez',    pts:1460, aprov:73, delta:+15, nps:7,  medallas:4, ranking:6 },
  { nombre:'Laura Torres',     pts:1380, aprov:69, delta:+12, nps:7,  medallas:4, ranking:7 },
  { nombre:'Valeria Cruz',     pts:1310, aprov:66, delta:+11, nps:8,  medallas:3, ranking:8 },
  { nombre:'Andrés Morales',   pts:1240, aprov:62, delta:+10, nps:6,  medallas:3, ranking:9 },
  { nombre:'Patricia Reyes',   pts:1180, aprov:59, delta:+9,  nps:7,  medallas:3, ranking:10 },
  { nombre:'Fernando Guzmán',  pts:1100, aprov:55, delta:+8,  nps:6,  medallas:2, ranking:11 },
  { nombre:'Isabel Vega',      pts:1050, aprov:53, delta:+7,  nps:6,  medallas:2, ranking:12 },
  { nombre:'Miguel Ángel Ramos',pts:980, aprov:49, delta:+6,  nps:5,  medallas:2, ranking:13 },
  { nombre:'Carmen Ortiz',     pts:920,  aprov:46, delta:+5,  nps:5,  medallas:1, ranking:14 },
  { nombre:'Eduardo Jiménez',  pts:870,  aprov:44, delta:+4,  nps:4,  medallas:1, ranking:15 },
  { nombre:'Lucía Flores',     pts:810,  aprov:41, delta:+4,  nps:5,  medallas:1, ranking:16 },
  { nombre:'Héctor Domínguez', pts:750,  aprov:38, delta:+3,  nps:4,  medallas:1, ranking:17 },
  { nombre:'Gabriela Medina',  pts:700,  aprov:35, delta:+3,  nps:4,  medallas:0, ranking:18 },
  { nombre:'Ricardo Peña',     pts:640,  aprov:32, delta:+2,  nps:3,  medallas:0, ranking:19 },
  { nombre:'Alejandra Vargas', pts:590,  aprov:30, delta:+2,  nps:5,  medallas:0, ranking:20 },
  { nombre:'Jorge Soto',       pts:540,  aprov:27, delta:+1,  nps:3,  medallas:0, ranking:21 },
  { nombre:'Natalia Aguilar',  pts:490,  aprov:25, delta:+1,  nps:4,  medallas:0, ranking:22 },
  { nombre:'José Hernández',   pts:340,  aprov:17, delta: 0,  nps:2,  medallas:0, ranking:23 },
  { nombre:'Claudia Ríos',     pts:210,  aprov:11, delta: 0,  nps:3,  medallas:0, ranking:24 },
];

// Estado expandido del ranking
let rankingExpandido = false;

function getGenData() {
  const sel = document.getElementById('sel-generacion');
  const genId = sel ? sel.value : 'mayo-2025';
  return mockGeneraciones.find(g => g.id === genId) || mockGeneraciones[0];
}

// Llamado cuando cambia el selector global de generación
function onGeneracionChange() {
  // Actualizar badge
  const gen = getGenData();
  const badge = document.getElementById('gen-badge');
  if (badge) {
    if (gen.estado === 'En curso') {
      badge.style.background = 'rgba(0,255,136,0.12)';
      badge.style.borderColor = 'rgba(0,255,136,0.3)';
      badge.style.color = '#00ff88';
      badge.textContent = `🟢 En curso · ${gen.participantes} participantes`;
    } else {
      badge.style.background = 'rgba(117,114,233,0.12)';
      badge.style.borderColor = 'rgba(117,114,233,0.3)';
      badge.style.color = 'var(--purple)';
      badge.textContent = `✅ Completada · ${gen.participantes} participantes`;
    }
  }
  // Re-renderizar el tab activo
  const activeTab = document.querySelector('.config-tab[style*="linear-gradient"]');
  if (activeTab) {
    const onclick = activeTab.getAttribute('onclick') || '';
    const match = onclick.match(/showConfigTab\('([^']+)'/);
    if (match) showConfigTab(match[1], activeTab);
  }
}

function getModulosGlobales() {
  // Datos simulados por módulo para el dashboard admin
  return [
    { nombre:'M1 · Connected Customer',   completados:18, aprov:82, pre:62, post:78, delta:+16 },
    { nombre:'M2 · Planeación Sincrónica', completados:12, aprov:76, pre:55, post:74, delta:+19 },
    { nombre:'M3 · Smart Operations',      completados:7,  aprov:79, pre:58, post:77, delta:+19 },
    { nombre:'M4 · Dynamic Fulfillment',   completados:3,  aprov:71, pre:52, post:70, delta:+18 },
    { nombre:'M5 · Game Changers',         completados:0,  aprov:0,  pre:0,  post:0,  delta:0   },
  ];
}

function renderDashboardEmpresa() {
  const gen = getGenData();
  const isEnCurso = gen.estado === 'En curso';

  // Actualizar badge
  const badge = document.getElementById('gen-badge');
  if (badge) {
    if (isEnCurso) {
      badge.style.background = 'rgba(0,255,136,0.12)';
      badge.style.borderColor = 'rgba(0,255,136,0.3)';
      badge.style.color = '#00ff88';
      badge.textContent = `🟢 En curso · ${gen.participantes} participantes`;
    } else {
      badge.style.background = 'rgba(117,114,233,0.12)';
      badge.style.borderColor = 'rgba(117,114,233,0.3)';
      badge.style.color = 'var(--purple)';
      badge.textContent = `✅ Completada · ${gen.participantes} participantes`;
    }
  }

  const stats = mockParticipantesStats.slice(0, gen.participantes);
  const activos = stats.filter(p => p.pts > 500).length;
  const avgAprov = Math.round(stats.filter(p=>p.aprov>0).reduce((s,p)=>s+p.aprov,0) / stats.filter(p=>p.aprov>0).length);
  const avgDelta = Math.round(stats.filter(p=>p.delta>0).reduce((s,p)=>s+p.delta,0) / stats.filter(p=>p.delta>0).length);
  const npsScores = stats.map(p=>p.nps);
  const promotores = npsScores.filter(n=>n>=9).length;
  const detractores = npsScores.filter(n=>n<=6).length;
  const nps = Math.round(((promotores - detractores) / npsScores.length) * 100);
  const totalMedallas = stats.reduce((s,p)=>s+p.medallas,0);
  const medallasPosibles = gen.participantes * 11;
  const modData = getModulosGlobales();
  const modsCompletados = modData.filter(m=>m.completados>0).length;
  const avanceGlobal = Math.round((modData.reduce((s,m)=>s+m.completados,0) / (gen.participantes * modData.length)) * 100);

  // KPIs fila 1
  const kpisEl = document.getElementById('db-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = [
      { label:'Avance global', value:`${avanceGlobal}%`, sub:`Promedio de módulos completados`, color:'var(--cyan)', icon:'fa-chart-line' },
      { label:'Promedio aprovechamiento', value:`${avgAprov}%`, sub:`Módulos con datos disponibles`, color:'#00ff88', icon:'fa-graduation-cap' },
      { label:'Δ Aprendizaje promedio', value:`+${avgDelta}pp`, sub:`Pre→Post módulo (promedio grupal)`, color:'var(--purple)', icon:'fa-brain' },
      { label:'NPS del grupo', value:`${nps}`, sub:`${promotores} promotores · ${detractores} detractores`, color:'var(--magenta)', icon:'fa-star' },
    ].map(k=>`
      <div class="card" style="text-align:center;padding:18px 12px;background:rgba(255,255,255,0.03);">
        <div style="font-size:22px;color:${k.color};margin-bottom:6px;"><i class="fas ${k.icon}"></i></div>
        <div style="font-size:28px;font-weight:800;color:${k.color};line-height:1;">${k.value}</div>
        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);margin-top:4px;letter-spacing:0.05em;text-transform:uppercase;">${k.label}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;">${k.sub}</div>
      </div>`).join('');
  }

  // KPIs fila 2
  const kpis2El = document.getElementById('db-kpis2');
  if (kpis2El) {
    kpis2El.innerHTML = [
      { label:'Medallas otorgadas', value:`${totalMedallas} / ${medallasPosibles}`, sub:`${Math.round(totalMedallas/medallasPosibles*100)}% de medallas posibles`, color:'#ffd700', icon:'fa-medal' },
      { label:'Participantes activos', value:`${activos} / ${gen.participantes}`, sub:`${Math.round(activos/gen.participantes*100)}% de la generación`, color:'var(--cyan)', icon:'fa-users' },
      { label:'Módulos en progreso', value:`${modsCompletados} / ${modData.length}`, sub:`Módulos con al menos 1 completado`, color:'var(--purple)', icon:'fa-layer-group' },
    ].map(k=>`
      <div class="card" style="display:flex;align-items:center;gap:14px;padding:16px;background:rgba(255,255,255,0.03);">
        <div style="font-size:26px;color:${k.color};min-width:36px;text-align:center;"><i class="fas ${k.icon}"></i></div>
        <div>
          <div style="font-size:20px;font-weight:800;color:${k.color};">${k.value}</div>
          <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.5);letter-spacing:0.05em;text-transform:uppercase;">${k.label}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:2px;">${k.sub}</div>
        </div>
      </div>`).join('');
  }

  // Ranking
  renderRankingEmpresa(stats);

  // Módulos global
  const modEl = document.getElementById('db-modulos-global');
  if (modEl) {
    modEl.innerHTML = `
      <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <th style="text-align:left;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;letter-spacing:0.05em;">MÓDULO</th>
            <th style="text-align:center;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;">COMPLETADOS</th>
            <th style="text-align:center;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;">APROV. PROM.</th>
            <th style="text-align:center;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;">PRE</th>
            <th style="text-align:center;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;">POST</th>
            <th style="text-align:center;padding:8px 10px;color:rgba(255,255,255,0.4);font-weight:600;font-size:11px;">Δ APRENDIZAJE</th>
          </tr>
        </thead>
        <tbody>
          ${modData.map((m,i)=>{
            const hasData = m.completados > 0;
            const pct = Math.round(m.completados / gen.participantes * 100);
            return `<tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
              <td style="padding:10px 10px;font-weight:600;">${m.nombre}</td>
              <td style="text-align:center;padding:10px;">
                <span style="color:${hasData?'var(--cyan)':'rgba(255,255,255,0.25)'};">
                  ${hasData ? `${m.completados}/${gen.participantes} <span style="font-size:10px;color:rgba(255,255,255,0.35);">(${pct}%)</span>` : '—'}
                </span>
              </td>
              <td style="text-align:center;padding:10px;">
                ${hasData ? `<span style="font-weight:700;color:${m.aprov>=80?'#00ff88':m.aprov>=65?'var(--cyan)':'rgba(255,255,255,0.5)'};">${m.aprov}%</span>` : '<span style="color:rgba(255,255,255,0.2);">—</span>'}
              </td>
              <td style="text-align:center;padding:10px;color:rgba(255,255,255,${hasData?'0.6':'0.2'});">${hasData?m.pre+'%':'—'}</td>
              <td style="text-align:center;padding:10px;color:${hasData?'var(--cyan)':'rgba(255,255,255,0.2)'};">${hasData?m.post+'%':'—'}</td>
              <td style="text-align:center;padding:10px;">
                ${hasData ? `<span style="color:#00ff88;font-weight:700;">+${m.delta}pp</span>` : '<span style="color:rgba(255,255,255,0.2);">—</span>'}
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      </div>`;
  }

  // Kirkpatrick grupal
  renderKirkpatrickGrupal(modData);
}

function renderRankingEmpresa(stats) {
  const el = document.getElementById('ranking-tabla-empresa');
  if (!el) return;
  const lista = rankingExpandido ? stats : stats.slice(0, 5);
  const top3Colors = ['#FFD700','#C0C0C0','#CD7F32'];
  el.innerHTML = `
    <!-- Top 3 podio -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;">
      ${stats.slice(0,3).map((p,i)=>`
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px;text-align:center;${i===0?'border-color:rgba(255,215,0,0.4);background:rgba(255,215,0,0.06);':''}">
          <div style="font-size:22px;margin-bottom:4px;">${i===0?'🥇':i===1?'🥈':'🥉'}</div>
          <div style="font-size:13px;font-weight:700;color:${top3Colors[i]};margin-bottom:2px;">${p.nombre.split(' ')[0]} ${p.nombre.split(' ')[1]||''}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.4);">${p.pts.toLocaleString()} pts</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.35);">Aprov. ${p.aprov}% · Δ+${p.delta}pp</div>
        </div>`).join('')}
    </div>
    <!-- Tabla lista -->
    <table style="width:100%;border-collapse:collapse;font-size:12px;">
      <thead>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
          <th style="text-align:left;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">#</th>
          <th style="text-align:left;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">PARTICIPANTE</th>
          <th style="text-align:center;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">PTS</th>
          <th style="text-align:center;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">APROV.</th>
          <th style="text-align:center;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">Δ APRENDIZAJE</th>
          <th style="text-align:center;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">NPS</th>
          <th style="text-align:center;padding:6px 8px;color:rgba(255,255,255,0.35);font-size:10px;font-weight:700;letter-spacing:0.05em;">MEDALLAS</th>
        </tr>
      </thead>
      <tbody>
        ${lista.map((p,i)=>{
          const pos = i+1;
          const medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
          const npsColor = p.nps>=9?'#00ff88':p.nps>=7?'var(--cyan)':'rgba(255,255,255,0.4)';
          return `<tr style="border-bottom:1px solid rgba(255,255,255,0.04);${pos<=3?'background:rgba(255,255,255,0.02);':''}">
            <td style="padding:8px 8px;color:rgba(255,255,255,0.4);font-weight:700;">${medal||pos}</td>
            <td style="padding:8px 8px;font-weight:600;">${p.nombre}</td>
            <td style="text-align:center;padding:8px;color:var(--cyan);font-weight:700;">${p.pts.toLocaleString()}</td>
            <td style="text-align:center;padding:8px;"><span style="color:${p.aprov>=80?'#00ff88':p.aprov>=65?'var(--cyan)':'rgba(255,255,255,0.5)'};">${p.aprov}%</span></td>
            <td style="text-align:center;padding:8px;color:#00ff88;font-weight:600;">${p.delta>0?'+'+p.delta+'pp':'—'}</td>
            <td style="text-align:center;padding:8px;font-weight:700;color:${npsColor};">${p.nps}</td>
            <td style="text-align:center;padding:8px;color:rgba(255,255,255,0.5);">${p.medallas > 0 ? '🏅'.repeat(Math.min(p.medallas,5))+(p.medallas>5?` +${p.medallas-5}`:'') : '—'}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    ${!rankingExpandido && stats.length > 5 ? `<div style="text-align:center;margin-top:12px;font-size:12px;color:rgba(255,255,255,0.3);">Mostrando top 5 de ${stats.length} participantes · Usa "Ver todos" para expandir</div>` : ''}`;
}

function renderKirkpatrickGrupal(modData) {
  const el = document.getElementById('db-kirkpatrick-global');
  if (!el) return;
  const activeData = modData.filter(m=>m.completados>0);
  if (!activeData.length) {
    el.innerHTML = `<p style="text-align:center;color:rgba(255,255,255,0.3);font-size:13px;padding:20px;">Sin datos de evaluación aún</p>`;
    return;
  }
  const canvasId = 'chart-kirkpatrick-global';
  el.innerHTML = `<canvas id="${canvasId}" style="max-height:260px;"></canvas>`;
  setTimeout(()=>{
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (ctx._chartInstance) ctx._chartInstance.destroy();
    ctx._chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: activeData.map(m=>m.nombre.split(' · ')[1]||m.nombre.split('·')[0]),
        datasets: [
          {
            label: 'Evaluación inicial (Pre)',
            data: activeData.map(m=>m.pre),
            backgroundColor: 'rgba(248,0,250,0.5)',
            borderColor: '#F800fa',
            borderWidth: 1.5,
            borderRadius: 4,
          },
          {
            label: 'Evaluación final (Post)',
            data: activeData.map(m=>m.post),
            backgroundColor: 'rgba(0,216,218,0.5)',
            borderColor: '#00d8da',
            borderWidth: 1.5,
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color:'rgba(255,255,255,0.7)', font:{size:12} } },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`,
              afterDatasetsDraw: () => {}
            }
          }
        },
        scales: {
          x: { ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}}, grid:{color:'rgba(255,255,255,0.05)'} },
          y: { min:0, max:100, ticks:{color:'rgba(255,255,255,0.5)',callback:v=>v+'%'}, grid:{color:'rgba(255,255,255,0.05)'} }
        }
      }
    });
  }, 50);
}

function toggleRankingCompleto() {
  rankingExpandido = !rankingExpandido;
  const label = document.getElementById('ranking-toggle-label');
  if (label) label.textContent = rankingExpandido ? 'Ver top 5' : 'Ver todos';
  const gen = getGenData();
  const stats = mockParticipantesStats.slice(0, gen.participantes);
  renderRankingEmpresa(stats);
}

function descargarRanking() {
  const gen = getGenData();
  const stats = mockParticipantesStats.slice(0, gen.participantes);
  const rows = ['#,Nombre,Puntos,Aprovechamiento,Δ Aprendizaje,NPS,Medallas'];
  stats.forEach((p,i)=>{
    rows.push(`${i+1},"${p.nombre}",${p.pts},${p.aprov}%,+${p.delta}pp,${p.nps},${p.medallas}`);
  });
  const blob = new Blob([rows.join('\n')], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ranking-${gen.id}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function nuevaGeneracion() {
  alert('Funcionalidad próximamente: crear nueva generación para esta empresa.');
}

function getGlobalEvents(year, month) {
  const events = {}; // { 'YYYY-MM-DD': [{ label, color, border, type }] }

  function addEvent(date, ev) {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!events[key]) events[key] = [];
    events[key].push(ev);
  }

  // Módulos por empresa
  mockEmpresas.forEach(emp => {
    if (!emp.start) return;
    mockModulosConfig.filter(m => m.activo).forEach(m => {
      const match = m.semana.match(/Semana (\d+)[-–](\d+)/);
      if (!match) return;
      const w1 = parseInt(match[1]);
      const w2 = parseInt(match[2]);
      const startDate = new Date(emp.start);
      startDate.setDate(startDate.getDate() + (w1 - 1) * 7);
      const endDate = new Date(emp.start);
      endDate.setDate(endDate.getDate() + w2 * 7 - 1);
      // Pintar cada día del rango dentro del mes actual
      const cur = new Date(startDate);
      while (cur <= endDate) {
        if (cur.getFullYear() === year && cur.getMonth() === month) {
          const isStart = cur.getTime() === startDate.getTime();
          addEvent(new Date(cur), {
            label: isStart ? m.icono + ' ' + m.nombre : '',
            color: emp.color, border: emp.border, type: 'modulo',
            isStart, isEnd: cur.getTime() === endDate.getTime()
          });
        }
        cur.setDate(cur.getDate() + 1);
      }
    });
  });

  // Sesiones síncronas
  mockSesiones.forEach(s => {
    const parts = s.fecha.split(' ');
    const month2 = MESES_ABBR[parts[1]];
    if (month2 === undefined) return;
    const d = new Date(parseInt(parts[2]), month2, parseInt(parts[0]));
    if (d.getFullYear() === year && d.getMonth() === month) {
      addEvent(d, { label: s.titulo + ' · ' + s.hora, color: 'rgba(248,0,250,0.7)', border: 'var(--magenta)', type: 'sesion', isStart: true });
    }
  });

  return events;
}

function renderCalendarioGlobal() {
  const label = document.getElementById('cal-global-label');
  const grid  = document.getElementById('cal-global-grid');
  if (!label || !grid) return;

  const { year, month } = calGlobalState;
  label.textContent = MESES_ES[month] + ' ' + year;

  const events   = getGlobalEvents(year, month);
  const DIAS     = ['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'];
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  let startDow   = (firstDay.getDay() + 6) % 7;

  function evKey(d) { return `${year}-${month}-${d}`; }

  let cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const headerHtml = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid rgba(255,255,255,0.08);">
      ${DIAS.map((d,i) => `<div style="padding:8px;text-align:center;font-size:11px;font-weight:700;color:${i>=5?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.4)'};">${d}</div>`).join('')}
    </div>`;

  const bodyHtml = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);">
      ${cells.map((day, idx) => {
        const isLastRow = idx >= cells.length - 7;
        const isLastCol = (idx + 1) % 7 === 0;
        const isWeekend = idx % 7 >= 5;
        const borderB = isLastRow ? '' : 'border-bottom:1px solid rgba(255,255,255,0.05);';
        const borderR = isLastCol ? '' : 'border-right:1px solid rgba(255,255,255,0.05);';
        if (!day) return `<div style="padding:8px;min-height:70px;${borderR}${borderB}"></div>`;
        const dayEvents = events[evKey(day)] || [];
        const evHtml = dayEvents.map(e => {
          if (e.type === 'modulo') {
            return `<div style="margin-top:2px;padding:2px 5px;background:${e.color};border-radius:3px;font-size:10px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${e.label}">${e.isStart && e.label ? e.label : '&nbsp;'}</div>`;
          }
          return `<div style="margin-top:2px;padding:2px 5px;background:${e.color};border-radius:3px;font-size:10px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${e.label}"><i class="fas fa-video"></i> ${e.label}</div>`;
        }).join('');
        return `<div style="padding:8px;min-height:70px;${borderR}${borderB}">
          <div style="font-size:12px;color:${isWeekend?'rgba(255,255,255,0.2)':'rgba(255,255,255,0.7)'};">${day}</div>
          ${evHtml}
        </div>`;
      }).join('')}
    </div>`;

  grid.innerHTML = `<div style="overflow:hidden;">${headerHtml}${bodyHtml}</div>`;
}

function calGlobalPrev() {
  calGlobalState.month--;
  if (calGlobalState.month < 0) { calGlobalState.month = 11; calGlobalState.year--; }
  renderCalendarioGlobal();
}
function calGlobalNext() {
  calGlobalState.month++;
  if (calGlobalState.month > 11) { calGlobalState.month = 0; calGlobalState.year++; }
  renderCalendarioGlobal();
}

// ══════════════════════════════════════
//  GESTIÓN DE CONTENIDO (CMS)
// ══════════════════════════════════════

const TIPO_ICONO = { video:'fas fa-video', podcast:'fas fa-headphones', articulo:'fas fa-file-alt', infografia:'fas fa-image', actividad:'fas fa-tasks' };
const TIPO_COLOR = { video:'var(--cyan)', podcast:'var(--purple)', articulo:'rgba(255,255,255,0.7)', infografia:'orange', actividad:'var(--magenta)' };

let _moduloEditando = null;

function renderAdminContenido() {
  const el = document.getElementById('admin-contenido-vista');
  if (!el) return;
  if (_moduloEditando) { renderEditorModulo(_moduloEditando); return; }

  const pendientesTotal = mod => (mod.contenido || []).reduce((acc, dia) => {
    const rPend = (dia.recursos || []).filter(r => r.url === '#pendiente' || r.url === '#sharepoint').length;
    const aPend = dia.actividad && (dia.actividad.url === '#pendiente' || dia.actividad.url === '#sharepoint') ? 1 : 0;
    return acc + rPend + aPend;
  }, 0);

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
      ${mockModulosGrid.map(m => {
        const pend = pendientesTotal(m);
        const dias = (m.contenido || []).length;
        return `
        <div class="card" style="border-color:rgba(0,216,218,0.2);cursor:pointer;" onclick="abrirEditorModulo('${m.id}')">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
            <div style="font-size:36px;">${m.icono}</div>
            ${pend > 0 ? `<span style="background:rgba(255,165,0,0.15);border:1px solid orange;color:orange;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;">${pend} pendientes</span>` : `<span style="background:rgba(0,255,136,0.1);border:1px solid #00ff88;color:#00ff88;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:700;">Completo</span>`}
          </div>
          <h3 style="font-weight:700;margin-bottom:4px;font-size:15px;">${m.nombre}</h3>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:10px;">${m.nivel} · ${m.semanas}</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:14px;line-height:1.5;">${m.descripcion}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:12px;color:rgba(255,255,255,0.4);">${dias} días mapeados</span>
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();abrirEditorModulo('${m.id}')"><i class="fas fa-edit"></i> Editar</button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function abrirEditorModulo(id) {
  _moduloEditando = id;
  renderEditorModulo(id);
}

function cerrarEditorModulo() {
  _moduloEditando = null;
  renderAdminContenido();
}

function renderEditorModulo(id) {
  const el = document.getElementById('admin-contenido-vista');
  const m  = mockModulosGrid.find(x => x.id === id);
  if (!el || !m) return;

  const diasHtml = (m.contenido || []).map(dia => {
    const pendientes = (dia.recursos || []).filter(r => r.url === '#pendiente' || r.url === '#sharepoint').length + (dia.actividad && (dia.actividad.url === '#pendiente' || dia.actividad.url === '#sharepoint') ? 1 : 0);
    const recursosHtml = (dia.recursos || []).map((r, ri) => `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:6px;flex-wrap:wrap;">
        <i class="${TIPO_ICONO[r.tipo] || 'fas fa-file'}" style="color:${TIPO_COLOR[r.tipo] || 'white'};width:16px;"></i>
        <span style="flex:1;font-size:13px;min-width:150px;">${r.titulo}</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.35);">${r.duracion || ''}</span>
        <input value="${r.url}" placeholder="URL o link de SharePoint"
          style="background:rgba(255,255,255,0.06);border:1px solid ${r.url==='#pendiente'?'orange':r.url==='#sharepoint'?'rgba(248,0,250,0.4)':'rgba(255,255,255,0.1)'};border-radius:6px;padding:5px 10px;font-size:12px;color:white;font-family:'Outfit',sans-serif;width:220px;"
          onchange="actualizarRecurso('${id}',${dia.dia},${ri},'url',this.value);this.style.borderColor='rgba(0,255,136,0.5)'"/>
      </div>`).join('');

    const actHtml = dia.actividad ? `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(248,0,250,0.05);border:1px solid rgba(248,0,250,0.2);border-radius:8px;margin-top:6px;flex-wrap:wrap;">
        <i class="fas fa-tasks" style="color:var(--magenta);width:16px;"></i>
        <span style="flex:1;font-size:13px;min-width:150px;color:var(--magenta);">Actividad: ${dia.actividad.titulo}</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.35);">${dia.actividad.puntos} pts</span>
        <input value="${dia.actividad.url}" placeholder="URL de la actividad"
          style="background:rgba(255,255,255,0.06);border:1px solid ${dia.actividad.url==='#pendiente'?'orange':dia.actividad.url==='#sharepoint'?'rgba(248,0,250,0.4)':'rgba(255,255,255,0.1)'};border-radius:6px;padding:5px 10px;font-size:12px;color:white;font-family:'Outfit',sans-serif;width:220px;"
          onchange="actualizarActividad('${id}',${dia.dia},'url',this.value);this.style.borderColor='rgba(0,255,136,0.5)'"/>
      </div>` : '';

    return `
      <div class="card" style="margin-bottom:14px;border-color:rgba(255,255,255,0.07);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;cursor:pointer;" onclick="toggleDia(this)">
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--cyan),var(--purple));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;">D${dia.dia}</div>
          <div style="flex:1;">
            <div style="font-weight:700;font-size:14px;">${dia.titulo}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);">${dia.pregunta}</div>
          </div>
          ${pendientes > 0 ? `<span style="font-size:11px;color:orange;background:rgba(255,165,0,0.1);border:1px solid rgba(255,165,0,0.3);border-radius:5px;padding:2px 7px;">${pendientes} pendiente${pendientes>1?'s':''}</span>` : `<span style="font-size:11px;color:#00ff88;">✓ Completo</span>`}
          <i class="fas fa-chevron-down" style="color:rgba(255,255,255,0.3);transition:transform 0.2s;"></i>
        </div>
        <div class="dia-recursos" style="display:none;">
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <i class="fas fa-bullseye" style="color:var(--cyan);margin-right:6px;"></i>${dia.objetivo}
          </div>
          ${recursosHtml}
          ${actHtml}
          <button class="btn btn-secondary btn-sm" style="margin-top:8px;font-size:12px;" onclick="agregarRecurso('${id}',${dia.dia})">
            <i class="fas fa-plus"></i> Agregar recurso
          </button>
        </div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div style="margin-bottom:20px;">
      <button class="btn btn-secondary btn-sm" onclick="cerrarEditorModulo()"><i class="fas fa-arrow-left"></i> Todos los módulos</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:flex-start;">
      <div>
        <div class="card" style="margin-bottom:20px;border-color:rgba(0,216,218,0.2);">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <div style="font-size:42px;">${m.icono}</div>
            <div>
              <h2 style="font-size:20px;font-weight:800;margin-bottom:4px;">${m.nombre}</h2>
              <div style="font-size:13px;color:rgba(255,255,255,0.4);">${m.nivel} · ${m.semanas} · ${(m.contenido||[]).length} días</div>
            </div>
          </div>
          <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;">${m.descripcion}</p>
        </div>
        <h3 class="section-title" style="margin-bottom:16px;"><span>Días</span> de contenido</h3>
        ${diasHtml || '<div class="card" style="text-align:center;color:rgba(255,255,255,0.3);padding:40px;">Sin contenido mapeado aún</div>'}
      </div>
      <div>
        <div class="card" style="border-color:rgba(248,0,250,0.2);position:sticky;top:20px;">
          <h4 style="margin-bottom:16px;color:var(--magenta);">Resumen del módulo</h4>
          ${(() => {
            const total = (m.contenido||[]).reduce((a,d) => a + (d.recursos||[]).length, 0);
            const pend  = (m.contenido||[]).reduce((a,d) => a + (d.recursos||[]).filter(r=>r.url==='#pendiente').length, 0);
            const share = (m.contenido||[]).reduce((a,d) => a + (d.recursos||[]).filter(r=>r.url==='#sharepoint').length, 0);
            const ok    = total - pend - share;
            const pts   = (m.contenido||[]).reduce((a,d) => a + (d.actividad?.puntos||0), 0);
            return `
              <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;">
                <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,0.5);">Total recursos</span><strong>${total}</strong></div>
                <div style="display:flex;justify-content:space-between;"><span style="color:#00ff88;">Con link</span><strong style="color:#00ff88;">${ok}</strong></div>
                <div style="display:flex;justify-content:space-between;"><span style="color:var(--magenta);">En SharePoint</span><strong style="color:var(--magenta);">${share}</strong></div>
                <div style="display:flex;justify-content:space-between;"><span style="color:orange;">Pendientes</span><strong style="color:orange;">${pend}</strong></div>
                <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:10px;display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,0.5);">Puntos totales</span><strong style="color:var(--cyan);">${pts} pts</strong></div>
              </div>`;
          })()}
        </div>
      </div>
    </div>`;
}

function toggleDia(header) {
  const recursos = header.parentElement.querySelector('.dia-recursos');
  const icon = header.querySelector('.fa-chevron-down');
  if (recursos.style.display === 'none') {
    recursos.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    recursos.style.display = 'none';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function actualizarRecurso(moduloId, dia, recursoIdx, campo, valor) {
  const m = mockModulosGrid.find(x => x.id === moduloId);
  if (!m) return;
  const d = m.contenido.find(d => d.dia === dia);
  if (!d || !d.recursos[recursoIdx]) return;
  d.recursos[recursoIdx][campo] = valor;
  showToast('✅ Recurso actualizado', 'success');
}

function actualizarActividad(moduloId, dia, campo, valor) {
  const m = mockModulosGrid.find(x => x.id === moduloId);
  if (!m) return;
  const d = m.contenido.find(d => d.dia === dia);
  if (!d || !d.actividad) return;
  d.actividad[campo] = valor;
  showToast('✅ Actividad actualizada', 'success');
}

function agregarRecurso(moduloId, dia) {
  const m = mockModulosGrid.find(x => x.id === moduloId);
  if (!m) return;
  const d = m.contenido.find(d => d.dia === dia);
  if (!d) return;
  d.recursos.push({ tipo: 'articulo', titulo: 'Nuevo recurso', duracion: '5 min', url: '#pendiente' });
  renderEditorModulo(moduloId);
  showToast('✅ Recurso agregado', 'success');
}

function nuevoModulo() {
  showToast('🚧 Función disponible próximamente', 'info');
}

// ══════════════════════════════════════
//  QUIZ CONNECTED CUSTOMER — MODAL
// ══════════════════════════════════════

const BANCO_D1 = [
  {
    q: '¿Qué define mejor a una cadena de suministro de excelencia hoy?',
    opts: ['Tener los costos operativos más bajos del mercado', 'Entregar el producto correcto, en el momento correcto, con la experiencia que el cliente espera', 'Tener el mayor número de proveedores certificados', 'Automatizar el mayor número de procesos posible'],
    c: 1,
    exp: 'La excelencia moderna se mide por la experiencia completa que recibe el cliente, no solo por la eficiencia interna de la operación.'
  },
  {
    q: '¿Qué cambio impulsó Amazon en las expectativas del cliente conectado?',
    opts: ['Redujo los precios de los productos al mínimo posible', 'Eliminó la necesidad de proveedores externos', 'Convirtió la velocidad, visibilidad y personalización en expectativas básicas', 'Demostró que el comercio físico ya no es necesario'],
    c: 2,
    exp: 'Amazon redefinió el estándar: entrega rápida, seguimiento en tiempo real y personalización dejaron de ser diferenciadores para convertirse en expectativas básicas.'
  },
  {
    q: '¿Desde dónde diseña sus procesos una cadena centrada en el cliente?',
    opts: ['Desde el proveedor hacia el cliente', 'Desde la experiencia que el cliente necesita vivir, hacia atrás en la cadena', 'Desde el área de finanzas para optimizar costos', 'Desde el área de producción para maximizar volumen'],
    c: 1,
    exp: 'El diseño "outside-in" parte de la experiencia deseada por el cliente y trabaja hacia atrás para rediseñar cada proceso de la cadena.'
  },
  {
    q: '¿Qué obliga a hacer la conectividad del consumidor a las organizaciones?',
    opts: ['Reducir el número de eslabones en la cadena', 'Enfocarse únicamente en la última milla', 'Repensar cada eslabón de la cadena, desde el proveedor hasta la última milla', 'Eliminar intermediarios del proceso logístico'],
    c: 2,
    exp: 'La conectividad del consumidor exige revisar toda la cadena para crear una experiencia coherente de extremo a extremo, no solo la distribución final.'
  },
  {
    q: '¿Cómo se mide hoy la excelencia en la cadena de suministro?',
    opts: ['Por el número de certificaciones ISO que tiene la empresa', 'Por el costo por unidad transportada', 'Por la velocidad de producción en planta', 'Por el valor que genera al cliente final, no solo por la eficiencia operativa'],
    c: 3,
    exp: 'Las métricas tradicionales de eficiencia ya no son suficientes. El indicador clave es el valor percibido y la experiencia generada para el cliente final.'
  },
  {
    q: '¿Cuál es el impacto más importante del cliente conectado para las empresas?',
    opts: ['Reduce los márgenes de ganancia de forma permanente', 'Obliga a reducir el portafolio de productos', 'Exige que toda la cadena responda a sus necesidades en tiempo real', 'Permite eliminar los canales de distribución tradicionales'],
    c: 2,
    exp: 'El cliente conectado espera que las empresas operen con la misma visibilidad y velocidad de respuesta que tiene él al consultar su pedido desde el celular.'
  },
  {
    q: '¿Qué significa diseñar la cadena "desde afuera hacia adentro"?',
    opts: ['Contratar proveedores internacionales antes que locales', 'Empezar con la experiencia del cliente y trabajar hacia atrás en la cadena', 'Abrir primero operaciones en mercados extranjeros', 'Digitalizar todos los procesos externos antes que los internos'],
    c: 1,
    exp: '"Outside-in" significa que el punto de partida es la experiencia que el cliente necesita vivir. Desde ahí se rediseña cada proceso hacia el interior de la cadena.'
  },
  {
    q: '¿Qué papel juega la visibilidad en la cadena de suministro del cliente conectado?',
    opts: ['Permite reducir el número de empleados en operaciones', 'Es opcional para empresas con operaciones pequeñas', 'Es fundamental para anticipar problemas y cumplir las promesas al cliente', 'Solo es relevante en la logística de última milla'],
    c: 2,
    exp: 'La visibilidad en toda la cadena permite identificar riesgos con anticipación y cumplir de forma consistente las expectativas del cliente en cada punto de contacto.'
  }
];

let quizState = {};

// ─── CHECKLIST DE RECURSOS ────────────────────────────────────
const URLS_RECURSOS_D1 = {
  video1:    'https://scimexiconet.sharepoint.com/sites/ACADEMIALOGISTICA687/Documentos compartidos/Archivos generales/../../../../:v:/s/ACADEMIALOGISTICA687/ETq6Mc-2uCVFupURSy3L3EEBiUoe335euNt1E21hUWSUVQ?e=ETcWwp',
  video2:    'https://scimexiconet.sharepoint.com/sites/ACADEMIALOGISTICA687/Documentos compartidos/Archivos generales/../../../../:v:/s/ACADEMIALOGISTICA687/IQDQfwRqRE5XTZ3B663dCGFrAUMHgzNmYKW-rgMsEmpXldk?e=awX4Yo',
  lectura1:  'https://icttm.org/case-study-the-supply-chain-success-story-of-amazon/',
  lectura2:  'https://www.deloitte.com/us/en/services/consulting/articles/customer-centric-supply-chain-data.html'
};

let diaRecursos = { video1: false, lectura1: false, simulador: false, quiz: false };

// Palabras clave por recurso para calificar reflexiones
const PALABRAS_CLAVE = {
  video1:   ['cadena','suministro','cliente','valor','eficiencia','proceso','entrega','logistica','logística','operacion','operación'],
  video2:   ['cliente','experiencia','centrada','proceso','diseño','demanda','servicio','satisfaccion','satisfacción','conexion','conexión'],
  lectura1: ['amazon','velocidad','visibilidad','expectativa','entrega','estandar','estándar','omnicanal','personaliz','cliente'],
  lectura2: ['cliente','datos','decision','decisión','cadena','centrada','experiencia','valor','demanda','servicio']
};

function abrirRecurso(id) {
  const dCfg = (typeof DIAS_CC !== 'undefined' && DIAS_CC[currentDia - 1]);
  const url = (dCfg && dCfg.recursos[id]) ? dCfg.recursos[id].url : URLS_RECURSOS_D1[id];
  const esPendiente = !url || url.startsWith('#sharepoint');
  if (!esPendiente) {
    window.open(url, '_blank');
    setTimeout(() => {
      const reflexionEl = document.getElementById('reflexion-' + id);
      if (reflexionEl) reflexionEl.style.display = 'block';
    }, 800);
  } else {
    // Mostrar aviso inline en lugar del recurso
    const container = document.getElementById('reflexion-' + id);
    if (container) {
      container.style.display = 'block';
      const prevAviso = container.querySelector('.pendiente-aviso');
      if (!prevAviso) {
        const aviso = document.createElement('div');
        aviso.className = 'pendiente-aviso';
        aviso.style.cssText = 'padding:10px 14px;border-radius:8px;background:rgba(255,165,0,0.08);border:1px solid rgba(255,165,0,0.25);font-size:12px;color:orange;margin-bottom:10px;';
        aviso.innerHTML = '⏳ Este video estará disponible próximamente. Puedes continuar con el resto del día.';
        container.insertBefore(aviso, container.firstChild);
      }
    }
    marcarRecurso(id);
  }
}

function calificarReflexion(id) {
  const txt = document.getElementById('txt-' + id);
  const fb  = document.getElementById('fb-' + id);
  if (!txt || !fb) return;

  const respuesta = txt.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (respuesta.length < 10) {
    fb.innerHTML = '<span style="color:var(--magenta);">✏️ Escribe un poco más antes de enviar.</span>';
    return;
  }

  const dCfg = (typeof DIAS_CC !== 'undefined' && DIAS_CC[currentDia - 1]);
  const claves = (dCfg && dCfg.recursos[id]) ? dCfg.recursos[id].claves : (PALABRAS_CLAVE[id] || []);
  const mencionadas = claves.filter(p => respuesta.includes(p.normalize('NFD').replace(/[\u0300-\u036f]/g,'')));

  if (mencionadas.length >= 2) {
    fb.innerHTML = '<span style="color:#00ff88;font-weight:600;">✅ ¡Muy bien! Identificaste los conceptos clave correctamente.</span>';
    txt.disabled = true;
    txt.style.opacity = '0.5';
    document.querySelector(`button[onclick="calificarReflexion('${id}')"]`).style.display = 'none';
    marcarRecurso(id);
  } else if (mencionadas.length === 1) {
    fb.innerHTML = '<span style="color:orange;">🔄 Vas por buen camino. Intenta profundizar más: ¿qué impacto tiene esto en el cliente?</span>';
  } else {
    fb.innerHTML = '<span style="color:var(--magenta);">💡 Intenta conectar tu respuesta con el cliente, el valor o la cadena de suministro.</span>';
  }
}

function marcarRecurso(id) {
  diaRecursos[id] = true;
  const el = document.getElementById('check-' + id);
  if (el) {
    el.style.background = '#00ff88';
    el.style.borderColor = '#00ff88';
    el.innerHTML = '✓';
    el.style.color = '#000';
  }
  // Persistir recursos completados en diasEstado
  if (!diasEstado[currentDia]) diasEstado[currentDia] = {};
  if (!diasEstado[currentDia].recursos) diasEstado[currentDia].recursos = {};
  diasEstado[currentDia].recursos[id] = true;
  saveState();
  verificarCompletarDia();
}

function verificarCompletarDia() {
  const todos = Object.values(diaRecursos).every(v => v);
  const btn = document.getElementById('btn-completar-dia');
  if (!btn || btn._desbloqueado) return;
  if (todos) {
    btn._desbloqueado = true;
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.innerHTML = 'Completar día y continuar <i class="fas fa-arrow-right"></i>';
    showToast('🔓 ¡Todo listo! Ya puedes avanzar al siguiente día.', 'success');
  }
}

function shuffleOptsPreg(p) {
  const idx = [0,1,2,3];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { ...p, opts: idx.map(i => p.opts[i]), c: idx.indexOf(p.c) };
}

function abrirQuiz() {
  // Bloquear si ya se hizo (solo se puede hacer una vez)
  if (diasEstado[currentDia] && diasEstado[currentDia].quiz) {
    showToast('✋ Esta evaluación ya fue completada — solo se puede hacer una vez', 'info');
    return;
  }
  const banco = (typeof BANCO_CC !== 'undefined') ? BANCO_CC : BANCO_D1;
  const dCfg = (typeof DIAS_CC !== 'undefined' && DIAS_CC[currentDia - 1]);
  const numPreguntas = (dCfg && dCfg.esPreQuiz) ? 10 : 5;
  const timerSeg = numPreguntas === 10 ? 600 : 300;
  const shuffled = [...banco].sort(() => Math.random() - 0.5);
  const preguntas = shuffled.slice(0, numPreguntas).map(shuffleOptsPreg);
  quizState = { preguntas, actual: 0, respuestas: [], ptsGanados: 0, timerSeg, timerInterval: null };
  wrongQuestionsByDay[currentDia] = []; // Resetear/inicializar para este día

  // Eliminar modal previo si existe
  const prev = document.getElementById('quiz-modal');
  if (prev) prev.remove();

  // Crear modal directo en body (evita problemas de stacking context)
  const modal = document.createElement('div');
  modal.id = 'quiz-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:600px;margin:0 auto;padding:28px 20px 60px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">
        <div>
          <span class="badge badge-cyan">Connected Customer · Día ${currentDia}</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">${numPreguntas === 10 ? 'Pre-evaluación · 10 preguntas' : 'Quiz del día · 5 pts'}</div>
        </div>
        <div style="display:flex;align-items:center;gap:18px;">
          <div style="display:flex;align-items:center;gap:7px;">
            <i class="fas fa-clock" style="font-size:13px;color:rgba(255,255,255,0.3);"></i>
            <span id="quiz-timer" style="font-size:22px;font-weight:800;color:var(--cyan);font-variant-numeric:tabular-nums;min-width:46px;">${numPreguntas === 10 ? '10:00' : '5:00'}</span>
          </div>
          <button onclick="cerrarQuiz()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;line-height:1;">✕</button>
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:32px;" id="quiz-progress-dots"></div>
      <div id="quiz-question-area"></div>
      <div id="quiz-results-area" style="display:none;"></div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  renderQuizPregunta();
  iniciarTimerQuiz();
}

function cerrarQuiz() {
  if (quizState.timerInterval) clearInterval(quizState.timerInterval);
  const modal = document.getElementById('quiz-modal');
  if (modal) modal.remove();
  document.body.style.overflow = '';
  // Re-render to show completed state
  if (diasEstado[currentDia] && diasEstado[currentDia].quiz) {
    renderDia(currentDia);
  }
}

function iniciarTimerQuiz() {
  quizState.timerInterval = setInterval(() => {
    quizState.timerSeg--;
    const min = Math.floor(quizState.timerSeg / 60);
    const sec = quizState.timerSeg % 60;
    const el = document.getElementById('quiz-timer');
    if (el) {
      el.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
      if (quizState.timerSeg <= 30) el.style.color = 'var(--magenta)';
    }
    if (quizState.timerSeg <= 0) { clearInterval(quizState.timerInterval); mostrarResultadosQuiz(); }
  }, 1000);
}

function renderQuizPregunta() {
  const { preguntas, actual } = quizState;
  const p = preguntas[actual];
  const letters = ['A', 'B', 'C', 'D'];
  const dotsEl = document.getElementById('quiz-progress-dots');
  if (dotsEl) {
    dotsEl.innerHTML = preguntas.map((_, i) => {
      const bg = i < actual ? 'var(--cyan)' : (i === actual ? 'var(--magenta)' : 'rgba(255,255,255,0.12)');
      return `<div style="flex:1;height:4px;border-radius:2px;background:${bg};transition:background 0.3s;"></div>`;
    }).join('');
  }
  const area = document.getElementById('quiz-question-area');
  area.innerHTML = `
    <div style="font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:10px;text-transform:uppercase;letter-spacing:0.08em;">Pregunta ${actual + 1} de ${preguntas.length}</div>
    <h3 style="font-size:18px;font-weight:700;line-height:1.45;margin-bottom:26px;">${p.q}</h3>
    <div style="display:flex;flex-direction:column;gap:10px;" id="quiz-opts">
      ${p.opts.map((opt, i) => `
        <div class="quiz-opt-item" onclick="responderQuiz(${i})" data-idx="${i}" style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;transition:border-color 0.15s;">
          <div style="width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;color:rgba(255,255,255,0.4);">${letters[i]}</div>
          <div style="font-size:14px;line-height:1.5;padding-top:3px;">${opt}</div>
        </div>
      `).join('')}
    </div>`;
  area.querySelectorAll('.quiz-opt-item').forEach(el => {
    el.addEventListener('mouseover', () => { if (!el.dataset.locked) el.style.borderColor = 'rgba(255,255,255,0.3)'; });
    el.addEventListener('mouseout',  () => { if (!el.dataset.locked) el.style.borderColor = 'rgba(255,255,255,0.1)'; });
  });
}

function responderQuiz(idx) {
  const { preguntas, actual } = quizState;
  const p = preguntas[actual];
  const opts = document.querySelectorAll('.quiz-opt-item');
  const letters = ['A', 'B', 'C', 'D'];
  opts.forEach(o => { o.style.cursor = 'default'; o.dataset.locked = '1'; o.onclick = null; });
  const correcta = (idx === p.c);
  opts[idx].style.background = correcta ? 'rgba(0,255,136,0.1)' : 'rgba(248,0,250,0.1)';
  opts[idx].style.borderColor = correcta ? '#00ff88' : 'var(--magenta)';
  const dot = opts[idx].querySelector('div');
  dot.style.background = correcta ? '#00ff88' : 'var(--magenta)';
  dot.style.color = 'black'; dot.style.border = 'none';
  if (!correcta) {
    opts[p.c].style.background = 'rgba(0,255,136,0.07)';
    opts[p.c].style.borderColor = 'rgba(0,255,136,0.5)';
    const cdot = opts[p.c].querySelector('div');
    cdot.style.background = 'rgba(0,255,136,0.2)'; cdot.style.color = '#00ff88';
  }
  quizState.respuestas.push({ correcta, elegida: idx });
  const _esPreQ = (typeof DIAS_CC !== 'undefined' && DIAS_CC[currentDia-1] && DIAS_CC[currentDia-1].esPreQuiz);
  const _esPostQ = quizState.esPostQuiz === true;
  if (correcta && !_esPreQ) quizState.ptsGanados += 1;
  // Guardar preguntas falladas para el repaso del día siguiente
  if (!correcta) {
    if (!wrongQuestionsByDay[currentDia]) wrongQuestionsByDay[currentDia] = [];
    if (wrongQuestionsByDay[currentDia].length < 3) wrongQuestionsByDay[currentDia].push(p);
  }
  const area = document.getElementById('quiz-question-area');
  const fb = document.createElement('div');
  fb.style.cssText = 'margin-top:16px;padding:12px 16px;border-radius:8px;font-size:13px;line-height:1.5;';
  if (correcta) {
    fb.style.background = 'rgba(0,255,136,0.07)'; fb.style.borderLeft = '3px solid #00ff88';
    fb.innerHTML = '<span style="color:#00ff88;font-weight:700;">✅ ¡Correcto!</span>';
  } else {
    fb.style.background = 'rgba(248,0,250,0.05)'; fb.style.borderLeft = '3px solid var(--magenta)';
    fb.innerHTML = `<span style="color:var(--magenta);font-weight:700;">❌ Incorrecto</span> — Correcta: <strong style="color:#00ff88;">${letters[p.c]}) ${p.opts[p.c]}</strong>`;
  }
  area.appendChild(fb);
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary'; btn.style.cssText = 'width:100%;margin-top:16px;';
  const isLast = actual === preguntas.length - 1;
  btn.innerHTML = isLast ? 'Ver resultados <i class="fas fa-chart-bar"></i>' : 'Siguiente <i class="fas fa-arrow-right"></i>';
  btn.onclick = () => { quizState.actual++; if (quizState.actual >= quizState.preguntas.length) mostrarResultadosQuiz(); else renderQuizPregunta(); };
  area.appendChild(btn);
}

function mostrarResultadosQuiz() {
  if (quizState.timerInterval) clearInterval(quizState.timerInterval);
  const { preguntas, respuestas, ptsGanados } = quizState;
  const correctas = respuestas.filter(r => r.correcta).length;
  const letters = ['A', 'B', 'C', 'D'];
  const dCfgQ = (typeof DIAS_CC !== 'undefined' && DIAS_CC[currentDia-1]);
  const esPreQ = dCfgQ && dCfgQ.esPreQuiz;

  // Marcar quiz como hecho inmediatamente (no esperar a cerrar)
  if (!diasEstado[currentDia]) diasEstado[currentDia] = {};
  diasEstado[currentDia].quiz = true;
  saveState();

  // Guardar score Kirkpatrick para comparar con evaluación final
  if (esPreQ) {
    const pct = Math.round((correctas / preguntas.length) * 100);
    try { localStorage.setItem('kirkpatrick_pre_score', correctas); localStorage.setItem('kirkpatrick_pre_pct', pct); } catch(e) {}
  }

  const esPostQ = quizState.esPostQuiz === true;

  document.getElementById('quiz-question-area').style.display = 'none';
  const timerEl = document.getElementById('quiz-timer');
  if (timerEl) timerEl.textContent = '–';
  const results = document.getElementById('quiz-results-area');
  results.style.display = 'block';
  const pct = Math.round((correctas / preguntas.length) * 100);
  const color = pct >= 80 ? '#00ff88' : pct >= 60 ? 'var(--cyan)' : 'var(--magenta)';
  const msg = pct >= 80 ? '¡Excelente dominio del tema!' : pct >= 60 ? 'Buen trabajo, sigue practicando.' : 'Te recomendamos repasar los conceptos del día.';
  const errores = preguntas.map((p, i) => ({ p, r: respuestas[i] || { correcta: false, elegida: -1 } })).filter(({ r }) => !r.correcta);

  // Bloque de puntos según tipo de quiz
  let ptsLine, closeFn, btnLabel;
  if (esPreQ) {
    ptsLine  = `<div style="font-size:13px;color:var(--cyan);font-weight:600;margin-top:8px;">Diagnóstico registrado · Sin impacto en puntos</div>`;
    closeFn  = `cerrarQuiz();unlockPreQuizContent();`;
    btnLabel = `Comenzar el módulo <i class="fas fa-arrow-right"></i>`;
  } else if (esPostQ) {
    // Guardar post-score y construir comparativa Kirkpatrick
    try { localStorage.setItem('kirkpatrick_post_score', correctas); localStorage.setItem('kirkpatrick_post_pct', pct); } catch(e) {}
    if (!diasEstado[10]) diasEstado[10] = {};
    diasEstado[10].postEval = true;
    const preScore = parseInt(localStorage.getItem('kirkpatrick_pre_score') || '0');
    const prePct   = parseInt(localStorage.getItem('kirkpatrick_pre_pct')   || '0');
    const delta = correctas - preScore;
    const deltaColor = delta > 0 ? '#00ff88' : delta < 0 ? 'var(--magenta)' : 'var(--cyan)';
    const deltaSign  = delta > 0 ? '+' : '';
    const kirkpatrick = `
      <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
        <div style="font-size:11px;color:#00ff88;font-weight:700;letter-spacing:0.08em;margin-bottom:12px;">📊 COMPARATIVA KIRKPATRICK NIVEL 2</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;">
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">DIAGNÓSTICO INICIAL</div>
            <div style="font-size:28px;font-weight:900;color:var(--cyan);">${preScore}/10</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);">${prePct}%</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div style="font-size:24px;color:rgba(255,255,255,0.2);">→</div>
          </div>
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">EVALUACIÓN FINAL</div>
            <div style="font-size:28px;font-weight:900;color:${color};">${correctas}/10</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);">${pct}%</div>
          </div>
        </div>
        <div style="text-align:center;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:20px;font-weight:800;color:${deltaColor};">${deltaSign}${delta} respuestas</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:3px;">${delta > 0 ? 'Aprendizaje demostrado ✓' : delta === 0 ? 'Nivel mantenido' : 'Revisar conceptos'}</div>
        </div>
      </div>`;
    ptsLine  = `${kirkpatrick}<div style="font-size:22px;font-weight:700;margin:10px 0 6px;">+${ptsGanados} pts ganados</div>`;
    closeFn  = `cerrarQuiz();if(${ptsGanados}>0)showFloatingPoints(${ptsGanados});setTimeout(()=>navigate('screen-journey'),800);`;
    btnLabel = `Ver mi Journey <i class="fas fa-trophy"></i>`;
  } else {
    ptsLine  = `<div style="font-size:22px;font-weight:700;margin:10px 0 6px;">+${ptsGanados} pts ganados</div>`;
    closeFn  = `cerrarQuiz();desbloquearCompletarDia();${ptsGanados > 0 ? 'showFloatingPoints(' + ptsGanados + ');' : ''}`;
    btnLabel = `Cerrar y continuar <i class="fas fa-check"></i>`;
  }

  results.innerHTML = `
    <div style="text-align:center;padding:20px 0 32px;">
      <div style="font-size:72px;font-weight:900;color:${color};line-height:1;">${correctas}/${preguntas.length}</div>
      ${ptsLine}
      <div style="font-size:14px;color:rgba(255,255,255,0.45);margin-top:6px;">${msg}</div>
    </div>
    ${errores.length > 0 ? `
    <div style="margin-bottom:28px;">
      <h4 style="font-size:12px;font-weight:700;color:var(--magenta);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:14px;"><i class="fas fa-lightbulb"></i> Revisa estos conceptos</h4>
      ${errores.map(({ p, r }) => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;margin-bottom:10px;">
          <div style="font-size:13px;font-weight:600;margin-bottom:10px;line-height:1.4;">${p.q}</div>
          ${r.elegida >= 0 ? `<div style="font-size:12px;color:var(--magenta);margin-bottom:4px;">Tu respuesta: ${letters[r.elegida]}) ${p.opts[r.elegida]}</div>` : ''}
          <div style="font-size:12px;color:#00ff88;margin-bottom:10px;">✓ Correcta: ${letters[p.c]}) ${p.opts[p.c]}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);border-top:1px solid rgba(255,255,255,0.06);padding-top:10px;line-height:1.6;">${p.exp}</div>
        </div>
      `).join('')}
    </div>` : `<div style="text-align:center;padding:0 0 28px;font-size:15px;color:#00ff88;">🎉 ¡Respondiste todo correctamente!</div>`}
    <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;" onclick="${closeFn}">
      ${btnLabel}
    </button>`;
}

function desbloquearCompletarDia() {
  marcarRecurso('quiz');
  if (!diasEstado[currentDia]) diasEstado[currentDia] = {};
  diasEstado[currentDia].quiz = true;
}

function unlockPreQuizContent() {
  diasPreQuizDone[currentDia] = true;
  if (!diasEstado[currentDia]) diasEstado[currentDia] = {};
  diasEstado[currentDia].quiz = true;
  saveState();
  renderDia(currentDia);
  setTimeout(() => { diaRecursos.quiz = true; marcarRecurso('quiz'); }, 50);
}

function abrirRepaso(diaNum) {
  const wrong = wrongQuestionsByDay[diaNum - 1] || [];
  let preguntas = wrong.slice(0, 3);
  // Completar hasta 3 con preguntas aleatorias del banco (no duplicadas)
  if (preguntas.length < 3) {
    const usedQs = new Set(preguntas.map(p => p.q));
    const filler = [...BANCO_CC].sort(() => Math.random() - 0.5)
      .filter(p => !usedQs.has(p.q))
      .slice(0, 3 - preguntas.length);
    preguntas = [...preguntas, ...filler];
  }
  preguntas = preguntas.map(shuffleOptsPreg);
  if (preguntas.length === 0) {
    if (!diasEstado[diaNum]) diasEstado[diaNum] = {};
    diasEstado[diaNum].repaso = true;
    if (diaNum === 10) renderDia10(); else renderDia(diaNum);
    return;
  }
  let repasoIdx = 0;
  let repasoAllCorrect = true;
  const prev = document.getElementById('repaso-modal');
  if (prev) prev.remove();
  const modal = document.createElement('div');
  modal.id = 'repaso-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:600px;margin:0 auto;padding:28px 20px 60px;">
      <div style="margin-bottom:28px;">
        <span class="badge" style="background:rgba(117,114,233,0.2);color:var(--purple);border:1px solid rgba(117,114,233,0.3);">Repaso · Día ${diaNum}</span>
        <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">Repaso del día anterior · ${preguntas.length} pregunta${preguntas.length > 1 ? 's' : ''} fallada${preguntas.length > 1 ? 's' : ''} · Sin puntos</div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:32px;" id="repaso-dots"></div>
      <div id="repaso-question-area"></div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  function renderRepasoPregunta() {
    const p = preguntas[repasoIdx];
    const letters = ['A', 'B', 'C', 'D'];
    const dotsEl = document.getElementById('repaso-dots');
    if (dotsEl) {
      dotsEl.innerHTML = preguntas.map((_, i) => {
        const bg = i < repasoIdx ? 'var(--purple)' : (i === repasoIdx ? 'var(--magenta)' : 'rgba(255,255,255,0.12)');
        return `<div style="flex:1;height:4px;border-radius:2px;background:${bg};transition:background 0.3s;"></div>`;
      }).join('');
    }
    const area = document.getElementById('repaso-question-area');
    if (!area) return;
    area.innerHTML = `
      <div style="font-size:12px;color:rgba(117,114,233,0.7);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Repaso ${repasoIdx + 1} de ${preguntas.length}</div>
      <h3 style="font-size:18px;font-weight:700;line-height:1.45;margin-bottom:26px;">${p.q}</h3>
      <div style="display:flex;flex-direction:column;gap:10px;" id="repaso-opts">
        ${p.opts.map((opt, i) => `
          <div class="repaso-opt-item" data-idx="${i}" style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;transition:border-color 0.15s;">
            <div style="width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;color:rgba(255,255,255,0.4);">${letters[i]}</div>
            <div style="font-size:14px;line-height:1.5;padding-top:3px;">${opt}</div>
          </div>`).join('')}
      </div>`;
    area.querySelectorAll('.repaso-opt-item').forEach(el => {
      el.addEventListener('mouseover', () => { if (!el.dataset.locked) el.style.borderColor = 'rgba(255,255,255,0.3)'; });
      el.addEventListener('mouseout',  () => { if (!el.dataset.locked) el.style.borderColor = 'rgba(255,255,255,0.1)'; });
      el.addEventListener('click', () => {
        if (el.dataset.locked) return;
        const idx = parseInt(el.dataset.idx);
        const opts = area.querySelectorAll('.repaso-opt-item');
        opts.forEach(o => { o.style.cursor = 'default'; o.dataset.locked = '1'; });
        const correcta = (idx === p.c);
        if (!correcta) repasoAllCorrect = false;
        el.style.background = correcta ? 'rgba(0,255,136,0.1)' : 'rgba(248,0,250,0.1)';
        el.style.borderColor = correcta ? '#00ff88' : 'var(--magenta)';
        const dot = el.querySelector('div');
        dot.style.background = correcta ? '#00ff88' : 'var(--magenta)';
        dot.style.color = 'black'; dot.style.border = 'none';
        if (!correcta) {
          opts[p.c].style.background = 'rgba(0,255,136,0.07)';
          opts[p.c].style.borderColor = 'rgba(0,255,136,0.5)';
          const cdot = opts[p.c].querySelector('div');
          cdot.style.background = 'rgba(0,255,136,0.2)'; cdot.style.color = '#00ff88';
        }
        const fb = document.createElement('div');
        fb.style.cssText = 'margin-top:16px;padding:12px 16px;border-radius:8px;font-size:13px;line-height:1.5;';
        if (correcta) {
          fb.style.background = 'rgba(0,255,136,0.07)'; fb.style.borderLeft = '3px solid #00ff88';
          fb.innerHTML = '<span style="color:#00ff88;font-weight:700;">✅ ¡Correcto esta vez!</span>';
        } else {
          fb.style.background = 'rgba(248,0,250,0.05)'; fb.style.borderLeft = '3px solid var(--magenta)';
          fb.innerHTML = `<span style="color:var(--magenta);font-weight:700;">❌ Sigue fallando</span> — Correcta: <strong style="color:#00ff88;">${letters[p.c]}) ${p.opts[p.c]}</strong><div style="margin-top:6px;font-size:12px;color:rgba(255,255,255,0.45);">${p.exp}</div>`;
        }
        area.appendChild(fb);
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary'; btn.style.cssText = 'width:100%;margin-top:16px;';
        const isLast = repasoIdx === preguntas.length - 1;
        btn.innerHTML = isLast ? 'Completar repaso <i class="fas fa-check"></i>' : 'Siguiente <i class="fas fa-arrow-right"></i>';
        btn.onclick = () => {
          repasoIdx++;
          if (repasoIdx >= preguntas.length) {
            modal.remove();
            document.body.style.overflow = '';
            if (!diasEstado[diaNum]) diasEstado[diaNum] = {};
            diasEstado[diaNum].repaso = true;
            // Bonus point if all 3 correct
            if (repasoAllCorrect) { showFloatingPoints(1); showToast('⭐ +1 pt bonus por repasar correctamente todo', 'success'); }
            saveState();
            if (diaNum === 10) renderDia10(); else renderDia(diaNum);
          } else {
            renderRepasoPregunta();
          }
        };
        area.appendChild(btn);
      });
    });
  }
  renderRepasoPregunta();
}

// ══════════════════════════════════════
//  ACTIVIDAD — SOPA DE LETRAS EXPERTO
// ══════════════════════════════════════

// Grid 16x16 con 5 términos experto horizontales
const SOPA_GRID = [
  ['S','I','N','C','R','O','N','I','Z','A','C','I','O','N','K','W'],  // SINCRONIZACION [0,0] H (14)
  ['B','T','X','Q','M','G','P','H','Z','F','J','Y','L','D','N','R'],
  ['O','M','N','I','C','A','N','A','L','I','D','A','D','W','B','X'],  // OMNICANALIDAD  [2,0] H (13)
  ['K','G','J','Z','T','F','H','P','Q','R','X','N','Y','M','L','B'],
  ['T','R','A','Z','A','B','I','L','I','D','A','D','W','K','G','P'],  // TRAZABILIDAD   [4,0] H (12)
  ['X','N','Q','B','M','J','F','T','H','Z','Y','L','K','G','R','D'],
  ['V','I','S','I','B','I','L','I','D','A','D','F','Q','N','M','X'],  // VISIBILIDAD    [6,0] H (11)
  ['K','P','T','G','Z','H','N','X','B','J','Q','Y','M','R','L','W'],
  ['R','E','S','I','L','I','E','N','C','I','A','K','P','T','X','G'],  // RESILIENCIA    [8,0] H (11)
  ['Z','M','H','Q','B','N','T','K','X','P','J','Y','F','L','G','D'],
  ['W','X','B','K','G','T','P','Z','N','M','H','Q','J','F','Y','L'],
  ['T','G','N','M','X','B','K','Z','H','Q','P','J','Y','L','F','W'],
  ['P','H','Q','T','Z','X','G','N','K','B','M','J','L','Y','W','F'],
  ['N','Z','G','X','K','M','T','B','Q','H','P','L','J','Y','W','F'],
  ['M','K','B','H','P','G','N','X','Z','T','Q','J','L','F','Y','W'],
  ['X','B','T','P','H','Z','M','K','G','N','Q','F','J','Y','L','W']
];

const SOPA_WORDS = [
  {
    word: 'SINCRONIZACION', row: 0, col: 0, dir: 'H',
    pista: 'Coordinación precisa entre los ritmos de producción, distribución y demanda del cliente.'
  },
  {
    word: 'OMNICANALIDAD',  row: 2, col: 0, dir: 'H',
    pista: 'Capacidad de ofrecer una experiencia integrada sin importar el canal que use el cliente.'
  },
  {
    word: 'TRAZABILIDAD',   row: 4, col: 0, dir: 'H',
    pista: 'Capacidad de seguir el recorrido exacto de un producto desde su origen hasta su destino final.'
  },
  {
    word: 'VISIBILIDAD',    row: 6, col: 0, dir: 'H',
    pista: 'Acceso en tiempo real al estado de cada eslabón de la cadena, desde el proveedor hasta el cliente.'
  },
  {
    word: 'RESILIENCIA',    row: 8, col: 0, dir: 'H',
    pista: 'Capacidad de absorber disrupciones y recuperarse sin perder el nivel de servicio al cliente.'
  }
];

let sopaState = { found: new Set(), pistaActual: 0, palabraEscrita: '', selecting: false, start: null, sel: [], pts: 0 };

function sopaGetCells(w) {
  const cells = [];
  const dr = w.dir === 'V' ? 1 : w.dir === 'D' ? 1 : 0;
  const dc = w.dir === 'H' ? 1 : w.dir === 'D' ? 1 : 0;
  for (let i = 0; i < w.word.length; i++) cells.push({ r: w.row + dr*i, c: w.col + dc*i });
  return cells;
}

function abrirActividad() {
  sopaState = { found: new Set(), pistaActual: 0, palabraEscrita: '', selecting: false, start: null, sel: [] };

  const prev = document.getElementById('actividad-modal');
  if (prev) prev.remove();

  const modal = document.createElement('div');
  modal.id = 'actividad-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:700px;margin:0 auto;padding:28px 20px 60px;">

      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <div>
          <span class="badge badge-magenta">Connected Customer · Día 1</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">Actividad · Vocabulario Experto · 5 pts</div>
        </div>
        <button onclick="cerrarActividad()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;">✕</button>
      </div>

      <!-- Progreso -->
      <div style="display:flex;gap:6px;margin-bottom:24px;" id="act-progress">
        ${SOPA_WORDS.map((_, i) => `<div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);" id="act-prog-${i}"></div>`).join('')}
      </div>

      <!-- Instrucciones -->
      <div style="background:rgba(248,0,250,0.06);border:1px solid rgba(248,0,250,0.2);border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
        <strong style="color:var(--magenta);">¿Cómo funciona?</strong> Lee la pista, escribe el término de supply chain que corresponde y luego encuéntralo en el grid.
      </div>

      <!-- Pista actual -->
      <div id="act-pista-area"></div>

      <!-- Input -->
      <div id="act-input-area" style="margin-bottom:24px;"></div>

      <!-- Grid -->
      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:16px;">
        <table id="act-sopa-table" style="border-collapse:collapse;margin:0 auto;"></table>
      </div>

      <!-- Status -->
      <div id="act-status" style="text-align:center;font-size:14px;font-weight:600;color:var(--cyan);min-height:22px;"></div>

      <!-- Resultados -->
      <div id="act-resultados" style="display:none;"></div>
    </div>`;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  actRenderGrid();
  actMostrarPista(0);
}

function cerrarActividad() {
  const modal = document.getElementById('actividad-modal');
  if (modal) modal.remove();
  document.body.style.overflow = '';
}

function actRenderGrid() {
  const table = document.getElementById('act-sopa-table');
  if (!table) return;
  table.innerHTML = '';
  for (let r = 0; r < 16; r++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < 16; c++) {
      const td = document.createElement('td');
      td.className = 'sopa-td';
      td.id = `act-td-${r}-${c}`;
      td.textContent = SOPA_GRID[r][c];
      td.dataset.r = r; td.dataset.c = c;
      // Marcar ya encontradas
      for (const wname of sopaState.found) {
        const w = SOPA_WORDS.find(x => x.word === wname);
        if (w && sopaGetCells(w).some(x => x.r === r && x.c === c)) { td.classList.add('found'); break; }
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function actMostrarPista(idx) {
  const w = SOPA_WORDS[idx];
  if (!w) return;
  sopaState.pistaActual = idx;
  sopaState.palabraEscrita = '';

  // Actualizar progreso
  SOPA_WORDS.forEach((_, i) => {
    const el = document.getElementById('act-prog-' + i);
    if (!el) return;
    if (i < idx) el.style.background = 'var(--cyan)';
    else if (i === idx) el.style.background = 'var(--magenta)';
    else el.style.background = 'rgba(255,255,255,0.1)';
  });

  const pistaEl = document.getElementById('act-pista-area');
  if (pistaEl) pistaEl.innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:11px;color:var(--magenta);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Pista ${idx+1} de ${SOPA_WORDS.length}</div>
      <div style="font-size:16px;font-weight:600;line-height:1.5;color:rgba(255,255,255,0.9);">${w.pista}</div>
    </div>`;

  const inputEl = document.getElementById('act-input-area');
  if (inputEl) inputEl.innerHTML = `
    <div style="display:flex;gap:10px;align-items:center;">
      <input id="act-input" type="text" placeholder="Escribe el término aquí..." autocomplete="off" autocorrect="off" spellcheck="false"
        style="flex:1;padding:12px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-size:15px;font-weight:600;letter-spacing:0.05em;outline:none;text-transform:uppercase;"
        oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter')actVerificar()"/>
      <button class="btn btn-primary" onclick="actVerificar()" style="padding:12px 20px;white-space:nowrap;">
        <i class="fas fa-search"></i> Buscar
      </button>
    </div>
    <div id="act-input-feedback" style="min-height:18px;margin-top:8px;font-size:12px;"></div>`;

  setTimeout(() => { const inp = document.getElementById('act-input'); if (inp) inp.focus(); }, 100);
  const st = document.getElementById('act-status');
  if (st) st.textContent = '';
}

function actVerificar() {
  const inp = document.getElementById('act-input');
  if (!inp) return;
  const escrita = inp.value.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const w = SOPA_WORDS[sopaState.pistaActual];
  const fb = document.getElementById('act-input-feedback');

  if (escrita === w.word) {
    // Correcto — resaltar en el grid
    inp.style.borderColor = '#00ff88';
    if (fb) fb.innerHTML = `<span style="color:#00ff88;font-weight:700;">✅ ¡Correcto! Ahora encuéntrala en el grid y selecciónala.</span>`;

    // Activar selección solo para esta palabra
    actActivarSeleccion(w);
  } else if (escrita.length > 0) {
    inp.style.borderColor = 'var(--magenta)';
    if (fb) fb.innerHTML = `<span style="color:var(--magenta);">❌ No es ese término. Piénsalo de nuevo.</span>`;
    inp.value = '';
    setTimeout(() => { inp.style.borderColor = 'rgba(255,255,255,0.15)'; if(fb) fb.innerHTML=''; }, 2000);
  }
}

function actActivarSeleccion(w) {
  const st = document.getElementById('act-status');
  if (st) st.textContent = '👆 Arrastra sobre las letras en el grid para seleccionar la palabra.';

  // Agregar eventos de selección al grid
  const table = document.getElementById('act-sopa-table');
  if (!table) return;

  sopaState.selecting = false; sopaState.start = null; sopaState.sel = [];

  table.querySelectorAll('.sopa-td').forEach(td => {
    td.onmousedown = e => { e.preventDefault(); actSelDown(td); };
    td.onmouseenter = () => { if (sopaState.selecting) actSelEnter(td); };
    td.onmouseup = () => actSelUp(w);
    td.ontouchstart = e => { e.preventDefault(); actSelDown(td); };
    td.ontouchmove = e => { e.preventDefault(); const el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY); if (el && el.classList.contains('sopa-td')) actSelEnter(el); };
    td.ontouchend = e => { e.preventDefault(); actSelUp(w); };
  });
}

function actSelDown(td) {
  sopaState.selecting = true;
  sopaState.start = { r: +td.dataset.r, c: +td.dataset.c };
  actClearSel();
  if (!td.classList.contains('found')) td.classList.add('sel');
  sopaState.sel = [{ r: sopaState.start.r, c: sopaState.start.c }];
}

function actSelEnter(td) {
  if (!sopaState.selecting || !sopaState.start) return;
  actClearSel();
  const r2 = +td.dataset.r, c2 = +td.dataset.c;
  const line = actBuildLine(sopaState.start.r, sopaState.start.c, r2, c2);
  sopaState.sel = line;
  line.forEach(({ r, c }) => {
    const cell = document.getElementById(`act-td-${r}-${c}`);
    if (cell && !cell.classList.contains('found')) cell.classList.add('sel');
  });
}

function actBuildLine(r1, c1, r2, c2) {
  const dr = r2-r1, dc = c2-c1;
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  if (len === 0) return [{ r:r1, c:c1 }];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [];
  const sr = dr === 0 ? 0 : dr/Math.abs(dr);
  const sc = dc === 0 ? 0 : dc/Math.abs(dc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push({ r: r1+sr*i, c: c1+sc*i });
  return cells;
}

function actClearSel() {
  sopaState.sel.forEach(({ r, c }) => {
    const td = document.getElementById(`act-td-${r}-${c}`);
    if (td && !td.classList.contains('found')) { td.classList.remove('sel'); td.style.background = ''; }
  });
  sopaState.sel = [];
}

function actSelUp(w) {
  if (!sopaState.selecting) return;
  sopaState.selecting = false;
  const sel = sopaState.sel.map(({ r, c }) => SOPA_GRID[r][c]).join('');

  if (sel === w.word) {
    // ¡Encontrada!
    sopaGetCells(w).forEach(({ r, c }) => {
      const td = document.getElementById(`act-td-${r}-${c}`);
      if (td) { td.classList.remove('sel'); td.classList.add('found'); td.style.background = ''; }
    });
    sopaState.found.add(w.word);
    sopaState.pts += 1;
    showFloatingPoints(1);

    // Quitar eventos del grid
    document.querySelectorAll('#act-sopa-table .sopa-td').forEach(td => {
      td.onmousedown = null; td.onmouseenter = null; td.onmouseup = null;
      td.ontouchstart = null; td.ontouchmove = null; td.ontouchend = null;
    });

    const st = document.getElementById('act-status');
    if (st) st.textContent = `✅ ¡${w.word} encontrada!`;

    setTimeout(() => {
      const siguiente = sopaState.pistaActual + 1;
      if (siguiente < SOPA_WORDS.length) {
        actMostrarPista(siguiente);
      } else {
        actMostrarResultados();
      }
    }, 1200);
  } else {
    actClearSel();
    const st = document.getElementById('act-status');
    if (st) { st.textContent = 'Intenta de nuevo — selecciona exactamente las letras de la palabra.'; st.style.color = 'var(--magenta)'; }
    setTimeout(() => { if(st){ st.textContent='👆 Arrastra sobre las letras en el grid.'; st.style.color='var(--cyan)'; } }, 2000);
  }
}

function actMostrarResultados() {
  document.getElementById('act-pista-area').style.display = 'none';
  document.getElementById('act-input-area').style.display = 'none';
  document.getElementById('act-status').textContent = '';
  SOPA_WORDS.forEach((_, i) => {
    const el = document.getElementById('act-prog-' + i);
    if (el) el.style.background = 'var(--cyan)';
  });

  const res = document.getElementById('act-resultados');
  res.style.display = 'block';
  res.innerHTML = `
    <div style="text-align:center;padding:24px 0 32px;">
      <div style="font-size:64px;font-weight:900;color:#00ff88;line-height:1;">5/5</div>
      <div style="font-size:22px;font-weight:700;margin:10px 0 6px;">+${sopaState.pts} pts</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.45);">¡Dominas el vocabulario experto de Connected Customer!</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:28px;">
      ${SOPA_WORDS.map(w => `
        <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.15);border-radius:10px;padding:12px 16px;">
          <div style="font-size:13px;font-weight:800;color:#00ff88;letter-spacing:0.06em;margin-bottom:3px;">${w.word}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.5;">${w.pista}</div>
        </div>`).join('')}
    </div>
    <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;" onclick="cerrarActividad();marcarRecurso('actividad');">
      Cerrar y continuar <i class="fas fa-check"></i>
    </button>`;
}

function initSopa() {} // legacy — ya no se usa inline

// ══════════════════════════════════════
//  SIMULADOR — ¿Eficiente o Excelente?
// ══════════════════════════════════════

const INDICADORES = [
  { id:'i1', nombre:'Utilización de flota', desc:'% de capacidad de carga usada por unidad por ruta', tipo:'FALSO',
    exp:'Alta utilización significa consolidar pedidos cuando conviene a la ruta, no cuando el cliente los necesita. Un camión al 95% que llega dos días tarde es un éxito interno y un fracaso para la tienda que perdió ventas.' },
  { id:'i2', nombre:'Costo por entrega', desc:'Gasto logístico total dividido entre número de entregas realizadas', tipo:'FALSO',
    exp:'Incentiva reducir frecuencia de visita y aumentar volumen. El cliente pequeño recibe menos visitas, hace pedidos más grandes de los que puede financiar y termina con desabasto entre visitas.' },
  { id:'i3', nombre:'OTIF interno', desc:'% de órdenes entregadas completas y en fecha comprometida en el sistema', tipo:'FALSO',
    exp:'El engaño: si planeación mueve la fecha en el sistema antes de que venza el plazo, el sistema registra cumplimiento. El cliente recibió tarde; el reporte dice 98% OTIF.' },
  { id:'i4', nombre:'Tasa de rechazo en almacén', desc:'% de unidades rechazadas por calidad antes de salir del CEDIS', tipo:'FALSO',
    exp:'Mide calidad interna, no la percibida en el punto de entrega. El producto puede pasar el control del CEDIS y llegar golpeado o en presentación equivocada.' },
  { id:'i5', nombre:'Tasa de quiebre en anaquel', desc:'Frecuencia con que una tienda reporta faltante de un SKU entre visitas', tipo:'REAL',
    exp:'Este es el indicador que el dueño de la tienda siente cada vez que le dice "no" a un cliente. No vive en ningún reporte de la distribuidora porque requiere datos del punto de venta.' },
  { id:'i6', nombre:'Predictibilidad de ventana de entrega', desc:'Varianza entre hora prometida y hora real de llegada por ruta y cliente', tipo:'REAL',
    exp:'Una tienda puede adaptarse a un proveedor que llega tarde si llega predeciblemente tarde. Lo que destruye la operación es la varianza: hoy a las 9am, mañana a las 4pm.' },
  { id:'i7', nombre:'Fill rate percibido por el cliente', desc:'% de líneas del pedido original que llegaron completas según el cliente', tipo:'REAL',
    exp:'Diferente al fill rate interno. Si el sistema reduce la orden por desabasto, internamente hay 100% de cumplimiento. Para el cliente, llegó incompleto.' },
  { id:'i8', nombre:'Resolución en primera llamada', desc:'% de reclamaciones resueltas sin reescalación ni segunda llamada', tipo:'REAL',
    exp:'Lo que mide la percepción no es solo si se resolvió, sino cuántas veces el cliente tuvo que insistir. Predice churn de clientes mejor que cualquier KPI de almacén.' },
  { id:'i9', nombre:'NPS post-entrega', desc:'Net Promoter Score capturado por la app del repartidor al momento de la entrega', tipo:'DISTRACTOR',
    exp:'Parece centrado en el cliente, pero se captura con el repartidor presente, creando sesgo social. El dueño raramente da un 6 con el repartidor enfrente. Un indicador de cliente capturado con lógica interna.' },
  { id:'i10', nombre:'Rotación de inventario en CEDIS', desc:'Velocidad a la que el inventario del centro de distribución se convierte en entregas', tipo:'DISTRACTOR',
    exp:'Optimizar rotación lleva a reducir SKUs lentos y priorizar rutas de alto volumen, desabasteciendo selectivamente a los clientes pequeños que más dependen del distribuidor.' }
];

const FASE2_LLAMADAS = [
  {
    cliente: 'Don Roberto — Abarrotes El Fénix',
    queja: '"Me cambiaron la fecha de entrega sin avisarme. Contraté personal extra para recibir y nadie llegó. Eso me costó dinero."',
    opciones: [
      { txt: 'Disculparse y ofrecer un descuento en el próximo pedido.', pts: 1, fb: 'El descuento calma la queja inmediata pero no resuelve la causa raíz: la falta de aviso. El cliente seguirá viviendo lo mismo.' },
      { txt: 'Comprometerse a notificarle con 24 horas de anticipación cualquier cambio de fecha.', pts: 3, fb: '¡Correcto! Atacas el problema real: la falta de visibilidad y comunicación proactiva. Esto construye confianza.' },
      { txt: 'Explicarle que los cambios de ruta son necesarios para optimizar costos operativos.', pts: 0, fb: 'Grave error. Le estás priorizando la eficiencia interna sobre su experiencia. El cliente no paga tu costo operativo — paga por confiabilidad.' }
    ]
  },
  {
    cliente: 'Doña Carmen — Minisuper La Esperanza',
    queja: '"Me llegaron 3 de los 8 productos que pedí. El resto "no había en almacén". Pero nadie me avisó antes de la entrega."',
    opciones: [
      { txt: 'Reprogramar la entrega del faltante para la próxima semana.', pts: 1, fb: 'Resuelve el faltante pero no la comunicación. Doña Carmen perdió ventas esta semana que ya no recupera.' },
      { txt: 'Implementar un aviso automático cuando hay desabasto, antes de que salga el camión.', pts: 3, fb: '¡Exacto! La solución estructural es dar visibilidad al cliente antes, no después. Así puede tomar decisiones a tiempo.' },
      { txt: 'Ofrecerle un producto sustituto del mismo precio.', pts: 1, fb: 'Iniciativa válida, pero solo funciona si el cliente lo acepta. El problema de fondo — sin aviso previo — sigue sin resolverse.' }
    ]
  }
];

const CRITERIOS_EXCELENCIA = [
  { id:'c1', txt:'Reducir el costo por entrega 15% trimestral', correcto: false },
  { id:'c2', txt:'Cero quiebres de anaquel en clientes activos', correcto: true },
  { id:'c3', txt:'Aumentar utilización de flota al 90%', correcto: false },
  { id:'c4', txt:'100% de avisos proactivos ante cambios de fecha o faltantes', correcto: true },
  { id:'c5', txt:'Fill rate percibido por cliente ≥ 95%', correcto: true },
  { id:'c6', txt:'Reducir rechazos en almacén a menos del 2%', correcto: false },
  { id:'c7', txt:'Resolución de quejas en primera llamada ≥ 90%', correcto: true },
  { id:'c8', txt:'Incrementar volumen por ruta 20% anual', correcto: false }
];

let simState = {};

function abrirSimulador() {
  simState = { fase: 1, clasificaciones: {}, fase2pts: 0, fase2idx: 0, criteriosSelec: new Set(), pts: 0 };

  const prev = document.getElementById('sim-modal');
  if (prev) prev.remove();

  const modal = document.createElement('div');
  modal.id = 'sim-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:680px;margin:0 auto;padding:28px 20px 60px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <div>
          <span class="badge badge-purple">Connected Customer · Día 1</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">Simulador · ¿Eficiente o Excelente? · 5 pts</div>
        </div>
        <button onclick="cerrarSimulador()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;">✕</button>
      </div>
      <!-- Fases progress -->
      <div style="display:flex;gap:4px;margin-bottom:28px;">
        <div style="flex:1;height:4px;border-radius:2px;background:var(--purple);" id="sim-prog-1"></div>
        <div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);" id="sim-prog-2"></div>
        <div style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);" id="sim-prog-3"></div>
      </div>
      <div id="sim-contenido"></div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  simRenderFase1();
}

function cerrarSimulador() {
  const modal = document.getElementById('sim-modal');
  if (modal) modal.remove();
  document.body.style.overflow = '';
}

function simRenderFase1() {
  const shuffled = [...INDICADORES].sort(() => Math.random() - 0.5);
  simState.fase1Indicadores = shuffled;
  const cont = document.getElementById('sim-contenido');
  cont.innerHTML = `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;color:var(--purple);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Fase 1 de 3 — El diagnóstico</div>
      <h3 style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:8px;">Lunes por la mañana. Operaciones celebra. El cliente se queja.</h3>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:20px;">El Director te pide separar qué indicadores miden éxito real y cuáles son espejismos internos. Clasifica todos y luego revisa tus resultados.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;" id="sim-indicadores">
      ${shuffled.map(ind => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;" id="sim-ind-${ind.id}">
          <div style="flex:1;min-width:180px;">
            <div style="font-size:13px;font-weight:700;margin-bottom:2px;">${ind.nombre}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35);">${ind.desc}</div>
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;">
            <button onclick="simSeleccionar('${ind.id}','FALSO',this)" data-id="${ind.id}" data-tipo="FALSO"
              style="padding:6px 10px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(248,0,250,0.3);background:transparent;color:rgba(248,0,250,0.7);">
              Falso
            </button>
            <button onclick="simSeleccionar('${ind.id}','REAL',this)" data-id="${ind.id}" data-tipo="REAL"
              style="padding:6px 10px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(0,255,136,0.3);background:transparent;color:rgba(0,255,136,0.7);">
              Real
            </button>
            <button onclick="simSeleccionar('${ind.id}','DISTRACTOR',this)" data-id="${ind.id}" data-tipo="DISTRACTOR"
              style="padding:6px 10px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,200,0,0.3);background:transparent;color:rgba(255,200,0,0.7);">
              Depende
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="font-size:12px;color:rgba(255,255,255,0.3);text-align:center;margin-bottom:12px;">Clasificados: <span id="sim-clasificados-count" style="color:var(--purple);font-weight:700;">0</span> / ${INDICADORES.length}</div>

    <button id="btn-sim-verificar" class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;opacity:0.35;cursor:not-allowed;" disabled onclick="simVerificarTodos()">
      Ver resultados <i class="fas fa-chart-bar"></i>
    </button>`;
}

function simSeleccionar(id, tipo, btn) {
  // Desmarcar botón previo de este indicador
  document.querySelectorAll(`button[data-id="${id}"]`).forEach(b => {
    b.style.background = 'transparent';
    b.style.opacity = '1';
  });

  // Marcar seleccionado
  const colores = { FALSO: 'rgba(248,0,250,0.2)', REAL: 'rgba(0,255,136,0.2)', DISTRACTOR: 'rgba(255,200,0,0.2)' };
  btn.style.background = colores[tipo];

  simState.clasificaciones[id] = tipo;

  const count = Object.keys(simState.clasificaciones).length;
  const countEl = document.getElementById('sim-clasificados-count');
  if (countEl) countEl.textContent = count;

  if (count === INDICADORES.length) {
    const btnV = document.getElementById('btn-sim-verificar');
    if (btnV) { btnV.disabled = false; btnV.style.opacity = '1'; btnV.style.cursor = 'pointer'; }
  }
}

function simVerificarTodos() {
  let ptsGanados = 0;
  INDICADORES.forEach(ind => {
    const elegido = simState.clasificaciones[ind.id];
    const correcto = elegido === ind.tipo;
    if (correcto) ptsGanados += 0.5;
    const card = document.getElementById('sim-ind-' + ind.id);
    if (!card) return;
    const label = ind.tipo === 'FALSO' ? 'Falso' : ind.tipo === 'REAL' ? 'Real' : 'Depende';
    const colorBorde = correcto ? '#00ff88' : 'var(--magenta)';
    card.style.borderColor = colorBorde;
    card.style.marginBottom = '4px';
    // Mostrar feedback compacto
    const fb = document.createElement('div');
    fb.style.cssText = `font-size:11px;color:rgba(255,255,255,0.45);margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);line-height:1.5;`;
    fb.innerHTML = correcto
      ? `<span style="color:#00ff88;font-weight:700;">✅ Correcto (${label}).</span> ${ind.exp}`
      : `<span style="color:var(--magenta);font-weight:700;">❌ Era: ${label}.</span> ${ind.exp}`;
    card.appendChild(fb);
    // Deshabilitar botones
    document.querySelectorAll(`button[data-id="${ind.id}"]`).forEach(b => { b.style.cursor='default'; b.onclick=null; b.style.opacity='0.4'; });
  });

  simState.pts += ptsGanados;

  // Reemplazar botón
  const btnV = document.getElementById('btn-sim-verificar');
  if (btnV) {
    btnV.textContent = '';
    btnV.innerHTML = `Continuar a Fase 2 <i class="fas fa-arrow-right"></i>`;
    btnV.onclick = simIrFase2;
  }
}

function simIrFase2() {
  document.getElementById('sim-prog-2').style.background = 'var(--purple)';
  simState.fase = 2;
  simState.fase2idx = 0;
  simRenderFase2();
}

function simRenderFase2() {
  const llamada = FASE2_LLAMADAS[simState.fase2idx];
  const cont = document.getElementById('sim-contenido');
  cont.innerHTML = `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;color:var(--purple);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Fase 2 de 3 — La llamada del cliente (${simState.fase2idx+1}/${FASE2_LLAMADAS.length})</div>
      <h3 style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:16px;">Suena el teléfono.</h3>
    </div>
    <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.25);border-radius:12px;padding:20px;margin-bottom:24px;">
      <div style="font-size:11px;font-weight:700;color:var(--purple);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.06em;">📞 ${llamada.cliente}</div>
      <div style="font-size:15px;font-style:italic;color:rgba(255,255,255,0.85);line-height:1.6;">${llamada.queja}</div>
    </div>
    <p style="font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:16px;">¿Cómo respondes como consultor interno?</p>
    <div style="display:flex;flex-direction:column;gap:10px;" id="sim-opciones">
      ${llamada.opciones.map((op, i) => `
        <div onclick="simResponder(${i})" style="padding:14px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;font-size:14px;line-height:1.5;transition:border-color 0.15s;" id="sim-op-${i}"
          onmouseover="if(!this.dataset.locked)this.style.borderColor='rgba(117,114,233,0.5)'"
          onmouseout="if(!this.dataset.locked)this.style.borderColor='rgba(255,255,255,0.1)'">
          ${op.txt}
        </div>`).join('')}
    </div>
    <div id="sim-fase2-fb" style="margin-top:16px;min-height:20px;"></div>`;
}

function simResponder(idx) {
  const llamada = FASE2_LLAMADAS[simState.fase2idx];
  const op = llamada.opciones[idx];
  document.querySelectorAll('[id^="sim-op-"]').forEach(el => { el.style.cursor='default'; el.dataset.locked='1'; el.onclick=null; });

  const el = document.getElementById('sim-op-' + idx);
  const color = op.pts === 3 ? '#00ff88' : op.pts === 1 ? 'orange' : 'var(--magenta)';
  el.style.borderColor = color;
  el.style.background = op.pts === 3 ? 'rgba(0,255,136,0.08)' : op.pts === 1 ? 'rgba(255,165,0,0.08)' : 'rgba(248,0,250,0.08)';

  simState.fase2pts += op.pts;
  simState.pts += op.pts === 3 ? 1 : op.pts === 1 ? 0.5 : 0;

  const fb = document.getElementById('sim-fase2-fb');
  fb.innerHTML = `
    <div style="padding:12px 16px;border-radius:8px;border-left:3px solid ${color};background:rgba(255,255,255,0.03);font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:16px;">
      ${op.fb}
    </div>
    <button class="btn btn-primary" style="width:100%;padding:12px;" onclick="simSiguienteLlamada()">
      ${simState.fase2idx + 1 < FASE2_LLAMADAS.length ? 'Siguiente llamada <i class="fas fa-arrow-right"></i>' : 'Continuar a Fase 3 <i class="fas fa-arrow-right"></i>'}
    </button>`;
}

function simSiguienteLlamada() {
  simState.fase2idx++;
  if (simState.fase2idx < FASE2_LLAMADAS.length) {
    simRenderFase2();
  } else {
    document.getElementById('sim-prog-3').style.background = 'var(--purple)';
    simRenderFase3();
  }
}

function simRenderFase3() {
  const shuffled = [...CRITERIOS_EXCELENCIA].sort(() => Math.random() - 0.5);
  const cont = document.getElementById('sim-contenido');
  cont.innerHTML = `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;color:var(--purple);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Fase 3 de 3 — La propuesta al Director</div>
      <h3 style="font-size:18px;font-weight:700;line-height:1.4;margin-bottom:8px;">El Director te pide el nuevo estándar de excelencia.</h3>
      <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">Selecciona los <strong style="color:white;">4 criterios</strong> que formarán el nuevo estándar de excelencia centrado en el cliente.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;" id="sim-criterios">
      ${shuffled.map(c => `
        <div onclick="simToggleCriterio('${c.id}',this)" data-id="${c.id}" style="padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;display:flex;align-items:center;gap:12px;font-size:13px;transition:all 0.15s;">
          <div style="width:20px;height:20px;border-radius:4px;border:1px solid rgba(255,255,255,0.2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;" id="chk-${c.id}"></div>
          ${c.txt}
        </div>`).join('')}
    </div>
    <div style="font-size:12px;color:rgba(255,255,255,0.3);text-align:center;margin-bottom:16px;">Seleccionados: <span id="sim-criterios-count" style="color:var(--purple);font-weight:700;">0</span> / 4</div>
    <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;opacity:0.35;cursor:not-allowed;" id="btn-sim-finalizar" disabled onclick="simFinalizar()">
      Entregar propuesta al Director <i class="fas fa-check"></i>
    </button>`;
}

function simToggleCriterio(id, el) {
  if (simState.criteriosSelec.has(id)) {
    simState.criteriosSelec.delete(id);
    el.style.borderColor = 'rgba(255,255,255,0.1)';
    el.style.background = 'rgba(255,255,255,0.03)';
    const chk = document.getElementById('chk-' + id);
    if (chk) { chk.innerHTML = ''; chk.style.background = ''; chk.style.borderColor = 'rgba(255,255,255,0.2)'; }
  } else {
    if (simState.criteriosSelec.size >= 4) return;
    simState.criteriosSelec.add(id);
    el.style.borderColor = 'rgba(117,114,233,0.5)';
    el.style.background = 'rgba(117,114,233,0.08)';
    const chk = document.getElementById('chk-' + id);
    if (chk) { chk.innerHTML = '✓'; chk.style.background = 'var(--purple)'; chk.style.borderColor = 'var(--purple)'; chk.style.color = '#fff'; }
  }
  const count = simState.criteriosSelec.size;
  document.getElementById('sim-criterios-count').textContent = count;
  const btn = document.getElementById('btn-sim-finalizar');
  if (count === 4) { btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; }
  else { btn.disabled = true; btn.style.opacity = '0.35'; btn.style.cursor = 'not-allowed'; }
}

function simFinalizar() {
  const correctosSelec = [...simState.criteriosSelec].filter(id => CRITERIOS_EXCELENCIA.find(c => c.id === id && c.correcto)).length;
  simState.pts += correctosSelec;
  const totalPts = Math.min(5, Math.round(simState.pts));
  const pct = Math.round((correctosSelec / 4) * 100);
  const color = pct === 100 ? '#00ff88' : pct >= 75 ? 'var(--cyan)' : 'orange';
  const msg = pct === 100 ? '¡Propuesta impecable! El Director la aprueba.' : pct >= 75 ? 'Buena propuesta, con un ajuste menor.' : 'Revisa tu selección — incluiste criterios internos.';

  const correctosTodos = CRITERIOS_EXCELENCIA.filter(c => c.correcto);
  const incorrectos = [...simState.criteriosSelec].filter(id => CRITERIOS_EXCELENCIA.find(c => c.id === id && !c.correcto));

  const cont = document.getElementById('sim-contenido');
  cont.innerHTML = `
    <div style="text-align:center;padding:20px 0 28px;">
      <div style="font-size:64px;font-weight:900;color:${color};line-height:1;">${correctosSelec}/4</div>
      <div style="font-size:22px;font-weight:700;margin:10px 0 6px;">+${totalPts} pts</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.45);">${msg}</div>
    </div>

    ${incorrectos.length > 0 ? `
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:var(--magenta);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Criterios que no deberían estar:</div>
      ${incorrectos.map(id => {
        const c = CRITERIOS_EXCELENCIA.find(x => x.id === id);
        return `<div style="padding:10px 14px;border-radius:8px;border-left:3px solid var(--magenta);background:rgba(248,0,250,0.05);font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:8px;">${c.txt}</div>`;
      }).join('')}
    </div>` : ''}

    <div style="margin-bottom:28px;">
      <div style="font-size:11px;font-weight:700;color:#00ff88;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">El nuevo estándar correcto:</div>
      ${correctosTodos.map(c => `<div style="padding:10px 14px;border-radius:8px;border-left:3px solid #00ff88;background:rgba(0,255,136,0.05);font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:8px;">${c.txt}</div>`).join('')}
    </div>

    <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;" onclick="cerrarSimulador();marcarRecurso('simulador');showFloatingPoints(${totalPts});">
      Cerrar y continuar <i class="fas fa-check"></i>
    </button>`;
}

function completarDia() {
  const siguienteDia = currentDia + 1;
  if (siguienteDia <= 9) {
    setTimeout(() => { renderDia(siguienteDia); window.scrollTo(0, 0); }, 400);
  } else if (siguienteDia === 10) {
    setTimeout(() => { renderDia10(); window.scrollTo(0, 0); }, 400);
  } else {
    setTimeout(() => navigate('screen-journey'), 400);
  }
}

// ── DÍA 10: EVALUACIÓN FINAL ─────────────────────────────────────
function renderDia10() {
  currentDia = 10;

  const bc = document.getElementById('dia-breadcrumb');
  if (bc) bc.textContent = 'Día 10: Evaluación Final del Módulo';
  const badge = document.getElementById('dia-badge');
  if (badge) badge.textContent = '🏁 Evaluación Final';
  const pctLbl = document.getElementById('dia-pct-label');
  if (pctLbl) pctLbl.textContent = '100% completado';
  const fill = document.getElementById('dia-progress-fill');
  if (fill) fill.style.width = '100%';

  const btnComp = document.getElementById('btn-completar-dia');
  if (btnComp) { btnComp.style.display = 'none'; }

  renderSidebarDia(10);
  actualizarPtsDisplay(10);

  const preScore = parseInt(localStorage.getItem('kirkpatrick_pre_score') || '0');
  const prePct   = parseInt(localStorage.getItem('kirkpatrick_pre_pct')   || '0');

  // Repaso dinámico desde Día 9
  const repasoHecho10 = !!(diasEstado[10] && diasEstado[10].repaso);
  const prevWrong10 = wrongQuestionsByDay[9];
  let htmlRepaso10 = '';
  if (repasoHecho10) {
    htmlRepaso10 = `
    <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.25);border-left:3px solid var(--purple);border-radius:10px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:18px;">✅</span>
      <div>
        <div style="font-size:10px;color:var(--purple);font-weight:700;letter-spacing:0.08em;">REPASO DEL DÍA ANTERIOR</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">Completado</div>
      </div>
    </div>`;
  } else if (prevWrong10 === undefined) {
    htmlRepaso10 = '';
  } else if (prevWrong10.length === 0) {
    htmlRepaso10 = `
    <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);border-left:3px solid #00ff88;border-radius:10px;padding:12px 16px;margin-bottom:18px;">
      <div style="font-size:10px;color:#00ff88;font-weight:700;letter-spacing:0.08em;">REPASO DEL DÍA ANTERIOR</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">🎉 No tuviste errores el día anterior — ¡Excelente!</div>
    </div>`;
  } else {
    htmlRepaso10 = `
    <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.3);border-left:3px solid var(--purple);border-radius:10px;padding:16px;margin-bottom:18px;">
      <div style="font-size:10px;color:var(--purple);font-weight:700;letter-spacing:0.08em;margin-bottom:6px;">REPASO DEL DÍA ANTERIOR</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:12px;">${prevWrong10.length} pregunta${prevWrong10.length > 1 ? 's' : ''} fallada${prevWrong10.length > 1 ? 's' : ''} — revisalas antes de continuar (sin puntos)</div>
      <button class="btn" style="width:100%;font-size:13px;padding:10px;background:rgba(117,114,233,0.15);border:1px solid rgba(117,114,233,0.4);color:var(--purple);font-weight:700;" onclick="abrirRepaso(10)">
        <i class="fas fa-redo"></i> Iniciar Repaso
      </button>
    </div>`;
  }

  // Simulador Día 10
  const sim10Hecho = !!(diasEstado[10] && diasEstado[10].simulador);
  const sim10Data = DIAS_CC[9] && DIAS_CC[9].sim;
  const htmlSim10 = sim10Hecho ? `
    <div class="card" style="border-color:rgba(0,255,136,0.3);margin-bottom:20px;background:rgba(0,255,136,0.04);text-align:center;padding:20px 24px;">
      <div style="font-size:28px;margin-bottom:6px;">✅</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#00ff88;margin-bottom:4px;">SIMULADOR COMPLETADO</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.5);">${sim10Data ? sim10Data.titulo : 'Caso 10'}</div>
    </div>` : `
    <div class="card" style="border-color:rgba(117,114,233,0.4);margin-bottom:20px;background:rgba(117,114,233,0.04);text-align:center;padding:28px 24px;">
      <div style="font-size:36px;margin-bottom:10px;">🎮</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:var(--purple);margin-bottom:6px;">SIMULADOR DE CASO · ODYSSEY · 8 PTS</div>
      <h4 style="margin-bottom:6px;font-size:17px;">${sim10Data ? sim10Data.titulo : 'El balance final'}</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:20px;">${sim10Data ? sim10Data.subtitulo : 'Integración del módulo · Caso 10'}</p>
      <button class="btn" style="width:100%;font-size:15px;padding:13px;background:rgba(117,114,233,0.15);border:1px solid rgba(117,114,233,0.5);color:var(--purple);font-weight:700;" onclick="abrirSimuladorCaso(10)">
        <i class="fas fa-gamepad"></i> Iniciar Simulador
      </button>
    </div>`;

  // Post-evaluación
  const postEvalHecho = !!(diasEstado[10] && diasEstado[10].postEval);
  const htmlPostEval = postEvalHecho ? `
    <div class="card" style="border-color:rgba(0,255,136,0.3);margin-bottom:20px;background:rgba(0,255,136,0.04);text-align:center;padding:20px 24px;">
      <div style="font-size:28px;margin-bottom:6px;">🏆</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#00ff88;margin-bottom:4px;">EVALUACIÓN FINAL COMPLETADA</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.4);">Ya registrado · Consulta tu Kirkpatrick en el Journey</div>
    </div>` : `
    <div class="card" style="border-color:rgba(0,255,136,0.3);margin-bottom:20px;text-align:center;padding:28px 24px;">
      <div style="font-size:36px;margin-bottom:10px;">🎯</div>
      <h4 style="color:#00ff88;font-size:17px;margin-bottom:6px;">Evaluación Final · 10 preguntas</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:20px;">Misma base de preguntas · 1 pt por respuesta correcta · 10 minutos</p>
      <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;background:linear-gradient(135deg,#00ff88,#00d8da);color:#000;font-weight:800;" onclick="abrirPostQuiz()">
        <i class="fas fa-trophy"></i> Iniciar Evaluación Final
      </button>
    </div>`;

  const cont = document.getElementById('dia-contenido');
  if (!cont) return;
  cont.innerHTML = `
    ${htmlRepaso10}
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.35);margin-bottom:4px;">DÍA 10</div>
      <h2 style="font-size:22px;font-weight:800;margin-bottom:10px;">Evaluación Final del Módulo</h2>
      <div style="background:rgba(0,255,136,0.06);border:1px solid rgba(0,255,136,0.2);border-radius:10px;padding:12px 16px;margin-bottom:14px;">
        <div style="font-size:11px;color:#00ff88;font-weight:700;margin-bottom:3px;">OBJETIVO</div>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin:0;">Medir el aprendizaje real del módulo comparando tu resultado con la evaluación diagnóstica inicial (Kirkpatrick Nivel 2).</p>
      </div>
    </div>

    <!-- Diagnóstico previo -->
    <div class="card" style="margin-bottom:20px;border-color:rgba(0,216,218,0.25);">
      <div style="font-size:11px;color:var(--cyan);font-weight:700;letter-spacing:0.06em;margin-bottom:10px;">TU DIAGNÓSTICO INICIAL (DÍA 1)</div>
      <div style="display:flex;align-items:center;gap:16px;">
        <div style="font-size:44px;font-weight:900;color:${prePct>=80?'#00ff88':prePct>=60?'var(--cyan)':'var(--magenta)'};">${preScore}<span style="font-size:22px;color:rgba(255,255,255,0.3);">/10</span></div>
        <div>
          <div style="font-size:14px;font-weight:600;">${prePct}% de respuestas correctas</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;">${prePct>=80?'Nivel experto al inicio':'Espacio de crecimiento identificado'}</div>
        </div>
      </div>
    </div>

    ${htmlSim10}
    ${htmlPostEval}`;
}

function abrirPostQuiz() {
  const banco = (typeof BANCO_CC !== 'undefined') ? BANCO_CC : [];
  const shuffled = [...banco].sort(() => Math.random() - 0.5);
  quizState = { preguntas: shuffled.slice(0, 10).map(shuffleOptsPreg), actual: 0, respuestas: [], ptsGanados: 0, timerSeg: 600, timerInterval: null, esPostQuiz: true };

  const prev = document.getElementById('quiz-modal');
  if (prev) prev.remove();

  const modal = document.createElement('div');
  modal.id = 'quiz-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:600px;margin:0 auto;padding:28px 20px 60px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;">
        <div>
          <span class="badge badge-cyan">Connected Customer · Evaluación Final</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">Post-evaluación · 10 preguntas · 10 pts</div>
        </div>
        <div style="display:flex;align-items:center;gap:18px;">
          <div style="display:flex;align-items:center;gap:7px;">
            <i class="fas fa-clock" style="font-size:13px;color:rgba(255,255,255,0.3);"></i>
            <span id="quiz-timer" style="font-size:22px;font-weight:800;color:var(--cyan);font-variant-numeric:tabular-nums;min-width:46px;">10:00</span>
          </div>
          <button onclick="cerrarQuiz()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;line-height:1;">✕</button>
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:32px;" id="quiz-progress-dots"></div>
      <div id="quiz-question-area"></div>
      <div id="quiz-results-area" style="display:none;"></div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  renderQuizPregunta();
  iniciarTimerQuiz();
}

// ══════════════════════════════════════
//  SISTEMA MULTI-DÍA — Connected Customer & Product
// ══════════════════════════════════════

let currentDia = 1;
let diasPreQuizDone = {};
let diasEstado = {}; // { diaNum: { quiz: bool, simulador: bool, repaso: bool } }
let wrongQuestionsByDay = {}; // { diaNum: [question, ...] } — preguntas falladas por día

function marcarEstadoDia(dia, tipo) {
  if (!diasEstado[dia]) diasEstado[dia] = {};
  diasEstado[dia][tipo] = true;
  saveState();
  renderDia(dia); // re-render para mostrar estado completado
}

// ── BANCO COMPLETO 50 PREGUNTAS ──
const BANCO_CC = [
  {q:'Una distribuidora logra entregar el 98% de sus pedidos a tiempo, pero su NPS cayó 15 puntos en el último trimestre. ¿Cuál es la explicación más probable?',opts:['La distribuidora tiene problemas de capacidad operativa','El OTIF no captura la experiencia completa del cliente conectado','Los clientes tienen expectativas irracionales','El problema está en servicio al cliente, no en la cadena'],c:1,exp:'El OTIF mide eficiencia operativa, pero el cliente conectado valida también visibilidad, comunicación proactiva y facilidad de interacción.'},
  {q:'¿Cuál representa mejor el nuevo estándar de excelencia en cadena de suministro?',opts:['Minimizar costos de inventario y maximizar rotación','Garantizar disponibilidad en todos los canales con visibilidad end-to-end','Cumplir con el OTIF acordado en contrato','Reducir lead times sin incrementar costos logísticos'],c:1,exp:'La excelencia moderna requiere visibilidad, disponibilidad multicanal y capacidad de respuesta, no solo velocidad o costo.'},
  {q:'¿Qué distingue a una empresa de clase mundial de una operacionalmente eficiente?',opts:['Uso de tecnología de punta en almacenes automatizados','Capacidad de anticipar y responder a las necesidades del cliente antes de que las exprese','Menores costos de transporte y distribución','Mayor número de SKUs disponibles'],c:1,exp:'La anticipación (demand sensing, personalización) es el diferenciador. La eficiencia es condición necesaria pero no suficiente.'},
  {q:'Una empresa tiene perfecta disponibilidad de producto pero sus clientes reportan "no saber cuándo llegará su pedido". ¿Qué palanca debe activar?',opts:['Incrementar stock de seguridad','Implementar visibilidad y comunicación proactiva del estatus del pedido','Reducir lead time de producción','Ampliar la red de distribución'],c:1,exp:'La visibilidad del pedido es un diferenciador crítico para el cliente conectado que espera información en tiempo real.'},
  {q:'¿Por qué el concepto de "cadena de suministro" está siendo reemplazado por "red de suministro"?',opts:['Porque el término "red" es más moderno y atractivo','Porque las relaciones son lineales y secuenciales','Porque refleja mejor la naturaleza multidireccional, colaborativa y tecnológica de las operaciones actuales','Porque elimina intermediarios en la distribución'],c:2,exp:'Una cadena implica relaciones lineales. La red captura ecosistemas interconectados con múltiples actores y flujos bidireccionales.'},
  {q:'¿Cuál métrica es más relevante para evaluar si una cadena genera valor al cliente conectado?',opts:['Costo total de la cadena como % de ventas','Tasa de llenado (fill rate) del almacén','Customer Effort Score (CES) en el proceso pedido-entrega','Rotación de inventario'],c:2,exp:'El CES mide el esfuerzo del cliente para recibir su pedido. Reducir ese esfuerzo es el objetivo central.'},
  {q:'¿Cuál de las siguientes fuerzas tuvo mayor impacto en la transformación hacia un modelo centrado en el cliente?',opts:['El incremento en costos de combustible','La proliferación del e-commerce y el comportamiento del consumidor digital','La presión sindical por mejores condiciones laborales','La consolidación de grandes retailers globales'],c:1,exp:'El e-commerce democratizó la comparación de precios, aceleró expectativas de entrega y puso el poder en manos del consumidor.'},
  {q:'Una empresa B2B detecta que sus clientes ahora exigen visibilidad en tiempo real, entregas más frecuentes y flexibilidad. ¿Qué fenómeno explica este cambio?',opts:['La influencia del modelo B2C en las expectativas B2B ("consumerización")','Un cambio en la regulación sectorial','La presión de accionistas por mayor rentabilidad','La incorporación de nuevos proveedores globales'],c:0,exp:'Los compradores B2B trasladan sus expectativas como consumidores (Amazon, Netflix) a sus interacciones comerciales.'},
  {q:'¿Cuál es la principal consecuencia operativa de los silos funcionales?',opts:['Mayor especialización y eficiencia por área','Reducción de costos administrativos','Pérdida de visibilidad end-to-end y respuesta lenta al cliente','Mayor control sobre los procesos internos'],c:2,exp:'Los silos generan información fragmentada, KPIs locales desalineados y tiempos de respuesta lentos.'},
  {q:'Una empresa pasa de modelo "push" a "pull". ¿Qué impacto tiene en la experiencia del cliente?',opts:['Incrementa el inventario disponible en todos los puntos','Reduce la variedad de productos','Alinea producción y distribución con demanda real, mejorando disponibilidad y reduciendo quiebres','Aumenta costos sin beneficio visible para el cliente'],c:2,exp:'El modelo pull conecta la señal de demanda real con la operación, reduciendo sobrestock y quiebres.'},
  {q:'¿Qué caracteriza a una organización que completó la transformación hacia cadena de valor?',opts:['Tiene los costos logísticos más bajos del sector','Sus funciones comparten objetivos orientados al cliente y colaboran en tiempo real','Ha eliminado intermediarios en distribución','Produce exclusivamente bajo pedido'],c:1,exp:'La cadena de valor implica alineación interfuncional con el cliente como norte compartido.'},
  {q:'¿Por qué la digitalización no garantiza por sí sola mejor experiencia al cliente?',opts:['Porque la tecnología es demasiado costosa','Porque sin rediseño de procesos y cultura orientada al cliente, solo se automatizan ineficiencias existentes','Porque los clientes prefieren interacción humana','Porque aumenta la complejidad operativa'],c:1,exp:'"Digitalizar el caos es caos digital." La transformación real requiere procesos + tecnología + cultura.'},
  {q:'¿Qué característica define mejor al "cliente conectado"?',opts:['El que compra exclusivamente por canales digitales','El que espera consistencia, visibilidad y respuesta inmediata independientemente del canal','El cliente corporativo que usa sistemas electrónicos para sus pedidos','El que tiene acceso a múltiples proveedores globales'],c:1,exp:'El cliente conectado no es solo el que compra en línea; espera experiencia consistente, transparente y sin esfuerzo en cualquier canal.'},
  {q:'Una empresa mapea su Customer Journey y descubre que la mayor frustración ocurre 3 días post-pedido sin información. ¿Cuál es la intervención más efectiva?',opts:['Reducir el lead time a 2 días','Implementar notificaciones proactivas automáticas con visibilidad en tiempo real','Asignar un ejecutivo dedicado para ese cliente','Incrementar el stock de seguridad'],c:1,exp:'La ansiedad post-pedido se resuelve con visibilidad proactiva, no necesariamente con velocidad o inventario.'},
  {q:'¿Qué implica Logística 4.0 en términos de capacidades para atender al cliente conectado?',opts:['Automatización de almacenes con robots','Integración de IoT, big data, IA y automatización para visibilidad, predicción y personalización en tiempo real','Subcontratación total a un 3PL especializado','Implementación de un sistema de planeación de última generación'],c:1,exp:'Logística 4.0 es la convergencia de tecnologías para crear una cadena inteligente y capaz de personalizar la experiencia del cliente conectado.'},
  {q:'Un supervisor debe "reescribir la promesa de entrega". ¿Cuál debe ser su punto de partida?',opts:['Los tiempos actuales de picking y despacho','Las expectativas reales del cliente, los momentos de verdad del Customer Journey y la capacidad operativa real','Los estándares del sector y KPIs de la competencia','Las restricciones del contrato con el transportista'],c:1,exp:'Reescribir la promesa parte de entender qué valora el cliente y contrastar con lo que la operación puede cumplir.'},
  {q:'¿Por qué las exigencias del cliente conectado impactan el diseño de los procesos logísticos internos?',opts:['Porque los clientes participan en el diseño de procesos','Porque las expectativas de velocidad, visibilidad y personalización requieren rediseñar flujos desde la demanda hacia atrás','Porque la regulación exige adaptar procesos al cliente','Porque los clientes comparan precios y esto afecta márgenes'],c:1,exp:'El diseño "demand-back" es el principio central: los procesos internos deben configurarse para cumplir las expectativas del cliente.'},
  {q:'Una empresa mexicana implementa nearshoring. ¿Cuál es el principal beneficio para el cliente conectado?',opts:['Reducción de aranceles','Reducción de lead times y mayor capacidad de respuesta ante variaciones de demanda','Acceso a mano de obra más barata','Eliminación de riesgos de tipo de cambio'],c:1,exp:'El nearshoring acorta distancias y tiempos, permitiendo mayor agilidad para responder a cambios en la demanda.'},
  {q:'¿Cuál es la diferencia entre resiliencia y eficiencia en cadena de suministro?',opts:['La eficiencia maximiza recursos; la resiliencia es sinónimo de redundancia costosa','La eficiencia optimiza el estado actual; la resiliencia asegura absorber disrupciones sin perder nivel de servicio','La resiliencia aplica solo a cadenas globales','Son sinónimos que buscan reducir costos'],c:1,exp:'Una cadena hiperoptimizada puede ser frágil. La resiliencia agrega capacidad de respuesta ante eventos inesperados.'},
  {q:'¿Qué expectativa del cliente conectado es más difícil de cumplir para una distribuidora B2B tradicional en la última milla?',opts:['Precio competitivo de flete','Entrega en ventana horaria acordada con comunicación proactiva en tiempo real','Disponibilidad de producto en almacén','Facturación electrónica'],c:1,exp:'Ventanas de entrega precisas y notificaciones en tiempo real requieren tecnología de rastreo avanzada.'},
  {q:'¿Qué distingue a una cadena "visible" de una simplemente "digitalizada"?',opts:['La visibilidad requiere más inversión','Una cadena visible permite a todos los actores acceder a información en tiempo real; la digitalización puede ser solo interna','La digitalización aplica a procesos administrativos; la visibilidad a físicos','No hay diferencia práctica'],c:1,exp:'La visibilidad comparte información con todos los actores de la cadena, incluyendo el cliente final.'},
  {q:'¿Cómo impacta la sostenibilidad en la cadena al cliente conectado moderno?',opts:['Encarece el producto sin beneficio perceptible','Genera diferenciación y lealtad, ya que el cliente conectado valora el impacto ambiental y social','Solo aplica para segmento premium','Es requisito regulatorio sin impacto en decisión de compra'],c:1,exp:'El cliente conectado incorpora criterios de sostenibilidad en sus decisiones de compra.'},
  {q:'¿Cuál es el principal reto del nearshoring para empresas mexicanas?',opts:['Falta de proveedores locales calificados en todos los sectores y alta inversión inicial','Resistencia de clientes a productos locales','Incompatibilidad de estándares de calidad','Restricciones arancelarias del T-MEC'],c:0,exp:'El nearshoring enfrenta escasez de proveedores especializados y requiere inversión en desarrollo de capacidades locales.'},
  {q:'¿Cuál es la diferencia fundamental entre estrategia multicanal y omnicanal?',opts:['El omnicanal usa más canales','En omnicanal todos los canales están integrados y comparten información para experiencia consistente; en multicanal operan independientes','El multicanal es para B2C y el omnicanal para B2B','El omnicanal requiere eliminar canales físicos'],c:1,exp:'La integración es la clave. El omnicanal garantiza la misma experiencia independientemente del canal.'},
  {q:'Una empresa tiene tiendas físicas, e-commerce y app, pero el inventario no está integrado. ¿Cuál es el impacto?',opts:['El cliente aprovecha diferencias de precio entre canales','El cliente experimenta quiebres en un canal aunque el producto exista en otro, generando frustración','La empresa reduce costos al gestionar inventarios por separado','Solo afecta al canal e-commerce'],c:1,exp:'Sin inventario unificado, el cliente puede encontrar "sin stock" cuando hay disponibilidad en otro canal.'},
  {q:'¿Por qué la personalización por IA es diferenciador crítico en cadenas omnicanal?',opts:['Reduce costos de marketing digital','Permite ofrecer a cada cliente la oferta y experiencia relevantes en el momento y canal correcto, aumentando conversión y lealtad','Elimina la intervención humana en servicio','Es requisito para operar en plataformas de venta en línea'],c:1,exp:'La IA procesa señales de comportamiento en tiempo real para personalizar la experiencia, incrementando relevancia y valor de vida del cliente.'},
  {q:'En contexto B2B, ¿cómo se manifiesta la omnicanalidad diferente al B2C?',opts:['En B2B no aplica la omnicanalidad porque los pedidos siempre son automatizados','Integra portales de autoservicio, ejecutivos de cuenta, y visitas presenciales en experiencia coherente con historial compartido','Se limita a tener un portal web y un equipo de ventas','No requiere omnicanalidad porque los clientes son pocos'],c:1,exp:'El comprador B2B usa múltiples canales y espera que todos compartan su historial, precios y preferencias.'},
  {q:'¿Cuál es el mayor reto operativo para implementar omnicanalidad en una distribuidora con red física?',opts:['Convencer a clientes de usar canales digitales','Unificar inventario, sistemas de información y procesos de cumplimiento para servir desde cualquier nodo de la red','Incrementar SKUs disponibles por canal','Capacitar a la fuerza de ventas en tecnología'],c:1,exp:'El reto central es operativo: unificar inventario y procesos para que cualquier canal pueda prometer y cumplir.'},
  {q:'El 30% de los SKUs genera el 2% de ventas pero el 40% de los costos de gestión. ¿Qué decisión se justifica?',opts:['Incrementar marketing para aumentar su rotación','Racionalización del portafolio: eliminar SKUs de bajo valor que generan complejidad desproporcionada','Reducir precio para ganar volumen','Transferir esos SKUs a un distribuidor externo'],c:1,exp:'La racionalización de SKUs elimina la complejidad que no genera valor al cliente ni rentabilidad para la empresa.'},
  {q:'¿Cuál es el criterio más relevante para decidir qué productos permanecen en el portafolio?',opts:['El margen bruto individual del producto','La combinación de valor percibido por el cliente, rentabilidad estratégica y complejidad operativa','El volumen de ventas histórico','La antigüedad del producto en el catálogo'],c:1,exp:'La decisión de portafolio no es solo financiera: un producto de bajo margen puede ser crítico para retener un cliente clave.'},
  {q:'¿Qué riesgo genera un portafolio excesivamente amplio mal gestionado para el cliente conectado?',opts:['Mayor disponibilidad de opciones que mejora su experiencia','Quiebres frecuentes, tiempos inconsistentes y errores de pedido por exceso de complejidad operativa','Precios más altos por complejidad de gestión','Ninguno, el cliente prefiere más opciones'],c:1,exp:'La complejidad de un portafolio inflado se traslada al cliente en forma de ineficiencias y errores.'},
  {q:'¿Cómo debe una empresa adaptar su portafolio ante cambios en las necesidades del cliente conectado?',opts:['Lanzar nuevos productos cada trimestre','Monitorear señales de demanda, rentabilidad y feedback para hacer ajustes dinámicos','Mantener el portafolio estable para no generar confusión','Copiar el portafolio de los competidores líderes'],c:1,exp:'La gestión dinámica del portafolio requiere revisión continua basada en datos. No es un ejercicio anual.'},
  {q:'¿Cuál es el impacto de racionalizar el portafolio en la cadena de suministro?',opts:['Reduce variedad sin beneficio operativo claro','Simplifica gestión de inventario, mejora fill rate y libera capital para invertir en SKUs estratégicos','Incrementa dependencia de pocos proveedores','Reduce rentabilidad a corto plazo sin beneficio sostenido'],c:1,exp:'Menos SKUs = menos complejidad en compras, almacenamiento y distribución.'},
  {q:'Un cliente debe llamar, enviar correo, esperar confirmación y verificar disponibilidad por separado para hacer un pedido. ¿Cómo se clasifica este problema?',opts:['Problema de capacidad de producción','Alta fricción en el proceso de pedido que destruye valor y aumenta el CES','Problema de pricing','Deficiencia del sistema de gestión de relaciones con clientes'],c:1,exp:'Cada paso adicional incrementa el esfuerzo del cliente y el riesgo de perderlo.'},
  {q:'¿Cuál elemento es más crítico para órdenes sin fricción en B2B?',opts:['Precios más bajos que la competencia','Portal de autoservicio con disponibilidad de inventario en tiempo real, historial de pedidos y confirmación automática','Ejecutivo disponible 24/7','Catálogos físicos actualizados mensualmente'],c:1,exp:'El portal integrado elimina las fricciones del proceso manual y da al cliente B2B la autonomía que espera.'},
  {q:'Una empresa e-commerce tiene 68% de abandono de carrito en el paso de selección de envío. ¿Cuál es la causa raíz más probable?',opts:['Precio del producto demasiado alto','Fricción en el checkout: demasiados pasos o falta de transparencia en costos y tiempos de entrega','Falta de variedad de productos','El cliente no confía en la marca'],c:1,exp:'El abandono en checkout está directamente correlacionado con la fricción del proceso.'},
  {q:'¿Qué papel juegan las devoluciones sin fricción en la fidelización del cliente conectado?',opts:['Son un costo que debe minimizarse limitando políticas de devolución','Una política simple y transparente es factor de compra y generador de confianza que incrementa la recompra','Son irrelevantes si el producto tiene buena calidad','Solo importan para B2C, no para B2B'],c:1,exp:'El cliente conectado evalúa la facilidad de devolución antes de comprar.'},
  {q:'¿Cuál es la relación entre órdenes sin fricción y rentabilidad?',opts:['Siempre incrementan costos operativos sin garantizar mayor rentabilidad','Reducen costos de gestión (re-trabajo, errores, soporte) y aumentan retención, mejorando rentabilidad a largo plazo','La rentabilidad depende exclusivamente del precio','Solo impacta satisfacción, no rentabilidad'],c:1,exp:'Cada error de pedido y llamada de soporte tiene costo. La simplificación reduce estos costos y mejora retención.'},
  {q:'¿Qué capacidad es más habilitadora para lograr un proceso de pedido sin fricción en una distribuidora B2B?',opts:['Un sistema de gestión de relaciones con clientes (CRM)','Integración entre los sistemas del cliente y del proveedor para automatizar la generación y confirmación de pedidos sin intervención manual','Un sistema de gestión de almacén para optimizar el picking','Software de planificación de rutas de transporte'],c:1,exp:'La integración de sistemas elimina la entrada manual de pedidos, automatiza confirmaciones y conecta el inventario del proveedor en tiempo real.'},
  {q:'¿Cuál es la diferencia fundamental entre "servicio al cliente" y "experiencia del cliente"?',opts:['El servicio al cliente es más costoso','El servicio al cliente es reactivo; la experiencia es el resultado de todas las interacciones a lo largo del Customer Journey','La experiencia es responsabilidad de marketing; el servicio de operaciones','Son sinónimos con diferente enfoque departamental'],c:1,exp:'El servicio al cliente es un componente de la experiencia, pero no la totalidad.'},
  {q:'Una empresa tiene NPS de 72 pero CES de 5.8/7 (alto esfuerzo). ¿Qué conclusión se extrae?',opts:['La empresa tiene excelente experiencia en todos los aspectos','Los clientes recomendarían la empresa pero el proceso genera demasiado esfuerzo; hay riesgo latente de abandono','El CES es irrelevante con NPS alto','Los datos son contradictorios; hay error de medición'],c:1,exp:'NPS alto + CES alto = los clientes valoran la marca pero el proceso los desgasta, erosionando lealtad a mediano plazo.'},
  {q:'¿Cuál es el indicador más adecuado para medir calidad de servicio al cliente en cadena B2B?',opts:['Volumen de ventas por cliente','Combinación de OTIF, tasa de resolución en primer contacto y Customer Effort Score (CES)','Número de quejas por mes','Tiempo promedio de atención de llamadas'],c:1,exp:'No existe un único indicador suficiente. La combinación ofrece visión completa del servicio en la cadena.'},
  {q:'Un equipo resuelve el 95% de problemas en primera llamada pero los clientes siguen insatisfechos. ¿Cuál es la causa más probable?',opts:['El equipo no tiene habilidades técnicas adecuadas','Se están resolviendo síntomas sin atacar las causas raíz que generan problemas recurrentes','Los clientes tienen expectativas irracionales','El sistema de registro de casos no funciona correctamente'],c:1,exp:'Alta resolución + insatisfacción persistente = los mismos problemas se repiten. Hay que eliminar causas raíz.'},
  {q:'¿Por qué las métricas de servicio al cliente deben integrarse al tablero de gestión de la cadena?',opts:['Para cumplir con certificaciones de calidad','Porque la voz del cliente señala dónde la cadena falla en generar valor e informa las decisiones operativas','Para justificar el presupuesto del área','Es práctica estándar sin impacto real en decisiones'],c:1,exp:'Las métricas de servicio son el termómetro de la experiencia. Integrarlas cierra el loop entre operación y percepción del cliente.'},
  {q:'¿Cuál es la diferencia clave entre servicio de campo tradicional y conectado?',opts:['El conectado usa técnicos más especializados','El conectado integra IoT, datos en tiempo real y sistemas para anticipar fallas y resolver antes de que impacten al cliente','El conectado opera solo en entornos industriales','La diferencia es solo usar tabletas en lugar de papel'],c:1,exp:'La conectividad transforma el servicio de reactivo a predictivo/proactivo.'},
  {q:'Una empresa implementa mantenimiento predictivo mediante IoT. ¿Cuál es el impacto directo en el cliente?',opts:['Incrementa el costo del servicio','Reduce el tiempo de inactividad al anticipar fallas, mejorando productividad y satisfacción del cliente','Elimina la necesidad de técnicos especializados','Solo beneficia al proveedor, no al cliente'],c:1,exp:'El mantenimiento predictivo cambia la ecuación: en vez de reaccionar ante fallas, el proveedor las anticipa y previene.'},
  {q:'¿Cómo contribuye el principio de "primera visita resuelta" al valor del ciclo de vida del cliente?',opts:['Reduce el costo de la visita para el proveedor','Elimina el costo y la frustración del cliente por visitas repetidas, fortaleciendo confianza y retención','Permite al técnico gestionar más visitas por día','Solo aplica para servicios de garantía'],c:1,exp:'Cada visita no resuelta incrementa el CES y erosiona la confianza. Es KPI crítico para retención y NPS.'},
  {q:'¿Qué habilita directamente una alta tasa de "primera visita resuelta" en servicios de campo?',opts:['GPS para optimización de rutas','Acceso en tiempo real al historial del equipo, diagnóstico remoto previo y gestión dinámica de refacciones','Uniformes y herramientas estandarizadas','Sistema de calificación post-visita'],c:1,exp:'Resolver en la primera visita requiere saber exactamente qué falla antes de llegar y tener la refacción correcta.'},
  {q:'¿Por qué el servicio de campo conectado es diferenciador estratégico en contratos B2B de largo plazo?',opts:['Permite reducir el precio del contrato','Genera datos continuos del equipo del cliente, habilitando mejoras de producto y modelos de servicio predictivos','Elimina la necesidad de renovar contratos anualmente','Reduce el número de técnicos requeridos'],c:1,exp:'Los datos del servicio de campo son un activo estratégico: informan desarrollo de producto y crean barreras de salida.'},
  {q:'¿Cómo integra el servicio de campo conectado todos los elementos del módulo?',opts:['Es simplemente el último eslabón de la cadena de distribución física','Cierra el ciclo de valor: conecta la cadena con la experiencia post-venta, generando visibilidad y datos que alimentan de nuevo el diseño de la oferta y la operación','Es un módulo independiente sin conexión con los temas anteriores','Solo aplica para empresas manufactureras'],c:1,exp:'El servicio de campo conectado integra cliente conectado, omnicanalidad, órdenes sin fricción y métricas en un modelo donde la post-venta genera valor continuo.'}
];

// ── CONFIGURACIÓN POR DÍA ──
const DIAS_CC = [
  {
    dia:1, titulo:'La mejor cadena de suministro centrada en el cliente',
    objetivo:'Distinguir la nueva definición de excelencia en cadena de suministro para identificar los elementos que hoy generan valor al cliente.',
    esPreQuiz:true,
    recursos:{
      video1:{ url:'https://scimexiconet.sharepoint.com/sites/ACADEMIALOGISTICA687/Documentos%20compartidos/Archivos%20generales/../../../../:v:/s/ACADEMIALOGISTICA687/ETq6Mc-2uCVFupURSy3L3EEBiUoe335euNt1E21hUWSUVQ?e=ETcWwp', titulo:'Cliente conectado: cuando el 97% de OTIF no es suficiente', duracion:'8 min', reflexion:'En tu operación actual, ¿cómo defines si un cliente está satisfecho? ¿Qué indicadores monitoras hoy y cuáles podrían estar ocultando insatisfacción real?', claves:['cliente conectado','OTIF','NPS','CES','cadena de valor','brecha','experiencia del cliente','percepcion','insatisfaccion'] },
      lectura1:{ url:'https://icttm.org/case-study-the-supply-chain-success-story-of-amazon/', titulo:'Closing the Delivery Experience Gap: métricas internas vs. perspectiva del cliente', duracion:'12 min', reflexion:'¿Cuál es la diferencia entre medir la entrega desde la perspectiva de tu operación versus desde la perspectiva del cliente? Escribe un ejemplo concreto de tu industria o empresa donde esta diferencia haya generado un problema real.', claves:['metricas internas','perspectiva del cliente','expectativa','promesa','insatisfaccion','insatisfacción','first mile','last mile','brecha'] }
    },
    sim:{ titulo:'¿Eficiente o excelente?', subtitulo:'El diagnóstico que nadie quería ver — Odyssey · Caso 1', contexto:'Odyssey alcanzó OTIF del 97% este trimestre. Sin embargo, el NPS cayó de 68 a 51 puntos. El Director de Operaciones te pide entender por qué la eficiencia interna no garantiza satisfacción del cliente. Datos clave: 67% de quejas por falta de visibilidad · E-commerce: solo 61% entregas en ventana · CES global: 5.4/7.', guia:'¿En qué áreas concretas está fallando Odyssey para un cliente que ya recibió su pedido a tiempo?',
      preguntas:[
        { tipo:'texto', enunciado:'Calcula el volumen semanal en hl que representa cada canal (base 720 hl/sem: Cadena Norte 40%, Distribuidores 35%, E-commerce 25%). ¿Qué canal tiene la mayor brecha entre exigencia y cumplimiento actual?', claves:['288','252','180','ecommerce','e-commerce','cadena norte','visibilidad','brecha'] },
        { tipo:'opciones', enunciado:'¿Cuál es la causa más probable de que el NPS haya caído 17 puntos aunque el OTIF es del 97%?', opciones:['El OTIF cayó en realidad y los datos están mal reportados','El OTIF mide solo si el pedido llegó a tiempo, pero no la visibilidad, comunicación proactiva ni la facilidad del proceso para el cliente','El problema es únicamente en el canal e-commerce','Los clientes de Odyssey tienen expectativas anormalmente altas comparado con el mercado'], correcta:1 },
        { tipo:'texto', enunciado:'Identifica los 2 problemas más críticos que tiene Odyssey hoy según los datos del escenario. Para cada uno: ¿qué indicador lo evidencia y qué impacto tiene en el cliente?', claves:['visibilidad','comunicacion','comunicación','ecommerce','e-commerce','ventana','NPS','CES','queja'] },
        { tipo:'texto', enunciado:'¿Qué acción prioritaria recomendarías a Rodrigo Vidal para los próximos 30 días? Justifica por qué tiene el mayor impacto al menor costo.', claves:['notificacion','notificación','visibilidad','tracking','tiempo real','proactiva','sistema','cliente','impacto'] }
      ]
    }
  },
  {
    dia:2, titulo:'La cadena que ya no funciona',
    objetivo:'Identificar las fuerzas externas que hacen obsoleto el modelo operativo actual y priorizar la transformación con base en datos.',
    repaso:'📌 Día 1 — Odyssey logró 97% OTIF pero su NPS cayó de 68 a 51. La eficiencia interna no garantiza experiencia del cliente. El nuevo estándar se mide desde la perspectiva del cliente, no de la operación.',
    recursos:{
      video1:{ url:'https://scimexiconet.sharepoint.com/sites/ACADEMIALOGISTICA687/Documentos%20compartidos/Archivos%20generales/../../../../:v:/s/ACADEMIALOGISTICA687/IQCp8aeqnaR2QqvFUphllfVTAdOhfx5LlC2wUa4ZIc8kEf8?e=sP7EeA', titulo:'La cadena de suministro del cliente digital: por qué lo que funcionaba ayer no alcanza hoy', duracion:'8 min', reflexion:'Identifica 2 fuerzas externas que estén presionando el modelo de cadena de suministro en tu industria o empresa hoy. Para cada una: ¿qué dato o señal te indica que la presión es real y no solo tendencia?', claves:['transformación digital','canal digital','fuerzas externas','mix de canales','ventana de entrega','visibilidad en tiempo real','modelos obsoletos','omnicanal','ecommerce'] },
      lectura1:{ url:'https://hbr.org/2016/01/the-omnichannel-approach', titulo:'Omnichannel Fulfillment: From Promise to Reality', duracion:'10 min', reflexion:'¿Tu organización tiene capacidades diferenciadas para atender a cada canal con sus propias exigencias de velocidad, visibilidad y variabilidad? ¿Dónde está la mayor brecha entre lo que exige el canal más exigente y lo que puedes entregar hoy?', claves:['omnicanalidad','fulfillment diferenciado','capacidad de respuesta','lead time por canal','promesa de entrega','transformación operativa','canal','velocidad'] }
    },
    sim:{ titulo:'La cadena que ya no funciona', subtitulo:'Fuerzas externas · Odyssey · Caso 2', contexto:'E-commerce de Odyssey creció de 8% a 25% del volumen en 4 años (+33% anual). Solo 34% de pedidos e-com confirmados en <2h; 61% entregados en ventana de 4h. Refresco Ágil (competidor) tiene NPS 74, 98% confirmaciones <2h y costo de atención $5.80/hl vs $12.40/hl de Odyssey.', guia:'¿El modelo operativo actual de Odyssey es sostenible para atender la cadena que viene, o hay que transformarlo de raíz?',
      preguntas:[
        { tipo:'texto', enunciado:'Si la tasa de crecimiento del e-commerce (+33%/año) se mantiene, ¿en cuántos años superará el 50% del volumen total? ¿Qué volumen en hl/semana representaría eso (base 720 hl/sem)?', claves:['3','tres','360','50%','crecimiento','años','hl'] },
        { tipo:'opciones', enunciado:'Refresco Ágil tiene un costo de atención al cliente de $5.80/hl vs. $12.40/hl de Odyssey. ¿Cuál es la causa más probable?', opciones:['Refresco Ágil tiene menos clientes, por lo que el costo unitario es menor naturalmente','Refresco Ágil automatizó la gestión de pedidos y visibilidad, eliminando trabajo manual y re-trabajo','Refresco Ágil utiliza empaques más baratos que reducen el costo logístico','Refresco Ágil subcontrata toda la distribución, transfiriendo el costo al tercero'], correcta:1 },
        { tipo:'texto', enunciado:'Identifica las 3 fuerzas externas principales que hacen obsoleto el modelo de Odyssey. Para cada una: dato del escenario que la evidencia + capacidad que le falta a Odyssey.', claves:['digital','ecommerce','e-commerce','competidor','visibilidad','velocidad','confirmacion','confirmación','transformacion','transformación'] },
        { tipo:'texto', enunciado:'¿El modelo actual de Odyssey es sostenible a 2 años? ¿Qué transformación prioritaria recomendarías iniciar primero y por qué?', claves:['sostenible','transformacion','transformación','visibilidad','notificacion','notificación','prioridad','urgencia','primero'] }
      ]
    }
  },
  {
    dia:3, titulo:'El cliente que Odyssey no conoce',
    objetivo:'Aplicar Customer Journey Mapping para identificar momentos de quiebre y priorizar intervenciones que reducen el esfuerzo del cliente.',
    repaso:'📌 Día 2 — Cinco fuerzas hacen obsoleto el modelo actual: e-commerce (+33%/año), omnicanalidad, trazabilidad exigida, volatilidad y servicio postventa conectado. Refresco Ágil opera a $5.80/hl vs $12.40/hl de Odyssey.',
    recursos:{
      video1:{ url:'#sharepoint-d3', titulo:'Customer Journey Mapping en cadenas B2B: 7 touchpoints, 7 oportunidades', duracion:'8 min', reflexion:'Si tuvieras que mapear el journey de tu cliente más importante desde que coloca un pedido hasta que cierra el ciclo de pago, ¿en qué touchpoint crees que está la mayor fricción? ¿Lo has medido o es una suposición?', claves:['customer journey','touchpoint','momento de la verdad','CES','fricción','friccion','mapeo','esfuerzo del cliente','quiebre','B2B'] },
      lectura1:{ url:'https://hbr.org/2010/07/stop-trying-to-delight-your-customers', titulo:'Stop Trying to Delight Your Customers — Harvard Business Review', duracion:'12 min', reflexion:'El CES propone que reducir el esfuerzo del cliente es más poderoso que intentar "deleitarlo". ¿Estás de acuerdo con esa premisa en el contexto B2B de tu industria? Argumenta con un ejemplo concreto de tu experiencia.', claves:['Customer Effort Score','CES','lealtad','esfuerzo','deleite','retención','retencion','resolución','resolución en primer contacto','automatización','touchpoints'] }
    },
    sim:{ titulo:'El cliente que Odyssey no conoce', subtitulo:'Customer Journey Mapping · Odyssey · Caso 3', contexto:'Taller de mapeo con Cadena Norte reveló 7 touchpoints. CES promedio del journey: 3.27/7. Peor CES: TP3 Notificación de despacho (1.9/7) y TP5 Gestión de discrepancia (1.6/7). Esfuerzo del cliente: 3.1 h/sem = $136,760/año. Discrepancias en entrega: 23%. Errores en factura: 18%.', guia:'¿Dónde están los dos momentos de mayor quiebre en el journey de Cadena Norte y qué debería hacer Odyssey primero?',
      preguntas:[
        { tipo:'texto', enunciado:'Cadena Norte coloca 3 pedidos/semana, 23% con discrepancia, cada discrepancia 68 min, costo-hora $850. ¿Cuánto le cuesta al cliente mensualmente solo el TP5 (gestión de discrepancias)? Muestra el cálculo.', claves:['2660','2,660','12','2.76','68','850','costo','mensual'] },
        { tipo:'opciones', enunciado:'El CES del TP3 (Notificación de despacho) es 1.9/7. ¿Qué intervención tiene mayor impacto inmediato?', opciones:['Contratar un ejecutivo dedicado a Cadena Norte para llamar cuando sale el pedido','Implementar notificación automática por WhatsApp o correo al momento del despacho con número de guía y hora estimada','Reducir el lead time de entrega de 48h a 24h','Crear un portal web donde el cliente consulta el estado de su pedido manualmente'], correcta:1 },
        { tipo:'texto', enunciado:'Identifica los 2 touchpoints con mayor impacto negativo. Para cada uno: (a) por qué es un "momento de quiebre", (b) qué proceso interno de Odyssey lo genera, (c) qué métrica mejoraría.', claves:['TP3','TP5','quiebre','notificacion','notificación','discrepancia','CES','proceso','metrica','métrica'] },
        { tipo:'texto', enunciado:'Si Odyssey solo puede intervenir un touchpoint en 30 días, ¿cuál sería y por qué? Considera impacto en cliente y viabilidad operativa.', claves:['TP3','notificacion','notificación','automatica','automática','viabilidad','impacto','CES','queja','visibilidad'] }
      ]
    }
  },
  {
    dia:4, titulo:'Preparada para lo que viene',
    objetivo:'Evaluar vulnerabilidades de la cadena ante disrupciones de proveedores y diseñar estrategias de resiliencia con criterio costo-riesgo-tiempo.',
    repaso:'📌 Día 3 — El Customer Journey de Cadena Norte tiene 7 touchpoints. Los dos quiebres críticos: TP3 Notificación (CES 1.9/7) y TP5 Discrepancias (CES 1.6/7). Costo del esfuerzo del cliente: $136,760/año. Reducir fricción = retención.',
    recursos:{
      video1:{ url:'#sharepoint-d4', titulo:'Resiliencia operativa: de la cadena eficiente a la cadena robusta', duracion:'8 min', reflexion:'¿Cuántos insumos o proveedores críticos en tu cadena no tienen alternativa hoy? ¿Tienes calculado el costo de una disrupción de 4 semanas en el proveedor más crítico?', claves:['resiliencia de cadena','proveedor único','proveedor unico','nearshoring','dual sourcing','inventario de seguridad','disrupción','disrupcion','tiempo de recuperación','riesgo'] },
      lectura1:{ url:'https://www.mckinsey.com/capabilities/operations/our-insights/supply-chain-resilience', titulo:'Building Supply Chain Resilience After COVID', duracion:'10 min', reflexion:'¿Cuál es el balance correcto entre eficiencia (inventario mínimo, proveedor único de menor costo) y resiliencia (dual sourcing, buffer de seguridad)? ¿Cómo justificarías invertir en resiliencia a un CFO que ve solo el costo incremental?', claves:['gestión de riesgos','costo de disrupción','buffer estratégico','eficiencia vs resiliencia','concentración de riesgo','plan de contingencia','lead time geográfico','nearshoring','dual'] }
    },
    sim:{ titulo:'Preparada para lo que viene', subtitulo:'Resiliencia de cadena · Odyssey · Caso 4', contexto:'Proveedor de tapas de aluminio (Guangdong, 34% costo empaque, lead time 110 días) se interrumpió 6 semanas. Resultado: 3 semanas producción al 40%, pérdida $1,456,888 + riesgo $9.16M en contratos. 3 de 4 insumos críticos con proveedor único importado. Opciones: A=Nearshoring tapas $340k/6 meses/90% reducción riesgo vs B=Buffer inventario $156k/año/60% reducción.', guia:'¿Cuánto le cuesta la vulnerabilidad a Odyssey y cuál estrategia maximiza la protección al menor costo en el menor tiempo?',
      preguntas:[
        { tipo:'texto', enunciado:'La disrupción costó $1,456,888 directo + riesgo de $9.16M en contratos. Si la probabilidad de una nueva disrupción es del 30% anual, ¿cuál es el costo esperado anual del riesgo (costo × probabilidad)? ¿Justifica esto la inversión en Opción A ($340k)?', claves:['436','437','30%','costo esperado','riesgo','justifica','340'] },
        { tipo:'opciones', enunciado:'¿Cuál es la diferencia estratégica fundamental entre aumentar buffer de inventario (B) vs nearshoring de tapas (A)?', opciones:['La Opción A es siempre mejor porque el nearshoring elimina el riesgo en vez de solo postergarlo','La Opción B es preferible porque tiene costo menor y no requiere tiempo de transición','La Opción A elimina la fuente del riesgo (dependencia de proveedor único lejano); la Opción B solo amplía el tiempo para reaccionar','La diferencia es financiera: la Opción B tiene menor ROI a largo plazo'], correcta:2 },
        { tipo:'texto', enunciado:'Si la próxima disrupción fuera el concentrado de saborizante (28% costo, 90 días lead time, proveedor único). ¿Cómo diferiría el impacto vs. la disrupción de tapas? Identifica 2 diferencias específicas en la magnitud.', claves:['28%','saborizante','mayor','impacto','producto','produccion','producción','costo','lead time','diferencia'] },
        { tipo:'texto', enunciado:'Propón la estrategia de resiliencia para los próximos 18 meses: ¿qué primero y por qué? Considera costo, tiempo y criticidad.', claves:['tapas','nearshoring','primero','18','secuencia','criticidad','costo','buffer','dual','concentrado'] }
      ]
    }
  },
  {
    dia:5, titulo:'Vender en todos lados, cumplir en todos lados',
    objetivo:'Cuantificar el costo de canales desintegrados y evaluar modelos de inventario omnicanal que maximicen la disponibilidad al menor costo.',
    repaso:'📌 Día 4 — Una disrupción de proveedor único (tapas de aluminio, Guangdong) costó $1.46M + riesgo de $9.16M en contratos. Costo esperado anual del riesgo: ~$436k. La resiliencia se justifica financieramente antes de que ocurra la próxima crisis.',
    recursos:{
      video1:{ url:'#sharepoint-d5', titulo:'Inventario integrado: la base del fulfillment omnicanal', duracion:'8 min', reflexion:'En una operación con múltiples canales que comparten inventario, ¿cómo se asigna el stock disponible cuando la demanda supera la disponibilidad? ¿Existe una política clara en tu operación o se resuelve caso por caso?', claves:['inventario integrado','visibilidad en tiempo real','asignación por canal','asignacion por canal','quiebre de stock','OMS','priorización','disponibilidad comprometida','omnicanal'] },
      lectura1:{ url:'https://hbr.org/2014/05/when-to-consider-moving-to-unified-commerce', titulo:'Unified Commerce: The Next Step Beyond Omnichannel', duracion:'10 min', reflexion:'¿Qué cambio mínimo en tecnología o proceso permitiría a tu operación evitar que dos canales reclamen el mismo stock simultáneamente? ¿Quién en tu organización sería el dueño de ese proceso?', claves:['unified commerce','reserva de inventario','ATP','available to promise','integración de sistemas','conflicto de canales','visibilidad transversal','canal','inventario'] }
    },
    sim:{ titulo:'Vender en todos lados, cumplir en todos lados', subtitulo:'Inventario omnicanal · Odyssey · Caso 5', contexto:'Lanzamiento e-commerce día 1-30: éxito. Día 31: 340 pedidos pendientes porque el inventario estaba comprometido para Cadena Norte. Tasa de quiebre e-commerce: 11.4% (vs 2.1% Cadena Norte). Pérdida semanal por quiebres e-com: $24,190 = $1,257,880/año. Integración (Opción A): $420k inversión, payback 5.7 meses.', guia:'¿Cuánto le cuesta a Odyssey operar canales desintegrados y qué modelo justifica la inversión?',
      preguntas:[
        { tipo:'texto', enunciado:'El e-commerce tiene 11.4% tasa de quiebre. Si el volumen semanal es 180 hl y el margen perdido es $1,180/hl, ¿cuántos hl se pierden por semana y cuál es la pérdida anual? ¿En cuántos meses se recupera la inversión de $420k?', claves:['20','180','1180','24','1257','420','meses','payback','semana','anual'] },
        { tipo:'opciones', enunciado:'¿Cuál es la diferencia fundamental entre modelo multicanal y omnicanal?', opciones:['Multicanal = varios canales con el mismo precio; omnicanal = canales con diferentes precios','Multicanal = canales con operaciones independientes; omnicanal = inventario, datos y experiencia integrados entre todos los canales','Omnicanal = versión más sofisticada con más SKUs en todos los canales','La diferencia es tecnológica: multicanal usa sistemas distintos y omnicanal usa un solo ERP'], correcta:1 },
        { tipo:'texto', enunciado:'Compara Opción A (integración total) vs. Opción B (buffer segmentado) en: (a) impacto en experiencia e-commerce, (b) flexibilidad si demanda de un canal cae, (c) escalabilidad a 40% e-commerce.', claves:['integracion','integración','buffer','ecommerce','e-commerce','escalabilidad','flexibilidad','experiencia','disponibilidad'] },
        { tipo:'texto', enunciado:'¿Qué modelo recomiendas y en qué plazo? Considera costo, costo de oportunidad de no actuar y dirección estratégica.', claves:['Opcion A','Opción A','integración','integracion','recomiendo','plazo','costo','estrategia','e-commerce'] }
      ]
    }
  },
  {
    dia:6, titulo:'El portafolio que nos cuesta',
    objetivo:'Aplicar análisis Pareto y criterios multicriterio para racionalizar el portafolio de productos y liberar capacidad operativa.',
    repaso:'📌 Día 5 — Canales desintegrados generan 11.4% de quiebres en e-commerce vs 2.1% en Cadena Norte. Pérdida anual: $1.26M. La integración de inventario omnicanal tiene payback de 5.7 meses: el costo de no actuar supera la inversión.',
    recursos:{
      video1:{ url:'#sharepoint-d6', titulo:'El portafolio invisible: cuando más SKUs significa menos rentabilidad', duracion:'8 min', reflexion:'¿Cuántos SKUs de tu portafolio generan el 80% de las ventas? ¿Has calculado el costo operativo de mantener los SKUs que generan el 20% restante de ingresos?', claves:['racionalización de SKUs','racionalizacion de SKUs','Pareto 80/20','cola larga','complejidad de portafolio','margen por SKU','costo de variedad','rentabilidad por producto','SKU','portafolio'] },
      lectura1:{ url:'https://hbr.org/2009/06/killing-your-products-before-th', titulo:'SKU Rationalization: A Step-by-Step Guide', duracion:'12 min', reflexion:'Si tuvieras que tomar la decisión hoy sobre qué criterios usar para eliminar un SKU de tu portafolio, ¿cuáles serían los 3 criterios no negociables? ¿Cómo equilibrarías la perspectiva financiera con la perspectiva del cliente?', claves:['criterios de eliminación','criterios de eliminacion','volumen vs margen','canibalización','SKU de cola','pedido especial','segmentación de portafolio','simplificación operativa','fill rate'] }
    },
    sim:{ titulo:'El portafolio que nos cuesta', subtitulo:'Racionalización de SKUs · Odyssey · Caso 6', contexto:'De 180 SKUs activos, 54 (Tier C, 30%) generan solo 2% de ventas pero consumen 38% de los costos de gestión. Margen neto de Tier C: -$688,800/año. Costo promedio por SKU Tier C: $67,200/año (vs $18,400 Tier A). Fill rate Tier C: 71% (vs 94% resto). Corridas cortas, setup elevado, rotación 0.4x.', guia:'¿Cuánto pierde Odyssey por mantener los 54 SKUs de baja rotación y qué criterio correcto usa para decidir qué hacer con ellos?',
      preguntas:[
        { tipo:'texto', enunciado:'Si se eliminan los 54 SKUs Tier C: (a) ¿Cuánto se ahorra en costos de gestión al año? (b) Si el fill rate promedio general sube de 88% a 94%, ¿cuál es el impacto estimado en quejas por quiebre? Justifica con los datos del caso.', claves:['688','54','67200','ahorro','fill rate','quiebre','impacto','costo'] },
        { tipo:'opciones', enunciado:'¿Cuál afirmación sobre racionalización de portafolio es correcta?', opciones:['Eliminar SKUs siempre reduce ingresos; solo se justifica si costos superan el triple de ingresos','La decisión debe basarse únicamente en contribución de margen; fill rate de otros SKUs no es criterio válido','La racionalización puede aumentar ingreso neto aunque reduzca ventas brutas, liberando capacidad para SKUs de mayor margen','Los SKUs de baja rotación siempre deben convertirse en estacionales antes de eliminarse'], correcta:2 },
        { tipo:'texto', enunciado:'Define los 3 criterios para clasificar un SKU Tier C como: (a) eliminar, (b) reconvertir, (c) mantener como nicho. Para cada criterio, señala qué dato del caso lo sustenta.', claves:['eliminar','reconvertir','nicho','criterio','volumen','margen','cliente','estrategico','estratégico','fill rate','dato'] },
        { tipo:'texto', enunciado:'Si se racionalizan 27 SKUs (50% del Tier C), ¿cuál sería el impacto esperado en costos, fill rate y capacidad? ¿Es suficiente o debería ir más lejos?', claves:['27','50%','costo','fill rate','capacidad','produccion','producción','suficiente','impacto','ahorro'] }
      ]
    }
  },
  {
    dia:7, titulo:'El pedido que nadie quiere hacer',
    objetivo:'Cuantificar el costo de la fricción en el proceso de pedido B2B y diseñar el rediseño de flujo que habilita órdenes sin fricción.',
    repaso:'📌 Día 6 — 54 SKUs Tier C (30% del portafolio) generan solo 2% de ventas y un margen neto de -$688,800/año. Menos SKUs = mejor fill rate (88%→94%), menor costo operativo y mayor foco en lo que realmente vende.',
    recursos:{
      video1:{ url:'#sharepoint-d7', titulo:'La digitalización del proceso comercial B2B: del correo al portal de autoservicio', duracion:'8 min', reflexion:'¿Cuánto tiempo le toma a un cliente B2B hacer un pedido contigo hoy, desde que decide comprar hasta que recibe la confirmación? ¿Has medido ese tiempo desde la perspectiva del cliente o solo desde la tuya?', claves:['portal de autoservicio B2B','digitalización del pedido','tasa de error en pedido','automatización comercial','tiempo de proceso del cliente','re-trabajo','rework','fricción','friccion','portal'] },
      lectura1:{ url:'https://hbr.org/2019/03/the-b2b-elements-of-value', titulo:'B2B Self-Service Portals: What Buyers Actually Want', duracion:'10 min', reflexion:'Hay una diferencia fundamental entre automatizar un proceso malo y rediseñarlo antes de automatizarlo. ¿Puedes pensar en un proceso en tu operación que, si se automatizara sin rediseño previo, generaría los mismos problemas pero más rápido?', claves:['rediseño de proceso','rediseno de proceso','autoservicio digital','experiencia del comprador B2B','eliminación de fricción','confirmación automática','integración ERP','NPS del distribuidor','portal'] }
    },
    sim:{ titulo:'El pedido que nadie quiere hacer', subtitulo:'Órdenes sin fricción · Odyssey · Caso 7', contexto:'Proceso de pedido distribuidores: 6 pasos, 47 minutos activos + 3.8h espera, 42% tasa de error acumulada. Costo de fricción: $1,082,120/año. NPS distribuidores: 44 (el más bajo de los 3 canales). Competidor ofrece portal: proceso toma 8 minutos. 2 distribuidores no renovaron contrato citando el proceso como razón principal.', guia:'¿Cuánto le cuesta a Odyssey el proceso actual y cuál es el ahorro real de rediseñarlo?',
      preguntas:[
        { tipo:'texto', enunciado:'35 distribuidores × 1 pedido/sem × 47 min activos + rework de 42% errores. Si el costo-hora del distribuidor es $450, ¿cuánto cuesta el tiempo activo por semana para todos los distribuidores? (No incluyas el rework, solo el tiempo base de 47 min × 35 dist.).', claves:['35','47','450','12,250','12250','semana','costo','tiempo','distribuidores'] },
        { tipo:'opciones', enunciado:'¿Cuál enfoque de rediseño aplica directamente a este caso?', opciones:['Contratar más ejecutivos para acelerar cada paso sin cambiar la estructura','Mejorar cada paso de forma incremental hasta reducir el tiempo total a menos de 30 minutos','Digitalizar los pasos existentes tal como están para que el distribuidor los haga desde su celular','Eliminar los pasos que generan espera y los sistemas que obligan a reingresar información, rediseñando el flujo desde cero'], correcta:3 },
        { tipo:'texto', enunciado:'De los 6 pasos del proceso actual, identifica los 2 que deberían eliminarse completamente (no optimizarse). Explica por qué la eliminación es posible con un portal integrado y qué capacidad técnica se necesita.', claves:['paso 1','paso 2','eliminar','portal','integrado','disponibilidad','precio','consulta','automatico','automático','tiempo real'] },
        { tipo:'texto', enunciado:'¿Cuál es el argumento de retención de clientes para priorizar este rediseño? Conecta con el NPS de distribuidores (44 pts) y la pérdida de contratos al competidor.', claves:['NPS','44','retencion','retención','contrato','competidor','portal','distribuidor','abandono','prioridad'] }
      ]
    }
  },
  {
    dia:8, titulo:'Medir lo que importa',
    objetivo:'Diseñar un tablero de métricas CX que conecte la voz del cliente con la operación para pasar de servicio reactivo a proactivo.',
    repaso:'📌 Día 7 — El proceso de pedido B2B cuesta $1.08M/año en fricción: 47 min activos, 42% de errores, NPS distribuidores 44 pts. El competidor hace lo mismo en 8 minutos. Dos distribuidores no renovaron contrato por este motivo.',
    recursos:{
      video1:{ url:'#sharepoint-d8', titulo:'Del OTIF al NPS al CLV: métricas que cuentan la historia del cliente', duracion:'8 min', reflexion:'¿Cuáles de las métricas que mide hoy tu operación reflejan la perspectiva del cliente y cuáles reflejan solo eficiencia interna? ¿Hay alguna métrica que deberías estar midiendo y no estás?', claves:['NPS','CES','FCR','tasa de resolución en primer contacto','OTIF','CLV','Customer Lifetime Value','métricas de promesa','tablero de CX','cliente'] },
      lectura1:{ url:'https://hbr.org/2021/01/the-value-of-customer-experience-quantified', titulo:'The Right Metrics for Customer Experience in B2B', duracion:'10 min', reflexion:'Si tuvieras que diseñar un tablero de 3 métricas que te digan cada semana si tu cadena está cumpliendo o rompiendo la promesa al cliente, ¿qué 3 métricas elegirías y por qué? ¿Son leading o lagging indicators?', claves:['leading','lagging','jerarquía de métricas','jerarquia de metricas','métricas accionables','metricas accionables','correlación NPS','frecuencia de medición','causa raíz de insatisfacción','cierre del loop','NPS'] }
    },
    sim:{ titulo:'Medir lo que importa', subtitulo:'Métricas CX · Odyssey · Caso 8', contexto:'9 meses después del diagnóstico: NPS subió de 51 a 58 (objetivo: 70). Notificaciones proactivas: 23%→81%. Portal piloto con 8/35 distribuidores. Pero las mismas 3 quejas persisten: quiebres/faltantes 33.9%, discrepancias de factura 26.6%, falta de visibilidad 13%. Costo del servicio reactivo: $1,260,040/año. FCR faltantes: 48% (el peor). FCR factura: 71%. FCR visibilidad: 97%.', guia:'¿Por qué las mismas quejas persisten a pesar de las mejoras y cómo diseña Odyssey su tablero para ser proactivo?',
      preguntas:[
        { tipo:'texto', enunciado:'Las 3 quejas representan el 73.5% del total. Si el costo anual de servicio reactivo es $1,260,040 y se redujera el 50% de estas quejas, ¿cuánto se ahorraría al año? ¿Qué queja atacarías primero dado el FCR más bajo (faltantes: 48%)?', claves:['451','460','50%','faltante','factura','FCR','ahorro','primero','costo'] },
        { tipo:'opciones', enunciado:'¿Por qué las 3 quejas recurrentes persisten a pesar de las mejoras?', opciones:['Son inevitables en consumo masivo; el objetivo debe ser resolverlas rápido, no eliminarlas','Odyssey no tiene suficiente personal de servicio al cliente','Las mejoras atacaron síntomas (velocidad, notificaciones) sin resolver las causas raíz (conciliación de factura, integración de inventario)','Los clientes no han percibido las mejoras aún; solo hay que esperar más tiempo'], correcta:2 },
        { tipo:'texto', enunciado:'Para cada una de las 3 quejas recurrentes, identifica la causa raíz probable y en cuál caso anterior (Casos 3–7) se trabajó o debería trabajarse la solución.', claves:['faltante','factura','visibilidad','causa raiz','raíz','caso','proceso','integracion','integración','sistema'] },
        { tipo:'texto', enunciado:'Propón los 5 indicadores clave del tablero de servicio al cliente de Odyssey. Para cada uno: (a) qué mide, (b) umbral de alerta, (c) proceso o área conectado.', claves:['NPS','CES','FCR','OTIF','fill rate','umbral','alerta','tablero','proceso','area','área'] }
      ]
    }
  },
  {
    dia:9, titulo:'El técnico que nunca regresa',
    objetivo:'Calcular el ROI del mantenimiento predictivo y construir el argumento estratégico para migrar de modelo reactivo a conectado.',
    repaso:'📌 Día 8 — El NPS subió de 51→58 pero las mismas 3 quejas persisten: quiebres (33.9%), facturas (26.6%), visibilidad (13%). Las intervenciones atacaron síntomas. Las causas raíz —conciliación de factura, integración de inventario— siguen abiertas.',
    recursos:{
      video1:{ url:'#sharepoint-d9', titulo:'Del servicio reactivo al predictivo: el equipo de frío como activo estratégico', duracion:'8 min', reflexion:'¿Cómo se mide hoy la efectividad del servicio postventa en tu empresa? ¿Existe una conexión visible entre la disponibilidad del equipo en el punto de venta y la satisfacción del cliente final?', claves:['mantenimiento predictivo','tiempo de respuesta técnica','disponibilidad de equipo','SLA de servicio','cadena de frío','cadena de frio','servicio postventa','activo estratégico en punto de venta','IoT','reactivo'] },
      lectura1:{ url:'https://hbr.org/2018/09/why-connected-products-open-a-new-path-to-competitive-advantage', titulo:'IoT and Predictive Maintenance in Cold Chain', duracion:'10 min', reflexion:'¿Cuál es el costo invisible de un equipo de frío que falla en el punto de venta? Piensa más allá del costo de la reparación: considera el impacto en la disponibilidad del producto, en la percepción del cliente y en las ventas del canal.', claves:['costo de falla','mantenimiento preventivo','mantenimiento predictivo','IoT en cadena de frío','confiabilidad de equipo','impacto en ventas','tiempo de inactividad','modelo de servicio proactivo','falla'] }
    },
    sim:{ titulo:'El técnico que nunca regresa', subtitulo:'Servicio de campo conectado · Odyssey · Caso 9', contexto:'240 equipos de frío en Cadena Norte ($28.8M activos). Modelo reactivo: 38% fallas/año, FVR 62%, 126 visitas/año. Costo anual reactivo: $379,562. Modelo predictivo IoT: FVR mejora a 94%, fallas bajan a 8%, solo 20 visitas/año. Costo año 1: $560,537. Cuando falla un equipo: -60% ventas del punto de venta = $360/equipo/día de impacto.', guia:'¿Cuánto le cuesta el modelo reactivo a Odyssey y cuál es el ROI real de migrar al predictivo conectado?',
      preguntas:[
        { tipo:'texto', enunciado:'Con modelo reactivo: 91 fallas/año × promedio 3 días sin equipo × $360/día = ¿cuánto se pierde en ventas por inactividad del equipo? ¿Este monto justifica la inversión incremental del modelo predictivo ($560,537 - $379,562 = $180,975 adicional en año 1)?', claves:['91','3','360','98280','98,280','180975','180,975','justifica','ROI','ventas','inactividad'] },
        { tipo:'opciones', enunciado:'¿Por qué es correcto analizar este proyecto como inversión a pesar de aumentar costos operativos?', opciones:['Toda inversión en tecnología es estratégicamente correcta independientemente del ROI','Protege activos de $28.8M y la relación con Cadena Norte (40% del volumen); el costo de perder esa relación supera el incremento operativo','Las regulaciones del sector obligan a migrar a mantenimiento preventivo','El costo preventivo es fijo, haciendo el modelo siempre más eficiente'], correcta:1 },
        { tipo:'texto', enunciado:'La FVR mejora de 62% a 94%. ¿Cuál es el mecanismo operativo que explica esta mejora? Identifica los 3 cambios concretos en el proceso de despacho de técnicos que habilita el sistema IoT.', claves:['IoT','diagnóstico','diagnostico','refaccion','refacción','historial','remoto','anticipar','falla','despacho','técnico','tecnico'] },
        { tipo:'texto', enunciado:'Más allá del ROI financiero, ¿cuál es el argumento de experiencia del cliente para justificar este proyecto ante la dirección? Conecta con el impacto en ventas de Cadena Norte y la posición estratégica de los equipos como diferenciador.', claves:['cliente','Cadena Norte','diferenciador','40%','activo','estratégico','estrategico','confianza','experiencia','ventas','falla'] }
      ]
    }
  },
  // ── DÍA 10 — Caso final de integración ──
  {
    dia:10,
    sim:{ titulo:'El balance final', subtitulo:'Integración del módulo · Odyssey · Caso 10', contexto:'Han pasado 12 meses desde el diagnóstico inicial. Rodrigo Vidal presenta los resultados de transformación a la dirección: NPS pasó de 51→72 (objetivo: 80). Costo de atención: $12.40→$7.20/hl. Quiebres e-commerce: 11.4%→3.1%. Portal distribuidores: 35/35 activos. Costo de fricción total reducido en 68%. El equipo directivo pregunta: ¿cuál fue la intervención de mayor ROI y qué sigue?', guia:'¿Qué intervención tuvo el mayor impacto medible durante el año y cuál debería ser la prioridad de la siguiente fase de transformación?',
      preguntas:[
        { tipo:'texto', enunciado:'Con base en los resultados: NPS +21pts, costo -$5.20/hl, quiebres e-com -8.3pp, portal 100% activo. ¿Cuál de las intervenciones de los 9 meses tuvo el mayor ROI combinado (costo + satisfacción)? Justifica con datos específicos del caso.', claves:['portal','notificacion','notificación','distribuidor','NPS','ROI','costo','quiebre','mayor'] },
        { tipo:'opciones', enunciado:'El NPS llegó a 72 pero la meta es 80. ¿Qué dimensión del journey tiene mayor potencial de mejora dado el avance actual?', opciones:['Velocidad de entrega: reducir de 48h a 24h en todos los canales','Resolución de discrepancias y facturación: generan el 60% de las quejas residuales','Ampliar el portafolio de productos disponibles en e-commerce','Reducir el precio para mejorar la percepción de valor'], correcta:1 },
        { tipo:'texto', enunciado:'El equipo propone dos proyectos para la siguiente fase: (A) Mantenimiento predictivo para los 240 equipos de frío, (B) Integración de conciliación automática de facturas. Con un presupuesto de $400k disponible, ¿cuál priorizas y por qué? Considera ROI, impacto en cliente y reducción de riesgo.', claves:['factura','conciliacion','conciliación','predictivo','IoT','queja','ROI','cliente','impacto','riesgo','prioridad'] },
        { tipo:'texto', enunciado:'¿Qué aprendizaje del módulo cambiaría la forma en que diseñarías una cadena de suministro desde cero? Identifica el principio más importante y un ejemplo concreto de cómo lo aplicarías en tu operación actual.', claves:['cliente','centrada','demand','visibilidad','friccion','fricción','promesa','journey','valor','diseño','aplica'] }
      ]
    }
  }
];

// ── RENDER DÍA ──────────────────────────────────────────────────
function renderDia(n) {
  currentDia = n;
  const d = DIAS_CC[n - 1];
  if (!d) return;

  // Restore tracking from persisted state
  const _rec = (diasEstado[n] && diasEstado[n].recursos) || {};
  diaRecursos = {
    video1:    !!_rec.video1,
    lectura1:  !!_rec.lectura1,
    simulador: d.esPreQuiz ? true : !!(diasEstado[n] && diasEstado[n].simulador),
    quiz:      !!(diasEstado[n] && diasEstado[n].quiz),
    nps:       !!(diasEstado[n] && diasEstado[n].nps)
  };

  // Actualizar breadcrumb y progreso
  const bc = document.getElementById('dia-breadcrumb');
  if (bc) bc.textContent = 'Día ' + n + ': ' + d.titulo;
  const badge = document.getElementById('dia-badge');
  if (badge) badge.textContent = '🔥 En curso — Día ' + n + ' de 9';
  const pct = Math.round((n - 1) * 100 / 9);
  const pctLbl = document.getElementById('dia-pct-label');
  if (pctLbl) pctLbl.textContent = pct + '% completado';
  const fill = document.getElementById('dia-progress-fill');
  if (fill) fill.style.width = pct + '%';

  // Reset botón completar
  const btnComp = document.getElementById('btn-completar-dia');
  if (btnComp) {
    btnComp._desbloqueado = false;
    btnComp.disabled = true;
    btnComp.style.opacity = '0.35';
    btnComp.style.cursor = 'not-allowed';
    btnComp.innerHTML = '<i class="fas fa-lock" style="font-size:12px;"></i> Completa el quiz para continuar';
  }

  // Actualizar sidebar y pts
  renderSidebarDia(n);
  actualizarPtsDisplay(n);

  // Construir contenido del día
  const preLocked = d.esPreQuiz && !diasPreQuizDone[n];
  const quizHecho = !!(diasEstado[n] && diasEstado[n].quiz);
  const simHecho  = !!(diasEstado[n] && diasEstado[n].simulador);
  const quizLabel = d.esPreQuiz
    ? 'Pre-evaluación · 10 preguntas (Diagnóstico Kirkpatrick)'
    : 'Evaluación de la Sesión · 5 preguntas';
  const quizSub = d.esPreQuiz
    ? 'Completa esta evaluación diagnóstica para desbloquear el contenido del módulo'
    : 'Responde correctamente para ganar hasta 5 pts · Tienes 5 minutos';

  // Repaso dinámico (días 2+) — preguntas que fallaste el día anterior
  let htmlRepaso = '';
  if (n > 1) {
    const repasoHecho = !!(diasEstado[n] && diasEstado[n].repaso);
    const prevWrong = wrongQuestionsByDay[n - 1];
    if (repasoHecho) {
      htmlRepaso = `
      <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.25);border-left:3px solid var(--purple);border-radius:10px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">✅</span>
        <div>
          <div style="font-size:10px;color:var(--purple);font-weight:700;letter-spacing:0.08em;">REPASO DEL DÍA ANTERIOR</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">Completado</div>
        </div>
      </div>`;
    } else if (prevWrong === undefined) {
      htmlRepaso = ''; // Quiz del día anterior aún no realizado
    } else if (prevWrong.length === 0) {
      htmlRepaso = `
      <div style="background:rgba(0,255,136,0.05);border:1px solid rgba(0,255,136,0.2);border-left:3px solid #00ff88;border-radius:10px;padding:12px 16px;margin-bottom:18px;">
        <div style="font-size:10px;color:#00ff88;font-weight:700;letter-spacing:0.08em;">REPASO DEL DÍA ANTERIOR</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:4px;">🎉 No tuviste errores el día anterior — ¡Excelente!</div>
      </div>`;
    } else {
      htmlRepaso = `
      <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.3);border-left:3px solid var(--purple);border-radius:10px;padding:16px;margin-bottom:18px;">
        <div style="font-size:10px;color:var(--purple);font-weight:700;letter-spacing:0.08em;margin-bottom:6px;">REPASO DEL DÍA ANTERIOR</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:12px;">${prevWrong.length} pregunta${prevWrong.length > 1 ? 's' : ''} fallada${prevWrong.length > 1 ? 's' : ''} — revisalas antes de continuar (sin puntos)</div>
        <button class="btn" style="width:100%;font-size:13px;padding:10px;background:rgba(117,114,233,0.15);border:1px solid rgba(117,114,233,0.4);color:var(--purple);font-weight:700;" onclick="abrirRepaso(${n})">
          <i class="fas fa-redo"></i> Iniciar Repaso
        </button>
      </div>`;
    }
  }

  const htmlVideo = `
    <!-- Video -->
    <div class="card" style="margin-bottom:20px;">
      <h4 style="color:var(--cyan);margin-bottom:14px;font-size:15px;"><i class="fas fa-video" style="margin-right:8px;"></i>Video del día</h4>
      <div style="position:relative;">
        <div id="check-video1" style="position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:transparent;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;z-index:1;transition:all 0.3s;"></div>
        <div class="video-placeholder" style="margin-bottom:0;height:140px;cursor:pointer;" onclick="abrirRecurso('video1')">
          <div class="play-btn" style="width:44px;height:44px;font-size:16px;">▶</div>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:6px;">${d.recursos.video1.titulo} — ${d.recursos.video1.duracion}</p>
          <p style="font-size:11px;color:rgba(0,216,218,0.6);margin-top:2px;"><i class="fas fa-external-link-alt"></i> Abrir en SharePoint</p>
        </div>
      </div>
      <div id="reflexion-video1" style="display:none;margin-top:10px;">
        <p style="font-size:12px;color:var(--cyan);font-weight:600;margin-bottom:6px;">💬 ¿Cuál fue la idea principal de este recurso?</p>
        <textarea id="txt-video1" rows="3" placeholder="Escribe con tus propias palabras..." style="width:100%;padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#fff;font-size:13px;resize:none;outline:none;font-family:inherit;box-sizing:border-box;"></textarea>
        <button onclick="calificarReflexion('video1')" class="btn btn-sm" style="margin-top:8px;background:rgba(0,216,218,0.1);border:1px solid rgba(0,216,218,0.3);color:var(--cyan);width:100%;">Enviar <i class="fas fa-paper-plane"></i></button>
        <div id="fb-video1" style="margin-top:8px;font-size:12px;min-height:16px;"></div>
      </div>
    </div>`;

  const htmlLectura = `
    <!-- Lectura -->
    <div class="card" style="margin-bottom:20px;">
      <h4 style="margin-bottom:14px;font-size:15px;">📎 Lectura del día</h4>
      <div onclick="abrirRecurso('lectura1')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(255,165,0,0.06);border:1px solid rgba(255,165,0,0.2);border-radius:8px;cursor:pointer;">
        <span style="font-size:13px;color:rgba(255,255,255,0.8);">📄 ${d.recursos.lectura1.titulo}</span>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
          <span style="font-size:11px;color:orange;">${d.recursos.lectura1.duracion} <i class="fas fa-external-link-alt"></i></span>
          <div id="check-lectura1" style="width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,165,0,0.4);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;transition:all 0.3s;"></div>
        </div>
      </div>
      <div id="reflexion-lectura1" style="display:none;margin-top:10px;">
        <p style="font-size:12px;color:orange;font-weight:600;margin-bottom:6px;">💬 ¿Cuál fue la idea principal de este recurso?</p>
        <textarea id="txt-lectura1" rows="3" placeholder="Escribe con tus propias palabras..." style="width:100%;padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,165,0,0.2);border-radius:8px;color:#fff;font-size:13px;resize:none;outline:none;font-family:inherit;box-sizing:border-box;"></textarea>
        <button onclick="calificarReflexion('lectura1')" class="btn btn-sm" style="margin-top:8px;background:rgba(255,165,0,0.08);border:1px solid rgba(255,165,0,0.3);color:orange;width:100%;">Enviar <i class="fas fa-paper-plane"></i></button>
        <div id="fb-lectura1" style="margin-top:8px;font-size:12px;min-height:16px;"></div>
      </div>
    </div>`;

  const htmlSimulador = simHecho ? `
    <!-- Simulador completado -->
    <div class="card" style="border-color:rgba(0,255,136,0.3);margin-bottom:20px;background:rgba(0,255,136,0.04);text-align:center;padding:20px 24px;">
      <div style="font-size:28px;margin-bottom:6px;">✅</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#00ff88;margin-bottom:4px;">SIMULADOR COMPLETADO</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.5);">${d.sim.titulo}</div>
    </div>` : `
    <!-- Simulador -->
    <div class="card" style="border-color:rgba(117,114,233,0.4);margin-bottom:20px;background:rgba(117,114,233,0.04);text-align:center;padding:28px 24px;">
      <div style="font-size:36px;margin-bottom:10px;">🎮</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:var(--purple);margin-bottom:6px;">SIMULADOR DE CASO · ODYSSEY · 8 PTS</div>
      <h4 style="margin-bottom:6px;font-size:17px;">${d.sim.titulo}</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:20px;">${d.sim.subtitulo}</p>
      <button class="btn" style="width:100%;font-size:15px;padding:13px;background:rgba(117,114,233,0.15);border:1px solid rgba(117,114,233,0.5);color:var(--purple);font-weight:700;" onclick="abrirSimuladorCaso(${n})">
        <i class="fas fa-gamepad"></i> Iniciar Simulador
      </button>
    </div>`;

  const htmlQuiz = quizHecho ? `
    <!-- Quiz completado -->
    <div class="card" style="border-color:rgba(0,255,136,0.3);margin-bottom:20px;background:rgba(0,255,136,0.04);text-align:center;padding:20px 24px;">
      <div style="font-size:28px;margin-bottom:6px;">✅</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#00ff88;margin-bottom:4px;">${d.esPreQuiz ? 'PRE-EVALUACIÓN COMPLETADA' : 'QUIZ COMPLETADO'}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.4);">Ya registrado · Solo se puede hacer una vez</div>
    </div>` : `
    <!-- Quiz -->
    <div class="card" style="border-color:rgba(0,216,218,0.3);margin-bottom:20px;text-align:center;padding:28px 24px;">
      <div style="font-size:36px;margin-bottom:10px;">⚡</div>
      <h4 style="color:var(--cyan);font-size:17px;margin-bottom:6px;">${quizLabel}</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:20px;">${quizSub}</p>
      <button class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;" onclick="abrirQuiz()">
        <i class="fas fa-bolt"></i> Iniciar ${d.esPreQuiz ? 'Pre-evaluación' : 'Quiz'}
      </button>
    </div>`;

  const cont = document.getElementById('dia-contenido');
  if (!cont) return;
  cont.innerHTML = `
    ${htmlRepaso}
    <!-- Header -->
    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.35);margin-bottom:4px;">DÍA ${n}</div>
      <h2 style="font-size:22px;font-weight:800;margin-bottom:10px;">${d.titulo}</h2>
      <div style="background:rgba(117,114,233,0.07);border:1px solid rgba(117,114,233,0.2);border-radius:10px;padding:12px 16px;margin-bottom:14px;">
        <div style="font-size:11px;color:var(--purple);font-weight:700;margin-bottom:3px;">OBJETIVO DE APRENDIZAJE</div>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);margin:0;">${d.objetivo}</p>
      </div>
    </div>
    <p style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:20px;">
      ${d.esPreQuiz
        ? `<i class="fas fa-bolt" style="color:var(--cyan);"></i> Pre-evaluación &nbsp;·&nbsp;
           <i class="fas fa-video" style="color:var(--cyan);"></i> 1 video &nbsp;·&nbsp;
           <i class="fas fa-file-alt" style="color:orange;"></i> 1 lectura &nbsp;·&nbsp;
           <i class="fas fa-clock" style="color:rgba(255,255,255,0.4);"></i> ~40 min`
        : `<i class="fas fa-video" style="color:var(--cyan);"></i> 1 video &nbsp;·&nbsp;
           <i class="fas fa-file-alt" style="color:orange;"></i> 1 lectura &nbsp;·&nbsp;
           <i class="fas fa-tasks" style="color:var(--magenta);"></i> Evaluación &nbsp;·&nbsp;
           <i class="fas fa-gamepad" style="color:var(--purple);"></i> Simulador &nbsp;·&nbsp;
           <i class="fas fa-clock" style="color:rgba(255,255,255,0.4);"></i> ~35 min`}
    </p>

    ${preLocked ? `
      ${htmlQuiz}
      <div style="background:rgba(0,216,218,0.05);border:1px solid rgba(0,216,218,0.15);border-radius:12px;padding:16px;margin-bottom:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🔒</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.4);">El resto del contenido se desbloqueará al completar la pre-evaluación</div>
      </div>
      <div style="opacity:0.25;pointer-events:none;filter:blur(1px);">
        ${htmlVideo}${htmlLectura}
      </div>
    ` : `
      ${htmlVideo}${htmlLectura}${htmlQuiz}${d.esPreQuiz ? '' : htmlSimulador}
    `}

    <!-- NPS + Comentarios -->
    <div class="card" style="border-color:rgba(117,114,233,0.3);text-align:center;" id="nps-card">
      <h4 style="margin-bottom:8px;font-size:15px;">¿Qué tan útil fue este día?</h4>
      <p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:16px;">Selecciona para poder avanzar al siguiente día &nbsp;·&nbsp; 1 = Nada útil &nbsp;·&nbsp; 10 = Muy útil</p>
      <div class="nps-scale" id="nps-modulo">
        ${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button class="nps-btn" data-v="${v}" onclick="selectNPS(this,${n})">${v}</button>`).join('')}
      </div>
      <div id="comentarios-section-${n}" style="display:none;margin-top:14px;text-align:left;">
        <textarea id="txt-comentarios-${n}" rows="3" placeholder="Comentarios opcionales sobre el contenido del día..." style="width:100%;padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#fff;font-size:13px;resize:none;outline:none;font-family:inherit;box-sizing:border-box;"></textarea>
      </div>
      <button id="btn-comentarios-${n}" onclick="toggleComentarios(${n})" style="display:none;margin-top:10px;background:rgba(117,114,233,0.1);border:1px solid rgba(117,114,233,0.3);color:var(--purple);border-radius:8px;padding:7px 16px;cursor:pointer;font-size:12px;">💬 Agregar comentario</button>
    </div>
  `;

  // Verificar si ya todo estaba completado (para restaurar estado del botón)
  setTimeout(() => verificarCompletarDia(), 50);
}

// ── SIDEBAR DÍAS ─────────────────────────────────────────────────
// Puntos acumulados en memoria (sesión actual)
let ptsAcumulados = 0;

function saveState() {
  try {
    localStorage.setItem('selfSci_diasEstado', JSON.stringify(diasEstado));
    localStorage.setItem('selfSci_diasPreQuizDone', JSON.stringify(diasPreQuizDone));
    localStorage.setItem('selfSci_ptsAcumulados', ptsAcumulados);
    localStorage.setItem('selfSci_currentDia', currentDia);
    localStorage.setItem('selfSci_wrongQuestions', JSON.stringify(wrongQuestionsByDay));
  } catch(e) {}
}

function loadState() {
  try {
    const de = localStorage.getItem('selfSci_diasEstado');
    if (de) diasEstado = JSON.parse(de);
    const dp = localStorage.getItem('selfSci_diasPreQuizDone');
    if (dp) diasPreQuizDone = JSON.parse(dp);
    const pa = localStorage.getItem('selfSci_ptsAcumulados');
    if (pa) ptsAcumulados = parseInt(pa) || 0;
    const wq = localStorage.getItem('selfSci_wrongQuestions');
    if (wq) wrongQuestionsByDay = JSON.parse(wq);
    const cd = localStorage.getItem('selfSci_currentDia');
    if (cd) currentDia = parseInt(cd) || 1;
  } catch(e) {}
}

function actualizarPtsDisplay(diaNum) {
  const d = (typeof DIAS_CC !== 'undefined') ? DIAS_CC[diaNum - 1] : null;
  let ptsDia = 0;
  const partes = [];

  if (d && d.esPreQuiz) {
    // Día 1: pre-evaluación, sin puntos
    partes.push('<span style="color:rgba(255,255,255,0.4);">Pre-evaluación diagnóstica · sin puntos</span>');
  } else {
    // Quiz/Evaluación de sesión (días 2-9): 5 preguntas × 1 pt
    if (d && !d.esPreQuiz && diaNum < 10) {
      const ptsQuiz = 5;
      ptsDia += ptsQuiz;
      partes.push(`<i class="fas fa-tasks" style="color:var(--magenta);"></i> Evaluación ${ptsQuiz} pts`);
    }
    // Simulador (días 2-10): 4 preguntas × 2 pts máx = 8 pts
    if (d && d.sim) {
      const ptsSim = d.sim.preguntas ? d.sim.preguntas.length * 2 : 8;
      ptsDia += ptsSim;
      partes.push(`<i class="fas fa-gamepad" style="color:var(--purple);"></i> Simulador ${ptsSim} pts`);
    }
    // Evaluación final (día 10): 10 preguntas × 1 pt
    if (diaNum === 10) {
      const ptsEval = 10;
      ptsDia += ptsEval;
      partes.push(`<i class="fas fa-trophy" style="color:#00ff88;"></i> Eval final ${ptsEval} pts`);
    }
  }

  const dispEl = document.getElementById('pts-dia-display');
  const detEl  = document.getElementById('pts-dia-detalle');
  const acumEl = document.getElementById('pts-acumulados-display');
  if (dispEl) dispEl.textContent = '+' + ptsDia + ' pts';
  if (detEl)  detEl.innerHTML = partes.join(' &nbsp;·&nbsp; ');
  if (acumEl) acumEl.textContent = ptsAcumulados + ' pts';
}

function renderSidebarDia(current) {
  const nombres = ['La mejor cadena de suministro','La cadena que ya no funciona','El cliente que Odyssey no conoce','Preparada para lo que viene','Vender en todos lados','El portafolio que nos cuesta','El pedido que nadie quiere hacer','Medir lo que importa','El técnico que nunca regresa'];
  const sb = document.getElementById('dias-sidebar');
  if (!sb) return;
  sb.innerHTML = nombres.map((nombre, i) => {
    const n = i + 1;
    const isActive = n === current;
    const isDone = n < current;
    const isLast = n === 10;
    const dot = isDone
      ? `<div style="width:20px;height:20px;border-radius:50%;background:var(--cyan);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#000;">✓</div>`
      : isActive
        ? `<div style="width:20px;height:20px;border-radius:50%;background:var(--magenta);box-shadow:0 0 8px rgba(248,0,250,0.5);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:white;">${n}</div>`
        : `<div style="width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:9px;color:rgba(255,255,255,0.5);">${n}</div>`;
    const line = n < 9 ? `<div style="width:1px;height:20px;background:rgba(255,255,255,0.08);"></div>` : '';
    const label = isActive
      ? `<div style="padding-top:1px;"><div style="font-size:10px;color:var(--magenta);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1px;">En curso</div><div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.95);">${nombre}</div></div>`
      : isDone
        ? `<div style="padding-top:3px;font-size:12px;color:var(--cyan);">${nombre}</div>`
        : `<div style="padding-top:3px;font-size:12px;color:rgba(255,255,255,0.6);">${nombre}</div>`;
    return `<div style="display:flex;align-items:flex-start;gap:12px;padding:4px 0;${!isActive && !isDone ? 'opacity:0.35;' : ''}">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">${dot}${line}</div>${label}</div>`;
  }).join('') + (() => {
    const isD10Active = current === 10;
    const isD10Done = current > 10;
    const d10Dot = isD10Done
      ? `<div style="width:20px;height:20px;border-radius:50%;background:var(--cyan);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#000;">✓</div>`
      : isD10Active
        ? `<div style="width:20px;height:20px;border-radius:50%;background:#00ff88;box-shadow:0 0 8px rgba(0,255,136,0.5);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:#000;">10</div>`
        : `<div style="width:20px;height:20px;border-radius:50%;border:1px solid rgba(117,114,233,0.4);display:flex;align-items:center;justify-content:center;font-size:8px;color:rgba(117,114,233,0.6);">10</div>`;
    const d10Label = isD10Active
      ? `<div style="padding-top:1px;"><div style="font-size:10px;color:#00ff88;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1px;">En curso</div><div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.95);">Evaluación final</div></div>`
      : `<div style="padding-top:3px;font-size:12px;color:rgba(117,114,233,0.7);font-weight:600;">Evaluación final</div>`;
    return `<div style="display:flex;align-items:flex-start;gap:12px;padding:4px 0;${!isD10Active && !isD10Done ? 'opacity:0.3;' : ''}">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">${d10Dot}</div>${d10Label}</div>`;
  })();
}

// ── SIMULADOR DE CASO ────────────────────────────────────────────
function abrirSimuladorCaso(diaNum) {
  const d = DIAS_CC[diaNum - 1];
  if (!d) return;
  const sim = d.sim;

  const prev = document.getElementById('caso-modal');
  if (prev) prev.remove();

  const modal = document.createElement('div');
  modal.id = 'caso-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(8,10,18,0.97);z-index:9999;overflow-y:auto;';
  modal.innerHTML = `
    <div style="max-width:680px;margin:0 auto;padding:28px 20px 80px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
        <div>
          <span class="badge badge-purple">Connected Customer · Día ${diaNum} · Caso ${diaNum} de 9</span>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">Simulador de caso · Odyssey · hasta 8 pts</div>
        </div>
        <button onclick="cerrarSimuladorCaso()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;">✕</button>
      </div>

      <!-- Sobre Odyssey -->
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;margin-bottom:16px;">
        <div style="font-size:10px;color:rgba(255,255,255,0.35);font-weight:700;letter-spacing:0.08em;margin-bottom:5px;">LA EMPRESA — ODYSSEY</div>
        <p style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0;">Odyssey es una empresa de consumo masivo (bebidas) con operaciones en 3 canales: <strong style="color:rgba(255,255,255,0.7);">Cadena Norte</strong> (40% volumen, 288 hl/sem), <strong style="color:rgba(255,255,255,0.7);">Distribuidores</strong> (35%, 252 hl/sem) y <strong style="color:rgba(255,255,255,0.7);">E-commerce</strong> (25%, 180 hl/sem). Demanda base: 720 hl/sem. A lo largo del módulo resolverás 9 casos de un arco narrativo continuo que parte de un diagnóstico de NPS caído y termina con un modelo de servicio conectado.</p>
      </div>

      <!-- Contexto del caso -->
      <div style="background:rgba(0,216,218,0.06);border:1px solid rgba(0,216,218,0.2);border-radius:12px;padding:16px 18px;margin-bottom:16px;">
        <div style="font-size:11px;color:var(--cyan);font-weight:700;letter-spacing:0.08em;margin-bottom:10px;">📋 ESCENARIO — ${sim.subtitulo.toUpperCase()}</div>
        <p style="font-size:14px;color:rgba(255,255,255,0.85);line-height:1.8;margin:0;">${sim.contexto}</p>
      </div>

      <!-- Pregunta guía -->
      <div style="background:rgba(117,114,233,0.08);border:1px solid rgba(117,114,233,0.3);border-left:3px solid var(--purple);border-radius:10px;padding:14px 16px;margin-bottom:28px;">
        <div style="font-size:10px;color:var(--purple);font-weight:700;letter-spacing:0.08em;margin-bottom:6px;">🎯 PREGUNTA GUÍA DEL CASO</div>
        <p style="font-size:15px;font-weight:700;color:rgba(255,255,255,0.95);margin:0;line-height:1.5;">${sim.guia}</p>
      </div>

      <!-- Preguntas -->
      <div style="font-size:11px;color:rgba(255,255,255,0.3);font-weight:700;letter-spacing:0.08em;margin-bottom:14px;">RESPONDE LAS 4 PREGUNTAS A CONTINUACIÓN</div>
      ${sim.preguntas.map((p, i) => renderPreguntaCaso(p, i, diaNum)).join('')}

      <!-- Botón enviar -->
      <button onclick="simCasoSubmit(${diaNum})" class="btn btn-primary" style="width:100%;font-size:15px;padding:14px;margin-top:8px;">
        <i class="fas fa-paper-plane"></i> Enviar respuestas y autoevaluar
      </button>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function renderPreguntaCaso(p, i, diaNum) {
  const label = ['Análisis numérico', 'Opción múltiple', 'Análisis crítico', 'Decisión y justificación'][i];
  if (p.tipo === 'opciones') {
    return `<div class="card" style="margin-bottom:16px;">
      <div style="font-size:11px;color:var(--magenta);font-weight:700;letter-spacing:0.06em;margin-bottom:8px;">PREGUNTA ${i+1} · ${label.toUpperCase()}</div>
      <p style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:14px;line-height:1.5;">${p.enunciado}</p>
      ${p.opciones.map((op, j) => `
        <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;cursor:pointer;">
          <input type="radio" name="caso-q${i}" value="${j}" style="margin-top:2px;flex-shrink:0;">
          <span style="font-size:13px;color:rgba(255,255,255,0.8);line-height:1.5;">${['A','B','C','D'][j]}) ${op}</span>
        </label>`).join('')}
    </div>`;
  }
  return `<div class="card" style="margin-bottom:16px;">
    <div style="font-size:11px;color:var(--cyan);font-weight:700;letter-spacing:0.06em;margin-bottom:8px;">PREGUNTA ${i+1} · ${label.toUpperCase()}</div>
    <p style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.9);margin-bottom:12px;line-height:1.5;">${p.enunciado}</p>
    <textarea id="caso-txt-${i}" rows="4" placeholder="Escribe tu respuesta aquí..." style="width:100%;padding:10px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:8px;color:#fff;font-size:13px;resize:vertical;outline:none;font-family:inherit;box-sizing:border-box;"></textarea>
  </div>`;
}

function cerrarSimuladorCaso() {
  const modal = document.getElementById('caso-modal');
  if (modal) modal.remove();
  document.body.style.overflow = '';
}

function simCasoSubmit(diaNum) {
  const d = DIAS_CC[diaNum - 1];
  const sim = d.sim;
  const labels = ['Análisis numérico','Opción múltiple','Análisis crítico','Decisión y justificación'];
  const opts = ['A','B','C','D'];

  // Validar que todas las preguntas estén respondidas
  let allAnswered = true;
  sim.preguntas.forEach((p, i) => {
    if (p.tipo === 'opciones') {
      const sel = document.querySelector(`input[name="caso-q${i}"]:checked`);
      if (!sel) allAnswered = false;
    } else {
      const txt = document.getElementById('caso-txt-' + i);
      if (!txt || txt.value.trim().length < 5) allAnswered = false;
    }
  });
  if (!allAnswered) {
    showToast('⚠️ Responde todas las preguntas antes de enviar', 'info');
    return;
  }

  // Auto-calificar todo
  let totalScore = 0;
  const resultados = [];

  sim.preguntas.forEach((p, i) => {
    if (p.tipo === 'opciones') {
      const sel = document.querySelector(`input[name="caso-q${i}"]:checked`);
      const elegidaIdx = sel ? parseInt(sel.value) : -1;
      const correcto = elegidaIdx === p.correcta;
      const pts = correcto ? 2 : 0;
      totalScore += pts;
      resultados.push({ tipo:'opciones', correcto, pts, elegidaIdx, correctaIdx:p.correcta });
    } else {
      const txt = document.getElementById('caso-txt-' + i);
      const respRaw = txt ? txt.value.trim() : '';
      const respNorm = respRaw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const mencionadas = p.claves.filter(c => respNorm.includes(c.normalize('NFD').replace(/[\u0300-\u036f]/g,'')));
      const pts = mencionadas.length >= 4 ? 2 : mencionadas.length >= 2 ? 1 : 0;
      totalScore += pts;
      resultados.push({ tipo:'texto', pts, resp:respRaw, mencionadas, totalClaves:p.claves.length });
    }
  });

  // Mostrar resultados directamente
  const cont = document.querySelector('#caso-modal > div');
  if (!cont) return;

  const ptsColor = totalScore >= 7 ? '#00ff88' : totalScore >= 5 ? 'var(--cyan)' : 'orange';
  const msg = totalScore >= 7 ? 'Dominio experto demostrado 🎯' : totalScore >= 5 ? 'Comprensión sólida 👍' : totalScore >= 3 ? 'Comprensión básica 📚' : 'Refuerzo recomendado 🔄';
  const dots = resultados.map(r => {
    const bg = r.pts >= 2 ? '#00ff88' : r.pts >= 1 ? 'var(--cyan)' : 'var(--magenta)';
    return `<div style="flex:1;height:6px;border-radius:3px;background:${bg}"></div>`;
  }).join('');

  cont.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
      <span class="badge badge-purple">Connected Customer · Día ${diaNum} · Resultado</span>
      <button onclick="cerrarSimuladorCaso();marcarRecurso('simulador');marcarEstadoDia(${diaNum},'simulador');if(${totalScore}>0)showFloatingPoints(${totalScore});" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:16px;">✕</button>
    </div>
    <div style="text-align:center;margin-bottom:24px;">
      <div style="font-size:64px;font-weight:900;color:${ptsColor};line-height:1;">${totalScore}<span style="font-size:28px;color:rgba(255,255,255,0.3);">/8</span></div>
      <div style="font-size:16px;color:rgba(255,255,255,0.6);margin-top:4px;">${msg}</div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:20px;">${dots}</div>

    ${sim.preguntas.map((p, i) => {
      const r = resultados[i];
      const label = labels[i] || ('Pregunta ' + (i+1));
      const ptsBadge = r.pts === 2 ? '✅ 2 PTS' : r.pts === 1 ? '⚡ 1 PT' : '❌ 0 PTS';
      const borderColor = r.pts >= 2 ? 'rgba(0,255,136,0.35)' : r.pts >= 1 ? 'rgba(0,216,218,0.35)' : 'rgba(248,0,250,0.35)';
      const headerColor = r.pts >= 2 ? '#00ff88' : r.pts >= 1 ? 'var(--cyan)' : 'var(--magenta)';
      if (p.tipo === 'opciones') {
        return `<div class="card" style="margin-bottom:12px;border-color:${borderColor};">
          <div style="font-size:11px;color:${headerColor};font-weight:700;letter-spacing:0.06em;margin-bottom:6px;">PREGUNTA ${i+1} · ${label.toUpperCase()} · ${ptsBadge}</div>
          <p style="font-size:13px;font-weight:600;margin-bottom:8px;">${p.enunciado}</p>
          ${r.elegidaIdx >= 0 ? `<div style="font-size:12px;color:${r.correcto?'#00ff88':'var(--magenta)'};margin-bottom:4px;">Tu respuesta: ${opts[r.elegidaIdx]}) ${p.opciones[r.elegidaIdx]}</div>` : ''}
          ${!r.correcto ? `<div style="font-size:12px;color:#00ff88;">✓ Correcta: ${opts[r.correctaIdx]}) ${p.opciones[r.correctaIdx]}</div>` : ''}
        </div>`;
      } else {
        const guia = p.guiaRespuesta || ('Una respuesta completa debe incluir: ' + p.claves.slice(0, 6).join(', ') + '.');
        return `<div class="card" style="margin-bottom:12px;border-color:${borderColor};">
          <div style="font-size:11px;color:${headerColor};font-weight:700;letter-spacing:0.06em;margin-bottom:6px;">PREGUNTA ${i+1} · ${label.toUpperCase()} · ${ptsBadge}</div>
          <p style="font-size:13px;font-weight:600;margin-bottom:8px;">${p.enunciado}</p>
          <div style="background:rgba(255,255,255,0.03);border-left:2px solid rgba(255,255,255,0.1);padding:8px 12px;margin-bottom:8px;border-radius:4px;">
            <div style="font-size:10px;color:rgba(255,255,255,0.3);font-weight:700;margin-bottom:2px;">TU RESPUESTA</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);font-style:italic;">${r.resp.length > 0 ? (r.resp.length > 200 ? r.resp.substring(0,200)+'…' : r.resp) : '(sin respuesta)'}</div>
          </div>
          <div style="background:rgba(0,255,136,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:10px 12px;">
            <div style="font-size:10px;color:#00ff88;font-weight:700;margin-bottom:4px;">RESPUESTA ESPERADA</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.7;">${guia}</div>
          </div>
        </div>`;
      }
    }).join('')}

    <button onclick="cerrarSimuladorCaso();marcarRecurso('simulador');marcarEstadoDia(${diaNum},'simulador');if(${totalScore}>0)showFloatingPoints(${totalScore});" class="btn btn-primary" style="width:100%;font-size:15px;padding:13px;margin-top:8px;">
      <i class="fas fa-check"></i> Cerrar y continuar — +${totalScore} pts
    </button>`;
}


