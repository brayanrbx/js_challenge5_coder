/**
 * function to get the score
 * @returns {object} this return a object
 */
function getPuntaje() {
    let jogador;
    // cambio a modo ternario
    (localStorage.getItem('jogador') == null) ? jogador = [] : jogador = JSON.parse(localStorage.getItem('jogador'));
    return jogador;
};

/**
 * function to set the score
 * @param {object} jogador object
 * @param {object} jugador object
 */
function setPuntaje(jogador, jugador) {
    jogador.push(jugador)
    localStorage.setItem('jogador', JSON.stringify(jogador));
}

export {getPuntaje, setPuntaje};