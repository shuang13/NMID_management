var utils = new Utils();
// 本页面表单验证
function validate(ajaxArgs) {
	regName = /^[\u4e00-\u9fa5]{2,4}$/;//姓名
	var regEmail = /^\w+(\.\w+)*@\w+(\.\w+)+$/,//邮箱
	regMobile = /^0?1[3|4|5|8][0-9]\d{8}$/;//手机
	
	if (!regName.test(ajaxArgs.name)) {
        $.notice("提示！", "请输入正确格式的姓名!");
        return false;
    }
    else if (!regEmail.test(ajaxArgs.email)) {
        $.notice("提示！", "请输入正确格式的邮件地址!");
        return false;
    }
    else if (!regMobile.test(ajaxArgs.tel)) {
        $.notice("提示！", "请输入正确格式的电话号码!");
        return false;
    }
    return true;
}
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