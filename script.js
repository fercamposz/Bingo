
function gerarCartela() {
  const card = document.getElementById("bingoCard");
  card.innerHTML = "";

  // NAO ESQUECER DE DEFINIR OS NUMEROS
  const ranges = [
    [1, 15],  
    [16, 30], 
    [31, 45],  
    [46, 60],  
    [61, 75], 
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

  for (let l = 0; l < 5; l++) {       
    for (let c = 0; c < 5; c++) {    
      const cell = document.createElement("div");
      cell.classList.add("cell");

   
      if (l === 2 && c === 2) {
    cell.innerText = "";
    cell.classList.add("marcado"); 
} else {
    const valor = colData[c][l];
    cell.textContent = valor;
    cell.setAttribute("data-numero", valor);

    cell.addEventListener("click", () => {
        cell.classList.toggle("marcado");
    });
}


      card.appendChild(cell);
    }
  }
}

// ======== SORTEADOR ========
let sorteados = [];

const frases = {
  1: "COMEÇO DE JOGO É",
  9: "Pingo no pé 9 é!",
  22: "DOIS PATINHO NA LAGOA: 22",
  51: "BOA IDEIA: 51",
  66: "66  Um tapa atrás da orelha",
  75: "FIM DE JOGO É"
};

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

function verificarBingo() {
  const cells = document.querySelectorAll(".cell");
  const grid = [];

  for (let i = 0; i < 5; i++) {
    grid[i] = [];
    for (let j = 0; j < 5; j++) {
      const idx = i * 5 + j;
      grid[i][j] = cells[idx].classList.contains("marcado") || (i === 2 && j === 2);
    }
  }

  let bingo = false;

  for (let i = 0; i < 5; i++) if (grid[i].every(Boolean)) bingo = true;

  for (let j = 0; j < 5; j++) if (grid.every(row => row[j])) bingo = true;
  if ([0,1,2,3,4].every(i => grid[i][i])) bingo = true;
  if ([0,1,2,3,4].every(i => grid[i][4-i])) bingo = true;

 const res = document.getElementById("resultado");
if (bingo) {
    res.innerText = " BINGO!!! ";
    res.style.color = "#00c853";

    const audio = document.getElementById("audioBingo");
    audio.currentTime = 0; 
    audio.play();
} else {
    res.innerText = "nao bingou";
    res.style.color = "#ff1744";
}
}

gerarCartela();

