const todosJogadores = [
  { nome: "Renato", peso: 22 },
  { nome: "Taka", peso: 23 },
  { nome: "Mauricio", peso: 16 },
  { nome: "Mateus 41", peso: 25 },
  { nome: "xXmacroXx", peso: 19 },
  { nome: "Luigg", peso: 20 },
  { nome: "Flavio", peso: 20 },
  { nome: "PV", peso: 19 },
  { nome: "Niku", peso: 20 },
  { nome: "Ismael", peso: 19 },
  { nome: "Dolza", peso: 15 },
  { nome: "Pato", peso: 19 },
  { nome: "Magrão", peso: 14 },
  { nome: "Maia", peso: 8 },
  { nome: "Mthespsl", peso: 16 }
];

const lista = document.getElementById("lista-jogadores");
const resultado = document.getElementById("resultado");
const botaoGerar = document.getElementById("gerarTimes");

// Mostra os jogadores na tela
todosJogadores.forEach((j, i) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "jogador" + i;
  checkbox.value = i;

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = `${j.nome} (${j.peso})`;

  const div = document.createElement("div");
  div.appendChild(checkbox);
  div.appendChild(label);

  lista.appendChild(div);
});

// Embaralhar array (igual ao rand() em C)
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Montar times equilibrados
function montarTimes(jogadores) {
  embaralhar(jogadores);

  let timeA = [];
  let timeB = [];
  let somaA = 0;
  let somaB = 0;

  for (let j of jogadores) {
    if ((somaA <= somaB && timeA.length < 5) || timeB.length >= 5) {
      timeA.push(j);
      somaA += j.peso;
    } else {
      timeB.push(j);
      somaB += j.peso;
    }
  }

  return { timeA, timeB, somaA, somaB };
}

// Ação do botão
botaoGerar.addEventListener("click", () => {
  const selecionados = [...document.querySelectorAll("input[type=checkbox]:checked")].map(
    c => todosJogadores[c.value]
  );

  if (selecionados.length < 10) {
    resultado.innerHTML = "<p style='color:red'>Selecione pelo menos 10 jogadores.</p>";
    return;
  }

  const { timeA, timeB, somaA, somaB } = montarTimes(selecionados);

  resultado.innerHTML = `
    <h2>🏆 Time A (total: ${somaA})</h2>
    <ul>${timeA.map(j => `<li>${j.nome} (${j.peso})</li>`).join("")}</ul>

    <h2>🔥 Time B (total: ${somaB})</h2>
    <ul>${timeB.map(j => `<li>${j.nome} (${j.peso})</li>`).join("")}</ul>

    <p><b>Diferença total:</b> ${Math.abs(somaA - somaB)}</p>
  `;
});
