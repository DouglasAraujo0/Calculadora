const resultado = document.getElementById("idResultado");
const botoes = document.querySelectorAll("button");

let operadoresDisponiveis = ["+", "-", "*", "÷", "%", "^", "√", "!", "sin", "cos", "tan"];
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

        if (valor === ".") {
            const partes = resultado.value.split(operador || "");
            const ultimaParte = partes[partes.length - 1];
            if (ultimaParte.includes(".")) {
                return;
            }
        }

        if (valor === "=") {
            resolverExpressao(resultado.value);
            return;
        }
        if (["√", "sin", "cos", "tan"].includes(valor)) {
            if (resultado.value === "0") {
                resultado.value = valor;
            } else {
                resultado.value = valor + resultado.value;
            }
            return;
        }

        if (operadoresDisponiveis.includes(valor)) {
            if (resultado.value === "0" && valor !== "√" && valor !== "sin" && valor !== "cos" && valor !== "tan") {
                return; // Não permite operadores antes de um número
            }
            operador = valor;
            resultado.value += valor; // Para aceitar várias operações
            return;
        }

        if (resultado.value === "0") {  
            resultado.value = valor;
        } else {
            resultado.value += valor;
        }
    });
});

function resolverExpressao(expressao) {
    expressao = expressao.replace(/÷/g, "/");

    expressao = expressao.replace(/(\d+)!/g, (_, numero) => {
        return calcularFatorial(Number(numero));
    });

    expressao = expressao.replace(/(\d+)\^(\d+)/g, (_, base, expoente) => {
        return Math.pow(Number(base), Number(expoente));
    });

    expressao = expressao.replace(/√(\d+)/g, (_, numero) => {
        return Math.sqrt(Number(numero));
    });

    // Resolver operações trigonométricas
    expressao = expressao.replace(/(sin|cos|tan)\((\-?\d+(\.\d+)?)\)/g, (_, func, num) => {
        num = parseFloat(num);
        if (isNaN(num)) return "ERRO";

        // Converter graus para radianos para funções trigonométricas
        let rad = num * Math.PI / 180;

        switch (func) {
            case "sin": return Math.sin(rad);
            case "cos": return Math.cos(rad);
            case "tan": return Math.tan(rad);
            default: return "ERRO";
        }
    });

    try {
        // Avalia a expressão completa de forma segura
        let resultadoFinal = new Function(`return (${expressao})`)();
        if (isNaN(resultadoFinal) || resultadoFinal === Infinity || resultadoFinal === -Infinity) {
            resultado.value = "ERRO";
        } else {
            resultado.value = parseFloat(resultadoFinal.toFixed(10)).toString(); // Limita pequenas casas decimais
        }
    } catch (erro) {
        resultado.value = "ERRO";
    }
}







document.addEventListener("keydown", (evento) => {
    const tecla = evento.key;
    botoes.forEach((botao) => {
        const valorBotao = botao.textContent;
        if (valorBotao === tecla) {
            botao.click();
            botao.classList.add("pressionado");
            setTimeout(() => {
                botao.classList.remove("pressionado");
            }, 150);
        }
    });

    const teclasMapeadas = {
        "Enter": ".botaoIgual",
        "Backspace": ".botaoApagaUm",
        "r": ".botaoRaiz",
        "R": ".botaoRaiz",
        " ": ".botaoApagaTudo",
        "p": ".botaoPotencia",
        "P": ".botaoPotencia",
        "d": ".botaoDivisao",
        "D": ".botaoDivisao",
        "f": ".botaoFatorial",
        "F": ".botaoFatorial",
        "s": ".botaoSeno",
        "S": ".botaoSeno",
        "c": ".botaoCosseno",
        "C": ".botaoCosseno",
        "t": ".botaoTangente",
        "T": ".botaoTangente"
    };

    if (teclasMapeadas[tecla]) {
        selecionarTecla(teclasMapeadas[tecla]);
    }

    function selecionarTecla(classe) {
        const botao = document.querySelector(classe);
        if (botao) {
            botao.click();
            botao.classList.add("pressionado");
            setTimeout(() => {
                botao.classList.remove("pressionado");
            }, 150);
            evento.preventDefault();
        }
    }
});