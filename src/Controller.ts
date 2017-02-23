class Controller extends egret.DisplayObjectContainer {

    private sideLength: number = 40;
    private brushSizes: [number] = [2, 4, 6, 8];
    private brushSizeBasePoint = { x: 40, y: 0};
    private btnList: [egret.Sprite];

    public brushSize: number = this.brushSizes[0];

    public constructor () {
        super();
        
        this.brushSizeContorller();
    }

    private brushSizeContorller () {
        let i = 0;
        egret.HorizontalAlign
        const sizeText = drawText(this.brushSize + '', {
            y: this.sideLength / 2 - 10,
            textColor: 0xff000000,
            verticalAlign: egret.VerticalAlign.BOTTOM,
            textAlign: egret.HorizontalAlign.CENTER,
            size: 20
        });
        sizeText.width = 40;
        sizeText.verticalAlign = egret.HorizontalAlign.CENTER;
        this.addChild(sizeText);

        this.brushSizes.forEach(size => {
            const basePoint = {
                x: this.brushSizeBasePoint.x + i * this.sideLength,
                y: this.brushSizeBasePoint.y
            };
            const option = {
                background: 0xff000000,
            }
            const optionWithBorder = {
                background: 0xff000000,
                lineColor: 0x334525,
                lineWidth: 5
            }

            const wrap = drawRect(basePoint.x, basePoint.y, this.sideLength, this.sideLength, {
                background: 0xeeeeee
            });

            const wrapBrush = wrap.graphics;
            wrapBrush.beginFill(0xff000000);
            wrapBrush.drawCircle(basePoint.x + this.sideLength / 2, this.sideLength / 2, size);
            wrapBrush.endFill();
            
            wrap.touchEnabled = true;
            wrap.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.Event) => {
                console.log(this.brushSize);
                this.brushSize = size;
                sizeText.text = size + '';
                
                // wrapBrush.beginFill(0xffffff);
                // wrapBrush.lineStyle(5, 0x334525);
                // wrapBrush.drawCircle(basePoint.x + this.sideLength / 2, this.sideLength / 2, size);
                // wrapBrush.endFill();

                this.btnList.forEach(btn => {
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
            }, this);

            this.addChild(wrap);
            this.btnList ? this.btnList.push(wrap) : this.btnList = [wrap];

            i++;
        });
    }
}