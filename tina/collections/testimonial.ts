import type { Collection } from "tinacms";

export const testimonialCollection: Collection = {
  name: "testimonial",
  label: "Testimonios",
  path: "src/content/testimonials",
  format: "json",
  fields: [
    { name: "name", label: "Nombre", type: "string", isTitle: true, required: true },
    { name: "role", label: "Rol", type: "string" },
    { name: "quote", label: "Testimonio", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Foto", type: "image" },
    { name: "order", label: "Orden", type: "number" },
  ],
};
