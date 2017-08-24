var utils = new Utils();
 $(document).ready(function() {
    $(':file').filestyle({buttonText: "浏览"});
    // 解析url中的id
    var id = window.location.href.split('?')[1].split('=')[1];
    if (id == null) {
        $.notice('项目更新：', '请在项目列表中选择更新项目！');
        setTimeout(function () {
            window.location.href = 'project-list.html';
        }, 1000);
        return ;
    }
    var $title = $('#blog-title');
    var $type = $('#blog-type');
    var $tagBox = $('.blog-tag-box');
    var $addTag = $('.add-tag');
    var $tag = $('.blog-tag');
    var $submit = $('.btn-publish');
    // markdown编辑器
    var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
    $.ajax({
        type: 'GET',
        url: utils.URLHead + '/blogs/' + id,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            var aaData = data.body.blog;
            if (status == 200) {
                $title.val(aaData.title);
                simplemde.value(aaData.content);
                $('#blog-type option').eq(aaData.platform - 1).attr("selected", "selected");
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
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

    // 立即上传
    $submit.on('click', function (event) {
        event.preventDefault();
        //获取html内容，返回: 
        var content = simplemde.value();
        var article = {
            authorId: 1,
            profile: "dd",
            title: $('#blog-title').val(),
            platform: $type.val(),
            names: $('.blog-tag').val(),
            content: content,
            time: Math.round(new Date().getTime()/1000),
        };
        log(article)
        $.ajax({
                type: "PUT",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                    utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/blogs/" + id,
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