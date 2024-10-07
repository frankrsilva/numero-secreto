const min = 1;
const max = 50;

let listaNumerosSorteados = [];

function adicionaTexto(tag, valor) {
    let campo = document.querySelector(tag)
    campo.innerText = valor;
}

adicionaTexto("h1", "Jogo do número secreto")
adicionaTexto(".texto__paragrafo", `Escolha um número entre ${min} e ${max}.`)

const botaoReiniciar = document.querySelector("#reiniciar");
const botaoChutar = document.querySelector("#chutar");

function gerarNumeroAleatorio(min, max) {
    const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (listaNumerosSorteados.length < max - min + 1) {
        if (listaNumerosSorteados.includes(numeroSorteado)) {
            return gerarNumeroAleatorio(min, max);
        } else {
            listaNumerosSorteados.push(numeroSorteado);
            console.log(listaNumerosSorteados)
            return numeroSorteado;
        }
    } else {
        listaNumerosSorteados = [];
        return gerarNumeroAleatorio(min, max);
    }
}

let numeroSecreto = gerarNumeroAleatorio(min, max);
console.log(numeroSecreto);
let tentativas = 0;

function verificarChute() {
    const chute = document.querySelector("#chute");

    if (chute.value != "") {
        if (chute.value == numeroSecreto) {
            tentativas++;
            botaoReiniciar.removeAttribute("disabled");
            botaoChutar.setAttribute("disabled", true);
            let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"
            adicionaTexto(".texto__paragrafo", `O número secreto era ${numeroSecreto}. Você o acertou em ${tentativas} ${palavraTentativa}. Parabéns!`);
            chute.value = "";
        } else if (chute.value < numeroSecreto) {
            adicionaTexto(".texto__paragrafo", `O número secreto é maior que ${chute.value}. Tente outra vez.`);
            tentativas++;
            chute.value = "";
        } else {
            adicionaTexto(".texto__paragrafo", `O número secreto é menor que ${chute.value}. Tente outra vez.`);
            tentativas++;
            chute.value = "";
        }
    } else {
        texto.innerText = `Você deve digitar um número.`;
    }
}

function iniciarNovoJogo() {
    botaoReiniciar.setAttribute("disabled", true);
    botaoChutar.removeAttribute("disabled");
    adicionaTexto(".texto__paragrafo", `Escolha um número entre ${min} e ${max}.`);
    numeroSecreto = gerarNumeroAleatorio(min, max);
    console.log(numeroSecreto);
    tentativas = 0;
}