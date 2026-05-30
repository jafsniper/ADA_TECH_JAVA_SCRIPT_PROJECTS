// ======================================================
// BLOCO 1 – DECLARAÇÕES GLOBAIS E ESTRUTURA DE DADOS
// ======================================================
const alunos = []; // Array global para armazenar alunos
const statusMap = new Map([
  ["APR", "Aprovado"],
  ["REP", "Reprovado por Nota"],
  ["FREQ", "Reprovado por Frequência"],
]);

// ======================================================
// BLOCO 2 – FUNÇÕES DE CÁLCULO E UTILITÁRIAS
// ======================================================

// Função pura para calcular média
function calcularMedia(notas) {
  let soma = 0;
  for (let nota of notas) {
    soma += nota;
  }
  return soma / notas.length;
}

// Função para verificar status de aprovação
function verificarStatus(media, presencas, aulasTotais) {
  const frequencia = (presencas / aulasTotais) * 100;
  if (media >= 7 && frequencia >= 75) return "APR";
  if (media < 7) return "REP";
  return "FREQ";
}

// Função para atribuir conceito via switch
function atribuirConceito(media) {
  let conceito;
  switch (true) {
    case media >= 9:
      conceito = "A";
      break;
    case media >= 7:
      conceito = "B";
      break;
    case media >= 5:
      conceito = "C";
      break;
    default:
      conceito = "D";
  }
  return conceito;
}

// ======================================================
// BLOCO 3 – CADASTRAMENTO DE DADOS DO ALUNO
// ======================================================
document
  .getElementById("cadastroAluno")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const nome = document.getElementById("nome").value.trim();
      const nota1 = parseFloat(document.getElementById("nota1").value);
      const nota2 = parseFloat(document.getElementById("nota2").value);
      const nota3 = parseFloat(document.getElementById("nota3").value);
      const presencas = parseInt(document.getElementById("presencas").value);
      const aulasTotais = parseInt(
        document.getElementById("aulasTotais").value,
      );
      const responsavel = document.getElementById("responsavel").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const email = document.getElementById("email").value.trim();

      // Validações
      if (!nome) throw new Error("O nome do aluno é obrigatório.");

      // Teste condicional para notas
      if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        throw new Error("Todas as notas devem ser preenchidas.");
      }

      if (nota1 < 0 || nota1 > 10) {
        throw new Error("Nota 1 inválida: deve estar entre 0 e 10.");
      }
      if (nota2 < 0 || nota2 > 10) {
        throw new Error("Nota 2 inválida: deve estar entre 0 e 10.");
      }
      if (nota3 < 0 || nota3 > 10) {
        throw new Error("Nota 3 inválida: deve estar entre 0 e 10.");
      }

      if (isNaN(presencas) || isNaN(aulasTotais)) {
        throw new Error("Presenças e aulas totais devem ser preenchidas.");
      }
      if (presencas > aulasTotais) {
        throw new Error("Presenças não podem ser maiores que aulas totais.");
      }
      // Criação do objeto aluno
      const aluno = {
        nome,
        notas: [nota1, nota2, nota3],
        presencas,
        aulasTotais,
        contato: { responsavel, telefone, email },
      };

      alunos.push(aluno);
      exibirMensagem("Aluno cadastrado com sucesso!", "sucesso");
      document.getElementById("cadastroAluno").reset();

      renderizarTabela(); // Atualiza painel
    } catch (erro) {
      exibirMensagem(erro.message, "erro");
    }
  });

// ======================================================
// BLOCO 4 – PAINEL DE LISTAGEM E FILTROS
// ======================================================
function renderizarTabela(filtro = "") {
  const tbody = document.querySelector("#tabelaAlunos tbody");
  tbody.innerHTML = "";

  for (const aluno of alunos) {
    if (filtro && !aluno.nome.toLowerCase().includes(filtro.toLowerCase()))
      continue;

    const media = calcularMedia(aluno.notas);
    const status = verificarStatus(media, aluno.presencas, aluno.aulasTotais);
    const conceito = atribuirConceito(media);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${media.toFixed(2)}</td>
      <td>${((aluno.presencas / aluno.aulasTotais) * 100).toFixed(1)}%</td>
      <td>${statusMap.get(status)}</td>
      <td>${conceito}</td>
      <td>${aluno.contato.email || "E-mail não informado"}</td>
    `;
    tbody.appendChild(tr);
  }
}

// Filtro de busca em tempo real
document.getElementById("filtroNome").addEventListener("input", function () {
  renderizarTabela(this.value);
});

// ======================================================
// BLOCO 5 – CENTRAL DE DESAFIOS (GAMIFICAÇÃO)
// ======================================================
function desafioMedia() {
  if (alunos.length === 0) {
    exibirMensagem("Nenhum aluno cadastrado para o desafio.", "erro");
    return;
  }

  const aluno = alunos[Math.floor(Math.random() * alunos.length)];
  const media = calcularMedia(aluno.notas);
  let tentativa = 0;
  let resposta;

  do {
    resposta = prompt(
      `Qual é a média do aluno ${aluno.nome}? (Notas: ${aluno.notas.join(", ")})`,
    );
    tentativa++;
  } while (
    resposta !== null &&
    parseFloat(resposta) !== parseFloat(media.toFixed(2))
  );

  if (resposta !== null) {
    document.getElementById("resultadoDesafio").textContent =
      `Parabéns! Você acertou a média de ${aluno.nome} em ${tentativa} tentativa(s).`;
  }
}

function desafioBusca() {
  if (alunos.length === 0) {
    exibirMensagem("Nenhum aluno cadastrado para o desafio.", "erro");
    return;
  }

  const nomeBusca = prompt("Digite o nome de um aluno para buscar:");
  let encontrado = false;
  let i = 0;

  while (i < alunos.length) {
    if (alunos[i].nome.toLowerCase() === nomeBusca.toLowerCase()) {
      document.getElementById("resultadoDesafio").textContent =
        `Aluno encontrado: ${alunos[i].nome}, média ${calcularMedia(alunos[i].notas).toFixed(2)}.`;
      encontrado = true;
      break;
    }
    i++;
  }

  if (!encontrado) {
    document.getElementById("resultadoDesafio").textContent =
      `Aluno ${nomeBusca} não encontrado.`;
  }
}

// Botões de gamificação
document.getElementById("desafioMedia").addEventListener("click", desafioMedia);
document.getElementById("desafioBusca").addEventListener("click", desafioBusca);

// ======================================================
// BLOCO 6 – FUNÇÃO DE MENSAGENS (UX)
// ======================================================
function exibirMensagem(texto, tipo) {
  let divMensagem = document.getElementById("mensagemSistema");

  if (!divMensagem) {
    divMensagem = document.createElement("div");
    divMensagem.id = "mensagemSistema";
    document.body.insertBefore(divMensagem, document.getElementById("painel"));
  }

  divMensagem.textContent = texto;
  divMensagem.style.padding = "10px";
  divMensagem.style.margin = "15px auto";
  divMensagem.style.maxWidth = "600px";
  divMensagem.style.textAlign = "center";
  divMensagem.style.borderRadius = "5px";

  if (tipo === "erro") {
    divMensagem.style.backgroundColor = "#f44336";
    divMensagem.style.color = "white";
  } else {
    divMensagem.style.backgroundColor = "#4caf50";
    divMensagem.style.color = "white";
  }
}
