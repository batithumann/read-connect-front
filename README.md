# ReadConnect

## [Link a aplicación desplegada en la nube](https://read-connect.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/fc010969-f7ab-4beb-9edc-551488a077ec/deploy-status)](https://app.netlify.com/sites/read-connect/deploys)

## Como instalar en local

### Frontend

1. Clonar este repositorio
2. ```npm install```
3. ```npm start```

### Backend

El backend se encuentra [en un repositorio aparte](https://github.com/batithumann/read-connect-back).

1. Clonar el repositorio de backend
2. ```npm install```
3. ```node index.js```

### Base de datos

Se deberá crear una base de datos llamada **books** en Postgres.
Dentro del repositorio de backend existe una carpeta **db**, la cual contiene un archivo **create_tables.sql**, donde esán los comandos necesarios para crear todas las tablas.
En la misma carpeta hay un script de Python **load_books.py**, que al ejecutarse leerá el archivo **amazon.books.json** y cargará los datos a la base de datos local.

## Puntos faltantes

Por falta de tiempo no pude completar todos los requisitos de la prueba.
También me hubiera gustado darle un toque más personal al diseño, y hacer mejoras de UX en general.
Faltó crear la sección de comunidad donde fuera posible seguir a otros usuarios.
También faltó el poder escribir reseñas y puntuar libros.
