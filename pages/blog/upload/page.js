var utils = new Utils();
 $(document).ready(function() {
    $(':file').filestyle({buttonText: "浏览"});
    
    var $title = $('#blog-title');
    var $type = $('#blog-type');
    var $tagBox = $('.blog-tag-box');
    var $addTag = $('.add-tag');
    var $tag = $('.blog-tag');
    var $save = $('.btn-save');
    var $submit = $('.btn-publish');
    // markdown编辑器
    var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
    // 富文本编辑器
    // KindEditor.ready(function(K) {
    //     window.editor = K.create('#editor_id');
    // });
    // 富文本编辑器和markdown编辑器切换
    // $('.btn-change').on('click', function () {
    //     if ($('#editor_id').hasClass('view')) {
    //         $('#editor_id').removeClass('view');
    //         $('#markdown-editor').addClass('view');
    //     }
    //     else {
    //         $('#editor_id').addClass('view');
    //         $('#markdown-editor').removeClass('view');
    //     }
    // })
    // 标签事件
    
    $addTag.click(function (event) {
        // 添加标签
        var length = $tagBox.children('li').length;
        event.preventDefault();
        // 标签最多10个，超过10个无法再添加
        if (length <= 11) {
            $tagBox.append($('<li>' +
                            '<input class="blog-tag" type="text" placeholder="填写标签"/>' +
                            '<a href="#" class="delete-tag"><img src="../../../public-resource/image/close.png" alt="X" class="delete-icon"></a>' +
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
    // 存为草稿
    // $save.on('click', function(event) {
    //     event.preventDefault();
    //     $.notice('博客上传提示：', '保存成功！');
    // });

    // 立即上传
    $submit.on('click', function (event) {
        event.preventDefault();
        //获取html内容，返回: 
        var content = simplemde.value();
        var article = {
            authorId: 1,
            profile: "dd",
            title: $('#blog-title').val(),
            platform: $('#blog-type').val(),
            names: $('.blog-tag').val(),
            content: content,
            time: Math.round(new Date().getTime()/1000),
        };
        log(article)
        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                    utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/blogs",
                data: article,
                success: function(data){
                if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;
                    if(status == 201) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../list/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                    }
                }
        });
    });
})   