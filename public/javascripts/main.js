$(document).ready(function(){
  
  //====== Alert message controling like flsh messages=========
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
// ============================================================

  //======= Sign Up and LOgin Form Animation ==================
    $('.auth').click(function(e){
      e.preventDefault();
      $('.login-form').slideToggle(600);
      $('.signup-form').slideToggle(600);
    })

    $('.auth-signup').click(function(e){
      e.preventDefault();
      $('.signup-form').slideToggle(600);
      $('.login-form').slideToggle(600);
    })
 // =============================================================

 //======= ON input focus show update btn =======================
  $('.profile-details input').focus(function(){
    $('button.update-btn').fadeIn(1000);
    $(this).focusout(function(){
      $('button.update-btn').fadeOut(2000);
    })
  });
 // ===========================================================

 

})