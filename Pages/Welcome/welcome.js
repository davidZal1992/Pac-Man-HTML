
$(document).ready(function() {
    $('body > :not(#welcome)').hide();  // hide everything that isn't #myDiv
$('#welcome').appendTo('body'); 
$('body').removeClass().addClass('welcomePage');


$( "#button1" ).click(function() {

    $('body > :not(#register)').hide();

  });

});

 