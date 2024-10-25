# 🛠️  API con NestJS

Este proyecto está construido utilizando el framework **NestJS** y cuenta con un módulo **Product** para la gestión de productos a través de los siguientes endpoints:

## 📚 Endpoints del Módulo Product

- **POST** `/products`: Crear un nuevo producto.
- **GET** `/products`: Obtener una lista de todos los productos.
- **GET** `/products/:id`: Obtener los detalles de un producto por ID.
- **PUT** `/products/:id`: Actualizar un producto por ID.
- **DELETE** `/products/:id`: Eliminar un producto por ID.

## 🧑‍💻 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- **Docker** y **Docker Compose** para la gestión de contenedores.
- **pnpm** como gestor de paquetes.

## 🚀 Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando:

   ```bash
   pnpm i
   ```

3. En la raíz del proyecto, inicia el contenedor de PostgreSQL utilizando Docker Compose:
  
  ```bash
  docker-compose up -d
  ```

4. Luego, levanta el servidor en modo desarrollo con el siguiente comando:

  ```bash
  pnpm run start:dev
  ```


## 🏗️ Test e2e

  ```bash
  pnpm run test:e2e
  ```