# Descartesian

> Perfect numbers like perfect men are very rare.

René Descartes, René dos Mapas, Renatos dos Mapas. A responsive cartesian plane with simple functions.

# Why?

Well, i remember writing something similar to this like 10 times and always loosing it, p5.js use his origin (0,0) at top-left corner, unlike the cartesian plane that often uses a centralized origin, so in a saturday morning i thought "Why not?".

# Usage

If you don't have any knowledge on p5.js and just want to render some functions in you application, start by adding this package to your project with:

```bash
npm install --save descartesian
```

Now you'll need to import it into your project and create an instance of Descartesian, passing a container as param

```javascript
import Descartesian from 'descartesian'

const chart = new Descartesian({
    container: document.querySelector('.yourElement')
})
```

If you done all of this correctly, a plane like that should appear

![Cartesian plane](https://i.ibb.co/vdRR4Md/Annotation-2019-06-02-115710.png)

Last but not least important, let's add some function to this example, for now, not all functions are perfectly rendered in terms of scale, e.g. ```fx = Math.sin(x)```, this happens because the sin function has a variation between -1 and 1 but the chart has a 10/20/30 units scale, so the function curve gets super weird. Hope i can fix it in later versions.

Let's render this cubic function ```fx = (1/5) * x ** 3```:

```javascript
chart.fx = (x)=> 1/5 * x ** 3
```

![Cubic function](https://i.ibb.co/1sR0bpH/image.png)


# Docs

A Descartesian object has some options you can use to do a little customization, below it's the object with all props and it's default values, for further explanations continue reading.

```javascript
const canvas = new Descartesian(
    {
        container: null,
        grid: true,
        guideLines: true,
        fx: null 
    }
)
```

### Descartersian.container: HTMLElement

Element where the canvas will be appended, if you don't pass an element, shit will happen. No default value.

### Descartesian.grid: Boolean

Manages the scale grid from the canvas, default value is true.

### Descartesian.guideLines: Boolean

Manages the guide lines in the (mouseX, mouseY) point of the canvas, default value is true.

### Descartesian.fx: Function 

This is the function which will be rendered on the canvas, it should receive a x value and return the y value of the function, like below

```javascript
Descartesian.fx = (x) => {return x ** 2}
```

Default value is null and the function starts to be rendered when a valid param is passed.