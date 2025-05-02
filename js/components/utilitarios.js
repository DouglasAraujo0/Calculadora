export function resetarBotao() {
    const resultado = document.getElementById("idResultado");
    resultado.value = "0";
}

export function apagarUmCaracterBotao() {
    const resultado = document.getElementById("idResultado");
    resultado.value = resultado.value.slice(0, -1) || "0";
}

export function calcularFatorial(numero) {
    if (numero < 0 || !Number.isInteger(numero)) return "ERRO";
    if (numero === 0 || numero === 1) return 1;
    let fatorial = 1;
    for (let i = 2; i <= numero; i++) fatorial *= i;
    return fatorial;
};
