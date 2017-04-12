$(document).ready(function(){
  
  var alert = $('.alert-message h3').text();
  if(alert === ""){
    $('.alert-message').hide();
  }else{
    $('.alert-message').fadeOut(7000);
    $('.alert-message a').click(function(event){
    event.preventDefault();
    $('.alert-message').hide();
  });
  }
  
})