$(function() {

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-z ]+$/i.test(value);
},      "Please use only letters");


jQuery.validator.addMethod("lettersNumbers", function(value, element) {
    return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value);
},      "The password must contain number and letters");



    $('#form').validate({
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
            console.log(element.attr('id'))
        }

});
}
)
