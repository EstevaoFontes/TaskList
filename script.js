let allTask = [];

const newTaskText = document.querySelector(".textoNovaTarefa");

let buttonNewTask = document.querySelector(".adicionarTarefa").addEventListener("click", newTask);

const main = document.querySelector(".main")

function randonId(){
    return Math.floor(Math.random() * 5000)
}

function newTask(){
    const task = {
        texto: newTaskText.value,
        id: randonId(),
    };

    constructor(task.texto, task.id)
    newTaskText.value = ""

    // console.log(allTask)

    allTask.push(task)

    saveNotes(allTask)
};

function constructor(inputText, id){

    const container = document.createElement("div");
    container.setAttribute('id', id);
    container.classList.add("tarefas");

    const areaTexto = document.createElement("textarea");
    areaTexto.classList.add("areaTexto");
    areaTexto.setAttribute("disabled","");
    areaTexto.setAttribute("maxlength","377");
    areaTexto.value = inputText;
    container.appendChild(areaTexto);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao_excluir_tarefa");
    botaoExcluir.setAttribute('id', id);
    container.appendChild(botaoExcluir);

    const imagemExcluir = document.createElement("img");
    imagemExcluir.setAttribute("src","imagens/excluir.png");
    imagemExcluir.classList.add("imagem_excluir");
    botaoExcluir.appendChild(imagemExcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao_editar_tarefa");
    botaoEditar.setAttribute('id', id);
    container.appendChild(botaoEditar);

    const imagemEditar = document.createElement("img");
    imagemEditar.setAttribute("src","imagens/editar.png");
    imagemEditar.classList.add("imagem_editar");
    botaoEditar.appendChild(imagemEditar);

    const buttonTrash = container.querySelector(".botao_excluir_tarefa").addEventListener("click",(e) =>{
        notesTrash(e)
    })

    const buttonEdit = container.querySelector(".botao_editar_tarefa").addEventListener("click",(e) =>{
        verifiNotesEdit(e)
    })
    
    main.appendChild(container);

};

function saveNotes(listTask){
    const save_notes = localStorage.setItem('task',JSON.stringify(listTask))
};

function getNotes(){
    const get_notes = JSON.parse(localStorage.getItem('task'))
    return get_notes
};


function notesTrash(e){
    let idNote = e.currentTarget.id;

    let notes = getNotes();

    const findTaskToTrash = notes.filter((notes) => notes.id != idNote);

    const elementToTrash = document.getElementById(idNote);
    elementToTrash.remove();

    saveNotes(findTaskToTrash);

    for (let i=0; i<allTask.length; i++){
        if (allTask[i].id == idNote){
            allTask.splice(i,1)
        };
    }
};

let listasParaEdicao = []

function verifiNotesEdit(e){

    let idnote = e.currentTarget.id
    
    let index = listasParaEdicao.indexOf(idnote)

    if (index != -1){
        listasParaEdicao.splice(index, 1)
        desabilitarEdicao(e)
    }else{
        listasParaEdicao.push(idnote)
        habilitarEdicao(e)
    }
}
    
    
function habilitarEdicao(e){

    let idNote = e.currentTarget.id;

    const container = document.getElementById(idNote);
    const areaTexto = container.children[0]
    const imagemEditar = container.children[2].children[0];

    areaTexto.removeAttribute("disabled");
    imagemEditar.setAttribute("src","imagens/confirmação.png");
    container.style.border = "1px solid green";
}



function desabilitarEdicao(e){
   
    let idNote = e.currentTarget.id;

    const container = document.getElementById(idNote);
    const areaTexto = container.children[0];
    const imagemEditar = container.children[2].children[0];

    areaTexto.setAttribute("disabled", "");
    imagemEditar.setAttribute("src","imagens/editar.png");
    container.style.border = "1px solid white";

    for (let i=0; i<allTask.length; i++){
        if (allTask[i].id == idNote){
           allTask[i].texto = areaTexto.value
           saveNotes(allTask)
        }
    }
    console.log(allTask)
}

localStorage.clear()