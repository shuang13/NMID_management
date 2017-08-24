var utils = new Utils();
 $(document).ready(function() {
    $(':file').filestyle({buttonText: "浏览"});
    // 富文本编辑器
    KindEditor.ready(function(K) {
        window.editor = K.create('#editor_id');
    });
    var $title = $('.news-title');
    var $save = $('.btn-save');
    var $submit = $('.btn-publish');

    // 存为草稿
    // $save.on('click', function(event) {
    //     event.preventDefault();
    //     $.notice('博客上传提示：', '保存成功！');
    // });

    // 立即上传
    $submit.on('click', function (event) {
        event.preventDefault();
        //获取html内容，返回: 
        var content = $('#editor_id').val();
        var article = {
            uid: 1,
            profile: '',
            title: $title.val(),
            content: content,
        };

        $.ajax({
                type: "POST",
                beforeSend: utils.loading($('tbody')),
                url: utils.URLHead + "/news",
                data: article,
                success: function(data){
                if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;
                    if(status == 200) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../index/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                    }
                }
        });
    });
})   