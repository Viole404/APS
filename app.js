import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

// Disciplina: DESENVOLVIMENTO DE APLICAÇÕES MÓVEIS
// Nome: Victor Stefano Araujo Bujnowski
// Matricula: 2019101330
// Turma: 123-94565

function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Preço: R${produto.preco.toFixed(2)}</p>
      {}
      {produto.promocao && <span className="promocao">Promoção!</span>}
      <button className="comprar" onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
    </div>
  );
}

function Carrinho({ carrinho, editarQuantidade, removerDoCarrinho }) {
  const [editarIndex, setEditarIndex] = useState(null); // Estado para controlar qual item está em modo de edição

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  const iniciarEdicao = (index) => {
    setEditarIndex(index); // Define o índice do item que está sendo editado
  };

  const cancelarEdicao = () => {
    setEditarIndex(null); // Cancela a edição
  };

  return (
    <div className="carrinho">
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item, index) => (
            <div key={index} className="item-carrinho">
              <p>{item.nome} - R${item.preco.toFixed(2)} x {item.quantidade}</p>
              {editarIndex === index ? ( // Verifica se o item está em modo de edição
                <>
                  <input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    onChange={(e) => editarQuantidade(index, e.target.value)}
                  />
                  <button className="editar" onClick={cancelarEdicao}>Salvar</button>
                </>
              ) : (
                <>
                  <button className="editar" onClick={() => iniciarEdicao(index)}>Editar</button>
                  <button className="remover" onClick={() => removerDoCarrinho(index)}>Remover</button>
                </>
              )}
            </div>
          ))}
          <h3>Total: R${calcularTotal()}</h3>
        </>
      )}
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Feijão",
      preco: 5.99,
      imagem: "https://zonasul.vtexassets.com/arquivos/ids/3039315/VF4qT-qqCUAAAAAAAAF36g.jpg?v=637792475524870000",
      promocao: false,
    },
    {
      nome: "Coca Cola",
      preco: 8.99,
      imagem: "https://th.bing.com/th/id/OIP.ZcRaI8KBfCV3Bl2uk0BnrAHaHa?rs=1&pid=ImgDetMain",
      promocao: false,
    },
    {
      nome: "Rexona",
      preco: 14.49,
      imagem: "https://th.bing.com/th/id/OIP.Lp9-J9e5-x45haa-F5odCwHaHa?rs=1&pid=ImgDetMain",
      promocao: false,
    },
    {
      nome: "Red Label",
      preco: 99.49,
      imagem:
      "https://th.bing.com/th/id/OIP.S1PdG8McZ51FRRJvTt2zCgHaKf?rs=1&pid=ImgDetMain",
      promocao: false,
    },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const itemExistente = prevCarrinho.find(item => item.nome === produto.nome);
      if (itemExistente) {
        return prevCarrinho.map(item => 
          item.nome === produto.nome 
            ? { ...item, quantidade: item.quantidade + 1 } 
            : item
        );
      }
      return [...prevCarrinho, { ...produto, quantidade: 1 }];
    });
  };

  const editarQuantidade = (index, novaQuantidade) => {
    const quantidade = parseInt(novaQuantidade, 10);
    if (quantidade > 0) {
      setCarrinho(prevCarrinho => 
        prevCarrinho.map((item, i) => 
          i === index ? { ...item, quantidade } : item
        )
      );
    }
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="app">
      <div className="produtos">
        {produtos.map((produto, index) => (
          <Produto key={index} produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} />
        ))}
      </div>
      <Carrinho carrinho={carrinho} editarQuantidade={editarQuantidade} removerDoCarrinho={removerDoCarrinho} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
