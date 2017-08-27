var utils = new Utils();
// 初始化
function init() {
    utils.loginTesting();
    // 上传文件按钮
    $(':file').filestyle({buttonText: "浏览"});
    // markdown编辑器
    window.simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
}
function addTag(event) {
    event.preventDefault();
    // 添加标签
    var length = $('.tag-box').children('li').length;
    // 标签最多10个，超过10个无法再添加
    if (length <= 11) {
        $('.tag-box').append($('<li>' +
                        '<input class="write-tag" type="text" placeholder="填写标签"/>' +
                        '<a href="##" class="delete-tag"><i class="fa fa-minus-circle"></i></a>' +
                    '</li>'));

    }else {
        $.notice('提示！','标签最多只能添加10个！');
    }
    // 删除标签
    $('.delete-tag').on('click', deleteTag);
}
// 删除标签
function deleteTag(event) {
    event.preventDefault();
    $(this).parent().remove();
}
function submit(event) {
    event.preventDefault();
    var content = simplemde.value();
    var tags = [];
    for (var i = 0; i < $('.write-tag').length; i++) {
        tags.push($('.write-tag').eq(i).val());
    }
    var tag_names = tags.join(",");
    var article = {
        authorId: utils.my_id,
        profile: "dd",
        title: $('#blog-title').val(),
        platform: $('#blog-type').val(),
        names: tag_names,
        content: content,
        time: Math.round(new Date().getTime()/1000),
    };
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
}
$(document).ready(function() {
    init();
    // event
    $('.add-tag').on('click', addTag);
    $('.btn-publish').on('click', submit);
})   