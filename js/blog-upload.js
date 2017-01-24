$(document).ready(function () {
    var ue = UE.getEditor('container');

    var $title = $('#blog-title');
    var $type = $('#blog-type');
    var $tag = $('.blog-tag');
    var $save = $('.btn-save');
    var $submit = $('.btn-submit');
    ue.ready(function() {

        $submit.on('click', function (event) {
            //获取html内容，返回: 
            var content = ue.getContent();
            var article = {
                title: $title.val(),
                type: $type.val(),
                tag: $tag.val(),
                content: content,
            };
            if(article.title == '') {
                alert("部分信息未填！");
                return ;
            }
            if(article.type == '') {
                alert("部分信息未填！");
                return ;
            }
            if(article.tag == '') {
                alert("部分信息未填！");
                return ;
            }
            if(article.content == '') {
                alert("部分信息未填！");
                return ;
            }
            $.ajax({
                type: "POST",
                url: "##",
                data: article,
                success: function(data){
                
                alert("发布成功！")
                
                }
            });
        });
    });
});