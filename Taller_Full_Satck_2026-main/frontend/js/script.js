console.log("Script cargado correctamente");

// 🔑 CORRECCIÓN: Se cambió "formulario" por "formContacto" para que coincida con tu HTML
const formulario = document.getElementById("formContacto");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        console.log("Evento submit ejecutado");

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const mensaje = document.getElementById("mensaje").value;

        console.log("Nombre:", nombre);
        console.log("Correo:", correo);
        console.log("Mensaje:", mensaje);

        const respuesta = document.getElementById("respuesta");

        // Validación
        if (nombre === "" || correo === "" || mensaje === "") {
            if (respuesta) respuesta.textContent = "Todos los campos son obligatorios.";
            return;
        }

        // ENVIAR AL BACKEND
        fetch("http://localhost:3000/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log("Respuesta servidor:", data);
            if (respuesta) {
                respuesta.textContent = "Datos guardados en MySQL correctamente";
            } else {
                alert("Datos guardados en MySQL correctamente");
            }
            formulario.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            if (respuesta) respuesta.textContent = "Error al guardar los datos";
        });

    });
}