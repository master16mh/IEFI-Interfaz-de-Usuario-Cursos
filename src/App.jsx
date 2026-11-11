import { Fragment, useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  LayoutDashboard, BookOpen, Users, UserPlus, Search, Bell, ChevronDown,
  ChevronRight, Clock3, Video, MapPin, Check, Plus, SlidersHorizontal,
  ArrowUpRight, GraduationCap, CalendarDays, X, Menu, Sparkles, CircleHelp,
  Mail, BadgeCheck, Settings, UserRound, Camera, Trash2
} from 'lucide-react';

const initialCourses = [
  { id: 'ux', title: 'Diseño UX/UI desde cero', category: 'Diseño', color: 'lavender', icon: '✳', description: 'Aprendé a diseñar experiencias digitales útiles y atractivas. Desde la investigación con usuarios hasta un prototipo navegable en Figma.', instructor: 'Camila Fernández', initials: 'CF', duration: '8 semanas', schedule: 'Mar y jue · 18:30', modality: 'En vivo online', capacity: 24, image: '✳', students: [['Lucía', 'Pérez', 23, '42.315.678', 'lucia.perez@email.com'], ['Mateo', 'Gómez', 28, '39.824.156', 'mateo.gomez@email.com'], ['Sofía', 'Romero', 21, '44.107.935', 'sofia.romero@email.com'], ['Tomás', 'Díaz', 26, '40.552.817', 'tomas.diaz@email.com'], ['Valentina', 'López', 24, '41.693.402', 'valentina.lopez@email.com'], ['Joaquín', 'Silva', 30, '36.984.221', 'joaquin.silva@email.com'], ['Martina', 'Torres', 22, '43.215.604', 'martina.torres@email.com'], ['Benjamín', 'Castro', 27, '38.762.915', 'benjamin.castro@email.com'], ['Emma', 'Ruiz', 25, '40.316.847', 'emma.ruiz@email.com'], ['Thiago', 'Méndez', 29, '37.948.263', 'thiago.mendez@email.com'], ['Olivia', 'Acosta', 20, '45.023.781', 'olivia.acosta@email.com'], ['Franco', 'Herrera', 32, '34.657.129', 'franco.herrera@email.com'], ['Renata', 'Suárez', 23, '42.867.315', 'renata.suarez@email.com'], ['Lautaro', 'Ortiz', 26, '39.574.208', 'lautaro.ortiz@email.com'], ['Pilar', 'Medina', 24, '41.735.692', 'pilar.medina@email.com'], ['Dante', 'Vega', 28, '38.291.463', 'dante.vega@email.com'], ['Abril', 'Navarro', 21, '44.682.037', 'abril.navarro@email.com'], ['Nicolás', 'Rojas', 31, '35.930.174', 'nicolas.rojas@email.com'], ['Clara', 'Ibarra', 25, '40.837.526', 'clara.ibarra@email.com'], ['Santiago', 'Peralta', 27, '39.162.845', 'santiago.peralta@email.com']] },
  { id: 'react', title: 'Desarrollo web con React', category: 'Tecnología', color: 'mint', icon: '⌘', description: 'Construí aplicaciones web modernas desde la base. Componentes, estado, hooks y conexión con APIs en proyectos prácticos.', instructor: 'Nicolás Aguirre', initials: 'NA', duration: '10 semanas', schedule: 'Lun y mié · 19:00', modality: 'En vivo online', capacity: 20, image: '⌘', students: [['Martín', 'García', 25, '40.234.567', 'martin.garcia@email.com'], ['Julieta', 'Fernández', 23, '42.897.654', 'julieta.fernandez@email.com'], ['Facundo', 'Paz', 29, '37.453.219', 'facundo.paz@email.com'], ['Mía', 'Vázquez', 22, '44.561.089', 'mia.vazquez@email.com'], ['Agustín', 'Benítez', 27, '39.128.743', 'agustin.benitez@email.com'], ['Catalina', 'Molina', 24, '41.756.023', 'catalina.molina@email.com'], ['Pedro', 'Álvarez', 31, '35.876.412', 'pedro.alvarez@email.com'], ['Josefina', 'Cabrera', 26, '40.934.218', 'josefina.cabrera@email.com'], ['Ramiro', 'Luna', 28, '38.452.761', 'ramiro.luna@email.com'], ['Ana', 'Suárez', 21, '45.124.378', 'ana.suarez@email.com'], ['Simón', 'Flores', 30, '36.751.094', 'simon.flores@email.com'], ['Bautista', 'Gil', 26, '40.328.659', 'bautista.gil@email.com'], ['Zoe', 'Correa', 24, '42.673.915', 'zoe.correa@email.com'], ['Máximo', 'Funes', 32, '34.872.105', 'maximo.funes@email.com'], ['Lola', 'Domínguez', 22, '44.052.736', 'lola.dominguez@email.com'], ['Pablo', 'Ledesma', 29, '37.645.891', 'pablo.ledesma@email.com'], ['Alma', 'Sosa', 23, '43.527.184', 'alma.sosa@email.com'], ['Bruno', 'Morales', 27, '39.846.203', 'bruno.morales@email.com'], ['Elena', 'Quiroga', 25, '41.298.570', 'elena.quiroga@email.com'], ['León', 'Cáceres', 28, '38.739.412', 'leon.caceres@email.com']] },
  { id: 'marketing', title: 'Marketing digital y redes', category: 'Marketing', color: 'peach', icon: '↗', description: 'Planeá estrategias de contenido, anuncios y medición para hacer crecer marcas en el mundo digital.', instructor: 'Paula Méndez', initials: 'PM', duration: '6 semanas', schedule: 'Mar y jue · 19:00', modality: 'En vivo online', capacity: 22, image: '↗', students: [['Carolina', 'Varela', 26, '40.561.892', 'carolina.varela@email.com'], ['Diego', 'Alonso', 32, '34.827.615', 'diego.alonso@email.com'], ['Malena', 'Ponce', 24, '42.371.056', 'malena.ponce@email.com'], ['Ezequiel', 'Sánchez', 28, '38.694.132', 'ezequiel.sanchez@email.com'], ['Bianca', 'Arias', 21, '44.185.367', 'bianca.arias@email.com'], ['Gabriel', 'Bravo', 30, '36.742.891', 'gabriel.bravo@email.com'], ['Florencia', 'Ramos', 25, '41.834.206', 'florencia.ramos@email.com'], ['Alan', 'Cruz', 27, '39.207.543', 'alan.cruz@email.com'], ['Candela', 'Paredes', 23, '43.659.120', 'candela.paredes@email.com'], ['Federico', 'Márquez', 34, '32.984.751', 'federico.marquez@email.com'], ['Lara', 'Franco', 22, '44.876.391', 'lara.franco@email.com'], ['Iván', 'Duarte', 29, '37.521.608', 'ivan.duarte@email.com'], ['Violeta', 'Rivas', 26, '40.763.528', 'violeta.rivas@email.com'], ['Julián', 'Ocampo', 31, '35.419.872', 'julian.ocampo@email.com'], ['Delfina', 'Acuña', 24, '42.037.594', 'delfina.acuna@email.com'], ['Emilio', 'Pereyra', 28, '38.917.246', 'emilio.pereyra@email.com'], ['Aitana', 'Carrizo', 20, '45.381.729', 'aitana.carrizo@email.com'], ['Lisandro', 'Bustos', 33, '33.658.417', 'lisandro.bustos@email.com'], ['Mora', 'Giménez', 25, '41.058.632', 'mora.gimenez@email.com'], ['Nahuel', 'López', 27, '39.631.074', 'nahuel.lopez@email.com'], ['Celeste', 'Ramírez', 22, '44.297.863', 'celeste.ramirez@email.com'], ['Santino', 'Ruiz', 30, '36.185.429', 'santino.ruiz@email.com']] },
  { id: 'excel', title: 'Excel para análisis de datos', category: 'Negocios', color: 'sky', icon: '▦', description: 'Dominá fórmulas, tablas dinámicas y dashboards para transformar datos en decisiones claras.', instructor: 'Diego Ramírez', initials: 'DR', duration: '5 semanas', schedule: 'Sábados · 10:00', modality: 'Presencial · Palermo', capacity: 16, image: '▦', students: [['Lorenzo', 'Molina', 29, '37.519.628', 'lorenzo.molina@email.com'], ['Ariana', 'Paz', 24, '42.635.089', 'ariana.paz@email.com'], ['Juan', 'Acosta', 35, '31.763.452', 'juan.acosta@email.com'], ['Melina', 'Costa', 27, '39.657.183', 'melina.costa@email.com'], ['Santiago', 'Ferrer', 33, '33.428.961', 'santiago.ferrer@email.com'], ['Agostina', 'Luna', 21, '44.723.165', 'agostina.luna@email.com'], ['Ramón', 'Díaz', 38, '29.836.517', 'ramon.diaz@email.com'], ['Clara', 'Méndez', 26, '40.278.934', 'clara.mendez@email.com'], ['Luca', 'Ríos', 23, '43.916.280', 'luca.rios@email.com'], ['Nerea', 'Vargas', 31, '35.927.641', 'nerea.vargas@email.com'], ['Franco', 'Cabrera', 28, '38.472.096', 'franco.cabrera@email.com'], ['Luz', 'Sánchez', 25, '41.562.807', 'luz.sanchez@email.com'], ['Marcos', 'Benítez', 34, '32.869.145', 'marcos.benitez@email.com'], ['Roma', 'Ibarra', 22, '44.316.978', 'roma.ibarra@email.com'], ['Esteban', 'Castro', 40, '27.634.819', 'esteban.castro@email.com'], ['Olivia', 'Vega', 24, '42.158.603', 'olivia.vega@email.com']] },
  { id: 'python', title: 'Python para principiantes', category: 'Tecnología', color: 'lemon', icon: '⌘', description: 'Empezá a programar paso a paso con Python y creá tus primeros proyectos automatizados.', instructor: 'Valentina Ortiz', initials: 'VO', duration: '8 semanas', schedule: 'Lun y mié · 18:00', modality: 'En vivo online', capacity: 18, image: '⌘', students: [['Milo', 'Romero', 20, '45.062.871', 'milo.romero@email.com'], ['Ana', 'Paz', 26, '40.681.354', 'ana.paz@email.com'], ['Pedro', 'Rivas', 31, '35.812.963', 'pedro.rivas@email.com'], ['Martina', 'Silva', 23, '43.259.710', 'martina.silva@email.com'], ['Joaquín', 'Franco', 28, '38.472.165', 'joaquin.franco@email.com'], ['Sofía', 'Alonso', 21, '44.138.526', 'sofia.alonso@email.com'], ['Thiago', 'Medina', 25, '41.652.893', 'thiago.medina@email.com'], ['Emma', 'Cruz', 19, '45.732.061', 'emma.cruz@email.com'], ['Nicolás', 'Rojas', 32, '34.918.254', 'nicolas.rojas@email.com'], ['Lola', 'Sosa', 24, '42.369.518', 'lola.sosa@email.com'], ['Benjamín', 'Vega', 27, '39.482.637', 'benjamin.vega@email.com'], ['Abril', 'Torres', 22, '44.769.031', 'abril.torres@email.com'], ['Dante', 'Gómez', 30, '36.215.847', 'dante.gomez@email.com'], ['Olivia', 'Herrera', 21, '44.982.316', 'olivia.herrera@email.com'], ['Ramiro', 'Pérez', 29, '37.581.624', 'ramiro.perez@email.com'], ['Pilar', 'Díaz', 26, '40.125.739', 'pilar.diaz@email.com'], ['Lautaro', 'Ruiz', 33, '33.761.408', 'lautaro.ruiz@email.com'], ['Renata', 'Méndez', 23, '43.842.597', 'renata.mendez@email.com']] },
  { id: 'fotografia', title: 'Fotografía y edición creativa', category: 'Diseño', color: 'rose', icon: '◉', description: 'Explorá la luz, el encuadre y el color para contar historias con imágenes que conectan.', instructor: 'Lucía Navarro', initials: 'LN', duration: '6 semanas', schedule: 'Jue · 17:30', modality: 'Presencial · Belgrano', capacity: 14, students: [['Felipe', 'Martín', 27, '39.042.816', 'felipe.martin@email.com'], ['Mora', 'Duarte', 22, '44.716.309', 'mora.duarte@email.com'], ['Tomás', 'Varela', 30, '36.875.421', 'tomas.varela@email.com'], ['Cata', 'Funes', 24, '42.896.157', 'cata.funes@email.com'], ['Emilio', 'Sosa', 34, '32.417.689', 'emilio.sosa@email.com'], ['Lara', 'Correa', 23, '43.128.574', 'lara.correa@email.com'], ['Iván', 'Molina', 29, '37.621.903', 'ivan.molina@email.com'], ['Celeste', 'Ortiz', 26, '40.574.138', 'celeste.ortiz@email.com'], ['Bruno', 'Paredes', 31, '35.693.280', 'bruno.paredes@email.com'], ['Aitana', 'Arias', 21, '44.931.756', 'aitana.arias@email.com'], ['Nahuel', 'Vázquez', 28, '38.716.542', 'nahuel.vazquez@email.com'], ['Elena', 'Cáceres', 25, '41.307.894', 'elena.caceres@email.com'], ['Bautista', 'Acosta', 33, '33.985.216', 'bautista.acosta@email.com'], ['Delfina', 'Gil', 20, '45.271.683', 'delfina.gil@email.com']] },
  { id: 'finanzas', title: 'Finanzas personales', category: 'Negocios', color: 'mint', icon: '$', description: 'Ordená tus finanzas, armá un presupuesto y empezá a invertir con información y confianza.', instructor: 'Martín Ceballos', initials: 'MC', duration: '4 semanas', schedule: 'Sábados · 11:00', modality: 'En vivo online', capacity: 20, students: [['Lucía', 'Acosta', 25, '41.827.365', 'lucia.acosta@email.com'], ['Gabriel', 'Vega', 33, '33.756.418', 'gabriel.vega@email.com'], ['Malena', 'Cruz', 22, '44.092.637', 'malena.cruz@email.com'], ['Alan', 'Medina', 28, '38.523.741', 'alan.medina@email.com'], ['Josefina', 'Ríos', 24, '42.763.189', 'josefina.rios@email.com'], ['Ramiro', 'Suárez', 36, '30.948.526', 'ramiro.suarez@email.com'], ['Violeta', 'Giménez', 27, '39.865.314', 'violeta.gimenez@email.com'], ['Ezequiel', 'Ocampo', 31, '35.127.849', 'ezequiel.ocampo@email.com'], ['Mía', 'Peralta', 21, '44.652.903', 'mia.peralta@email.com'], ['Facundo', 'Márquez', 29, '37.439.682', 'facundo.marquez@email.com'], ['Carolina', 'Bustos', 26, '40.783.156', 'carolina.bustos@email.com'], ['Diego', 'Ibarra', 38, '29.674.321', 'diego.ibarra@email.com'], ['Julieta', 'Carrizo', 23, '43.927.580', 'julieta.carrizo@email.com'], ['Agustín', 'Ledesma', 32, '34.816.275', 'agustin.ledesma@email.com'], ['Florencia', 'Pereyra', 28, '38.271.649', 'florencia.pereyra@email.com'], ['Pedro', 'Quiroga', 30, '36.957.143', 'pedro.quiroga@email.com'], ['Catalina', 'Bravo', 24, '42.183.765', 'catalina.bravo@email.com'], ['Simón', 'Ramos', 35, '31.425.897', 'simon.ramos@email.com'], ['Alma', 'Ferrer', 22, '44.738.216', 'alma.ferrer@email.com'], ['Martín', 'Franco', 27, '39.526.481', 'martin.franco@email.com']] },
];

