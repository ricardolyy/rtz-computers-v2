

let carrinho = [];

const sidebar     = document.getElementById('carrinhoSidebar');
const overlay     = document.getElementById('carrinhoOverlay');
const btnAbrir    = document.getElementById('btnAbrirCarrinho');
const btnFechar   = document.getElementById('btnFecharCarrinho');
const listaItens  = document.getElementById('carrinhoItens');
const totalEl     = document.getElementById('totalCarrinho');
const contadorEl  = document.getElementById('contadorCarrinho');


btnAbrir.addEventListener('click', () => {
  sidebar.classList.add('aberto');
  overlay.classList.add('ativo');
});

btnFechar.addEventListener('click', fecharCarrinho);
overlay.addEventListener('click', fecharCarrinho);

function fecharCarrinho() {
  sidebar.classList.remove('aberto');
  overlay.classList.remove('ativo');
}



function adicionarCarrinho(nome, preco) {
  const index = carrinho.findIndex(item => item.nome === nome);

  if (index >= 0) {
    carrinho[index].qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }

  renderizarCarrinho();
  mostrarToast(`✅ ${nome} adicionado ao carrinho!`);
}



function removerItem(index) {
  carrinho.splice(index, 1);
  renderizarCarrinho();
}



function alterarQtd(index, delta) {
  carrinho[index].qtd += delta;
  if (carrinho[index].qtd <= 0) {
    carrinho.splice(index, 1);
  }
  renderizarCarrinho();
}



function renderizarCarrinho() {
  listaItens.innerHTML = '';

  if (carrinho.length === 0) {
    listaItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    totalEl.textContent = 'R$ 0,00';
    contadorEl.textContent = '0';
    return;
  }

  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, i) => {
    total += item.preco * item.qtd;
    totalItens += item.qtd;

    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <div class="item-carrinho-info">
        <div class="item-carrinho-nome">${item.nome}</div>
        <div class="item-carrinho-preco">R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="item-carrinho-controles">
        <button class="btn-qtd" onclick="alterarQtd(${i}, -1)">−</button>
        <span class="qtd-texto">${item.qtd}</span>
        <button class="btn-qtd" onclick="alterarQtd(${i}, 1)">+</button>
        <button class="btn-remover" onclick="removerItem(${i})">🗑</button>
      </div>
    `;
    listaItens.appendChild(div);
  });

  totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  contadorEl.textContent = totalItens;
}



function mostrarToast(mensagem) {
  const toastAntigo = document.querySelector('.toast-rtz');
  if (toastAntigo) toastAntigo.remove();

  const toast = document.createElement('div');
  toast.classList.add('toast-rtz');
  toast.textContent = mensagem;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}