interface RectStyle {
    background?,
    lineWidth?: number,
    lineColor?
}
function drawRect (x: number, y: number, width: number, height: number, style: RectStyle = {}) {
    const newRect = new egret.Sprite();
    style.background && newRect.graphics.beginFill(style.background);
    style.lineWidth && style.lineColor && newRect.graphics.lineStyle(style.lineWidth, style.lineColor);
    newRect.graphics.drawRect(x, y, width, height);
    newRect.graphics.endFill();

    return newRect;
}

interface Position {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
}
interface ImgStyle {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    fillMode?: string
}
function drawImg (texture: egret.Texture, parame: ImgStyle = {}) {
    const newImg: egret.Bitmap = new egret.Bitmap();

    newImg.texture = texture;

    for (let prop in parame) {
        newImg[prop] = parame[prop];
    }

    return newImg;
}

interface TextStyle {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    size?: number,
    color?,
    textColor?,
    fontFamily?,
    textAlign?: string,
    verticalAlign?: string,
    strokeColor?
    bold?: boolean,
    italic?: boolean,
    textFlow?: Array<egret.ITextElement>,
    type?: string,
    inputType?: string
}
function drawText (text: string, style: TextStyle = {}) {
    const newText = new egret.TextField();

    if ('textFlow' in style) {
        newText.textFlow = style.textFlow;
        // return newText;
    }

    newText.text = text;
    
    for (let prop in style) {
        newText[prop] = style[prop]
    }
    
    return newText;
}

function addChildren (container: egret.DisplayObjectContainer, ...children) {
    children.forEach(child => {
        container.addChild(child);
    });
}

interface ScreenshootParame {
    format?: "image/png" | "image/jpeg",
    area?: [number, number, number, number],
    fileName?: string
}
function screenshoot (target) {

    // const options = option || {};
    let texture: egret.Texture = null;
    if (target instanceof egret.Texture ) {
        texture = target;
    }

    if (target instanceof egret.DisplayObject) {
        const rendered: egret.RenderTexture = new egret.RenderTexture();
        rendered.drawToTexture(target);
        texture = rendered;
    }

    return {
        texture: texture,
        toDataURL: (parame: ScreenshootParame = {}) => {
            const area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            return texture.toDataURL(parame.format || "image/png", area);
        },
        toFile: (parame: ScreenshootParame = {}) => {
            const area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            texture.saveToFile(parame.format, parame.fileName || 'download', area);
        }
    }
}

// matrix
// redResult   = (a[0] * srcR)  + (a[1] * srcG)  + (a[2] * srcB)  + (a[3] * srcA)  + a[4];
// greenResult = (a[5] * srcR)  + (a[6] * srcG)  + (a[7] * srcB)  + (a[8] * srcA)  + a[9];
// blueResult  = (a[10] * srcR) + (a[11] * srcG) + (a[12] * srcB) + (a[13] * srcA) + a[14];
// alphaResult = (a[15] * srcR) + (a[16] * srcG) + (a[17] * srcB) + (a[18] * srcA) + a[19];
interface FilterParame {
    color?: number,
    alpha?: number,
    blurX?: number,
    blurY?: number,
    strength?: number,
    quality?: number,
    inner?: boolean,
    knockout?: boolean,
    matrix?,
    distance?: number,
    angle?: number,
};
type FilterMode = 'light' | 'matrix' | 'blur' | 'shadow';
function createFilter (mode: FilterMode, parame: FilterParame) {
    switch (mode) {
        case 'light' : return new egret.GlowFilter ( 
                            parame.color, 
                            parame.alpha, 
                            parame.blurX, 
                            parame.blurY, 
                            parame.strength, 
                            parame.quality, 
                            parame.inner, 
                            parame.knockout 
                        );
        case 'matrix': return new egret.ColorMatrixFilter(parame.matrix);
        case 'blur': return new egret.BlurFilter(parame.blurX, parame.blurY);
        // case 'shadow': return new egret.DropShadowFilter ( 
        //                         parame.color, 
        //                         parame.alpha, 
        //                         parame.blurX, 
        //                         parame.blurY, 
        //                         parame.strength, 
        //                         parame.quality, 
        //                         parame.distance, 
        //                         parame.angle, 
        //                         parame.knockout 
        //                     );
                    
    }
}

function timer (delay: number, repeat: number, repeatFunc, completeFunc) {
    
    const newTimer = new egret.Timer(delay, repeat);

    newTimer.addEventListener(egret.TimerEvent.TIMER, (e) => {
        repeatFunc(e);
    }, this);

    newTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e) => {
        completeFunc(e);
    }, this);

    return newTimer;
}


// TODO make this function act just like fetch api
interface requestParame {
    method?: string,
    headers?: Array<[string, string]>,
    body?
}
interface responseObject {
    response: string,
    status: string,
    json (),
    text (),
    blob (),
    header
}

function request (url: string, parame: requestParame = {}) {

    console.log(url, parame);
    return new Promise((resolve, reject) => {

        const r = new egret.HttpRequest();

        r.responseType = egret.HttpResponseType.TEXT;
        r.open(url, parame.method || egret.HttpMethod.GET);

        if (parame.headers) {
            parame.headers.forEach(header => {
                r.setRequestHeader(header[0], header[1]);
            });
        }

        let bodyLink = '';
        // let formData = null;
        if (parame.method === egret.HttpMethod.POST) {
            const body = parame.body || {};
            
            // formData = new FormData();
            for (let key in body) {
                // formData.append(key, body[key]);
                let bodyParsed;
                if (typeof body[key] === 'object') {
                    bodyParsed = JSON.stringify(body[key]);
                } else {
                    bodyParsed = body[key];
                }
                bodyLink += `${key}=${bodyParsed}&`;
            }

            // r.setRequestHeader('application/x-www-form-urlencoded', bodyLink);
        }

        r.send(bodyLink);

        r.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
            const response = e.currentTarget;
            const responseText = response.response;

            console.log(e.currentTarget);

            const retResponse: responseObject = {
                response: responseText,
                status: response._xhr.status,
                header: response.getAllResponseHeaders(),
                json: () => {
                    return new Promise((resolve, _) => resolve(JSON.parse(responseText)))
                },
                text: () => {
                    return new Promise((resolve, _) => resolve(responseText));
                },
                blob: () => {
                    return new Promise((resolve, _) => {
                        const blob = new Blob(
                                        [JSON.stringify(JSON.parse(responseText), null, 2)], 
                                        {
                                            type : 'application/json'
                                        }
                                    );
                        resolve(blob);
                    });
                }
            };

            resolve(retResponse);
        }, this);

    });
}

function loadImg (url: string) {
    return new Promise((resolve, reject) => {
        const loader: egret.ImageLoader = new egret.ImageLoader();

        loader.once(egret.Event.COMPLETE, (e: egret.Event) => {

            const loader: egret.ImageLoader = e.currentTarget;
            const bitmap: egret.BitmapData = loader.data;
            resolve(bitmap);

        },this);

        loader.load(url);
    });
}