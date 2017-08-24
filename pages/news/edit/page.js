var utils = new Utils();
 $(document).ready(function() {
    $(':file').filestyle({buttonText: "浏览"});
    // 富文本编辑器
    KindEditor.ready(function(K) {
        window.editor = K.create('#editor_id');
    });
    // 解析url中的id
    window.id = window.location.href.split('?')[1].split('=')[1];
    if (id == null) {
        $.notice('新闻编辑：', '请在项目列表中选择编辑新闻！');
        setTimeout(function () {
            window.location.href = '../list/page.html';
        }, 1000);
        return ;
    }
    var $title = $('.news-title');
    var $save = $('.btn-save');
    var $submit = $('.btn-publish');

    
    $.ajax({
        type: 'GET',
        url: utils.URLHead + '/news/' + id,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            var aaData = data.body;
            if (status == 200) {
                $title.val(aaData.title);
                editor.html(aaData.content);
                log(aaData.content)
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
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
                url: utils.URLHead + "/news/" + id,
                data: article,
                success: function(data){
                if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;
                    if(status == 200) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../list/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                    }
                }
        });
    });
})   