var utils = new Utils();
 // 文件上传
var fileUpload = function (URL, fileId, uid) {
    var ajaxArgs = {
        uid: 2,
        headImg: ''
    }
    $.ajaxFileUpload({
        url: URL,
        secureuri: false,
        fileElementId: fileId,
        data: ajaxArgs,
        beforeSend: $.notice('提示！', '正在提交...', function () {
            utils.loading($('.jq-notice-context'));
        }),
        dataType: 'json',
        success: function (data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var aaData = data.body;
            var status = data.code;
            if(status == 200) {
                $('.head-view').src = utils.URLHead + aaData;
            } else {
                $('.jq-notice-context').html('链接服务器失败!');
            }
        }
    }); 
}
$(document).ready(function () {
    $(':file').filestyle({buttonText: "浏览"});
    window.my_id = 2;
    $('#upload-pic').on('change', function (event) {
        utils.fileUpload(utils.URLHead + '/users/uploadHeadImg', 'upload-pic', my_id)
    });

    
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