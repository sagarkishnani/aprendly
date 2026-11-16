import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const eventosPageCollection: Collection = {
  name: "eventosPage",
  label: "Página · Eventos",
  path: "src/content/eventos-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/eventos",
  },
  fields: [seoField],
};
