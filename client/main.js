var canvas = document.getElementById("canvas");
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

var ctx = canvas.getContext('2d');

var dog_animation = new Animation(122.5, 68, 0, 0, 9, "img/DogRun.png", 12, 3, 3);
dog_animation.position.Set(50, 300);

var player = new Player();
var background = new Background(0, 0, ctx);

var bins = new Array();

var run;
var play;

function stop() {
    console.log("Reset Game");
    clearInterval(run);
    clearInterval(play);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dog_animation = new Animation(122.5, 68, 0, 0, 9, "img/DogRun.png", 12, 3, 3);
    dog_animation.position.Set(50, 300);
    player = new Player();
    background = new Background(0, 0, ctx);
    bins = new Array();
}

function start() {
    timerPlay();
    timerRun();
}

function GenerateGarbageBin() {
    bins.push(new Rectangle(700, 320, 30, 40, "img/trashcan.gif"));
}

var timerRun = function () {
    run = setInterval(function () {
        player.Update();
        dog_animation.Update();
        for (var i = 0; i < bins.length; i++) {
            bins[i].x--;
            if (bins[i].x <= 0) {
                var index = bins.indexOf(bins[i]);
                bins.splice(index, 1);
            }
            if (bins[i].Intersects(player.rect)) {
                player.rect.x--;
                if (dog_animation.position.x + dog_animation.width >= player.rect.x + 50) {
                    alert("Geschnappt! Spiel wird neu gestartet.");
                    stop();
                    start();
                }
            }
        }

    }, 10);
};

var timerPlay = function () {
    play = setInterval(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.Draw(ctx);
        dog_animation.Draw(ctx);
        player.Draw(ctx);

        for (var i = 0; i < bins.length; i++) {
            bins[i].Draw(ctx);
        }
    }, 20);
};

(function loop() {
    var rand = Math.round(Math.random() * (6000)) + 3000;
    setTimeout(function () {
        GenerateGarbageBin();
        loop();
    }, rand);
}());