$(function () {
    var lauer = layui.layer
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ], samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新旧密码不能相同"
            }
        }, rePwd: function (value) {
            if (value !== $('[name=newPwd').val()) {
                return '确认密码和新密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        //组织表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败')
                }
                return layer.msg('重置密码成功');
                $('.layui-form')[0].reset()
            }
        })
    })

})