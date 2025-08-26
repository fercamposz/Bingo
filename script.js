function gerarCartela() {
    const card = document.getElementById("bingoCard");
    card.innerHTML = "";

    // limpa frase e resultado
    document.getElementById("frase").innerText = "";
    document.getElementById("resultado").innerText = "";

    // define os numeros de cada coluna
    const ranges = [
        [1, 15],
        [16, 30],
        [31, 45],
        [46, 60],
        [61, 75]
    ];

    const colData = [];
    for (let c = 0; c < 5; c++) {
        const [min, max] = ranges[c];
        const nums = [];
        while (nums.length < 5) {
            const n = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!nums.includes(n)) nums.push(n);
        }
        nums.sort((a, b) => a - b);
        colData[c] = nums;
    }

// cria a cartela
    for (let l = 0; l < 5; l++) {
        for (let c = 0; c < 5; c++) {
            const criar = document.createElement("div");
            criar.classList.add("criar");

            if (l === 2 && c === 2) {
                criar.innerText = "";
                criar.classList.add("cartelaMarcado");
            } else {
                const valor = colData[c][l];
                criar.textContent = valor;
                criar.setAttribute("data-numero", valor);
                criar.addEventListener("click", () => {
                    criar.classList.add("cartelaMarcado");
                    checarBingo(false); 
                });
            }
            card.appendChild(criar);
        }
    }

 // limpa números sorteados
    sorteados = [];
    document.getElementById("sorteado").innerText = "Número sorteado:";
}
// frases personalizadas de acordo com o numero

const frases = {
    1: "COMEÇO DE JOGO É",
    9: "Pingo no pé 9 é!",
    22: "DOIS PATINHO NA LAGOA: 22",
    51: "BOA IDEIA: 51",
    66: "66  Um tapa atrás da orelha",
    75: "FIM DE JOGO É"
};

// sorteio
function sortearNumero() {
    if (sorteados.length >= 75) {
        document.getElementById("sorteado").innerText = "ACABOU";
        document.getElementById("frase").innerText = "";
        return;
    }

    let num;
    do {
        num = Math.floor(Math.random() * 75) + 1;
    } while (sorteados.includes(num));
    sorteados.push(num);

    const letra = num <= 15 ? "B" : num <= 30 ? "I" : num <= 45 ? "N" : num <= 60 ? "G" : "O";
    document.getElementById("sorteado").innerText = "Número sorteado: " + letra + " " + num;
    document.getElementById("frase").innerText = frases[num] || "";
}

// atualiza o bingo
function checarBingo(mostrarMensagem = true) {
    const criars = document.querySelectorAll(".criar");
    const grid = [];

    for (let i = 0; i < 5; i++) {
        grid[i] = [];
        for (let j = 0; j < 5; j++) {
            const idx = i * 5 + j;
            grid[i][j] = criars[idx].classList.contains("cartelaMarcado") || (i === 2 && j === 2);
            criars[idx].classList.remove("cartelaBingo"); 
        }
    }

    // pinta o bingo caso 'ganhe"
    const pintarVerde = indices => indices.forEach(idx => criars[idx].classList.add("cartelaBingo"));

    for (let i = 0; i < 5; i++)
        if (grid[i].every(Boolean)) pintarVerde([i*5, i*5+1, i*5+2, i*5+3, i*5+4]);

    for (let j = 0; j < 5; j++)
        if (grid.every(row => row[j])) pintarVerde([j, j+5, j+10, j+15, j+20]);

    if ([0,1,2,3,4].every(i => grid[i][i])) pintarVerde([0,6,12,18,24]);
    if ([0,1,2,3,4].every(i => grid[i][4-i])) pintarVerde([4,8,12,16,20]);

    if (!mostrarMensagem) return;

    // resultado do jogador
    const res = document.getElementById("resultado");
    const bingo = [...criars].some(td => td.classList.contains("cartelaBingo"));
    if (bingo) {
        res.innerText = "BINGO!!!";
        res.style.color = "#00c8adff";
        const audio = document.getElementById("audioBingo");
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    } else {
        res.innerText = "não bingou";
        res.style.color = "#ff1744";
    }
}

// mostra a mensagem de ganhar só quando clicar no botão

function verificarBingo() {
    checarBingo(true); 
}

gerarCartela();
