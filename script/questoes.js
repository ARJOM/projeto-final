//Inicio temporario

var perguntas = [];

var musicas = ["Axé", "Blues", "Bossa Nova", "Clássica", "Eletrônica", "Forró", "Funk", "Gospel", "Indie", "Infantil", "K-Pop", "MPB", "Pagode", "Pop", "Rap", "Reggae", "Rock", "Sertanejo"];
var filmes = ["Ação", "Aventura", "Cinema de arte", "Chanchada", "Cinema catástrofe", "Comédia", "Comédia romântica", "Comédia dramática", "Comédia de ação", "Dança", "Documentário", "Docuficção", "Drama", "Espionagem", "Faoreste", "Fantasia científica", "Ficcção científica", "Filmes de guerra", "Musical", "Filme policial", "Romance", "Seriado", "Suspense", "Terror"];
var comidas = ["Feijoada", "Pizza", "Lasanha", "Pão de Queijo", "Carne de Sol", "Acarajé", "Tapioca", "Churrasco", "Pudim de Leite", "Açai", "Brigadeiro", "Cocada"];
//Musica
for (var i=0; i<musicas.length; i++){
    var pergunta = new Pergunta(perguntas.length, musicas[i]);
    perguntas.push(pergunta);
}

//Filmes
for (var i=0; i<filmes.length; i++){
    var pergunta = new Pergunta(perguntas.length, filmes[i]);
    perguntas.push(pergunta);
}

//Comida
for (var i=0; i<comidas.length; i++){
    var pergunta = new Pergunta(perguntas.length, comidas[i]);
    perguntas.push(pergunta);
}
setObjectLocalStorage("perguntas", perguntas);

//Funções

//function preenche(){
//    perguntas = getObjectLocalStorage("perguntas");
//    var meuParagrafo = document.getElementById("questionario")
//    var resultado = "<form>"
//    resultado += "<br/><br/>"
    
//   for (var i=0; i<perguntas.length; i++){
//        var numero = parseInt(i)+1;
//        var questao = perguntas[i];
//        resultado += "<div>";
//       resultado += "<label for='questao\"+numero+\"'>Questão "+numero+":"+questao.pergunta+" </label></br>"
//        resultado += "<button value='0'>Não sou capaz de opinar</button><button value='1'>Odeio</button><button value='2'>Não Gosto</button><button value='3'>Indiferente</button><button value='4'>Gosto</button><button value='5'>Amo</button>"
//        resultado+="</div>"
//    }
//    resultado += "<input type='submit' value='Enviar'>"
//    resultado+="</form>";
//    meuParagrafo.innerHTML = resultado;
//}

//Classes
function Pergunta(id, pergunta){
    this.id = id;
    this.pergunta = pergunta;
}


//Funções Auxiliares
function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

