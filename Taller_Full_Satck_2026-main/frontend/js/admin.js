if (!sessionStorage.getItem("autenticado") || sessionStorage.getItem("autenticado") !== "true") {
    window.location.href = "login.html";
}

const formAdmin = document.getElementById("formAdminProductos");
const tablaProductos = document.getElementById("tablaProductos");
const respuestaAdmin = document.getElementById("respuestaAdmin");
const tituloFormulario = document.getElementById("tituloFormulario");
const btnGuardar = document.getElementById("btnGuardar");
const idProductoInput = document.getElementById("idProducto");

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();

    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            sessionStorage.removeItem("autenticado");
            window.location.href = "login.html";
        });
    }

    if (formAdmin) {
        formAdmin.addEventListener("submit", function(event) {
            event.preventDefault();

            const id = idProductoInput.value;
            const nombre = document.getElementById("nombreProducto").value;
            const precio = document.getElementById("precioProducto").value;
            const descripcion = document.getElementById("descripcionProducto").value;

            const url = id ? `http://localhost:3000/productos/${id}` : "http://localhost:3000/productos";
            const method = id ? "PUT" : "POST";

            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, precio, descripcion })
            })
            .then(res => res.json())
            .then(data => {
                respuestaAdmin.className = "text-center fw-bold small my-2 text-success";
                respuestaAdmin.textContent = id ? "Producto actualizado con éxito" : "Producto registrado con éxito";
                formAdmin.reset();
                idProductoInput.value = "";
                tituloFormulario.textContent = "Registrar Artículo";
                btnGuardar.innerHTML = '<i class="bi bi-plus-circle-fill"></i> Registrar en Catálogo';
                cargarProductos();
            })
            .catch(error => {
                respuestaAdmin.className = "text-center fw-bold small my-2 text-danger";
                respuestaAdmin.textContent = "Error al procesar la solicitud";
            });
        });
    }
});

function cargarProductos() {
    fetch("http://localhost:3000/productos")
        .then(res => res.json())
        .then(productos => {
            if (!tablaProductos) return;
            
            if (productos.length === 0) {
                tablaProductos.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No hay productos en el catálogo</td></tr>';
                return;
            }

            window.productosLocales = productos;

            let html = "";
            productos.forEach(prod => {
                html += `
                    <tr>
                        <td>${prod.id}</td>
                        <td class="fw-bold small">${prod.nombre}</td>
                        <td>$${parseInt(prod.precio).toLocaleString("es-CO")}</td>
                        <td class="text-muted small">${prod.descripcion}</td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-dark" onclick="prepararEditar(${prod.id})">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-outline-danger" onclick="eliminarProducto(${prod.id})">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            tablaProductos.innerHTML = html;
        })
        .catch(error => {
            if (tablaProductos) {
                tablaProductos.innerHTML = '<tr><td colspan="5" class="text-center text-danger py-4">Error al conectar con la API</td></tr>';
            }
        });
}

function prepararEditar(id) {
    const prod = window.productosLocales.find(p => p.id === id);
    if (!prod) return;

    idProductoInput.value = prod.id;
    document.getElementById("nombreProducto").value = prod.nombre;
    document.getElementById("precioProducto").value = prod.precio;
    document.getElementById("descripcionProducto").value = prod.descripcion;
    
    tituloFormulario.textContent = "Editar Artículo";
    btnGuardar.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar Artículo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto del catálogo?")) {
        fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            cargarProductos();
        })
        .catch(error => {
            alert("Error al eliminar el producto");
        });
    }
}