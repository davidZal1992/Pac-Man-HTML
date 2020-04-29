var context;

//pac shape
var shape = new Object();
var candyStop=false;
//monsters
var monsterShapes=[];
//candy
var candyShapes=[];

//main board
var board;

//items in gameplay(e.g times, starttime, score..)
var score;
var start_time;
var time_elapsed;
var interval;

//lives
var livesCounter=4;

//lastPosition
var last='right';

//remember value in cells before update new position of monster
var smallPointsBall;
var mediumPointsBall;
var largePointsBall;
var watchBack;
var livesBack;
var skeltonBack;


//end game
var endGame=false;
var downTime=0;


$(document).ready(function() {
	context = canvas.getContext("2d");

	$('#restart').click(function(){
		$(".lives").show();
		clearInterval(interval);
		monsterShapes=[];
		candyShapes=[];
		Start();
	})
	//Prevent scrolling
	$('#restartLose').click(function(){
		clearInterval(interval);
		$(".lives").show();
		$('#endPar').text("");
		endGame=false;
		var modal = document.querySelector(".GameOvermodal");
		modal.classList.toggle("show-modal");
		$("#video1").get(0).pause();
		$("#song").get(0).play();
		monsterShapes=[];
		Start();
	})
});

function Start() {
	var tempBalls=ballsMatch;
	livesCounter=4;
	window.addEventListener("keydown", function(e) {
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}, false);
	board = new Array();
	score = 0;
	var cnt = 150;
	var food_remain_small = ballsMatch*0.6;
	var food_remain_medium = ballsMatch*0.3;
	var food_remain_large = ballsMatch*0.1;
	var pacman_remain=1;
	start_time = new Date();
	for (var i = 0; i < 16; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3)||
				(i == 3 && j == 4)||
				(i == 3 && j == 5)||
				(i == 6 && j == 1)||
				(i == 6 && j == 2)||
				(i == 7 && j == 2)||
				(i == 8 && j == 2)||
				(i == 9 && j == 2)||

				(i == 9 && j == 3)||
				(i == 9 && j == 4)||
				(i == 9 && j == 5)||
				(i == 9 && j == 6)||

				(i == 14 && j ==9)||
				(i == 13 && j ==9)||
				(i == 12 && j ==9)||
				(i == 11 && j ==9)||

				(i == 14 && j ==8)||
				(i == 14 && j ==7)||
				(i == 14 && j ==6)||
				(i == 14 && j ==5)||

		
				(i == 14 && j ==1)||
				(i == 13 && j ==1)||
				(i == 12 && j ==1)||

				(i == 1 && j ==9)||
				(i == 2 && j ==9)||
				(i == 3 && j ==9)||
				(i == 4 && j ==9)||
				(i == 1 && j ==8)||

				(i == 5 && j ==5)||
				(i == 6 && j ==5)||
				(i == 7 && j ==5)||
				(i == 0 && j ==3)||
				(i == 0 && j ==2)||

				(i == 12 && j ==2)||
				(i == 12 && j ==3)||
				(i == 12 && j ==4)||
				(i == 12 && j ==5)


			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * tempBalls) / cnt) {
					randomNum = Math.floor(Math.random()*3);
					if(randomNum==0){
						if(food_remain_small!==0){
						food_remain_small--;
						}
						board[i][j] = 7;
					}
					if(randomNum==1){
						if(food_remain_medium!==0){
						food_remain_medium--;
					}
						board[i][j] = 8;
						}
					if(randomNum==2){
						if(food_remain_large!==0){
							food_remain_large--;
						}
						board[i][j] = 9;
					}
					tempBalls--;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
			
		}
		
	}

	while (food_remain_small > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 7;
		food_remain_small--;
	}

	while (food_remain_medium > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 8;
		food_remain_medium--;
	}

	while (food_remain_large > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 9;
		food_remain_large--;
	}
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j =emptyCell[1];
		pacman_remain--;
		board[shape.i][shape.j] = 2;

		
		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=12;

		 emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=13;

		emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]]=14;

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {

			keysDown[e.keyCode] = true;


		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);


	createMonsters(monsters)
	createCandy()
	interval=setInterval(UpdatePosition ,250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 15 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 15 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[moveKeys.up]) {
		return 1;
	}
	if (keysDown[moveKeys.down]) {
		return 2;
	}
	if (keysDown[moveKeys.left]) {
		return 3;
	}
	if (keysDown[moveKeys.right]) {
		return 4;
	}
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = timer-time_elapsed
	if(lblTime.value<60)
	{
		$("#lblTime").css('color','red');
	}
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			
			if (board[i][j] === 2) {
				if(x==1){
				make_base(center.x,center.y,'up')
				}
				else if(x==2){
				make_base(center.x,center.y,'down')
				}
				else if(x==3){
				make_base(center.x,center.y,'left')
				}
				else if(x==4){
				make_base(center.x,center.y,'right')
				}
				else
				make_base(center.x,center.y,last)
			}
				else if (board[i][j] === 7) {
					context = canvas.getContext("2d");
					context.beginPath();
					context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
					context.fillStyle = smallColorBall; //color
					context.fill();
					
					context = canvas.getContext("2d");
					context.font = '7pt';
					context.fillStyle = 'white';
					context.textAlign = 'center'
					context.textBaseline = 'middle'
					context.fillText('5', center.x, center.y)
					
			
				}
				else if (board[i][j] === 8) {
					context.beginPath();
					context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
					context.fillStyle = mediumColorBall; //color
					context.fill();

					context = canvas.getContext("2d");
					context.font = '9pt';
					context.fillStyle = 'white';
					context.textAlign = 'center'
					context.textBaseline = 'middle'
					context.fillText('15', center.x, center.y)
				}
				else if (board[i][j] === 9) {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
					context.fillStyle = largeColorBall; //color
					context.fill();

					context = canvas.getContext("2d");
					context.font = '11pt';
					context.fillStyle = 'white';
					context.textAlign = 'center'
					context.textBaseline = 'middle'
					context.fillText('25', center.x, center.y)
				
			}  else if (board[i][j] === 4) {
				context.beginPath();
				context.strokeStyle = "#fff";
				context.strokeRect(center.x - 30, center.y - 30, 60, 60);
				context.fill();
			
			}
			else if (board[i][j]=== 12)
			{
				var timerImage = document.getElementById('watch');
				context.drawImage(timerImage, center.x -20, center.y-20,40,40);
			}
			else if (board[i][j]=== 13)
			{
				var timerImage = document.getElementById('newLive');
				context.drawImage(timerImage, center.x -20, center.y-20,40,40);
			}
			else if (board[i][j]=== 14)
			{
				var timerImage = document.getElementById('skeleton');
				context.drawImage(timerImage, center.x-20 , center.y-20,40,40);
			}
			else if (board[i][j]=== 15)
			{
				var timerImage = document.getElementById('candy');
				context.drawImage(timerImage, center.x-20 , center.y-20,40,40);
			}
			if(board[i][j]==11)
			{
				var image = document.getElementById('monsterpic');
				context.drawImage(image, center.x -25, center.y-30,60,60);
			}
		}
	}
}





