import type { Collection } from "tinacms";
import { seoField } from "../fields/seo";

export const nosotrosPageCollection: Collection = {
  name: "nosotrosPage",
  label: "Página · Nosotros",
  path: "src/content/nosotros-page",
  format: "json",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/nosotros",
  },
  fields: [seoField],
};
