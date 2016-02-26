Background = function(x, y) {
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    var city_img = new Image();
    city_img.src = "img/city2.jpg";

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
    this.Draw = function(ctx) {
        this.x -= this.speed;
        ctx.drawImage(city_img, this.x, this.y);
        ctx.drawImage(city_img, this.x-canvas.width, this.y);
        if (this.x <= 1)
            this.x = canvas.width;
    };
};