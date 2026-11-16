import type { Collection, TinaField } from "tinacms";
import { seoField } from "../fields/seo";

const textarea = { component: "textarea" } as const;

const linkFields: TinaField[] = [
  { name: "label", label: "Texto", type: "string" },
  { name: "url", label: "Enlace", type: "string" },
];

export const eventLabelsField: TinaField = {
  type: "object",
  name: "eventLabels",
  label: "Etiquetas de las tarjetas de eventos",
  fields: [
    { name: "dates", label: "Fechas", type: "string" },
    { name: "time", label: "Horario", type: "string" },
    { name: "levels", label: "Niveles", type: "string" },
    { name: "investment", label: "Inversión", type: "string" },
    { name: "nps", label: "NPS", type: "string" },
    { name: "attendees", label: "Asistentes", type: "string" },
    { name: "participants", label: "Participantes (si hubo inscritos)", type: "string" },
    { name: "viewEvent", label: "Ver evento", type: "string" },
    { name: "upcomingCta", label: "Botón del próximo evento", type: "string" },
  ],
};

export const eventosPageCollection: Collection = {
  name: "eventosPage",
  label: "Página · Eventos",
  path: "src/content/eventos-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/eventos",
  },
  fields: [
    seoField,
    {
      type: "object",
      name: "hero",
      label: "Portada",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
      ],
    },
    {
      type: "object",
      name: "upcoming",
      label: "Próximo evento destacado",
      fields: [
        { name: "badge", label: "Distintivo sobre la imagen", type: "string" },
        { name: "label", label: "Etiqueta", type: "string", description: "Se combina con la modalidad. Ej.: Próximo evento · Online" },
      ],
    },
    {
      type: "object",
      name: "past",
      label: "Eventos realizados",
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "countSingular", label: "Contador (singular)", type: "string" },
        { name: "countPlural", label: "Contador (plural)", type: "string" },
        { name: "filterAll", label: "Filtro: todos", type: "string" },
        { name: "filterInPerson", label: "Filtro: presenciales", type: "string" },
        { name: "filterOnline", label: "Filtro: online", type: "string" },
        { name: "emptyText", label: "Texto sin resultados", type: "string" },
      ],
    },
    eventLabelsField,
    {
      type: "object",
      name: "detail",
      label: "Página de cada evento",
      fields: [
        { name: "breadcrumbHome", label: "Migas: inicio", type: "string" },
        { name: "breadcrumbEvents", label: "Migas: eventos", type: "string" },
        { name: "upcomingKicker", label: "Etiqueta de evento próximo", type: "string" },
        { name: "levelsPrefix", label: "Prefijo de niveles", type: "string" },
        { name: "flowTitle", label: "Título: cómo funciona", type: "string" },
        { name: "includesTitle", label: "Título: qué incluye", type: "string" },
        { name: "priceLabel", label: "Tarjeta de precio: etiqueta", type: "string" },
        { name: "startLabel", label: "Tarjeta de precio: inicio", type: "string" },
        { name: "timeLabel", label: "Tarjeta de precio: horario", type: "string" },
        { name: "formatLabel", label: "Tarjeta de precio: formato", type: "string" },
        { name: "levelsLabel", label: "Tarjeta de precio: niveles", type: "string" },
        { name: "ctaLabel", label: "Botón de inscripción", type: "string" },
        { name: "seatsSuffix", label: "Texto después del aviso de cupos", type: "string" },
        { name: "aboutTitle", label: "Título: sobre el evento", type: "string" },
        { name: "npsLabel", label: "Cifra: NPS", type: "string" },
        { name: "attendeesLabel", label: "Cifra: asistentes", type: "string" },
        { name: "galleryTitle", label: "Título: galería", type: "string" },
        { name: "nextEventLabel", label: "Tarjeta del próximo evento: etiqueta", type: "string" },
        { name: "nextEventCta", label: "Tarjeta del próximo evento: botón", type: "string" },
        { name: "helpTitle", label: "Ayuda: título", type: "string" },
        { name: "helpText", label: "Ayuda: texto", type: "string" },
        { name: "helpCta", label: "Ayuda: botón", type: "string" },
        { name: "othersTitle", label: "Título: otros eventos", type: "string" },
      ],
    },
    {
      type: "object",
      name: "finalCta",
      label: "Llamado final",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        { type: "object", name: "primary", label: "Botón principal", fields: linkFields },
        { type: "object", name: "secondary", label: "Botón secundario", fields: linkFields },
        { name: "image", label: "Imagen", type: "image" },
        { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
      ],
    },
  ],
};
