var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super.call(this) || this;
        _this.sideLength = 40;
        _this.brushSizes = [2, 4, 6, 8];
        _this.brushSizeBasePoint = { x: 40, y: 0 };
        _this.brushSize = _this.brushSizes[0];
        _this.brushSizeContorller();
        return _this;
    }
    Controller.prototype.brushSizeContorller = function () {
        var _this = this;
        var i = 0;
        egret.HorizontalAlign;
        var sizeText = drawText(this.brushSize + '', {
            y: this.sideLength / 2 - 10,
            textColor: 0xff000000,
            verticalAlign: egret.VerticalAlign.BOTTOM,
            textAlign: egret.HorizontalAlign.CENTER,
            size: 20
        });
        sizeText.width = 40;
        sizeText.verticalAlign = egret.HorizontalAlign.CENTER;
        this.addChild(sizeText);
        this.brushSizes.forEach(function (size) {
            var basePoint = {
                x: _this.brushSizeBasePoint.x + i * _this.sideLength,
                y: _this.brushSizeBasePoint.y
            };
            var option = {
                background: 0xff000000,
            };
            var optionWithBorder = {
                background: 0xff000000,
                lineColor: 0x334525,
                lineWidth: 5
            };
            var wrap = drawRect(basePoint.x, basePoint.y, _this.sideLength, _this.sideLength, {
                background: 0xeeeeee
            });
            var wrapBrush = wrap.graphics;
            wrapBrush.beginFill(0xff000000);
            wrapBrush.drawCircle(basePoint.x + _this.sideLength / 2, _this.sideLength / 2, size);
            wrapBrush.endFill();
            wrap.touchEnabled = true;
            wrap.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
                console.log(_this.brushSize);
                _this.brushSize = size;
                sizeText.text = size + '';
                // wrapBrush.beginFill(0xffffff);
                // wrapBrush.lineStyle(5, 0x334525);
                // wrapBrush.drawCircle(basePoint.x + this.sideLength / 2, this.sideLength / 2, size);
                // wrapBrush.endFill();
                _this.btnList.forEach(function (btn) {
                    console.log(btn.$hashCode, wrap.$hashCode, size);
                    // if (btn.$hashCode !== wrap.$hashCode) {
                    //     wrapBrush.beginFill(0xff000000);
                    //     wrapBrush.lineStyle(0, 0xffffff);
                    //     wrapBrush.drawCircle(basePoint.x + this.sideLength / 2, this.sideLength / 2, size);
                    //     wrapBrush.endFill();
                    // }
                    // if (btn.$hashCode !== wrap.$hashCode) {
                    //     btn.graphics.clear();
                    //     btn.graphics.beginFill(0x35da34);
                    //     btn.graphics.drawRect(basePoint.x + this.sideLength / 2, this.sideLength / 2, this.sideLength / 2, this.sideLength / 2);
                    //     btn.graphics.beginFill(0xffffff);
                    //     btn.graphics.lineStyle(0, 0x334525);
                    //     btn.graphics.drawCircle(basePoint.x + this.sideLength / 2, this.sideLength / 2, size);
                    //     btn.graphics.endFill();
                    // }
                });
            }, _this);
            _this.addChild(wrap);
            _this.btnList ? _this.btnList.push(wrap) : _this.btnList = [wrap];
            i++;
        });
    };
    return Controller;
}(egret.DisplayObjectContainer));
__reflect(Controller.prototype, "Controller");
//# sourceMappingURL=Controller.js.map