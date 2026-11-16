import type { Collection, TinaField } from "tinacms";
import { seoField } from "../fields/seo";

const textarea = { component: "textarea" } as const;

function linkField(name: string, label: string): TinaField {
  return {
    type: "object",
    name,
    label,
    fields: [
      { name: "label", label: "Texto", type: "string" },
      { name: "url", label: "Enlace", type: "string" },
    ],
  };
}

function sectionHeading(): TinaField[] {
  return [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título", type: "string" },
    { name: "description", label: "Descripción", type: "string", ui: textarea },
  ];
}

const heroField: TinaField = {
  type: "object",
  name: "hero",
  label: "Portada (hero)",
  fields: [
    { name: "badge", label: "Etiqueta del aviso", type: "string", description: "Ej.: NUEVO" },
    { name: "badgeText", label: "Texto del aviso", type: "string" },
    { name: "titleLead", label: "Título (parte oscura)", type: "string" },
    { name: "titleHighlight", label: "Título (parte morada)", type: "string" },
    { name: "subtitle", label: "Subtítulo", type: "string", ui: textarea },
    linkField("primaryCta", "Botón principal"),
    linkField("secondaryCta", "Botón secundario"),
    { name: "image", label: "Imagen", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
    {
      type: "object",
      name: "liveCard",
      label: "Tarjeta flotante: clase en vivo",
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "subtitle", label: "Subtítulo", type: "string" },
      ],
    },
    {
      type: "object",
      name: "progressCard",
      label: "Tarjeta flotante: progreso",
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "percent", label: "Porcentaje (0-100)", type: "number" },
        { name: "caption", label: "Detalle", type: "string" },
      ],
    },
  ],
};

const logosField: TinaField = {
  type: "object",
  name: "logos",
  label: "Logos de instituciones",
  fields: [
    { name: "label", label: "Texto", type: "string", ui: textarea },
    {
      type: "object",
      name: "items",
      label: "Logos",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.alt || "Logo" }) },
      fields: [
        { name: "image", label: "Logo", type: "image" },
        { name: "alt", label: "Nombre de la institución", type: "string" },
        { name: "height", label: "Alto en píxeles", type: "number" },
      ],
    },
  ],
};

const routeField: TinaField = {
  type: "object",
  name: "route",
  label: "Ruta de aprendizaje",
  fields: [
    ...sectionHeading(),
    {
      type: "object",
      name: "steps",
      label: "Pasos",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Paso" }) },
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
      ],
    },
    {
      type: "object",
      name: "levels",
      label: "Niveles (barras)",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.code || ""} ${item?.name || "Nivel"}` }) },
      fields: [
        { name: "code", label: "Código", type: "string" },
        { name: "name", label: "Nombre", type: "string" },
        { name: "description", label: "Descripción", type: "string", ui: textarea },
      ],
    },
    { name: "promptTitle", label: "Franja: pregunta", type: "string" },
    { name: "promptSubtitle", label: "Franja: complemento", type: "string" },
    linkField("cta", "Franja: botón"),
  ],
};

const oneToOneField: TinaField = {
  type: "object",
  name: "oneToOne",
  label: "Clases 1 a 1 (imagen con zoom)",
  fields: [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título", type: "string" },
    { name: "image", label: "Imagen", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
    { name: "overlayTitle", label: "Título sobre la imagen", type: "string", ui: textarea },
    linkField("cta", "Botón"),
  ],
};

const teachersField: TinaField = {
  type: "object",
  name: "teachers",
  label: "Profesores",
  description: "Los profesores se editan en la colección Profesores.",
  fields: sectionHeading(),
};

const eventsField: TinaField = {
  type: "object",
  name: "events",
  label: "Eventos",
  description: "Los eventos se editan en la colección Eventos.",
  fields: [
    ...sectionHeading(),
    { name: "nextBadge", label: "Etiqueta del próximo evento", type: "string" },
    { name: "nextCtaLabel", label: "Botón del próximo evento", type: "string" },
    { name: "datesLabel", label: "Rótulo: fechas", type: "string" },
    { name: "timeLabel", label: "Rótulo: horario", type: "string" },
    { name: "levelsLabel", label: "Rótulo: niveles", type: "string" },
    { name: "priceLabel", label: "Rótulo: inversión", type: "string" },
    { name: "npsLabel", label: "Rótulo: NPS", type: "string" },
    { name: "attendeesLabel", label: "Rótulo: asistentes", type: "string" },
    { name: "pastLinkLabel", label: "Enlace de eventos pasados", type: "string" },
  ],
};

const coursesField: TinaField = {
  type: "object",
  name: "courses",
  label: "Cursos",
  description: "Los cursos se eligen en la colección Cursos (Mostrar en la portada + Orden en la portada).",
  fields: [
    ...sectionHeading(),
    linkField("allLink", "Enlace a todos los cursos"),
    { name: "infoTitle", label: "Título de la ficha", type: "string" },
    { name: "levelsLabel", label: "Rótulo: niveles", type: "string" },
    { name: "formatLabel", label: "Rótulo: formato", type: "string" },
    { name: "startLevelLabel", label: "Rótulo: nivel recomendado", type: "string" },
    { name: "durationLabel", label: "Rótulo: duración", type: "string" },
    { name: "ctaLabel", label: "Botón del curso", type: "string" },
  ],
};

const b2bField: TinaField = {
  type: "object",
  name: "b2b",
  label: "Para organizaciones",
  fields: [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    {
      type: "object",
      name: "tabs",
      label: "Pestañas",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.label || "Pestaña" }) },
      fields: [
        { name: "label", label: "Nombre de la pestaña", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "description", label: "Descripción", type: "string", ui: textarea },
        { name: "points", label: "Puntos clave", type: "string", list: true },
      ],
    },
  ],
};

const testimonialsField: TinaField = {
  type: "object",
  name: "testimonials",
  label: "Testimonios",
  description: "Los testimonios se editan en la colección Testimonios.",
  fields: [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título", type: "string" },
    { name: "rating", label: "Valoración promedio", type: "string", description: "Ej.: 4.9" },
    { name: "ratingLabel", label: "Texto de la valoración", type: "string" },
  ],
};

const finalCtaField: TinaField = {
  type: "object",
  name: "finalCta",
  label: "Llamada final",
  fields: [
    ...sectionHeading(),
    linkField("primaryCta", "Botón principal"),
    linkField("secondaryCta", "Botón secundario"),
    { name: "image", label: "Ilustración", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la ilustración", type: "string" },
  ],
};

export const homeCollection: Collection = {
  name: "home",
  label: "Home",
  path: "src/content/home",
  format: "json",
  ui: { allowedActions: { create: false, delete: false }, router: () => "/" },
  fields: [
    heroField,
    logosField,
    routeField,
    oneToOneField,
    teachersField,
    eventsField,
    coursesField,
    b2bField,
    testimonialsField,
    finalCtaField,
    seoField,
  ],
};
