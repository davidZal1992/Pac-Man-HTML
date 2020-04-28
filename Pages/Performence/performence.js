var moveKeys={};



var ballsMatch
var monsters
var smallColorBall
var mediumColorBall
var largeColorBall
var time
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
},       "You cannot use the same key for movment");

jQuery.validator.addMethod("movedown", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveleft").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".moveright").val();
},       "You cannot use the same key for movment");

jQuery.validator.addMethod("moveleft", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveright").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".movedown").val();
},       "You cannot use the same key for movment");

jQuery.validator.addMethod("moveright", function(value, element) {

    return this.optional(element) || value.toString()!==$(".moveleft").val()&&value.toString()!==$(".moveup").val()&&value.toString()!==$(".movedown").val();
},       "You cannot use the same key for movment");


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
$( ".moveup" ).keydown(function(e) {
  var buttonPressed=e.keyCode
    e.preventDefault();
    if(longButton(buttonPressed)!=="")
      {
        let newKey=longButton(buttonPressed);
        moveKeys['up']=newKey.value;
        $(".moveup").val(newKey.key);
        $(".moveup").css("width","35%")
        moveKeys['up']=e.keyCode;
        return;
      }
    if(shortButton(buttonPressed)!=="")
      {
        let newKey=shortButton(buttonPressed);
        console.log(newKey)
        moveKeys['up']=newKey.value;
        $(".moveup").val(newKey.key);
        $(".moveup").css("width","48px")
        moveKeys['up']=e.keyCode;
        return;
      }

      let key=String.fromCharCode(e.keyCode+32);
      let upperCaseKey=(key.toUpperCase())
      $(".moveup").val(upperCaseKey);
      $(".moveup").css("width","25px")
      moveKeys['up']=e.keyCode;
      }
  );

 
//movedown
$( ".movedown" ).keydown(function(e) {
  var buttonPressed=e.keyCode
    e.preventDefault();
    if(longButton(buttonPressed)!=="")
      {
        let newKey=longButton(buttonPressed);
        moveKeys['down']=newKey.value;
        $(".movedown").val(newKey.key);
        $(".movedown").css("width","35%")
        moveKeys['up']=e.keyCode;
        return;
      }
    if(shortButton(buttonPressed)!=="")
      {
        let newKey=shortButton(buttonPressed);
        console.log(newKey)
        moveKeys['down']=newKey.value;
        $(".movedown").val(newKey.key);
        $(".movedown").css("width","48px")
        moveKeys['up']=e.keyCode;
        return;
      }

      let key=String.fromCharCode(e.keyCode+32);
      let upperCaseKey=(key.toUpperCase())
      $(".movedown").val(upperCaseKey);
      $(".movedown").css("width","25px")
      moveKeys['down']=e.keyCode;
      }
  );

//move right
$( ".moveright" ).keydown(function(e) {
  var buttonPressed=e.keyCode
    e.preventDefault();
    if(longButton(buttonPressed)!=="")
      {
        let newKey=longButton(buttonPressed);
        moveKeys['right']=newKey.value;
        $(".moveright").val(newKey.key);
        $(".moveright").css("width","35%")
        moveKeys['up']=e.keyCode;
        return;
      }
    if(shortButton(buttonPressed)!=="")
      {
        let newKey=shortButton(buttonPressed);
        console.log(newKey)
        moveKeys['right']=newKey.value;
        $(".moveright").val(newKey.key);
        $(".moveright").css("width","48px")
        moveKeys['up']=e.keyCode;
        return;
      }

      let key=String.fromCharCode(e.keyCode+32);
      let upperCaseKey=(key.toUpperCase())
      $(".moveright").val(upperCaseKey);
      $(".moveright").css("width","25px")
      moveKeys['right']=e.keyCode;
      }
  );



