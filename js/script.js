const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll("button");

function resetarBotao() {
    resultado.textContent = "0";
}

function ApagarUmCaracterBotao() { 
    let textoAtual = resultado.innerHTML;
    let novoTexto = "";
    for (let index = 0; index < textoAtual.length - 1; index++) {
        novoTexto += textoAtual[index];   
    }
    resultado.innerHTML = novoTexto || "0";
}

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;
        if (valor == "C") {
            resetarBotao()
            return;
        } else if (valor == "CE") {
            ApagarUmCaracterBotao();
        }
        if (resultado.innerHTML == "0") {
            resultado.innerHTML = valor;
        } else {
            resultado.innerHTML += valor
        }
    })
});



