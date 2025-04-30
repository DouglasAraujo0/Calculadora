import { calcularFatorial, resetarBotao, apagarUmCaracterBotao } from "./utilitarios.js";
import { resolverExpressao } from "./resolverExpressao.js";

export function configurarBotoes() {
    const resultado = document.getElementById("idResultado");
    const botoes = document.querySelectorAll("button");

    let operadoresDisponiveis = ["+", "-", "*", "÷", "%", "^", "√", "!", "sin", "cos", "tan"];
    let operador = "";

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
                resolverExpressao(resultado.value, resultado);
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
}
