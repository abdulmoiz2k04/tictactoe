// Dynamic Mode Change
const mode = document.querySelector("#mode")
let body = document.querySelector("body")
let current_mode = "dark"
mode.addEventListener("click", ()=>{
    if (current_mode === "dark"){
        mode.innerText = "Dark Mode";
        current_mode = "light";
        body.style.backgroundColor = "whitesmoke";
        body.style.color = "black";
    }else{
        mode.innerText = "Light Mode";
        current_mode = "dark";
        body.style.backgroundColor = "black";
        body.style.color = "whitesmoke";
    }
})

// Dynamic Player Names
let player1name = prompt("1st Player Name: ");
let player2name = prompt("2nd Player Name: ");
const p1name = document.querySelector("#p1name")
const p2name = document.querySelector("#p2name")
p1name.innerText = player1name;
p1name.style.color = "green";
p2name.innerText = player2name;
p2name.style.color = "green";

// winning patterns
const win_patterns = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
]

// game functionality
let boxes = document.querySelectorAll(".box");
let turnO = true;
let clicks = 0;
let p1sc = 0;
let p2sc = 0;
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if (turnO){
            box.innerText = "O";
            turnO = false;
            box.style.color = "green";
            box.style.textShadow = "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00ff00, 0 0 20px #00ff00, 0 0 25px #00ff00, 0 0 30px #00ff00, 0 0 35px #00ff00";
            clicks++;
        }else{
            box.innerText = "X";
            turnO = true;
            box.style.color = "purple";
            box.style.textShadow = "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #800080, 0 0 20px #800080, 0 0 25px #800080, 0 0 30px #800080, 0 0 35px #800080";
            clicks++;
        }
        box.disabled = true;
        check_winner();
        if(clicks===9){
            winner.innerText = `GAME DRAW!`;
            winner_msg.classList.remove("hide");
        }
    })
})
// winner checker
const check_winner = () =>{
    for (let pattern of win_patterns){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1!=0 && position2!=0 && position3!=0){
            if (position1 === position2 && position2 === position3){
                show_winner(position1);
            }
        }
    }
}
// score tracker
const score_tracker = (player) => {
    if (player === "O"){
        p1sc++;
        const p1score = document.querySelector("#p1score");
        p1score.innerText = p1sc;
        p1score.style.color = "blue";        
    }else{
        p2sc++;
        const p2score = document.querySelector("#p2score");
        p2score.innerText = p2sc;
        p2score.style.color = "blue";       
    }
}

// enabling and disabling boxes

const disable_box =()=>{
    for (let box of boxes){
        box.disabled = true;
    }
}

const enable_box =()=>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// display winner
winner_msg = document.querySelector(".winner_msg");
winner = document.querySelector("#winner");

const show_winner = (win) =>{
    winner.innerText = `${win} is the winner!`;
    winner_msg.classList.remove("hide");
    disable_box();
    clicks = "";
    score_tracker(win);
}

// New Game Button
const new_game =()=>{
    turnO = true;
    winner_msg.classList.add("hide");
    enable_box();
}
reset = document.querySelector("#reset");
reset.addEventListener("click", new_game);

