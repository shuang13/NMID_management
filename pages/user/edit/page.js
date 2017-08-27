var utils = new Utils();
var init = function () {
    utils.loginTesting();
    // 地址id   
    window.id = utils.getUrlId();
}
$(document).ready(function() {
    init();
     // 获取用户信息
    $.ajax({
        type: "GET",
        url: utils.URLHead + "/users/" + id,
        success: function (data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var aaData = data.body;
            var status = data.code;
            if(status == 200) {
                $('#add-user-name').val(aaData.name);
                $('#add-user-email').val(aaData.email);
                $('#user-weibo').val(aaData.weibo);
                switch(aaData.platform) {
                case '客户端平台':
                    $('input[name="platform"]').eq(0).attr("checked", "checked");
                    break;
                case '服务器平台':
                    $('input[name="platform"]').eq(1).attr("checked", "checked");
                    break;
                case '硬件平台':
                    $('input[name="platform"]').eq(2).attr("checked", "checked");
                    break;
                case '平台培训生':
                    $('input[name="platform"]').eq(3).attr("checked", "checked");
                    break;
                case '指导老师':
                    $('input[name="platform"]').eq(4).attr("checked", "checked");
                    break;
                } 
                switch(aaData.job) {
                case '成员':
                    $('input[name="job"]').eq(0).attr("checked", "checked");
                    break;
                case '平台联络人':
                    $('input[name="job"]').eq(1).attr("checked", "checked");
                    break;
                case '团队联络人':
                    $('input[name="job"]').eq(2).attr("checked", "checked");
                    break;
                case '运营专责':
                    $('input[name="job"]').eq(3).attr("checked", "checked");
                    break;
                case '产品线':
                    $('input[name="job"]').eq(4).attr("checked", "checked");
                    break;
                case 'UI设计组':
                    $('input[name="job"]').eq(5).attr("checked", "checked");
                    break;
                } 

                if (aaData.role == 'user') {
                    $('input[name="user-type"]').eq(0).attr("checked", "checked");
                }
                else $('input[name="user-type"]').eq(1).attr("checked", "checked");

                
                

            } else {
                $('.jq-notice-context').html('链接服务器失败!');
            }
        }
    });
    // 按钮事件
    $('.setting-add-user .btn-submit a').on('click', function(event) {
        event.preventDefault();
        var ajaxArgs = {
            name: $('#add-user-name').val(),
            email: $('#add-user-email').val(),
            password: $('#add-user-password').val(),
            platform: $('input[name="platform"]:checked').val(),
            job: $('input[name="job"]:checked').val(),
            role: $('input[name="user-type"]:checked').val(),
            _method: 'PUT',
        }
        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                     utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/users/" + id,
                data: ajaxArgs,
                success: function(data){
                    if(typeof data == 'string') {
                            data = JSON.parse(data);
                    }
                    var status = data.code;
                    log(data)
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