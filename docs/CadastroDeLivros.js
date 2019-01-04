
class CadastroDeLivros {

    constructor() {

        this.livros = [];
         this.livro = {};
        this.contador = 0;
        this.IdMarcado = null;

    }

    lerDados() {
        
        let nome = document.getElementById("nome").value;
        let pagina = document.getElementById("pagina").value;

        this.livro = {};

        this.livro.nome = nome;
        this.livro.pagina = pagina;
        this.livro.lembrete = false;
    }
    salvar() {
        this.lerDados();
        if (this.validar()) {
            if (this.IdMarcado != null) {

                for (let i = 0; i < this.livros.length; i++) {

                    if (this.livros[i].id == this.IdMarcado) {
                        this.livros[i].nome == this.livro.nome;
                        this.livros[i].pagina == this.livro.pagina;
                        this.IdMarcado = null;
                    }
                }
            } else {

                this.livro.id = this.contador;
                this.livros.push(this.livro);
                this.contador++;
            }
            this.criarTabela();
        }
        this.limpar();
    }
    validar() {
        let mensagem = "";
        if (this.livro.nome == "") {
            mensagem += "O nome do livro deve ser preenchido."
        }
        if (this.livro.pagina == "") {
            mensagem += "A quantidade de paginas do livro devem ser preenchidas!!"
        }

        if (mensagem == "") {
            return true;
        }

        alert(mensagem + " ");
        return false;
    }
    limpar() {

        document.getElementById("nome").value = "";
        document.getElementById("pagina").value = "";
    }

    marcar(id) {

        for (let i = 0; i < this.livros.length; i++) {
            if (this.livros[i].id == id) {

                this.IdMarcado = id;

                document.getElementById("nome").value = this.livros[i].nome;
                document.getElementById("pagina").value = this.livros[i].pagina;

                this.livros[i].lembrete = !this.livros[i].lembrete;

            }
        }
        this.criarTabela();
    }


    cadastrarLembrete(id) {

        //o livro lembrado deverá entrar aqui

       let data = prompt("Digite o dia em que quer ser lembrado");
        let hora = prompt("Digite a hora em que quer ser lembrado");

        if (this.IdMarcado != null) {

            for (let i = 0; i < this.livros.length; i++) {
                if (this.livros[i].id == this.IdMarcado) {
                    this.livros[i].nome == this.livro.nome;
                    this.livros[i].pagina == this.livro.pagina;
                    this.IdMarcado = null;
                }
            }

        } else {

            this.livro.id = this.contador;
            this.livros.push(this.livro);
            this.contador++;
        }

        let tabela = document.getElementById("tabela2");
        tabela.innerHTML = "";

        for (let i = 0; i < this.livros.length; i++) {
            let linha = tabela.insertRow();
            let celulaNome = linha.insertCell(0);
            let celulaData = linha.insertCell(1);
            let celulahora = linha.insertCell(2);
            let celulaImgExcluir = linha.insertCell(3);

            celulaNome.innerHTML = this.livros[i].nome;

            celulaData.innerHTML = data;
            celulahora.innerHTML = hora;


            let imagemExcluir = document.createElement("img");

            imagemExcluir.setAttribute("src", "img/delete.svg");
            imagemExcluir.setAttribute("onclick", `biblioteca.excluirLembrete(${this.livros[i].id})`);
            celulaImgExcluir.appendChild(imagemExcluir);
        }

        this.limpar();
    }

    excluirLembrete(id) {


        if (window.confirm("Tem certeza que deseja excluir esse lembrete ?!")) {
            for (let i = 0; i < this.livros.length; i++) {
                if (this.livros[i].id == id) {
                    this.livros.splice(i, 1);
                    this.criarTabela();
                }
            }
        }


    }
    excluir(id) {

        if (window.confirm("Tem certeza que deseja excluir?!")) {
            for (let i = 0; i < this.livros.length; i++) {
                if (this.livros[i].id == id) {
                    this.livros.splice(i, 1);
                    this.criarTabela();
                }
            }
        }
    }
    criarTabela() {

        let tabela = document.getElementById("tabela");
        tabela.innerHTML = "";
        for (let i = 0; i < this.livros.length; i++) {

            let linha = tabela.insertRow();
            let celulaNome = linha.insertCell(0);
            let celulaPagina = linha.insertCell(1);
            let celulaImgMarcar = linha.insertCell(2);
            let celulaImgExcluir = linha.insertCell(3);

            let imagemMarcar = document.createElement("img");
            let imagemExcluir = document.createElement("img");

            if (this.livros[i].lembrete) {
                imagemMarcar.setAttribute("src", "img/checked.svg");
            } else {
                imagemMarcar.setAttribute("src", "img/check.svg");
            }
            imagemMarcar.setAttribute("onclick", `biblioteca.marcar(${this.livros[i].id})`);
            celulaImgMarcar.appendChild(imagemMarcar);

            imagemExcluir.setAttribute("src", "img/delete.svg");
            imagemExcluir.setAttribute("onclick", `biblioteca.excluir(${this.livros[i].id})`);
            celulaImgExcluir.appendChild(imagemExcluir);

            celulaNome.innerHTML = this.livros[i].nome;
            celulaPagina.innerHTML = this.livros[i].pagina;

        }

    }

}

let biblioteca = new CadastroDeLivros();
