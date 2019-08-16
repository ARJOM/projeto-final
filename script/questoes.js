function Pergunta(id, pergunta){
    this.id = id;
    this.pergunta = pergunta;
}

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







//Funções Auxiliares
function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

