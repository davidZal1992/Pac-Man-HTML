


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

 
var users=  JSON.parse(localStorage.getItem('users'));
console.log(users)
if(!users)
{
    users=[{'userName':'p','password':'p'}]
}
else{
    let found=users.find(user => user.userName==='p')
    if(!found)
    {
        users.push(pUser)
    }
}