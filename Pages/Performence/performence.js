var moveKeys={
    up:'',
    down:'',
    left:'',
    right:'',
}


var balls;
var monsters;

var smallColorBall;
var mediumColorBall;
var largeColorBall;

var time;

const up=38;
const down=40;
const left=37;
const right=39;




$(function() {

    jQuery.validator.addMethod("fiftyninty", function(value, element) {
        return this.optional(element) || value>=50&&value<=90;
},      "Please insert number between 50-90");


jQuery.validator.addMethod("onefour", function(value, element) {
    return this.optional(element) || value>=1&&value<=4;
},       "Please insert number between 1-4");

jQuery.validator.addMethod("timer", function(value, element) {
    return this.optional(element) || value>=60;
},       "The minimum time for game is 60 seconds");

jQuery.validator.addMethod("moveup", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveleft").val()&&value.toString()!==$(".moveright").val()&&value.toString()!==$(".movedown").val();
},       "You cannot use the key for movment");

jQuery.validator.addMethod("movedown", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveleft").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".moveright").val();
},       "You cannot use the key for movment");

jQuery.validator.addMethod("moveleft", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveright").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".movedown").val();
},       "You cannot use the key for movment");

jQuery.validator.addMethod("moveright", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveleft").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".movedown").val();
},       "You cannot use the key for movment");


    $('#formsettings').validate({
        rules: {
        ball:{
            required:true,
            fiftyninty:true

        },
        monster:{
            required:true,
            onefour:true
        },
        timer:{
            required:true,
            timer:true
        },
        upmove:{
            required:true,
            moveup:true
        },
        downmove:{
            required:true,
            movedown:true
        },
        leftmove:{
            required:true,
            moveleft:true
        },
        rightmove:{
            required:true,
            moveright:true
        }
    },
        errorPlacement: function(error, element) {
            console.log('fail')
            error.appendTo('#invalid-' + element.attr('id'));
        }

});
}
)
$(document).ready(function(){

//Movments events:
//move up
$( ".moveup" ).keypress(function(e) {
    e.preventDefault();
    let key=String.fromCharCode(e.keyCode);
    let upperCaseKey=(key.toUpperCase())
   $(".moveup").val(upperCaseKey);
    $(".moveup").css("width","25px")
    moveKeys.moveup=$(".moveup").val();
  });

  $( ".moveup" ).keyup(function(e) {
    e.preventDefault();

      var otherButtons=e.keyCode
      var keyPressed=checkType(otherButtons)
      if(keyPressed!=="")
      {
        moveKeys.moveup=$(".moveup").val();
        $(".moveup").val(keyPressed);
        $(".moveup").css("width","55%")
      }
  });
//movedown
  $( ".movedown" ).keypress(function(e) {
    e.preventDefault();
    let key=String.fromCharCode(e.keyCode);
    let upperCaseKey=(key.toUpperCase())
   $(".movedown").val(upperCaseKey);
    $(".movedown").css("width","25px")
    moveKeys.movedown=$(".movedown").val();
  });

  $( ".movedown" ).keyup(function(e) {
    e.preventDefault();
      var otherButtons=e.keyCode
      var keyPressed=checkType(otherButtons)
      if(keyPressed!=="")
      {
        $(".movedown").val(keyPressed);
        $(".movedown").css("width","55%")
        moveKeys.movedown=$(".movedown").val();
      }
  });

//move left
  $( ".moveright" ).keypress(function(e) {
    e.preventDefault();
    let key=String.fromCharCode(e.keyCode);
    let upperCaseKey=(key.toUpperCase())
   $(".moveright").val(upperCaseKey);
    $(".moveright").css("width","25px")
    moveKeys.moveright=$(".moveright").val()
  });

  $( ".moveright" ).keyup(function(e) {
    e.preventDefault();
      var otherButtons=e.keyCode
      var keyPressed=checkType(otherButtons)
      if(keyPressed!=="")
      {
        moveKeys.moveright=$(".moveright").val()
        $(".moveright").val(keyPressed);
        $(".moveright").css("width","55%")
      }
  });


  //move right
  $( ".moveleft" ).keypress(function(e) {
    e.preventDefault();
    let key=String.fromCharCode(event.keyCode);
    let upperCaseKey=(key.toUpperCase())
    moveKeys.moveleft=$(".moveleft").val()
   $(".moveleft").val(upperCaseKey);
    $(".moveleft").css("width","25px")
  });

  $( ".moveleft" ).keyup(function(e) {
    e.preventDefault();
      var otherButtons=e.keyCode
      var keyPressed=checkType(otherButtons)
      if(keyPressed!=="")
      {
        moveKeys.moveleft=$(".moveleft").val()
        $(".moveleft").val(keyPressed);
        $(".moveleft").css("width","55%")
      }
  });

//Balls color change event

  $('#5balls').change(function(){
   smallColorBall=$(this).val();
  });

  $('#15balls').change(function(){
    mediumColorBall=$(this).val();
   });

   $('#25balls').change(function(){
    largeColorBall=$(this).val();
   });

   //Ball size

   $('#ball').on('change keyup', function() {
        this.balls=$(this).val();
});


   //Monsters size

    $('#monster').on('change keyup', function() {
    this.monsters=$(this).val();
    }); 


    //Timer set
    $('#timer').on('change keyup', function() {
        this.time=$(this).val();
        }); 

  checkType = otherButtons =>{
    switch(otherButtons)
        {
            case(38):
           return "ARROW UP";
            case(40):
            return "ARROW DOWN";
            case(37):
            return "ARROW LEFT";
            case(39):
            return "ARROW RIGHT";
            case(36):
            return "NUMPAD 7";
            case(33):
            return "NUMPAD 9";
            case(35):
            return "NUMPAD 1";
            case(34):
            return "NUMPAD 3";
            case(12):
            return "NUMPAD 5";
            default:
            return "";
        }
  };
$(".random").click(function(e) {
    console.log('asdsad')
    setMove();
    ballNumbers();
    chooseColor();
    setTimer();
    return false;
  });


setMove = () =>{
    $(".moveup").val("ARROW UP");
    $(".moveup").css("width","55%")
    $(".movedown").val("ARROW DOWN");
    $(".movedown").css("width","55%")
    $(".moveleft").val("ARROW LEFT");
    $(".moveleft").css("width","55%")
    $(".moveright").val("ARROW RIGHT");
    $(".movelright").css("width","55%")
    moveKeys.moveup=$(".moveup").val()
    moveKeys.movedown=$(".movedown").val()
    moveKeys.moveright=$(".moveright").val()
    moveKeys.moveleft=$(".moveleft").val()
}

ballNumbers = () =>{
    var balls=Math.floor(Math.random() * 31) + 50;
    var monsters=Math.floor(Math.random() * 4) + 1;
    $('#ball').val(balls);
    this.balls=balls;
    $('#monster').val(monsters); 
    this.monsters=monsters;
}
chooseColor =()=>{
    //5Balls
    $('#5balls').val("#"+((1<<24)*Math.random()|0).toString(16));
    $('#15balls').val("#"+((1<<24)*Math.random()|0).toString(16));
    $('#25balls').val("#"+((1<<24)*Math.random()|0).toString(16));
    smallColorBall= $('#5balls').val();
    mediumColorBall= $('#15balls').val();
    largeColorBall= $('#25balls').val();
}

setTimer =()=>{
    var time= Math.floor(Math.random() * 1000) + 60
    $('#timer').val(time);
    timer=time;
}
});