# Pamela Rosales · sitio web

Sitio estático para Pamela Rosales: clases, cursos, reuniones, videos y contacto para psicopedagogas, psicólogos y docentes. No necesita build ni dependencias.

## Estructura

```
index.html          Estructura de la página
css/styles.css      Estilos (colores, tipografías, diseño)
js/main.js          Navegación por pantallas, carga de datos, animaciones
data/cursos.json    Lista de cursos
data/encuentros.json Próximos encuentros (el primero aparece en el inicio)
data/videos.json    Videos (el primero va destacado)
data/contacto.json  Email, WhatsApp e Instagram
img/pamela.jpg      Foto
logo/               Logo e ícono, versión clara y oscura (SVG)
```

## Editar contenido

Casi todo se cambia desde `data/*.json`, sin tocar el HTML.

- **Cursos:** para habilitar pagos más adelante, completar `precio` (por ejemplo `"$25.000"`) y `linkPago` (link de Mercado Pago, Stripe, etc.) y aparece el botón "Inscribirme".
- **Videos:** poner en `url` el link de YouTube o Instagram de cada video.
- Los textos de ejemplo en el HTML están marcados con la clase `ph` (se ven resaltados en coral).

## Verlo en tu compu

Los datos se cargan con `fetch`, así que hay que abrirlo con un servidor local (abrir `index.html` con doble clic no carga los cursos):

```
npm start
# o bien
python3 -m http.server
```

## Publicar gratis

Cualquier hosting estático sirve, sin build: Vercel, Netlify o Cloudflare Pages (gratis, aceptan repos privados) o GitHub Pages (gratis con repo público). Para usar un dominio propio después, se sube la misma carpeta.
