//constants
let inputdir = { x: 0, y: 0 }
let foodsound = new Audio('eat.mp3');
let gameover = new Audio('gameover.mp3');
let music = new Audio('music.mp3');
let click = new Audio('click.mp3');
let speed =5;
let lastPaintTime = 0;
let score=0;
let snakarr = [{ x: 5, y: 6 }]
food={x:10,y:10};



 
//methods
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    music.play();
    //updating snake and food
    if(isCollide(snakarr)){
        music.pause();
        inputdir={x:0,y:0};
        gameover.play();
        alert("Game Over");
        snakarr=[{x:5,y:6}];
        score=0;
    }


function isCollide(snake){
    //if you eat yourself
     for(i=1; i<snakarr.length; i++){
        if(snake[i].x===snake[0].x &&snake[i].y===snake[0].y){
            gameover.play();
            return true;

        }

     }
     if(snake[0].x>=16 || snake[0].x<=0 || snake[0].y>=16 || snake[0].y<=0 ){
        gameover.play();
        return true;
     }
}

    //if you have eaten the food ->increment the score and regenerate food

     if(snakarr[0].y===food.y && snakarr[0].x===food.x){
        snakarr.unshift({x:snakarr[0].x +inputdir.x,y:snakarr[0].y+inputdir.y});
        foodsound.play();
        score+=1;
        scores.innerHTML="Your Score "+score;
        let a=2;
        let b=13
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
     }

     //moving the snake
     for(let i=snakarr.length-2;   i>=0;   i--){
        snakarr[i+1]={...snakarr[i]};
     }

     snakarr[0].x+=inputdir.x;
     snakarr[0].y+=inputdir.y;




    //dispaly the snake
    board.innerHTML = " ";
    snakarr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}






//main logic
window.requestAnimationFrame(main);
document.addEventListener('keydown',e=>{
    inputdir={x:0,y:1}//start the game
    click.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:
            break;
        
    }
}); 