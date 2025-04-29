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

        if (valor === "-" && (resultado.value === "0" || operadoresDisponiveis.includes(ultimoChar))) {
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
            if (resultado.value === "0") {
                resultado.value = valor + "(";
            } else if (operadoresDisponiveis.includes(ultimoChar) || ultimoChar === "(") {
                resultado.value += valor + "(";
            } else {
                resultado.value += "*" + valor + "(";
            }
            return;
        }
        
        

        if (operadoresDisponiveis.includes(valor)) {
            if (resultado.value === "0" && !["√", "sin", "cos", "tan"].includes(valor)) {
                return;
            }

            if (operadoresDisponiveis.includes(ultimoChar) && valor !== "!" && valor !== "%") {
                resultado.value = resultado.value.slice(0, -1) + valor;
                operador = valor;
                return;
            }

            if (ultimoChar === "!" || ultimoChar === "%") {
                resultado.value += valor;
                return;
            }

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
    expressao = expressao.replace(/\)(\d+)/g, ') * $1');
    return expressao;
}

function resolverExpressao(expressao) {
    function formataParenteses(expressao) {
        const abertura = (expressao.match(/\(/g) || []).length;
        const fechamento = (expressao.match(/\)/g) || []).length;
        const faltando = abertura - fechamento;
        return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
    }

    expressao = formataParenteses(expressao);

    function tratarPorcentagens(exp) {
        return exp.replace(/(\d+(\.\d+)?)%/g, (_, num) => `(${num} * 0.01)`);
    }

    function corrigirFatorial(exp) {
        return exp.replace(/(-?\d+(\.\d+)?)!/g, (_, num) => {
            const fatorial = calcularFatorial(Number(num));
            if (fatorial === "ERRO") throw "Erro no fatorial";
            return fatorial;
        });
    }

    expressao = expressao.replace(/√/g, "Math.sqrt");
    expressao = expressao.replace(/sin/g, "Math.sin");
    expressao = expressao.replace(/cos/g, "Math.cos");
    expressao = expressao.replace(/tan/g, "Math.tan");

    function resolverPotencias(exp) {
        exp = exp.replace(/\^/g, '**');
        return exp;
    }

    function resolverRaizQuadrada(exp) {
        return exp.replace(/√(\d+(\.\d+)?)/g, (_, num) => {
            return Math.sqrt(parseFloat(num)).toString();
        });
    }

    function resolverExpressaoGeral(exp) {
        return new Function(`return ${exp}`)();
    }

    try {
        expressao = resolverRaizQuadrada(expressao);
        expressao = resolverPotencias(expressao);
        expressao = tratarPorcentagens(expressao);
        expressao = corrigirFatorial(expressao);
        expressao = expressao.replace(/÷/g, "/");
        
        let resultadoFinal = resolverExpressaoGeral(expressao);

        if (isNaN(resultadoFinal) || !isFinite(resultadoFinal)) {
            resultado.value = "ERRO";
        } else {
            resultado.value = parseFloat(resultadoFinal.toFixed(10)).toString();
        }
    } catch (e) {
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
        "t": ".botaoTangente", "T": ".botaoTangente",
        "x": ".botaoVezes", "X": ".botaoVezes",
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
