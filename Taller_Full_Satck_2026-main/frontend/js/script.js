let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarInterfazCarrito();

    const formulario = document.getElementById("formContacto");
    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const mensaje = document.getElementById("mensaje").value;
            const respuesta = document.getElementById("respuesta");

            if (nombre === "" || correo === "" || mensaje === "") {
                if (respuesta) respuesta.textContent = "Todos los campos son obligatorios.";
                return;
            }

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
                if (respuesta) respuesta.textContent = "Error al guardar los datos";
            });
        });
    }

    document.addEventListener("click", (e) => {
        const boton = e.target.closest("[data-id]");
        if (boton) {
            const producto = {
                id: boton.getAttribute("data-id"),
                nombre: boton.getAttribute("data-nombre"),
                precio: parseInt(boton.getAttribute("data-precio")),
                cantidad: 1
            };
            agregarAlCarrito(producto);
        }
    });

    const btnVaciar = document.getElementById("btnVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            carrito = [];
            guardarYActualizar();
        });
    }

    const btnPagar = document.getElementById("btnPagar");
    if (btnPagar) {
        btnPagar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío");
                return;
            }
            alert("¡Compra simulada con éxito! Gracias por elegir Tecnohogar.");
            carrito = [];
            guardarYActualizar();
            const modalElement = document.getElementById("modalCarrito");
            if (modalElement) {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
            }
        });
    }
});

function agregarAlCarrito(productoNuevo) {
    const existe = carrito.find(item => item.id === productoNuevo.id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(productoNuevo);
    }
    guardarYActualizar();

    let alerta = document.getElementById("alerta-carrito");
    if (!alerta) {
        alerta = document.createElement("div");
        alerta.id = "alerta-carrito";
        alerta.className = "alert alert-success position-fixed shadow-lg text-center fw-bold fs-5 px-4 py-3";
        alerta.style.top = "50%";
        alerta.style.left = "50%";
        alerta.style.transform = "translate(-50%, -50%)";
        alerta.style.zIndex = "2000";
        alerta.style.minWidth = "300px";
        alerta.style.borderRadius = "10px";
        document.body.appendChild(alerta);
    }
    alerta.innerHTML = `<i class="bi bi-check-circle-fill d-block fs-2 mb-2"></i> ¡${productoNuevo.nombre}<br><span class="fw-normal small">agregado al carrito!</span>`;
    
    setTimeout(() => {
        alerta.remove();
    }, 2000);
}

function guardarYActualizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");

    if (!listaCarrito || !totalCarrito || !contadorCarrito) return;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="text-center text-muted">El carrito está vacío</p>';
        totalCarrito.textContent = "$0";
        contadorCarrito.classList.add("d-none");
        contadorCarrito.textContent = "0";
        return;
    }

    let html = '<div class="list-group list-group-flush">';
    let total = 0;
    let totalCantidad = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalCantidad += item.cantidad;
        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                <div>
                    <h6 class="mb-0 fw-bold small">${item.nombre}</h6>
                    <small class="text-muted">${item.cantidad} x $${item.precio.toLocaleString("es-CO")}</small>
                </div>
                <span class="badge bg-primary rounded-pill">$${subtotal.toLocaleString("es-CO")}</span>
            </div>
        `;
    });

    html += "</div>";
    listaCarrito.innerHTML = html;
    totalCarrito.textContent = `$${total.toLocaleString("es-CO")}`;
    contadorCarrito.textContent = totalCantidad;
    contadorCarrito.classList.remove("d-none");
}