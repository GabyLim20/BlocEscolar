 //Registro
 document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM completamente cargado");
  
    const form = document.getElementById("formRegister");
    const errorMessage = document.getElementById("register-error-message");
  
    if (!form) {
      console.error("❌ No se encontró el formulario con id 'formRegister'");
      return;
    }
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const name = document.getElementById("registerName").value;
      const lastname = document.getElementById("registerLastname").value;
      const mail = document.getElementById("registerEmail").value;
      const rol = document.getElementById("registerRol").value;
      const password = document.getElementById("registerPassword").value;
      const repeatPassword = document.getElementById("registerRepeatPassword").value;
  
      if (!name || !lastname || !mail || !rol || !password || !repeatPassword) {
        errorMessage.textContent = "Por favor, completa todos los campos.";
        errorMessage.style.display = "block";
        return;
      }
  
      if (password !== repeatPassword) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        errorMessage.style.display = "block";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastname,
            mail,
            rol,
            password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.mensaje || "Usuario registrado con éxito");
          errorMessage.style.display = "none";
          form.reset();
  
          const modalElement = document.getElementById("registerModal");
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
          }
        } else {
          errorMessage.textContent = data.error || "Error al registrar usuario";
          errorMessage.style.display = "block";
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        errorMessage.textContent = "Error al conectar con el servidor.";
        errorMessage.style.display = "block";
      }
    });
  });