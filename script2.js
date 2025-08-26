//  variavel global
let numeros = Array.from({ length: 75 }, (_, i) => i + 1);
let sorteados = [];

// retorna letra do bingo 
function getLetra(num) {
    if (num <= 15) return "B";
    if (num <= 30) return "I";
    if (num <= 45) return "N";
    if (num <= 60) return "G";
    return "O";
}

// sorteia um número e exibe 
function sortear() {
    if (numeros.length === 0) {
        document.getElementById("mensagem").innerText = "Acabou os números!";
        return;
    }

    const idx = Math.floor(Math.random() * numeros.length);
    const num = numeros.splice(idx, 1)[0];
    sorteados.push(num);

    const letra = getLetra(num);

    // Exibe no centro o número sorteado
    document.getElementById("bola").innerText = letra + " " + num;

    
    const div = document.createElement("div");
    div.classList.add("numero");
    div.innerText = num;
    document.getElementById("col" + letra).appendChild(div);
}

// recomeça o jogo
function zerar() {
    numeros = Array.from({ length: 75 }, (_, i) => i + 1);
    sorteados = [];
    document.getElementById("bola").innerText = "";
    document.getElementById("mensagem").innerText = "";
    document.querySelectorAll(".numeros").forEach(c => {
        c.innerHTML = "";
    });
}
