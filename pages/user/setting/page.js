var utils = new Utils();

$(document).ready(function () {
    utils.loginTesting();
    $(':file').filestyle({buttonText: "浏览"});
    $('#upload-form').attr('action', utils.URLHead + '/users/uploadHeadImg')

    $('#upload-pic').on('change', function (event) {
        $('#upload-uid').val(utils.my_id)
        $('#upload-form').ajaxSubmit(function(message) {
            var status = message.code;
            if (status == 200) {
                $.notice('提示！', '文件上传成功');
                setTimeout('window.location.href = "../setting/page.html"',2000); 
                
            }
            else {
                $.notice("提示！", "服务器连接失败!");
                setTimeout('window.location.href = "../setting/page.html"',2000); 
            }
        }); 
    });
    // 获取用户信息
    $.ajax({
            type: "GET",
            url: utils.URLHead + "/users/" + utils.my_id,
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
                    $('.head-view').attr('src', utils.URLHead + aaData.portrait);

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
            profile: $('#introduction').val(),
            _method: 'PUT',
        };
       log(ajaxArgs)
        $.ajax({
            type: "POST",
            url: utils.URLHead + "/users/" + utils.my_id,
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