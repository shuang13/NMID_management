$(document).ready(function () {
    var ue = UE.getEditor('container');

    var $title = $('#blog-title');
    var $type = $('#blog-type');
    var $tagBox = $('.blog-tag-box');
    var $addTag = $('.add-tag');
    var $tag = $('.blog-tag');
    var $save = $('.btn-save');
    var $submit = $('.btn-submit');

    // 富文本编辑器和markdown编辑器切换
    var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
    
    $('.btn-change').on('click', function () {
        if ($('#text-editor').hasClass('view')) {
            $('#text-editor').removeClass('view');
            $('#markdown-editor').addClass('view');
        }
        else {
            $('#text-editor').addClass('view');
            $('#markdown-editor').removeClass('view');
        }
    })


    // 标签事件
    
    $addTag.click(function (event) {
        // 添加标签
        var length = $tagBox.children('li').length;
        event.preventDefault();
        // 标签最多10个，超过10个无法再添加
        if (length <= 11) {
            $tagBox.append($('<li>' +
                            '<input class="blog-tag" type="text" placeholder="填写标签"/>' +
                            '<a href="#" class="delete-tag"><img src="image/close.png" alt="X" class="delete-icon"></a>' +
                        '</li>'));

        }else {
            alert('标签最多只能添加10个！');
        }
        // 删除标签
        $('.delete-tag').click(function (event) {
            event.preventDefault();
            $(this).parent().remove();
        });
    });
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