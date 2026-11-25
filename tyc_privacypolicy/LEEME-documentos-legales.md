# Documentos legales de Pikop — publicación en pikop.app

Instrucciones para publicar y mantener las tres páginas legales. Léelas completas
antes de tocar nada: la parte de versionado tiene consecuencias legales reales, no
es solo organización de archivos.

---

## 1. Qué son estos archivos

```
terminos-clientes-1.0.html
terminos-comercios-1.0.html
privacidad-1.0.html
```

**No son páginas completas.** Son fragmentos de contenido: solo el texto del
documento en HTML semántico (`h1`, `h2`, `h3`, `p`, `ul`, `table`), sin `<head>`,
sin CSS, sin estilos inline. Cada uno viene envuelto en:

```html
<article class="legal-doc" data-doc="..." data-version="1.0">
```

Tu trabajo es **montarlos dentro del layout del sitio** para que se vean como una
página más de pikop.app, no como un documento pegado.

---

## 2. Cómo deben verse

- **Mismo nav bar arriba** que el resto del sitio.
- **Mismo footer oscuro abajo**, incluida la columna LEGAL.
- **Tipografía del sitio.** Los fragmentos no traen fuentes ni tamaños; los hereda
  todo del sistema de estilos.
- **Márgenes anchos y cómodos.** Son documentos largos que la gente lee en el
  celular. Ancho de línea de 65–75 caracteres, interlineado holgado, buen espacio
  entre secciones. Que no quede pegado a los bordes.
- **Jerarquía clara.** `h1` es el título del documento, `h2` son las cláusulas o
  secciones, `h3` las subsecciones. Dales peso visual distinto para que se pueda
  escanear.
- **`p.legal-meta`** es la línea de versión y fecha, justo debajo del título.
  Tratala como subtítulo tenue.
- **Las tablas** deben poder scrollear en horizontal si no caben en pantalla
  angosta. Hay una tabla de penalizaciones en el documento de comercios.
- **Imprimible.** Que "guardar como PDF" desde el navegador salga limpio: sin nav,
  sin footer, sin fondos oscuros. Es como el usuario conserva su copia, y los
  documentos obligan a Pikop a permitirlo.

Estilá con libertad. Lo único intocable es el texto.

---

## 3. El texto no se modifica. Nunca.

Estos documentos fueron revisados por un abogado y son los que los usuarios
aceptan formalmente al registrarse.

- No reescribas frases, por torpes que suenen.
- No corrijas ortografía ni puntuación.
- No acortes, no resumas, no reordenes secciones.
- No cambies la numeración de las cláusulas.
- No traduzcas nada.

Si ves algo que parece un error, **reportalo, no lo arregles.** El texto se corrige
en los documentos Word originales, que son la fuente de verdad, y de ahí se vuelve
a generar el fragmento.

Lo que sí podés tocar sin preguntar: estilos, layout, clases CSS, el wrapper, los
metadatos de SEO, el `<title>` de la página.

---

## 4. Las tres URL estables

Cada documento tiene una URL que siempre apunta a la versión vigente:

| URL estable | Documento |
|---|---|
| `pikop.app/terminos` | Términos y Condiciones — Clientes |
| `pikop.app/terminos-comercios` | Términos y Condiciones — Comercios |
| `pikop.app/privacidad` | Política de Privacidad |

Esas tres URL viven dentro de la app móvil, en la casilla de aceptación del
registro. **No las cambies de nombre.**

---

## 5. Versionado — la parte importante

Además de la URL estable, cada versión necesita su propia **URL permanente**. Por
ejemplo `pikop.app/terminos/1.0`, o el idioma de rutas que use el stack. Lo que
importa es que exista y que no se caiga nunca.

### Por qué

La app guarda en Supabase, en la tabla `terms_acceptances`, qué versión exacta
aceptó cada usuario y cuándo:

```
user_id: 9f5d6f41…   document: tyc_clientes   version: 1.0   accepted_at: 2026-11-24
```

Ese registro es la prueba del consentimiento contractual. Si la versión 1.0 deja de
estar publicada, el registro apunta a nada y deja de probar algo. Además, los
documentos obligan a Pikop a permitir que un usuario consulte y conserve una copia
íntegra de la versión que aceptó.

**Los fragmentos `-1.0.html` y sus rutas se quedan para siempre, aunque exista una
versión 2.0.**

### Cómo publicar una versión nueva

1. Agregás el fragmento nuevo, por ejemplo `terminos-clientes-1.1.html`.
2. Apuntás la URL estable al fragmento nuevo.
3. **Dejás el fragmento anterior y su ruta versionada intactos.**
4. Avisás a JD para que actualice la tabla `document_versions` en Supabase.

El paso 4 no es opcional. Esa tabla es la que hace que la app le pida al usuario
volver a aceptar. Si el sitio publica la 1.1 y la tabla sigue diciendo `1.0`, los
usuarios seguirán aceptando la versión vieja y el registro quedará desalineado con
lo publicado.

---

## 6. El footer

Agregá una cuarta columna al footer oscuro, a la derecha de CONTÁCTANOS, con el
mismo tratamiento visual que las otras:

```
LEGAL
  Términos y Condiciones — Clientes    ->  /terminos
  Términos y Condiciones — Comercios   ->  /terminos-comercios
  Política de Privacidad               ->  /privacidad
```

El encabezado `LEGAL` con el mismo estilo que `NAVEGACIÓN` y `CONTÁCTANOS`:
mayúsculas, gris tenue, mismo tamaño y tracking. Los enlaces con el mismo estilo
que los de NAVEGACIÓN, abriendo en la misma pestaña.

Siempre a las **URL estables**, nunca a las versionadas. Así, cuando cambie la
versión, los enlaces siguen correctos sin tocar nada.

Revisá que el footer siga funcionando en móvil con la columna extra.

---

## 7. Requisitos

- **Públicas, sin autenticación.** Alguien que todavía no tiene cuenta tiene que
  poder leerlas antes de registrarse.
- **Indexables.** Sin `noindex`.
- **Mobile-first.** Se abren desde un WebView dentro de la app.

---

## 8. Checklist

- [ ] Los tres fragmentos montados dentro del layout del sitio
- [ ] Nav bar y footer presentes en las tres
- [ ] Márgenes anchos, ancho de línea cómodo, jerarquía clara
- [ ] `/terminos`, `/terminos-comercios` y `/privacidad` abren bien
- [ ] Las rutas versionadas también abren directo
- [ ] La tabla del documento de comercios scrollea en pantalla angosta
- [ ] Se ven bien en ancho de celular
- [ ] Imprimir a PDF sale limpio, sin nav ni footer
- [ ] Columna LEGAL en el footer, con los tres enlaces funcionando
- [ ] El texto quedó palabra por palabra igual al de los fragmentos
