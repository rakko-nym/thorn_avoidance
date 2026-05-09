const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let keys = {} ;
let playerX = canvas.width / 2 ;
let playerY = canvas.height - 35 ;
let score = 0 ;
let gameOver = false ;
const playerSpeed = 15 ;
const playerSize = 20 ;
const thornWidth = 15 ;
const thornHeight = 30 ;
let randomX = null ;
let nomber = [];
class thorn {
constructor(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
}
fall(){
    this.y += this.speed;
}

draw(){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.x + thornWidth / 2, this.y + thornHeight);
    ctx.lineTo(this.x, this.y);
    ctx.lineTo(this.x + thornWidth, this.y);
    ctx.fill();
if (
    this.x + thornWidth > playerX && // 1.トゲの右端が、プレ左より右
    this.x < playerX + playerSize && // 2.トゲの左端が、プレ右より左
    this.y + thornHeight > playerY && // 3.トゲの下端が、プレ上より下
    this.y < playerY + playerSize    // 4.トゲの上端が、プレ下より上
) {
gameOver = true ;
}
}
}

function player (){
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'blue';
ctx.fillRect(playerX,playerY,playerSize,playerSize);
if(keys.ArrowRight === true){playerX += playerSpeed;};
if(keys.ArrowLeft === true){playerX -= playerSpeed;};
};
const scoreElement = document.getElementById('score-display');
const gameOverElement = document.getElementById('game-over');
function scoreUpdate (){
    score++ ;
    scoreElement.textContent = "スコア: " + score;
};
function clone (){
randomX = Math.random()*canvas.width ;
nomber.push(new thorn(randomX,0,3 + score / 150));
}
function down (){
for(let i=0;i<nomber.length;i++){
    nomber[i].fall();
    nomber[i].draw();
}
}
const spawnTimer = setInterval(clone,50);

addEventListener('keyup',(event)=>{
keys[event.key] = false ;
});
addEventListener('keydown',(event)=>{
keys[event.key] = true ;
});
//スマホ版はAIが実装
function setupMobileBtn(id, keyName) {
  const btn = document.getElementById(id);
  
  // 指が触れた時
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // ズームやスクロールを防止
    keys[keyName] = true;
  }, {passive: false});

  // 指が離れた時（または画面外に指が流れた時）
  btn.addEventListener('touchend', () => {
    keys[keyName] = false;
  });
}
function gameLoop (){
player();
down();
scoreUpdate();
if(gameOver){
gameOverElement.textContent = "GAME OVER";
}
else {
gameOverElement.textContent = "";
requestAnimationFrame(gameLoop);}
}

gameLoop();