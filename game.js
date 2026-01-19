const canvas = document.getElementById("game");
const cxt = canvas.getContext("2d");

let playerOneX = 20;
let playerOneY = 100;

let playerTwoX = 20;
let playerTwoY = 180;

let obstacles = [
    {x:200, y:80, w:20,h:60},
    {x:300, y:150, w:20, h:60},
]

let finishLine = 550;

const size = 30;

function draw() {
    cxt.clearRect(0, 0, canvas.clientWidth, canvas.height);

    cxt.fillStyle = "red";
    cxt.fillRect(finishLine, 0, 10, canvas.height);

    cxt.fillStyle = "blue";
    cxt.fillRect(playerOneX, playerOneY, size, size);

    cxt.fillStyle = "green";
    cxt.fillRect(playerTwoX, playerTwoY, size, size);

    cxt.fillStyle = "black";
    obstacles.forEach(obs => {
        cxt.fillRect(obs.x, obs.y, obs.w, obs.h);
    })
    
}

function checkCollision(x,y){
    return obstacles.some(obs =>
        x<obs.x + obs.w && x+size>obs.x && y<obs.y + obs.h && y+size>obs.y
    )
}


function reset() {
    playerOneX = 20;
    playerOneY = 100;
    playerTwoX = 20;
    playerTwoY = 180;
}

function win() {
    if(playerOneX >= finishLine){
        alert("Vitória do Azul!");
        reset();
    }
    if(playerTwoX >= finishLine){
        alert("Vitória do Verde!");
        reset();
    }
}

document.addEventListener("keydown",(tecla) =>{
    if(tecla.key === "ArrowRight") playerOneX += 10;
    if(tecla.key === "ArrowUp" && playerOneY > 5) playerOneY -= 10;
    if(tecla.key === "ArrowDown" && playerOneY < 270) playerOneY += 10;
    
    if(tecla.key === "d") playerTwoX += 10;
    if(tecla.key === "w" && playerTwoY > 5) playerTwoY -= 10;
    if(tecla.key === "s" && playerTwoY < 270) playerTwoY += 10;

    if(checkCollision(playerOneX,playerOneY)){
        alert("Jogador Azul acertou um obstáculo!");
        reset();
    }
    if(checkCollision(playerTwoX,playerTwoY)){
        alert("Jogador Verde acertou um obstáculo!");
        reset();
    }

    win();
})

function update() {
    draw();
    requestAnimationFrame(update);
}

update()
