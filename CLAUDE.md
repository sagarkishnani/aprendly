# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Comandos

```bash
npm run dev        # TinaCMS + Astro (siempre juntos: /admin necesita el server de Tina)
npm run build:local # build sin credenciales de TinaCloud (datalayer local)
npm run build      # tinacms build → astro build
npm run preview     # previsualiza el build de producción
```

No hay test runner configurado.

Tina corre en los puertos **4011** (GraphQL) y **9011** (datalayer), no en los
4001/9000 por defecto, para poder levantar este proyecto a la vez que otros del
mismo stack. Están fijados en los scripts de `package.json`.

## Entorno

Copia `.env.example` a `.env`. Deja `TINA_CLIENT_ID`/`TINA_TOKEN` vacíos para
trabajar en **modo local** (Tina lee y escribe los archivos de `src/content/`
sin cuenta en la nube).

**`TINA_BRANCH` importa más de lo que parece.** TinaCloud indexa el contenido
**por rama**, y el valor se hornea dentro de `tina/__generated__/client.ts` al
correr `tinacms build`: *no* se lee en runtime. Compilar un árbol contra el
índice de otra rama falla si los schemas difieren.

## Flujo de trabajo

### Ramas

`main` es producción y `staging` la línea de desarrollo. Las ramas de trabajo
**siempre salen de `staging` actualizado** y se PR-ean contra `staging`:

```
tipo/descripcion-corta
```

| Tipo | Cuándo |
|------|--------|
| `feat/` | Nueva funcionalidad |
| `fix/` | Corrección de error |
| `chore/` | Mantenimiento, dependencias, configuración, limpieza |

Ejemplos: `feat/formulario-contacto`, `fix/total-checkout-igv`,
`chore/actualizar-dependencias`. Minúsculas, palabras separadas por guiones, sin
tildes ni espacios.

### Commits

Conventional Commits, descripción **en presente y en español**:

```
tipo(alcance opcional): descripción en presente
```

```
feat: agrega formulario de contacto
fix(checkout): corrige cálculo del total con IGV
chore: actualiza dependencias
```

### Código sin comentarios

El código tiene que explicarse solo: nombres claros de variables, funciones y
componentes, y funciones pequeñas con una sola responsabilidad. **No agregues
comentarios** salvo que sea estrictamente necesario, es decir, cuando expliquen
un *por qué* que el código no puede expresar (un workaround de un bug externo,
una restricción de una API, una decisión no obvia). Nunca comentes *qué* hace
el código, no dejes código comentado y no agregues comentarios de sección o
decorativos. Si algo parece necesitar un comentario, primero renombra o extrae.

## Arquitectura

**Astro 5 SSG + React 19 (islas) + TinaCMS 2 (CMS sobre git)**

El sitio se compila estático (sin adaptador SSR). Todo lo dinámico en runtime es
una isla de React hidratada.
La excepción son los formularios, que hablan con el backend PHP (ver **Formularios**).

### Patrón de componente doble

Cada sección alimentada por el CMS son dos archivos:

- `Componente.astro` — resuelve la consulta a TinaCMS **en build time** con
  `client` de `tina/__generated__/client` y pasa `{ query, variables, data }`.
- `ComponenteReact.tsx` — recibe esas props y renderiza; envuelve el contenido en
  `useTina()`, que es lo que habilita la edición visual en el panel.

Directivas de hidratación: `client:load` arriba del fold, `client:visible`
debajo. `client:tina` (integración propia en `astro-tina-directive/`) hidrata
**solo dentro del editor de Tina**: en producción no carga React.

Las secciones de una misma página comparten una sola consulta: la página la
resuelve y se la pasa a cada isla (ver `src/pages/index.astro`).

### Contenido y colecciones

El contenido vive en `src/content/` como JSON (páginas estructuradas).
Los artículos del blog son MDX en `src/content/blog/`.
El schema de `tina/config.ts` es la única fuente de verdad sobre la forma del
contenido; cada colección vive en su propio archivo en `tina/collections/`.
Los tipos, las queries y el cliente se generan en `tina/__generated__/`
(**no editar a mano**).

Colecciones:

- `global` — navegación (con submenú), footer, botón de WhatsApp, SEO por defecto, código inyectado.
- `home` — contenido de la portada.
- `course` — un JSON por curso (`src/content/courses/`); alimenta `/cursos`, `/cursos/<slug>` y la portada.
- `teacher`, `testimonial` — profesores y testimonios, compartidos entre páginas.
- `event` — un JSON por evento (`src/content/events/`); alimenta `/eventos`, `/eventos/<slug>` y la portada.
- `cursosPage`, `rutaPage`, `nosotrosPage`, `empresasPage`, `eventosPage`, `contactoPage` — textos de cada página.
- `post` — artículos del blog en MDX (`src/content/blog/`).
- `formConfig` — por formulario: `formType`, `label`, `enabled`, `recipients[]`.
- `dynamicForms` — definición completa de cada formulario (un JSON por formulario).
- `maintenance` — modo mantenimiento del sitio.
- `cookieConsent` — textos del banner de cookies.

### Formularios (definidos en el CMS)

