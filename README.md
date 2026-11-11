# Aula — Gestión de cursos y estudiantes

Frontend responsive en React para administrar cursos, consultar cupos y matricular estudiantes. Los datos de ejemplo están en español y las nuevas inscripciones quedan guardadas en `localStorage`.

## Ejecutar

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Para preparar una versión de producción:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Panel principal con métricas y últimas inscripciones.
- Catálogo con búsqueda y filtros por categoría.
- Ficha de curso con docente, modalidad, duración, horario, ocupación y lista de alumnos.
- Directorio de estudiantes con búsqueda y filtro por curso.
- Formulario de matrícula con validación de campos, DNI duplicado y cupos.
- Actualización inmediata de listados y vacantes, guardada localmente en el navegador.