function UpdatePosition() {
	updateMonsterPosition()
	if(!candyStop){
	updateCandyPosition()
	}
	updatePacmanPosition()
	Draw(GetKeyPressed());
}

function updatePacmanPosition(){
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	//pacs moves
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4 ) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 16 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	//monster meeting
	if(board[shape.i][shape.j]==11)
	{
		if(livesCounter==0)
		{
			$("#song").get(0).pause();
			gameOver();
		}
		else{
		$("#live" +livesCounter).hide();
		livesCounter--;
		$("#song").get(0).pause();
		$("#errorsong").get(0).play();
		setTimeout(()=>{$("#song").get(0).play();},1000)
		for(var i=0; i<monsters; i++)
		{
			drawBack(monsterShapes[i])
		}
		monsterShapes=[]
		createMonsters(monsters)
	}
	}



	//score calculate
	if (board[shape.i][shape.j] == 7) {
		score=score+5;	
	}
	if (board[shape.i][shape.j] == 8) {
		score=score+15;	
	}
	if (board[shape.i][shape.j] == 9) {
		score=score+25;	
	}
	if (board[shape.i][shape.j] == 12) {
		downTime=30;
	}
	if(board[shape.i][shape.j]==15)
	{
	score=score+50;
	$("#song").get(0).pause();
	$("#points").get(0).play();
	setTimeout(()=>{$("#song").get(0).play();},400)
	candyStop=true;
	}
	//live decrease/increase
	if (board[shape.i][shape.j] == 13&&livesCounter!=4) {
			livesCounter++;
			$("#live"+livesCounter).show();
			$("#song").get(0).pause();
			$("#points").get(0).play();
			setTimeout(()=>{$("#song").get(0).play();},400)
	}
	if (board[shape.i][shape.j] == 14) {
		if(livesCounter!=0)
		{
			$("#live"+livesCounter).hide();
			livesCounter--;
			$("#song").get(0).pause();
			$("#errorsong").get(0).play();
			setTimeout(()=>{$("#song").get(0).play();},1000)
		}
		else{
			gameOver();
		}
	
}


	
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_elapsed=time_elapsed-downTime;
	if(time_elapsed-timer>0)
	{
		gameTimeOver()
	}
	if(endGame==true)
	{
		$("#song").get(0).pause();
		
	}

	if(checkEmptyFood())
	{
		gameWinner();
	}
}


