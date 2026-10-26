# Arrancar Forms en Windows

El `README.md` de Dapta explica el arranque con `pnpm dev`. En Windows hay tres
cosas que lo impiden; aquí está cómo sortearlas. Probado el 26 oct 26 con
Windows 11, Node 22.23.4 y pnpm 10.15.0.

Todos los comandos, desde **git-bash** (o WSL): los scripts del repo usan
sintaxis de shell POSIX y no funcionan en PowerShell ni en `cmd`.

## 1. Node 22, no Node 24

Con Node 24, `pnpm install` falla en `better-sqlite3` (la base de datos local
del modo rápido): no tiene versión precompilada para Node 24 en Windows e intenta
compilarla, lo que exige Visual Studio Build Tools. Con Node 22 se descarga ya
compilada.

La forma cómoda es un gestor de versiones, para que cada proyecto use la suya:

```bash
winget install Schniz.fnm
fnm install 22
fnm use 22
node -v    # v22.x
```

Para que la terminal cargue fnm al abrirse, sigue la sección de git-bash de
https://github.com/Schniz/fnm#shell-setup.

## 2. pnpm a través de Corepack

El repo fija su versión de pnpm en `package.json` (`packageManager`). Corepack,
que viene con Node, la usa sin instalar pnpm global:

```bash
corepack enable pnpm
pnpm -v    # 10.15.0
```

Si `corepack enable` pide permisos de administrador, es que Node está instalado
en `Program Files`. Con fnm no pasa.

## 3. Instalar y preparar

```bash
pnpm install --frozen-lockfile
pnpm run build:packages
pnpm run db:setup          # crea .data/dev.db con los datos de demo
```

El aviso `Ignored build scripts: @nestjs/core` es normal: Dapta no lo deja
ejecutar a propósito.

## 4. Arrancar la web y la API por separado

`pnpm dev` levanta la web, pero la API se queda colgada sin escuchar: su modo de
recarga automática (`tsx watch`) no arranca bajo turbo en Windows. Se lanzan en
dos terminales:

```bash
# Terminal 1: API en el puerto 4000
cd apps/api && pnpm exec tsx src/main.ts
```

```bash
# Terminal 2: web en el puerto 3000
pnpm --filter @quill/web dev
```

La API así no se recarga sola: tras cambiar algo en `apps/api` o en
`packages/`, se para con Ctrl+C y se vuelve a lanzar.

Al arrancar, la web de Next.js reescribe sola algún fichero suyo (`apps/web/next-env.d.ts`, `apps/web/AGENTS.md`). No es un cambio nuestro: no se sube. Se deshace con `git checkout -- <fichero>`.

## 5. Comprobar

- API: http://localhost:4000/health devuelve `"status":"ok"` y `"db":"up"`.
- Formulario de demo: http://localhost:3000/acme/f/lead-qualifier
- Panel: http://localhost:3000/admin (entra solo como el usuario de demo).
- Volver a los datos de demo: `pnpm db:reset`.

## Forms y Calendars a la vez

Los dos usan por defecto los puertos 3000 y 4000. Forms se queda en esos; para
Calendars hay que usar otros (ver su `docs/axon/LOCAL.md`, que usa 3111 y 4111).
