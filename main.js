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
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d');
    this.x = 10;
    this.y = 10;
    this.w = 10;
    this.h = 10;
    this.plus = 0
    this.dir = 'R'
    this.color = color;
    this.apple = new Apple(this.canvas);
  }
  /**
   * Dibuja una serpiente en el elemento canvas
   * @param {String} dir Dirección a donde la serpiente se va mover
   * @returns {void}
   */
  draw(){
    this.apple.draw();
    console.log(this.y)
    if((this.x >= this.apple.x && this.x <= this.apple.x + this.apple.w)
        && (this.y >= this.apple.y && this.y <= this.apple.y+this.apple.h)){
      this.plus +=10
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.apple.x = Math.floor((Math.random() * (0 - Math.max(this.canvas.width,this.canvas.height))) + Math.min(this.canvas.width,this.canvas.height));
      this.apple.y = this.apple.x
      console.log(this.apple.x, 'a')
    }
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  
  changeDir(){
    // console.log(this.snk[this.snk.length-1].posX)
    switch(this.dir){
      case 'R':
        this.x++;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w+this.plus,this.h)
        break;
      case 'L':
        this.x--
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w+this.plus,this.h);
        break;
      case 'D':
        this.y++;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w,this.h+this.plus)
        break
      case 'U':
        this.y--;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.w,this.h+this.plus)
        break
    }
  }
  update = () =>{
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.draw()
    this.changeDir()
    requestAnimationFrame(this.update);
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