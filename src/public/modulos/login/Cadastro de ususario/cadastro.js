// JavaScript for CRUD operations on cadastro.json data loaded dynamically

let profiles = [];
let editingProfileId = null;

// Load profiles data from cadastro.json
async function loadProfiles() {
  try {
    const response = await fetch('cadastro.json');
    const jsonData = await response.json();
    profiles = jsonData.data || [];
    console.log('Profiles loaded:', profiles);
    renderProfilesList();
  } catch (error) {
    console.error('Error loading profiles:', error);
  }
}

// Create a new profile
function createProfile(profile) {
  profile.id = profiles.length ? profiles[profiles.length - 1].id + 1 : 1;
  profiles.push(profile);
  renderProfilesList();
  return profile;
}

// Read all profiles
function readProfiles() {
  return profiles;
}

// Read profile by id
function readProfileById(id) {
  return profiles.find(p => p.id === id);
}

// Update profile by id
function updateProfile(id, updatedProfile) {
  const index = profiles.findIndex(p => p.id === id);
  if (index !== -1) {
    profiles[index] = { id, ...updatedProfile };
    renderProfilesList();
    return profiles[index];
  }
  return null;
}

// Delete profile by id
function deleteProfile(id) {
  const index = profiles.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = profiles.splice(index, 1)[0];
    renderProfilesList();
    return deleted;
  }
  return null;
}

// Render the list of profiles with "alterar" buttons
function renderProfilesList() {
  const listContainer = document.getElementById('profilesList');
  listContainer.innerHTML = '';

  if (profiles.length === 0) {
    listContainer.innerHTML = '<p>Nenhum perfil cadastrado.</p>';
    return;
  }

  profiles.forEach(profile => {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile-item';
    profileDiv.innerHTML = `
      <p><strong>Nome:</strong> ${profile.nome}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <button data-id="${profile.id}" class="edit-profile-btn">Alterar</button>
    `;
    listContainer.appendChild(profileDiv);
  });

  // Add event listeners to "alterar" buttons
  const editButtons = document.querySelectorAll('.edit-profile-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      populateFormForEdit(id);
    });
  });
}

// Populate the form fields with profile data for editing
function populateFormForEdit(id) {
  const profile = readProfileById(id);
  if (!profile) return;

  editingProfileId = id;

  document.getElementById('nome').value = profile.nome || '';
  document.getElementById('telefone').value = profile.telefone || '';
  document.getElementById('email').value = profile.email || '';
  document.getElementById('vicio').value = profile.vicio || '';
  document.getElementById('idade').value = profile.idade || '';
  document.getElementById('quandoComecou').value = profile.quandoComecou || '';
  document.getElementById('genero').value = profile.genero || '';
  document.getElementById('estadoCivil').value = profile.estadoCivil || '';
  document.getElementById('profissao').value = profile.profissao || '';
  document.getElementById('descricao').value = profile.descricao || '';
}

// Handle form submission for create or update
document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const profileData = {
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    vicio: document.getElementById('vicio').value,
    idade: parseInt(document.getElementById('idade').value, 10) || null,
    quandoComecou: document.getElementById('quandoComecou').value,
    genero: document.getElementById('genero').value,
    estadoCivil: document.getElementById('estadoCivil').value,
    profissao: document.getElementById('profissao').value,
    descricao: document.getElementById('descricao').value
  };

  if (editingProfileId !== null) {
    updateProfile(editingProfileId, profileData);
    editingProfileId = null;
  } else {
    createProfile(profileData);
  }

  this.reset();
});

loadProfiles();
