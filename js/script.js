const resultado = document.getElementById("idResultado");
const botoes = document.querySelectorAll("button");

let operadoresDisponiveis = ["+","-","*","÷", "%", "^", "√", "!", "sin", "cos", "tan"];
let operador = "";
let parte1 = "";
let parte2 = "";

function resetarBotao() {
    resultado.value = "0";
    operador = "";
    parte1 = "";
    parte2 = "";
}

function apagarUmCaracterBotao() { 
    resultado.value = resultado.value.slice(0, -1) || "0";

    if (!resultado.value.includes(operador)) {
        operador = "";
    }
}

function calcularFatorial(numero) {
    if (numero < 0 || !Number.isInteger(numero)) {
        return "ERRO";
    }
    if (numero === 0 || numero === 1) {
        return 1;
    }

    let fatorial = 1;
    for (let i = 2; i <= numero; i++) {
        fatorial *= i;
    }
    return fatorial;
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

        if (valor == ".") {
            const partes = resultado.value.split(operador || "");
            const ultimaParte = partes[partes.length - 1];
            if (ultimaParte.includes(".")) {
            return;
            }
        }

        if (valor == "=") {
            if(!operador) {
                return;
            }

            if (operador == "√"  || operador == "!" || operador == "sin") {
                parte1 = resultado.value.replace(operador, "")
                if (parte1 == "") {
                    return;
                }
                parte2 = "";
            } else {
                const partes = resultado.value.split(operador);
                parte1 = partes[0];
                parte2 = partes[1];
                
                if (parte1 == "" || parte2 == "") {
                    return;
                }       
            }
            calcular();
            return;
        }

        if (operadoresDisponiveis.includes(valor)) {
            for (let temOperador of operadoresDisponiveis) {
                if (resultado.value.includes(temOperador)) {
                    return;
                }
            }  
            
        operador = valor;

        if (valor == "√") {
            operador = valor;
        
            if (resultado.value === "0") {
                resultado.value = "√";
            } else {
                resultado.value = "√" + resultado.value;
            }
            return;
        }

        if (valor == "sin") {
            operador = "sin";
            
            if(resultado.value == "0") {
                resultado.value = "sin";
            } else {
                resultado.value = "sin" + resultado.value; 
            };
            return;
        }
        
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
            if (numero2 == 0) {
                resultado.value = "ERRO"
                operador = "";
                return;
            }
            resultadoFinal = numero1 / numero2;
            break;
        }
        case "%": {
            resultadoFinal = ((numero1 * numero2) / 100);
            break;
        }
        case "^": {
            resultadoFinal = numero1 ** numero2;
            break;
        }
        case "√": {
            if (numero1 < 0) {
                resultado.value = "ERRO";
                operador = "";
                return;
            }
            resultadoFinal = Math.sqrt(numero1)  
            break;
        }
        case "!": {
            if (numero1 < 0 || !Number.isInteger(numero1)) {
                resultado.value = "ERRO";
                operador = "";
                return;
            }
            resultadoFinal = calcularFatorial(numero1);
            break;
        };
        case "sin": {
            resultadoFinal = Math.sin(numero1);
            break;
        };
        case "cos": {
            resultadoFinal = Math.cos(numero1);
            break;
        };
        case "tan": {
            resultadoFinal = Math.tan(numero1);
            break;
        };
    }
    resultado.value = parseFloat(resultadoFinal.toFixed(5)).toString();
    operador = '';
    parte1 = '';
    parte2 = '';
}

document.addEventListener("keydown", (evento) => {
    const tecla = evento.key;
    botoes.forEach((botao) => {
        const valorBotao = botao.textContent;
        if (valorBotao === tecla) {
            botao.click();
            botao.classList.add("pressionado")
        }
        setTimeout(() => {
            botao.classList.remove("pressionado"); 
        }, 150);
    });

    function selecionarTecla(classe) {
        const botao = document.querySelector(classe);
        if (botao) {
            botao.click();
            botao.classList.add("pressionado")
        }
        setTimeout(() => {
            botao.classList.remove("pressionado"); 
        }, 150);
        evento.preventDefault();
    }

    if (tecla == "Enter") {
        selecionarTecla(".botaoIgual");
    }

    if (tecla == "Backspace") {
        selecionarTecla(".botaoApagaUm");
    }

    if (tecla == "r" || tecla == "R") {
        selecionarTecla(".botaoRaiz");
    }

    if (tecla == " ") {
        selecionarTecla(".botaoApagaTudo");
    }

    if (tecla == "p" || tecla == "P") {
        selecionarTecla(".botaoPotencia");
    }

    if (tecla == "d" || tecla == "D") {
        selecionarTecla(".botaoDivisao");
    }
    if (tecla == "f" || tecla == "F") {
        selecionarTecla(".botaoFatorial")
    } 
    if (tecla == "s" || tecla == "S") {
        selecionarTecla(".botaoSeno")
    } 
    if (tecla == "c" || tecla == "C") {
        selecionarTecla(".botaoCosseno")
    } 
    if (tecla == "t" || tecla == "T") {
        selecionarTecla(".botaoTangente")
    } 

});




