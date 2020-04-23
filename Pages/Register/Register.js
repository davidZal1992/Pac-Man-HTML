$(function() {

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
},      "Please use only letters");


jQuery.validator.addMethod("lettersNumbers", function(value, element) {
    return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
},      "The password must contain number and letters");



    $('#formreg').validate({
        rules: {
        email:{
            required:true,
            email:true
        },
        name:{
            required:true,
            lettersonly: true
        },
        username:{
            required:true,
        },
        password:{
            required:true,
            lettersNumbers:true,
            minlength:6
        },
        date:{
            required:true,
        }
        
    
    },
        errorPlacement: function(error, element) {
            error.appendTo('#invalid-' + element.attr('id'));
        }

});
}
)

var userAuth={
    'userName':'',
    'fullName':'',
    'email':'',
    'password':'',
    'date':''
}


//if all input valid so register user
$(document).ready(function(e){

$('#formreg').submit(function(){
    if ($(this).valid() !== true) {
    }
    else{
   userAuth['email']=($('#email').val());
   userAuth['userName']=($('#username').val());
   userAuth['name']=($('#name').val());
   userAuth['password']=($('#password').val());
   userAuth['date']=($('#date').val());
   users.push(userAuth);
   console.log(userAuth)
   console.log(users)
   localStorage.setItem('users',JSON.stringify(users))
    $('#box').children().hide();
    $('#logo').show();
    $('#navbar').show();
    userName=userAuth['userName'];
    $('#settings').show();
    }
    return false;
});
});