let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-Btn');
let newBtn = document.querySelector('#new-Btn');
let body = document.querySelector('body');
let descisionSection = document.querySelector(".decision-section")
let decision = document.querySelector("#decision")

let turnO = true;
let count = 0;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const resetGame = () => {
    turnO = true;
    enableBoxes();
    descisionSection.classList.add("hide")
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            // player O
            box.innerText = "O";
            turnO = false;
        } else {
            // player X
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            showDraw();
        }
    });
});



const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

const showWinner = (winner) => {
    decision.innerText = `Winner is '${winner}'`
    descisionSection.classList.remove("hide");
    disabledBoxes();
}

const showDraw = () => {
    decision.innerText = `Game Draw`
    descisionSection.classList.remove("hide");
}

newBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('click', resetGame)