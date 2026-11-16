import type { Collection, TinaField } from "tinacms";
import { seoField } from "../fields/seo";
import { eventLabelsField } from "./eventosPage";

const textarea = { component: "textarea" } as const;

const linkFields: TinaField[] = [
  { name: "label", label: "Texto", type: "string" },
  { name: "url", label: "Enlace", type: "string" },
];

export const empresasPageCollection: Collection = {
  name: "empresasPage",
  label: "Página · Para empresas",
  path: "src/content/empresas-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/empresas",
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
        { type: "object", name: "primary", label: "Botón principal", fields: linkFields },
        { type: "object", name: "secondary", label: "Botón secundario", fields: linkFields },
        { name: "image", label: "Imagen", type: "image" },
        { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
        {
          type: "object",
          name: "stats",
          label: "Cifras",
          list: true,
          ui: { itemProps: (item) => ({ label: `${item?.value || ""} ${item?.label || "Cifra"}` }) },
          fields: [
            { name: "value", label: "Valor", type: "string" },
            { name: "label", label: "Descripción", type: "string" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "logos",
      label: "Logos de aliados",
      fields: [
        { name: "title", label: "Título", type: "string", ui: textarea },
        {
          type: "object",
          name: "items",
          label: "Logos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name || "Logo" }) },
          fields: [
            { name: "name", label: "Nombre (texto alternativo)", type: "string" },
            { name: "image", label: "Logo", type: "image" },
            { name: "height", label: "Alto en píxeles", type: "number" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "formats",
      label: "Formatos",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        {
          type: "object",
          name: "items",
          label: "Formatos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "Formato" }) },
          fields: [
            { name: "title", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "string", ui: textarea },
            {
              name: "icon",
              label: "Ícono",
              type: "string",
              options: [
                { value: "building", label: "Edificio" },
                { value: "bolt", label: "Rayo" },
                { value: "screen", label: "Pantalla" },
                { value: "bulb", label: "Foco" },
                { value: "star", label: "Estrella" },
              ],
            },
            { name: "tags", label: "Etiquetas", type: "string", list: true },
            { name: "featured", label: "Destacado (ocupa dos columnas, fondo morado)", type: "boolean" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "events",
      label: "Eventos y comunidad",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        { name: "upcomingBadge", label: "Distintivo del próximo evento", type: "string" },
        { name: "pastLimit", label: "Cantidad de eventos realizados a mostrar", type: "number" },
      ],
    },
    eventLabelsField,
    {
      type: "object",
      name: "proposal",
      label: "Solicitar propuesta",
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        { name: "points", label: "Puntos", type: "string", list: true },
      ],
    },
  ],
};
