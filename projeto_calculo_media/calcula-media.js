// Passo 1. Criar um array vazio
const notas = [];

// Passo 2. Preenchendo o array
notas.push(Number(prompt("Digite a primeira nota:"))); // índice 0
notas.push(Number(prompt("Digite a segunda nota:"))); // índice 1
notas.push(Number(prompt("Digite a terceira nota:"))); // índice 2

console.log(notas); // ajuda a debugar possíveis erros

// Passo 3. Calculando a média das três notas
const pesoNota1 = 2;
const pesoNota2 = 3;
const pesoNota3 = 5;
const pesos = pesoNota1 + pesoNota2 + pesoNota3;
const soma = notas[0] * pesoNota1 + notas[1] * pesoNota2 + notas[2] * pesoNota3;
const media = soma / pesos;

// Passo 4. Exibin do no HTML
const resultado = document.getElementById("resultado");

// O uso da `crase` permite inserir no DOM HTML vários elementos, estáticos ou dinâmicos //
// tag strong torna o texto em negrito bold //
if (media >= 6) {
  resultado.innerHTML = `
      <p style="font-family: Arial; font-weight: bold; color: rgb(17, 2, 102);">
      Notas registradas: ${notas[0]}, ${notas[1]}, ${notas[2]}
      </p>
      <h3 style="font-family: Arial; font-weight: bold; color: rgb(17, 2, 102);">
      A média final é: 
        <strong style="font-family: Arial; color: green;">
            ${media.toFixed(2)}
        </strong>
        </h3>`;
} else {
  resultado.innerHTML = `
      <p style="font-family: Arial; font-weight: bold; color: rgb(17, 2, 102);">
      Notas registradas: ${notas[0]}, ${notas[1]}, ${notas[2]}
      </p>
      <h3 style="font-family: Arial; font-weight: bold; color: rgb(17, 2, 102);">
      <h3>A média final é: 
        <strong style="font-family: Arial; color: red;">
            ${media.toFixed(2)}
        </strong>
        </h3>`;
}
/*
resultado.innerHTML = `
  <p>Notas registradas: ${notas[0]}, ${notas[1]}, ${notas[2]}</p>

  <h3>A média final é: <strong>${media.toFixed(2)}</strong></h3>

`; */
