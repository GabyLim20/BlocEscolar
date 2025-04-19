let users = [];
let rols = [];

async function fetchUsers() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, please log in.");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        users = data;
        console.log(users);
        loadUserTableData();  // Cargar la tabla de usuarios
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        document.getElementById("errorMessage").textContent = "Error al obtener los usuarios: " + error.message;
    }
}

function loadUserTableData() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';  // Limpieza de la tabla
    if (users.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td colspan="6" class="text-center">No hay usuarios disponibles.</td>
    `;
        tableBody.appendChild(row);
        return;
    }
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <th scope="row">${user.id}</th>
      <td>${user.name}</td>
      <td>${user.lastname}</td>
      <td>${user.mail}</td>
      <td>${user.rol}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Editar</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('editId').value = user.id;
        document.getElementById('editName').value = user.name;
        document.getElementById('editLastName').value = user.lastname;
        document.getElementById('editEmail').value = user.mail;
        document.getElementById('editRol').value = user.rol;
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    } else {
        console.error("Usuario no encontrado");
    }
}

async function saveUpdatedUser(event) {
    event.preventDefault();

    const id = document.getElementById('editId').value;
    const updatedUser = {
        name: document.getElementById('editName').value,
        lastname: document.getElementById('editLastName').value,
        mail: document.getElementById('editEmail').value,
        rol: document.getElementById("editRol").value
    };

    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, please log in.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }
        await fetchUsers(); 
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        document.getElementById("errorMessage").textContent = "Error al actualizar el usuario: " + error.message;
    }
}

async function fetchRol() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, please log in.");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/rol", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los roles");
        }
        const data = await response.json();
        rols = data;
        console.log(rols);
        loadRoleTableData();
    } catch (error) {
        console.error("Error al obtener los roles:", error);
        document.getElementById("errorMessage").textContent = "Error al obtener los roles: " + error.message;
    }
}

function loadRoleTableData() {
    const tableBody = document.getElementById('roleTableBody');
    tableBody.innerHTML = '';  // Limpieza de la tabla
    if (rols.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td colspan="6" class="text-center">No hay roles disponibles.</td>
    `;
        tableBody.appendChild(row);
        return;
    }
    rols.forEach(rol => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <th scope="row">${rol.id}</th>
      <td>${rol.nombre}</td>
      <td>
        <button class="btn btn-success btn-sm" onclick="editRole(${rol.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRol(${rol.id})">Eliminar</button>

      </td>
    `;
        tableBody.appendChild(row);
    });
}


window.onload = () => {
    fetchUsers();
    fetchRol();
};

document.getElementById('editUserForm').addEventListener('submit', saveUpdatedUser);
