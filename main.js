document.addEventListener("DOMContentLoaded", () => {
    cargarArl();
    cargarMinisterios();
    cargarRecursos();
    cargarPresupuestos();
    cargarAccidentes(); // solo se ejecutará en la página que tenga esa tabla
});

/* ARL */
async function cargarArl() {
    const tabla = document.querySelector("#tablaArl tbody");
    if (!tabla) return; // si la tabla no existe, no hace nada

    const res = await fetch("./data/arls.json");
    const arls = await res.json();

    arls.forEach(a => {
        tabla.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.nombre_arl}</td>
            <td>${a.nombre_caso}</td>
        </tr>`;
    });
}

/* MINISTERIOS */
async function cargarMinisterios() {
    const tabla = document.querySelector("#tablaMinisterios tbody");
    if (!tabla) return;

    const res = await fetch("./data/ministerios.json");
    const ministerios = await res.json();

    ministerios.forEach(m => {
        tabla.innerHTML += `
        <tr>
            <td>${m.id}</td>
            <td>${m.nombre_ministerio}</td>
            <td>${m.reporte_ministerio}</td>
        </tr>`;
    });
}

/* RECURSOS */
async function cargarRecursos() {
    const tabla = document.querySelector("#tablaRecursos tbody");
    if (!tabla) return;

    const res = await fetch("./data/recursos.json");
    const recursos = await res.json();

    recursos.forEach(r => {
        tabla.innerHTML += `
        <tr>
            <td>${r.id}</td>
            <td>${r.tipo_recurso}</td>
            <td>${r.estado_recurso}</td>
            <td>${r.mantenimiento_recurso}</td>
        </tr>`;
    });
}

/* PRESUPUESTOS */
async function cargarPresupuestos() {
    const tabla = document.querySelector("#tablaPresupuestos tbody");
    if (!tabla) return;

    const res = await fetch("./data/presupuestos.json");
    const presupuestos = await res.json();

    presupuestos.forEach(p => {
        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>$${p.cantidad_de_dinero.toLocaleString()}</td>
            <td>${p.fuente_financiamiento}</td>
            <td>${p.finalidad_dinero}</td>
            <td>$${p.costo_accidente.toLocaleString()}</td>
        </tr>`;
    });
}

/* ACCIDENTES */
async function cargarAccidentes() {
    const tabla = document.querySelector("#tablaAccidentes tbody");
    if (!tabla) return;

    const resAcc = await fetch("./data/accidentes.json");
    const accidentes = await resAcc.json();

    const resUsers = await fetch("./data/usuarios.json");
    const usuarios = await resUsers.json();

    accidentes.forEach(acc => {
        const user = usuarios.find(u => u.id === acc.id_usuario) 
                     || { nombre: "Usuario", apellido: "No registrado" };

        tabla.innerHTML += `
        <tr>
            <td>${acc.id}</td>
            <td>${user.nombre} ${user.apellido}</td>
            <td>${acc.lugar_accidente}</td>
            <td>${acc.fecha_accidente}</td>
            <td>${acc.descripcion}</td>
        </tr>`;
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // evita recargar

        const nombre = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        const serviceID = 'service_qtnb1aq';
        const templateID = 'template_uyksvpl';
        const publicKey = 'D4ILizNNnYQCGVQpK';

        const data = {
            service_id: serviceID,
            template_id: templateID,
            user_id: publicKey,
            template_params: { nombre, email, mensaje }
        };

        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('¡Mensaje enviado correctamente!');
                form.reset();
            } else {
                alert('Error al enviar el mensaje.');
            }
        } catch (error) {
            alert('Error de conexión.');
        }
    });
});
