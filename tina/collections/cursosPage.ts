import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const cursosPageCollection: Collection = {
  name: "cursosPage",
  label: "Página · Cursos",
  path: "src/content/cursos-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/cursos",
  },
  fields: [seoField],
};
