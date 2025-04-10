const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll("button");
let expressao = "";

function resetarBotao() {
    resultado.textContent = "";
}

function ApagarUmCaracterBotao() { 
    let novaExpressao = "";
    for (let index = 0; index < expressao.length - 1; index++) {
        novaExpressao[index] += expressao[index];   
    }
    expressao = novaExpressao;
}


botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;
        console.log("gay" + valor);
    })
});

