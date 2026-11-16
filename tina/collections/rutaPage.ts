import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const rutaPageCollection: Collection = {
  name: "rutaPage",
  label: "Página · Ruta de aprendizaje",
  path: "src/content/ruta-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/ruta-de-aprendizaje",
  },
  fields: [seoField],
};
