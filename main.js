// Cargar tabla Accidentes
async function cargarAccidentes() {
    const resAcc = await fetch("./data/accidentes.json");
    const accidentes = await resAcc.json();

    const resUsers = await fetch("./data/usuarios.json");
    const usuarios = await resUsers.json();

    const tbody = document.querySelector("#tablaAccidentes tbody");

    accidentes.forEach(acc => {

        const user = usuarios.find(u => u.id === acc.id_usuario) 
                     || { nombre: "Usuario", apellido: "No registrado" };

        tbody.innerHTML += `
        <tr>
            <td>${acc.id}</td>
            <td>${user.nombre} ${user.apellido}</td>
            <td>${acc.lugar_accidente}</td>
            <td>${acc.fecha_accidente}</td>
            <td>${acc.descripcion}</td>
        </tr>
        `;
    });
}
cargarAccidentes();

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
