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
    if (numero < 0 || !Number.isInteger(numero)) return "ERRO";
    if (numero === 0 || numero === 1) return 1;
    let fatorial = 1;
    for (let i = 2; i <= numero; i++) fatorial *= i;
    return fatorial;
}

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;
        const ultimoChar = resultado.value.slice(-1);

        // Permitir número negativo apenas se a tela estiver mostrando "0" ou após um operador
        if (valor === "-" && (resultado.value === "0" || operadoresDisponiveis.includes(ultimoChar) || ultimoChar === "(")) {
            resultado.value = resultado.value === "0" ? valor : resultado.value + valor;
            return;
        }

        if (valor === "C") {
            resetarBotao();
            return;
        }

        if (valor === "CE") {
            apagarUmCaracterBotao();
            return;
        }

        if (valor === ".") {
            const partes = resultado.value.split(/[\+\-\*÷\^%]/);
            const ultimaParte = partes[partes.length - 1];
            if (ultimaParte.includes(".")) return;
        }

        if (valor === "=") {
            resolverExpressao(resultado.value);
            return;
        }

        if (["√", "sin", "cos", "tan"].includes(valor)) {
            if (
                resultado.value === "0" ||
                operadoresDisponiveis.includes(ultimoChar) ||
                ultimoChar === "("
            ) {
                resultado.value += valor + "(";
            }
            return;
        }

        if (operadoresDisponiveis.includes(valor)) {
            if (
                resultado.value === "0" &&
                !["√", "sin", "cos", "tan"].includes(valor)
            ) {
                return;
            }

            if (operadoresDisponiveis.includes(ultimoChar)) {
                resultado.value = resultado.value.slice(0, -1) + valor;
                operador = valor;
                return;
            }

            if (ultimoChar === "(" && valor !== "-") {
                return;
            }

            operador = valor;
            resultado.value += valor;
            return;
        }

        if (resultado.value === "0") {
            resultado.value = valor;
        } else {
            resultado.value += valor;
        }
    });
});



function corrigirMultiplicacaoAutomatica(expressao) {
    // Adicionar '*' entre números e parênteses seguidos diretamente por números
    expressao = expressao.replace(/\)(\d+)/g, ') * $1');
    return expressao;
}

function resolverExpressao(expressao) {
    // Corrige a multiplicação automática
    expressao = corrigirMultiplicacaoAutomatica(expressao); 

    // Exibe a expressão corrigida para depuração
    resultado.value = expressao; // Mostra a expressão corrigida

    // Substitui operadores para cálculos
    expressao = expressao.replace(/÷/g, "/");

    // Bloquear parênteses mal posicionados
    if (/\d+\(|\)\d+/.test(expressao)) {
        resultado.value = "ERRO";
        return;
    }

    // Fatorial: apenas após número direto (não aceita parênteses ou operadores antes)
    expressao = expressao.replace(/(?<![()\d])(\d+)!/g, (_, numero) => {
        return calcularFatorial(Number(numero));
    });

    // Potência
    expressao = expressao.replace(/(\d+)\^(\d+)/g, (_, base, expoente) => {
        return Math.pow(Number(base), Number(expoente));
    });

    // Raiz quadrada com parênteses obrigatórios
    expressao = expressao.replace(/√\((\-?\d+(\.\d+)?)\)/g, (_, numero) => {
        return Math.sqrt(Number(numero));
    });

    // Seno, cosseno, tangente com parênteses obrigatórios
    expressao = expressao.replace(/(sin|cos|tan)\((\-?\d+(\.\d+)?)\)/g, (_, func, num) => {
        num = parseFloat(num);
        if (isNaN(num)) return "ERRO";
        switch (func) {
            case "sin": return Math.sin(num);
            case "cos": return Math.cos(num);
            case "tan": return Math.tan(num);
            default: return "ERRO";
        }
    });

    try {
        let resultadoFinal = new Function(`return (${expressao})`)();
        if (isNaN(resultadoFinal) || !isFinite(resultadoFinal)) {
            resultado.value = "ERRO";
        } else {
            resultado.value = parseFloat(resultadoFinal.toFixed(10)).toString();
        }
    } catch {
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
        "r": ".botaoRaiz", "R": ".botaoRaiz",
        " ": ".botaoApagaTudo",
        "p": ".botaoPotencia", "P": ".botaoPotencia",
        "d": ".botaoDivisao", "D": ".botaoDivisao",
        "f": ".botaoFatorial", "F": ".botaoFatorial",
        "s": ".botaoSeno", "S": ".botaoSeno",
        "c": ".botaoCosseno", "C": ".botaoCosseno",
        "t": ".botaoTangente", "T": ".botaoTangente"
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