function updateMonsterPosition()
{
	for(var i=0; i<monsters; i++)
	{
	
	drawBack(monsterShapes[i])

	var possibleMove=getPossibleMinimumDistance(monsterShapes[i].monShape);

		if(possibleMove==='up'){
		monsterShapes[i].monShape.j--;
		}
		if(possibleMove==='left'){
		monsterShapes[i].monShape.i--;
		}
		if(possibleMove==='right'){
		monsterShapes[i].monShape.i++;
		}
		if(possibleMove==='down'){
		monsterShapes[i].monShape.j++;
		}

	if(	board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==7){
		monsterShapes[i].smallBack=true;
	}
	else if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==8){
		monsterShapes[i].mediumBack=true;
	}
	else if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==9){
		monsterShapes[i].largeBack=true;
	}
	else if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==12){
		monsterShapes[i].watchBack=true;
	}
	else if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==13){
		monsterShapes[i].livesBack=true;
	}
	else if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==14){
		monsterShapes[i].skeltonBack=true;
	}

	if(board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]==2)
	{
		//TODO: IF YOU EAT BY MONSTER
	
		if(livesCounter==0)
		{
			gameOver();
			break;
		}
		else{
		$("#song").get(0).pause();
		$("#errorsong").get(0).play();
		setTimeout(()=>{$("#song").get(0).play();},1000)
		$("#live" +livesCounter).hide();
		livesCounter--;
		score=score-10;
		for(var j=0; j<monsters; j++)
		{
			drawBack(monsterShapes[j])
		}
		monsterShapes=[];
		i=0;
		createMonsters(monsters)
		}
	}	
	else
	{
		board[monsterShapes[i].monShape.i][monsterShapes[i].monShape.j]=11
	}
	}
}


function updateCandyPosition()

{
	drawBackforCandy(candyShapes[0]);

	var possibleMove = candyPossibleMove(candyShapes[0].candyShape)
	if(possibleMove==='up'){
		candyShapes[0].candyShape.j--;
	}
	if(possibleMove==='left'){
		candyShapes[0].candyShape.i--;
	}
	if(possibleMove==='right'){
		candyShapes[0].candyShape.i++;
	}
	if(possibleMove==='down'){
		candyShapes[0].candyShape.j++;
	}

if(	board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==7){
	candyShapes[0].smallBack=true;
}
else if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==8){
	candyShapes[0].mediumBack=true;
}
else if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==9){
	candyShapes[0].largeBack=true;
}
else if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==12){
	candyShapes[0].watchBack=true;
}
else if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==13){
	candyShapes[0].livesBack=true;
}
else if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==14){
	candyShapes[0].skeltonBack=true;
}

if(board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]==2)
{
	score=score+50;
	$("#song").get(0).pause();
	$("#points").get(0).play();
	setTimeout(()=>{$("#song").get(0).play();},400)
	candyStop=true;
}
else{
	board[candyShapes[0].candyShape.i][candyShapes[0].candyShape.j]=15;

	
}
}


function make_base(centerx,centery,direction){
var image = document.getElementById(direction);
context.drawImage(image, centerx-30, centery-30,60,60);
last=direction;
}


getPossibleMinimumDistance = (monsterShape) =>{

	distanceGoDown=[Math.sqrt(Math.pow((monsterShape.i)-shape.i,2)+Math.pow((monsterShape.j+1)-shape.j,2)),'down']
	distanceGoUp=[Math.sqrt(Math.pow((monsterShape.i)-shape.i,2)+Math.pow(monsterShape.j-1-shape.j,2)),'up'];
	distanceGoRight=[Math.sqrt(Math.pow((monsterShape.i+1)-shape.i,2)+Math.pow((monsterShape.j)-shape.j,2)),'right'];
	distanceGoLeft=[Math.sqrt(Math.pow((monsterShape.i-1)-shape.i,2)+Math.pow((monsterShape.j)-shape.j,2)),'left'];
	distances=[distanceGoDown,distanceGoLeft,distanceGoRight,distanceGoUp]


	distances.sort((a,b) => a[0]-b[0]);
		var value=Math.random()
		if(value>0.4){
		if(monsterPossibleMove(distances[0][1],monsterShape))
		{
			return distances[0][1];
		}
		else if(monsterPossibleMove(distances[1][1],monsterShape)){
			return distances[1][1]
		}
		else if(monsterPossibleMove(distances[2][1],monsterShape)){
			return distances[2][1]
		}
		else if(monsterPossibleMove(distances[3][1],monsterShape)){
			return distances[3][1]
		}
	}
	else
	{	
		if(monsterPossibleMove(distances[3][1],monsterShape))
		{
			return distances[3][1];
		}
		else if(monsterPossibleMove(distances[2][1],monsterShape)){
			return distances[2][1]
		}
		else if(monsterPossibleMove(distances[1][1],monsterShape)){
			return distances[1][1]
		}
		else if(monsterPossibleMove(distances[0][1],monsterShape)){
			return distances[0][1]
		}
	}
}


