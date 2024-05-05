let listaDeNumerosSorteados = [];
let quantidadeNumeroDisponivel = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function verificarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2} );
}

function exibirMensagemInicial() {
    verificarTextoNaTela("h1","Jogo do número secreto");
    verificarTextoNaTela("p","Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto)
    {
        verificarTextoNaTela("h1", "Acertou!");
        let palavraTentativas = tentativas > 1? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        verificarTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(chute > numeroSecreto){
            verificarTextoNaTela("p", "O número secreto é menor");
        } else {
            verificarTextoNaTela("p", "O número secreto é maior");
        }
        tentativas ++;
        limparCampo()
    } 
    
    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumeroDisponivel + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == quantidadeNumeroDisponivel){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}