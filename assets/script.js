//excluir ao apertar algum botão as tags não necessárias no momento
function excluirTagsExistentes (opcao){
    const divListGamersExistente = document.getElementById('listGamers')
    if (divListGamersExistente) {
        divListGamersExistente.remove();
    }
    const divConfirmacaoExistente = document.getElementById('divConfirmacao')
    if (divConfirmacaoExistente) {
        divConfirmacaoExistente.remove();
    }
    const pMensgamDeError = document.getElementById('errorDeDados')
    if (pMensgamDeError) {
        pMensgamDeError.remove();
    }
    if(opcao === 'add' || opcao === 'del'){
        const formDelete = document.getElementById('formDelete')
        if (formDelete) {
            formDelete.remove();
        }
        const formInputs = document.getElementById('formInputs')
        if (formInputs) {
            formInputs.remove();
        }
    }

}

// scrollar até o final da sectionForm
function scrollando(sectionForm){
    sectionForm.scrollTo({
        top: sectionForm.scrollHeight,
        behavior: 'smooth'
    })
}

// listar todos os jogadores já salvos
function listarJogadores(sectionForm ,listJogadores){
    excluirTagsExistentes()

    const divListGamers = document.createElement('div')
    const h2ListGamers = document.createElement('h2')
    const ulJogador = document.createElement('ul') 

    divListGamers.id = 'listGamers'
    h2ListGamers.innerText = 'Lista de Jogadores'
    ulJogador.classList.add('jogador')
    divListGamers.append(h2ListGamers,ulJogador)
    sectionForm.appendChild(divListGamers)

    if(listJogadores[0] == undefined){
        divListGamers.innerText = 'Ainda não há jogadores! Aproveite para adicionar uma agora.'
    }else{
        listJogadores.forEach(e=>{
            const liJogador = document.createElement('li')
            liJogador.innerText = `Nome: ${e.nome}\nPosição: ${e.posicao}\nCamisa: ${e.camisa}`
            ulJogador.appendChild(liJogador)
        })
    }
}

// Mensagem de inputs vazios ou camisa repetida
function mensagemError(sectionForm, msg){
    excluirTagsExistentes()

    const p_error = document.createElement('p')
    p_error.id = 'errorDeDados'
    sectionForm.appendChild(p_error)

    if(msg == 'repetido'){
        p_error.innerText = 'Já há um jogador com esse número de camisa. Remova-o antes de adicionar um novo.'
    }else if (msg == 'inputVazio') {
        p_error.innerText = 'Verifique se todos os campos estão preenchidos'
    }
}

// Verificar se há inputs sem preencher no formulario e/ou se há joagador com a mesma camisa na lista
function validarDados(sectionForm, camisa){
    const inputs = document.querySelectorAll('.input')
    const verificaCamisaRepetida =  listJogadores.some(e => camisa === e.camisa)

    let verificaInputvazio = true
    inputs.forEach((e)=>{
        if(e.value.trim() === ''){
            verificaInputvazio = false
        }
    })

    if(verificaInputvazio == false){ 
        mensagemError(sectionForm, 'inputVazio')
    }else if (verificaCamisaRepetida){
        mensagemError(sectionForm, 'repetido')
    } else { 
        return true
    }
    return false
}

//Confirmar se o usuário quer mesmo adicionar ou excluir o jagador selecionado
function mensagemDeConfirmacao (sectionForm, msg){
    excluirTagsExistentes()

    const divConfirmacao = document.createElement('div')
    const pConfirmacao = document.createElement('p')
    const buttonConfirmacao = document.createElement('button')

    divConfirmacao.id = 'divConfirmacao'
    buttonConfirmacao.classList.add('buttonAddRemove')

    divConfirmacao.append(pConfirmacao, buttonConfirmacao)
    sectionForm.appendChild(divConfirmacao)

    if(msg === 'adicionar'){
        pConfirmacao.innerText = 'Tem certeza que quer adicionar esse jogador ao time?'
        buttonConfirmacao.innerText = 'Sim'
    }else {
        pConfirmacao.innerText = 'Tem certeza que deseja excluir esse jogador?'
        buttonConfirmacao.innerText = 'Excluir'
    }
  
    return buttonConfirmacao
}

const criarInput = (type, id, labelText ) =>{
    const input = document.createElement('input')
    input.type = type
    input.id = id
    input.classList.add('input')
    
    const label = document.createElement('label')
    label.innerText = labelText
    label.setAttribute('for', id)

    return {label, input}
}

