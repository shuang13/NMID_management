var utils = new Utils();
function addTag(event) {
    event.preventDefault();
    var length = $('.tag-box').children('li').length;
    // 标签最多10个，超过10个无法再添加
    if (length <= 11) {
        $('.tag-box').append($(
            '<li>' +
                '<input class="write-tag" type="text" placeholder="填写标签"/>' +
                '<a href="##" class="delete-tag"><i class="fa fa-minus-circle"></i></a>' +
            '</li>'));

    }else {
        $.notice('提示！','标签最多只能添加10个！');
    }
    $('.delete-tag').on('click', deleteTag);
    $('.write-tag').on('input', function (event) {
        var index = $(this).parent().index() - 1;
        log($(this).parent())
        $('.input-box').eq(index).
        find('.box-title').html($(this).val());
    })
}
function deleteTag(event) {
    event.preventDefault();
    var index = $(this).parent().index() - 1;
    $('.input-box').eq(index).remove();
    $(this).parent().remove();
}
function createTagBox(event) {
    $('.setting-resume form').append($(
        '<div class="input-box">' + 
            '<div class="box-title">未填写</div>' + 
            '<textarea name="" class="box-text" placeholder="说明"></textarea>' + 
        '</div>'
        ))
}
function submit(event) {
    var ajaxArgs = [];
    for (var i = 0; i < $('.write-tag').length; i++) {
        ajaxArgs.push({
            userId: utils.my_id,
            key: $('.write-tag').eq(i).val(),
            value: $('.box-text').eq(i).val(),
        })
    }
    var args = {
        resumeList: ajaxArgs
    }
    k = JSON.stringify(args);
    log(ajaxArgs);

    $.ajax({
            type: "POST",
            beforeSend: $.notice('提示！', '正在提交...', function () {
                 utils.loading($('.jq-notice-context'));
            }),
            url: utils.URLHead + "/resume",
            data: args,
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;
                if(status == 200) {
                $('.jq-notice-context').html('提交成功!');
                    setTimeout('window.location.href = "../setting/page.html"',2000); 
                } else {
                    $('.jq-notice-context').html('提交失败!');
                }
            }
        });
    
}
$(document).ready(function() {
    utils.loginTesting();
    // 获取编辑内容
    $.ajax({
        type: 'GET',
        url: utils.URLHead + '/resume/' + utils.my_id,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            var aaData = data.body;
            if (status == 200) {
                for (var i = 0; i < aaData.length; i++) {
                    $('.tag-box').append($(
                        '<li>' +
                            '<input class="write-tag" type="text" value="' + aaData[i].key + '"/>' +
                            '<a href="#" class="delete-tag"><i class="fa fa-minus-circle"></i></a>' +
                        '</li>'));
                    $('.setting-resume form').append($(
                        '<div class="input-box">' + 
                            '<div class="box-title">' + aaData[i].key + '</div>' + 
                            '<textarea name="" class="box-text">' + aaData[i].value + '</textarea>' + 
                        '</div>'
                        ))
                }
                // 删除标签
                $('.delete-tag').on('click', deleteTag);

            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
    $('.add-tag').on('click', function (event) {
        addTag(event);
        createTagBox(event);
    });
    $(".btn-submit").on('click', submit);

})