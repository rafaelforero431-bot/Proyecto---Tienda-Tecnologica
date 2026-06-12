# 🌐 Taller Full Stack 2026  
## Aplicación Web: Frontend + Backend + MySQL

---

## 📌 Descripción del proyecto

Este proyecto corresponde a una aplicación web **full stack** desarrollada con tecnologías básicas de frontend, backend y base de datos.

La aplicación permite capturar información desde un formulario web, enviarla al servidor mediante JavaScript y almacenarla en una base de datos MySQL.

En este proyecto se integran los siguientes componentes:

- **Frontend:** interfaz visual creada con HTML, CSS y JavaScript.
- **Backend:** servidor desarrollado con Node.js y Express.
- **Base de datos:** almacenamiento de la información en MySQL.
- **Comunicación:** envío de datos mediante Fetch API en formato JSON.

---

## 🧱 Stack tecnológico

| Componente | Tecnología |
|-----------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| Base de datos | MySQL |
| Comunicación | Fetch API, HTTP y JSON |
| Editor recomendado | Visual Studio Code |
| Servidor local frontend | Live Server |

---

## 📁 Estructura del proyecto

```bash
TALLER_FULL_STACK_2026/
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── node_modules/        # No se incluye en Git
│
├── frontend/
│   ├── index.html
│   ├── contacto.html
│   ├── ayuda.html
│   ├── css/
│   ├── js/
│   ├── img/
│   └── video/
│
├── .gitignore
├── Documentacion.pdf
└── README.md
```

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, el estudiante debe tener instalado lo siguiente:

- Node.js  
- npm  
- MySQL  
- MySQL Workbench, recomendado para administrar la base de datos  
- Visual Studio Code  
- Extensión Live Server  
- Git, opcional para clonar el repositorio  

---

## 🔧 Instalación del proyecto

### 1. Clonar el repositorio

Para descargar el proyecto desde GitHub, ejecutar el siguiente comando:

```bash
git clone https://github.com/USUARIO/TALLER_FULL_STACK_2026.git
```

Luego ingresar a la carpeta del proyecto:

```bash
cd TALLER_FULL_STACK_2026
```

> Nota: se debe reemplazar `USUARIO` por el nombre del usuario o cuenta donde esté alojado el repositorio.

---

## 🖥️ Configuración y ejecución del backend

El backend se encuentra en la carpeta `backend`.

### 1. Ingresar a la carpeta del backend

```bash
cd backend
```

### 2. Instalar las dependencias del proyecto

```bash
npm install
```

Este comando instala las librerías necesarias definidas en el archivo `package.json`.

### 3. Ejecutar el servidor

```bash
node server.js
```

Si todo está correctamente configurado, debe aparecer un mensaje similar a:

```bash
Servidor en: http://localhost:3000
```

---

## 🗄️ Configuración de la base de datos

Para este proyecto se utiliza una base de datos llamada `contactos_db`.

En MySQL Workbench o en la consola de MySQL, ejecutar las siguientes instrucciones:

```sql
CREATE DATABASE contactos_db;

USE contactos_db;

CREATE TABLE contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  mensaje TEXT
);
```

Esta tabla permitirá almacenar los datos enviados desde el formulario del frontend.

---

## 🔌 Configuración de la conexión en Node.js

La conexión con MySQL se configura en el archivo:

```bash
backend/server.js
```

Dentro del archivo se debe revisar la siguiente sección:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Ajustar según la configuración local
  database: "contactos_db"
});
```

Es importante verificar que el usuario y la contraseña coincidan con la configuración local de MySQL en cada computador.

---

## 🎨 Ejecución del frontend

El frontend se encuentra en la carpeta `frontend`.

Para ejecutarlo:

1. Abrir el proyecto en Visual Studio Code.
2. Ingresar a la carpeta `frontend`.
3. Abrir el archivo `index.html`.
4. Hacer clic derecho sobre el archivo.
5. Seleccionar la opción **Open with Live Server**.

El navegador abrirá la página web de manera local.

---

## 🔄 Flujo de funcionamiento de la aplicación

El funcionamiento general del proyecto es el siguiente:

```text
Formulario HTML
      ↓
JavaScript con Fetch API
      ↓
Backend con Node.js y Express
      ↓
Base de datos MySQL
      ↓
Respuesta al usuario
```

### Explicación del flujo

1. El usuario diligencia el formulario en el frontend.
2. JavaScript captura los datos ingresados.
3. La función `fetch()` envía la información al backend.
4. Node.js recibe los datos mediante una ruta de Express.
5. El backend inserta la información en la tabla `contactos`.
6. MySQL almacena los datos.
7. El backend devuelve una respuesta al frontend.

---

## 🧪 Prueba del proyecto

Para verificar que el proyecto funciona correctamente:

1. Ejecutar el backend con:

```bash
node server.js
```

2. Abrir el frontend con Live Server.

3. Llenar el formulario desde la página web.

4. Enviar los datos.

5. Verificar en MySQL que la información fue almacenada:

```sql
SELECT * FROM contactos;
```

Si la información aparece en la tabla, significa que la conexión entre frontend, backend y base de datos funciona correctamente.

---

## ⚠️ Problemas comunes y posibles soluciones

| Problema | Posible solución |
|---------|------------------|
| Error de conexión con MySQL | Revisar usuario, contraseña y nombre de la base de datos |
| El servidor no inicia | Verificar que Node.js esté instalado correctamente |
| Puerto ocupado | Cambiar el puerto en el archivo `server.js` |
| Error CORS | Verificar que el backend tenga configurado `cors()` |
| No se guardan los datos | Revisar la consola del backend y la consulta SQL |
| El frontend no se comunica con el backend | Verificar la URL usada en `fetch()` |
| Se subió la carpeta `node_modules` a GitHub | Revisar que esté incluida en el archivo `.gitignore` |

---

## 📌 Recomendaciones para los estudiantes

- Ejecutar primero el backend antes de probar el formulario.
- Verificar que MySQL esté activo.
- Revisar cuidadosamente el usuario y la contraseña de MySQL.
- No subir la carpeta `node_modules` al repositorio.
- Consultar la consola del navegador y la terminal de Node.js cuando ocurra un error.
- Mantener organizada la estructura de carpetas del proyecto.

---

## ✅ Resultado esperado

Al finalizar la configuración, el estudiante debe poder:

- Ejecutar el frontend desde Live Server.
- Ejecutar el backend con Node.js.
- Conectar el backend con MySQL.
- Enviar datos desde un formulario HTML.
- Guardar los datos en la base de datos.
- Consultar los registros almacenados en MySQL.

---

## 📚 Propósito académico

Este taller tiene como propósito que el estudiante comprenda la integración básica entre frontend, backend y base de datos en una aplicación web.

A través del ejercicio, se fortalecen competencias relacionadas con:

- Estructura de proyectos web.
- Programación del lado del cliente.
- Programación del lado del servidor.
- Conexión con bases de datos.
- Uso de herramientas de desarrollo.
- Comprensión del flujo de datos en una aplicación full stack.
