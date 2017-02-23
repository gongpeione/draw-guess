var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawLayer = (function (_super) {
    __extends(DrawLayer, _super);
    function DrawLayer(parent) {
        var _this = _super.call(this) || this;
        _this.canvas = new egret.Shape();
        _this.pointCollector = [];
        _this.drawSteps = []; // start to end
        _this.currentStep = [0, 0];
        _this.drawAnchor = 0;
        _this.drawFinished = true;
        _this.drawing = false;
        _this.global = parent;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DrawLayer.prototype.onAddToStage = function () {
        this.canvas.graphics.beginFill(0xffffff);
        this.canvas.graphics.drawRect(0, 0, this.width, this.height);
        this.canvas.graphics.endFill();
        // const rect = drawRect(0, 0, this.width, this.height, {
        //     background: 0xffffff
        // });
        this.addChild(this.canvas);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.touchEnabled = true;
        // this.cacheAsBitmap = true;
        // egret.startTick(timestamp => {
        //     if (this.drawing) {
        //         this.draw();
        //         return true;
        //     }
        //     return false;
        // }, this);
    };
    DrawLayer.prototype.addPoint = function (x, y) {
        // console.log(this, this.pointCollector);
        this.pointCollector.push([x, y]);
    };
    DrawLayer.prototype.clear = function () {
        // this.canvas.graphics.beginFill(0xffffff);
        // this.canvas.graphics.drawRect(0, 0, this.width, this.height);
        // this.canvas.graphics.endFill();
        this.pointCollector = [];
    };
    DrawLayer.prototype.draw = function () {
        var brush = this.canvas.graphics;
        var pc = this.pointCollector;
        var currentPointPosition = pc.length - 1;
        var lastPointPosition = pc.length - 2;
        brush.lineStyle(this.global.controller.brushSize || 6, 0xff0000, 1, true, "", "", "round");
        brush.moveTo(pc[currentPointPosition][0], pc[currentPointPosition][1]);
        brush.lineTo(pc[lastPointPosition][0], pc[lastPointPosition][1]);
        brush.endFill();
        // this.drawFinished = false;
        // 
        // for (let i = this.drawAnchor; i < pc.length; i++) {
        //     if (i === this.drawAnchor) {
        //         this.canvas.graphics.moveTo(pc[i][0], pc[i][1]);
        //     } else {
        //         this.canvas.graphics.lineTo(pc[i][0], pc[i][1]);
        //     }
        // const pointRect = drawRect(pc[i][0], pc[i][1], 5, 5, {
        //     background: 0xff000000
        // });
        // this.addChild(pointRect);
        // }
        // this.canvas.graphics.endFill();
        // this.drawFinished = true;
        // this.pointCollector.forEach(point => {
        //     const pointRect = drawRect(point[0], point[1], 5, 5, {
        //         background: 0xff000000
        //     });
        //     this.addChildAt(pointRect, 10);
        //     // console.log(point[0], point[1]);
        // });
    };
    DrawLayer.prototype.stepStart = function () {
        this.currentStep[0] = this.pointCollector.length - 1;
    };
    DrawLayer.prototype.stepEnd = function () {
        this.currentStep[1] = this.pointCollector.length - 1;
        this.drawSteps.push(this.currentStep);
        this.currentStep = [0, 0];
    };
    DrawLayer.prototype.onTouchBegin = function (e) {
        console.log('Touch Begin');
        this.addPoint(e.localX, e.localY);
        this.stepStart();
        this.drawing = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    DrawLayer.prototype.onTouchMove = function (e) {
        console.log('Touch Moving');
        this.addPoint(e.localX, e.localY);
        this.draw();
    };
    DrawLayer.prototype.onTouchEnd = function (e) {
        console.log('Touch End', this);
        this.addPoint(e.localX, e.localY);
        this.stepEnd();
        this.drawing = false;
        // this.draw();
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        // this.clear();
    };
    return DrawLayer;
}(egret.DisplayObjectContainer));
__reflect(DrawLayer.prototype, "DrawLayer");
//# sourceMappingURL=DrawLayer.js.map