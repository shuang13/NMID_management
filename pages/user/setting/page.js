var utils = new Utils();

$(document).ready(function () {
    $(':file').filestyle({buttonText: "浏览"});
    var my_id = 2;
    // 获取用户信息
    $.ajax({
            type: "GET",
            url: utils.URLHead + "/users/" + my_id,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var aaData = data.body;
                var status = data.code;
                if(status == 200) {
                    $('#user-name').val(aaData.name);
                    $('#user-telephone').val(aaData.tel);
                    $('#user-email').val(aaData.email);
                    $('#user-weibo').val(aaData.weibo);
                    $('#introduction').val(aaData.profile);
                } else {
                    $('.jq-notice-context').html('链接服务器失败!');
                }
            }
    });
    // 修改提交
    $('.btn-submit a').on('click', function (event) {
        event.preventDefault();
        var ajaxArgs = {
            name: $('#user-name').val(),
            tel: $('#user-telephone').val(),
            email: $('#user-email').val(),
            weibo: $('#user-weibo').val(),
            introduction: $('#introduction').val(),
        };
       log(ajaxArgs)
        $.ajax({
            type: "POST",
            url: utils.URLHead + "/users/" + my_id,
            beforeSend: $.notice('提示！', '正在提交...', function () {
                     utils.loading($('.jq-notice-context'));
                }),
            data: ajaxArgs,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                var status = data.code;
                if (status == 200) {
                    $('.jq-notice-context').html('提交成功!');
                    setTimeout('window.location.href = "../setting/page.html"',2000); 
                }
                 else {
                    $('.jq-notice-context').html('链接服务器失败!');
                }
            }
        });
        
    });
        
})