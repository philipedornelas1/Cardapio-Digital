const produtos = [
  {
    categoria: "🍰 Sobremesas",
    itens: [
      { nome: "🍍 Delícia de Abacaxi", preco: 5 },
      { nome: "🍓 Mousse de Morango", preco: 5 },
      { nome: "🍬 Bombom de Uva/Maracujá/Limão/Morango", preco: 5 },
      {
        nome: "🍫 Brigadeiro de Ninho/Oreo, Surpresa de Uva, Bem Casado, Amendoim (unidade)",
        preco: 1.5,
      },
      { nome: "📦 Caixinha com 4 unidades (brigadeiro e similares)", preco: 6 },
    ],
  },
  {
    categoria: "🥟 Salgados",
    itens: [
      { nome: "🦐 Empada de Camarão", preco: 3 },
      { nome: "🍗 Empada de Frango", preco: 3 },
      { nome: "🧀 Salgadinho de Queijo", preco: 5 },
    ],
  },
];

const cardapioEl = document.getElementById("cardapio");
const carrinhoEl = document.getElementById("itens-carrinho");
let carrinho = [];

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function renderizarCardapio() {
  produtos.forEach((secao) => {
    const secaoEl = document.createElement("section");
    const titulo = document.createElement("h2");
    titulo.textContent = secao.categoria;
    secaoEl.appendChild(titulo);

    secao.itens.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.nome}</h3>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho('${item.nome}', ${
        item.preco
      })">Adicionar</button>
      `;
      secaoEl.appendChild(card);
    });

    cardapioEl.appendChild(secaoEl);
  });
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  carrinhoEl.innerHTML = "";
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    li.onclick = () => removerItem(index);
    carrinhoEl.appendChild(li);
  });
}

function confirmarPedido() {
  const nome = document.getElementById("nomeCliente").value.trim();
  if (!nome || carrinho.length === 0) {
    alert("Preencha o nome e adicione itens.");
    return;
  }
  alert(`Pedido confirmado para ${nome}!`);
}

function cancelarPedido() {
  if (confirm("Cancelar pedido?")) {
    carrinho = [];
    atualizarCarrinho();
  }
}

function enviarWhatsApp() {
  const nome = document.getElementById("nomeCliente").value.trim();
  if (!nome || carrinho.length === 0) {
    alert("Preencha o nome e adicione itens.");
    return;
  }
  const mensagem =
    `Pedido de ${nome}:%0A` +
    carrinho.map((i) => `- ${i.nome} (R$ ${i.preco.toFixed(2)})`).join("%0A");
  const telefone = "5581997554441";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

function gerarPDF() {
  html2pdf().from(document.body).save("cardapio.pdf");
}

function gerarQRCode() {
  const url = window.location.href;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: 128,
    height: 128,
  });
}

renderizarCardapio();
gerarQRCode();
