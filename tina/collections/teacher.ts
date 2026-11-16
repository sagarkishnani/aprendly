import type { Collection } from "tinacms";

export const teacherCollection: Collection = {
  name: "teacher",
  label: "Profesores",
  path: "src/content/teachers",
  format: "json",
  fields: [
    { name: "name", label: "Nombre", type: "string", isTitle: true, required: true },
    { name: "tag", label: "Especialidad y experiencia", type: "string", description: "Ej.: Business English · 8 años" },
    { name: "bio", label: "Biografía corta", type: "string", ui: { component: "textarea" } },
    { name: "skills", label: "Certificaciones y temas", type: "string", list: true },
    { name: "image", label: "Foto", type: "image" },
    { name: "rating", label: "Valoración (0-5)", type: "number" },
    { name: "reviews", label: "Número de reseñas", type: "number" },
    { name: "pricePerClass", label: "Precio por clase 1 a 1 (S/)", type: "number" },
    { name: "order", label: "Orden", type: "number" },
  ],
};
