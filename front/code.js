  let precoTotal = 0;
  let precoRecheio = 0;
  let produtosSelecionados = [];
  let recheiosSelecionados = [];
  let produtos = document.querySelectorAll('.product'); 

  let produtoSelecionado = document.querySelector('.product:checked'); 
  let id = produtoSelecionado ? produtoSelecionado.dataset.id : null; 
  
  async function carregarPrecos() {
    let produtoSelecionado = document.querySelector('.product:checked');
    let id = produtoSelecionado ? produtoSelecionado.dataset.id : null;
  
    if (!id) {
      console.error('Nenhum produto selecionado!');
      return;
    }
  
    try {
      const resposta = await fetch(`http://localhost:8080/food?id=${id}`);
      
      if (!resposta.ok) {
        throw new Error("Erro ao carregar preços");
      }
      
      const dados = await resposta.json();
      console.log('Preços carregados:', dados);
    } catch (erro) {
      console.error('Erro ao carregar preços:', erro);
    }
  }
  
  carregarPrecos();
  
  produtos.forEach((produto) => {
    produto.addEventListener('change', selecionarProduto);
  });

  function selecionarProduto() {
    let produtos = document.querySelectorAll('.product');
    precoTotal = 0;
    produtosSelecionados = [];
  
    produtos.forEach((produto) => {
      if (produto.checked) {
        const preco = parseFloat(produto.value || 0);
        const idfood = produto.dataset.id ? parseInt(produto.dataset.id) : null;
  
        console.log("ID do produto:", idfood); 
        console.log("Preço do produto:", preco);
  
        if (idfood) {
          precoTotal += preco;
          produtosSelecionados.push({ idfood, preco });
        } else {
          console.error("Erro: ID do produto inválido ou não encontrado.");
        }
      }
    });
  
    atualizarPreco();
  }
  

  function atualizarPreco() {
    let recheios = document.querySelectorAll('.filing');
    precoRecheio = 0;
    recheiosSelecionados = [];
    let descricaoRecheios = []; 

    recheios.forEach((recheio) => {
        if (recheio.checked) {
            const preco = parseFloat(recheio.value || 0);
            const nomeRecheio = recheio.parentElement.textContent.trim(); 
            precoRecheio += preco;
            recheiosSelecionados.push(recheio);
            descricaoRecheios.push(nomeRecheio); 
        }
    });

    const precoFinal = precoTotal + precoRecheio;
    document.getElementById('precoTotal').textContent = precoFinal.toFixed(2);

    
    const adicionaisContainer = document.getElementById('adicionais');
    if (descricaoRecheios.length > 0) {
        adicionaisContainer.innerHTML = 'Adicionais:<br>' + descricaoRecheios.join(',<br>');
    } else {
        adicionaisContainer.textContent = 'Sem adicionais';
    }
}


  function validarCpf(cpf) {
    return cpf.length === 11 && !isNaN(cpf);
  }
  
  async function processarPagamento() {
    const cpf = document.getElementById("cpf").value.trim();
    const produtos = produtosSelecionados.map(produto => produto.idfood);  
    const price = parseFloat(document.getElementById("precoTotal").textContent || 0);
  
    
    const filings = [];
    const recheios = document.querySelectorAll('.filing:checked');
    recheios.forEach(recheio => {
      filings.push({
        name: recheio.parentElement.textContent.trim().split(" (")[0]  
      });
    });
  
    await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cpf: cpf,
            idfood: produtos[0],  
            filings: filings,  
            price: price
        })
    })
    .then(response => response.text())
    .then(data => {
        alert("Pagamento processado: " + data);
    })
    .catch(error => {
        console.error("Erro ao processar pagamento:", error);
        alert("Erro ao processar pagamento");
    });
  }
  
document.addEventListener("DOMContentLoaded", () => {
  const historicoBtn = document.getElementById("historicoBtn");
  const modal = document.getElementById("modal");
  const fecharModal = document.getElementById("fecharModal");
  const historicoDetalhes = document.getElementById("historicoDetalhes");

 
  fecharModal.onclick = () => {
      modal.style.display = "none";
  };

  window.onclick = (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  };

 
  historicoBtn.onclick = () => {
    const cpf = document.getElementById("cpf").value;

    fetch(`http://localhost:8080/history?cpf=${cpf}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar o histórico");
            }
            return response.json();
        })
        .then((data) => {
            historicoDetalhes.innerHTML = "";

            if (data.length === 0) {
                historicoDetalhes.innerHTML = "<p>Nenhuma compra encontrada.</p>";
            } else {
                let historicoHTML = "<ul>";
                data.forEach((compra) => {
                    
                    const dataCompra = compra.date ? compra.date : "Data não disponível";
                    const valorCompra = compra.total ? compra.total : "Valor não disponível";
                    const descricaoCompra = compra.description ? compra.description : "Descrição não disponível";

                    historicoHTML += `<li>Data: ${dataCompra}</li><br> <li>Valor: R$ ${valorCompra}</li><br> <li>Descrição: ${descricaoCompra}</li><br>`;
                });
                historicoHTML += "</ul>";
                historicoDetalhes.innerHTML = historicoHTML;
            }
            
            modal.style.display = "flex";
        })
        .catch((error) => {
            historicoDetalhes.innerHTML = `<p style="color:red;">Erro ao carregar histórico: ${error.message}</p>`;
            modal.style.display = "flex";
        });
};

  
});