//move left
$( ".moveleft" ).keydown(function(e) {
  var buttonPressed=e.keyCode
    e.preventDefault();
    if(longButton(buttonPressed)!=="")
      {
        let newKey=longButton(buttonPressed);
        moveKeys['left']=newKey.value;
        $(".moveleft").val(newKey.key);
        $(".moveleft").css("width","35%")
        moveKeys['up']=e.keyCode;
        return;
      }
    if(shortButton(buttonPressed)!=="")
      {
        let newKey=shortButton(buttonPressed);
        console.log(newKey)
        moveKeys['left']=newKey.value;
        $(".moveleft").val(newKey.key);
        $(".moveleft").css("width","48px")
        moveKeys['up']=e.keyCode;
        return;
      }

      let key=String.fromCharCode(e.keyCode+32);
      let upperCaseKey=(key.toUpperCase())
      $(".moveleft").val(upperCaseKey);
      $(".moveleft").css("width","25px")
      moveKeys['left']=e.keyCode;
      }
  );



  
  
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
    ballsMatch=$(this).val();
});


   //Monsters size

    $('#monster').on('change keyup', function() {
    this.monsters=$(this).val();
    }); 


    //Timer set
    $('#timer').on('change keyup', function() {
        this.time=$(this).val();
        }); 

  longButton = otherButtons =>{
    console.log(otherButtons)
    switch(otherButtons)
        {
            case(38):
           return {key:"ARROW UP",value:38};
            case(40):
            return {key:"ARROW DOWN",value:40};
            case(37):
            return {key:"ARROW LEFT",value:37};
            case(39):
            return {key:"ARROW RIGHT",value:39};
            case(103):
            return {key:"NUMPAD 7",value:103};
            case(105):
            return {key:"NUMPAD 9", value:105};
            case(97):
            return {key:"NUMPAD 1", value:97};
            case(99):
            return {key:"NUMPAD 3", value:99};
            case(101):
            return {key:"NUMPAD 5", value:101};
            case(8):
            return {key:"BACKSPACE",value:8};
            case(104):
            return {key:"NUMPAD 8",value:104};
            case(98):
            return {key:"NUMPAD 2",value:98};
            case(100):
            return {key:"NUMPAD 4",value:100};
            case(102):
            return {key:"NUMPAD 6",value:102};
            case(34):
            return {key:"PAGE DOWN", value:34};
            case(33):
            return {key:"PAGE UP", value:33};
            case(45):
            return {key:"INSERT",value:45};
            case(36):
            return {key:"HOME", value:36};
            case(35):
            return {key:"END", value:35};
            case(46):
            return {key:"DELETE", value:12};
            case(144):
            return {key:"Num Lock",value:144};
            case(20):
            return {key:"Caps Lock",value:20};
            case(16):
            return {key:"SHIFT",value:16};
            case(17):
            return {key:"CTRL",value:17};
            case(32):
            return {key:"SPACE",value:32};
            case(13):
            return {key:"ENTER",value:13};
            default:
            return "";
        }
  };

  shortButton = shortButtons =>{
    switch(shortButtons){

          case(192):
           return {key:"`",value:192};
            case(189):
            return {key:"-",value:189};
            case(187):
            return {key:"=",value:187};
            case(111):
            return {key:"/",value:111};
            case(106):
            return {key:"*",value:106};
            case(9):
            return {key:"TAB",value:9};
            case(18):
            return {key:"ALT",value:18};
            case(191):
            return {key:"/",value:191};
            case(190):
            return {key:".",value:190};
            case(188):
            return {key:",",value:188};
            case(186):
            return {key:";",value:186};
            case(222):
            return {key:"'",value:222};
            case(220):
            return {key:'\\',value:220};
            case(219):
            return {key:'[',value:219};
            case(221):
            return {key:"]",value:221};
            case(112):
            return {key:'F1',value:112};
            case(113):
            return {key:'F2',value:113};
            case(114):
            return {key:'F3',value:114};
            case(115):
            return {key:'F4',value:115};
            case(116):
            return {key:'F5',value:116};
            case(117):
            return {key:'F6',value:117};
            case(118):
            return {key:'F7',value:118};
            case(119):
            return {key:'F8',value:119};
            case(120):
            return {key:'F9',value:120};
            case(121):
            return {key:'F10',value:121};
            case(122):
            return {key:'F11',value:122};
            case(123):
            return {key:'F12',value:123};
            case(49):
            return {key:'1',value:49};
            case(50):
            return {key:'2',value:50};
            case(51):
            return {key:'3',value:51};
            case(52):
            return {key:'4',value:52};
            case(53):
            return {key:'5',value:53};
            case(54):
            return {key:'6',value:54};
            case(55):
            return {key:'7',value:55};
            case(56):
            return {key:'8',value:56};
            case(57):
            return {key:'9',value:57};
            case(48):
            return {key:'0',value:48};

            default:
            return "";

    }
  }
$(".random").click(function(e) {
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
    $(".moveright").css("width","55%")
    moveKeys['up']=38;
    moveKeys['down']=40;
    moveKeys['right']=39;
    moveKeys['left']=37;
}

ballNumbers = () =>{
    let balls=Math.floor(Math.random() * 31) + 50;
    let monster=Math.floor(Math.random() * 4) + 1;
    $('#ball').val(balls);
    $('#monster').val(monster); 
  
}
chooseColor =()=>{
    //5Balls
    $('#5balls').val("#"+((1<<24)*Math.random()|0).toString(16));
    $('#15balls').val("#"+((1<<24)*Math.random()|0).toString(16));
    $('#25balls').val("#"+((1<<24)*Math.random()|0).toString(16));
}

setTimer =()=>{
    var time= Math.floor(Math.random() * 1000) + 60
    $('#timer').val(time);
}

$('#formsettings').submit(function(e){
  e.preventDefault();
  if ($(this).valid() !== true) {
  }
  else{

    smallColorBall= $('#5balls').val();
    mediumColorBall= $('#15balls').val();
    largeColorBall= $('#25balls').val();

  
    ballsMatch=$('#ball').val();
    monsters=$('#monster').val(); 

    timer=$('#timer').val();
    
  $('#box').children().hide();
  $('#logo').show();
   $('#navbar').show();
   $('#or').text("Welcome " +userName +"!")
   $('<p id="currentMsg"> <span style="text-decoration:underline; color:gray;">Keys:</span><br> Move up:' +$(".moveup").val() + '<br> Move down:' +$(".movedown").val() +'<br>Move left:' + $(".moveleft").val()+
   '<br> Move right: ' +$(".moveright").val() + '<br><br>  <span style="text-decoration:underline; color:gray;">Time:</span> <br>Time per game: '+ timer +  '<br><br><span style="text-decoration:underline; color:gray;">Structre:</span><br>'+' Number of food balls :' +ballsMatch +
   '<br>    Number of monsters: '+monsters+
   '<br> Color of 5 points balls: <span><i style="color:'+smallColorBall+';"class="fas fa-circle"></i></i><span>'+
   '<br> Color of 15 points balls:<span><i style="color:'+mediumColorBall+';"class="fas fa-circle"></i></i><span>'+
   '<br>  Color of 25 points balls: <span><i style="color:'+largeColorBall+';"class="fas fa-circle"></i></i><span>'+
   '</p>').appendTo('#currentMsg')
   $('#startgame').show();
   $("#song").get(0).play();
   $('#video1')[0].play();
   $("#video1").get(0).pause();
   Start();
  }
  return false;
})



});