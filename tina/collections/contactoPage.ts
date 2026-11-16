import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const contactoPageCollection: Collection = {
  name: "contactoPage",
  label: "Página · Contacto",
  path: "src/content/contacto-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/contacto",
  },
  fields: [seoField],
};
