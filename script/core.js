//Globais

cadastrados = getObjectLocalStorage("cadastrados");
if (cadastrados == null) {
    cadastrados = [];
    setObjectLocalStorage("cadastrados", cadastrados);
} 

//Usuário

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var cadastrados = getObjectLocalStorage("cadastrados");

    for (var i = 0; i < cadastrados.length; i++){
        usuario = cadastrados[i];
        if (usuario.email == email){
            if (usuario.senha == senha){
                setObjectLocalStorage("logado", usuario);
                if (usuario.genero == "f"){
                    window.alert("Bem vinda "+usuario.nome+"!");
                }
                else {
                    window.alert("Bem vindo "+usuario.nome+"!");
                }
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
        console.log(nascimento);
        var radio = document.getElementsByName("genero");
        var genero = getChecked(radio);

        var usuario = new Usuario(nome, null, nascimento, genero, null, null, email, senha);
        cadastrados = getObjectLocalStorage("cadastrados");
        cadastrados.push(usuario);
        setObjectLocalStorage("cadastrados", cadastrados);
        setObjectLocalStorage("logado", usuario);
        window.alert("Bem vindo "+usuario.nome+"!");
        //window.location.href = "update.html";
        //window.location.href = "index.html";
        window.location.href = "busca.html";
    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function logout(){
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}

function preenche(){
    var usuario = getObjectLocalStorage("logado");
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("nascimento").value = usuario.nascimento;
}

function update(){
    var cadastrados = getObjectLocalStorage("cadastrados");
    var usuario = getObjectLocalStorage("logado");
    var indice = buscaIndice(usuario.email);
    var senha = document.getElementById("oldsenha").value; 
    if (senha == usuario.senha){
        usuario.senha = document.getElementById("newsenha").value;
    }

}

function busca(){
    valida();
    var cadastrados = getObjectLocalStorage("cadastrados");
    var usuario = getObjectLocalStorage("logado");
    var radio = document.getElementsByName("genero");
    var genero = getChecked(radio);
    var minimo = document.getElementById("minimo").value;
    minimo = parseInt(minimo);
    var maximo = document.getElementById("maximo").value;
    maximo = parseInt(maximo);
    var idade = [minimo, maximo];
    console.log(idade);
    usuario.idadeP = idade;
    usuario.generoP = genero;
    var indice = buscaIndice(usuario.email);
    cadastrados[indice] = usuario;
    setObjectLocalStorage("cadastrados", cadastrados);
    setObjectLocalStorage("logado", usuario);
    window.location.href = "index.html";
}

function remove(){
    var cadastrados = getObjectLocalStorage("cadastrados");
    var usuario = getObjectLocalStorage("logado");
    var sure = confirm("Você está prestes a excluir essa conta.\nDeseja continuar?");
    if (sure){
        for (var i = 0; i < cadastrados.length; i++){
            var user = cadastrados[i];
            if (user.email == usuario.email){
                cadastrados.splice(i, 1);
                setObjectLocalStorage("cadastrados", cadastrados);
                localStorage.removeItem("logado");
                window.location.href = "login.html";
                return true;
            }
        }
        window.alert("Usuário logado não consta como cadastrado!!!");
        return false;
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
    };
}

//Funções Auxiliares

function buscaUsuario(email){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i=0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return usuario;
        }
    }
    return null;  
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