Los formularios no están hardcodeados:

- Cada uno es un JSON de `dynamicForms` con `fields[]` ordenados (`text`, `email`,
  `select`, `radio`, `checkbox`, `file`, `currency`, `date_triplet`,
  `section_header`, `note`…), con `validation`, `width` y visibilidad
  condicional por campo (`conditionalField`).
- `dynamic-form/DynamicForm.astro` carga un formulario por `formSlug` y lo
  renderiza con `DynamicFormReact.tsx`, que arma la UI con las primitivas de
  `shared/FormControls.tsx`.
- El envío pasa por `src/utils/submitForm.ts` → `POST` a **`send-email.php`**
  (JSON normalmente; `multipart/form-data` si hay adjuntos). Incluye honeypot
  (`website`) y token de Turnstile.
- `src/pages/form-config.json.ts` emite `/form-config.json` en build time: el
  mapa de destinatarios que lee el backend PHP.

**Secretos**: viven solo en `public/site-config.php` (git-ignored, plantilla en
`public/config.example.php`). `send-email.php` hace `require` de ese archivo.

**Captcha (Cloudflare Turnstile)**: el widget usa la site key **pública** de
`PUBLIC_TURNSTILE_SITE_KEY`; `send-email.php` verifica el token contra
`siteverify` con `turnstile_secret` y **falla cerrado** (token inválido o
`siteverify` inalcanzable ⇒ no se envía correo), solo mientras el secreto esté
configurado.

### Modo mantenimiento

`BaseLayout.astro` consulta la colección `maintenance` en build time; con
`enabled: true` reemplaza todo el cuerpo de la página por una pantalla de aviso.

### Estilos

Tailwind CSS 3 con tokens propios en `tailwind.config.mjs`. Las clases
reutilizables (`btn-primary`, `btn-secondary`, `card`, `section`, `container-xl`,
`container-lg`) están en `src/styles/global.css`, que **BaseLayout importa** —
un CSS que nadie importa no se bundlea y no llega al sitio.

Iconos: `react-icons` (Font Awesome 6, `react-icons/fa6`).

**Tema: light.** Los componentes NO escriben colores: piden tokens
semánticos, y por eso el tema se puede cambiar sin tocar una sola clase.

| Token | Para qué | Valor |
|---|---|---|
| `surface` / `surface-raised` / `surface-tint` | Fondos | `#FFFFFF` / `#F7F5FB` / `#FAF8FF` |
| `content` | Texto principal | `#160B33` |
| `content-muted` | Texto secundario | `#4A4166` |
| `content-subtle` | Metadatos | `#6B6385` |
| `line` / `line-strong` | Bordes | `#E6E0F2` / `#D6CDF0` |
| `accent` | Marca legible sobre el fondo | `#7416ED` |

Marca: `brand-primary` (`#7416ED`, con `-dark`, `-light`, `-lightest`),
`brand-pink` (`#F43870`), `brand-ink` (`#160B33`, bloques oscuros y footer),
`brand-night`, `brand-dusk`, `brand-lilac` (texto sobre `brand-ink`).

Los tonos de texto cumplen 4.5:1 sobre su fondo. Si cambias uno, vuelve a medir.
Ojo: blanco sobre `brand-pink` da 3.7:1; úsalo solo en textos de 14px semibold
o mayores (botones, etiquetas), no en párrafos.

**Nunca escribas `text-white/65` ni `bg-white/5`** fuera de bloques con fondo
oscuro fijo (`bg-brand-ink`, `bg-brand-primary`, fotos con scrim).

**Tipografía**: Poppins en todo. Escala en utilidades de Tailwind: `display`,
`heading-xl` → `heading-xs`, `subtitle-*`, `body-*`, `caption-*`, `overline`.

**Piezas compartidas** (`src/components/ui/`): `ArrowLink` / `ArrowButton`
(botón píldora con flecha que gira y texto que rueda al hover) y `Eyebrow`
(etiqueta). Úsalas en vez de reinventar botones.

**Animaciones**: `src/scripts/motion.ts` corre en todas las páginas y anima por
atributos `data-*` (`data-reveal`, `data-delay`, `data-speed`, `data-marquee`,
`data-liquid`, `data-timeline`, `data-stack-card`, `data-float`…). El HTML se
escribe en su estado final; el script lo anima desde oculto y respeta
`prefers-reduced-motion`.

### Tienda (WooCommerce, modo `shop`, apagada)

El módulo está instalado pero no hay tienda todavía. Sin `WOO_STORE_URL`,
`WOO_CONSUMER_KEY` y `WOO_CONSUMER_SECRET` en `.env`:

- el carrito no aparece en el header,
- `/tienda` muestra un estado vacío con `noindex` y no entra al sitemap,
- los botones de compra de cursos y eventos llevan a `/contacto` con el interés
  prellenado.

Para abrirla: completa las claves (también en `woo-config.php` del servidor),
carga en cada curso o evento su `wooProductId` desde el panel y cambia los CTA
de compra por `AddToCartReact`.

### Panel del CMS

Disponible en `/admin` con `npm run dev`. Las imágenes se suben a `public/`.