monsterPossibleMove = (string,monsterShape) =>{
	
		
		if(string==='left'&& monsterShape.i > 0 && board[monsterShape.i-1][monsterShape.j] != 4  && board[monsterShape.i-1][monsterShape.j] != 11 && board[monsterShape.i-1][monsterShape.j] != 15)
		return true;

		if(string==='up'&& monsterShape.j > 0 && board[monsterShape.i][monsterShape.j-1 ] != 4 && board[monsterShape.i][monsterShape.j-1 ] != 11  && board[monsterShape.i][monsterShape.j-1 ] != 15)
		return true;

		if(string==='right'&& monsterShape.i < 15 && board[monsterShape.i+1][monsterShape.j] != 4 && board[monsterShape.i+1][monsterShape.j] != 11 && board[monsterShape.i+1][monsterShape.j] != 15)
		return true;

		if(string==='down'&& monsterShape.j < 9 && board[monsterShape.i][monsterShape.j + 1] != 4 && board[monsterShape.i][monsterShape.j + 1] != 11 && board[monsterShape.i][monsterShape.j + 1] != 15)
		return true;

		return false;
}


candyPossibleMove = (candyShape) =>
{

	var number=Math.floor(Math.random()*4)
	if(number==0){

	if(candyShape.i > 0 && board[candyShape.i-1][candyShape.j] != 4  && board[candyShape.i-1][candyShape.j] != 11){
		return 'left';
	}
	}
	if(number==1){
		if(candyShape.j > 0 && board[candyShape.i][candyShape.j-1 ] != 4 && board[candyShape.i][candyShape.j-1 ] != 11)
		return 'up';
	}
	if(number==2){
		if(candyShape.i < 15 && board[candyShape.i+1][candyShape.j] != 4 && board[candyShape.i+1][candyShape.j] != 11)
		return 'right';
	}
	if(number==3){
		if( candyShape.j < 9 && board[candyShape.i][candyShape.j + 1] != 4 && board[candyShape.i][candyShape.j + 1] != 11)
		return 'down';
	}
}

createMonsters = (monsters) =>{
		
	for(var i=0; i<monsters; i++)
	{
		var monsterDetails=[];
		let monShape=new Object();
		monsterDetails.smallBack=false
		monsterDetails.mediumBack=false;
		monsterDetails.largeBack=false;
		monsterDetails.watchBack=false;
		monsterDetails.livesBack=false;
		monsterDetails.skeltonBack=false;
		if(board[i][0]==7){
			monsterDetails.smallBack=true;
			}
			else if(board[i][0]==8){
			monsterDetails.mediumBack=true;
			}
			else if(board[i][0]==9){
			monsterDetails.largeBack=true;
			}
			else if(board[i][0]==12){
			monsterDetails.watchBack=true;
			}
			else if(board[i][0]==13){
			monsterDetails.livesBack=true;
			}
			else if(board[i][0]==14){
			monsterDetails.skeltonBack=true;
			}
		
		board[i][0]=11
		monShape.i=i;
		monShape.j=0;

		monsterDetails.monShape=monShape;
		monsterShapes.push(monsterDetails);
	}

}

