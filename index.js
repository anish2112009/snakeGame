const playBoard = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const checkElement = document.querySelector(".check-box");
const imageElement = document.querySelector(".image");


let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}  // snake ka head ka initial location
];
let on=true;
let a = 1;
let b = 39;
food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;



// Game Functions
function main(ctime) {
    if(on)  musicSound.play();
    window.requestAnimationFrame(main);       // ye fir bar bar main ko call krega aur game loop bn jaega
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return; // for controlling fps  nhi to bhut fast fast render hoga
    }
    lastPaintTime = ctime;
    gameEngine();        // game ko run krega bar bar
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >=40 || snake[0].x <=0 || snake[0].y >=40 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
       if(on) gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
      if(on)  musicSound.play();
        score = 0; 
        scoreElement.innerText = `Score: ${score}`;
        let a = 1;
        let b = 39;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
      if(on)  foodSound.play();
        score += 1;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});//snake ka head k coordinate m input coordinate append kr diye
        let a = 1;
        let b = 39;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}//math.random 0 and 1 bich random no. generate krega
       
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]}; // put every snake part to its front part position
    }

    snakeArr[0].x += inputDir.x;   //snake ka head ka nya position kyunki snake move kr rha
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    playBoard.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        playBoard.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playBoard.appendChild(foodElement);


}







// Main logic starts here

window.requestAnimationFrame(main); // main function lo call krega ye


document.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
  if(on)  musicSound.play();
  if(on)  moveSound.play();
    if((e.key === "ArrowUp" ||e.key=="w")&& inputDir.x!= 1) {
        inputDir.x = 0;
        inputDir.y = -1;
    } else if((e.key === "ArrowDown" || e.key=="z") && inputDir.y!= -1) {
        inputDir.x = 0;
        inputDir.y = 1;
    } else if((e.key === "ArrowLeft" || e.key=="a")&& inputDir.x!= 1) {
        inputDir.x = -1;
        inputDir.y= 0;
    } else if((e.key === "ArrowRight" || e.key=="d")&& inputDir.x != -1) {
        inputDir.x = 1;
        inputDir.y = 0;
    }

});

// checkElement.addEventListener( "change", () => {
//     if ( checkElement.checked ) {
//         imageElement.src ="off.png";
//         musicSound.pause();
//         gameOverSound.pause();
//         on=false;

//     } else {
//         imageElement.src ="on.png";
//         console.log('htt');
//         musicSound.play();
//         on=true;
//     }
//  });
 
imageElement.addEventListener( "click", () => {
    
    if ( !checkElement.checked ) {
        imageElement.src ="off.png";
        musicSound.pause();
        gameOverSound.pause();
        on=false;
        checkElement.checked=true;

    } else {
        imageElement.src ="on.png";
       // console.log('htt');
        musicSound.play();
        on=true;
        checkElement.checked=false;;
    }
    
 });