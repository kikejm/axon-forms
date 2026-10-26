# Marca: de dForms a AxonForm

Inventario de todo lo que lleva la marca de Dapta en este repo y cómo se
sustituye por la de Axon. Es el plan de la fase de marca: solo logos, colores,
letra y textos con el nombre. La interfaz y el backend se quedan como los
escribe Dapta (ver [`UPSTREAM.md`](UPSTREAM.md)).

Inventario hecho el 26 oct 26 sobre `upstream/main` (`bab030c`).

## Decisiones

| Qué | Decisión | Estado |
|---|---|---|
| Nombre | **AxonForm**. Producto aparte de AxonCalendar | Decidido, 26 oct 26 |
| Logo | Como el de AxonSynapse: el nombre en Alan Sans 800 con un punto del color de acento detrás, y un icono propio para el favicon | Hecho, 26 oct 26: `components/brand/axon-logo.tsx` y favicon (icono sobre baldosa `#1a1a1c`) |
| Letra | **Alan Sans**, la misma que AxonSynapse y el resto de Axon | Decidido, 26 oct 26 |
| Colores | **Amarillo AxonForm** (rectifica el azul, 26 oct 26). Claro: relleno `#F3DE2C` con texto `#1a1a1c` encima; texto o línea en amarillo sobre fondo claro, `#7a6e07`. Oscuro: el mismo `#F3DE2C` (12,7:1 sobre el fondo oscuro) con texto `#1a1a1c` encima. Sustituye al verde de Dapta | Decidido, 26 oct 26 |
| Sello «Hecho con…» | A dónde lleva y si se muestra | Pendiente |

## Lo que Dapta ya dejó preparado para un fork

Dapta separa su marca del producto: su arte (logos de dForms y de Dapta) solo
se pinta cuando la variable `NEXT_PUBLIC_PRODUCT_NAME` vale `dForms`
(`apps/web/lib/product-name.ts`). En un fork sale una marca neutra: el nombre
en texto y un cuadradito con la inicial. Por eso una parte del cambio no toca
código, solo configuración.

## Inventario

### 1. Configuración (variables de entorno, sin tocar código)

| Variable | Qué cambia | Valor para AxonForm |
|---|---|---|
| `NEXT_PUBLIC_PRODUCT_NAME` | Nombre en la barra lateral, el selector de apps, el título de la pestaña y la descripción de la web (`app/layout.tsx`) | `AxonForm` |
| `NEXT_PUBLIC_SIGNUP_URL` / `NEXT_PUBLIC_LANDING_URL` | A dónde lleva el sello «Made with…» de los formularios públicos | La web de AxonForm (pendiente) |
| `NEXT_PUBLIC_HIDE_BADGE` | Oculta el sello | Según decidamos |
| `NEXT_PUBLIC_PLATFORM_URL` | Enlace «plataforma» del selector de apps | Web de Axon Growth, o vacío para ocultarlo |
| `NEXT_PUBLIC_CALENDARS_URL` | Enlace a Calendars del selector de apps | La URL de AxonCalendar |
| `MAIL_FROM_NAME` y remitente | Nombre y dirección de los emails | `AxonForm` y el dominio que se elija |

Son de compilación (`NEXT_PUBLIC_*`): se fijan al construir la imagen de la web.

### 2. Colores (`packages/shared/src/tokens.css`)

El acento de Dapta es **Signal Green** (`#3ddc84`), con tinta negra encima.
Se sustituye en el bloque oscuro y en el claro:

- `--signal`, `--signal-foreground`, `--signal-edge`, `--signal-ink`
- `--ring` (el anillo de foco del teclado)

Ojo al contraste: Dapta pone siempre texto negro sobre el verde. Con un acento
más oscuro (un azul, por ejemplo) el texto encima tiene que ser blanco, así que
`--signal-foreground` cambia también. `--score` (morado, puntuación) y
`--warning` (ámbar) son colores con significado, no de marca: se quedan.

**Choque con el amarillo:** `--warning` (`#f5a524`, cambios sin publicar, respuesta
parcial) es un ámbar muy cercano al amarillo de AxonForm (`#F3DE2C`). Hay que
revisarlo en pantalla al aplicar el color; si se confunden, se cambia el tono
de `--warning` (es un token, zona de marca) y se anota en el registro.

Formularios públicos: tienen sus propios colores, que elige quien crea el
formulario. Los formularios nuevos nacen con el tema «dForms» (fondo blanco,
tinta y verde), definido en `packages/engine/src/form-design.ts`
(`NEW_FORM_PRESET_ID`). Ese fichero es de la zona de Dapta: decidir si se deja
o si se añade un tema «AxonForm» y se usa como predeterminado.

### 3. Letra

| Dónde | Ahora | Cambio |
|---|---|---|
| `apps/web/app/globals.css` (`--font-sans`) | Hanken Grotesk | Alan Sans |
| Formularios públicos (`packages/engine/src/form-design.ts`) | Figtree por defecto, y 9 familias a elegir | Añadir Alan Sans como opción; la predeterminada va con la decisión del tema |

