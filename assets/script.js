function mensagemError(v, formInputs, msg){
    const mensagem = document.getElementById('errorDeDados')

    if(v){
        mensagem.innerHTML = ''
        return true

    }else if ((!mensagem)) {
        const p_error = document.createElement('p')
        p_error.id = 'errorDeDados'
        p_error.innerText = msg === 'repetido'?
        'Já há um jogador com esse número de camisa. Remova-o antes de adicionar um novo.'
        :'Verifique se todos os campos estão preenchidos'

        formInputs.append(p_error)
        return false
    }
}

function validarDados(formInputs){
// validade inputs sem preencher no formulario
    const inputs = document.querySelectorAll('.input')
    let verificaInputvazio = true
    inputs.forEach((e)=>{
        if(e.value.trim() === ''){
            verificaInputvazio = false
        }
    })
    if (mensagemError(verificaInputvazio, formInputs, 'inputVazio')){
        // validade se já há joagador com a mesma camisa na lista
        const verificaCamisaRepetida =  listaJogadores.some(e => numCamisa == e.numCamisa?false:true)
        if(mensagemError(verificaCamisaRepetida, formInputs, 'repetido')){
            return false
        }else {
            return true
        }
    }
}


function mensagemDeConfirmacao (formInputs, msg){
    const divConfimacao = document.createElement('div')
    const pConfirmacao = document.createElement('p')
    const buttonConfirmacao = document.createElement('button')

    divConfimacao.id = 'divConfirmacao'
    buttonConfirmacao.classList.add('.buttonAddRemove')

    if(msg === 'adicionar'){
        pConfirmacao.innerText = 'Tem certeza que quer adicionar esse jogador ao time?'
        buttonConfirmacao.innerText = 'Sim'
    }else {
        pConfirmacao.innerText = 'Tem certeza que deseja excluir esse jogador?'
        buttonConfirmacao.innerText = 'Excluir'
    }
    divConfimacao.append(pConfirmacao, buttonConfirmacao)
    formInputs.appendChild(divConfimacao)

    return buttonConfirmacao
}

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

    buttonAdd.addEventListener('click', ()=>{
        const listInputs = [inputNome.input.value, inputPosicao.input.value, inputNumeroCamisa.input.value]
        const verificacao = validarDados(formInputs)

        if(verificacao){
            const buttonConfirmacao = mensagemDeConfirmacao(formInputs, 'adicionar')
            buttonConfirmacao.addEventListener('click', () =>{
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