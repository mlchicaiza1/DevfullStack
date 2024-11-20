## API RESTful con Laravel

En la carpeta 'prueba-api' se encuentra el API RESTful con Laravel

Versiones:
    php 8.2
    laravel 11
    mysql 8

Para iniciar el proyecto se puede realizar mediante docker o tener instalado en el equipo composer, php y mysql; como Xampp

    Docker
    1. Construir la imagen y el contenedor: docker-compose up --build -d
    2. Ingresar al bash del contenedor:  docker-compose exec app bash
    3. Ejecutar los comandos para iniciar el proyecto: 
        - composer install
        - php artisan migrate

## Interfaz Frontend con Vue.js

En la carpeta 'prueba-vue' se encuentra el Frontend con Vue.js

Versiones:
    Node 18.18.2

Para iniciar el proyecto se requiere la instalcion de los paquetes mediante npm, yarn, otros. Para este proyecto se utilizo yarn.

    - Ejecutar en la terminal: yarn
    - Se subio el archivo .env para añadir la url del api.
    - Para iniciar el proyecto se utliza el comando: yarn dev


## Optimización de Consultas MySQL

El script para optimizar la consulta SQL sobre la tabla product que se crea al migrar el proyecto de laravel se encuntra en la carpeta scriptDB


## Coleccion Postman
Se encunetra en la carpeta 'coleccion-postman'
