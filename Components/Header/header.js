$(document).ready(function() {
$( "#homePage" ).click(function() {
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#welcome').show();
  })

  $( "#registerPage" ).click(function() {
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#register').show();
  })

  $( "#loginPage" ).click(function() {
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#login').show();
  });
});