const resultado = document.getElementById("idResultado");
const botoes = document.querySelectorAll("button");

let operadoresDisponiveis = ["+","-","*","÷"];
let operador = "";
let expressao = "";
let parte1 = "";
let parte2 = "";

function resetarBotao() {
    resultado.value = "0";
}

function apagarUmCaracterBotao() { 
    let textoAtual = resultado.value;
    let novoTexto = "";
    for (let index = 0; index < textoAtual.length - 1; index++) {
        novoTexto += textoAtual[index];   
    }
    resultado.value = novoTexto || "0";
}

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;
        if (valor === "C") {
            resetarBotao();
            return;
        }

        if (valor === "CE") {
            apagarUmCaracterBotao();
            return;
        }

        if (valor == "=") {
            const partes = resultado.value.split(operador);
            parte1 = partes[0];
            parte2 = partes[1];
            calcular();
            return;
        }

        if (operadoresDisponiveis.includes(valor) && operador == "") {
            operador = valor;
            resultado.value += valor;
            return;
        }

        if (resultado.value == "0") {
            resultado.value = valor
        } else {
            resultado.value += valor
        }
        
    })
});


function calcular() {

    let resultadoFinal = 0;
    let numero1 = parseFloat(parte1);
    let numero2 = parseFloat(parte2);

    switch(operador) {
        case "+": {
            resultadoFinal = numero1 + numero2;
            break;
        }
        case "-": {
            resultadoFinal = numero1 - numero2;
            break;
        }
        case "*": {
            resultadoFinal = numero1 * numero2;
            break;
        }
        case "÷": {
            resultadoFinal = numero1 / numero2;
            break;
        }
        case "%": {
            resultadoFinal = numero1 + numero2;
            break;
        }
    }
    resultado.value = resultadoFinal;
    operador = '';
    numero1 = '';
    numero2 = '';
}





