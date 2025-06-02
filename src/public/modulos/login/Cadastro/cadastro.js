let historyData = [];

// cadastro.js - Dynamically build the form structure inside the div containers

// Helper function to create elements with attributes and children
function createElement(tag, attributes = {}, children = []) {
    const el = document.createElement(tag);
    for (const attr in attributes) {
        if (attr === "className") {
            el.className = attributes[attr];
        } else if (attr === "textContent") {
            el.textContent = attributes[attr];
        } else if (attr === "innerHTML") {
            el.innerHTML = attributes[attr];
        } else {
            el.setAttribute(attr, attributes[attr]);
        }
    }
    children.forEach(child => {
        if (typeof child === "string") {
            el.appendChild(document.createTextNode(child));
        } else {
            el.appendChild(child);
        }
    });
    return el;
}

// Build profile section (left)
function buildProfileSection() {
    const profileSection = document.getElementById("profile-section");
    profileSection.className = "profile-section";

    const container = createElement("div", { className: "profile-container" });

    // Profile image placeholder
    const profileImgDiv = createElement("div", { className: "profile-image-placeholder" });
    // Add an image inside the placeholder div
    const profileImg = createElement("img", {
        src: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        alt: "Profile Avatar",
        style: "width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"
    });
    profileImgDiv.appendChild(profileImg);

    // Name label and input
    const nameLabel = createElement("label", { textContent: "Nome" });
    const nameInput = createElement("input", { type: "text", placeholder: "Nome" });

    // Phone input
    const phoneInput = createElement("input", { type: "tel", placeholder: "Telefone" });

    // Email input
    const emailInput = createElement("input", { type: "email", placeholder: "Email" });

    container.appendChild(profileImgDiv);
    container.appendChild(nameLabel);
    container.appendChild(nameInput);
    container.appendChild(phoneInput);
    container.appendChild(emailInput);

    profileSection.appendChild(container);
}

