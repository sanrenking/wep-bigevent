$(function () {
  //点击注册界面的注册事件
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  //点击登录界面的注册事件
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从layui获取form对象 
  var form = layui.form
  //通过form.verify({}) 函数自定义校验规则
  form.verify({
    //密码的校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //校验第二次输入密码的确认
    repwd: function (value) {
      //通过value形参拿到用户输入确认的密码值
      //然后在拿到用户输入的密码值
      //两个作判断是否相等
      //不相等的话就返回给用户一个信息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次输入的密码不一致'
      }
    }
  })
  // 提交注册表单
  var layer = layui.layer;

  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    console.log(data);
    $.ajax({
      url: "http://ajax.frontend.itheima.net/api/reguser",
      method: 'post',
      data,
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
      },
    })
    // layer.msg('注册成功,请登录')
    // $('#link_login').click();
    layer.msg('注册成功,请登录', {
      time: 2000 //2秒关闭（如果不配置，默认是3秒）
    }, function () {
      $('#link_login').click();
      $('#form_reg')[0].reset()
    });
  })
  // 登录事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登陆失败');
        layer.msg('登录成功');
        localStorage.setItem('token', res.token)
        location.href = 'index.html'
      }
    })
  })

})