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
  if (screenId === 'screen-admin-modulos') {
    setTimeout(renderModulosGrid, 80);
  }
  if (screenId === 'screen-admin-permisos') {
    setTimeout(renderPermisosTabla, 80);
  }
  if (screenId === 'screen-admin-empresas') {
    setTimeout(renderEmpresasGrid, 80);
  }
  if (screenId === 'screen-admin-dashboard') {
    setTimeout(renderEmpresasGrid, 80);
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
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);margin-bottom:14px;">
        <span>${rol.area} · ${rol.puntaje.toFixed(2)}</span>
        <span style="color:${color};font-weight:600;">${rol.nivel}</span>
      </div>
      <button onclick="event.stopPropagation();abrirModalRol(${rol.id})"
              style="width:100%;padding:8px;border-radius:9px;border:1.5px solid ${color};background:transparent;
                     color:${color};font-size:12px;font-weight:600;font-family:'Outfit',sans-serif;cursor:pointer;
                     transition:background 0.18s;"
              onmouseover="this.style.background='rgba(0,216,218,0.09)'"
              onmouseout="this.style.background='transparent'">
        Ver ficha completa →
      </button>
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
  if (tabId === 'participantes')  renderTablaParticipantes();
  if (tabId === 'modulos-config') renderModulosConfig();
  if (tabId === 'sesiones-sync')  renderSesionesSync();
  if (tabId === 'calendario')     renderCalendario();
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
  tbody.innerHTML = mockParticipantes.map((p, idx) => {
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
  container.innerHTML = mockSesiones.map((s, idx) => `
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
    fi.type = 'file'; fi.id = '__import-fi'; fi.accept = '.csv,.xlsx';
    fi.style.display = 'none';
    document.body.appendChild(fi);
    fi.addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      showToast(`📤 Procesando: ${f.name}...`, 'info');
      setTimeout(() => {
        showToast(`✅ ${f.name} importado — 8 participantes agregados`, 'success');
        fi.value = '';
        renderTablaParticipantes();
      }, 1200);
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
  const max         = parseInt(document.getElementById('ns-max')?.value) || 40;
  if (!titulo) { showToast('⚠️ El título es requerido', 'error'); return; }
  const fechaDisplay = fechaRaw
    ? new Date(fechaRaw + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Por confirmar';
  mockSesiones.push({ titulo, tipo, fecha: fechaDisplay, hora: hora + ' hrs', duracion: '90 min', facilitador, inscritos: 0, max });
  document.getElementById('form-nueva-sesion').style.display = 'none';
  renderSesionesSync();
  showToast(`✅ Sesión "${titulo}" agregada`, 'success');
}

// ── Crear empresa y navegar a config ──
function crearEmpresaYConfigurar() {
  const nombre    = document.querySelector('#form-nueva-empresa input[placeholder*="Grupo"]')?.value?.trim();
  const industria = document.querySelector('#form-nueva-empresa select')?.value?.trim() || 'Otra';
  if (!nombre) { showToast('⚠️ El nombre de la empresa es requerido', 'error'); return; }
  const iconoMap = { 'Manufactura':'🏭', 'Logística':'🚛', 'Retail':'🛒', 'Salud':'🏥', 'Tecnología':'💻', 'Alimentaria':'🍽️' };
  const icono = iconoMap[industria] || '🏢';
  mockEmpresas.push({ nombre, industria, participantes: 0, icono, activa: true });
  renderEmpresasGrid();
  const h1 = document.querySelector('#screen-admin-empresa-config h1.page-title');
  if (h1) h1.textContent = nombre;
  toggleNewEmpresa();
  navigate('screen-admin-empresa-config');
  showToast(`✅ Empresa "${nombre}" creada — completa la configuración`, 'success');
}

// ── Modal ficha completa de rol ──
function abrirModalRol(rolId) {
  const entry = Object.entries(rolesData).find(([, r]) => r.id === rolId);
  if (!entry) return;
  const [name, rol] = entry;

  const NIVEL_META = {
    'Novice':            { color:'rgba(255,255,255,0.4)', desc:'Sigue instrucciones paso a paso. Requiere supervisión constante.' },
    'Advanced Beginner': { color:'#ffa03c',              desc:'Reconoce situaciones recurrentes con guía de un experto.' },
    'Competent':         { color:'var(--cyan)',           desc:'Toma decisiones con criterio propio. Planea a mediano plazo.' },
    'Proficient':        { color:'var(--purple)',         desc:'Visión sistémica. Adapta la estrategia con agilidad.' },
    'Expert':            { color:'var(--magenta)',        desc:'Opera por intuición. Es referente de excelencia en su campo.' }
  };
  const nivelMeta = NIVEL_META[rol.nivel] || { color:'var(--cyan)', desc:'' };

  const AREA_FULL = {
    T2:'T2 · Distribución', T1:'T1 · Logística Interna',
    Planning:'Supply Chain Planning', COMEX:'Comercio Exterior',
    PPM:'Producción / Mantenimiento', Transformation:'Transformación Organizacional'
  };

  // Use full capability list from rolesExtraData when available, fall back to 8 CAPS
  const extra     = (typeof rolesExtraData !== 'undefined') ? rolesExtraData[name] : null;
  const descFull  = extra?.descFull || rol.descripcion;
  const capsList  = extra?.allCaps  || CAPS.map(c => {
    const d = rol.capabilities[c];
    return d ? { cap:c, puntaje:d.puntaje, nivel:d.nivel } : null;
  }).filter(Boolean);

  const capsHtml = capsList.map(capItem => {
    const { cap, puntaje, nivel } = capItem;
    const pct      = Math.round((Number(puntaje) / 3) * 100);
    const isTag    = rol.tags.some(t => t.toLowerCase().includes(cap.toLowerCase().substring(0, 8)));
    const capColor = isTag ? 'var(--cyan)' : 'var(--purple)';
    const tagBadge = isTag
      ? `<span style="font-size:9px;background:rgba(0,216,218,0.12);border:1px solid rgba(0,216,218,0.3);
                      color:var(--cyan);border-radius:20px;padding:1px 7px;margin-left:6px;">Top cap</span>`
      : '';
    return `
      <div style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
          <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85);">${cap}${tagBadge}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:11px;color:${capColor};font-weight:700;">${nivel}</span>
            <span style="font-size:11px;color:rgba(255,255,255,0.3);">${Number(puntaje).toFixed(2)}</span>
          </div>
        </div>
        <div style="height:6px;border-radius:3px;background:rgba(255,255,255,0.07);overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${capColor},rgba(117,114,233,0.6));border-radius:3px;transition:width 0.4s;"></div>
        </div>
      </div>`;
  }).join('');

  let modal = document.getElementById('modal-rol-ficha');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-rol-ficha';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;';
    modal.innerHTML = `
      <div id="modal-rol-ficha-backdrop" onclick="cerrarModalRol()"
           style="position:absolute;inset:0;background:rgba(0,0,0,0.72);backdrop-filter:blur(4px);"></div>
      <div id="modal-rol-ficha-content"
           style="position:relative;z-index:1;width:100%;max-width:560px;max-height:88vh;overflow-y:auto;
                  background:var(--bg-card,#141428);border:1px solid rgba(255,255,255,0.1);
                  border-radius:20px;padding:0;box-shadow:0 32px 80px rgba(0,0,0,0.6);">
      </div>`;
    document.body.appendChild(modal);
  }

  document.getElementById('modal-rol-ficha-content').innerHTML = `
    <!-- Header -->
    <div style="padding:24px 24px 20px;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;">
      <button onclick="cerrarModalRol()"
              style="position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;
                     border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);
                     color:rgba(255,255,255,0.6);font-size:16px;cursor:pointer;display:flex;
                     align-items:center;justify-content:center;font-family:'Outfit',sans-serif;
                     line-height:1;transition:background 0.15s;"
              onmouseover="this.style.background='rgba(255,255,255,0.12)'"
              onmouseout="this.style.background='rgba(255,255,255,0.06)'">✕</button>
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:56px;height:56px;border-radius:14px;background:rgba(0,216,218,0.08);
                    border:1px solid rgba(0,216,218,0.2);display:flex;align-items:center;
                    justify-content:center;font-size:28px;flex-shrink:0;">${rol.icono}</div>
        <div>
          <h2 style="font-size:18px;font-weight:800;color:${rol.color};margin:0 0 4px;">${name}</h2>
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            <span style="font-size:11px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
                         border-radius:20px;padding:2px 10px;color:rgba(255,255,255,0.5);">
              ${AREA_FULL[rol.area] || rol.area}
            </span>
            <span style="font-size:11px;background:rgba(0,0,0,0.2);border:1px solid ${nivelMeta.color};
                         border-radius:20px;padding:2px 10px;color:${nivelMeta.color};font-weight:600;">
              ${rol.nivel}
            </span>
            <span style="font-size:11px;color:rgba(255,255,255,0.3);">Puntaje Dreyfus: ${rol.puntaje.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:22px 24px 28px;">

      <!-- Objetivo general -->
      <div style="margin-bottom:22px;">
        <h4 style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;
                   letter-spacing:0.08em;margin:0 0 8px;">Objetivo general</h4>
        <p style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.65;margin:0;">${descFull}</p>
      </div>

      <!-- Nivel de dominio esperado -->
      <div style="margin-bottom:22px;padding:14px 16px;border-radius:12px;
                  background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);">
        <h4 style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;
                   letter-spacing:0.08em;margin:0 0 6px;">Nivel de dominio esperado</h4>
        <div style="display:flex;align-items:baseline;gap:10px;">
          <span style="font-size:16px;font-weight:800;color:${nivelMeta.color};">${rol.nivel}</span>
          <span style="font-size:12px;color:rgba(255,255,255,0.5);">${nivelMeta.desc}</span>
        </div>
      </div>

      <!-- Capabilities -->
      <div>
        <h4 style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.35);text-transform:uppercase;
                   letter-spacing:0.08em;margin:0 0 14px;">Capabilities evaluadas</h4>
        ${capsHtml}
      </div>

      <!-- CTA -->
      <button onclick="cerrarModalRol();selectRol(${rol.id})"
              style="margin-top:20px;width:100%;padding:13px;border-radius:12px;
                     border:none;background:linear-gradient(135deg,${rol.color},var(--purple));
                     color:#fff;font-size:14px;font-weight:700;font-family:'Outfit',sans-serif;
                     cursor:pointer;letter-spacing:0.02em;">
        Seleccionar este rol y continuar →
      </button>
    </div>`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModalRol() {
  const modal = document.getElementById('modal-rol-ficha');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
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

// ── Mock empresas ──
const mockEmpresas = [
  { nombre:'Manufactura Avanzada S.A.', industria:'Manufactura', participantes:48, icono:'🏭', activa:true },
  { nombre:'Grupo Salud Integral',      industria:'Salud',        participantes:32, icono:'🏥', activa:true },
  { nombre:'Retail Express MX',         industria:'Retail',       participantes:15, icono:'🛒', activa:false },
];

// ── Render grid de empresas ──
function renderEmpresasGrid() {
  const container = document.getElementById('empresas-grid');
  if (!container) return;
  if (mockEmpresas.length === 0) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.4);grid-column:1/-1;text-align:center;padding:40px 0;">Sin empresas registradas. Haz clic en "+ Nueva empresa" para agregar una.</p>';
    return;
  }
  container.innerHTML = mockEmpresas.map((e, idx) => `
    <div class="card" style="border-color:rgba(0,216,218,0.15);padding:22px;">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(0,216,218,0.09);border:1px solid rgba(0,216,218,0.2);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">${e.icono}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">${e.industria}</div>
        </div>
        <span style="background:${e.activa ? 'rgba(0,255,136,0.12)' : 'rgba(255,160,60,0.12)'};color:${e.activa ? '#00ff88' : '#ffa03c'};border:1px solid ${e.activa ? 'rgba(0,255,136,0.3)' : 'rgba(255,160,60,0.3)'};border-radius:20px;padding:3px 10px;font-size:11px;font-weight:600;white-space:nowrap;">${e.activa ? 'Activa' : 'Inactiva'}</span>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:18px;">
        <div style="text-align:center;flex:1;background:rgba(255,255,255,0.04);border-radius:10px;padding:10px 6px;">
          <div style="font-size:20px;font-weight:700;color:var(--cyan);">${e.participantes}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;">Participantes</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="navigate('screen-admin-empresa-config')">
          <i class="fas fa-cog"></i> Configurar
        </button>
        <button class="btn btn-secondary btn-sm" onclick="toggleActivaEmpresa(${idx})" title="${e.activa ? 'Desactivar' : 'Activar'}">
          <i class="fas fa-${e.activa ? 'pause' : 'play'}"></i>
        </button>
        <button class="btn btn-secondary btn-sm" style="color:#ff6b6b;" onclick="eliminarEmpresa(${idx})" title="Eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function toggleActivaEmpresa(idx) {
  mockEmpresas[idx].activa = !mockEmpresas[idx].activa;
  renderEmpresasGrid();
  showToast(mockEmpresas[idx].activa ? '✅ Empresa activada' : '⏸️ Empresa desactivada', 'info');
}

function eliminarEmpresa(idx) {
  if (!confirm(`¿Eliminar "${mockEmpresas[idx]?.nombre}"? Esta acción no se puede deshacer.`)) return;
  mockEmpresas.splice(idx, 1);
  renderEmpresasGrid();
  showToast('🗑️ Empresa eliminada', 'info');
}

// ── Guardar nuevo participante ──
function guardarNuevoParticipante() {
  const nombre   = document.getElementById('nu-nombre')?.value?.trim();
  const correo   = document.getElementById('nu-correo')?.value?.trim();
  const password = document.getElementById('nu-password')?.value?.trim();
  const rol      = document.getElementById('nu-rol')?.value;
  const area     = document.getElementById('nu-area')?.value?.trim();
  if (!nombre || !correo) {
    showToast('⚠️ Nombre y correo son requeridos', 'error');
    return;
  }
  mockParticipantes.push({ nombre, correo, rol: rol || 'Participante', avance: 0, estado: 'Activo' });
  renderTablaParticipantes();
  // Clear inputs
  ['nu-nombre','nu-correo','nu-password','nu-area'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  // Hide form
  const form = document.getElementById('form-nuevo-usuario');
  if (form) form.style.display = 'none';
  showToast(`✅ Participante "${nombre}" agregado`, 'success');
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

function getModuleCalEvents() {
  return mockModulosConfig
    .filter(m => m.activo)
    .map(m => {
      const match = m.semana.match(/Semana (\d+)/);
      if (!match) return null;
      const weekNum = parseInt(match[1]);
      const date = new Date(PROGRAM_START);
      date.setDate(date.getDate() + (weekNum - 1) * 7);
      return { date, label: m.icono + ' ' + m.nombre, type: 'modulo' };
    })
    .filter(Boolean);
}

function getSessionCalEvents() {
  return mockSesiones.map(s => {
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
    modEvents.forEach(e => {
      if (e.date.getFullYear()===year && e.date.getMonth()===month && e.date.getDate()===d)
        events.push({ label: e.label, color:'var(--cyan)', bg:'rgba(0,216,218,0.15)' });
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
        const evHtml = eventsForDay(day).map(e =>
          `<div style="margin-top:4px;padding:3px 6px;background:${e.bg};border-left:2px solid ${e.color};border-radius:4px;font-size:11px;color:${e.color};line-height:1.3;">${e.label}</div>`
        ).join('');
        return `<div style="padding:10px;min-height:80px;${borderR}${borderB}">
          <div style="font-size:13px;color:${isWeekend?'rgba(255,255,255,0.25)':'inherit'};">${day}</div>
          ${evHtml}
        </div>`;
      }).join('')}
    </div>`;

  grid.innerHTML = `<div class="card" style="padding:0;overflow:hidden;">${headerHtml}${bodyHtml}</div>`;
}

function calendarPrev() {
  calState.month--;
  if (calState.month < 0) { calState.month = 11; calState.year--; }
  renderCalendario();
}

function calendarNext() {
  calState.month++;
  if (calState.month > 11) { calState.month = 0; calState.year++; }
  renderCalendario();
}
