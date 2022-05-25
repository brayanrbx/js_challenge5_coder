
//prueba
function getPuntaje() {
    let jogador;
    // cambio a modo ternario
    (localStorage.getItem('jogador') == null) ? jogador = [] : jogador = JSON.parse(localStorage.getItem('jogador'));
    return jogador;
};

function setPuntaje(jogador, jugador) {
    jogador.push(jugador)
    localStorage.setItem('jogador', JSON.stringify(jogador));
}

export {getPuntaje, setPuntaje};