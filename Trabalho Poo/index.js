const form = document.querySelector('#formu');
const tabela = document.querySelector('#tableb');
let idx = form.idx.value;

const armazenarLocalStorage = (produtos) => {localStorage.setItem('produtos', JSON.stringify(produtos))}

const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]');

const aP = (e) =>{
    e.preventDefault()
    const camp = form.camp.value;
    const prec = Number(form.prec.value);
    const prim = form.prim.checked;
    
    if(idx == 'novo'){
    const produtos = recuperarLocalStorage();
    produtos.push({id: produtos.length + 0, camp, prec, prim});
    armazenarLocalStorage(produtos);
    tabelaExe();
    form.reset();  
    }else{
        let produtoEd = {id: idx, camp, prec, prim}

        atP(idx, produtoEd);
        tabelaExe();
        form.reset();
        idx = 'novo';
    }
}

const tabelaExe = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){
        tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}></th>
            <td>${produto.camp}</td>
            <td>${produto.prec}</td>
            <td>${produto.prim ? "Sim" : "Não"}</td>
            <td>
                <button onclick="dL(${produto.id})" style = "background-color: blueviolet;
                color: white;">Excluir</button>
                <button onclick="eD(${produto.id})" style = "background-color: blueviolet;
                color: white;">Editar</button>
            </td>
        </tr>    
        `
    }
}

const dL = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduct = produtos.findIndex(produto => produto.id === id)
    if(indexProduct < 0) return;
    produtos.splice(indexProduct, 1);
    armazenarLocalStorage(produtos);
    alert('Produto Apagado')
    tabelaExe();
}

const eD = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    form.camp.value = produtos[indexProduto].camp;
    form.prec.value = produtos[indexProduto].prec;
    form.prim.checked = produtos[indexProduto].prim;
    idx = id;
}

const atP = (id, produtoEd) => {
    const produtos = recuperarLocalStorage();
    const indexProdutos = produtos.findIndex((produtoEd) => produtoEd.id === id);
    produtos[indexProdutos] = produtoEd;
    armazenarLocalStorage(produtos);
}

form.addEventListener('submit', aP);
document.addEventListener('DOMContentLoaded', tabelaExe);