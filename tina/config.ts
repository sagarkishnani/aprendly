import { defineConfig } from "tinacms";
import { globalCollection } from "./collections/global";
import { homeCollection } from "./collections/home";
import { postCollection } from "./collections/post";
import { formConfigCollection } from "./collections/formConfig";
import { dynamicFormsCollection } from "./collections/dynamicForms";
import { shopCollection } from "./collections/shop";
import { maintenanceCollection } from "./collections/maintenance";
import { cookieConsentCollection } from "./collections/cookieConsent";
import { courseCollection } from "./collections/course";
import { teacherCollection } from "./collections/teacher";
import { testimonialCollection } from "./collections/testimonial";
import { eventCollection } from "./collections/event";
import { cursosPageCollection } from "./collections/cursosPage";
import { rutaPageCollection } from "./collections/rutaPage";
import { nosotrosPageCollection } from "./collections/nosotrosPage";
import { empresasPageCollection } from "./collections/empresasPage";
import { eventosPageCollection } from "./collections/eventosPage";
import { contactoPageCollection } from "./collections/contactoPage";

export default defineConfig({
  branch: process.env.TINA_BRANCH || "staging",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      globalCollection,
      homeCollection,
      courseCollection,
      teacherCollection,
      testimonialCollection,
      eventCollection,
      cursosPageCollection,
      rutaPageCollection,
      nosotrosPageCollection,
      empresasPageCollection,
      eventosPageCollection,
      contactoPageCollection,
      postCollection,
      formConfigCollection,
      dynamicFormsCollection,
      shopCollection,
      maintenanceCollection,
      cookieConsentCollection,
    ],
  },
});
