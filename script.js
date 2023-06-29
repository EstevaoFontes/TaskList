let modoAtual = "lua"

const lightMode = document.querySelector(".modoLight")

const newTaskText = document.querySelector(".textoNovaTarefa");

const newTaskButton = document.querySelector(".adicionarTarefa");

const main = document.querySelector(".main")

const imageToChange = document.getElementById("modoImg")

const titulo = document.querySelector(".titulo")



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
    const modal = document.querySelector(".modal");
    const inputModal = document.querySelector(".inputModal");
    const buttonModal = document.querySelector(".buttonModal");

    const modalSeted = getModal();
    console.log(modalSeted)

    if (modalSeted === null) {
        modal.style.display = "flex";
        newTaskText.style.cursor = "not-allowed"
        newTaskText.setAttribute("disabled", "")
        newTaskButton.style.cursor = "not-allowed"
        newTaskButton.setAttribute("disabled", "")

        buttonModal.addEventListener("click", () => {
            titulo.innerText = `Olá ${inputModal.value}`
            saveModal(inputModal.value)
            newTaskText.style.cursor = "pointer";
            newTaskText.removeAttribute("disabled", "");
            newTaskButton.style.cursor = "pointer";
            newTaskButton.removeAttribute("disabled", "");
            modal.style.display = "none";
        })
    } else {
        modal.style.display = "none";
        titulo.innerText = `Olá ${modalSeted}`
    }
}

newTaskButton.addEventListener("click", newTask)

lightMode.addEventListener("click", () => {
    if (modoAtual == "lua") {
        modoAtual = "sol"
        lightOn()
    } else {
        modoAtual = "lua"
        lightOff()
    }
})


function lightOn() {
    imageToChange.src = `imagens/${modoAtual}.png`
}

function lightOff() {
    imageToChange.src = `imagens/${modoAtual}.png`
}


function randonId() {
    return Math.floor(Math.random() * 5000)
}

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
    areaTexto.setAttribute("maxlength", "377");
    areaTexto.value = inputText;
    container.appendChild(areaTexto);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao_excluir_tarefa");
    botaoExcluir.setAttribute('id', id);
    container.appendChild(botaoExcluir);

    const imagemExcluir = document.createElement("img");
    imagemExcluir.setAttribute("src", "imagens/excluir.png");
    imagemExcluir.classList.add("imagem_excluir");
    botaoExcluir.appendChild(imagemExcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao_editar_tarefa");
    botaoEditar.setAttribute('id', id);
    container.appendChild(botaoEditar);

    const imagemEditar = document.createElement("img");
    imagemEditar.setAttribute("src", "imagens/editar.png");
    imagemEditar.classList.add("imagem_editar");
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
    imagemEditar.setAttribute("src", "imagens/confirmação.png");
    container.style.border = "1px solid green";
}



function desabilitarEdicao(e) {
    const notes = getNotes();
    console.log(notes)
    let idNote = e.currentTarget.id;

    const container = document.getElementById(idNote);
    const areaTexto = container.children[0];
    const imagemEditar = container.children[2].children[0];

    areaTexto.setAttribute("disabled", "");
    imagemEditar.setAttribute("src", "imagens/editar.png");
    container.style.border = "1px solid white";

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == idNote) {
            notes[i].texto = areaTexto.value
            saveNotes(notes)
        }
    }
}

//INICIALIZAÇÃO
showNotes()
modal()




