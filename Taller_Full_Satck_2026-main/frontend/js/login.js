document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault();

            const usuario = document.getElementById("usuario").value;
            const contrasena = document.getElementById("password").value;
            const captchaCheck = document.getElementById("captchaCheck").checked;
            const respuestaLogin = document.getElementById("respuestaLogin");

            if (!captchaCheck) {
                if (respuestaLogin) {
                    respuestaLogin.className = "text-center fw-bold small my-2 text-danger";
                    respuestaLogin.textContent = "Por favor, marca la casilla 'No soy un robot'.";
                }
                return;
            }

            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario, contrasena })
            })
            .then(res => {
                if (!res.ok) throw new Error("Credenciales incorrectas");
                return res.json();
            })
            .then(data => {
                if (respuestaLogin) {
                    respuestaLogin.className = "text-center fw-bold small my-2 text-success";
                    respuestaLogin.textContent = "Acceso concedido. Redireccionando...";
                }

                // Guardamos la sesión activa en el navegador
                sessionStorage.setItem("autenticado", "true");

                setTimeout(() => {
                    window.location.href = "admin-productos.html";
                }, 1500);
            })
            .catch(error => {
                if (respuestaLogin) {
                    respuestaLogin.className = "text-center fw-bold small my-2 text-danger";
                    respuestaLogin.textContent = "Usuario o contraseña incorrectos.";
                }
            });
        });
    }

    const btnEnviarRecuperacion = document.getElementById("btnEnviarRecuperacion");
    if (btnEnviarRecuperacion) {
        btnEnviarRecuperacion.addEventListener("click", () => {
            const correo = document.getElementById("correoRecuperacion").value;
            const respuestaRecuperar = document.getElementById("respuestaRecuperar");

            if (correo === "") {
                if (respuestaRecuperar) {
                    respuestaRecuperar.className = "text-center fw-bold small text-danger";
                    respuestaRecuperar.textContent = "Por favor, escribe tu correo electrónico.";
                }
                return;
            }

            if (respuestaRecuperar) {
                respuestaRecuperar.className = "text-center fw-bold small text-success";
                respuestaRecuperar.textContent = "Enlace enviado. Revisa tu bandeja de entrada.";
            }
        });
    }
});