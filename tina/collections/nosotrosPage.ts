import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";
import { linkField, startTodayBannerField } from "./rutaPage";

const textarea = { component: "textarea" } as const;

export const nosotrosPageCollection: Collection = {
  name: "nosotrosPage",
  label: "Página · Nosotros",
  path: "src/content/nosotros-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/nosotros",
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
        { name: "image", label: "Imagen", type: "image" },
        { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
      ],
    },
    {
      type: "object",
      name: "about",
      label: "Quiénes somos",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        {
          type: "object",
          name: "mission",
          label: "Misión",
          fields: [
            { name: "title", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "string", ui: textarea },
          ],
        },
        {
          type: "object",
          name: "vision",
          label: "Visión",
          fields: [
            { name: "title", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "string", ui: textarea },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "recognition",
      label: "Reconocimientos",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
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
        { name: "image", label: "Imagen", type: "image" },
        { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
        { name: "badgeTitle", label: "Distintivo: título", type: "string" },
        { name: "badgeText", label: "Distintivo: texto", type: "string" },
      ],
    },
    {
      type: "object",
      name: "partners",
      label: "Aliados",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        {
          type: "object",
          name: "logos",
          label: "Logos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name || "Logo" }) },
          fields: [
            { name: "name", label: "Nombre de la institución", type: "string" },
            { name: "logo", label: "Logo", type: "image" },
            { name: "maxHeight", label: "Alto máximo (px)", type: "number" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "events",
      label: "Participación en eventos",
      description: "Muestra los últimos eventos pasados de la colección Eventos.",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        linkField("link", "Enlace"),
      ],
    },
    {
      type: "object",
      name: "team",
      label: "Nuestro equipo",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        { name: "text", label: "Texto", type: "string", ui: textarea },
        {
          type: "object",
          name: "photos",
          label: "Fotos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.alt || "Foto" }) },
          fields: [
            { name: "image", label: "Imagen", type: "image" },
            { name: "alt", label: "Texto alternativo", type: "string" },
          ],
        },
        { name: "certifications", label: "Certificaciones", type: "string", list: true },
      ],
    },
    {
      type: "object",
      name: "steps",
      label: "Cómo empezar",
      fields: [
        { name: "eyebrow", label: "Etiqueta", type: "string" },
        { name: "title", label: "Título", type: "string" },
        {
          type: "object",
          name: "items",
          label: "Pasos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "Paso" }) },
          fields: [
            { name: "title", label: "Título", type: "string" },
            { name: "text", label: "Texto", type: "string", ui: textarea },
          ],
        },
      ],
    },
    startTodayBannerField,
  ],
};
