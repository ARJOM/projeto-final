//Globais

perguntas = [];

cadastrados = getObjectLocalStorage("cadastrados");
if (cadastrados == null) {
    cadastrados = [];
    setObjectLocalStorage("cadastrados", cadastrados);
} 

//Funções Principais

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var cadastrados = getObjectLocalStorage("cadastrados");

    for (var i = 0; i < cadastrados.length; i++){
        usuario = cadastrados[i];
        if (usuario.email == email){
            if (usuario.senha == senha){
                setObjectLocalStorage("logado", usuario);
                window.alert("Bem vindo "+usuario.nome+"!");
                window.location.href = "index.html";
                return true;
            }
            else {
                window.alert("Senha incorreta");
                return false;
            }
        }
    }
    window.alert("E-mail não cadastrado");
    return false;
}

function cadastro() {
    if (typeof (Storage) !== "undefined") {
        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
        var nascimento = document.getElementById("nascimento").value;
        var radio = document.getElementsByName("genero");
        var genero = getChecked(radio);

        var usuario = new Usuario(nome, undefined, nascimento, genero, undefined, undefined, email, senha);
        cadastrados = getObjectLocalStorage("cadastrados");
        cadastrados.push(usuario);
        setObjectLocalStorage("cadastrados", cadastrados);
        setObjectLocalStorage("logado", usuario);
        window.alert("Bem vindo"+usuario.nome+"!");
        window.location.href = "index.html";
    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function logout(){
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}


function update(){
    return true;
}

function remove(){
    var cadastrados = getObjectLocalStorage("cadastrados");
    var usuario = getObjectLocalStorage("logado");
    var sure = confirm("Você está prestes a excluir essa conta.\nDeseja continuar?");
    if (sure){
        for (var i = 0; i < cadastrados.length; i++){
            var user = cadastrados[i];
            if (isEquivalent(user, usuario)){
                cadastrados.splice(i, 1);
                setObjectLocalStorage("cadastrados", cadastrados);
                localStorage.removeItem("logado");
                window.location.href = "login.html";
                return true;
            }
        }
        window.alert("Usuário logado não consta como cadastrado!!!")
        return false;
    }
}

function valida(){
    if (getObjectLocalStorage("logado") == null){
        window.location.href = "login.html";
    }
}

function redireciona(){
    window.location.href = "cadastro.html";
}

//Classes

function Pergunta(id, pergunta){
    this.id = id;
    this.pergunta = pergunta;
}

function Usuario(nome, foto, nascimento, genero, idadeP, generoP, email, senha){
    this.foto = foto;
    this.nome = nome;
    this.nascimento = nascimento;
    this.genero = genero;

    this.idadeP = idadeP;
    this.generoP = generoP;

    this.email = email;
    this.senha = senha;

    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}

//Funções Auxiliares

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

function getChecked(lista){
    for (var i=0; i < lista.length; i++){
        if (lista[i].checked){
            return lista[i].value;
        }
    }
    return null;
}

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}