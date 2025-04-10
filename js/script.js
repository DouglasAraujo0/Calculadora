const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll("button");
let expressao = "";

function botaoReset() {
    resultado.textContent = "";
} 


botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;
        console.log("gay" + valor);
    })
});

