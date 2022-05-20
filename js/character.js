/**
 * función que permite la creación del personaje
 * @returns {object} se retorna un objeto con la información del personaje
 */
export function character(width, height) {
    let characterW = 50, // ancho del personaje
        characterH = 50; // alto del personaje
    let posx = (width / 2) - (characterW / 2);
    let posy = (height) - (characterH + 10);
    let rectangle = new PIXI.Graphics();  // creacion del objeto
    rectangle.lineStyle(2, 0xFFFFFF, 1); // estilo de linea
    rectangle.beginFill(0xdfca); // color de fondo
    rectangle.drawRect(0, 0, characterW, characterH); // creacion del rectangulo
    rectangle.endFill(); // termina la creacion del rectangulo
    rectangle.x = posx; // posicion x en canvas
    rectangle.y = posy; // posicion y en canvas
    rectangle.vx = 0;
    rectangle.vy = 0;
    return rectangle;
};
