var {userName,password} = userAuth;

$(function() {
$('#formlogin').validate({
    rules: {        
    username:{
        required:true
    },
    password:{
        required:true
    }
    },
    errorPlacement: function(error, element) {
        console.log('#invalid-' + element.attr('id'))
        error.appendTo('#invalid-' + element.attr('id'));
        
    }
});
});


//check if exists
$(document).ready(function(e){
    $('#formlogin').submit(function(){
        if ($(this).valid() !== true) {
        }
        else{
       userName=($('#usernamelog').val());   
       password=($('#passwordlog').val());
    
       const found = users.find(user => user.userName===userName);
       if(found)
       {
            if(found.password.toString()===password.toString())
                  {
                    $('#box').children().hide();
                    $('#logo').show();
                     $('#navbar').show();
                     console.log(userName);
                     $('#settings').show();
                     return false;
                  }   
            else{
                    $('#errormsg').text('Wrong password,try again')
            }
       }   
       else{
                //TODO:user doenst exists
                $('#errormsg').text("The user dosn't exists, you must be registered")
       }
        }
        return false;
    });
    });