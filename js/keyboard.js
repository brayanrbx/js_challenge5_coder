import {main, enemyStats} from './index.js';

// objeto que contiene el keyCode de las teclas flecha
const teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

/**
 * función para cuando se presiona una tecla
 * @param {event} e evento que se dispara cuando se presiona una tecla
 */
function downHandler(e) {
    let movimiento = 4;
    switch (e.keyCode) {
        // al presionar o mantener presionada la tecla down se aumenta la velocidad de caída del enemigo
        case teclas.DOWN:
            enemyStats.speed += 10;
            enemyStats.respawn = 10;
            break;
        case teclas.LEFT:
            main.vx = -movimiento;
        break;
        case teclas.RIGHT:
            main.vx = movimiento;
        break;
    }
};

/**
 * función para cuando se suelta una tecla
 * @param {event} e evento que se dispara cuando se suelta una tecla
 */
function upHandler(e) {
    switch (e.keyCode) {
        // al soltar la tecla down la velocidad de caída del enemigo regresa a su valor por default
        case teclas.DOWN:
            enemyStats.speed = 1;
            enemyStats.respawn = 100;
            break;
        case teclas.LEFT:
            main.vx = 0;
            main.vy = 0;
        break;
        case teclas.RIGHT:
            main.vx = 0;
            main.vy = 0;
        break;
    }
};

window.addEventListener("keydown", downHandler, false);

window.addEventListener("keyup", upHandler, false);

export {downHandler, upHandler};