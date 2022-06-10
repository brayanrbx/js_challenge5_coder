import {character} from './character.js';
import {enemies} from './enemies.js';
import {hitTestRectangle} from './collision.js';
import {downHandler, upHandler} from './keyboard.js';
import {getPuntaje, setPuntaje} from './local.js'; // prueba

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
const loader = PIXI.Loader.shared;
const container = PIXI.Container;

// variables of canvas
let width = window.innerWidth;
let height = window.innerHeight;
let content = new container();
app.renderer.resize(width, height);
app.renderer.backgroundColor = 0x061639;

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.getElementById("game").appendChild(app.view);

// background and sound game
loader.add('background', 'assets/img/19333449.jpg');
loader.add('rally', 'assets/sound/rally-x.mp3');
loader.add('game_over', 'assets/sound/game-over.mp3');
loader.load(config);

// variable that storage the background
let backSprite;

// variable that storage the sound
let soundRally;
let soundGameOver;

// const name = await playerName();
const name = await playerName();

const enemyStats = {
    respawn: 30,
    speed: 1,
    speedDefault: 1,
    passCar: 0,
};

const jugador = {
    name,
    puntaje: 0,
}

const enemy = []

let contador = 0;
let cont = 0;
let countRegresive = 3;

// variable of main character
const main = character(width, height);

const $game = document.getElementById("game");
const $h1 = document.createElement('h1');
$h1.classList.add('game-over', 'game-over--hidden');
$h1.textContent = "Game Over";
$game.appendChild($h1);

const $start = document.getElementById("start");
const $count = document.getElementById("count");

const showPlayer = () => {
    const $show = document.createElement('div');
    $show.className = 'game__show';
    const $ul = document.createElement('ul');
    const $li = document.createElement('li');
    $li.textContent = `Player: ${jugador.name}`;
    const $li2 = $li.cloneNode();
    const $ranking = document.createElement('a');
    $ranking.className = 'game__ranking';
    $ranking.textContent = 'Show Ranking Score';
    const $li3 = $li2.cloneNode();
    $li3.textContent = `Score: ${jugador.puntaje}`;
    $ul.appendChild($li);
    $li2.appendChild($ranking);
    $ul.appendChild($li2);
    $ul.appendChild($li3);
    $show.appendChild($ul);
    $game.insertBefore($show, $game.firstChild);
    return [$li2, $li3];
};

const showScore = showPlayer();

function config(loader, resources) {
    backSprite = new PIXI.TilingSprite(resources.background.texture, width, height);
    backSprite.tileScale.set(0.1, 0.1);
    content.addChild(backSprite);
    soundRally = PIXI.sound.Sound.from(resources.rally);
    soundGameOver = PIXI.sound.Sound.from(resources.game_over);
}

function setup() {
    content.addChild(main);
    app.stage.addChild(content);
    app.ticker.add((delta) => gameLoop(delta));
    soundRally.play();
    soundRally.loop = 1;
    downHandler();
    upHandler();
};

function gameLoop(delta) {
    contador++;;
    if (contador % enemyStats.respawn == 0) {
        content.addChild(enemies(enemy, cont, width));
        jugador.puntaje += 1;
        cont++;
        showScore[1].textContent = `Score: ${jugador.puntaje}`;
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].vy = enemy[i].vy + enemyStats.speed;
        enemy[i].y = enemy[i].vy
        if (enemy[i].y > height & !enemy[i].pass) {
            enemy[i].pass = true;
            enemyStats.passCar++;
            if (enemyStats.passCar == 50) {
                enemyStats.speedDefault += 0.5;
                enemyStats.passCar = 0;
            }
        }
    }

    // background movement
    backSprite.tilePosition.y -= 1;
    state(delta);
};

showRanking();

function showRanking() {
    showScore[0].addEventListener('click', async () => {
        const response = await fetch('scores.json');
        const data = await response.json();
        console.log(data);
    });
}

function state(delta) {
    // main character movement
    main.x += main.vx;

    // controlar que el personaje no se salga de la pantalla
    if (main.x <= 0) {
        main.x = 0;
    }
    if (main.x >= (width - main.width)) {
        main.x = (width - main.width);
    }
    gameOver();
};

const gameOver = () => {
    // saber si el personaje colisiona con otro y si se hace se genera un mensaje de game over, también se guarda el puntaje en localStorage
    for (let i = 0; i < cont; i++) {
        if (hitTestRectangle(enemy[i], main)) {
            $h1.classList.remove('game-over--hidden');
            $h1.classList.add('game-over--active');
            const jogador = getPuntaje(jugador);
            setPuntaje(jogador, jugador);
            soundRally.stop();
            soundGameOver.play();
            app.stop();
        }
    }
};

const start = () => {
    setInterval(() => {
        $count.textContent = countRegresive;
        if (countRegresive == 0) {
            $start.classList.add('start--hidden');
            clearInterval();
        }
        countRegresive--;
    }, 1000);

    setTimeout(() => {
        Swal.fire({
            icon: 'info',
            title: 'Controls',
            text: 'Use the arrow keys to move the character, and avoid the enemies. \nleft anda right arrow move your character. \nDown arrow, speed up enemy falling ',
            timer: 2000,
        })
        setup();
    }, 4000);
};

/**
 * function to input player name
 * @returns {Promise<string>} this return a promise with the player name
 */
async function playerName() {
    const {value: name} = await Swal.fire({
        title: 'Enter your player name',
        input: 'text',
        inputLabel: 'Your player name',
        allowOutsideClick: false,
    })
    return name;
};

// condition to begin the game
if (jugador.name) {
    Swal.fire(`Entered your player name: ${jugador.name}`);
    start();
}

export {main, enemyStats};










