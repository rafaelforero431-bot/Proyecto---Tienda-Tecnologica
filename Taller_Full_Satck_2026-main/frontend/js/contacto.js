document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formContacto");
    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            // Capturamos los elementos y sus valores en el momento del envío
            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const mensaje = document.getElementById("mensaje").value;
            const respuesta = document.getElementById("respuesta");

            if (nombre === "" || correo === "" || mensaje === "") {
                if (respuesta) respuesta.textContent = "Todos los campos son obligatorios.";
                return;
            }

            // Enviamos la petición al backend en el puerto 3000
            fetch("http://localhost:3000/guardar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, correo, mensaje })
            })
            .then(res => res.text())
            .then(data => {
                if (respuesta) {
                    respuesta.textContent = "Datos guardados en MySQL correctamente";
                } else {
                    alert("Datos guardados en MySQL correctamente");
                }
                formulario.reset();
            })
            .catch(error => {
                console.error("Error en la petición:", error);
                if (respuesta) respuesta.textContent = "Error al guardar los datos";
            });
        });
    }
});