// Build info section (right)
function buildInfoSection() {
    const infoSection = document.getElementById("info-section");
    infoSection.className = "info-section";

    const container = createElement("div", { className: "info-container" });

    // Heading
    const heading = createElement("h2", { textContent: "Informações e mais" });

    // Form fields container
    const formFields = createElement("div", { className: "form-fields" });

    // Field: Vício (select)
    const vicioLabel = createElement("label", { textContent: "Vício:" });
    const vicioSelect = createElement("select");
    ["", "Álcool", "Drogas", "Jogos", "Outros"].forEach(optionText => {
        const option = createElement("option", { value: optionText, textContent: optionText });
        vicioSelect.appendChild(option);
    });

    // Field: Idade (input)
    const idadeLabel = createElement("label", { textContent: "Idade:" });
    const idadeInput = createElement("input", { type: "number", placeholder: "Idade" });

    // Field: Quando começou (input)
    const comecoLabel = createElement("label", { textContent: "Quando começou:" });
    const comecoInput = createElement("input", { type: "text", placeholder: "Quando começou" });

    // Field: Gênero (input)
    const generoLabel = createElement("label", { textContent: "Gênero:" });
    const generoInput = createElement("input", { type: "text", placeholder: "Gênero" });

    // Field: Estado civil (input)
    const estadoCivilLabel = createElement("label", { textContent: "Estado civil:" });
    const estadoCivilInput = createElement("input", { type: "text", placeholder: "Estado civil" });

    // Field: Profissão (input)
    const profissaoLabel = createElement("label", { textContent: "Profissão:" });
    const profissaoInput = createElement("input", { type: "text", placeholder: "Profissão" });

    // Textarea for description
    const descricaoTextarea = createElement("textarea", { placeholder: "Breve descrição sobre o seu vício.." });

    // Append fields to formFields container
    [
        vicioLabel, vicioSelect,
        idadeLabel, idadeInput,
        comecoLabel, comecoInput,
        generoLabel, generoInput,
        estadoCivilLabel, estadoCivilInput,
        profissaoLabel, profissaoInput
    ].forEach(el => formFields.appendChild(el));

    container.appendChild(heading);
    container.appendChild(formFields);
    container.appendChild(descricaoTextarea);

    // Add save button inside the container
    const saveButton = document.createElement("button");
    saveButton.textContent = "Salvar";
    saveButton.style.marginTop = "20px";
    saveButton.style.padding = "10px 20px";
    saveButton.style.borderRadius = "10px";
    saveButton.style.border = "none";
    saveButton.style.backgroundColor = "#4CAF50";
    saveButton.style.color = "white";
    saveButton.style.fontSize = "1em";
    saveButton.style.cursor = "pointer";

    saveButton.addEventListener("click", () => {
        // Collect updated data
        const updatedData = {
            nome: document.querySelector("#profile-section input[type='text']").value,
            telefone: document.querySelector("#profile-section input[type='tel']").value,
            email: document.querySelector("#profile-section input[type='email']").value,
            vicio: formFields.getElementsByTagName("select")[0]?.value || "",
            idade: formFields.getElementsByTagName("input")[0]?.value || "",
            quandoComecou: formFields.getElementsByTagName("input")[1]?.value || "",
            genero: formFields.getElementsByTagName("input")[2]?.value || "",
            estadoCivil: formFields.getElementsByTagName("input")[3]?.value || "",
            profissao: formFields.getElementsByTagName("input")[4]?.value || "",
            descricao: descricaoTextarea.value || ""
        };

        // Add new entry to history data array
        historyData.push(updatedData);

        // Check if table exists, if not create it
        let historyContainer = document.getElementById("history-container");
        if (!historyContainer) {
            historyContainer = document.createElement("div");
            historyContainer.id = "history-container";
            historyContainer.style.marginTop = "40px";

            const heading = document.createElement("h2");
            heading.textContent = "Histórico de Cadastros";
            heading.style.textAlign = "center";
            historyContainer.appendChild(heading);

            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";

            // Table header
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            const headers = ["Nome", "Telefone", "Email", "Vício", "Idade", "Quando começou", "Gênero", "Estado civil", "Profissão", "Descrição"];
            headers.forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                th.style.border = "1px solid #ddd";
                th.style.padding = "8px";
                th.style.backgroundColor = "#f2f2f2";
                th.style.textAlign = "left";
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Table body
            const tbody = document.createElement("tbody");
            tbody.id = "history-tbody";
            table.appendChild(tbody);

            historyContainer.appendChild(table);

            // Append container below the info section
            const infoSection = document.getElementById("info-section");
            infoSection.parentNode.insertBefore(historyContainer, infoSection.nextSibling);
        }

        // Add new row to history table
        const historyTableBody = document.getElementById("history-tbody");
        if (historyTableBody) {
            const newRow = document.createElement("tr");
            const headers = ["nome", "telefone", "email", "vicio", "idade", "quandoComecou", "genero", "estadoCivil", "profissao", "descricao"];
            headers.forEach(key => {
                const td = document.createElement("td");
                td.textContent = updatedData[key] || "";
                td.style.border = "1px solid #ddd";
                td.style.padding = "8px";
                newRow.appendChild(td);
            });
            historyTableBody.appendChild(newRow);
        }

        console.log("Dados atualizados:", updatedData);
        alert("Dados salvos com sucesso!");
    });

    container.appendChild(saveButton);

    infoSection.appendChild(container);
}

async function fetchUserData() {
    try {
        const response = await fetch("userData.json");
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Helper function to set input/select/textarea value by id or element
function setValue(el, value) {
    if (!el) return;
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        el.value = value;
    }
}

// Initialize form building and populate data
async function init() {
    buildProfileSection();
    buildInfoSection();

    const userData = await fetchUserData();
    if (!userData) {
        alert("Erro ao carregar os dados do usuário.");
        return;
    }

    // Populate profile section inputs
    document.querySelector("#profile-section input[type='text']").value = userData.nome;
    document.querySelector("#profile-section input[type='tel']").value = userData.telefone;
    document.querySelector("#profile-section input[type='email']").value = userData.email;

    // Populate info section inputs
    const infoSection = document.getElementById("info-section");
    const selects = infoSection.getElementsByTagName("select");
    const inputs = infoSection.getElementsByTagName("input");
    const textarea = infoSection.getElementsByTagName("textarea")[0];

    // Set select value for vicio
    if (selects.length > 0) {
        selects[0].value = userData.vicio;
    }

    // Set inputs values in order: idade, quandoComecou, genero, estadoCivil, profissao
    if (inputs.length >= 5) {
        inputs[0].value = userData.idade;
        inputs[1].value = userData.quandoComecou;
        inputs[2].value = userData.genero;
        inputs[3].value = userData.estadoCivil;
        inputs[4].value = userData.profissao;
    }

    // Set textarea value
    if (textarea) {
        textarea.value = userData.descricao;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});
