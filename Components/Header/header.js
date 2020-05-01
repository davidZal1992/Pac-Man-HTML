$(document).ready(function() {
$( "#homePage" ).click(function() {
  clearInterval(interval)
  for(var i=1; i<=4; i++)
  {
    $("#live"+i).css('visibility', 'visible');
  }
  monsterShapes=[];
  candyShapes=[];
  candyStop=false;
  $("#song").get(0).pause();
  $('#startgame').hide();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#welcome').show();
  })

  $( "#registerPage" ).click(function() {
    $('#startgame').hide();
    for(var i=1; i<=4; i++)
		{
			$("#live"+i).css('visibility', 'visible');
		}
    clearInterval(interval);
    monsterShapes=[];
		candyShapes=[];
		candyStop=false;
    $("#song").get(0).pause();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#register').show();
  })

  $( "#loginPage" ).click(function() {
    $('#startgame').hide();
    clearInterval(interval)
    monsterShapes=[];
		candyShapes=[];
		candyStop=false;
    for(var i=1; i<=4; i++)
		{
			$("#live"+i).css('visibility', 'visible');
		}
    $("#song").get(0).pause();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#login').show();
  });
});