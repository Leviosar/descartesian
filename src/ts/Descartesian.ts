const p5 = require('../../node_modules/p5/lib/p5.min')

export default class Descartesian {

    private container:HTMLObjectElement
    private canvas:HTMLCanvasElement|undefined|any
    private options:Object|any
    private render:undefined|any
    private sketch:Object|any
    private gridSize:number = 20
    private fx:any = null

    constructor(options:Object|HTMLCanvasElement|any){
        this.options = options
        this.container = options.container
        if (options.fx) this.fx = options.fx
        this.setup()
    }

    setup(){
        this.sketch = (p:any)=>{
            p.setup = ()=>{
                this.canvas = p.createCanvas(this.container.offsetWidth, this.container.offsetHeight)
                this.canvas.canvas.classList.add('descartesian_canvas')
                this.container.appendChild(this.canvas.elt)
                this.canvas.canvas.addEventListener('contextmenu', (ev:MouseEvent)=> ev.preventDefault())
                this.canvas.canvas.addEventListener('mousedown', (ev:MouseEvent)=> this.clicked(ev))
                p.background(255)
            }

            p.draw = ()=>{
                p.clear()
                p.background(255)
                if (this.options.guideLine || this.options.guideLine == undefined) this.guideLines(p)
                if (this.options.grid || this.options.grid == undefined) this.buildGrid(p)
                this.renderFunction(p, this.fx)
            }
        }
        this.build()
    }

    build(){
        this.render = new p5(this.sketch)
    }
    
    buildGrid(p:any){
        let halfWidth = p.width / 2
        let halfHeight = p.height/ 2
        
        p.stroke('#eee')
        p.strokeWeight(1)
        
        for (let i = halfHeight; i >= 0; i -= this.gridSize) p.line(0, i, p.width, i)
        for (let i = halfHeight; i <= p.height; i += this.gridSize) p.line(0, i, p.width, i)
        for (let i = halfWidth; i >= 0; i -= this.gridSize) p.line(i, 0, i, p.height)
        for (let i = halfWidth; i <= p.width; i += this.gridSize) p.line(i, 0, i, p.height)
        
        p.stroke('#000')
        p.line(0, halfHeight, p.width, halfHeight)
        p.line(halfWidth, 0, halfWidth, p.height)
    }

    clicked(ev:MouseEvent){
        console.log(this.gridSize)
        if (ev.button == 2 && this.gridSize > 10) {
            this.gridSize -= 10
        }else if(this.gridSize < 30 && ev.button == 0){
            this.gridSize += 10
        }
    }
    
    guideLines(p:any){
        p.stroke('#aaa')
        p.line(p.mouseX, 0, p.mouseX, p.mouseY) // A
        p.line(p.mouseX, p.mouseY, p.mouseX, p.height) // A'
        p.line(0, p.mouseY, p.mouseX, p.mouseY) // B
        p.line(p.mouseX, p.mouseY, p.width, p.mouseY) // B'
        let px = p.mouseX - (p.width / 2)
        let py = p.mouseY - (p.height / 2)
        p.text('(' + parseInt(px.toString()) + ' , ' + parseInt((-py).toString()) + ')', (p.mouseX + 10), (p.mouseY - 10))
    }

    renderFunction(p:any, f:any){
        if (f != null) {
            let halfWidth = p.width / 2
            let halfHeight = p.height/ 2
            
            p.translate(halfWidth, halfHeight)
            p.stroke('#ff0000')
            p.noFill()
            p.strokeWeight(1)
    
            p.beginShape()
            for (let x = - p.width; x < p.width; x += 1) {
                p.curveVertex(x * (this.gridSize / 4), (- f(x)) * (this.gridSize / 4))
            }
            p.endShape()
    
            p.translate(-halfWidth, -halfHeight)
        }
    }
}