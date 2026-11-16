import type { Collection } from "tinacms";
import { CEFR_LEVELS, COURSE_GOALS, COURSE_TYPES } from "../fields/options";

export const courseCollection: Collection = {
  name: "course",
  label: "Cursos",
  path: "src/content/courses",
  format: "json",
  ui: {
    router: ({ document }) => `/cursos/${document._sys.filename}`,
  },
  fields: [
    { name: "title", label: "Nombre del curso", type: "string", isTitle: true, required: true },
    { name: "type", label: "Tipo", type: "string", options: COURSE_TYPES, required: true },
    { name: "goal", label: "Objetivo", type: "string", options: COURSE_GOALS, required: true },
    { name: "levelFrom", label: "Nivel inicial (MCER)", type: "string", options: CEFR_LEVELS },
    { name: "levelTo", label: "Nivel final (MCER)", type: "string", options: CEFR_LEVELS },
    { name: "tag", label: "Etiqueta corta (portada)", type: "string" },
    { name: "excerpt", label: "Descripción corta", type: "string", ui: { component: "textarea" } },
    { name: "image", label: "Imagen", type: "image" },
    { name: "imageAlt", label: "Texto alternativo de la imagen", type: "string" },
    { name: "price", label: "Precio (S/)", type: "number" },
    { name: "priceUnit", label: "Unidad del precio", type: "string", description: "Ej.: / nivel, / programa, / mes" },
    { name: "lessons", label: "Clases o contenido", type: "string", description: "Ej.: 36 clases/nivel" },
    { name: "duration", label: "Duración", type: "string" },
    { name: "levelsLabel", label: "Resumen de niveles", type: "string", description: "Ej.: 5 niveles (A1 → C1)" },
    { name: "format", label: "Formato", type: "string", description: "Ej.: Online en vivo · máx. 8 alumnos" },
    { name: "students", label: "Alumnos", type: "number" },
    { name: "rating", label: "Valoración (0-5)", type: "number" },
    { name: "popularity", label: "Popularidad (para ordenar)", type: "number" },
    { name: "bestSeller", label: "Top ventas", type: "boolean" },
    { name: "isNew", label: "Nuevo", type: "boolean" },
    { name: "live", label: "Clases en vivo", type: "boolean" },
    { name: "showOnHome", label: "Mostrar en la portada", type: "boolean" },
    { name: "homeOrder", label: "Orden en la portada", type: "number" },
    {
      name: "wooProductId",
      label: "ID de producto en WooCommerce",
      type: "number",
      description: "Cuando la tienda esté activa, el botón de compra usará este producto.",
    },
  ],
};