Alan Sans está en Google Fonts (licencia OFL), así que puede cargarse igual
que Dapta carga las suyas, con `next/font`, sin servidores de terceros en el
navegador.

### 4. Logos e iconos

| Fichero | Qué es | Cambio |
|---|---|---|
| `apps/web/components/brand/brand.tsx` | Decide qué marca se pinta; en un fork, el cuadradito con la inicial | Pintar nuestro logo en vez del cuadradito. Nuestro logo, en un fichero nuevo (`components/brand/axon-logo.tsx`) |
| `apps/web/app/icon.svg`, `apple-icon.png` | Favicon e icono de iOS | Nuestro icono |
| `apps/web/public/forms_*.svg`, `logo_solo*.svg`, `dapta-mark.png` | Arte de Dapta | No se borra (solo sale en su build); no se usa |
| `apps/web/lib/og-brand.ts` + `opengraph-image.tsx` del formulario público | Imagen al compartir un formulario: lleva la marca de dForms si el autor no puso logo | Nuestra marca |
| `apps/web/components/made-with-badge.tsx` | Sello del formulario público | Texto del catálogo (punto 5) y enlace por configuración (punto 1) |

### 5. Textos con el nombre (catálogos)

Hay unas 140 apariciones de «dForms» o «Dapta» en
`packages/shared/src/i18n/index.ts` (inglés y español), más las de
`apps/web/app/admin/forms/[id]/edit/_components/builder-messages.ts`. Algunas
son evidentes («Made with dForms», «Get dForms, free»). La mayoría están en la
guía para conectar agentes de IA («Add dForms to Claude Code»…).

Cambiarlas una a una es la mayor fuente de conflictos: Dapta toca el catálogo en
casi cada versión. La propuesta es una capa de sustitución:

- un fichero nuestro (`packages/shared/src/i18n/axon-brand.ts`) con la tabla
  de sustituciones (`dForms` → `AxonForm`, `Dapta Calendars` → `AxonCalendar`,
  «Productos Dapta» → …), que recorre el catálogo una vez y devuelve la copia
  cambiada;
- y una sola línea en `getMessages` para que devuelva el catálogo pasado por
  esa capa.

Así, cada texto nuevo que añada Dapta con su marca sale ya con la nuestra, y el
catálogo no se toca. Los textos que no se arreglan con una sustitución (los que
hablan de la suscripción a Dapta AI o del botón «Continue with Dapta» del login)
van en la misma tabla como frases enteras.

### 6. Emails

`packages/notifications/src/templates.ts`: el aviso de invitación a un espacio
de trabajo dice «en dForms» (4 líneas, inglés y español). Cambio directo en la
zona de marca.

### 7. Lo que se queda tal cual

No son marca visible o romperían la compatibilidad con Dapta:

- Nombres internos: el paquete `@quill/*`, `IS_DAPTA_BRAND`, `dapta-sync.ts` y
  las variables `DAPTA_SYNC_*`, `IAM_*` (son la puerta para mandar las altas a
  nuestro CRM).
- El atributo `data-dapta-forms` y los mensajes `dapta-forms:*` de `embed.js`:
  son el contrato con las webs donde se incrusta un formulario. Cambiarlos
  rompería los formularios ya incrustados.
- Comentarios del código y el arte de Dapta en `apps/web/public/`.

## Estado (26 oct 26)

Hecho: nombre (por `.env` en local), letra, color de acento, logo con punto,
favicon e icono de iOS. Ficheros tocados, en el registro de `UPSTREAM.md`.

Pendiente:

- Textos con la marca de Dapta (punto 5) y emails (punto 6).
- Verdes de Dapta escritos a mano fuera de `tokens.css`: el brillo de «Conecta
  tu agente» en la barra lateral (`apps/web/app/globals.css`, `rgb(61 220 132)`)
  (`apps/web/app/globals.css` y `apps/web/app/admin/_components/agent-promo.css`),
  el color por defecto del kit de marca
  (`apps/web/app/admin/account/brand-kit/brand-kit-panel.tsx`) y las animaciones
  de la página para desarrolladores (`apps/web/app/admin/developers/walk-kit.tsx`,
  `app-frames.tsx`).
- Color por defecto de las páginas públicas de quien no eligió uno.
- Tema de los formularios nuevos («dForms», en `packages/engine/src/form-design.ts`).
- El punto del logo es decorativo: en modo claro el amarillo de AxonForm se ve
  poco sobre blanco. Si molesta, usar `--signal-edge` (más oscuro en claro).
- El nombre en producción va por variables de entorno del despliegue.

## Orden de trabajo propuesto

1. Configuración (punto 1): da el nombre en la interfaz sin tocar código.
2. Colores y letra (puntos 2 y 3).
3. Logo e iconos (punto 4), cuando estén diseñados.
4. Capa de textos (punto 5) y emails (punto 6).
5. Revisar en el navegador modo claro y oscuro, formulario público y panel, y
   anotar en el registro de `UPSTREAM.md` cada fichero de Dapta tocado.
