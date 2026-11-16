import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

const textarea = { component: "textarea" } as const;

export const contactoPageCollection: Collection = {
  name: "contactoPage",
  label: "Página · Contacto",
  path: "src/content/contacto-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/contacto",
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
        { name: "whatsappTitle", label: "WhatsApp: título", type: "string" },
        { name: "whatsappText", label: "WhatsApp: texto", type: "string" },
        { name: "emailTitle", label: "Correo: título", type: "string" },
        { name: "email", label: "Correo de contacto", type: "string" },
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
  ],
};
