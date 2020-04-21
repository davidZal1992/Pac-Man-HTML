$(document).ready(function(){
    //move up
    
    $( "#test" ).keypress(function(e) {
        console.log();
        let key=String.fromCharCode(e.keyCode);
        let upperCaseKey=(key.toUpperCase())
       $("#test").val(upperCaseKey);
        $("#test").css("width","25px")
      });
});