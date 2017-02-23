class DrawLayer extends egret.DisplayObjectContainer {

    private canvas: egret.Shape = new egret.Shape();
    public pointCollector: Array<[number, number]> = [];
    private drawSteps: Array<[number, number]> = []; // start to end
    private currentStep: [number, number] = [0, 0];
    private drawAnchor: number = 0;
    private drawFinished: boolean = true;
    private drawing: boolean = false;

    private global: Main;

    public constructor (parent: Main) {
        super();
        this.global = parent;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage () {

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
    }

    private addPoint (x: number, y: number) {
        // console.log(this, this.pointCollector);
        this.pointCollector.push([x, y]);
    }

    private clear () {
        // this.canvas.graphics.beginFill(0xffffff);
        // this.canvas.graphics.drawRect(0, 0, this.width, this.height);
        // this.canvas.graphics.endFill();
        this.pointCollector = [];
    }

    private draw () {

        const brush = this.canvas.graphics;
        const pc = this.pointCollector;
        const currentPointPosition = pc.length - 1;
        const lastPointPosition = pc.length - 2;
        
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
    }

    private stepStart () {
        this.currentStep[0] = this.pointCollector.length - 1;
    }
    private stepEnd () {
        this.currentStep[1] = this.pointCollector.length - 1;
        this.drawSteps.push(this.currentStep);

        this.currentStep = [0, 0];
    }

    private onTouchBegin (e: egret.TouchEvent) {
        console.log('Touch Begin');

        this.addPoint(e.localX, e.localY);
        this.stepStart();
        this.drawing = true;

        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchMove (e: egret.TouchEvent) {
        console.log('Touch Moving');
        this.addPoint(e.localX, e.localY);

        this.draw();
    }

    private onTouchEnd (e: egret.TouchEvent) {
        console.log('Touch End', this);

        this.addPoint(e.localX, e.localY);
        this.stepEnd();
        this.drawing = false;
        // this.draw();

        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        // this.clear();
    }

}