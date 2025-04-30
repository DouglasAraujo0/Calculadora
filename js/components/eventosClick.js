import { resetarBotao, apagarUmCaracterBotao } from "./utilitarios.js";
import { resolverExpressao } from "./resolverExpressao.js";

export function configurarBotoes() {
    const resultado = document.getElementById("idResultado");
    const botoes = document.querySelectorAll("button");

    const operadoresDisponiveis = ["+", "-", "*", "÷", "%", "^", "√", "!", "sin", "cos", "tan"];
    const funcoesEspeciais = ["√", "sin", "cos", "tan"];

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            const valor = botao.textContent;
            const ultimoChar = resultado.value.slice(-1);
            const valorInicialZero = resultado.value === "0";
            const ultimoEhOperador = operadoresDisponiveis.includes(ultimoChar);

            if (valor === "-" && /-+$/.test(resultado.value)) {
                return;
            }
            

            if (valor === "-" && (valorInicialZero || ultimoEhOperador)) {
                resultado.value = valorInicialZero ? valor : resultado.value + valor;
                return;
            }

            switch (valor) {
                case "C":
                    resetarBotao();
                    return;
                case "CE":
                    apagarUmCaracterBotao();
                    return;
                case "=":
                    resolverExpressao(resultado.value, resultado);
                    return;
                case ".":
                    const partes = resultado.value.split(/[\+\-\*÷\^%]/);
                    const ultimaParte = partes[partes.length - 1];
                    if (ultimaParte.includes(".")) return;
                    break;
                default:
                    if (funcoesEspeciais.includes(valor)) {
                        if (valorInicialZero) {
                            resultado.value = valor + "(";
                        } else if (ultimoEhOperador || ultimoChar === "(") {
                            resultado.value += valor + "(";
                        } else {
                            resultado.value += "*" + valor + "(";
                        }
                        return;
                    }

                    if (operadoresDisponiveis.includes(valor)) {
                        if (valorInicialZero && !funcoesEspeciais.includes(valor)) return;

                        if (ultimoEhOperador && valor !== "!" && valor !== "%") {
                            resultado.value = resultado.value.slice(0, -1) + valor;
                            return;
                        }

                        if (ultimoChar === "!" || ultimoChar === "%") {
                            resultado.value += valor;
                            return;
                        }

                        resultado.value += valor;
                        return;
                    }
                    resultado.value = valorInicialZero ? valor : resultado.value + valor;
            }
        });
    });
}
