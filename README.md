<h1 align="center"> FILHOTE SHOP </h1>

<h5 align="center"> Ecommerce realizado como trabajo final de la Diplomatura Web Full Stack en ICARO</h5>

<p align="center">
   <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
   </p>

## :point_right: Temática de la página:
Es un ecommerce dedicado a la venta de productos para mascotas

## :point_right: Historia de la página:
La página se llama Filhote Shop, Tienda de Mascotas (Filhote en portugues significa cachorro), se comercializarán en principio productos para perros 	:dog: y gatos 	:smiley_cat:. Adicionandosé exóticos 	:hamster:

Algunos de los productos que se venderán serán:
- Alimentos
- Suplementos
- Snacks
- Juguetes
- Accesorios
- Articulos de higiene
- Articulos de peluqueria

## :point_right: Público objetivo:
El público al cual me dirijo es de Argentina, mayores de 18 años.

## :point_right: Tipografía Principal:
En Google Fonts elegí la tipografía **Catamaran** y **Overlock**. Se puede visualizar [haciendo clic aquí](https://fonts.google.com/share?selection.family=Catamaran:wght@100;300;500;800;900%7COverlock:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900).
 

## :point_right: Paleta de colores:
Los colores elegidos son en la gama de los verdes, rojizos oscuros, maiz, grises, negros

Generador de paleta a partir del logo: https://coolors.co/fcfcfc-628c72-85938a-e4efe8-16552e

![image](https://user-images.githubusercontent.com/97200944/206865904-7f816834-3268-469b-92d5-0df8a12afc2f.png)

Combinación de colores: https://coolors.co/0b4d24-bf2f2f-face54-828c84-d3fcd5

![palette](https://user-images.githubusercontent.com/97200944/206865926-42280768-d3bc-4bc9-92dd-32cc06c9960c.svg)

## :point_right: Logo 

![FILHOTE SHOP](https://user-images.githubusercontent.com/97200944/206865164-799a7ed3-30a6-4ab5-a71d-153e9deb4b89.png)

## :point_right: Diseño en FIGMA

El bocetado de cada wireframe fue realizado utilizando Figma, y se puede ver en este [LINK](https://www.figma.com/file/zmelQEQOEfQyVFEAD5Bfhh/FILHOTE-SHOP?t=WY1bXL3pqTCzA4nd-6).

## :point_right: Previsualización

![proyecto web_FILHOTE SHOP_GDN DEV](https://github.com/GimeDiStefanoN/DiStefano-FilhoteShop/assets/97200944/04b7f6ab-7e0c-4e96-848c-b43856c0ef9e)

## :point_right:  🛠️ Pasos a Seguir

1. Clona el repositorio
```bash
git clone https://github.com/GimeDiStefanoN/DiStefano-FilhoteShop
```
2. Entrar a la carpeta del proyecto
```bash
cd DiStefano-FilhoteShop
```
3. Abrir VSC
```bash
code .
```
4. PARA EL PROYECTO DE NODE.JS y EXPRESS
   4.1 Abrir otra consola
      ```bash
      Control+J
      ```
   4.2 Entrar a la carpeta SERVER
   ```bash
   cd SERVER
   ```
   4.3 Instala dependencias
   ```bash
   npm install
   ```
   4.4 Configura las migraciones
   ```bash
   En la carpeta Config, modificar el password de MYSQL.
   ```
   4.5 Ejecuta seeders > Creo base de datos
   ```bash
   npx sequelize-cli db:create
   ```
   4.6 Ejecuta seeders > Cargo datos en la BD
   ```bash
   npx sequelize-cli db:seed:all
   ```
   4.7 Ejecuta el proyecto
   ```bash
   nodemon src/app.js
   ```
   4.8 Abre el link que te proporciona la consola en el Navegador
   ```bash
   ejemplo:  http://localhost:3000/
   ```
5. PARA EL PROYECTO DE REACT
   5.1 Entrar a la carpeta Frontend
   ```bash
   cd FRONTEND
   ```
   5.2 Instala dependencias
   ```bash
   npm install
   ```
   5.3 Ejecuta el proyecto
   ```bash
   npm run dev
   ```
   5.4 Abre el link que te proporciona la consola en el Navegador
   ```bash
   ejemplo:  http://localhost:5173/
   ```