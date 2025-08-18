function gerarCartela() {
    const card = document.getElementById("bingoCard");
    card.innerHTML = "";
    let numeros = [];

    while (numeros.length < 24) {
        let num = Math.floor(Math.random() * 75) + 1;
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }

    let i = 0;
    for (let linha = 0; linha < 5; linha++) {
        for (let coluna = 0; coluna < 5; coluna++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (linha === 2 && coluna === 2) {
                cell.innerText = ""; // centro vazio (Kuromi no PNG)
            } else {
                cell.innerText = numeros[i];
                cell.setAttribute("data-numero", numeros[i]);

                // clica pra marcar/desmarcar
                cell.addEventListener("click", () => {
                    cell.classList.toggle("marcado");
                });

                i++;
            }

            card.appendChild(cell);
        }
    }
}

let sorteados = [];

const frases = {
    1: "1 - Começo de jogo é!",
    9: "9 - Pingo no pé 9 é!",
    22: "22 - Dois patinhos na lagoa!",
    51: "51 - Boa ideia!",
    66: "66 - Um tapa atrás da orelha!",
    75: "75 - Fim de jogo é!"
};

function sortearNumero() {
    if (sorteados.length >= 75) {
        document.getElementById("sorteado").innerText = "Todos os números já foram sorteados!";
        document.getElementById("frase").innerText = "";
        return;
    }

    let num;
    do {
        num = Math.floor(Math.random() * 75) + 1;
    } while (sorteados.includes(num));

    sorteados.push(num);
    document.getElementById("sorteado").innerText = "Número sorteado: " + num;

    if (frases[num]) {
        document.getElementById("frase").innerText = frases[num];
    } else {
        document.getElementById("frase").innerText = "";
    }
}

gerarCartela();