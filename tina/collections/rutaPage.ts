import type { Collection, TinaField } from "tinacms";
import { seoField } from "../fields/seo";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const textarea = { component: "textarea" } as const;

export function linkField(name: string, label: string): TinaField {
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

export const startTodayBannerField: TinaField = {
  type: "object",
  name: "cta",
  label: "Banner final (Empieza hoy)",
  fields: [
    { name: "eyebrow", label: "Etiqueta", type: "string" },
    { name: "title", label: "Título", type: "string" },
    { name: "text", label: "Texto", type: "string", ui: textarea },
    linkField("primary", "Botón principal"),
    linkField("secondary", "Botón secundario"),
    { name: "image", label: "Ilustración", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la ilustración", type: "string" },
  ],
};

export const rutaPageCollection: Collection = {
  name: "rutaPage",
  label: "Página · Ruta de aprendizaje",
  path: "src/content/ruta-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/ruta-de-aprendizaje",
  },
  fields: [
    seoField,
    {
      type: "object",
      name: "hero",
      label: "Portada",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "titleLead", label: "Título", type: "string" },
        { name: "titleHighlight", label: "Título (parte resaltada)", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        linkField("primary", "Botón principal"),
        linkField("secondary", "Botón secundario"),
        { name: "image", label: "Imagen", type: "image" },
        { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
        {
          type: "object",
          name: "result",
          label: "Tarjeta de resultado",
          fields: [
            { name: "title", label: "Título", type: "string" },
            { name: "level", label: "Nivel", type: "string" },
            {
              type: "object",
              name: "skills",
              label: "Habilidades",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.name || "Habilidad" }) },
              fields: [
                { name: "name", label: "Nombre", type: "string" },
                { name: "percent", label: "Porcentaje", type: "number" },
                { name: "tone", label: "Color", type: "string", options: [{ value: "pink", label: "Rosado" }, { value: "purple", label: "Morado" }] },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "process",
      label: "Cómo funciona",
      fields: [
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        { name: "scrollHint", label: "Indicador de scroll", type: "string" },
        {
          type: "object",
          name: "steps",
          label: "Pasos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "Paso" }) },
          fields: [
            { name: "time", label: "Tiempo", type: "string", description: "Ej.: 40 MIN, CADA MES" },
            { name: "title", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "string", ui: textarea },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "simulator",
      label: "Simulador de ruta",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        { name: "goalsLabel", label: "Rótulo de objetivos", type: "string" },
        { name: "levelsLabel", label: "Rótulo de niveles", type: "string" },
        { name: "resultEyebrow", label: "Etiqueta del resultado", type: "string" },
        { name: "resultTitleTemplate", label: "Título del resultado", type: "string", description: "Usa {programa}, {desde} y {hasta}" },
        { name: "legendCurrent", label: "Leyenda: tu nivel", type: "string" },
        { name: "legendRoute", label: "Leyenda: tu ruta", type: "string" },
        { name: "legendGoal", label: "Leyenda: tu meta", type: "string" },
        { name: "levelsStatLabel", label: "Rótulo: niveles", type: "string" },
        { name: "timeStatLabel", label: "Rótulo: tiempo estimado", type: "string" },
        { name: "formatStatLabel", label: "Rótulo: formato sugerido", type: "string" },
        { name: "monthsPerLevel", label: "Meses por nivel", type: "number" },
        { name: "focusLabel", label: "Rótulo: lo que trabajarás", type: "string" },
        { name: "disclaimer", label: "Aviso", type: "string", ui: textarea },
        linkField("cta", "Botón"),
        {
          type: "object",
          name: "goals",
          label: "Objetivos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label || "Objetivo" }) },
          fields: [
            { name: "label", label: "Objetivo", type: "string" },
            { name: "program", label: "Programa recomendado", type: "string" },
            { name: "targetLevel", label: "Nivel meta", type: "string", options: CEFR_LEVELS },
            { name: "format", label: "Formato sugerido", type: "string" },
            { name: "focus", label: "Lo que trabajarás", type: "string", list: true },
          ],
        },
        {
          type: "object",
          name: "startLevels",
          label: "Niveles de partida",
          list: true,
          ui: { itemProps: (item) => ({ label: `${item?.code || ""} ${item?.name || "Nivel"}` }) },
          fields: [
            { name: "code", label: "Código", type: "string", options: CEFR_LEVELS },
            { name: "name", label: "Nombre", type: "string" },
            { name: "tip", label: "Descripción", type: "string", ui: textarea },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "faq",
      label: "Preguntas frecuentes",
      fields: [
        { name: "title", label: "Título", type: "string" },
        {
          type: "object",
          name: "items",
          label: "Preguntas",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.question || "Pregunta" }) },
          fields: [
            { name: "question", label: "Pregunta", type: "string" },
            { name: "answer", label: "Respuesta", type: "string", ui: textarea },
          ],
        },
      ],
    },
    startTodayBannerField,
  ],
};
