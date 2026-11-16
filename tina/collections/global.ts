import type { Collection } from "tinacms";

export const globalCollection: Collection = {
  name: "global",
  label: "Global (nav / footer / SEO)",
  path: "src/content/global",
  format: "json",
  ui: { allowedActions: { create: false, delete: false } },
  fields: [
    {
      type: "object",
      name: "nav",
      label: "Navegación",
      fields: [
        { name: "logo", label: "Logo", type: "image" },
        { name: "logoAlt", label: "Texto alternativo del logo", type: "string" },
        {
          type: "object",
          name: "links",
          label: "Enlaces",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.label || "Enlace" }) },
          fields: [
            { name: "label", label: "Texto", type: "string" },
            { name: "url", label: "URL", type: "string" },
            { name: "external", label: "Abre en otra pestaña", type: "boolean" },
            {
              type: "object",
              name: "children",
              label: "Submenú",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label || "Opción" }) },
              fields: [
                { name: "label", label: "Texto", type: "string" },
                { name: "description", label: "Descripción corta", type: "string" },
                { name: "url", label: "URL", type: "string" },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "cta",
          label: "Botón principal",
          fields: [
            { name: "label", label: "Texto", type: "string" },
            { name: "url", label: "URL", type: "string" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        { name: "tagline", label: "Frase", type: "string" },
        {
          type: "object",
          name: "columns",
          label: "Columnas",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title || "Columna" }) },
          fields: [
            { name: "title", label: "Título", type: "string" },
            {
              type: "object",
              name: "links",
              label: "Enlaces",
              list: true,
              ui: { itemProps: (item) => ({ label: item?.label || "Enlace" }) },
              fields: [
                { name: "label", label: "Texto", type: "string" },
                { name: "url", label: "URL", type: "string" },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "social",
          label: "Redes sociales",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.network || "Red" }) },
          fields: [
            {
              name: "network",
              label: "Red",
              type: "string",
              options: ["linkedin", "instagram", "facebook", "x", "youtube", "tiktok", "whatsapp"],
            },
            { name: "url", label: "URL", type: "string" },
          ],
        },
        { name: "legal", label: "Línea legal", type: "string" },
        { name: "creditLabel", label: "Texto del crédito", type: "string" },
        { name: "creditUrl", label: "Enlace del crédito", type: "string" },
      ],
    },
    {
      type: "object",
      name: "whatsapp",
      label: "Botón de WhatsApp",
      fields: [
        { name: "enabled", label: "Mostrar", type: "boolean" },
        { name: "phone", label: "Número con código de país, sin + ni espacios", type: "string" },
        { name: "message", label: "Mensaje inicial", type: "string" },
        { name: "bubbleTitle", label: "Título de la burbuja", type: "string" },
        { name: "bubbleText", label: "Texto de la burbuja", type: "string" },
      ],
    },
    {
      type: "object",
      name: "seo",
      label: "SEO por defecto",
      fields: [
        { name: "title", label: "Título por defecto", type: "string" },
        { name: "description", label: "Descripción por defecto", type: "string", ui: { component: "textarea" } },
        { name: "ogImage", label: "Imagen para compartir (1200×630)", type: "image" },
      ],
    },
    {
      type: "object",
      name: "codeInjection",
      label: "Código inyectado (analytics, píxeles)",
      description: "HTML crudo. Se inserta tal cual; un error aquí puede romper el sitio.",
      fields: [
        { name: "head", label: "Antes de </head>", type: "string", ui: { component: "textarea" } },
        { name: "bodyEnd", label: "Antes de </body>", type: "string", ui: { component: "textarea" } },
      ],
    },
  ],
};
