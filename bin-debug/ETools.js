function drawRect(x, y, width, height, style) {
    if (style === void 0) { style = {}; }
    var newRect = new egret.Sprite();
    style.background && newRect.graphics.beginFill(style.background);
    style.lineWidth && style.lineColor && newRect.graphics.lineStyle(style.lineWidth, style.lineColor);
    newRect.graphics.drawRect(x, y, width, height);
    newRect.graphics.endFill();
    return newRect;
}
function drawImg(texture, parame) {
    if (parame === void 0) { parame = {}; }
    var newImg = new egret.Bitmap();
    newImg.texture = texture;
    for (var prop in parame) {
        newImg[prop] = parame[prop];
    }
    return newImg;
}
function drawText(text, style) {
    if (style === void 0) { style = {}; }
    var newText = new egret.TextField();
    if ('textFlow' in style) {
        newText.textFlow = style.textFlow;
    }
    newText.text = text;
    for (var prop in style) {
        newText[prop] = style[prop];
    }
    return newText;
}
function addChildren(container) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.forEach(function (child) {
        container.addChild(child);
    });
}
function screenshoot(target) {
    // const options = option || {};
    var texture = null;
    if (target instanceof egret.Texture) {
        texture = target;
    }
    if (target instanceof egret.DisplayObject) {
        var rendered = new egret.RenderTexture();
        rendered.drawToTexture(target);
        texture = rendered;
    }
    return {
        texture: texture,
        toDataURL: function (parame) {
            if (parame === void 0) { parame = {}; }
            var area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            return texture.toDataURL(parame.format || "image/png", area);
        },
        toFile: function (parame) {
            if (parame === void 0) { parame = {}; }
            var area = parame.area ? (new egret.Rectangle(parame.area[0], parame.area[1], parame.area[2], parame.area[3])) : null;
            texture.saveToFile(parame.format, parame.fileName || 'download', area);
        }
    };
}
;
function createFilter(mode, parame) {
    switch (mode) {
        case 'light': return new egret.GlowFilter(parame.color, parame.alpha, parame.blurX, parame.blurY, parame.strength, parame.quality, parame.inner, parame.knockout);
        case 'matrix': return new egret.ColorMatrixFilter(parame.matrix);
        case 'blur': return new egret.BlurFilter(parame.blurX, parame.blurY);
    }
}
function timer(delay, repeat, repeatFunc, completeFunc) {
    var newTimer = new egret.Timer(delay, repeat);
    newTimer.addEventListener(egret.TimerEvent.TIMER, function (e) {
        repeatFunc(e);
    }, this);
    newTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
        completeFunc(e);
    }, this);
    return newTimer;
}
function request(url, parame) {
    var _this = this;
    if (parame === void 0) { parame = {}; }
    console.log(url, parame);
    return new Promise(function (resolve, reject) {
        var r = new egret.HttpRequest();
        r.responseType = egret.HttpResponseType.TEXT;
        r.open(url, parame.method || egret.HttpMethod.GET);
        if (parame.headers) {
            parame.headers.forEach(function (header) {
                r.setRequestHeader(header[0], header[1]);
            });
        }
        var bodyLink = '';
        // let formData = null;
        if (parame.method === egret.HttpMethod.POST) {
            var body = parame.body || {};
            // formData = new FormData();
            for (var key in body) {
                // formData.append(key, body[key]);
                var bodyParsed = void 0;
                if (typeof body[key] === 'object') {
                    bodyParsed = JSON.stringify(body[key]);
                }
                else {
                    bodyParsed = body[key];
                }
                bodyLink += key + "=" + bodyParsed + "&";
            }
        }
        r.send(bodyLink);
        r.addEventListener(egret.Event.COMPLETE, function (e) {
            var response = e.currentTarget;
            var responseText = response.response;
            console.log(e.currentTarget);
            var retResponse = {
                response: responseText,
                status: response._xhr.status,
                header: response.getAllResponseHeaders(),
                json: function () {
                    return new Promise(function (resolve, _) { return resolve(JSON.parse(responseText)); });
                },
                text: function () {
                    return new Promise(function (resolve, _) { return resolve(responseText); });
                },
                blob: function () {
                    return new Promise(function (resolve, _) {
                        var blob = new Blob([JSON.stringify(JSON.parse(responseText), null, 2)], {
                            type: 'application/json'
                        });
                        resolve(blob);
                    });
                }
            };
            resolve(retResponse);
        }, _this);
    });
}
function loadImg(url) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var loader = new egret.ImageLoader();
        loader.once(egret.Event.COMPLETE, function (e) {
            var loader = e.currentTarget;
            var bitmap = loader.data;
            resolve(bitmap);
        }, _this);
        loader.load(url);
    });
}
//# sourceMappingURL=ETools.js.map