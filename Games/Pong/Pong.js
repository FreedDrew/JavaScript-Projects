//Functions start AFTER a click anywhere

window.addEventListener("mousedown",function() {
     var pong;

/*
    ====================================================================================================================
        BASIC GAME DISPLAY SETTINGS
    ====================================================================================================================
*/
    let canvas = document.querySelector("canvas");
    pong = document.querySelector("canvas");
    pong = pong.getContext("2d");
    pong.width = 750;
    pong.height = 500;

/*
    ====================================================================================================================
        BASIC BALL SETTINGS
    ====================================================================================================================
*/
//Start position of ball in middle
    let ballX = pong.width / 2;
    let ballY = pong.height / 2;
//Ball size
    let ballRadius= 6;
//Velocity
    let dx = 5;
    let dy = 5;
//Paddle size
    let user_paddleX = 0, user_paddleY = 80, user_paddleWIDTH = 8, user_paddleHEIGHT = 60;
    let computer_paddleX = 742, computer_paddleY = 80, computer_paddleWIDTH = 8, computer_paddleHEIGHT = 60;
//Game score

    let user_SCORE = 0;
    let computer_SCORE = 0;

//Computer speed
    let computer = 5;

/*
  ====================================================================================================================
      USER CONTROLS
  ====================================================================================================================
*/
window.addEventListener("mousemove",function(event) {
    user_paddleY = event.clientY - innerHeight/ 2 - user_paddleHEIGHT / 2 + pong.height / 2; event.preventDefault();
});

/*
    ====================================================================================================================
        RESET AFTER EACH POINT
    ====================================================================================================================
*/
    function reset(){
        ballX = pong.width/2;
        ballY = pong.height/2;
        dx = 5;
        dy = 5;
        pong.fillStyle = '#00FAFF';
    }

/*
    ====================================================================================================================
        GAME ANIMATIONS
    ====================================================================================================================
 */

    function animate(){
        requestAnimationFrame(animate);
        pong.clearRect(0,0,pong.width,pong.height);
        pong.beginPath();
//Ball
        pong.arc(ballX, ballY, ballRadius, 0, Math.PI*2, false);
        pong.fillStyle = '#00FAFF';
        pong.fill();
        pong.stroke();
//Player paddle
        pong.beginPath();
        pong.fillRect(user_paddleX,user_paddleY,user_paddleWIDTH,user_paddleHEIGHT);
//Computer paddle
        pong.beginPath();
        pong.fillRect(computer_paddleX,computer_paddleY,computer_paddleWIDTH,computer_paddleHEIGHT);

/*
    ====================================================================================================================
         PADDLE BOUNCING
    ====================================================================================================================
*/
//User bouncing
        function user_paddleBOUNCE(){
            if (ballX-ballRadius < 0){
                if (ballY >= user_paddleY && ballY <= user_paddleY + user_paddleHEIGHT) {
                    dx = -dx + 0.5;
                }
                else{
                    computer_SCORE++;
                    reset();
                }
            }
        }
//Computer bouncing
        function computer_paddleBOUNCE(){
            if (ballX + ballRadius > pong.width){

                if (ballY >= computer_paddleY && ballY <= computer_paddleY + computer_paddleHEIGHT) {
                    dx = -dx - 0.5;
                }
                else{
                    user_SCORE++;
                    reset();
                }
            }
        }
//Border bouncing
        function borderBOUNCE(){
            if(ballY + ballRadius > pong.height || ballY - ballRadius < 0){
                dy = -dy;
            }
        }

/*
    ====================================================================================================================
        GAME BOARD LIMITS
    ====================================================================================================================
 */
        function stayInCanvas(){
            if(user_paddleY + user_paddleHEIGHT > pong.height){
                user_paddleY = pong.height - user_paddleHEIGHT;
            }
            if(user_paddleY < 0){
                user_paddleY = 0;
            }
            if(computer_paddleY < 0){
                computer_paddleY = 0;
            }
        }

/*
    ====================================================================================================================
        COMPUTER CONTROLS
    ====================================================================================================================
*/
        function player_computer(){
            if(computer_paddleY + computer_paddleHEIGHT / 2 < ballY){
                computer_paddleY += computer;
            }
            else {
                computer_paddleY  -= computer;}
        }

/*
    ====================================================================================================================
        BALL MOVEMENT AFTER ALL VARIABLES
    ====================================================================================================================
 */
        function move_ball(){
            ballX += dx;
            ballY += dy;
        }

/*
    ====================================================================================================================
        END OF GAME SCREEN
    ====================================================================================================================
*/
        function game_result(t) {
            if (user_SCORE === 5 || computer_SCORE === 5) {
                pong.fillStyle = 'white';
                pong.font = 'bold 30px Arial';
                ballX = pong.width/2;
                ballY = pong.height/2;
                if (computer_SCORE === 5) {
                    pong.fillText('Computer won!', pong.width/2.25, 50);
                    clearInterval(t);

                } else {
                    pong.fillText('You won!',pong.width/2.25, 50);
                    clearInterval(t);
                }
            } else {
                pong.fillStyle = 'white';
                pong.font = 'bold 30px Arial';
                pong.fillText(user_SCORE+'  -  '+computer_SCORE,pong.width/2.25, 50);
            }
        }
/*
    ====================================================================================================================
        CALLING MADE FUNCTIONS
    ====================================================================================================================
*/


                move_ball();
                user_paddleBOUNCE();
                computer_paddleBOUNCE();
                borderBOUNCE();
                stayInCanvas();
                player_computer();
                game_result();

        }

        animate();


});