document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginName").value;
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            document.getElementById("loginModalMessage").textContent = "Por favor, completa todos los campos.";
            const modal = new bootstrap.Modal(document.getElementById("loginModal"));
            modal.show();
            return; 
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mail: email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.id); 
                localStorage.setItem("userRole", data.role); 

                document.getElementById("loginModalMessage").textContent = data.mensaje;
                const modal = new bootstrap.Modal(document.getElementById("loginModal"));
                modal.show();

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                document.getElementById("loginModalMessage").textContent = data.error || "Credenciales incorrectas";
                const modal = new bootstrap.Modal(document.getElementById("loginModal"));
                modal.show();
            }
        } catch (error) {
            console.error(error);
            document.getElementById("loginModalMessage").textContent = "Error de conexión con el servidor.";
            const modal = new bootstrap.Modal(document.getElementById("loginModal"));
            modal.show();
        }
    });
});

document.getElementById("changePasswordForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const mail = document.getElementById("mail").value;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("error-message");
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Las nuevas contraseñas no coinciden.";
        errorMessage.style.display = "block";
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/user/change/null`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: mail,
                passwordActual: oldPassword,
                nuevaPassword: newPassword,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.mensaje);
            errorMessage.style.display = "none";
            document.getElementById("changePasswordForm").reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
            modal.hide();
        } else {
            errorMessage.textContent = data.error || "Error al cambiar la contraseña";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        errorMessage.textContent = "Error al conectar con el servidor.";
        errorMessage.style.display = "block";
    }
});
