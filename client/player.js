Player = function() {

    this.rect = new Rectangle(250, 330, 25, 25);

    this.animation = new Animation(60, 30, 0, 0, 8, "img/CatRun.png", 12, 2, 4);

    this.gravity = 1;

    this.jumpVelocity = 0;
    this.JUMP_MAX = 1.8;
    this.jumping = false;

    this.SetPosition = function(x,y, mod) {
        if (mod == null || !mod) {

            if (x != null)
                this.rect.x = x;
            if (y != null)
                this.rect.y = y;
        }
        else
        {
            if(x != null)
                this.rect.x += x;
            if(y != null)
                this.rect.y += y;
        }
    }

    this.Update = function() {
        this.animation.Update();
        this.animation.position.Set(this.rect.x, this.rect.y);
        if(this.jumping)
        {
            this.animation.SetRow(3);
            this.animation.SetColumn(1);
            this.rect.y -= this.jumpVelocity;
            this.jumpVelocity -= 0.028;

            if(this.jumpVelocity <= 0) {
                this.jumping = false;
            }
        }
        else if(this.rect.y < 330) {
            this.rect.x += 0.02;
            this.rect.y += this.gravity;
            this.animation.SetRow(0);
            this.animation.SetColumn(0);
        }
    }

    this.Jump = function()
    {
        if (!this.jumping)
        {
            this.jumpVelocity = this.JUMP_MAX;
            this.jumping = true;
        }
    };

    this.Draw = function(ctx) {
        this.animation.Draw(ctx);
    };
};