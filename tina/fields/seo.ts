import type { TinaField } from "tinacms";

export const seoField: TinaField = {
  type: "object",
  name: "seo",
  label: "SEO",
  fields: [
    { name: "title", label: "Título", type: "string" },
    { name: "description", label: "Descripción", type: "string", ui: { component: "textarea" } },
  ],
};
