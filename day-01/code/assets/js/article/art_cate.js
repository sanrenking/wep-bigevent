$(function () {

    var layer = layui.layer;
    var form = layui.form;
    initArtCateList();
    //获取文章的分类列表
    function initArtCateList() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                // if (res.status !== 0) {
                //     return layer.msg('获取文章列表失败')
                // }
                var htmlStr = template('tpl-table', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        // console.log(22);
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })
    //通过代理的形式 为form-add 表单绑定submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        // console.log(33);
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类不成功')
                }

                initArtCateList();

                layer.msg('新增文章分类成功');
                // 根据索引关闭弹出层
                layer.close(indexAdd);
            }
        })
    });

    //通过代理的形式  为btn-edit 绑定点击事件
    var indexEdit = null
    $('tbody').on('click', ".btn-edit", function () {
        // 弹出一个修改文章分类信息的层
        // console.log(22);
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
        // console.log(id);
        //发起请求 获取对应的分类数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    //通过代理的形式 为修改分类的表单绑定 submit 事件 
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败')
                }
                layer.msg('更新分类信息成功')
                layer.close(indexEdit);
                initArtCateList();

            }
        })
    });
    // 删除事件  删除文章分类列表文章
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除 
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败')
                    }
                    layer.msg('删除文章分类成功')
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    })







})