$(function () { 
  //点击注册界面的注册事件
$('#link_reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

//点击登录界面的注册事件
  $('#link_login').on('click',function () {
    $('.reg-box').hide()
    $('.login-box').show()
    })


    
 })