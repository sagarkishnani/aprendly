import type { Collection, TinaField } from "tinacms";
import { seoField } from "../fields/seo";
import { COURSE_GOALS, COURSE_TYPES } from "../fields/options";

const linkFields: TinaField[] = [
  { name: "label", label: "Texto", type: "string" },
  { name: "url", label: "URL", type: "string" },
];

const ALL_OPTION = { value: "all", label: "Todos" };

const headerField: TinaField = {
  type: "object",
  name: "header",
  label: "Encabezado",
  fields: [
    { name: "homeLabel", label: "Miga de pan: inicio", type: "string" },
    { name: "coursesLabel", label: "Miga de pan: cursos", type: "string" },
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título (H1)", type: "string" },
    { name: "intro", label: "Introducción", type: "string", ui: { component: "textarea" } },
    { name: "introLinkLabel", label: "Enlace de la introducción: texto", type: "string" },
    { name: "introLinkUrl", label: "Enlace de la introducción: URL", type: "string" },
  ],
};

const filtersField: TinaField = {
  type: "object",
  name: "filters",
  label: "Filtros y listado",
  fields: [
    { name: "typeTitle", label: "Título: tipo", type: "string" },
    {
      type: "object",
      name: "typeOptions",
      label: "Opciones de tipo",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Tipo" }) },
      fields: [
        { name: "value", label: "Tipo", type: "string", options: [ALL_OPTION, ...COURSE_TYPES] },
        { name: "label", label: "Texto en el filtro", type: "string" },
        { name: "cardLabel", label: "Texto en la tarjeta del curso", type: "string", description: "Ej.: GRUPAL EN VIVO" },
        { name: "isNew", label: "Marcar como nuevo", type: "boolean" },
      ],
    },
    { name: "goalTitle", label: "Título: objetivo", type: "string" },
    {
      type: "object",
      name: "goalOptions",
      label: "Opciones de objetivo",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Objetivo" }) },
      fields: [
        { name: "value", label: "Objetivo", type: "string", options: [ALL_OPTION, ...COURSE_GOALS] },
        { name: "label", label: "Texto", type: "string" },
      ],
    },
    { name: "levelTitle", label: "Título: nivel", type: "string" },
    { name: "newLabel", label: "Etiqueta 'Nuevo' del filtro", type: "string" },
    { name: "liveLabel", label: "Interruptor 'solo en vivo'", type: "string" },
    { name: "sortLabel", label: "Texto 'Ordenar por'", type: "string" },
    { name: "sortPopular", label: "Orden: populares", type: "string" },
    { name: "sortRating", label: "Orden: valorados", type: "string" },
    { name: "sortPriceLow", label: "Orden: precio menor a mayor", type: "string" },
    { name: "sortPriceHigh", label: "Orden: precio mayor a menor", type: "string" },
    { name: "countSingular", label: "Conteo singular", type: "string", description: "Ej.: curso" },
    { name: "countPlural", label: "Conteo plural", type: "string", description: "Ej.: cursos" },
    { name: "emptyTitle", label: "Sin resultados: título", type: "string" },
    { name: "resetLabel", label: "Botón limpiar filtros", type: "string" },
    { name: "filtersButton", label: "Botón de filtros (móvil)", type: "string" },
  ],
};

const cardField: TinaField = {
  type: "object",
  name: "card",
  label: "Tarjeta de curso",
  fields: [
    { name: "bestSellerLabel", label: "Insignia top ventas", type: "string" },
    { name: "newLabel", label: "Insignia nuevo", type: "string" },
    { name: "studentsSuffix", label: "Texto tras alumnos", type: "string" },
    { name: "ctaLabel", label: "Botón", type: "string" },
  ],
};

const detailField: TinaField = {
  type: "object",
  name: "detail",
  label: "Textos del detalle de curso",
  fields: [
    { name: "tabInfo", label: "Pestaña información", type: "string" },
    { name: "tabContent", label: "Pestaña contenido", type: "string" },
    { name: "tabTeachers", label: "Pestaña profesores", type: "string" },
    { name: "tabCertificate", label: "Pestaña certificado", type: "string" },
    { name: "teachersCountLabel", label: "Texto tras número de profesores", type: "string" },
    { name: "teachersTitle", label: "Título profesores", type: "string" },
    { name: "reviewsLabel", label: "Texto tras reseñas", type: "string" },
    { name: "certificateTitle", label: "Título certificado", type: "string" },
    { name: "aboutFallbackTitle", label: "Título de descripción por defecto", type: "string" },
    { name: "playLabel", label: "Botón reproducir (accesible)", type: "string" },
    { name: "yourCourseLabel", label: "Tarjeta: 'Tu curso'", type: "string" },
    { name: "levelWord", label: "Palabra 'Nivel'", type: "string" },
    { name: "startLevelLabel", label: "Tarjeta: 'Nivel de inicio'", type: "string" },
    { name: "scheduleLabel", label: "Tarjeta: 'Horario'", type: "string" },
    { name: "enrollLabel", label: "Botón inscribirse", type: "string" },
    { name: "enrollUrl", label: "URL de inscripción", type: "string", description: "Se agregan ?curso= y &nivel=" },
    { name: "offerEndsLabel", label: "Texto 'La oferta termina en'", type: "string" },
    { name: "savingsLabel", label: "Texto 'Ahorras'", type: "string" },
    { name: "routeCtaLabel", label: "Botón de la ruta completa", type: "string" },
    { name: "advisorTitle", label: "Asesor: título", type: "string" },
    { name: "advisorText", label: "Asesor: texto", type: "string" },
    { name: "advisorButton", label: "Asesor: botón", type: "string" },
    { name: "advisorUrl", label: "Asesor: URL", type: "string" },
  ],
};

const ctaField: TinaField = {
  type: "object",
  name: "cta",
  label: "Llamado final (cursos y detalle)",
  fields: [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título", type: "string" },
    { name: "text", label: "Texto", type: "string", ui: { component: "textarea" } },
    { type: "object", name: "primary", label: "Botón principal", fields: linkFields },
    { type: "object", name: "secondary", label: "Botón secundario", fields: linkFields },
    { name: "image", label: "Ilustración", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la ilustración", type: "string" },
  ],
};

export const cursosPageCollection: Collection = {
  name: "cursosPage",
  label: "Página · Cursos",
  path: "src/content/cursos-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/cursos",
  },
  fields: [headerField, filtersField, cardField, detailField, ctaField, seoField],
};