createCandy = () =>{
	let candyShape=new Object();
	let candyDetails=[];
	candyDetails.smallBack=false
	candyDetails.mediumBack=false;
	candyDetails.largeBack=false;
	candyDetails.watchBack=false;
	candyDetails.livesBack=false;
	candyDetails.skeltonBack=false;

		if(board[15][0]==7){
		candyDetails.smallBack=true;
		}
		else if(board[15][0]==8){
		candyDetails.mediumBack=true;
		}
		else if(board[15][0]==9){
		candyDetails.largeBack=true;
		}
		else if(board[15][0]==12){
		candyDetails.watchBack=true;
		}
		else if(board[15][0]==13){
		candyDetails.livesBack=true;
		}
		else if(board[15][0]==14){
		candyDetails.skeltonBack=true;
		}
		board[15][0]=15;
		candyShape.i=15;
		candyShape.j=0;
		console.log(candyShape)
		candyDetails.candyShape=candyShape;
		console.log(candyDetails)
		candyShapes.push(candyDetails);

}
gameOver = () =>{
	endGame=true;
	$("#song").get(0).pause();
	$('<p style="font-family:Bowlby One SC, cursive;  font-size:28px; color:black;">Score: <span style="color:blue">'+score+'</span><br>You Loser!!!</p>').appendTo("#endPar")
	clearInterval(interval);
	var modal = document.querySelector(".GameOvermodal");
	$('.GameOvermodal').show();
	modal.classList.toggle("show-modal");
	$('#winner').hide();
	$('#video1')[0].play();

}

gameTimeOver = () =>{
	endGame=true;
	$("#song").get(0).pause();
	clearInterval(interval);
	if(score<100){
	$('<p style="font-family:Bowlby One SC, cursive;  font-size:28px; color:black;">Score: <span style="color:blue">You are better than '+score+' points! </span></p>').appendTo("#endPar")
	var modal = document.querySelector(".GameOvermodal");
	$('.GameOvermodal').show();
	modal.classList.toggle("show-modal");
	$('#winner').hide();
	$('#video1')[0].play();
	}
	else{
	$('<p style=font-family:Bowlby One SC, cursive;  font-size:28px; color:black;">Score: <span style="color:orange">'+score+'</span><br>Winner!!!</p>').appendTo("#endPar")
	var modal = document.querySelector(".GameOvermodal");
	$('.GameOvermodal').show();
	modal.classList.toggle("show-modal");
	$('#loser').hide();
	$('#video2')[0].play();
	}

}

gameWinner = () =>{

	endGame=true;
	$("#song").get(0).pause();
	clearInterval(interval);
	$('<p style="font-family:Bowlby One SC, cursive; font-size:28px; color:black;">Score: <span style="color:orange">'+score+'</span><br>Winner!!!</p>').appendTo("#endPar")
	var modal = document.querySelector(".GameOvermodal");
	$('.GameOvermodal').show();
	modal.classList.toggle("show-modal");
	$('#loser').hide();
	$('#video2')[0].play();
}


drawBack = (shapeDetails) =>{
	if(shapeDetails.smallBack){
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=7;
		shapeDetails.smallBack=false;
	}
	else if(shapeDetails.mediumBack){
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=8;
		shapeDetails.mediumBack=false;
	}
	else if(shapeDetails.largeBack){
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=9;
		shapeDetails.largeBack=false;
	}
	else if(shapeDetails.watchBack)
	{
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=12;
		shapeDetails.watchBack=false;
	}
	else if(shapeDetails.livesBack)
	{
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=13;
		shapeDetails.livesBack=false;
	}
	else if(shapeDetails.skeltonBack)
	{
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=14;
		shapeDetails.skeltonBack=false;
	}
	else
	{
		board[shapeDetails.monShape.i][shapeDetails.monShape.j]=0;
	}
}


drawBackforCandy = (shapeDetails) =>{
	if(shapeDetails.smallBack){
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=7;
		shapeDetails.smallBack=false;
	}
	else if(shapeDetails.mediumBack){
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=8;
		shapeDetails.mediumBack=false;
	}
	else if(shapeDetails.largeBack){
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=9;
		shapeDetails.largeBack=false;
	}
	else if(shapeDetails.watchBack)
	{
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=12;
		shapeDetails.watchBack=false;
	}
	else if(shapeDetails.livesBack)
	{
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=13;
		shapeDetails.livesBack=false;
	}
	else if(shapeDetails.skeltonBack)
	{
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=14;
		shapeDetails.skeltonBack=false;
	}
	else
	{
		board[shapeDetails.candyShape.i][shapeDetails.candyShape.j]=0;
	}
}



checkEmptyFood = () =>{

for(var i=0; i<16; i++)
{
	for(var j=0; j<10; j++)
	{
		if(board[i][j]==9||board[i][j]==8||board[i][j]==7)
		{
			return false;
		}
	}
}


for(var i=0; i<monsters; i++)
{
	if(monsterShapes[i].smallBack==true || monsterShapes[i].mediumBack==true || monsterShapes[i].largeBack==true  )
	{
		return false;
	}
}
return true;
}