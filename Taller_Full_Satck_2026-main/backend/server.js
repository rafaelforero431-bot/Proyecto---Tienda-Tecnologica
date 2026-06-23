const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos_db"
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});

app.post("/guardar", (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    if (!nombre || !correo || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }
    const sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)";
    db.query(sql, [nombre, correo, mensaje], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }
        res.send("Datos guardados correctamente");
    });
});

app.post("/login", (req, res) => {
    const { usuario, contrasena } = req.body;
    if (!usuario || !contrasena) {
        return res.status(400).json({ error: "Datos incompletos" });
    }
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
    db.query(sql, [usuario, contrasena], (err, results) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length > 0) {
            res.json({ mensaje: "Acceso concedido", usuario: results[0].usuario });
        } else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    });
});

app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json(results);
    });
});

app.post("/productos", (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ error: "Datos incompletos" });
    }
    const sql = "INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, descripcion], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json({ mensaje: "Producto registrado", id: result.insertId });
    });
});

app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ error: "Datos incompletos" });
    }
    const sql = "UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?";
    db.query(sql, [nombre, precio, descripcion, id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json({ mensaje: "Producto actualizado" });
    });
});

app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json({ mensaje: "Producto eliminado" });
    });
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});