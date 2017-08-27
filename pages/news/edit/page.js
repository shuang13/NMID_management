var utils = new Utils();
var init = function () {
    utils.loginTesting();
    $(':file').filestyle({buttonText: "浏览"});
    // 富文本编辑器
    KindEditor.ready(function(K) {
        window.editor = K.create('#editor_id');
    });
    // 地址id   
    window.id = utils.getUrlId();
}
 $(document).ready(function() {
    init();
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
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
    // 立即上传
    $submit.on('click', function (event) {
        event.preventDefault();
        var article = {
            uid: utils.my_id,
            newsId: id,
            profile: 'dsf',
            title: $title.val(),
            content: 'sad',
            _method: 'PUT',

        };
        log(article)

        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                    utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/news/" + article.newsId,
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