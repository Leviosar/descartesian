"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var p5 = require('../../node_modules/p5/lib/p5.min');
var Descartesian = /** @class */ (function () {
    function Descartesian(options) {
        this.gridSize = 20;
        this.fx = null;
        this.options = options;
        this.container = options.container;
        if (options.fx)
            this.fx = options.fx;
        this.setup();
    }
    Descartesian.prototype.setup = function () {
        var _this = this;
        this.sketch = function (p) {
            p.setup = function () {
                _this.canvas = p.createCanvas(_this.container.offsetWidth, _this.container.offsetHeight);
                _this.canvas.canvas.classList.add('descartesian_canvas');
                _this.container.appendChild(_this.canvas.elt);
                _this.canvas.canvas.addEventListener('contextmenu', function (ev) { return ev.preventDefault(); });
                _this.canvas.canvas.addEventListener('mousedown', function (ev) { return _this.clicked(ev); });
                p.background(255);
            };
            p.draw = function () {
                p.clear();
                p.background(255);
                if (_this.options.guideLine || _this.options.guideLine == undefined)
                    _this.guideLines(p);
                if (_this.options.grid || _this.options.grid == undefined)
                    _this.buildGrid(p);
                _this.renderFunction(p, _this.fx);
            };
        };
        this.build();
    };
    Descartesian.prototype.build = function () {
        this.render = new p5(this.sketch);
    };
    Descartesian.prototype.buildGrid = function (p) {
        var halfWidth = p.width / 2;
        var halfHeight = p.height / 2;
        p.stroke('#eee');
        p.strokeWeight(1);
        for (var i = halfHeight; i >= 0; i -= this.gridSize)
            p.line(0, i, p.width, i);
        for (var i = halfHeight; i <= p.height; i += this.gridSize)
            p.line(0, i, p.width, i);
        for (var i = halfWidth; i >= 0; i -= this.gridSize)
            p.line(i, 0, i, p.height);
        for (var i = halfWidth; i <= p.width; i += this.gridSize)
            p.line(i, 0, i, p.height);
        p.stroke('#000');
        p.line(0, halfHeight, p.width, halfHeight);
        p.line(halfWidth, 0, halfWidth, p.height);
    };
    Descartesian.prototype.clicked = function (ev) {
        console.log(this.gridSize);
        if (ev.button == 2 && this.gridSize > 10) {
            this.gridSize -= 10;
        }
        else if (this.gridSize < 30 && ev.button == 0) {
            this.gridSize += 10;
        }
    };
    Descartesian.prototype.guideLines = function (p) {
        p.stroke('#aaa');
        p.line(p.mouseX, 0, p.mouseX, p.mouseY); // A
        p.line(p.mouseX, p.mouseY, p.mouseX, p.height); // A'
        p.line(0, p.mouseY, p.mouseX, p.mouseY); // B
        p.line(p.mouseX, p.mouseY, p.width, p.mouseY); // B'
        var px = p.mouseX - (p.width / 2);
        var py = p.mouseY - (p.height / 2);
        p.text('(' + parseInt(px.toString()) + ' , ' + parseInt((-py).toString()) + ')', (p.mouseX + 10), (p.mouseY - 10));
    };
    Descartesian.prototype.renderFunction = function (p, f) {
        if (f != null) {
            var halfWidth = p.width / 2;
            var halfHeight = p.height / 2;
            p.translate(halfWidth, halfHeight);
            p.stroke('#ff0000');
            p.noFill();
            p.strokeWeight(1);
            p.beginShape();
            for (var x = -p.width; x < p.width; x += 1) {
                p.curveVertex(x * (this.gridSize / 4), (-f(x)) * (this.gridSize / 4));
            }
            p.endShape();
            p.translate(-halfWidth, -halfHeight);
        }
    };
    return Descartesian;
}());
exports.default = Descartesian;
//# sourceMappingURL=Descartesian.js.map