//Adicionar um jogador a lista de jogadores
function addJogador(listJogadores, sectionForm){
    const formInputs = document.createElement('form')
    const inputNome = criarInput('text', 'name', 'Nome do Jogador')
    const inputPosicao = criarInput('text', 'posicao', 'Posição no Campo')
    const inputNumeroCamisa = criarInput('number', 'numeroCamisa', 'Número da Camisa')
    const buttonAdd = document.createElement('button')

    buttonAdd.classList.add('buttonAddRemove')
    buttonAdd.innerText = 'Adicionar'

    formInputs.id = 'formInputs'
    formInputs.innerHTML = ''

    formInputs.append(inputNome.label, inputNome.input, inputPosicao.label, inputPosicao.input, inputNumeroCamisa.label, inputNumeroCamisa.input, buttonAdd)
    sectionForm.appendChild(formInputs)

    buttonAdd.addEventListener('click', (event)=>{
        event.preventDefault()
        const listInputs = [inputNome.input.value, inputPosicao.input.value, inputNumeroCamisa.input.value]
        const verificacao = validarDados(sectionForm, inputNumeroCamisa.input.value)

        if(verificacao){
            const buttonConfirmacao = mensagemDeConfirmacao(sectionForm, 'adicionar')
            buttonConfirmacao.addEventListener('click', (event) =>{
                event.preventDefault()
                formInputs.reset()
                excluirTagsExistentes()
                listJogadores.push({nome: listInputs[0], posicao: listInputs[1], camisa: listInputs[2]})
                listarJogadores(sectionForm, listJogadores)
                scrollando(sectionForm)
            })
        }
        scrollando(sectionForm)
    })
}

//remover um jogador da lista por meio do número da camisa
function deleteJogador(listJogadores, sectionForm){
    const formDelete = document.createElement('form')
    const buttonDelete = document.createElement('button')
    const inputCamisa = criarInput('text', 'numCamisa', 'Número da Camisa')
    
    formDelete.id = 'formDelete'
    buttonDelete.classList.add('buttonAddRemove')
    buttonDelete.innerText = 'Remover'
    
    formDelete.append(inputCamisa.label, inputCamisa.input, buttonDelete)
    sectionForm.appendChild(formDelete)

    buttonDelete.addEventListener('click', (event)=>{
        event.preventDefault()
        // const listInputs = [inputNome.input.value, inputPosicao.input.value, inputNumeroCamisa.input.value]
        const verificacao = validarDados(sectionForm, inputCamisa.input.value)
        

        if(verificacao){
            const indexJogadorEscolhido = listJogadores.findIndex(e=>e.camisa === inputCamisa.input.value)
            const pJogadorEscolhido = document.createElement('p')
            const jogador = listJogadores[indexJogadorEscolhido]

            console.log(jogador)

            pJogadorEscolhido.innerText = `Nome: ${jogador.nome}\nPosicao: ${jogador.posicao}\nCamisa: ${jogador.camisa}`
            sectionForm.appendChild(pJogadorEscolhido)
            
            const buttonConfirmacao = mensagemDeConfirmacao(sectionForm, 'remover')

            buttonConfirmacao.addEventListener('click', (event) =>{
                event.preventDefault()
                formDelete.reset()
                excluirTagsExistentes()
                listJogadores.splice(indexJogadorEscolhido,1)
                listarJogadores(sectionForm, listJogadores)
                scrollando(sectionForm)
            })
        }
        scrollando(sectionForm)
    })
}


const sectionForm = document.getElementsByClassName('sectionForm')[0]
const buttonAdd = document.querySelector('#buttonAdd')
const buttonDelete = document.querySelector('#buttonDelete')
const aListGamers = document.querySelector('#aListGamers')
const listJogadores = []

buttonAdd.addEventListener('click', () =>{
    excluirTagsExistentes('add')
    addJogador(listJogadores, sectionForm)
    scrollando(sectionForm)
})

aListGamers.addEventListener('click', () => {
    excluirTagsExistentes()
    listarJogadores(sectionForm, listJogadores)
    scrollando(sectionForm)
})

buttonDelete.addEventListener('click', ()=>{
    excluirTagsExistentes('del')
    deleteJogador(listJogadores, sectionForm)
    scrollando(sectionForm)
})