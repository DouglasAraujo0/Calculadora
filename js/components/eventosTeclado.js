export function configurarTeclado() {
    document.addEventListener("keydown", (evento) => {
        const tecla = evento.key;
        const botoes = document.querySelectorAll("button");

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
}
