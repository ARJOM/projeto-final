//Match

function recebe(){
    var usuario = getObjectLocalStorage("logado");
    var perguntas = getObjectLocalStorage("perguntas");
    console.log(usuario.nome);
    var respostas = [];
    for (var i = 0; i<perguntas.length; i++){
        var pergunta = perguntas[i].pergunta;
        var radio = document.getElementsByName(pergunta);
        var valor = getChecked(radio);
        console.log(valor);
        respostas.push(valor);
        console.log(respostas);
    }
    usuario.lista = respostas;
    var cadastrados = getObjectLocalStorage("cadastrados");
    var indice = buscaIndice(usuario.email);
    cadastrados[indice] = usuario;
    setObjectLocalStorage("logado", usuario);
    setObjectLocalStorage("cadastrados", cadastrados);
}

function calculaMatch(){
    var usuario = getObjectLocalStorage("logado");
    var cadastrados = getObjectLocalStorage("cadastrados");
    var resultado = [];
    var minimo = usuario.idadeP[0];
    var maximo = usuario.idadeP[1];
    var generop = usuario.generoP;
    for (var i=0; i<cadastrados.length; i++){
        var user = cadastrados[i];
        var idade = user.idade;
        if (usuario.email != user.email && idade >= minimo && idade <= maximo){  
            var cosseno = calculaCosseno(user.lista, usuario.lista);
            var match = new Match(user.email, cosseno);
            if (generop == "a"){
                resultado.push(match);
            } else if (generop == user.genero){
                resultado.push(match);
            }
        }
    }
    resultadof = insertion_Sort(resultado);
    usuario.match = resultadof;
    var indice = buscaIndice(usuario.email);
    cadastrados[indice] = usuario;
    setObjectLocalStorage("logado", usuario);
    setObjectLocalStorage("cadastrados", cadastrados);
}

function exibeMatch(){
    calculaMatch();
    var paragrafo = document.getElementById("lista");
    var usuario = getObjectLocalStorage("logado");
    var resultado = "<table><tr><th>#</th><th>Nome</th><th>Compatibilidade</th></tr>";
    var matchs = usuario.match;

    for (var i = 0; i<matchs.length; i++){
        var match = matchs[i];
        var user =  buscaUsuario(match.email);
        var porcentagem = (match.coeficiente*100).toFixed(2);
        resultado += "<tr><td>"+(i+1)+"</td><td>"+user.nome+"</td><td> "+porcentagem+"%</td></tr>";
    }
    resultado += "</table>";
    //TODO deixar funcionando
    //https://www.devmedia.com.br/introducao-a-google-maps-api/26967
    paragrafo.innerHTML = resultado;
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);
}

//Funções de calculo

function calculaModulo(lista){
    var soma = 0;
    for (var i = 0; i<lista.length; i++){
        item = lista[i];
        soma += item*item;
    }
    return Math.sqrt(soma);
}

function calculaProduto(lista1, lista2){
    var soma = 0;
    for (var i = 0; i<lista1.length; i++){
        soma += (lista1[i]*lista2[i]);
    }
    return soma;
}

function calculaCosseno(lista1, lista2){
    var produto = calculaProduto(lista1, lista2);
    var modulo1 = calculaModulo(lista1);
    var modulo2 = calculaModulo(lista2);
    cosseno = produto/(modulo1*modulo2);
    return cosseno;
}

//Classes

function Match(email, coeficiente){
    this.email = email;
    this.coeficiente = coeficiente;
}