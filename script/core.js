perguntas = [];


function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var cadastrados = getObjectLocalStorage("cadastrados");

    for (var i = 0; i < cadastrados.length; i++){
        usuario = cadastrados[i];
        if (usuario.email == email){
            if (usuario.senha == senha){
                setObjectLocalStorage("logado", usuario)
                return true;
            }
            else {
                window.alert("Senha incorreta");
                return false;
            }
        }
    }
    window.alert("E-mail não cadastrado");
}

function cadastro() {
    if (typeof (Storage) !== "undefined") {
        var email = document.getElementById("e-mail").value;
        var senha = document.getElementById("senha").value;

        var usuario = new Usuario(email, senha);
        cadastrados = getObjectLocalStorage("cadastrados");
        cadastrados.push(usuario);

        setObjectLocalStorage("cadastrados", cadastrados);

    } else {
        window.alert("API Web Storage não encontrada");
    }
}




//Classes

function Pergunta(id, pergunta){
    this.id = id;
    this.pergunta = pergunta;
}

function Usuario(nome, foto, nascimento, genero, idadeP, generoP, email, senha, tipo){
    this.foto = foto;
    this.nome = nome;
    this.nascimento = nascimento;
    this.genero = genero;

    this.idadeP = idadeP;
    this.generoP = generoP;

    this.email = email;
    this.senha = senha;

    this.tipo = tipo;
    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}

//Funções de escrita e leitura

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}