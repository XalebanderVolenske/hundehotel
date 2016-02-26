Vector2 = function (x, y) {
    this.x = 0;
    this.y = 0;

    if (x != null && y == null) {
        this.x = x;
        this.y = x;
    }
    else {
        if (x != null)
            this.x = x;
        if (y != null)
            this.y = y;
    }

    this.previousX = 0;
    this.previousY = 0;

    this.Set = function (x, y) {
        if (x == null && y == null) {
            console.log("No 'x' or 'y' has been passed to Vector2's Set function");
        }
        else {
            this.previousX = this.x;
            this.previousY = this.y;

            if (x != null && y == null) {
                this.x = x;
                this.y = y;
            }
            else {
                if (x != null)
                    this.x = x;

                if (y != null)
                    this.y = y;
            }
        }
    };
};

Animation = function (width, height, row, column, limit, imgSrc, fps, columns, rows) {
    if (fps == null || fps >= 33)
        this.fps = 1;
    else
        this.fps = 33 / fps;
    this.fpsCounter = 0;
    //this.frame = 0;
    this.width = width;
    this.height = height;
    this.rowStart = row;
    this.columnStart = column;
    this.row = row;
    this.column = column;
    this.rows = rows;
    this.columns = columns;
    if (limit == null || limit == 0)
        this.limit = 999999999999;
    else
        this.limit = limit - 1;
    this.limitCount = 0;
    this.image = new Image();
    this.image.src = imgSrc;
    this.position = new Vector2(0);
    this.cropPosition = new Vector2(0);

    this.SetLimit = function (limit) {
        this.limit = l - 1;
    };

    this.SetRow = function (num) {
        this.row = num;
        this.rowStart = num;

        this.cropPosition.x = this.width * this.column;
        this.cropPosition.y = this.height * this.row;
    };

    this.SetColumn = function (num) {
        this.column = num;
        this.columnStart = num;

        this.cropPosition.x = this.width * this.column;
        this.cropPosition.y = this.height * this.row;
    };

    this.Update = function () {
        this.cropPosition.x = this.width * this.column;
        this.cropPosition.y = this.height * this.row;

        if (this.columns == null || this.columns == 0)
            this.columns = this.image.width / this.width;
        if (this.rows == null || this.rows == 0)
            this.rows = this.image.height / this.height;
    };

    this.Draw = function (ctx) {
        if (this.fpsCounter == 0) {
            if (this.limitCount < this.limit) {
                this.limitCount++;
                this.column++;

                if (this.column >= this.columns) {
                    this.row++;
                    this.column = 0;

                    if (this.row >= this.rows) {
                        this.row = this.rowStart;
                        this.column = this.columnStart;
                        this.limitCount = 0;
                    }
                }
            }
            else {
                this.column = this.columnStart
                this.row = this.rowStart;
                this.limitCount = 0;
            }
        }

        ctx.drawImage(this.image, this.cropPosition.x, this.cropPosition.y, this.width, this.height, this.position.x, this.position.y, this.width, this.height);

        this.fpsCounter++;

        if (this.fpsCounter >= this.fps)
            this.fpsCounter = 0;
    };
};

Rectangle = function (x, y, w, h, imgSrc) {
    if (x == null || y == null || w == null || h == null) {
        alert("You must pass in all the veriables for a rectange: (x, y, width, height)");

        var errorMsg = "The following are not provided:";
        if (x == null)
            errorMsg += " 'x' ";
        if (y == null)
            errorMsg += " 'y' ";
        if (w == null)
            errorMsg += " 'width' ";
        if (h == null)
            errorMsg += " 'height'";

        alert(errorMsg);
        throw new Error(errorMsg);
    }

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    var img = new Image();
    img.src = imgSrc;

    this.Intersects = function (shape) {
        var offset = 0;
        if (shape.radius != null)
            offset = shape.radiusus;

        if (this.Contains(shape.x - offset, shape.y - offset) || this.Contains(shape.x + shape.width - offset, shape.y - offset) ||
            this.Contains(shape.x - offset, shape.y + shape.height - offset) || this.Contains(shape.x + shape.width - offset, shape.y + shape.height - offset)) {
            return true;
        }
        else if (shape.Contains(this.x - offset, this.y - offset) || shape.Contains(this.x + this.width - offset, this.y - offset) ||
            shape.Contains(this.x - offset, this.y + this.height - offset) || shape.Contains(this.x + this.width - offset, this.y + this.height - offset)) {
            return true;
        }

        return false;
    };

    this.Contains = function (x, y) {
        if (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height)
            return true;
        else
            return false;
    };

    this.Draw = function (ctx) {
        ctx.drawImage(img, this.x, this.y);
    };
};

var downTime = 0;
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(event) {
    if (event.keyCode == 32) {
        downTime = Date.now();
    }
};

function keyUpHandler(event) {
    var elapsedTime = Math.abs(downTime - Date.now());
    if (elapsedTime <= 200) {
        if (player.rect.y >= 330)
            player.Jump();
    }
};