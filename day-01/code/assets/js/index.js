$(function () {
    //调用用户的信息
    getUserInfo();
    var layer = layui.layer;
    //给退出按钮注册事件 
    $('#btnlogout').on('click', function () {
        //弹出退出提示框 
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清楚本地存储的token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html'
            //layui 关闭提示框
            layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //请求头 配置对象
        headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg('获取用户信息失败')
            }
            //渲染用户的头像
            renderAvatar(res.data);
        },
        // 不论成功还是失败,最终都会调用complete 回调函数 
        complete: function (res) {
            //控制用户的权限
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //    强制清空token  访问权限
                localStorage.removeItem('token')
                //强制跳转到登陆页面 
                location.href = '/login.html'
            }
        }
    })
}
//渲染用户的头像 
function renderAvatar(user) {
    //获取用户的昵称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

