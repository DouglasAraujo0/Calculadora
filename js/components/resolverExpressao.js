import { calcularFatorial } from "./utilitarios.js";

export function resolverExpressao(expressao, resultado) {
    function formataParenteses(expressao) {
        const abertura = (expressao.match(/\(/g) || []).length;
        const fechamento = (expressao.match(/\)/g) || []).length;
        const faltando = abertura - fechamento;
        return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
    }

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

    function resolverRaizQuadrada(exp) {
        return exp.replace(/√(\d+(\.\d+)?)/g, (_, num) => {
            return Math.sqrt(parseFloat(num)).toString();
        });
    }

    function resolverPotencias(exp) {
        return exp.replace(/\^/g, "**");
    }

    function resolverExpressaoGeral(exp) {
        return new Function(`return ${exp}`)();
    }

    try {
        expressao = formataParenteses(expressao);
        expressao = resolverRaizQuadrada(expressao);
        expressao = resolverPotencias(expressao);
        expressao = tratarPorcentagens(expressao);
        expressao = corrigirFatorial(expressao);

        expressao = expressao.replace(/÷/g, "/")
                             .replace(/sin/g, "Math.sin")
                             .replace(/cos/g, "Math.cos")
                             .replace(/tan/g, "Math.tan")
                             .replace(/√/g, "Math.sqrt");

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
