//Inicio temporario

var perguntas = [];

var musicas = ["Axé", "Blues", "Bossa Nova", "Clássica", "Eletrônica", "Forró", "Funk", "Gospel", "Indie", "Infantil", "K-Pop", "MPB", "Pagode", "Pop", "Rap", "Reggae", "Rock", "Sertanejo"];
var filmes = ["Ação", "Aventura", "Cinema de arte", "Chanchada", "Cinema catástrofe", "Comédia", "Comédia romântica", "Comédia dramática", "Comédia de ação", "Dança", "Documentário", "Docuficção", "Drama", "Espionagem", "Faoreste", "Fantasia científica", "Ficcção científica", "Filmes de guerra", "Musical", "Filme policial", "Romance", "Seriado", "Suspense", "Terror"];
var comidas = ["Feijoada", "Pizza", "Lasanha", "Pão de Queijo", "Carne de Sol", "Acarajé", "Tapioca", "Churrasco", "Pudim de Leite", "Açai", "Brigadeiro", "Cocada"];
//Musica
for (var i=0; i<musicas.length; i++){
    var pergunta = new Pergunta(perguntas.length, "musicas",  musicas[i]);
    perguntas.push(pergunta);
}

//Filmes
for (var i=0; i<filmes.length; i++){
    var pergunta = new Pergunta(perguntas.length, "filmes", filmes[i]);
    perguntas.push(pergunta);
}

//Comida
for (var i=0; i<comidas.length; i++){
    var pergunta = new Pergunta(perguntas.length, "comidas", comidas[i]);
    perguntas.push(pergunta);
}

setObjectLocalStorage("perguntas", perguntas);

//Funções
function preenche(){
    perguntas = getObjectLocalStorage("perguntas");
    var meuParagrafo = document.getElementById("questionario");
    var resultado = "<br/><br/>";


    var musicas = buscaCategorias("musicas");
    resultado += "<h2>Musica:</h2>"+render(musicas);
    var comidas = buscaCategorias("comidas");
    resultado += "<h2>Comidas:</h2>"+render(comidas);
    var generos = buscaCategorias("filmes");
    resultado += "<h2>Filmes:</h2>"+render(generos);

    meuParagrafo.innerHTML = resultado;
    check();
}


function check(){

}

function render(lista){
    var resultado = "";
    for (var i=0; i<lista.length; i++){
        var questao = lista[i];
        resultado += "<div class='campus'>";
        resultado += "<h4>"+questao.pergunta+"</h4>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='0'/><label>Não sou capaz de opinar</label>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='1'/><label for='um'>Odeio</label>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='2'/><label for='um'>Não gosto</label>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='3'/><label for='um'>Indiferente</label>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='4'/><label for='um'>Gosto</label>";
        resultado += "<input type='radio' name='"+questao.pergunta+"' value='5'/><label for='um'>Amo</label>";
        resultado+="</div>";
    }
    resultado+="<br/>";
    return resultado;
}

//Classes
function Pergunta(id, categoria, pergunta){
    this.id = id;
    this.categoria = categoria;
    this.pergunta = pergunta;
}

//Funções auxiliares
function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

function buscaCategorias(categoria){
    var resultado = [];
    for (var i = 0; i<perguntas.length; i++){
        var pergunta = perguntas[i];
        if (pergunta.categoria == categoria){
            resultado.push(pergunta);
        }
    }
    return resultado;
}