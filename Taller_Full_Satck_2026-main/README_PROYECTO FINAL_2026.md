# Tecnohogar - Tienda Virtual Personalizada

Tienda online básica desarrollada como proyecto final para el programa de formación del SENA, adaptada para la gestión y venta de componentes de hardware y periféricos de alto rendimiento.

## 👥 Integrantes

- **Rafael Jaime Forero Cardona** - Desarrollador Principal

## 🚀 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5 y Bootstrap Icons.
- **Backend:** Node.js, Express.js.
- **Base de Datos:** MySQL (Gestionada localmente a través de **XAMPP / phpMyAdmin**).

## 📁 Estructura del Proyecto

- `frontend/`: Páginas de la interfaz de usuario, estilos, imágenes y lógica del lado del cliente.
- `backend/`: Servidor API y controladores de comunicación.
- `README_PROYECTO FINAL_2026.md`: Documentación oficial del proyecto.

## 🛠️ Instrucciones de Instalación y Ejecución

### 1. Base de Datos (XAMPP)

1. Abrir el Panel de Control de **XAMPP**.
2. Iniciar los servicios de **Apache** y **MySQL**.
3. Acceder a `http://localhost/phpmyadmin` en el navegador.
4. Crear una base de datos llamada `contactos_db`.
5. Crear las tablas correspondientes (`contactos`, `usuarios`, `productos`) para el correcto almacenamiento de la información.

### 2. Backend (Node.js)

1. Abrir una terminal en VS Code dentro de la carpeta `backend/`.
2. Instalar las dependencias necesarias ejecutando:
   ```bash
   npm install
   ```
