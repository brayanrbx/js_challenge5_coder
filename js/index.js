import {character} from './character.js';
import {enemies} from './enemies.js';
import {hitTestRectangle} from './collision.js';
import {downHandler, upHandler} from './keyboard.js';
import {getPuntaje, setPuntaje} from './local.js'; // prueba

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

let width = 1000;
let height = window.innerHeight;
app.renderer.resize(width, height);
app.renderer.backgroundColor = 0x061639;

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.getElementById("game").appendChild(app.view);

let contador = 0;
let cont = 0;
const enemy = []

const enemyStats = {
    respawn: 100,
    speed: 1,
};

// test de prueba
const jugador = {
    name: "jugador 1",
    puntaje: 0,
}

const main = character(width, height);

const $game = document.getElementById("game");
const $h1 = document.createElement('h1');
$h1.classList.add('game-over', 'game-over--hidden');
$h1.textContent = "Game Over";
$game.appendChild($h1);

function setup() {
    app.stage.addChild(main);
    app.ticker.add((delta) => gameLoop(delta));
    downHandler();
    upHandler();
};

function gameLoop(delta) {
    contador++;
    if (contador % enemyStats.respawn == 0) {
        app.stage.addChild(enemies(enemy, cont));
        jugador.puntaje += 1; // prueba
        cont++;
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].vy = enemy[i].vy + enemyStats.speed;
        enemy[i].y = enemy[i].vy
    }
    state(delta);
};

function state(delta) {
    main.x += main.vx;

    // controlar que el personaje no se salga de la pantalla
    if (main.x < 20) {
        main.x = 20;
    }
    if (main.x > (width - 70)) {
        main.x = (width - 70);
    }

    // saber si el personaje colisiona con otro y si se hace se genera un mensaje de game over, también se guarda el puntaje en localStorage
    for (let i = 0; i < cont; i++) {
        if (hitTestRectangle(enemy[i], main)) {
            console.log("colision");
            $h1.classList.remove('game-over--hidden');
            $h1.classList.add('game-over--active');
            const jogador = getPuntaje(jugador); // prueba
            setPuntaje(jogador, jugador); // prueba
            app.stop();
        }
    }
};

setup();

export {main, enemyStats};








