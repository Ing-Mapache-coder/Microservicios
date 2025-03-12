document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const submitButton = document.getElementById('submitButton');
    const cancelEditButton = document.getElementById('cancelEdit');
    let isEditing = false;
  
    loadUsers();
  
    userForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
        id: document.getElementById('userId').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        numero: document.getElementById('numero').value,
        correo: document.getElementById('correo').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
      };
  
      if (isEditing) {
        updateUser(user);
      } else {
        addUser(user);
      }
    });
  
    cancelEditButton.addEventListener('click', () => {
      resetForm();
    });
  
    function loadUsers() {
      fetch('/api/users')
        .then((response) => response.json())
        .then((data) => {
          usersTable.innerHTML = '';
          data.forEach((user) => {
            const row = usersTable.insertRow();
            row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.nombre}</td>
              <td>${user.apellido}</td>
              <td>${user.numero}</td>
              <td>${user.correo}</td>
              <td>${user.fecha_nacimiento}</td>
              <td class="actions">
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
              </td>
            `;
          });
        });
    }
  
    function addUser(user) {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then(() => {
          loadUsers();
          resetForm();
        });
    }
  
    function updateUser(user) {
      fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then(() => {
          loadUsers();
          resetForm();
        });
    }
  
    window.deleteUser = (id) => {
      fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(() => loadUsers());
    };
  
    window.editUser = (id) => {
      fetch(`/api/users/${id}`)
        .then((response) => response.json())
        .then((user) => {
          document.getElementById('userId').value = user.id;
          document.getElementById('nombre').value = user.nombre;
          document.getElementById('apellido').value = user.apellido;
          document.getElementById('numero').value = user.numero;
          document.getElementById('correo').value = user.correo;
          document.getElementById('fecha_nacimiento').value = user.fecha_nacimiento;
  
          submitButton.textContent = 'Actualizar Usuario';
          cancelEditButton.style.display = 'inline-block';
          isEditing = true;
        });
    };
  
    function resetForm() {
      userForm.reset();
      document.getElementById('userId').value = '';
      submitButton.textContent = 'Agregar Usuario';
      cancelEditButton.style.display = 'none';
      isEditing = false;
    }
  });