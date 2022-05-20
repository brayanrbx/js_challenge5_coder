import {main, enemyStats} from './index.js';

const teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

function downHandler(e) {
    let movimiento = 4;
    switch (e.keyCode) {
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

function upHandler(e) {
    switch (e.keyCode) {
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