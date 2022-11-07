const lienzo = document.getElementById('snake')

class Apple{
  /**
   * 
   * @param {HTMLCanvasElement} canvas Elemento canvas
   * @param {number} x Eje x de canvas
   * @param {number} y Eje y de canvas
   * @param {number} w Ancho de la manzana
   * @param {number} h Alto de la manzana
   * @param {CSSStyleRule} color Color de la manzana
   */
  constructor(canvas,x = 140, y =140, w = 20, h = 20, color = 'red'){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = y
    this.w = w,
    this.h = h
    this.color = color;
  }

  /**
   * Dibuja una manzana en el elemento canvas
   * @returns {void}
   */
  draw(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w,this.h);
  }
}
class Snake{
  /**
   * @param {HTMLCanvasElement} canvas Elemento canvas
   * @param {CSSStyleRule} color Color de la serpiente
   */
  constructor(canvas,color='#81D7FE'){
    this.canvas = canvas // Canvas
    this.ctx = this.canvas.getContext('2d');
    this.x = 10; // pos X
    this.y = 10; // pos Y
    this.w = 10; // ancho
    this.h = 10; // alto
    this.plus = 0 // Tamaño (cuando se colicione con una mazana aumenta)
    this.dir = 'R' // direccion inicial
    this.color = color; // Color de la culebra
    this.apple = new Apple(this.canvas); // Instancia de apple
  }
  /**
   * Dibuja una serpiente en el elemento canvas
   * @param {String} dir Dirección a donde la serpiente se va mover
   * @returns {void}
   */
  draw(){
    this.apple.draw(); // Se dibuja la manzana
    if((this.x >= this.apple.x && this.x <= this.apple.x + this.apple.w)
        && (this.y >= this.apple.y && this.y <= this.apple.y+this.apple.h)){
      this.plus +=10
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.apple.x = Math.floor((Math.random() * (0 - Math.max(this.canvas.width,this.canvas.height))) + Math.min(this.canvas.width,this.canvas.height));
      this.apple.y = this.apple.x
    }
    this.ctx.fillStyle = this.color; // se coloca el color
    this.ctx.fillRect(this.x,this.y,this.w,this.h) // Se dibuja la culebra
  }
  /**
   * Cambia la direccion de la culebrita
   */
  changeDir(){
    switch(this.dir){
      case 'R': // Si es derecha
        this.x++;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w+this.plus,this.h)
        break;
      case 'L': // Si es izq
        this.x--
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w+this.plus,this.h);
        break;
      case 'D': // Si es abajo
        this.y++;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w,this.h+this.plus)
        break
      case 'U': // Si es arriba
        this.y--;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w,this.h+this.plus)
        break
    }
  }
  /**
   * Game Loop
   * Recursive game loop
   */
  update = () =>{
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // se borra el tablero
    this.draw() // se dibuja la culebra
    this.changeDir() // Se evalua si se ha cambiado de direccion
    requestAnimationFrame(this.update); // Recursion
  }
}

const snk = new Snake(lienzo);
snk.draw();
requestAnimationFrame(snk.update);
document.addEventListener('keyup', (e) =>{
  switch(e.code){
    case 'ArrowUp':
      snk.dir = 'U';
      break;
    case 'ArrowDown':
      snk.dir = 'D';
      break;
    case 'ArrowLeft':
      snk.dir = 'L';
      break;
    case 'ArrowRight':
      snk.dir = 'R';
      break
  }
})