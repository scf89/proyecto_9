# proyecto_9
 
## Descripción

Este proyecto es un scraper diseñado para extraer información de productos del sitio web [Dungeon Marvels](https://dungeonmarvels.com). El scraper recopila datos como el título, precio, descuento, descripción y URL de la imagen de cada producto en una categoría específica y guarda la información en un archivo `products.json`.

## Características

- Navega por las páginas de productos.
- Extrae datos relevantes de cada producto.
- Soporta paginación para obtener productos de múltiples páginas.
- Guarda los datos en un archivo JSON.

## Tecnologías Utilizadas

- [Node.js](https://nodejs.org/) - Entorno de ejecución de JavaScript.
- [Puppeteer](https://pptr.dev/) - Biblioteca para controlar navegadores mediante código, ideal para hacer scraping de sitios web.
- [fs](https://nodejs.org/api/fs.html) - Módulo de Node.js para manipular archivos.

## Uso

1. Asegúrate de que Node.js esté instalado en tu máquina.

2. Ejecuta el scraper:
  npm run start