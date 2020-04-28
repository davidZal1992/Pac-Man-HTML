$(document).ready(function() {
$( "#homePage" ).click(function() {
  clearInterval(interval)
  $("#song").get(0).pause();
  $('#startgame').hide();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#welcome').show();
  })

  $( "#registerPage" ).click(function() {
    $('#startgame').hide();
    clearInterval(interval)
    $("#song").get(0).pause();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#register').show();
  })

  $( "#loginPage" ).click(function() {
    $('#startgame').hide();
    clearInterval(interval)
    $("#song").get(0).pause();
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#login').show();
  });
});