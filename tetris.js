var COLS = 10, ROWS = 20;
var board = [];
var lose;
var interval;
var intervalRender;
var current;
var currentX, currentY;
var freezed;
var shapes = [
    [1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 1, 1]
];

var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple',
];

function newShape() {
    var id = Math.floor(Math.random() * shapes.length);
    var shape = shapes[id];

    current = [];
    for (var y = 0; y < 4; ++y) {
        current[y] = [];
        for (var x = 0; x < 4; ++x) {
            var i = 4 * y + x;
            if (typeof shape[i] != 'undefined' && shape[i]) {
                current[y][x] = id + 1;
            }
            else {
                current[y][x] = 0;
            }
        }
    }

    freezed = false;
    currentX = 3;
    currentY = 0;
}

function init() {
    for (var y = 0; y < ROWS; ++y) {
        board[y] = [];
        for (var x = 0; x < COLS; ++x) {
            board[y][x] = 0;
        }
    }
    freezed = false;
    currentX = 5;
    currentY = 0;
}



function freeze() {
    for (var y=0; y<4 ; ++y){
        for (var x=0; x<4; ++x){
            if (current[y][x]){
                board[y + currentY][x + currentX] = current[y][x];
            }
        }
    }
    freezed = true;
}

function tick() {
    if (valid(0, 1)) {
        ++currentY;
    }
    else {
        freeze();
        valid(0, 1);
        clearLines();
        if (lose) {
            clearAllIntervals();
            return false;
        }
        newShape();
    }
}

function rotate(current) {
    var newCurrent = [];
    for (var y = 0; y < 4; ++y) {
        newCurrent[y] = [];
        for (var x = 0; x < 4; ++x) {
            newCurrent[y][x] = current[3 - x][y];
        }
    }
    return newCurrent;
}


function clearLines() {
    for (var y = ROWS - 1; y >= 0; --y) {
        var rowFilled = true;
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] == 0) {
                rowFilled = false;
                break;
            }
        }
        if (rowFilled) {
            let bgmusic = document.getElementById('bgmusic');
            let lineclear = document.getElementById('lineclear');
            if (bgmusic instanceof HTMLAudioElement && lineclear instanceof HTMLAudioElement) {
                bgmusic.pause();
                lineclear.currentTime = 0;
                lineclear.play();
                lineclear.onended = function () {
                    bgmusic.play();
                };
            }

            for (var yy = y; yy > 0; --yy) {
                for (var x = 0; x < COLS; ++x) {
                    board[yy][x] = board[yy - 1][x];
                }
            }

            ++y;
        }
    }
}

function keyPress(key) {
    switch (key) {
        case 'left':
            if (valid(-1)) {
                --currentX;
            }
            break;
        case 'right':
            if (valid(1)) {
                ++currentX;
            }
            break;
        case 'down':
            if (valid(0, 1)) {
                ++currentY;
            }
            break;
        case 'rotate':
            var rotated = rotate(current);
            if (valid(0, 0, rotated)) {
                current = rotated;
            }
            break;
        case 'drop':
            while (valid(0, 1)) {
                ++currentY;
            }
            tick();
            break;
    }
}

function valid(offsetX, offsetY, newCurrent) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for (var y = 0; y < 4; ++y) {
        for (var x = 0; x < 4; ++x) {
            if (newCurrent[y][x]) {
                if (typeof board[y + offsetY] == 'undefined'
                    || typeof board[y + offsetY][x + offsetX] == 'undefined'
                    || board[y + offsetY][x + offsetX]
                    || x + offsetX < 0
                    || y + offsetY >= ROWS
                    || x + offsetX >= COLS) {
                    if (offsetY == 1 && freezed) {
                        lose = true;
                        document.getElementById('playbutton').disabled = false;
                    }
                    return false;
                }
            }
        }
    }
    return true;
}



window.playButtonClicked = function () {
    newGame();
    document.getElementById("playbutton").disabled = true;
};

function newGame() {
    clearAllIntervals();
    intervalRender = setInterval(render, 30);
    init();
    newShape();
    render();
    lose = false;
    intervalRender = setInterval(render, 30);
    interval = setInterval(tick, 400);
}

function clearAllIntervals() {
    clearInterval(interval);
    clearInterval(intervalRender);
}

document.addEventListener("click",function(){
    const bgmusic =
    document.getElementById("bgmusic");
    if (bgmusic && bgmusic.paused){
        bgmusic.volume=0.5;
        bgmusic.play();
    }
})
