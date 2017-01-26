$(document).ready(function () {
    var ue = UE.getEditor('container');

    var $title = $('#blog-title');
    var $type = $('#blog-type');
    var $tag = $('.blog-tag');
    var $save = $('.btn-save');
    var $submit = $('.btn-submit');
    ue.ready(function() {
        // 存为草稿
        $save.on('click', function(event) {
            event.preventDefault();
            $.notice('博客上传提示：', '保存成功！', undefined, 300, 150);
        });


        // 立即发布
        $submit.on('click', function (event) {
            event.preventDefault();
            //获取html内容，返回: 
            var content = ue.getContent();
            var article = {
                title: $title.val(),
                type: $type.val(),
                tag: $tag.val(),
                content: content,
            };
            $.each(article,function(index,item) {
                if(article[index] == ''){
                    $.notice('博客上传提示：', '部分信息未填写！', undefined, 300, 150);  
                }
            });
            $.ajax({
                type: "POST",
                url: "##",
                data: article,
                success: function(data){

                $.notice('博客上传提示：', '发布成功！', undefined, 300, 150);
                
                }
            });
        });
        
    });
});