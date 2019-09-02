//Globais
var _BANCO = firebase.firestore();
console.log(_BANCO);

//Usuário

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var user = buscaUsuario(email);

    if (user==null){
        window.alert("E-mail não cadastrado");
        return false;
    }
    if (user.senha==senha){
        setObjectLocalStorage("logado", user);
        if (user.genero == "f"){
            window.alert("Bem vinda "+user.nome+"!");
        }
        else {
            window.alert("Bem vindo "+user.nome+"!");
        }
        window.location.href = "index.html";
        return true;
    } else {
        window.alert("Senha incorreta");
        return false;
    }
}

function cadastro() {
    var foto = document.getElementById("avatar").value;
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var nascimento = document.getElementById("nascimento").value;
    var radio = document.getElementsByName("genero");
    var genero = getChecked(radio);
    var min = parseInt(document.getElementById("minimo"));
    var max = parseInt(document.getElementById("maximo"));
    var idadeP = [min, max];
    idadeP = insertion_Sort(idadeP);
    var radioP = document.getElementsByName("generoP");
    var generoP = getChecked(radioP);
    
    if (buscaUsuario(email)==null){
        var usuario = new Usuario(nome, foto, nascimento, genero, idadeP, generoP, email, senha);
        user = converteObjetoToJson(usuario);

        // Add a new document in collection "usuarios"
        _BANCO.collection("usuarios").doc(email).set({
            user: user
        })
        .then(function() {
            window.alert("Cadastrado com sucesso");
        })
        .catch(function(error) {
            window.alert("Algo deu errado na criação do seu cadastro");
        });
    } else{
        window.alert("E-mail já cadastrado!")
    }
}

//

function logout(){
    localStorage.removeItem("logado");
    valida();
}

function preenche(){
    valida();
    var usuario = getObjectLocalStorage("logado");
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("nascimento").value = usuario.nascimento;
}

function update(){
    var usuario = getObjectLocalStorage("logado");
    var indice = buscaIndice(usuario.email);
    var senha = document.getElementById("oldsenha").value; 
    if (senha == usuario.senha){
        usuario.senha = document.getElementById("newsenha").value;
    }

}

function remove(){
    var usuario = getObjectLocalStorage("logado");
    var sure = confirm("Você está prestes a excluir essa conta.\nDeseja continuar?");
    if (sure){
        _BANCO.collection("usuarios").delete(usuario.email).then(function(){
            window.alert("Conta deletada com sucesso!");
            valida();
        })
        .catch(function(error) {
            window.alert("Usuário logado não consta como cadastrado!!!")
        });
    }
}

function valida(){
    if (getObjectLocalStorage("logado") == null){
        window.location.href = "login.html";
    }
}

//Classes

function Usuario(nome, foto, nascimento, genero, idadeP, generoP, email, senha){
    this.foto = foto;
    this.nome = nome;
    this.nascimento = nascimento;
    this.genero = genero;
    this.idade = calculaIdade(nascimento);

    this.idadeP = idadeP;
    this.generoP = generoP;

    this.email = email;
    this.senha = senha;

    this.lista = [];
    this.match = [];

    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}

//Funções Auxiliares
//TODO concertar erro na função de busca
function buscaUsuario(email){
    var usuario;
    _BANCO.collection("usuarios").get(email)
    .then((user) => {
        usuario = converteJsonToObjeto(user);
    })
    .catch(usuario = null);
    return usuario;
}

function buscaIndice(email){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i=0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return i;
        }
    }
    return null;  
}

function calculaIdade(nascimento){
    var data = new Date();
    var nasc = new Date(nascimento);
    var dia = data.getDate();
    var diaN = nasc.getDate();
    var mes = data.getMonth();
    var mesN = nasc.getMonth();
    var ano = data.getFullYear();
    var anoN = nasc.getFullYear();
    if (ano >= anoN){
        if (mes > mesN){
            return ano-anoN;
        }
        else if (mes < mesN){
            return ano-anoN-1;
        }
        else{
            if (dia >= diaN){
                return ano-anoN;
            }
            else {
                return ano-anoN-1;
            }
        }
    }
    else {
        return null;
    }
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

function converteJsonToObjeto(value){
    return JSON.parse(value);
}

function converteObjetoToJson(value){
    return JSON.stringify(value);
}


//Funções auxiliares externas

function insertion_Sort(arr){
  for (var i = 1; i < arr.length; i++) 
  {
    if (arr[i].coeficiente > arr[0].coeficiente) 
    {
      //move current element to the first position
      arr.unshift(arr.splice(i,1)[0]);
    } 
    else if (arr[i].coeficiente < arr[i-1].coeficiente) 
    {
      //leave current element where it is
      continue;
    } 
    else {
      //find where element should go
      for (var j = 1; j < i; j++) {
        if (arr[i].coeficiente < arr[j-1].coeficiente && arr[i].coeficiente > arr[j].coeficiente){
          //move element
          arr.splice(j,0,arr.splice(i,1)[0]);
        }
      }
    }
  }
  return arr;
}

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