const seed = () => initialCourses.map(c => ({
  ...c,
  students: (c.students || []).map(s => ({
    first: s[0],
    last: s[1],
    age: s[2],
    dni: s[3],
    email: s[4],
    joined: '12/05/2025',
    grades: Array.from({ length: 4 }, (_, i) => ((Number(String(s[3]).replace(/\D/g, '').slice(-2)) + i * 3) % 11))
  }))
}));

const defaultPrices = { ux: 48000, react: 55000, marketing: 42000, excel: 36000, python: 50000, fotografia: 44000, finanzas: 32000 };

const courseSyllabi = {
  ux: [
    { title: 'Fundamentos de UX y diseño centrado en las personas', topics: ['UX, UI y usabilidad: diferencias y objetivos', 'Necesidades, contexto y problemas de las personas', 'Principios de accesibilidad y diseño inclusivo'] },
    { title: 'Investigación con usuarios', topics: ['Objetivos y preguntas de investigación', 'Entrevistas, encuestas y análisis de referentes', 'Síntesis de hallazgos y oportunidades de diseño'] },
    { title: 'Arquitectura de información y flujos', topics: ['Personas y escenarios de uso', 'Sitemaps, navegación y jerarquía de contenidos', 'User flows y wireframes de baja fidelidad'] },
    { title: 'Diseño visual de interfaces', topics: ['Tipografía, color, grillas y espaciado', 'Componentes, variantes y sistemas de diseño', 'Diseño responsive y consistencia visual en Figma'] },
    { title: 'Prototipado y validación', topics: ['Prototipos interactivos de alta fidelidad', 'Pruebas de usabilidad y registro de observaciones', 'Iteración basada en evidencia y accesibilidad'] },
    { title: 'Entrega y proyecto integrador', topics: ['Especificaciones y handoff para desarrollo', 'Métricas básicas para evaluar una experiencia', 'Caso de portfolio desde investigación hasta prototipo'] }
  ],
  react: [
    { title: 'Fundamentos de la web', topics: ['Cómo funciona el navegador y la web', 'HTML semántico y estructura de una página', 'CSS, diseño responsive y herramientas de desarrollo'] },
    { title: 'JavaScript moderno', topics: ['Variables, tipos, funciones y módulos', 'Arrays, objetos y métodos esenciales', 'Eventos, promesas y operaciones asíncronas'] },
    { title: 'Primeros pasos con React', topics: ['Crear un proyecto y entender JSX', 'Componentes, props y composición', 'Renderizado de listas y estados vacíos'] },
    { title: 'Estado e interacción', topics: ['Eventos y estado con useState', 'Formularios y validaciones', 'Elevar y compartir estado entre componentes'] },
    { title: 'Efectos y datos externos', topics: ['useEffect y ciclo de vida de datos', 'Consumo de APIs y estados de carga/error', 'Hooks personalizados y manejo de efectos'] },
    { title: 'Navegación y arquitectura', topics: ['Rutas, parámetros y navegación', 'Layouts y organización por componentes', 'Contexto y patrones para aplicaciones medianas'] },
    { title: 'Calidad y publicación', topics: ['Accesibilidad y rendimiento básico', 'Pruebas de componentes y depuración', 'Construcción, despliegue y proyecto final'] }
  ],
  marketing: [
    { title: 'Bases del marketing digital', topics: ['Canales digitales y recorrido del cliente', 'Objetivos, embudo y métricas principales', 'Audiencias, necesidades y propuesta de valor'] },
    { title: 'Marca y estrategia de contenidos', topics: ['Identidad, posicionamiento y tono de voz', 'Pilares de contenido y objetivos por audiencia', 'Plan editorial y calendario de publicaciones'] },
    { title: 'Creación de contenido para redes', topics: ['Formatos y buenas prácticas por plataforma', 'Redacción, narrativa visual y llamados a la acción', 'Producción eficiente de piezas y adaptación de formatos'] },
    { title: 'Comunidad y crecimiento orgánico', topics: ['Gestión de comunidad y atención', 'Alcance, interacción y lectura de tendencias', 'Colaboraciones y crecimiento sostenible'] },
    { title: 'Publicidad digital', topics: ['Estructura de campañas y segmentación', 'Creatividades, presupuesto y pruebas A/B', 'Seguimiento de conversiones y optimización inicial'] },
    { title: 'Analítica y campaña integradora', topics: ['Lectura de indicadores y reportes', 'Decisiones basadas en resultados', 'Diseño y presentación de una campaña completa'] }
  ],
  excel: [
    { title: 'Primeros pasos y organización de datos', topics: ['Libros, hojas, celdas y rangos', 'Tipos de datos, formatos y referencias', 'Ordenar, filtrar y preparar una tabla'] },
    { title: 'Fórmulas y funciones esenciales', topics: ['Operadores y referencias relativas/absolutas', 'SUMA, PROMEDIO, CONTAR y funciones condicionales', 'Búsquedas y combinación de funciones'] },
    { title: 'Limpieza y análisis', topics: ['Validación de datos y formato condicional', 'Funciones de texto y fechas', 'Tablas estructuradas y detección de inconsistencias'] },
    { title: 'Tablas dinámicas y visualización', topics: ['Resumir información con tablas dinámicas', 'Elegir gráficos claros para cada pregunta', 'Segmentadores y paneles interactivos'] },
    { title: 'Dashboard y proyecto integrador', topics: ['Definición de indicadores y objetivos', 'Diseño de un dashboard legible', 'Análisis de un conjunto de datos y presentación de conclusiones'] }
  ],
  python: [
    { title: 'Lógica y entorno de programación', topics: ['Instalación, editor y ejecución de Python', 'Variables, tipos de datos y operaciones', 'Entrada, salida y mensajes de error'] },
    { title: 'Decisiones y repetición', topics: ['Condicionales y operadores lógicos', 'Bucles for y while', 'Descomponer problemas en pasos'] },
    { title: 'Colecciones y funciones', topics: ['Listas, tuplas y diccionarios', 'Funciones, parámetros y valores de retorno', 'Organizar y reutilizar código'] },
    { title: 'Archivos, módulos y errores', topics: ['Leer y escribir archivos de texto y CSV', 'Importar módulos y usar paquetes', 'Manejo de excepciones y depuración'] },
    { title: 'Automatización y datos', topics: ['Procesar información con bibliotecas comunes', 'Trabajar con JSON y datos externos', 'Automatizar tareas repetitivas con scripts'] },
    { title: 'Proyecto integrador', topics: ['Planificar una solución pequeña de punta a punta', 'Probar casos y mejorar el código', 'Documentar y presentar una automatización funcional'] }
  ],
  fotografia: [
    { title: 'Cámara, exposición y luz', topics: ['Controles de cámara y modos de captura', 'Apertura, velocidad e ISO', 'Exposición correcta y lectura de luz'] },
    { title: 'Enfoque, lentes y composición', topics: ['Distancia focal y profundidad de campo', 'Enfoque y movimiento', 'Encuadre, perspectiva y reglas compositivas'] },
    { title: 'Iluminación y narrativa visual', topics: ['Luz natural: dirección, calidad y horario', 'Esquemas simples de luz artificial', 'Color, intención y construcción de una serie'] },
    { title: 'Edición y flujo de trabajo', topics: ['Selección, organización y respaldo de fotos', 'Revelado RAW, exposición y color', 'Retoque cuidadoso y exportación para distintos usos'] },
    { title: 'Proyecto fotográfico final', topics: ['Definir concepto, referencias y plan de tomas', 'Producir y editar una serie coherente', 'Curar y presentar un portfolio breve'] }
  ],
  finanzas: [
    { title: 'Diagnóstico y objetivos financieros', topics: ['Ingresos, gastos y hábitos de consumo', 'Metas de corto, mediano y largo plazo', 'Registro y lectura de la situación actual'] },
    { title: 'Presupuesto, ahorro y deudas', topics: ['Armar un presupuesto flexible', 'Fondo de emergencia y ahorro planificado', 'Tipos de deuda, costos y estrategias de orden'] },
    { title: 'Productos financieros y riesgos', topics: ['Cuentas, tarjetas, préstamos y costos frecuentes', 'Inflación, interés y poder adquisitivo', 'Seguridad financiera y prevención de estafas'] },
    { title: 'Inversión informada y plan personal', topics: ['Relación entre riesgo, plazo y rendimiento', 'Diversificación y conceptos básicos de inversión', 'Plan personal con objetivos y criterios de seguimiento'] }
  ]
};

const genericSyllabi = {
  'Tecnología': [{ title: 'Fundamentos y herramientas', topics: ['Conceptos esenciales del área', 'Entorno de trabajo y vocabulario clave', 'Buenas prácticas iniciales'] }, { title: 'Técnicas básicas', topics: ['Procesos y herramientas principales', 'Ejercicios guiados paso a paso', 'Resolución de problemas frecuentes'] }, { title: 'Construcción de soluciones', topics: ['Integración de técnicas', 'Planificación de tareas', 'Desarrollo de una solución funcional'] }, { title: 'Profundización y calidad', topics: ['Optimización y revisión', 'Pruebas, accesibilidad o seguridad según el proyecto', 'Documentación y mejora continua'] }, { title: 'Proyecto integrador', topics: ['Definición del problema', 'Desarrollo y validación', 'Presentación de resultados'] }],
  'Diseño': [{ title: 'Fundamentos visuales', topics: ['Principios de composición y jerarquía', 'Color, tipografía y formas', 'Referencias y criterios de calidad'] }, { title: 'Herramientas y técnicas', topics: ['Configuración del espacio de trabajo', 'Herramientas principales', 'Prácticas de precisión y consistencia'] }, { title: 'Proceso creativo', topics: ['Brief, objetivos y público', 'Exploración de ideas y bocetos', 'Selección y desarrollo de una dirección'] }, { title: 'Producción y refinamiento', topics: ['Construcción de piezas completas', 'Revisión, feedback e iteración', 'Preparación de archivos finales'] }, { title: 'Proyecto y portfolio', topics: ['Planificación de una propuesta', 'Desarrollo de una serie coherente', 'Presentación del proceso y resultado'] }],
  'Marketing': [{ title: 'Fundamentos y audiencia', topics: ['Canales, objetivos y recorrido del cliente', 'Audiencias y propuesta de valor', 'Indicadores principales'] }, { title: 'Estrategia y contenidos', topics: ['Posicionamiento y tono', 'Pilares de contenido', 'Plan editorial'] }, { title: 'Campañas y canales', topics: ['Formatos y tácticas por canal', 'Segmentación y creatividad', 'Ejecución y seguimiento'] }, { title: 'Análisis y optimización', topics: ['Lectura de resultados', 'Pruebas y mejoras', 'Informes y aprendizajes'] }, { title: 'Proyecto integrador', topics: ['Brief y estrategia', 'Campaña de principio a fin', 'Presentación de métricas y próximos pasos'] }],
  'Negocios': [{ title: 'Conceptos esenciales', topics: ['Vocabulario y fundamentos del área', 'Contexto, objetivos y actores', 'Herramientas de diagnóstico'] }, { title: 'Organización y planificación', topics: ['Definir metas y prioridades', 'Procesos y recursos', 'Presupuesto y seguimiento'] }, { title: 'Herramientas de análisis', topics: ['Indicadores y lectura de información', 'Comparación de alternativas', 'Evaluación de riesgos'] }, { title: 'Decisiones y ejecución', topics: ['Plan de acción', 'Seguimiento y ajustes', 'Comunicación de resultados'] }, { title: 'Caso integrador', topics: ['Analizar una situación concreta', 'Proponer una solución', 'Defender la propuesta con datos'] }],
  'Otros': [{ title: 'Introducción y fundamentos', topics: ['Conceptos esenciales y vocabulario', 'Objetivos y contexto', 'Herramientas iniciales'] }, { title: 'Prácticas básicas', topics: ['Técnicas principales', 'Ejercicios guiados', 'Resolución de dudas frecuentes'] }, { title: 'Aplicación intermedia', topics: ['Combinación de herramientas', 'Planificación del trabajo', 'Práctica aplicada'] }, { title: 'Profundización', topics: ['Criterios de calidad', 'Revisión y mejora', 'Casos de aplicación'] }, { title: 'Proyecto final', topics: ['Definición de una propuesta', 'Desarrollo y validación', 'Presentación final'] }]
};

const courseModulesFor = course => Array.isArray(course.modules) && course.modules.length ? course.modules : (courseSyllabi[course.id] || genericSyllabi[course.category] || genericSyllabi.Otros);
const withCourseDefaults = c => ({ ...c, monthlyPrice: c.monthlyPrice || defaultPrices[c.id] || 39000, paymentMethods: c.paymentMethods || ['QR', 'Tarjeta'], modules: courseModulesFor(c) });
const getData = () => { try { const d = JSON.parse(localStorage.getItem('aula-data')); return Array.isArray(d) && d.length ? d.map(withCourseDefaults) : seed().map(withCourseDefaults); } catch { return seed().map(withCourseDefaults); } };
const initials = (a, b) => `${a?.[0] || ''}${b?.[0] || ''}`.toUpperCase();
const colors = ['av1', 'av2', 'av3', 'av4', 'av5', 'av6'];

