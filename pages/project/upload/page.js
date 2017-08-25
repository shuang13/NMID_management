var utils = new Utils();
// 表单提交
var submit = function () {
    event.preventDefault();
    var $file_icon = $('#app-icon');
    var $member = $('#project-member');
    var $name = $('#project-name');
    var $size = $('#app-size');
    var $version = $('#app-version');
    var $system = $('#app-system');
    var $intro = $('#app-intro');
    var $func = $('#app-function');
    var $feature = $('#app-feature');
    var $instruction = $('#app-instruction');
    var $file_screenshot = $('#app-screenshot');
    var $file_upload = $('#app-upload');
    var $link = $('#app-link');
    // 获取当前10位时间戳
    var time = Math.round(new Date().getTime()/1000);
    var ajaxArgs = {
        // 必须参数
        // member: $member.val(),
        name: $name.val(),
        // size: $size.val(),
        version: $version.val(),
        time: time,
        profile: $intro.val(),
        utility: $func.val(),
        feature: $feature.val(),
        links: $link.val(),
        // 可选参数
        support: $system.val(),
        instruction: $instruction.val(),
    };
    log(ajaxArgs)
    if(!utils.validateEmpty(ajaxArgs)) {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: utils.URLHead + '/works',
        beforeSend: $.notice('提示！', '正在提交...', function () {
            utils.loading($('.jq-notice-context'));
        }),
        data: ajaxArgs,
        success: function(data){
            if(typeof data === 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            console.log(status);
            if(status == 201) {
                $('.jq-notice-context').html('提交成功!');
                setTimeout('window.location.href = "../index/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败!');
            }
        }
    });
}
$(document).ready(function () {
    $(':file').filestyle({buttonText: "浏览"});

    $('.btn-submit').on('click', submit);
    $('#app-icon').on('change', function (event) {
        utils.fileUpload(utils.URLHead + '/works/uploadImgAndFile', 'app-icon')
    });
    $('#app-icon').on('change', function (event) {
        utils.fileUpload(utils.URLHead + '/works/uploadImgAndFile', 'app-icon')
    });
    $('#app-icon').on('change', function (event) {
        utils.fileUpload(utils.URLHead + '/works/uploadImgAndFile', 'app-icon')
    });
});
