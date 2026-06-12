const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir comunicación con frontend
app.use(cors());
app.use(express.json());

// Configuración de conexión (Ajustado para XAMPP sin contraseña)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // 🔌 Se cambiador "root" por comillas vacías para XAMPP
    database: "contactos_db"
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});


// ✅ RUTA PARA GUARDAR DATOS
app.post("/guardar", (req, res) => {

    const { nombre, correo, mensaje } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!nombre || !correo || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";

    db.query(sql, [nombre, correo, mensaje], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }

        console.log("Registro insertado:", result);
        res.send("Datos guardados correctamente");
    });
});


// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});