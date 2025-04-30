export function configurarTeclado() {
    const botoes = document.querySelectorAll("button");

    const teclasMapeadas = {
        "Enter": ".botaoIgual",
        "Backspace": ".botaoApagaUm",
        " ": ".botaoApagaTudo",
        "r": ".botaoRaiz", "R": ".botaoRaiz",
        "p": ".botaoPotencia", "P": ".botaoPotencia",
        "d": ".botaoDivisao", "D": ".botaoDivisao",
        "f": ".botaoFatorial", "F": ".botaoFatorial",
        "s": ".botaoSeno", "S": ".botaoSeno",
        "c": ".botaoCosseno", "C": ".botaoCosseno",
        "t": ".botaoTangente", "T": ".botaoTangente",
        "x": ".botaoVezes", "X": ".botaoVezes",
    };

    document.addEventListener("keydown", (evento) => {
        const tecla = evento.key;
       
        botoes.forEach((botao) => {
            if (botao.textContent === tecla) {
                acionarBotao(botao);
            }
        });

        if (teclasMapeadas[tecla]) {
            const botaoMapeado = document.querySelector(teclasMapeadas[tecla]);
            if (botaoMapeado) {
                acionarBotao(botaoMapeado);
                evento.preventDefault();
            }
        }
    });

    function acionarBotao(botao) {
        botao.click();
        botao.classList.add("pressionado");
        setTimeout(() => botao.classList.remove("pressionado"), 150);
    }
}
