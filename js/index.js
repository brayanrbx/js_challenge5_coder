import {character} from './character.js';
import {enemies} from './enemies.js';
import {hitTestRectangle} from './collision.js';
import {downHandler, upHandler} from './keyboard.js';

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

const enemyStats = {
    respawn: 100,
    speed: 1,
};
const enemy = []
const main = character(width, height);

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
    if (main.x < 20) {
        main.x = 20;
    }
    if (main.x > (width - 80)) {
        main.x = 920;;
    }
    for (let i = 0; i < cont; i++) {
        if (hitTestRectangle(enemy[i], main)) {
            console.log("colision");
            game.stop();
        }
    }
};

setup();

export {main, enemyStats};





