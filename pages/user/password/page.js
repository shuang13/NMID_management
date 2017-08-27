var utils = new Utils();
$(document).ready(function() {
    utils.loginTesting();
    // 按钮事件
    $('.btn-submit a').on('click', function(event) {
        event.preventDefault();
        var ajaxArgs = {
            id: utils.my_id,
            old: $('#primary-password').val(),
            new: $('#new-password').val(),
        }
        log(ajaxArgs)
        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                     utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/users/changePassWord",
                data: ajaxArgs,
                success: function(data){
                    if(typeof data == 'string') {
                            data = JSON.parse(data);
                    }
                    log(data)
                    var status = data.code;
                    if(status == 200) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../setting/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                    }
                }
        });
    });
})