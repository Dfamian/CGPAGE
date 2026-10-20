# CG SAMO — HOMLES AND RAPERS

Página construida con React y Vite. La experiencia se organiza en cinco bloques:

1. **Carrusel:** galería centrada para fotografías cuadradas.
2. **Obra:** editor interactivo de Cabezamos.
3. **Título:** espacio de pantalla completa reservado para el PNG de HOMLES AND RAPERS.
4. **Música:** maqueta provisional para presentar el sonido del artista.
5. **Pie de página:** cierre de la página y espacio para redes o contacto.

El encabezado permanece fijo, compacto y separado de los enlaces. El desplazamiento vertical ajusta la página obligatoriamente al bloque más cercano.

## Fotografías del carrusel

Guarda las fotografías cuadradas en [`src/assets/carrusel/`](./src/assets/carrusel/). El carrusel las carga automáticamente; admite archivos AVIF, GIF, JPEG, JPG, PNG y WebP, y los ordena por nombre. Consulta las [instrucciones de la carpeta](./src/assets/carrusel/README.md).

Cuando esté listo, el PNG del título puede agregarse en `src/assets/homles-and-rapers.png` y colocarse en el espacio reservado del tercer bloque.

## Desarrollo

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run lint`: ejecuta ESLint.
- `npm run build`: genera la versión de producción en `dist/`.

El editor del segundo bloque vive en `src/App.jsx` (`BuilderBlock`) y sus estilos están en `src/App.css`.
