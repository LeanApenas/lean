let carrinho = [];
let total = 0;

const imagensDosItens = {
  "Pizza 20cm": "https://i.pinimg.com/736x/43/9b/b3/439bb3c30302c369784a5df05cd85d70.jpg",
  "Pizza 25cm": "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
  "Coca Cola": "https://andinacocacola.vtexassets.com/arquivos/ids/158894-1600-auto?v=638828463792970000&width=1600&height=auto&aspect=true",
  "Fanta Uva": "https://savegnagoio.vtexassets.com/arquivos/ids/448430-1200-auto?v=638525879874400000&width=1200&height=auto&aspect=true",
  "Guaraná": "https://cdn.discordapp.com/attachments/754358957476151376/1386480871049265282/guarana.jpg?ex=6859dc6f&is=68588aef&hm=8daed5a53f6322f08585e50f8409103018f8c794c0fea7b7d246ea6559579c2b&",
  "Batata Pequena": "https://cdn.discordapp.com/attachments/754358957476151376/1386481439226335353/120cf585d530a3cabd96226bfe18aca3.jpg?ex=6859dcf6&is=68588b76&hm=e4e20f596d67118893efface0832382a76ce41de500ab593c68b30d2f7351302&",
  "Batata Grande": "https://cdn.discordapp.com/attachments/754358957476151376/1386481439226335353/120cf585d530a3cabd96226bfe18aca3.jpg?ex=6859dcf6&is=68588b76&hm=e4e20f596d67118893efface0832382a76ce41de500ab593c68b30d2f7351302&",
  "X-Salada": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
};

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  atualizarCarrinhoTopo();
  atualizarValorCarrinhoTopo();
}

function atualizarCarrinhoTopo() {
  document.getElementById('quantidade-carrinho').textContent = carrinho.length;
}

function atualizarValorCarrinhoTopo() {
  document.getElementById('valor-carrinho').textContent = total.toFixed(2).replace('.', ',');
}

function abrirCarrinho() {
  atualizarCarrinhoModal();
  document.getElementById('modal-carrinho').style.display = 'flex';
}

document.getElementById('btn-voltar').onclick = function () {
  document.getElementById('modal-carrinho').style.display = 'none';
};

function atualizarCarrinhoModal() {
  const lista = document.getElementById('lista-carrinho-modal');
  lista.innerHTML = '';

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = imagensDosItens[item.nome] || '';
    img.alt = item.nome;

    const spanTexto = document.createElement('span');
    spanTexto.textContent = `${item.nome} - R$${item.preco.toFixed(2).replace('.', ',')}`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.marginLeft = '10px';
    btnRemover.onclick = () => {
      removerItem(index);
      atualizarCarrinhoModal();
      atualizarCarrinhoTopo();
      atualizarValorCarrinhoTopo();
    };

    li.appendChild(img);
    li.appendChild(spanTexto);
    li.appendChild(btnRemover);

    lista.appendChild(li);
  });

  document.getElementById('total-modal').textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  let mensagem = 'Olá! Gostaria de pedir:%0A';
  carrinho.forEach((item) => {
    mensagem += `- ${item.nome} R$${item.preco.toFixed(2).replace('.', ',')}%0A`;
  });
  mensagem += `Total: R$${total.toFixed(2).replace('.', ',')}`;

  const telefone = '5521965843023'; // Coloque seu número com DDI
  const url = `https://wa.me/${telefone}?text=${mensagem}`;
  window.open(url, '_blank');
}
