const lienzo = document.getElementById('snake')

class Snake{
  /**
   * @param {HTMLCanvasElement} canvas Elemento canvas
   * @param {number} x Eje x de canvas 
   * @param {number} y Eje y de canvas 
   * @param {number} w Ancho de la serpiente
   * @param {number} h Alto de la serpiente
   * @param {CSSStyleRule} color Color de la serpiente
   */
  constructor(canvas,x=20,y=20,w=100,h=20,color='#81D7FE'){
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d');
    this.x= x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  /**
   * Dibuja una serpiente en el elemento canvas
   * @param {String} dir Dirección a donde la serpiente se va mover
   * @returns {void}
   */
  draw(dir){
    if((this.x+this.w) == this.canvas.width){
      alert('se ha excedido');
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }
    this.x++
    this.ctx.fillStyle=this.color
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  update = () =>{
    this.ctx.clearRect(this.x,this.y,this.w,this.h);
    this.draw()
    requestAnimationFrame(this.update);
  }
}

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
  constructor(canvas,x = 150, y = 150, w = 20, h = 20, color = 'red'){
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
const snk = new Snake(lienzo);
const appl = new Apple(lienzo);
snk.draw();
appl.draw()
requestAnimationFrame(snk.update);
document.addEventListener('keyup', (e) =>{
  if(e.code == 'ArrowDown'){
  }
})