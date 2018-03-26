// cards/deck selected
const pics = ["anchor", "anchor", "bolt", "bolt", "bomb", "bomb", "bicycle", "bicycle", "cube", "cube", "diamond", "diamond", "leaf", "leaf", "paper-plane-o", "paper-plane-o"];
const deck = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");

const opened = document.getElementsByClassName("open");
const matchedCards = document.getElementsByClassName("match");
let matched = [];


const restart = document.querySelector(".restart");
const play = document.querySelector(".play-again");

const movesCount = document.querySelector(".moves");
let moves = 0;

const endPanel = document.querySelector(".end");

const stars = document.querySelectorAll(".fa-star");
const timer = document.querySelector(".timer");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");
let sec = 0;
let min = 0;
const timeScore = document.getElementById("time-score");

reset();
startGame();
cardOpen();


//event listeners for buttons

play.addEventListener("click", function () {
    reset();
    startGame();

});

restart.addEventListener("click", function () {
    reset();
    startGame();
});


function startGame() {
    shuffle(pics);
    makeCard();
    gradient();
}

function reset() {
    moves = 0;
    movesCount.innerText = "0"
    matched = [];
    starsReset();
    clearInterval(tm);
    clearTime();
    endPanel.style.visibility = "hidden";
    for (var i = 0; i < cards.length; i++) {
        cards[i].innerHTML = "";
        cards[i].className = "card";
    }
}


function makeCard() {
    for (var i = 0; i < pics.length; i++) {
        var icon = document.createElement("i");
        icon.className = `fa fa-${pics[i]} icon`;
        cards[i].appendChild(icon);
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function time() {
    sec += 1;
    seconds.innerText = sec;
    if (sec < 10) {
        seconds.innerText = "0" + sec;
    }
    if (sec == 60) {
        min += 1;
        sec = 0;
        seconds.innerText = "00";
        minutes.innerText = min;
        if (min < 10) {
            minutes.innerText = "0" + min;
        }
    }
    if (min > 0) {
        timeScore.innerText = `${min} m ${sec} s`;
    } else {
        timeScore.innerText = `${sec} s`;
    }

};



var tm;
function startTime() {
    tm = setInterval(time, 1000);
}


function clearTime() {
    sec = 0;
    min = 0;
    seconds.innerText = "00";
    minutes.innerText = "00";
}


function cardOpen() {
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function (e) {

            if (moves == 0) {
                startTime();
            }
            if (this.className !== "card match" && opened.length != 2) {
                this.className = "card open show";

                countMoves();

                if (opened.length == 2) {
                    if (opened[1].innerHTML === opened[0].innerHTML) {

                        setTimeout(function () {
                            for (var j = 1; j >= 0; j--) {
                                opened[j].className = "card match";
                                matched.push(opened[j]);
                            };
                        }, 500);
                        setTimeout(function () {
                            if (matched.length == 16) {
                                endPanel.style.visibility = "visible";
                                clearInterval(tm);
                            }
                        }, 1000);

                    } else {
                        setTimeout(function () {
                            for (var j = 1; j >= 0; j--) {
                                opened[j].className = "card open show unmatched";
                            }
                        }, 500);
                        setTimeout(function () {
                            for (var j = 1; j >= 0; j--) {
                                opened[j].className = "card";
                            }
                        }, 1000);
                    }
                }
            } else {
                e.preventDefault();
            }
        });
    }
}

function countMoves() {
    moves += 1;
    movesCount.innerText = moves;
    switch (moves) {
        case 33:
            stars[2].className = "fa fa-star-o";
            stars[5].className = "fa fa-star-o";
            break;
        case 45:
            stars[1].className = "fa fa-star-o";
            stars[4].className = "fa fa-star-o";
            break;
        case 57:
            stars[0].className = "fa fa-star-o";
            stars[3].className = "fa fa-star-o";
            break;
    }
}


function starsReset() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = "fa fa-star";
    }
}

// generates random gradient

function newGradient() {
    let d = Math.floor(Math.random() * 361);
    let r1 = Math.floor(Math.random() * 256);
    let g1 = Math.floor(Math.random() * 256);
    let b1 = Math.floor(Math.random() * 256);
    let a1 = Math.random().toFixed(2);
    let r2 = Math.floor(Math.random() * 256);
    let g2 = Math.floor(Math.random() * 256);
    let b2 = Math.floor(Math.random() * 256);
    let a2 = Math.random().toFixed(2);
    let col1 = `rgba( ${r1}, ${g1}, ${b1}, ${a1})`;
    let col2 = `rgba( ${r2}, ${g2}, ${b2}, ${a2})`;
    return `linear-gradient(${d}deg, ${col1}, ${col2})`;
}

// applies generated gradient

function gradient() {
    deck.style.background = newGradient();
}
