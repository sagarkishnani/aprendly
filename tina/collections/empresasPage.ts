import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const empresasPageCollection: Collection = {
  name: "empresasPage",
  label: "Página · Para empresas",
  path: "src/content/empresas-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/empresas",
  },
  fields: [seoField],
};
