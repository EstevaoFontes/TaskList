
const lightMode = document.querySelector(".lightMode")

const newTaskText = document.querySelector(".textoNovaTarefa");

const newTaskButton = document.querySelector(".adicionarTarefa");

const main = document.querySelector(".main")

const titulo = document.querySelector(".titulo")

const modalElement = document.querySelector(".modalOpen");

const inputModal = document.querySelector(".inputModal");

const buttonModal = document.querySelector(".buttonModal");



let buttonNewTask = document.querySelector(".textoNovaTarefa").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        newTaskButton.click()
    }
});

function saveModal(name) {
    localStorage.setItem("user", JSON.stringify(name))
};

function getModal() {
    const modal = JSON.parse(localStorage.getItem("user"));
    return modal
};

function modal() {

    const modalSeted = getModal();

    if (modalSeted === null) {
        modalElement.style.display = "flex";
        disableElements()
        buttonModal.addEventListener("click", () => {
            titulo.innerText = `Olá ${inputModal.value}`
            saveModal(inputModal.value)
            enableElements()

        })
    } else {
        titulo.innerText = `Olá ${modalSeted}`
    }

    function enableElements() {
        newTaskText.style.cursor = "pointer";
        newTaskText.removeAttribute("disabled", "");
        newTaskButton.style.cursor = "pointer";
        newTaskButton.removeAttribute("disabled", "");
        modalElement.style.display = "none";
    };

    function disableElements() {
        newTaskText.style.cursor = "not-allowed"
        newTaskText.setAttribute("disabled", "")
        newTaskButton.style.cursor = "not-allowed"
        newTaskButton.setAttribute("disabled", "")
    };
};

newTaskButton.addEventListener("click", newTask)

lightMode.addEventListener("click", () => {

});

function randonId() {
    return Math.floor(Math.random() * 5000)
};

function newTask() {
    const allTask = getNotes();

    const task = {
        texto: newTaskText.value,
        id: randonId(),
    };

    constructor(task.texto, task.id);

    newTaskText.value = "";

    allTask.push(task)

    saveNotes(allTask);

};


function constructor(inputText, id) {

    const container = document.createElement("div");
    container.setAttribute('id', id);

    const areaTexto = document.createElement("textarea");
    areaTexto.setAttribute("disabled", "");
    areaTexto.setAttribute("maxlength", "145");
    areaTexto.value = inputText;
    container.appendChild(areaTexto);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao_excluir_tarefa");
    botaoExcluir.setAttribute('id', id);
    container.appendChild(botaoExcluir);

    const imagemExcluir = document.createElement("i");
    imagemExcluir.setAttribute("class", "fas fa-trash");
    imagemExcluir.setAttribute("id","imagem_excluir");
    botaoExcluir.appendChild(imagemExcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao_editar_tarefa");
    botaoEditar.setAttribute('id', id);
    container.appendChild(botaoEditar);

    const imagemEditar = document.createElement("i");
    imagemEditar.setAttribute("id", "imagem_editar");
    imagemEditar.setAttribute("class", "fas fa-edit");
    botaoEditar.appendChild(imagemEditar);

    const buttonTrash = container.querySelector(".botao_excluir_tarefa").addEventListener("click", (e) => {
        notesTrash(e)
    })

    const buttonEdit = container.querySelector(".botao_editar_tarefa").addEventListener("click", (e) => {
        verifiNotesEdit(e)
    })

    main.appendChild(container);

};

function saveNotes(listTask) {
    localStorage.setItem("task", JSON.stringify(listTask))
};

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("task") || "[]")
    return notes
};

function showNotes() {
    getNotes().forEach(notes => {
        const showNotes = constructor(notes.texto, notes.id)
        return showNotes
    });
}


function notesTrash(e) {
    let idNote = e.currentTarget.id;

    let notes = getNotes();

    const findTaskToTrash = notes.filter((notes) => notes.id != idNote);

    const elementToTrash = document.getElementById(idNote);
    elementToTrash.remove();

    saveNotes(findTaskToTrash);
};

let listasParaEdicao = []

function verifiNotesEdit(e) {

    let idnote = e.currentTarget.id

    let index = listasParaEdicao.indexOf(idnote)

    if (index != -1) {
        listasParaEdicao.splice(index, 1)
        desabilitarEdicao(e)
    } else {
        listasParaEdicao.push(idnote)
        habilitarEdicao(e)
    }
}


function habilitarEdicao(e) {

    let idNote = e.currentTarget.id;

    const container = document.getElementById(idNote);
    const areaTexto = container.children[0]
    const imagemEditar = container.children[2].children[0];

    areaTexto.removeAttribute("disabled");
    imagemEditar.setAttribute("class", "fas fa-check");
    container.style.border = "2px solid yellow";
}



function desabilitarEdicao(e) {
    const notes = getNotes();
    
    let idNote = e.currentTarget.id;

    const container = document.getElementById(idNote);
    const areaTexto = container.children[0];
    const imagemEditar = container.children[2].children[0];

    areaTexto.setAttribute("disabled", "");
    imagemEditar.setAttribute("class", "fas fa-edit");
    container.style.border = "2px solid";

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == idNote) {
            notes[i].texto = areaTexto.value;
            saveNotes(notes);
        };
    };
};

function changeTheme(){
    document.body.classList.toggle("light")
};

const theme = document.querySelector(".lightMode").addEventListener("change",() =>{
    changeTheme();

    localStorage.removeItem("light");

    if (document.body.classList.contains("light")){
        localStorage.setItem("light", 1)
    }
});

function loadTheme(){
    const theme = localStorage.getItem("light")

    if(theme){
        changeTheme()
    }
}

//INICIALIZAÇÃO
showNotes()
modal()
loadTheme()





