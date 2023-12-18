function inserirDadosJogador(sectionForm, divFormInputs, listaJogadores){
    section
}

const sectionForm = document.querySelectorAll('sectionForm')[0]
const buttonAdd = document.querySelector('#buttonAdd')
const buttonDelete = document.querySelector('#buttonDelete')
const divFormInputs = document.createElement('div')
let listaJogadores = []

divFormInputs.id = 'formInputs'

sectionForm.append(divFormInputs)

buttonAdd.addEventListener('click', () =>{
    inserirDadosJogador(sectionForm, divFormInputs, listaJogadores)
})




// const divListGamers = document.createElement('div')
// divListGamers.id = 'listGamers'