// Mensagem de inputs vazios ou camisa repetida
function mensagemError(formInputs, msg){
    let mensagem = document.getElementById('errorDeDados')

    if(mensagem){
        mensagem.innerHTML = '';
    }else{
        const p_error = document.createElement('p')
        p_error.id = 'errorDeDados'
        formInputs.appendChild(p_error)
        mensagem = p_error
    }

    if(msg == 'repetido'){
        mensagem.innerText = 'Já há um jogador com esse número de camisa. Remova-o antes de adicionar um novo.'
    }else if (msg == 'inputVazio') {
        mensagem.innerText = 'Verifique se todos os campos estão preenchidos'
    }else {
        mensagem.innerHTML = '';
    }
}

// Verificar se há inputs sem preencher no formulario e/ou se há joagador com a mesma camisa na lista
function validarDados(formInputs, camisa){
    const inputs = document.querySelectorAll('.input')
    const verificaCamisaRepetida =  listaJogadores.some(e => camisa === e.camisa)

    let verificaInputvazio = true
    inputs.forEach((e)=>{
        if(e.value.trim() === ''){
            verificaInputvazio = false
        }
    })

    if(verificaInputvazio == false){ 
        mensagemError(formInputs, 'inputVazio')
    }else if (verificaCamisaRepetida){
        mensagemError(formInputs, 'repetido')
    } else { 
        mensagemError(formInputs, 'limpar')
        return true
    }
    return false
}

//Confirmar se o usuário quer mesmo adicionar ou excluir o jagador selecionado
function mensagemDeConfirmacao (formInputs, msg){
    const divConfirmacaoExistente = document.getElementById('divConfirmacao')
    if (divConfirmacaoExistente) {
        divConfirmacaoExistente.remove();
    }

    const divConfirmacao = document.createElement('div')
    const pConfirmacao = document.createElement('p')
    const buttonConfirmacao = document.createElement('button')

    divConfirmacao.id = 'divConfirmacao'
    buttonConfirmacao.classList.add('buttonAddRemove')

    divConfirmacao.append(pConfirmacao, buttonConfirmacao)
    formInputs.appendChild(divConfirmacao)

    if(msg === 'adicionar'){
        pConfirmacao.innerText = 'Tem certeza que quer adicionar esse jogador ao time?'
        buttonConfirmacao.innerText = 'Sim'
    }else {
        pConfirmacao.innerText = 'Tem certeza que deseja excluir esse jogador?'
        buttonConfirmacao.innerText = 'Excluir'
    }
  
    return buttonConfirmacao
}

//Adicionar um jogador a lista de jogadores
function inserirDadosJogador(listaJogadores, sectionForm, formInputs){

    const criarInput= (type, id, labelText ) =>{
        const input = document.createElement('input')
        input.type = type
        input.id = id
        input.classList.add('input')
        
        const label = document.createElement('label')
        label.innerText = labelText
        label.setAttribute('for', id)

        return {label, input}
    }

    const inputNome = criarInput('text', 'name', 'Nome do Jogador')
    const inputPosicao = criarInput('text', 'posicao', 'Posição no Campo')
    const inputNumeroCamisa = criarInput('number', 'numeroCamisa', 'Número da Camisa')
    const buttonAdd = document.createElement('button')

    buttonAdd.classList.add('buttonAddRemove')
    buttonAdd.innerText = 'Adicionar'

    formInputs.innerHTML = ''

    formInputs.append(inputNome.label, inputNome.input, inputPosicao.label, inputPosicao.input, inputNumeroCamisa.label, inputNumeroCamisa.input, buttonAdd)
    sectionForm.appendChild(formInputs)

    buttonAdd.addEventListener('click', (event)=>{
        event.preventDefault()
        const listInputs = [inputNome.input.value, inputPosicao.input.value, inputNumeroCamisa.input.value]
        const verificacao = validarDados(formInputs, inputNumeroCamisa.input.value)

        if(verificacao){
            const buttonConfirmacao = mensagemDeConfirmacao(formInputs, 'adicionar')
            buttonConfirmacao.addEventListener('click', (event) =>{
                event.preventDefault()
                const divConfirmacao = document.getElementById('divConfirmacao')
                divConfirmacao.remove()
                listaJogadores.push({nome: listInputs[0], posicao: listInputs[1], camisa: listInputs[2]})
            })
        }
    })
}

const sectionForm = document.getElementsByClassName('sectionForm')[0]
const buttonAdd = document.querySelector('#buttonAdd')
const buttonDelete = document.querySelector('#buttonDelete')
const formInputs = document.createElement('form')
let listaJogadores = []

formInputs.id = 'formInputs'

buttonAdd.addEventListener('click', () =>{
    inserirDadosJogador(listaJogadores, sectionForm, formInputs)
})




// const divListGamers = document.createElement('div')
// divListGamers.id = 'listGamers'