
$(document).ready(function() {
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    $('#welcome').show();
    $('#wfooter').show();

    $( "#button1" ).click(function() {
        $('#welcome').hide();
        $('#register').show();
      });

      $( "#button2" ).click(function() {
        $('#welcome').hide();
        $('#login').show();
      });
});

 