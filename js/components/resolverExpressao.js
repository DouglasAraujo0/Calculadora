import { calcularFatorial } from "./utilitarios.js";

export function resolverExpressao(expressao, resultado) {
    function formataParenteses(expressao) {
        const abertura = (expressao.match(/\(/g) || []).length;
        const fechamento = (expressao.match(/\)/g) || []).length;
        const faltando = abertura - fechamento;
        return faltando > 0 ? expressao + ')'.repeat(faltando) : expressao;
    }

    function tratarPorcentagens(exp) {
        // 1. número operador número%
        exp = exp.replace(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)%/g, (_, num1, _1, op, num2) => {
            return `${num1}${op}(${num1} * ${num2} / 100)`;
        });
    
        // 2. número% seguido de algo
        exp = exp.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?|\([^()]*\)|[a-zA-Z]+)/g, (_, num1, _1, num2) => {
            return `(${num1} * 0.01) * ${num2}`;
        });
    
        // 3. número% isolado
        exp = exp.replace(/(\d+(\.\d+)?)%/g, (_, num) => {
            return `(${num} * 0.01)`;
        });
    
        return exp;
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
        expressao = tratarPorcentagens(expressao);
        expressao = corrigirFatorial(expressao);
        expressao = resolverRaizQuadrada(expressao);
        expressao = resolverPotencias(expressao);

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
