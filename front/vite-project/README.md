# CG SAMO — HOMLES AND RAPERS

Página construida con React y Vite. La experiencia se organiza en cinco bloques:

1. **Carrusel:** galería centrada para fotografías cuadradas; avanza cada 5,5 segundos y pausa al pasar el cursor o enfocarla.
2. **Obra:** editor interactivo de Cabezamos; las siluetas se muestran en una caja cuadrada común del 60 % del lienzo, conservan su proporción y no se pueden escalar. Usan un degradado radial del centro hacia afuera.
3. **Título:** muestra [`samoooooo.png`](./src/assets/Ilustraciones/samoooooo.png) a gran tamaño; al pasar el cursor, la sombra sigue el contorno transparente de las letras.
4. **Música:** maqueta provisional para presentar el sonido del artista.
5. **Pie de página:** cierre de la página y espacio para redes o contacto.

El encabezado permanece fijo, compacto y separado de los enlaces. El logo de la esquina superior izquierda usa una versión recortada y transparente de `CGSAMO.png` (`CGSAMO-header.png`); el original se conserva. El desplazamiento vertical ajusta la página obligatoriamente al bloque más cercano.

## Fotografías del carrusel

Guarda las fotografías cuadradas en [`src/assets/carrusel/`](./src/assets/carrusel/). El carrusel las carga automáticamente; admite archivos AVIF, GIF, JPEG, JPG, PNG y WebP, y los ordena por nombre. Consulta las [instrucciones de la carpeta](./src/assets/carrusel/README.md).

## Desarrollo

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: genera la versión de producción en `dist/`.

El editor del segundo bloque vive en `src/App.jsx` (`BuilderBlock`) y sus estilos están en `src/App.css`.
