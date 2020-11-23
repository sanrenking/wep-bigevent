$(function () {

    var layer = layui.layer;
    initArtCateList();
    //获取文章的分类列表
    function initArtCateList() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                var htmlStr = template('tpl-table', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }
















})