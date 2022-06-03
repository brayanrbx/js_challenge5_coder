/**
 * función que permite la creación de los enemigos
 * @param {array} enemy se ingresa un array para llenar con la información de los enemigos
 * @param {int} cont se ingresa  un entero que sirve como el index del array
 * @returns {array} retorna un array de objeto con la información de los enemigos
 */
export function enemies(enemy, cont) {
    let characterW = 50,
        characterH = 50;
    let posx = radomInt(0, 800 - characterW);
    enemy[cont] = new PIXI.Graphics();
    enemy[cont].lineStyle(2, generarNuevoColor(), 1);
    enemy[cont].beginFill(generarNuevoColor());
    enemy[cont].drawRect(0, 0, characterW, characterH);
    enemy[cont].endFill();
    enemy[cont].x = posx;
    enemy[cont].vy = 0;
    enemy[cont].interactive = true;
    enemy[cont].alpha = 1;
    return enemy[cont];
};

/**
 * función para simular la aleatoriedad entre un numero mínimo y un máximo
 * @param {int} min se ingresa un entero como valor mínimo
 * @param {int} max se ingresa un entero como valor máximo
 * @returns {int} se retorna un entero aleatorio luego de aplicar unos métodos tanto para el redondeo como la aleatoriedad
 */
function radomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * función que retorna un color aleatorio
 * @returns {string} se retorna un string que contiene el nombre del color en hexadecimal
 */
function generarNuevoColor() {
	let symbols, color;
	symbols = "0123456789ABCDEF";
	color = "0x";

	for(let i = 0; i < 6; i++){
		color = color + symbols[Math.floor(Math.random() * 16)];
	}
    return color;
};