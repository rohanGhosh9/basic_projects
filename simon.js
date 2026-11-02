let gameSeq = [];
let userSeq = [];
const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let acceptingInput = false;

const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");
document.addEventListener("keydown", startGame);
h2.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    acceptingInput = false; 
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);

    setTimeout(() => {
        gameFlash(randBtn);
        acceptingInput = true; 
    }, 400);
}

function checkAns() {
    const currentIdx = userSeq.length - 1;

    if (userSeq[currentIdx] === gameSeq[currentIdx]) {
        if (userSeq.length === gameSeq.length) {
            acceptingInput = false;
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Press any key or tap here to restart`;
        document.body.classList.add("game-over");
        
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 250);

        reset();
    }
}

function btnPress() {
    if (!started || !acceptingInput) return;

    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    acceptingInput = false;
}



















