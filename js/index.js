let level = 0;
let enableKey = true;
let enableButton = false;

let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

function playSound(soundName) {
    let sound = new Audio(`./sounds/${soundName}.mp3`)
    sound.play();
}

function startOver() {
    level = 0;
    enableKey = true;
    enableButton = false;
    gamePattern.splice(0, gamePattern.length);
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(userChosenColor) {
    if (userChosenColor !== gamePattern.shift()) {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over! Press Any Key to Restart");
        startOver();
    }
    else if (gamePattern.length == 0) {
        nextSequence();
        enableButton = false;
    }
}

function nextSequence() {
    level++;
    let count = 0;

    $("h1").text(`Level ${level}`);

    const interval = setInterval(function () {
        count++;

        let randomNumber = Math.round((Math.random() * 3));
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        let randomButton = $(`#${randomChosenColor}`);
        randomButton.fadeOut(100).fadeIn(100);

        playSound(randomChosenColor);
        animatePress(randomChosenColor);

        if (count == level) {
            enableButton = true;
            clearInterval(interval);
        }
    }, 1000);
}

$(".btn").click(function () {
    if (enableButton) {
        let userChosenColor = $(this).attr("id");

        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userChosenColor);
    }
});

$(document).keydown(function () {
    if (enableKey) {
        nextSequence();
        enableKey = false;
    }
});