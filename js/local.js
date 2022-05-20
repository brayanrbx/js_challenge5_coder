//prueba
function getPuntaje() {
    let jogador;
    if (localStorage.getItem('jogador') == null) {
        jogador = [];
    }
    else {
        jogador = JSON.parse(localStorage.getItem('jogador'));
    }
    return jogador;
};

function setPuntaje(jogador, jugador) {
    jogador.push(jugador)
    localStorage.setItem('jogador', JSON.stringify(jogador));
}

export {getPuntaje, setPuntaje};