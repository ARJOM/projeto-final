function calculaModulo(lista){
    var soma = 0;
    for (var i =0; i<lista.length; i++){
        item = lista[i];
        soma += item*item;
    }
    return soma;
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