const getSavedUser = () => {
  try {
    if (localStorage.getItem('aula-signed-out') === 'true') return null;
    const raw = localStorage.getItem('aula-current-user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function App() {
  const [courses, setCourses] = useState(getData);
  const [page, setPage] = useState('overview');
  const [courseReturnPage, setCourseReturnPage] = useState('courses');
  const [adminEnrollmentDraft, setAdminEnrollmentDraft] = useState({ account: '', first: '', last: '', dni: '', birthDate: '' });
  const [selected, setSelected] = useState('ux');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [hideEnrolled, setHideEnrolled] = useState(false);
  const [studentQuery, setStudentQuery] = useState('');
  const [courseQuery, setCourseQuery] = useState('');
  const [form, setForm] = useState({ first: '', last: '', age: '', dni: '', email: '', courseId: 'ux' });
  const [notice, setNotice] = useState('');
  const [supportMessages, setSupportMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aula-support-messages') || '[]'); } catch { return []; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [prevPage, setPrevPage] = useState('overview');

  // Estado de usuario y autenticación corregido (sin nombres predeterminados)
  const [signedIn, setSignedIn] = useState(() => !!getSavedUser());
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', dni: '', birthDate: '' });
  const [authMessage, setAuthMessage] = useState('');
  const [confirmDniCohort, setConfirmDniCohort] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => getSavedUser() || { name: '', email: '', isAdmin: false });
  const [isAdmin, setIsAdmin] = useState(() => !!getSavedUser()?.isAdmin);

  const [removeStudentCandidate, setRemoveStudentCandidate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('QR');
  const [cardBrand, setCardBrand] = useState('Mastercard');
  const [myCourseIds, setMyCourseIds] = useState(() => {
    const u = getSavedUser();
    return (u?.email && !u.isAdmin) ? JSON.parse(localStorage.getItem(`aula-user:${u.email}:courses`) || '[]') : [];
  });
  const [waitlistIds, setWaitlistIds] = useState(() => {
    const u = getSavedUser();
    return (u?.email && !u.isAdmin) ? JSON.parse(localStorage.getItem(`aula-user:${u.email}:waitlist`) || '[]') : [];
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentStage, setPaymentStage] = useState('processing');
  const [withdrawCandidate, setWithdrawCandidate] = useState(null);
  const [withdrawSuccessCourse, setWithdrawSuccessCourse] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const u = getSavedUser();
    return u?.email ? JSON.parse(localStorage.getItem(`aula-user:${u.email}:notifications`) || '[]') : [];
  });
  const [checkout, setCheckout] = useState({ name: '', last: '', email: '', dni: '', card: '', expiry: '', cvv: '', cvu: localStorage.getItem('aula-cvu') || '' });
  const [editCourseId, setEditCourseId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [deleteCourseCandidate, setDeleteCourseCandidate] = useState(null);
  const [deleteAnnouncementCandidate, setDeleteAnnouncementCandidate] = useState(null);
  const [deleteTicketCandidate, setDeleteTicketCandidate] = useState(null);
  const [dark, setDark] = useState(localStorage.getItem('aula-dark') === 'true');

  const [profileDraft, setProfileDraft] = useState(() => {
    const u = getSavedUser();
    if (!u?.email) return { name: '', email: '', phone: '', dni: '', birthDate: '', avatar: '' };
    const saved = JSON.parse(localStorage.getItem(`aula-user:${u.email}:profile`) || '{}');
    return { name: u.name || '', email: u.email || '', phone: saved.phone || '', dni: saved.dni || '', birthDate: saved.birthDate || '', avatar: saved.avatar || '' };
  });
  const [profileBaseline, setProfileBaseline] = useState(() => {
    const u = getSavedUser();
    if (!u?.email) return { name: '', email: '', phone: '', dni: '', birthDate: '', avatar: '' };
    const saved = JSON.parse(localStorage.getItem(`aula-user:${u.email}:profile`) || '{}');
    return { name: u.name || '', email: u.email || '', phone: saved.phone || '', dni: saved.dni || '', birthDate: saved.birthDate || '', avatar: saved.avatar || '' };
  });

  const [deleteAccountCandidate, setDeleteAccountCandidate] = useState(false);
  const [announcementDraft, setAnnouncementDraft] = useState('');
  const [newCourseDraft, setNewCourseDraft] = useState({ title: '', instructor: '', category: 'Tecnología', description: '', duration: '8 semanas', capacity: 20, monthlyPrice: 39000, startDate: '', startTime: '' });
  const [fontScale, setFontScale] = useState(Number(localStorage.getItem('aula-font') || 100));

  useEffect(() => {
    const syncLocalChanges = event => {
      if (event.key === 'aula-support-messages') {
        try { setSupportMessages(event.newValue ? JSON.parse(event.newValue) : []); } catch { setSupportMessages([]); }
      }
      const notificationKey = currentUser.email ? `aula-user:${currentUser.email}:notifications` : '';
      if (notificationKey && event.key === notificationKey) {
        try { setNotifications(event.newValue ? JSON.parse(event.newValue) : []); } catch { setNotifications([]); }
      }
    };
    window.addEventListener('storage', syncLocalChanges);
    return () => window.removeEventListener('storage', syncLocalChanges);
  }, [currentUser.email]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const total = courses.reduce((n, c) => n + c.students.length, 0);
  const active = courses.filter(c => c.students.length < c.capacity).length;
  const sel = courses.find(c => c.id === selected) || courses[0];
  const free = sel.capacity - sel.students.length;

  const profileDirty = Object.keys(profileBaseline).some(key => (profileDraft[key] || '') !== (profileBaseline[key] || ''));
  const registeredAccounts = JSON.parse(localStorage.getItem('aula-users') || '[]').filter(u => !u.isAdmin && u.email);
  const filteredCourses = useMemo(() => courses.filter(c => (filter === 'Todos' || c.category === filter) && (c.title + c.instructor + c.category).toLowerCase().includes(query.toLowerCase())), [courses, filter, query]);
  const filteredStudents = useMemo(() => sel.students.filter(s => (s.first + ' ' + s.last + ' ' + s.dni + ' ' + s.email).toLowerCase().includes(studentQuery.toLowerCase())), [sel, studentQuery]);

  const persist = (next) => { setCourses(next); localStorage.setItem('aula-data', JSON.stringify(next)); };
  const userKey = `aula-user:${currentUser.email}`;

  const pushNotification = (message, courseId = null, type = 'general') => {
    const next = [{ id: Date.now() + Math.random(), message, date: new Date().toLocaleString('es-AR'), courseId, type }, ...notifications].slice(0, 30);
    setNotifications(next);
    if (currentUser.email) {
      localStorage.setItem(`${userKey}:notifications`, JSON.stringify(next));
    }
  };

  const saveAccountNotification = (email, notification) => {
    const key = `aula-user:${email}:notifications`, items = JSON.parse(localStorage.getItem(key) || '[]'), next = [notification, ...items].slice(0, 30);
    localStorage.setItem(key, JSON.stringify(next));
    if (email.toLowerCase() === currentUser.email?.toLowerCase()) setNotifications(next);
  };

  const clearNotifications = () => {
    setNotifications([]);
    if (currentUser.email) localStorage.removeItem(`${userKey}:notifications`);
    setNotificationOpen(false);
  };

  const go = (p) => {
    if ((['students', 'manage', 'add-course', 'edit-course', 'admin-enroll', 'support-inbox'].includes(p) && !isAdmin) || (['my-courses', 'checkout'].includes(p) && isAdmin) ||
    (p === 'support' && isAdmin)) return;
    if (p !== page) setPrevPage(page);
    setPage(p);
    setMobileOpen(false);
    setNotice('');
  };

  const editGrade = (courseId, dni, index, value) => {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0 || n > 10) return;
    persist(courses.map(c => c.id === courseId ? { ...c, students: c.students.map(s => s.dni === dni ? { ...s, grades: (s.grades || [5, 6, 7, 8]).map((g, i) => i === index ? n : g) } : s) } : c));
  };

  const removeStudent = (courseId, dni) => {
    const course = courses.find(c => c.id === courseId), student = course?.students.find(s => s.dni === dni);
    const next = courses.map(c => c.id === courseId ? { ...c, students: c.students.filter(s => s.dni !== dni) } : c);
    persist(next);
    if (student?.email) {
      const base = `aula-user:${student.email}`;
      const enrolled = JSON.parse(localStorage.getItem(`${base}:courses`) || '[]').filter(id => id !== courseId);
      localStorage.setItem(`${base}:courses`, JSON.stringify(enrolled));
      const enrollmentMap = JSON.parse(localStorage.getItem(`${base}:enrollments`) || '{}');
      delete enrollmentMap[courseId];
      localStorage.setItem(`${base}:enrollments`, JSON.stringify(enrollmentMap));
    }
    setNotice('Matrícula dada de baja; cupo disponible.');
  };

  const enrollStudentByAdmin = (e) => {
    e.preventDefault();
    const account = registeredAccounts.find(u => u.email?.toLowerCase() === adminEnrollmentDraft.account.toLowerCase());
    if (!account) { setNotice('Seleccioná una cuenta registrada.'); return; }
    const first = adminEnrollmentDraft.first.trim(), last = adminEnrollmentDraft.last.trim(), dni = adminEnrollmentDraft.dni.replace(/\D/g, '');
    if (!first || !last) { setNotice('Completá nombre y apellido.'); return; }
    if (!/^\d{7,8}$/.test(dni)) { setNotice('El DNI debe tener 7 u 8 dígitos.'); return; }
    if (!adminEnrollmentDraft.birthDate) { setNotice('Completá la fecha de nacimiento.'); return; }
    if (adminEnrollmentDraft.birthDate > todayDate()) { setNotice('La fecha de nacimiento no puede ser futura.'); return; }
    const course = courses.find(c => c.id === selected);
    if (!course) return;
    if (course.students.length >= course.capacity) { setNotice('El curso está completo. Ampliá los cupos antes de inscribir.'); return; }
    const email = account.email.toLowerCase();
    if (course.students.some(s => s.dni.replace(/\D/g, '') === dni || s.email?.toLowerCase() === email)) { setNotice('Esta cuenta ya está inscripta en el curso.'); return; }
    const birth = new Date(`${adminEnrollmentDraft.birthDate}T00:00:00`), now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
    const student = { first, last, age, dni, email, joined: new Date().toLocaleDateString('es-AR'), grades: [7, 8, 8, 9] };
    persist(courses.map(c => c.id === selected ? { ...c, students: [student, ...c.students] } : c));
    const base = `aula-user:${email}`;
    const userCourses = JSON.parse(localStorage.getItem(`${base}:courses`) || '[]').filter(id => id !== selected);
    localStorage.setItem(`${base}:courses`, JSON.stringify([selected, ...userCourses]));
    const enrollments = JSON.parse(localStorage.getItem(`${base}:enrollments`) || '{}');
    enrollments[selected] = dni;
    localStorage.setItem(`${base}:enrollments`, JSON.stringify(enrollments));
    
    // Guardar notificación con courseId
    saveAccountNotification(email, {
      id: Date.now(),
      message: `Inscripto en: ${course.title}`,
      date: new Date().toLocaleString('es-AR'),
      courseId: selected,
      type: 'enrollment'
    });

    const profile = JSON.parse(localStorage.getItem(`${base}:profile`) || '{}');
    localStorage.setItem(`${base}:profile`, JSON.stringify({ ...profile, dni, birthDate: adminEnrollmentDraft.birthDate }));
    setCourseQuery(selected);
    setStudentQuery('');
    setAdminEnrollmentDraft({ account: '', first: '', last: '', dni: '', birthDate: '' });
    go('students');
    setNotice(`${first} ${last} quedó inscripto en ${course.title}.`);
  };

  const toggleDark = () => { const v = !dark; setDark(v); localStorage.setItem('aula-dark', String(v)); };
  const setScale = v => { setFontScale(v); localStorage.setItem('aula-font', String(v)); };
  const deleteTicket = ticketId => {
    if (!isAdmin) return;
    const next = supportMessages.filter(m => m.id !== ticketId);
    setSupportMessages(next);
    localStorage.setItem('aula-support-messages', JSON.stringify(next));
    setNotice('La conversación se eliminó.');
  };
  const replyToSupport = (e, ticketId) => {
    e.preventDefault();
    const form = e.currentTarget, text = String(new FormData(form).get('reply') || '').trim();
    if (!text) return;
    const ticket = supportMessages.find(m => m.id === ticketId);
    if (!ticket) return;
    const date = new Date().toLocaleString('es-AR'), reply = { id: Date.now(), author: currentUser.name, message: text, createdAt: date, from: 'support' };
    const next = supportMessages.map(m => m.id === ticketId ? { ...m, replies: [...(m.replies || []), reply], status: 'respondido' } : m);
    setSupportMessages(next);
    localStorage.setItem('aula-support-messages', JSON.stringify(next));
    saveAccountNotification(ticket.email, { id: Date.now() + Math.random(), message: `Soporte respondió tu consulta: ${ticket.subject}`, date, type: 'support', ticketId });
    form.reset();
    setNotice(`Respuesta enviada a ${ticket.name}.`);
  };

  const replyToTicket = (e, ticketId) => {
    e.preventDefault();
    if (isAdmin) return;
    const form = e.currentTarget, text = String(new FormData(form).get('reply') || '').trim();
    if (!text) return;
    const ticket = supportMessages.find(m => m.id === ticketId && m.email?.toLowerCase() === currentUser.email?.toLowerCase());
    if (!ticket) return;
    const date = new Date().toLocaleString('es-AR'), reply = { id: Date.now(), author: currentUser.name, message: text, createdAt: date, from: 'student' };
    const next = supportMessages.map(m => m.id === ticketId ? { ...m, replies: [...(m.replies || []), reply], status: 'pendiente' } : m);
    setSupportMessages(next);
    localStorage.setItem('aula-support-messages', JSON.stringify(next));
    saveAccountNotification('admin@itsc.edu.ar', { id: Date.now() + Math.random(), message: `Respuesta de ${currentUser.name} en soporte: ${ticket.subject}`, date, type: 'support-inbox', ticketId });
    form.reset();
    setNotice('Tu respuesta quedó enviada a soporte.');
  };

  const postAnnouncement = () => {
    const text = announcementDraft.trim();
    if (!text || (!isAdmin && !myCourseIds.includes(sel.id))) return;
    const id = Date.now(), date = new Date().toLocaleString('es-AR'), announcement = { id, text, author: currentUser.name, date, authorEmail: currentUser.email };
    persist(courses.map(c => c.id === sel.id ? { ...c, announcements: [announcement, ...(c.announcements || [])] } : c));
    setAnnouncementDraft('');
    const registered = new Set(registeredAccounts.map(u => u.email.toLowerCase())), recipients = new Set(sel.students.map(st => st.email?.toLowerCase()).filter(email => email && email !== currentUser.email?.toLowerCase() && registered.has(email)));
    if (!isAdmin) recipients.add('admin@itsc.edu.ar');
    recipients.forEach(email => saveAccountNotification(email, { id: id + Math.random(), message: `Nuevo anuncio en ${sel.title}: ${text}`, date, courseId: sel.id, type: 'announcement' }));
  };

  const todayDate = () => { const d = new Date(); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); };

  const joinWaitlist = () => {
    if (waitlistIds.includes(sel.id)) { setNotice('Ya estás en la lista de espera de este curso.'); return; }
    const next = [...waitlistIds, sel.id];
    setWaitlistIds(next);
    localStorage.setItem(`${userKey}:waitlist`, JSON.stringify(next));
    pushNotification(`Te anotaste en la lista de espera: ${sel.title}`, sel.id, 'waitlist');
    setNotice(`Te sumaste a la lista de espera de ${sel.title}.`);
  };

  const processPayment = () => {
    if (sel.students.length >= sel.capacity && !myCourseIds.includes(sel.id)) {
      setNotice('Este curso está completo. Podés anotarte en la lista de espera.');
      return;
    }
    setPaymentSuccess(true);
    setPaymentStage('processing');
    window.setTimeout(() => {
      const next = courses.map(c => c.id === sel.id ? { ...c, students: c.students.some(st => st.dni === checkout.dni) ? c.students : [{ first: checkout.name, last: checkout.last, age: 18, dni: checkout.dni, email: checkout.email.trim(), joined: new Date().toLocaleDateString('es-AR'), grades: [7, 8, 8, 9] }, ...c.students] } : c);
      persist(next);
      const mine = [sel.id, ...myCourseIds.filter(id => id !== sel.id)];
      setMyCourseIds(mine);
      localStorage.setItem(`${userKey}:courses`, JSON.stringify(mine));
      const enrolled = JSON.parse(localStorage.getItem(`${userKey}:enrollments`) || '{}');
      enrolled[sel.id] = checkout.dni;
      localStorage.setItem(`${userKey}:enrollments`, JSON.stringify(enrolled));
      pushNotification(`Inscripto en: ${sel.title}`, sel.id, 'enrollment');
      setPaymentStage('success');
    }, 1600);
  };

  const choose = (id) => {
    setCourseReturnPage(page === 'my-courses' ? 'my-courses' : 'courses');
    setSelected(id);
    setStudentQuery('');
    setShowAll(false);
    setPage('detail');
  };

  // Abrir y navegar notificaciones al hacer clic
  const openNotification = (item) => {
    setNotificationOpen(false);
    if (item.type === 'support-inbox' && isAdmin && item.ticketId) {
      setPrevPage(page);
      setPage('support-inbox');
      window.setTimeout(() => document.getElementById(`support-admin-ticket-${item.ticketId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return;
    }
    if (item.type === 'support' && item.ticketId) {
      setPrevPage(page);
      setPage('support');
      window.setTimeout(() => document.getElementById(`support-ticket-${item.ticketId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      return;
    }
    if (item.courseId) {
      const course = courses.find(c => c.id === item.courseId);
      if (course) {
        setPrevPage(page);
        setSelected(course.id);
        setCourseReturnPage(!isAdmin && myCourseIds.includes(course.id) ? 'my-courses' : 'courses');
        setStudentQuery('');
        setShowAll(false);
        setPage('detail');
        if (item.type === 'announcement') {
          window.setTimeout(() => document.getElementById('class-board')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
        }
        return;
      }
    }
    if (item.type === 'withdraw' || (item.message && item.message.toLowerCase().includes('dado de baja'))) {
      setNotice(item.message);
      if (!isAdmin) go('my-courses');
      return;
    }
    setNotice(item.message);
    if (!isAdmin && myCourseIds.length > 0) {
      go('my-courses');
    } else {
      go('overview');
    }
  };

  // Pantalla de Login / Registro
  if (!signedIn) {
    return (
      <div className={`login-screen ${dark ? 'dark' : ''}`}>
        <form className="login-card auth-card" onSubmit={e => {
          e.preventDefault();
          const name = authForm.name.trim();
          const email = authForm.email.trim().toLowerCase();
          if (authForm.password.length < 5) {
            setAuthMessage('Ingresá al menos 5 caracteres para continuar.');
            return;
          }
          if (!/^\S+@\S+\.\S+$/.test(email)) {
            setAuthMessage('Ingresá un email válido.');
            return;
          }

          let users = JSON.parse(localStorage.getItem('aula-users') || '[]');
          let user;

          if (authMode === 'register') {
            if (!name) { setAuthMessage('Completá tu nombre.'); return; }
            const registerDni = authForm.dni.replace(/\D/g, '');
            if (!/^\d{7,8}$/.test(registerDni)) { setAuthMessage('Ingresá un DNI argentino de 7 u 8 dígitos.'); return; }
            if (!authForm.birthDate) { setAuthMessage('Completá tu fecha de nacimiento.'); return; }
            if (authForm.birthDate > todayDate()) { setAuthMessage('La fecha de nacimiento no puede ser futura.'); return; }
            
            const birthDate = new Date(`${authForm.birthDate}T00:00:00`), today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) age--;
            if (age < 15) { setAuthMessage('Para crear una cuenta tenés que tener al menos 15 años.'); return; }
            
            const dniNumber = Number(registerDni);
            if (dniNumber >= 60000000 && dniNumber < 70000000) {
              setAuthMessage('Ese número pertenece al rango 60–69 millones, reservado para identificadores provisorios y no válido como DNI. Revisá el número.');
              return;
            }
            if (dniNumber >= 70000000 && Number(authForm.birthDate.slice(0, 4)) < 2023 && !confirmDniCohort) {
              setAuthMessage('La numeración del DNI parece inusual para esa fecha de nacimiento. Revisá los datos y marcá la confirmación si son correctos.');
              return;
            }

            const dniAlreadyUsedByAccount = users.some(u => {
              if (!u.email) return false;
              try { return (JSON.parse(localStorage.getItem(`aula-user:${u.email}:profile`) || '{}').dni || '').replace(/\D/g, '') === registerDni; } catch { return false; }
            });
            const dniAlreadyUsedInRoster = courses.some(c => c.students.some(st => (st.dni || '').replace(/\D/g, '') === registerDni));
            if (dniAlreadyUsedByAccount || dniAlreadyUsedInRoster) {
              setAuthMessage('Ese DNI ya está registrado. Revisá el número o iniciá sesión con la cuenta asociada.');
              return;
            }
            if (email === 'admin@itsc.edu.ar' || users.some(u => u.email?.toLowerCase() === email)) {
              setAuthMessage('Ya existe una cuenta con ese email.');
              return;
            }

            // Crear y guardar el nuevo usuario con su contraseña
            user = { name, email, password: authForm.password, isAdmin: false };
            users.push(user);
            localStorage.setItem('aula-users', JSON.stringify(users));
            localStorage.setItem(`aula-user:${email}:profile`, JSON.stringify({ dni: registerDni, birthDate: authForm.birthDate, phone: '', avatar: '' }));
            setAuthMode('login');
            setAuthForm({ name: '', email, password: '', dni: '', birthDate: '' });
            setConfirmDniCohort(false);
            setAuthMessage('¡Registro exitoso! Ya podés iniciar sesión con tu email y contraseña.');
            return;
          } else if (email === 'admin@itsc.edu.ar') {
            user = { name: 'Admin Cursitos', email, isAdmin: true };
          } else {
            // Modo Login: buscar usuario real
            user = users.find(u => u.email?.toLowerCase() === email);
            if (!user) {
              setAuthMessage('No encontramos ninguna cuenta con ese email. Podés registrarte en la pestaña "Crear cuenta".');
              return;
            }
            if (user.password && user.password !== authForm.password) {
              setAuthMessage('Contraseña incorrecta. Por favor verificala.');
              return;
            }
            if (!user.password) {
              user.password = authForm.password;
              localStorage.setItem('aula-users', JSON.stringify(users));
            }
          }

          setCurrentUser(user);
          setIsAdmin(!!user.isAdmin);
          const savedProfile = JSON.parse(localStorage.getItem(`aula-user:${email}:profile`) || '{}');
          const initialProfile = { name: user.name, email: user.email, phone: savedProfile.phone || '', dni: savedProfile.dni || '', birthDate: savedProfile.birthDate || '', avatar: savedProfile.avatar || '' };
          setProfileDraft(initialProfile);
          setProfileBaseline(initialProfile);
          setCardBrand(localStorage.getItem(`aula-user:${email}:payment-brand`) || 'Mastercard');
          localStorage.setItem('aula-current-user', JSON.stringify({ name: user.name, email: user.email, isAdmin: !!user.isAdmin }));
          const [firstName, ...lastNames] = user.name.trim().split(/\s+/);
          setCheckout({ name: firstName || '', last: lastNames.join(' '), email, dni: savedProfile.dni || '', card: '', expiry: '', cvv: '', cvu: localStorage.getItem('aula-cvu') || '' });
          setMyCourseIds(user.isAdmin ? [] : JSON.parse(localStorage.getItem(`aula-user:${email}:courses`) || '[]'));
          setWaitlistIds(user.isAdmin ? [] : JSON.parse(localStorage.getItem(`aula-user:${email}:waitlist`) || '[]'));
          setNotifications(JSON.parse(localStorage.getItem(`aula-user:${email}:notifications`) || '[]'));
          setAuthMessage('');
          setPage('overview');
          setSignedIn(true);
          localStorage.removeItem('aula-signed-out');
        }}>
          <div className="login-brand"><BookOpen size={23} /> Cursitos</div>
          <h1>{authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
          <p>{authMode === 'login' ? 'Ingresá con tu usuario para continuar.' : 'Registrate para crear tu usuario local.'}</p>
          
          {authMode === 'register' && (
            <>
              <label>Nombre y apellido
                <input required autoComplete="name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} />
              </label>
              <label>DNI
                <input required inputMode="numeric" maxLength="10" placeholder="Ej. 42.315.678" value={authForm.dni} onChange={e => { setAuthForm({ ...authForm, dni: e.target.value }); setConfirmDniCohort(false); }} />
              </label>
              <label>Fecha de nacimiento
                <input required type="date" max={todayDate()} value={authForm.birthDate} onChange={e => { setAuthForm({ ...authForm, birthDate: e.target.value }); setConfirmDniCohort(false); }} />
              </label>
              <small className="auth-hint">Para registrarte tenés que tener al menos 15 años.</small>
              {authForm.birthDate && Number(authForm.dni.replace(/\D/g, '')) >= 70000000 && Number(authForm.birthDate.slice(0, 4)) < 2023 && (
                <div className="dni-cohort-warning">
                  <b>Revisá DNI y fecha</b>
                  <span>La serie desde 70 millones se usa para DNI emitidos a recién nacidos desde 2023. En inscripciones tardías y otras situaciones puede variar.</span>
                  <label><input type="checkbox" checked={confirmDniCohort} onChange={e => setConfirmDniCohort(e.target.checked)} /> Confirmo que revisé ambos datos.</label>
                </div>
              )}
            </>
          )}

          <label>Email
            <input required type="email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} placeholder="tu@email.com" />
          </label>
          <label>Contraseña
            <input required type="password" minLength={5} value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
          </label>
          
          {authMessage && (
            <div className={authMessage.includes('exitoso') || authMessage.startsWith('La cuenta se eliminó') ? 'auth-success' : 'auth-error'}>
              {authMessage}
            </div>
          )}

          <button className="primary-btn auth-submit" type="submit">
            {authMode === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
          <button type="button" className="auth-toggle" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthMessage(''); }}>
            {authMode === 'login' ? '¿No tenés cuenta? Registrate' : 'Ya tengo cuenta · Iniciar sesión'}
          </button>
        </form>

        {authMode === 'login' && (
          <button type="button" className="admin-login-choice" onClick={() => setAuthForm({ ...authForm, email: 'admin@itsc.edu.ar' })}>
            <Settings size={15} /> Usar cuenta Admin Cursitos
          </button>
        )}
      </div>
    );
  }

    const pageLabels = {
    overview: 'Inicio', courses: 'Cursos', 'my-courses': 'Mis cursos', students: 'Estudiantes',
    'support-inbox': 'Bandeja de soporte', profile: 'Mi perfil', support: 'Contactar soporte',
    calendar: 'Calendario', settings: 'Apariencia'
  };

  const courseListCrumb = { label: courseReturnPage === 'my-courses' ? 'Mis cursos' : 'Cursos', page: courseReturnPage };

  const breadcrumbTrail = (() => {
    switch (page) {
      case 'detail':
        return [courseListCrumb, { label: sel.title }];
      case 'admin-enroll':
        return [courseListCrumb, { label: sel.title, page: 'detail' }, { label: 'Inscribir alumno' }];
      case 'checkout':
        return [courseListCrumb, { label: sel.title, page: 'detail' }, { label: 'Inscripción' }];
      case 'manage':
        return [{ label: 'Cursos', page: 'courses' }, { label: 'Cursos disponibles' }];
      case 'add-course':
        return [{ label: 'Cursos', page: 'courses' }, { label: 'Cursos disponibles', page: 'manage' }, { label: 'Nuevo curso' }];
      case 'edit-course':
        return [{ label: 'Cursos', page: 'courses' }, { label: 'Cursos disponibles', page: 'manage' }, { label: 'Editar curso' }];
      default:
        return [{ label: pageLabels[page] || '' }];
    }
  })();

  return (
    <div className={`app-shell ${dark ? "dark" : ""}`} style={{ "--font-scale": fontScale / 100 }}>
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark"><BookOpen size={18} /></span>
          <span>Cursitos</span>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></button>
        </div>
        <div className="nav-label">ESPACIO DE TRABAJO</div>
        <nav className="nav-menu">
          {[
            ['overview', LayoutDashboard, 'Inicio'],
            ...(isAdmin ? [] : [['my-courses', GraduationCap, 'Mis cursos']]),
            ['courses', BookOpen, 'Cursos'],
            ...(isAdmin ? [] : [['profile', UserRound, 'Mi perfil']]),
            ...(isAdmin ? [['students', Users, 'Estudiantes'], ['support-inbox', Mail, 'Bandeja de soporte']] : [])
          ].map(([id, Icon, label]) => (
            <button
              className={`nav-item ${page === id || ((page === 'detail') && id === (courseReturnPage === 'my-courses' ? 'my-courses' : 'courses')) ? 'active' : ''}`}
              key={id}
              onClick={() => go(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {id === 'students' && <span className="nav-count">{total}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          {!isAdmin && (
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <b>¿Necesitás ayuda?</b>
            <p>Estamos acá para darte una mano.</p>
            <button onClick={() => go('support')}>Contactar soporte <ArrowUpRight size={14} /></button>
          </div>
          )}
        </div>
      </aside>

      {mobileOpen && <div className="backdrop" onClick={() => setMobileOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumbs">
            <button className="crumb-back" title="Ir al inicio" onClick={() => go('overview')} disabled={page === 'overview'}>
              Cursitos
            </button>
            {breadcrumbTrail.map((crumb, i) => (
              <Fragment key={i}>
                <ChevronRight size={14} />
                {crumb.page ? (
                  <button className="crumb-back" onClick={() => go(crumb.page)}>{crumb.label}</button>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </div>

          <div className="top-actions">
            <div className="notification-wrap">
              <button className="icon-btn notification" onClick={() => setNotificationOpen(!notificationOpen)} aria-label="Notificaciones">
                <Bell size={18} />
                {notifications.length > 0 && <span className="notification-count">{notifications.length > 99 ? '99+' : notifications.length}</span>}
              </button>
              {notificationOpen && (
                <div className="notification-panel">
                  <div className="notification-head">
                    <b>Notificaciones</b>
                    <button onClick={clearNotifications} aria-label="Cerrar y limpiar notificaciones"><X size={16} /></button>
                  </div>
                  {notifications.length ? (
                    <>
                      <div className="notification-list">
                        {notifications.map(n => (
                          <button type="button" className="notification-item" key={n.id} onClick={() => openNotification(n)}>
                            <span className="notification-symbol"><Bell size={14} /></span>
                            <span className="notification-copy">
                              <b>{n.message}</b>
                              <small>{n.date}</small>
                            </span>
                            <ChevronRight size={14} />
                          </button>
                        ))}
                      </div>
                      <button className="notification-clear" onClick={clearNotifications}>Cerrar y limpiar</button>
                    </>
                  ) : (
                    <p className="notification-empty">No tenés notificaciones nuevas.</p>
                  )}
                </div>
              )}
            </div>

            <button className="icon-btn" onClick={() => setScale(Math.max(85, fontScale - 5))} aria-label="Achicar letra">A−</button>
            <button className="icon-btn" onClick={() => setScale(Math.min(180, fontScale + 5))} aria-label="Agrandar letra">A+</button>
            <button className="icon-btn" onClick={toggleDark}>{dark ? "☀" : "☾"}</button>

            <div className="profile-menu-wrap">
              <button className="top-account" onClick={() => setProfileOpen(!profileOpen)}>
                {profileDraft.avatar && <img className="top-account-avatar" src={profileDraft.avatar} alt="" />}
                <span>{currentUser.name}</span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <b className="profile-dropdown-identity">
                    {profileDraft.avatar && <img className="top-account-avatar" src={profileDraft.avatar} alt="" />}
                    {currentUser.name}
                  </b>
                  <button onClick={() => {
                    setProfileOpen(false);
                    setPage('overview');
                    setIsAdmin(false);
                    localStorage.setItem('aula-signed-out', 'true');
                    localStorage.removeItem('aula-current-user');
                    setCurrentUser({ name: '', email: '', isAdmin: false });
                    setSignedIn(false);
                    setAuthForm({ name: '', email: currentUser.email, password: '', dni: '', birthDate: '' });
                  }}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content">
          {notice && (
            <div className="toast">
              <span className="toast-check"><Check size={15} /></span>
              {notice}
              <button onClick={() => setNotice('')}><X size={15} /></button>
            </div>
          )}

          {page === 'overview' && (
            <>
              <div className="welcome-row">
                <div>
                  <div className="eyebrow"><Sparkles size={14} /> TU ESPACIO DE APRENDIZAJE</div>
                  <h1>¡Hola, {currentUser.name ? currentUser.name.split(' ')[0] : 'estudiante'}! <span className="wave">✦</span></h1>
                  <p>Esto es lo que está pasando en tu academia.</p>
                </div>
              </div>

              <div className={`stats-grid ${isAdmin ? '' : 'stats-grid-user'}`}>
                <Stat icon={BookOpen} label="Cursos activos" value={courses.length} note="En esta temporada" color="violet" onClick={() => go('courses')} />
                {isAdmin && <Stat icon={Users} label="Estudiantes" value={total} note="En todos los cursos" color="blue" onClick={() => go('students')} />}
                <Stat icon={BadgeCheck} label="Inscripciones abiertas" value={active} note="Con cupos disponibles" color="green" onClick={() => go('courses')} />
                <Stat icon={CalendarDays} label="Próximo inicio" value="12 jun" note="Diseño UX/UI · 18:30" color="orange" onClick={() => go('calendar')} />
              </div>

              <div className="section-head">
                <div>
                  <h2>Explorá tus cursos</h2>
                  <p>Elegí un curso para ver sus detalles y estudiantes.</p>
                </div>
                <button className="text-link" onClick={() => go('courses')}>Ver todos <ArrowUpRight size={15} /></button>
              </div>

              <div className="course-grid">
                {courses.filter(c => myCourseIds.includes(c.id)).map(c => (
                  <CourseCard key={c.id} course={c} enrolled onClick={() => choose(c.id)} onWithdraw={() => setWithdrawCandidate(c)} />
                ))}
              </div>
            </>
          )}

          {page === 'profile' && (
            <>
              <PageTitle eyebrow="TU CUENTA" title="Mi perfil" subtitle="Administrá tus datos, preferencias y cursos desde un solo lugar." />
              <div className={`profile-layout ${isAdmin ? 'profile-admin-layout' : ''}`}>
                <section className="panel profile-main">
                  <div className="profile-identity">
                    <label className="profile-avatar-upload" title="Subir o cambiar foto de perfil">
                      {profileDraft.avatar ? <img src={profileDraft.avatar} alt="Foto de perfil" /> : <UserRound size={36} />}
                      <span className="profile-avatar-camera"><Camera size={15} /></span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (!file.type.startsWith('image/')) { setNotice('Elegí un archivo de imagen.'); return; }
                          const reader = new FileReader();
                          reader.onload = () => {
                            const img = new Image();
                            img.onload = () => {
                              const scale = Math.min(1, 512 / Math.max(img.width, img.height));
                              const canvas = document.createElement('canvas');
                              canvas.width = Math.max(1, Math.round(img.width * scale));
                              canvas.height = Math.max(1, Math.round(img.height * scale));
                              canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                              setProfileDraft(v => ({ ...v, avatar: canvas.toDataURL('image/jpeg', 0.84) }));
                            };
                            img.onerror = () => setNotice('No pudimos cargar esa imagen.');
                            img.src = reader.result;
                          };
                          reader.readAsDataURL(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <div className="profile-identity-copy">
                      <span className="eyebrow">PERFIL DE CUENTA</span>
                      <h2>{profileDraft.name || currentUser.name}</h2>
                      <p>{profileDraft.email || currentUser.email}</p>
                      <span className="profile-role-badge">{isAdmin ? 'Administrador' : 'Estudiante'}</span>
                    </div>
                  </div>

                  <form className="profile-edit-form profile-expanded-form" onSubmit={e => {
                    e.preventDefault();
                    const n = profileDraft.name.trim(), em = profileDraft.email.trim().toLowerCase(), oldEmail = currentUser.email;
                    const dniDigits = (profileDraft.dni || '').replace(/\D/g, '');
                    if (!n || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { setNotice('Revisá tu nombre y email.'); return; }
                    if (dniDigits && !/^\d{7,8}$/.test(dniDigits)) { setNotice('El DNI debe tener 7 u 8 dígitos.'); return; }
                    const existingUsers = JSON.parse(localStorage.getItem('aula-users') || '[]');
                    if (dniDigits) {
                      const duplicateProfile = existingUsers.some(u => u.email?.toLowerCase() !== oldEmail?.toLowerCase() && (() => {
                        try { return (JSON.parse(localStorage.getItem(`aula-user:${u.email}:profile`) || '{}').dni || '').replace(/\D/g, '') === dniDigits; } catch { return false; }
                      })());
                      const duplicateRoster = courses.some(c => c.students.some(st => (st.dni || '').replace(/\D/g, '') === dniDigits && st.email?.toLowerCase() !== oldEmail?.toLowerCase()));
                      if (duplicateProfile || duplicateRoster) { setNotice('Ese DNI ya está asociado a otra cuenta o matrícula.'); return; }
                    }
                    if (em !== oldEmail && (em === 'admin@itsc.edu.ar' || existingUsers.some(u => u.email?.toLowerCase() === em))) {
                      setNotice('Ya existe una cuenta con ese email.');
                      return;
                    }
                    const users = existingUsers.map(u => u.email?.toLowerCase() === oldEmail?.toLowerCase() ? { ...u, name: n, email: em } : u);
                    if (!isAdmin && !users.some(u => u.email?.toLowerCase() === em)) users.push({ name: n, email: em, isAdmin: false });
                    localStorage.setItem('aula-users', JSON.stringify(users));
                    if (em !== oldEmail && oldEmail) {
                      const oldKey = `aula-user:${oldEmail}`, newKey = `aula-user:${em}`;
                      ['courses', 'waitlist', 'enrollments', 'notifications', 'payment-brand', 'profile'].forEach(suffix => {
                        const value = localStorage.getItem(`${oldKey}:${suffix}`);
                        if (value !== null) { localStorage.setItem(`${newKey}:${suffix}`, value); localStorage.removeItem(`${oldKey}:${suffix}`); }
                      });
                      persist(courses.map(c => ({ ...c, students: c.students.map(st => st.email === oldEmail ? { ...st, email: em } : st) })));
                    }
                    const details = { phone: profileDraft.phone || '', dni: profileDraft.dni || '', birthDate: profileDraft.birthDate || '', avatar: profileDraft.avatar || '' };
                    localStorage.setItem(`aula-user:${em}:profile`, JSON.stringify(details));
                    const updatedUser = { ...currentUser, name: n, email: em, ...details };
                    setCurrentUser(updatedUser);
                    localStorage.setItem('aula-current-user', JSON.stringify(updatedUser));
                    setCheckout(v => ({ ...v, email: em, dni: details.dni }));
                    setProfileDraft({ name: n, email: em, ...details });
                    setProfileBaseline({ name: n, email: em, ...details });
                    setNotice('Perfil actualizado correctamente.');
                  }}>
                    <h3>Datos personales</h3>
                    <div className="profile-form-grid">
                      <label>Nombre y apellido
                        <input required value={profileDraft.name || ''} onChange={e => setProfileDraft({ ...profileDraft, name: e.target.value })} />
                      </label>
                      <label>Email
                        <input required type="email" readOnly={isAdmin} value={profileDraft.email || ''} onChange={e => setProfileDraft({ ...profileDraft, email: e.target.value })} />
                      </label>
                      <label>Teléfono
                        <input type="tel" placeholder="Ej. +54 9 11 5555 5555" value={profileDraft.phone || ''} onChange={e => setProfileDraft({ ...profileDraft, phone: e.target.value })} />
                      </label>
                      <label>DNI
                        <input inputMode="numeric" placeholder="7 u 8 dígitos" value={profileDraft.dni || ''} onChange={e => setProfileDraft({ ...profileDraft, dni: e.target.value })} />
                      </label>
                      <label>Fecha de nacimiento
                        <input type="date" value={profileDraft.birthDate || ''} onChange={e => setProfileDraft({ ...profileDraft, birthDate: e.target.value })} />
                      </label>
                    </div>
                    <div className="profile-save-row">
                      <button className="primary-btn" type="submit" disabled={!profileDirty}>Guardar cambios</button>
                      {profileDraft.avatar && <button type="button" className="outline-btn" onClick={() => setProfileDraft({ ...profileDraft, avatar: '' })}>Quitar foto</button>}
                    </div>
                  </form>
                </section>

                {!isAdmin && (
                  <aside className="profile-side-column">
                    <section className="panel profile-self-service">
                      <h2>Autogestión</h2>
                      <p>Accesos rápidos para manejar tu experiencia.</p>
                      <button onClick={() => go('my-courses')}><GraduationCap size={17} />Mis cursos<ChevronRight size={15} /></button>
                      <button onClick={() => go('courses')}><BookOpen size={17} />Explorar cursos<ChevronRight size={15} /></button>
                      <button onClick={() => go('support')}><CircleHelp size={17} />Contactar soporte<ChevronRight size={15} /></button>
                      <button onClick={() => go('calendar')}><CalendarDays size={17} />Calendario de clases<ChevronRight size={15} /></button>
                    </section>

                    <section className="panel profile-settings profile-expanded-settings">
                      <h2>Método de pago preferido</h2>
                      <p>Elegí qué opción querés usar en tu próxima inscripción.</p>
                      <select value={cardBrand} onChange={e => { setCardBrand(e.target.value); localStorage.setItem(`${userKey}:payment-brand`, e.target.value); }}>
                        {["Visa", "Mastercard", "American Express", "Cabal", "PayPal"].map(x => <option key={x}>{x}</option>)}
                      </select>
                      <small className="profile-payment-hint">Por seguridad, los datos completos de la tarjeta se ingresan al pagar y no se guardan en el perfil.</small>
                      <button type="button" className="outline-btn profile-notifications-action" onClick={clearNotifications}>Limpiar notificaciones ({notifications.length})</button>
                    </section>

                    <section className="panel profile-danger-zone">
                      <h2>Zona de cuenta</h2>
                      <p>Eliminar la cuenta borra tu perfil, preferencias y matrículas guardadas en esta aplicación. Esta acción no se puede deshacer.</p>
                      <button type="button" className="profile-delete-account" onClick={() => setDeleteAccountCandidate(true)}><Trash2 size={16} />Eliminar mi cuenta</button>
                    </section>
                  </aside>
                )}
              </div>
            </>
          )}

          {page === 'my-courses' && (
            <>
              <PageTitle eyebrow="TU APRENDIZAJE" title="Mis cursos" subtitle={`${myCourseIds.length} cursos en los que estás inscripto.`} />
              <div className="course-grid">
                {courses.filter(c => myCourseIds.includes(c.id)).map(c => (
                  <CourseCard key={c.id} course={c} enrolled onClick={() => choose(c.id)} onWithdraw={() => setWithdrawCandidate(c)} />
                ))}
              </div>
              {myCourseIds.length === 0 && <Empty title="Todavía no estás inscripto" text="Explorá los cursos disponibles y elegí dónde empezar." />}
            </>
          )}

          {page === 'courses' && (
            <>
              <PageTitle
                eyebrow={isAdmin ? "ADMINISTRACIÓN" : "TU OFERTA ACADÉMICA"}
                title="Todos los cursos"
                subtitle={`${courses.length} cursos para aprender y crecer.`}
                action={isAdmin && <button className="primary-btn" onClick={() => go('manage')}><Settings size={15} /> Administrar cursos</button>}
              />
              <div className="filters">
                <div className="search-box">
                  <Search size={17} />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar cursos o docentes…" />
                  <kbd>⌘ K</kbd>
                </div>
                <div className="filter-chips">
                  <SlidersHorizontal size={15} />
                  {['Todos', 'Diseño', 'Tecnología', 'Marketing', 'Negocios'].map(x => (
                    <button key={x} onClick={() => setFilter(x)} className={filter === x ? 'chosen' : ''}>{x}</button>
                  ))}
                </div>
              </div>
              {!isAdmin && (
                <div className="catalog-toolbar">
                  <button className="outline-btn" onClick={() => setHideEnrolled(!hideEnrolled)}>
                    {hideEnrolled ? "Mostrar cursos inscriptos" : "Ocultar cursos inscriptos"}
                  </button>
                  <span>Los cursos inscriptos aparecen primero</span>
                </div>
              )}
              <div className="course-grid all-courses">
                {[...filteredCourses]
                  .filter(c => !hideEnrolled || !myCourseIds.includes(c.id))
                  .sort((a, b) => Number(myCourseIds.includes(b.id)) - Number(myCourseIds.includes(a.id)))
                  .map(c => (
                    <CourseCard key={c.id} course={c} enrolled={myCourseIds.includes(c.id)} onClick={() => choose(c.id)} onWithdraw={() => setWithdrawCandidate(c)} />
                  ))}
              </div>
              {!filteredCourses.length && <Empty title="No encontramos cursos" text="Probá con otra búsqueda o categoría." />}
            </>
          )}

          {page === 'detail' && (
            <>
              <button className="back-link" onClick={() => go(courseReturnPage)}>
                ‹ &nbsp;{courseReturnPage === 'my-courses' ? 'Volver a mis cursos' : 'Volver a cursos'}
              </button>
              <div className={`detail-hero ${sel.color}`}>
                <div className="detail-art"><CourseGlyph course={sel} /></div>
                <div className="detail-copy">
                  <span className="category-tag">{sel.category}</span>
                  <h1>{sel.title}</h1>
                  <p>{sel.description}</p>
                  <div className="detail-price">
                    <b>{money(sel.monthlyPrice)}</b>
                    <span>por mes</span>
                    {isAdmin ? (
                      sel.students.length >= sel.capacity ? (
                        <button className="waitlist-cta" onClick={() => go('manage')}>Curso completo · Gestionar cupos</button>
                      ) : (
                        <button className="enroll-cta" onClick={() => { setAdminEnrollmentDraft({ account: '', first: '', last: '', dni: '', birthDate: '' }); go('admin-enroll'); }}>
                          <UserPlus size={14} /> Inscribir alumno
                        </button>
                      )
                    ) : myCourseIds.includes(sel.id) ? (
                      <>
                        <span className="already-enrolled"><Check size={14} /> Ya estás inscripto</span>
                        <button className="withdraw-detail" onClick={() => setWithdrawCandidate(sel)}>Darme de baja</button>
                      </>
                    ) : sel.students.length >= sel.capacity ? (
                      <button className="waitlist-cta" onClick={joinWaitlist}>
                        {waitlistIds.includes(sel.id) ? 'En lista de espera' : 'Unirme a lista de espera'}
                      </button>
                    ) : (
                      <button className="enroll-cta" onClick={() => go('checkout')}>¡Inscribite!</button>
                    )}
                  </div>
                  <div className="detail-meta">
                    <span><Clock3 size={15} />{sel.duration}</span>
                    <span>{sel.modality.includes('online') ? <Video size={15} /> : <MapPin size={15} />} {sel.modality}</span>
                    <span><CalendarDays size={15} />{sel.schedule}</span>
                  </div>
                </div>
                <div className="detail-cta"><CapacityPill course={sel} /></div>
              </div>

              <div className="detail-columns">
                <section className="panel course-about">
                  <div className="panel-heading">
                    <div>
                      <h2>Sobre este curso</h2>
                      <p>Todo lo que necesitás saber antes de empezar.</p>
                    </div>
                  </div>
                  <p className="about-description">
                    {sel.description} A lo largo de las clases vas a trabajar en proyectos reales, recibir feedback personalizado y compartir ideas con una comunidad que aprende junto a vos.
                  </p>
                  <div className="instructor">
                    <div className="instructor-avatar">{sel.initials}</div>
                    <div><small>DOCENTE</small><b>{sel.instructor}</b></div>
                    <span className="instructor-badge"><BadgeCheck size={14} /> Verificado</span>
                  </div>
                  <div className="course-facts">
                    <div><Clock3 size={17} /><span><small>Duración</small><b>{sel.duration}</b></span></div>
                    <div>{sel.modality.includes('online') ? <Video size={17} /> : <MapPin size={17} />}<span><small>Modalidad</small><b>{sel.modality}</b></span></div>
                    <div><CalendarDays size={17} /><span><small>Horario</small><b>{sel.schedule}</b></span></div>
                  </div>
                </section>

                <section className="panel roster-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Alumnos matriculados</h2>
                      <p>{sel.students.length} de {sel.capacity} lugares ocupados</p>
                    </div>
                    <span className="roster-total">{sel.students.length}</span>
                  </div>
                  <div className="capacity-bar">
                    <span style={{ width: `${Math.min(sel.students.length / sel.capacity * 100, 100)}%` }} />
                  </div>
                  <CapacityPill course={sel} fullWidth />
                  {free > 0 && (
                    <div className="seats-note">
                      <span className="pulse-dot" />Quedan {free} {free === 1 ? 'lugar disponible' : 'lugares disponibles'}
                    </div>
                  )}
                </section>
              </div>

              <section className="panel syllabus-panel" aria-labelledby="course-syllabus-title">
                <div className="syllabus-heading">
                  <div className="syllabus-heading-icon"><BookOpen size={20} /></div>
                  <div>
                    <span className="eyebrow">PROGRAMA DE ESTUDIO</span>
                    <h2 id="course-syllabus-title">Temario por módulos</h2>
                    <p>Un recorrido progresivo, desde los fundamentos hasta la aplicación práctica.</p>
                  </div>
                  <span className="syllabus-count">{sel.modules?.length || 0} módulos</span>
                </div>
                <div className="syllabus-list">
                  {(sel.modules || []).map((module, index) => (
                    <article className="syllabus-module" key={`${sel.id}-module-${index}`}>
                      <span className="syllabus-number">{String(index + 1).padStart(2, '0')}</span>
                      <div className="syllabus-module-content">
                        <span className="syllabus-level">{index === 0 ? 'FUNDAMENTOS' : index === sel.modules.length - 1 ? 'INTEGRACIÓN Y PRÁCTICA' : 'NIVEL PROGRESIVO'}</span>
                        <h3>{module.title}</h3>
                        <ul>
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {(isAdmin || myCourseIds.includes(sel.id)) ? (
                <>
                  <div className="section-head roster-title">
                    <div>
                      <h2>Compañeros de cursada <span className="muted-count">({sel.students.length})</span></h2>
                      <p>Personas que van a compartir esta experiencia con vos.</p>
                    </div>
                    <div className="roster-actions">
                      <div className="search-box mini">
                        <Search size={15} />
                        <input placeholder="Buscar alumno…" value={studentQuery} onChange={e => setStudentQuery(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <StudentTable
                    rows={(showAll ? filteredStudents : filteredStudents.slice(0, 6)).map(s => ({ ...s, courseTitle: sel.title }))}
                    showCourse={false}
                    onRemove={isAdmin ? s => setRemoveStudentCandidate({ courseId: sel.id, dni: s.dni, student: s, courseTitle: sel.title }) : undefined}
                    onEditGrade={isAdmin ? (s, i, v) => setEditing({ courseId: sel.id, dni: s.dni, index: i, value: v, student: s }) : undefined}
                  />
                  {filteredStudents.length > 6 && (
                    <button className="load-more" onClick={() => setShowAll(!showAll)}>
                      {showAll ? 'Ver menos' : 'Ver todos los ' + filteredStudents.length + ' alumnos'} <ChevronDown size={15} />
                    </button>
                  )}
                  {filteredStudents.length === 0 && <Empty title="No hay resultados" text="Probá con otro nombre, DNI o email." />}
                </>
              ) : (
                <section className="panel roster-locked">
                  <div className="empty-icon"><Users size={20} /></div>
                  <h2>Compañeros de cursada</h2>
                  <p>Inscribite en este curso para ver la lista de alumnos y compartir el tablón con tu grupo.</p>
                </section>
              )}

              <section className="panel class-board" id="class-board">
                <div className="panel-heading">
                  <div>
                    <h2>Tablón de clases</h2>
                    <p>Anuncios y novedades de este curso.</p>
                  </div>
                </div>
                {(isAdmin || myCourseIds.includes(sel.id)) && (
                  <form className="announcement-form" onSubmit={e => { e.preventDefault(); postAnnouncement(); }}>
                    <textarea
                      required
                      rows="3"
                      placeholder={isAdmin ? "Escribí un anuncio para tus alumnos…" : "Compartí una novedad con tus compañeros…"}
                      value={announcementDraft}
                      onChange={e => setAnnouncementDraft(e.target.value)}
                    />
                    <button className="primary-btn"><Plus size={15} /> Publicar mensaje</button>
                  </form>
                )}
                <div className="announcement-list">
                  {(sel.announcements || []).map(a => (
                    <article className="announcement" key={a.id}>
                      <div className="announcement-heading">
                        <div><b>{a.author}</b><small>{a.date}</small></div>
                        {isAdmin && (
                          <button type="button" className="announcement-delete" aria-label={`Eliminar mensaje de ${a.author}`} title="Eliminar mensaje" onClick={() => setDeleteAnnouncementCandidate({ courseId: sel.id, courseTitle: sel.title, announcement: a })}>
                            <Trash2 size={15} /><span>Eliminar</span>
                          </button>
                        )}
                      </div>
                      <p>{a.text}</p>
                    </article>
                  ))}
                </div>
                {(!sel.announcements || !sel.announcements.length) && <p className="announcement-empty">Todavía no hay anuncios para este curso.</p>}
              </section>
            </>
          )}

          {page === 'students' && isAdmin && (
            <>
              <PageTitle eyebrow="TU COMUNIDAD" title="Estudiantes" subtitle={`${total} personas aprendiendo en ${courses.length} cursos.`} />
              <div className="student-controls">
                <div className="search-box">
                  <Search size={17} />
                  <input placeholder="Buscar por nombre, DNI o email…" value={studentQuery} onChange={e => setStudentQuery(e.target.value)} />
                </div>
                <select value={courseQuery} onChange={e => setCourseQuery(e.target.value)}>
                  <option value="">Todos los cursos</option>
                  {courses.map(c => <option value={c.id} key={c.id}>{c.title}</option>)}
                </select>
              </div>
              <StudentTable
                rows={courses.filter(c => !courseQuery || c.id === courseQuery).flatMap(c => c.students.map(s => ({ ...s, courseId: c.id, courseTitle: c.title, courseColor: c.color }))).filter(s => (s.first + ' ' + s.last + ' ' + s.dni + ' ' + s.email + ' ' + s.courseTitle).toLowerCase().includes(studentQuery.toLowerCase()))}
                onRemove={s => setRemoveStudentCandidate({ courseId: s.courseId, dni: s.dni, student: s, courseTitle: s.courseTitle })}
              />
            </>
          )}

          {page === 'admin-enroll' && isAdmin && (
            <>
              <button className="back-link" onClick={() => go('detail')}>‹ &nbsp;Volver al curso</button>
              <PageTitle eyebrow="INSCRIPCIÓN ADMINISTRATIVA" title={`Inscribir alumno · ${sel.title}`} subtitle="Elegí una cuenta registrada y completá los datos del alumno." />
              <form className="panel course-edit-form admin-student-form" onSubmit={enrollStudentByAdmin}>
                <label>Cuenta registrada
                  <select
                    required
                    value={adminEnrollmentDraft.account}
                    onChange={e => {
                      const email = e.target.value, account = registeredAccounts.find(u => u.email === email);
                      let details = {};
                      if (account) { details = JSON.parse(localStorage.getItem(`aula-user:${email}:profile`) || '{}'); }
                      const [first, ...rest] = (account?.name || '').trim().split(/\s+/);
                      setAdminEnrollmentDraft({ ...adminEnrollmentDraft, account: email, first: first || '', last: rest.join(' '), dni: details.dni || '', birthDate: details.birthDate || '' });
                    }}
                  >
                    <option value="">Seleccioná una cuenta</option>
                    {registeredAccounts.map(u => <option key={u.email} value={u.email}>{u.name} · {u.email}</option>)}
                  </select>
                </label>
                {registeredAccounts.length === 0 && <p className="account-empty-note">Todavía no hay cuentas de estudiantes registradas. Primero deben crear una cuenta desde el inicio de sesión.</p>}
                <label>Nombre<input required value={adminEnrollmentDraft.first} onChange={e => setAdminEnrollmentDraft({ ...adminEnrollmentDraft, first: e.target.value })} /></label>
                <label>Apellido<input required value={adminEnrollmentDraft.last} onChange={e => setAdminEnrollmentDraft({ ...adminEnrollmentDraft, last: e.target.value })} /></label>
                <label>DNI<input required inputMode="numeric" maxLength="10" placeholder="7 u 8 dígitos" value={adminEnrollmentDraft.dni} onChange={e => setAdminEnrollmentDraft({ ...adminEnrollmentDraft, dni: e.target.value })} /></label>
                <label>Fecha de nacimiento<input required type="date" max={todayDate()} value={adminEnrollmentDraft.birthDate} onChange={e => setAdminEnrollmentDraft({ ...adminEnrollmentDraft, birthDate: e.target.value })} /></label>
                <div className="course-edit-actions">
                  <button type="button" className="outline-btn" onClick={() => go('detail')}>Cancelar</button>
                  <button className="primary-btn" type="submit" disabled={!registeredAccounts.length}>Inscribir alumno</button>
                </div>
              </form>
            </>
          )}

          {page === 'edit-course' && editDraft && (
            <>
              <button className="back-link" onClick={() => go('manage')}>‹ &nbsp;Volver a cursos</button>
              <PageTitle eyebrow="ADMINISTRACIÓN" title="Modificar curso" subtitle="Actualizá la información del curso." />
              <form className="panel course-edit-form" onSubmit={e => {
                e.preventDefault();
                persist(courses.map(c => c.id === editCourseId ? { ...c, ...editDraft, schedule: editDraft.startTime ? 'Inicio ' + editDraft.startTime : c.schedule, capacity: Math.max(c.students.length, Number(editDraft.capacity) || c.capacity) } : c));
                go('manage');
                setNotice('Los datos del curso se actualizaron.');
              }}>
                <label>Nombre del curso<input required value={editDraft.title} onChange={e => setEditDraft({ ...editDraft, title: e.target.value })} /></label>
                <label>Nombre del docente<input required value={editDraft.instructor} onChange={e => setEditDraft({ ...editDraft, instructor: e.target.value, initials: e.target.value.split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase() })} /></label>
                <label>Precio mensual (ARS)<input required type="number" min="0" value={editDraft.monthlyPrice || 0} onChange={e => setEditDraft({ ...editDraft, monthlyPrice: Number(e.target.value) })} /></label>
                <label>Fecha de inicio<input type="date" min={todayDate()} required value={editDraft.startDate || ''} onChange={e => setEditDraft({ ...editDraft, startDate: e.target.value })} /></label>
                <label>Hora de inicio<input type="time" required value={editDraft.startTime || ''} onChange={e => setEditDraft({ ...editDraft, startTime: e.target.value })} /></label>
                <label>Duración<input required value={editDraft.duration} onChange={e => setEditDraft({ ...editDraft, duration: e.target.value })} placeholder="Ej. 6 meses o 1 año" /></label>
                <label>Cupos totales
                  <input required type="number" min={editDraft.students.length} value={editDraft.capacity} onChange={e => setEditDraft({ ...editDraft, capacity: e.target.value })} />
                  <small>Debe ser igual o mayor a los {editDraft.students.length} alumnos matriculados.</small>
                </label>
                <div className="course-edit-actions">
                  <button type="button" className="outline-btn" onClick={() => go('manage')}>Cancelar</button>
                  <button type="submit" className="primary-btn">Guardar cambios</button>
                </div>
              </form>
            </>
          )}

          {page === 'add-course' && (
            <>
              <button className="back-link" onClick={() => go('manage')}>‹ &nbsp;Volver a administración</button>
              <PageTitle eyebrow="ADMINISTRACIÓN" title="Nuevo curso" subtitle="Completá los datos y programá el inicio." />
              <form className="panel course-edit-form" onSubmit={e => {
                e.preventDefault();
                const c = { ...newCourseDraft, modules: courseModulesFor(newCourseDraft), id: Date.now().toString(), color: 'lavender', icon: '✦', initials: newCourseDraft.instructor.split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase(), schedule: 'Inicio ' + newCourseDraft.startTime, modality: 'En vivo online', students: [], announcements: [], paymentMethods: ['QR', 'Tarjeta'] };
                persist([...courses, c]);
                setNewCourseDraft({ title: '', instructor: '', category: 'Tecnología', description: '', duration: '8 semanas', capacity: 20, monthlyPrice: 39000, startDate: '', startTime: '' });
                go('manage');
                setNotice('Curso creado.');
              }}>
                <label>Nombre del curso<input required value={newCourseDraft.title} onChange={e => setNewCourseDraft({ ...newCourseDraft, title: e.target.value })} /></label>
                <label>Docente<input required value={newCourseDraft.instructor} onChange={e => setNewCourseDraft({ ...newCourseDraft, instructor: e.target.value })} /></label>
                <label>Categoría
                  <select value={newCourseDraft.category} onChange={e => setNewCourseDraft({ ...newCourseDraft, category: e.target.value })}>
                    {['Diseño', 'Tecnología', 'Marketing', 'Negocios', 'Otros'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                <label>Descripción<textarea required value={newCourseDraft.description} onChange={e => setNewCourseDraft({ ...newCourseDraft, description: e.target.value })} /></label>
                <div className="checkout-grid">
                  <label>Fecha de inicio<input type="date" min={todayDate()} required value={newCourseDraft.startDate} onChange={e => setNewCourseDraft({ ...newCourseDraft, startDate: e.target.value })} /></label>
                  <label>Hora de inicio<input type="time" required value={newCourseDraft.startTime} onChange={e => setNewCourseDraft({ ...newCourseDraft, startTime: e.target.value })} /></label>
                  <label>Duración<input required value={newCourseDraft.duration} onChange={e => setNewCourseDraft({ ...newCourseDraft, duration: e.target.value })} /></label>
                  <label>Cupos<input type="number" min="1" required value={newCourseDraft.capacity} onChange={e => setNewCourseDraft({ ...newCourseDraft, capacity: Number(e.target.value) })} /></label>
                  <label>Precio mensual<input type="number" min="0" required value={newCourseDraft.monthlyPrice} onChange={e => setNewCourseDraft({ ...newCourseDraft, monthlyPrice: Number(e.target.value) })} /></label>
                </div>
                <div className="course-edit-actions">
                  <button type="button" className="outline-btn" onClick={() => go('manage')}>Cancelar</button>
                  <button className="primary-btn">Crear curso</button>
                </div>
              </form>
            </>
          )}

          {page === 'manage' && (
            <>
              <PageTitle eyebrow="ADMINISTRACIÓN" title="Cursos disponibles" subtitle="Revisá y modificá la oferta académica." />
              <div className="course-grid">
                {courses.map(c => (
                  <div className="panel" key={c.id}>
                    <h3>{c.title}</h3>
                    <p>{c.category} · {c.capacity} cupos · {c.instructor}</p>
                    <button className="remove-btn manage-edit" onClick={() => { setEditCourseId(c.id); setEditDraft({ ...c }); go('edit-course'); }}>Modificar</button>{" "}
                    <button className="remove-btn" onClick={() => setDeleteCourseCandidate(c)}>Quitar</button>
                  </div>
                ))}
              </div>
              <button className="primary-btn" onClick={() => { setNewCourseDraft({ title: "", instructor: "", category: "Tecnología", description: "", duration: "8 semanas", capacity: 20, monthlyPrice: 39000, startDate: "", startTime: "" }); go("add-course"); }}>
                <Plus size={16} /> Agregar curso
              </button>
            </>
          )}

          {page === 'calendar' && (
            <>
              <PageTitle eyebrow="AGENDA" title="Inicio de clases" subtitle="Fechas próximas." />
              <div className="calendar-list">
                {courses.map((c, i) => (
                  <div className="panel calendar-item" key={c.id}>
                    <b>{formatCourseStart(c, i)}</b>
                    <span>{c.title} · {c.startTime || c.schedule}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === 'settings' && (
            <>
              <PageTitle eyebrow="PREFERENCIAS" title="Apariencia" subtitle="Ajustá la lectura." />
              <div className="panel font-controls">
                <button onClick={() => setScale(Math.max(85, fontScale - 5))}>A−</button>
                <span>{fontScale}%</span>
                <button onClick={() => setScale(Math.min(125, fontScale + 5))}>A+</button>
                <button onClick={toggleDark}>Modo claro/oscuro</button>
              </div>
            </>
          )}

          {page === 'support' && (
            <>
              <PageTitle eyebrow="SOPORTE" title="Contactar soporte" subtitle="Escribinos tu consulta." />
              <form className="panel support-form" onSubmit={e => {
                  e.preventDefault(); // evita que el navegador intente enviar el form
                
                  const form = e.currentTarget;
                  if (!form.checkValidity()) { form.reportValidity(); return; }
                
                  const data = new FormData(form);
                  const subject = String(data.get('asunto') || '').trim();
                  const message = String(data.get('mensaje') || '').trim();
                  if (!subject || !message) return;
                
                  const ticket = { id: Date.now(), name: currentUser.name, email: currentUser.email, subject, message, receivedAt: new Date().toLocaleString('es-AR'), replies: [], status: 'pendiente' };
                  const next = [ticket, ...supportMessages];
                  setSupportMessages(next);
                  localStorage.setItem('aula-support-messages', JSON.stringify(next));
                  if (!isAdmin) saveAccountNotification('admin@itsc.edu.ar', { id: Date.now() + Math.random(), message: `Nuevo mensaje de soporte de ${currentUser.name}: ${subject}`, date: ticket.receivedAt, type: 'support-inbox', ticketId: ticket.id });
                  setNotice('Tu consulta quedó registrada para soporte.');
                  form.reset(); // limpia asunto y mensaje
                }}>
                <label>Nombre<input name="nombre" value={currentUser.name} readOnly /></label>
                <label>Email<input name="email" type="email" value={currentUser.email} readOnly /></label>
                <label>Asunto<input name="asunto" required placeholder="¿En qué podemos ayudarte?" /></label>
                <label>Mensaje<textarea name="mensaje" rows="5" required placeholder="Escribí tu consulta…" /></label>
                <button className="primary-btn"><Mail size={15} /> Enviar mail</button>
              </form>

              {supportMessages.some(m => String(m.email || '').toLowerCase() === currentUser.email?.toLowerCase()) && (
                <section className="support-my-messages">
                  <PageTitle eyebrow="SEGUIMIENTO" title="Mis consultas" subtitle="Revisá tus mensajes y las respuestas del equipo de soporte." />
                  {supportMessages.filter(m => String(m.email || '').toLowerCase() === currentUser.email?.toLowerCase()).map(m => (
                    <article className="panel support-user-ticket" id={`support-ticket-${m.id}`} key={m.id}>
                      <div className="support-message-heading">
                        <div><span className="support-message-label">ASUNTO</span><h2>{m.subject}</h2></div>
                        <span className={`support-ticket-status ${(m.replies || []).length ? 'is-answered' : ''}`}>{(m.replies || []).length ? 'Respondido' : 'Pendiente'}</span>
                      </div>
                      <time className="support-user-date">Enviado {m.receivedAt}</time>
                      <div className="support-message-body">
                        <span>TU MENSAJE</span>
                        <p>{m.message}</p>
                      </div>
                      {(m.replies || []).map(reply => (
                        <div className={`support-reply support-reply-user ${reply.from === 'student' ? 'from-student' : ''}`} key={reply.id}>
                          <div><b>{reply.from === 'student' ? 'Tu respuesta' : 'Respuesta de soporte'}</b><time>{reply.createdAt}</time></div>
                          <p>{reply.message}</p>
                        </div>
                      ))}
                      <form className="support-reply-form" onSubmit={e => replyToTicket(e, m.id)}>
                        <label>Responder en esta consulta<textarea name="reply" required rows="2" placeholder="Escribí tu respuesta…" /></label>
                        <button className="primary-btn"><Mail size={15} /> Enviar respuesta</button>
                      </form>
                    </article>
                  ))}
                </section>
              )}
            </>
          )}

          {page === 'support-inbox' && isAdmin && (
            <>
              <PageTitle eyebrow="ADMINISTRACIÓN" title="Bandeja de soporte" subtitle={`${supportMessages.length} ${supportMessages.length === 1 ? 'consulta recibida' : 'consultas recibidas'}.`} />
              {supportMessages.length ? (
                <div className="support-inbox-list">
                  {supportMessages.map(m => (
                    <article className="panel support-message-card" id={`support-admin-ticket-${m.id}`} key={m.id}>
                      <div className="support-message-heading">
                       <div><span className="support-message-label">ASUNTO</span><h2>{m.subject}</h2></div>
                       <div className="support-message-actions">
                         <time>{m.receivedAt}</time>
                         <button type="button" className="announcement-delete" onClick={() => setDeleteTicketCandidate(m)}>
                           <Trash2 size={15} /><span>Eliminar</span>
                         </button>
                       </div>
                     </div>
                      <div className="support-message-sender">
                        <span><UserRound size={15} />{m.name}</span>
                        <a href={`mailto:${m.email}`}><Mail size={15} />{m.email}</a>
                      </div>
                      <div className="support-message-body">
                        <span>MENSAJE</span>
                        <p>{m.message}</p>
                      </div>
                      {(m.replies || []).map(reply => (
                        <div className={`support-reply ${reply.from === 'student' ? 'from-student' : ''}`} key={reply.id}>
                          <div><b>{reply.from === 'student' ? 'Respuesta del estudiante' : 'Respuesta enviada'}</b><time>{reply.createdAt}</time></div>
                          <p>{reply.message}</p>
                        </div>
                      ))}
                      <form className="support-reply-form" onSubmit={e => replyToSupport(e, m.id)}>
                        <label>Responder como soporte<textarea name="reply" required rows="3" placeholder={`Escribí una respuesta para ${m.name}…`} /></label>
                        <button className="primary-btn"><Mail size={15} /> Enviar respuesta</button>
                      </form>
                    </article>
                  ))}
                </div>
              ) : (
                <Empty title="Todavía no hay consultas" text="Los mensajes enviados desde Contactar soporte van a aparecer acá." />
              )}
            </>
          )}

          {page === 'checkout' && (
            <>
              <button className="back-link" onClick={() => go('detail')}>‹ &nbsp;Volver al curso</button>
              <PageTitle eyebrow="INSCRIPCIÓN Y PAGO" title={`Inscripción · ${sel.title}`} subtitle={`Aboná ${money(sel.monthlyPrice)} por mes mediante ${paymentMethod}.`} />
              <div className="checkout-layout">
                <form className="panel checkout-form" noValidate onSubmit={e => {
                  e.preventDefault();
                  if (!checkout.name.trim()) { setPaymentError('Ingresá el nombre del titular.'); return; }
                  if (!checkout.last.trim()) { setPaymentError('Ingresá el apellido del titular.'); return; }
                  if (!/^\S+@\S+\.\S+$/.test(checkout.email.trim())) { setPaymentError('Ingresá un email válido.'); return; }
                  if (!checkout.dni.trim()) { setPaymentError('Ingresá el DNI del titular.'); return; }
                  const dniDigits = checkout.dni.replace(/\D/g, '');
                  if (!/^\d{7,8}$/.test(dniDigits)) { setPaymentError('El DNI argentino debe tener 7 u 8 dígitos. Podés escribirlo con puntos.'); return; }
                  if (paymentMethod === 'Tarjeta') {
                    const digits = checkout.card.replace(/\D/g, '');
                    if (digits.length < 13 || digits.length > 19) { setPaymentError('El número de tarjeta debe tener entre 13 y 19 dígitos.'); return; }
                    const now = new Date();
                    const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
                    if (!checkout.expiry) { setPaymentError('Ingresá el vencimiento de la tarjeta.'); return; }
                    if (checkout.expiry <= today) { setPaymentError('La tarjeta está vencida o vence hoy. Ingresá una fecha de vencimiento futura.'); return; }
                    if (!/^\d{3,4}$/.test(checkout.cvv)) { setPaymentError('El CVV debe tener 3 o 4 dígitos.'); return; }
                  }
                  processPayment();
                }}>
                  <h2>Datos del titular</h2>
                  <div className="checkout-grid">
                    <label>Nombre<input required value={checkout.name} onChange={e => setCheckout({ ...checkout, name: e.target.value })} /></label>
                    <label>Apellido<input required value={checkout.last} onChange={e => setCheckout({ ...checkout, last: e.target.value })} /></label>
                    <label>Email<input required type="email" value={checkout.email} onChange={e => setCheckout({ ...checkout, email: e.target.value })} placeholder="tu@email.com" /></label>
                    <label>DNI<input required inputMode="numeric" maxLength="10" placeholder="Ej. 42.315.678" value={checkout.dni} onChange={e => setCheckout({ ...checkout, dni: e.target.value })} /></label>
                  </div>
                  <div className="payment-switch">
                    <button type="button" className={paymentMethod === 'QR' ? 'selected' : ''} onClick={() => setPaymentMethod('QR')}>Pagar con QR</button>
                    <button type="button" className={paymentMethod === 'Tarjeta' ? 'selected' : ''} onClick={() => setPaymentMethod('Tarjeta')}>Pagar con tarjeta</button>
                  </div>
                  <div className="payment-policy-notice" role="note">
                    <span className="payment-policy-days">10</span>
                    <div>
                      <strong>Tenés 10 días para cancelar la inscripción</strong>
                      <p>Si no la cancelás dentro de ese plazo, la cuota se cobrará normalmente con el método indicado: {paymentMethod}.</p>
                    </div>
                  </div>
                  {paymentMethod === 'Tarjeta' ? (
                    <>
                      <h3>Datos de tarjeta</h3>
                      <label>Tarjeta / medio de pago
                        <select value={cardBrand} onChange={e => setCardBrand(e.target.value)}>
                          {["Visa", "Mastercard", "American Express", "Cabal", "PayPal"].map(x => <option key={x}>{x}</option>)}
                        </select>
                      </label>
                      <label>Número de tarjeta
                        <input required inputMode="numeric" maxLength="19" placeholder="0000 0000 0000 0000" value={checkout.card} onChange={e => setCheckout({ ...checkout, card: e.target.value })} />
                      </label>
                      <div className="checkout-grid">
                        <label>Vencimiento
                          <input required type="date" value={checkout.expiry} onChange={e => {
                            const value = e.target.value;
                            setCheckout({ ...checkout, expiry: value });
                            const now = new Date();
                            const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
                            if (value && value <= today) setPaymentError('La tarjeta está vencida o vence hoy. Ingresá una fecha de vencimiento futura.');
                            else setPaymentError('');
                          }} />
                        </label>
                        <label>CVV
                          <input required inputMode="numeric" maxLength="4" pattern="[0-9]{3,4}" placeholder="3 o 4 dígitos" value={checkout.cvv} onChange={e => setCheckout({ ...checkout, cvv: e.target.value })} />
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="qr-pay-panel">
                      <div className="qr-preview">
                        <QRCodeSVG value={`CURSITOS|CURSO:${sel.title}|IMPORTE:${sel.monthlyPrice}|MONEDA:ARS|USUARIO:${currentUser.email}`} size={200} level="M" includeMargin />
                        <b>Escaneá el QR para pagar este curso</b>
                        <small>Importe: {money(sel.monthlyPrice)} · Después de escanear el QR, completá los datos obligatorios y continuá.</small>
                      </div>
                    </div>
                  )}
                  <button className="primary-btn checkout-submit" type="submit">
                    {paymentMethod === 'Tarjeta' ? `Confirmar y pagar · ${money(sel.monthlyPrice)}` : 'Validar datos y continuar después de escanear'}
                  </button>
                </form>

                <aside className="panel checkout-summary">
                  <span className="summary-course-icon"><CourseGlyph course={sel} /></span>
                  <h2>{sel.title}</h2>
                  <p>Suscripción mensual</p>
                  <div className="summary-price">{money(sel.monthlyPrice)} <small>/ mes</small></div>
                  <div className="summary-line"><span>Método</span><b>{paymentMethod}</b></div>
                  <div className="summary-line"><span>Docente</span><b>{sel.instructor}</b></div>
                </aside>
              </div>
            </>
          )}
        </div>

        {/* Modales */}
        {removeStudentCandidate && (
          <div className="modal-backdrop" onClick={() => setRemoveStudentCandidate(null)}>
            <section className="grade-modal delete-course-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setRemoveStudentCandidate(null)}><X size={18} /></button>
              <div className="delete-course-icon"><Users size={22} /></div>
              <div className="modal-kicker">BAJA DE ALUMNO</div>
              <h2>¿Dar de baja a {removeStudentCandidate.student.first}?</h2>
              <p>Se quitará a <strong>{removeStudentCandidate.student.first} {removeStudentCandidate.student.last}</strong> de <strong>{removeStudentCandidate.courseTitle || 'este curso'}</strong> y se liberará su cupo.</p>
              <div className="delete-course-actions">
                <button className="outline-btn" onClick={() => setRemoveStudentCandidate(null)}>Cancelar</button>
                <button className="delete-confirm-btn" onClick={() => { removeStudent(removeStudentCandidate.courseId, removeStudentCandidate.dni); setRemoveStudentCandidate(null); }}>Sí, dar de baja</button>
              </div>
            </section>
          </div>
        )}

        {deleteAccountCandidate && (
          <div className="modal-backdrop" onClick={() => setDeleteAccountCandidate(false)}>
            <section className="grade-modal profile-delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-account-title" onClick={e => e.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setDeleteAccountCandidate(false)}><X size={18} /></button>
              <div className="profile-delete-icon"><Trash2 size={22} /></div>
              <div className="modal-kicker">ELIMINAR CUENTA</div>
              <h2 id="delete-account-title">¿Querés borrar tu cuenta?</h2>
              <p>Se eliminarán tu perfil y preferencias, y se quitarán tus matrículas de esta aplicación en este navegador. Esta acción no se puede deshacer.</p>
              <div className="delete-course-actions">
                <button type="button" className="outline-btn" onClick={() => setDeleteAccountCandidate(false)}>Conservar cuenta</button>
                <button type="button" className="delete-confirm-btn" onClick={() => {
                  const email = currentUser.email;
                  const enrollments = JSON.parse(localStorage.getItem(`${userKey}:enrollments`) || '{}');
                  persist(courses.map(c => {
                    const dni = enrollments[c.id];
                    return { ...c, students: c.students.filter(st => st.email !== email && (!dni || st.dni !== dni)) };
                  }));
                  localStorage.setItem('aula-users', JSON.stringify(JSON.parse(localStorage.getItem('aula-users') || '[]').filter(u => u.email?.toLowerCase() !== email?.toLowerCase())));
                  const base = `aula-user:${email}`;
                  ['courses', 'waitlist', 'enrollments', 'notifications', 'payment-brand', 'profile'].forEach(suffix => localStorage.removeItem(`${base}:${suffix}`));
                  localStorage.removeItem('aula-current-user');
                  setMyCourseIds([]);
                  setWaitlistIds([]);
                  setNotifications([]);
                  setCurrentUser({ name: '', email: '', isAdmin: false });
                  setProfileDraft({ name: '', email: '', phone: '', dni: '', birthDate: '', avatar: '' });
                  setProfileBaseline({ name: '', email: '', phone: '', dni: '', birthDate: '', avatar: '' });
                  setIsAdmin(false);
                  setPage('overview');
                  setAuthMode('login');
                  setAuthForm({ name: '', email: '', password: '', dni: '', birthDate: '' });
                  setAuthMessage('La cuenta se eliminó.');
                  setDeleteAccountCandidate(false);
                  setSignedIn(false);
                }}>
                  Sí, eliminar mi cuenta
                </button>
              </div>
            </section>
          </div>
        )}

        {withdrawCandidate && (
          <div className="modal-backdrop" onClick={() => setWithdrawCandidate(null)}>
            <section className="grade-modal delete-course-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setWithdrawCandidate(null)}><X size={18} /></button>
              <div className="delete-course-icon"><Users size={22} /></div>
              <div className="modal-kicker">BAJA DE INSCRIPCIÓN</div>
              <h2>¿Dar de baja este curso?</h2>
              <p>Se quitará <strong>{withdrawCandidate.title}</strong> de Mis cursos.</p>
              <div className="withdraw-billing-note">
                <span className="withdraw-billing-icon">$</span>
                <div>
                  <strong>Importante sobre tu cuota</strong>
                  <p>{withdrawCandidate.startDate && withdrawCandidate.startDate <= todayDate() ? "La fecha de inicio ya pasó. La cuota correspondiente se abonará normalmente." : "Si el mes todavía no comenzó, contactá a soporte para solicitar la devolución de la cuota."}</p>
                </div>
              </div>
              <div className="delete-course-actions">
                <button className="outline-btn" onClick={() => setWithdrawCandidate(null)}>Cancelar</button>
                <button className="delete-confirm-btn" onClick={() => {
                  const dni = JSON.parse(localStorage.getItem(`${userKey}:enrollments`) || '{}')[withdrawCandidate.id];
                  const next = courses.map(c => c.id === withdrawCandidate.id ? { ...c, students: c.students.filter(st => st.dni !== dni && st.email !== currentUser.email) } : c);
                  persist(next);
                  const mine = myCourseIds.filter(id => id !== withdrawCandidate.id);
                  setMyCourseIds(mine);
                  localStorage.setItem(`${userKey}:courses`, JSON.stringify(mine));
                  const enrollmentMap = JSON.parse(localStorage.getItem(`${userKey}:enrollments`) || '{}');
                  delete enrollmentMap[withdrawCandidate.id];
                  localStorage.setItem(`${userKey}:enrollments`, JSON.stringify(enrollmentMap));
                  pushNotification(`Te has dado de baja en: ${withdrawCandidate.title}`, withdrawCandidate.id, 'withdraw');
                  setWithdrawSuccessCourse(withdrawCandidate.title);
                  setWithdrawCandidate(null);
                }}>
                  Sí, dar de baja
                </button>
              </div>
            </section>
          </div>
        )}

        {withdrawSuccessCourse && (
          <div className="modal-backdrop payment-overlay" onClick={() => setWithdrawSuccessCourse('')}>
            <section className="grade-modal payment-success-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setWithdrawSuccessCourse('')}><X size={18} /></button>
              <div className="success-check"><Check size={26} /></div>
              <div className="modal-kicker">BAJA COMPLETADA</div>
              <h2>Te has dado de baja</h2>
              <p>Se confirmó tu baja de <strong>{withdrawSuccessCourse}</strong>.</p>
              <button className="primary-btn" onClick={() => setWithdrawSuccessCourse('')}>Entendido</button>
            </section>
          </div>
        )}

        {paymentError && (
          <div className="modal-backdrop payment-overlay" onClick={() => setPaymentError('')}>
            <section className="grade-modal payment-error-modal" role="alertdialog" aria-modal="true" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setPaymentError('')}><X size={18} /></button>
              <div className="payment-error-icon">!</div>
              <div className="modal-kicker">REVISÁ LOS DATOS</div>
              <h2>No pudimos continuar</h2>
              <p>{paymentError}</p>
              <button className="primary-btn" onClick={() => setPaymentError('')}>Corregir datos</button>
            </section>
          </div>
        )}

        {paymentSuccess && (
          <div className="modal-backdrop payment-overlay">
            <section className="grade-modal payment-success-modal">
              {paymentStage === 'processing' ? (
                <>
                  <div className="payment-spinner" />
                  <div className="modal-kicker">PROCESANDO PAGO</div>
                  <h2>Estamos procesando tu pago</h2>
                  <p>Un momento, por favor…</p>
                </>
              ) : (
                <>
                  <div className="success-check"><Check size={26} /></div>
                  <div className="modal-kicker">PAGO APROBADO</div>
                  <h2>Compra realizada con éxito</h2>
                  <p>¡Ya puedes iniciar tu curso! Lo encontrarás en Inicio y en Mis cursos.</p>
                  <button className="primary-btn" onClick={() => { setPaymentSuccess(false); go('overview'); }}>Ir a Inicio</button>
                </>
              )}
            </section>
          </div>
        )}
         
        {deleteTicketCandidate && (
          <div className="modal-backdrop" onClick={() => setDeleteTicketCandidate(null)}>
            <section className="grade-modal delete-course-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-ticket-title" onClick={e => e.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setDeleteTicketCandidate(null)}><X size={18} /></button>
              <div className="delete-course-icon"><Trash2 size={21} /></div>
              <div className="modal-kicker">BANDEJA DE SOPORTE</div>
              <h2 id="delete-ticket-title">¿Eliminar esta conversación?</h2>
              <p>Se borrará la consulta de <strong>{deleteTicketCandidate.name}</strong> ({deleteTicketCandidate.subject}) con todas sus respuestas. También va a desaparecer de "Mis consultas" del alumno. Esta acción no se puede deshacer.</p>
              <div className="delete-course-actions">
                <button type="button" className="outline-btn" onClick={() => setDeleteTicketCandidate(null)}>Cancelar</button>
                <button type="button" className="delete-confirm-btn" onClick={() => { deleteTicket(deleteTicketCandidate.id); setDeleteTicketCandidate(null); }}>
                  Sí, eliminar conversación
                </button>
              </div>
            </section>
          </div>
        )}

        {deleteAnnouncementCandidate && (
          <div className="modal-backdrop" onClick={() => setDeleteAnnouncementCandidate(null)}>
            <section className="grade-modal delete-course-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-announcement-title" onClick={e => e.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setDeleteAnnouncementCandidate(null)}><X size={18} /></button>
              <div className="delete-course-icon"><Trash2 size={21} /></div>
              <div className="modal-kicker">MODERACIÓN DEL TABLÓN</div>
              <h2 id="delete-announcement-title">¿Eliminar este mensaje?</h2>
              <p>Se quitará la publicación de <strong>{deleteAnnouncementCandidate.announcement.author}</strong> del tablón de <strong>{deleteAnnouncementCandidate.courseTitle}</strong>. Esta acción no se puede deshacer.</p>
              <div className="announcement-delete-preview">{deleteAnnouncementCandidate.announcement.text}</div>
              <div className="delete-course-actions">
                <button type="button" className="outline-btn" onClick={() => setDeleteAnnouncementCandidate(null)}>Cancelar</button>
                <button type="button" className="delete-confirm-btn" onClick={() => {
                  const { courseId, announcement } = deleteAnnouncementCandidate;
                  persist(courses.map(c => c.id === courseId ? { ...c, announcements: (c.announcements || []).filter(a => a.id !== announcement.id) } : c));
                  setDeleteAnnouncementCandidate(null);
                  setNotice('El mensaje se eliminó del tablón.');
                }}>
                  Sí, eliminar mensaje
                </button>
              </div>
            </section>
          </div>
        )}

        {deleteCourseCandidate && (
          <div className="modal-backdrop" onClick={() => setDeleteCourseCandidate(null)}>
            <section className="grade-modal delete-course-modal" role="dialog" aria-modal="true" aria-labelledby="delete-course-title" onClick={e => e.stopPropagation()}>
              <button type="button" className="modal-close" onClick={() => setDeleteCourseCandidate(null)}><X size={18} /></button>
              <div className="delete-course-icon"><BookOpen size={22} /></div>
              <div className="modal-kicker">ELIMINAR CURSO</div>
              <h2 id="delete-course-title">¿Quitar este curso?</h2>
              <p><strong>{deleteCourseCandidate.title}</strong> y sus matrículas se eliminarán de la lista. Esta acción no se puede deshacer.</p>
              <div className="delete-course-actions">
                <button type="button" className="outline-btn" onClick={() => setDeleteCourseCandidate(null)}>Cancelar</button>
                <button type="button" className="delete-confirm-btn" onClick={() => {
                  persist(courses.filter(c => c.id !== deleteCourseCandidate.id));
                  setDeleteCourseCandidate(null);
                  setNotice('El curso se quitó correctamente.');
                }}>
                  Sí, quitar curso
                </button>
              </div>
            </section>
          </div>
        )}

        {editing && (
          <div className="modal-backdrop" onClick={() => setEditing(null)}>
            <form className="grade-modal" onClick={e => e.stopPropagation()} onSubmit={e => {
              e.preventDefault();
              editGrade(editing.courseId, editing.dni, editing.index, editing.value);
              setEditing(null);
            }}>
              <button type="button" className="modal-close" onClick={() => setEditing(null)}><X size={18} /></button>
              <div className="modal-kicker">ACTUALIZAR CALIFICACIÓN</div>
              <h2>{editing.student.first} {editing.student.last}</h2>
              <p>Nota {editing.index + 1} · Ingresá un valor entre 0 y 10.</p>
              <input type="number" min="0" max="10" step="1" autoFocus value={editing.value} onChange={e => setEditing({ ...editing, value: e.target.value })} />
              <button className="primary-btn" type="submit">Guardar nota</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

function luhn(value) {
  let sum = 0, alt = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let n = Number(value[i]);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function formatCourseStart(course, index) {
  if (!course.startDate) return `${12 + index * 3} JUN`;
  return new Date(course.startDate + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }).toUpperCase();
}

function money(value = 0) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}

function CourseGlyph({ course }) {
  if (course.id === 'react') {
    return (
      <svg className="course-glyph react-glyph" viewBox="0 0 64 64" aria-label="React">
        <circle cx="32" cy="32" r="4" fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeWidth="2.6">
          <ellipse cx="32" cy="32" rx="26" ry="10" />
          <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(120 32 32)" />
        </g>
      </svg>
    );
  }
  if (course.id === 'python') {
    return (
      <svg className="course-glyph python-glyph" viewBox="0 0 64 64" aria-label="Python">
        <path fill="#3776ab" d="M31 7c-13 0-12 6-12 6v9h14v3H13S5 24 5 38s8 14 8 14h8v-9s0-8 8-8h15s8 0 8-8V15s1-8-13-8zm-7 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5" />
        <path fill="#ffd343" d="M33 57c13 0 12-6 12-6v-9H31v-3h20s8 1 8-13-8-14-8-14h-8v9s0 8-8 8H20s-8 0-8 8v12s-1 8 13 8zm7-7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    );
  }
  if (course.id === 'excel') {
    return (
      <svg className="course-glyph" viewBox="0 0 64 64" aria-label="Excel">
        <rect x="8" y="8" width="48" height="48" rx="7" fill="#17864b" />
        <path d="M23 18h25v28H23zM10 24h37M10 33h37M10 42h37M31 18v28M40 18v28" fill="none" stroke="white" strokeWidth="2" />
        <path d="m12 25 9 16m0-16-9 16" stroke="white" strokeWidth="3" />
      </svg>
    );
  }
  return <span className="course-glyph-fallback">{course.icon}</span>;
}

function Stat({ icon: Icon, label, value, note, color, onClick }) {
  return (
    <button className="stat-card" onClick={onClick}>
      <div className={`stat-icon ${color}`}><Icon size={18} /></div>
      <span className="stat-note"><span className="live-dot" /> {note}</span>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </button>
  );
}

function PageTitle({ eyebrow, title, subtitle, action }) {
  return (
    <div className="page-title-row">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function CapacityPill({ course, fullWidth }) {
  const n = course.capacity - course.students.length;
  return (
    <span className={`capacity-pill ${n === 0 ? 'full' : ''} ${fullWidth ? 'wide' : ''}`}>
      <span className="capacity-dot" />
      {n === 0 ? 'Curso completo · Lista de espera' : `${n} ${n === 1 ? 'cupo disponible' : 'cupos disponibles'}`}
    </span>
  );
}

function CourseCard({ course, onClick, enrolled = false, onWithdraw }) {
  const full = course.students.length >= course.capacity;
  const free = course.capacity - course.students.length;
  return (
    <article className="course-card" role="button" tabIndex="0" onClick={onClick} onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className={`course-art ${course.color}`}>
        <span><CourseGlyph course={course} /></span>
        <small>{course.category}</small>
        {enrolled && <small className="enrolled-badge">INSCRIPTO</small>}
        <div className="art-decoration">✦</div>
      </div>
      <div className="course-card-body">
        <div className="course-title-row">
          <h3>{course.title}</h3>
          <ChevronRight size={17} />
        </div>
        <div className="course-instructor">
          <span className="tiny-avatar">{course.initials}</span>
          {course.instructor}
        </div>
        <div className="course-price">{money(course.monthlyPrice)} <small>/ mes · QR o tarjeta</small></div>
        <div className="course-card-meta">
          <span><Clock3 size={14} />{course.duration}</span>
          <span>{course.modality.includes('online') ? <Video size={14} /> : <MapPin size={14} />} {course.modality.includes('online') ? 'Online' : 'Presencial'}</span>
        </div>
        <div className="course-card-footer">
          <span className={`seat-status ${full ? 'is-full' : ''}`}><i />{full ? 'Lista de espera' : `${free} ${free === 1 ? 'cupo' : 'cupos'} libres`}</span>
          <span className="enrolled-count"><Users size={14} />{course.students.length}/{course.capacity}</span>
        </div>
        <div className="mini-progress">
          <i style={{ width: `${Math.min(course.students.length / course.capacity * 100, 100)}%` }} />
        </div>
        {enrolled && (
          <button className="withdraw-enrollment" onClick={e => { e.stopPropagation(); onWithdraw?.(); }}>
            Dar de baja
          </button>
        )}
      </div>
    </article>
  );
}

function StudentTable({ rows, compact = false, showCourse = true, onRemove, onEditGrade }) {
  if (!rows.length) return <Empty title="Todavía no hay estudiantes" text="Cuando haya alumnos matriculados, los vas a ver acá." />;
  return (
    <div className={`table-wrap ${compact ? 'compact' : ''}`}>
      <table>
        <thead>
          <tr>
            <th>ESTUDIANTE</th>
            {onEditGrade && <th>NOTAS</th>}
            {showCourse && <th>CURSO</th>}
            <th>DNI</th>
            <th>EDAD</th>
            <th>EMAIL</th>
            <th>INSCRIPCIÓN</th>
            {onEditGrade && <th>ESTADO</th>}
            {onRemove && <th>ACCIÓN</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={`${s.dni}-${i}`}>
              <td>
                <div className="student-cell">
                  <span className={`student-avatar ${colors[i % colors.length]}`}>{initials(s.first, s.last)}</span>
                  <b>{s.first} {s.last}</b>
                </div>
              </td>
              {onEditGrade && (
                <td className="grades-cell">
                  {(s.grades || [5, 6, 7, 8]).map((g, idx) => (
                    <button key={idx} title="Editar nota" onClick={() => onEditGrade && onEditGrade(s, idx, g)}>{g}</button>
                  ))}
                </td>
              )}
              {showCourse && <td><span className={`course-chip ${s.courseColor || 'lavender'}`}>{s.courseTitle}</span></td>}
              <td>{s.dni}</td>
              <td>{s.age}</td>
              <td className="student-email">{s.email}</td>
              <td>{s.joined || '12/05/2025'}</td>
              {onEditGrade && <td>{(s.grades || [5, 6, 7, 8]).some(n => n <= 3) ? 'Libre' : (s.grades || [5, 6, 7, 8]).every(n => n >= 7) ? 'Promocional' : 'Regular'}</td>}
              {onRemove && <td><button className="remove-btn" onClick={() => onRemove(s)}>Dar de baja</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Empty({ title, text }) {
  return (
    <div className="empty-state">
      <div className="empty-icon"><Search size={20} /></div>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}

export default App;


