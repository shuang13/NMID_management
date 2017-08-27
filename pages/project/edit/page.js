var utils = new Utils();
var init = function () {
    utils.loginTesting();
    $(':file').filestyle({buttonText: "浏览"});
    // 地址id   
    window.id = utils.getUrlId();
}
// 表单提交
var submit = function () {
    event.preventDefault();
    $(':file').filestyle({buttonText: "浏览"});
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
        _method: 'PUT',
    };

    $.ajax({
        type: 'POST',
        url: utils.URLHead + '/works/' + id,
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
                setTimeout('window.location.href = "../list/page.html"',2000); 
            } else {
                $('.jq-notice-context').html('提交失败!');
            }
        }
    });
}

$(document).ready(function () {
    init();
    var $file_icon = $('#app-icon');
    var $member = $('#project-member');
    var $name = $('#project-name');
    var $size = $('#app-size');
    var $version = $('#app-version');
    var $system = $('#app-system');
    var $intro = $('#app-intro');
    var $func = $('#app-function');
    var $feature = $('#app-feature');
    var $instruction = $('#update-instruction');
    var $file_screenshot = $('#app-screenshot');
    var $file_upload = $('#app-upload');
    var $link = $('#app-link');
    var $submit = $('.btn-submit');
    var members = [];

    $.ajax({
        type: 'GET',
        url: utils.URLHead + '/works/' + id,
        success: function(data){
            if(typeof data === 'string') {
            data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                var projectInfo = data.body.work;
                // 解析data对象中的成员名字
                for (let i = 0; i < data.body.authors.length; i++) {
                    members.push(data.body.authors[i].name)
                }
                console.log(members.join('、'));
                $member.val(members.join('、'));
                $name.val(projectInfo.name);
                $size.val(projectInfo.size);
                $system.val(projectInfo.support);
                $version.val(projectInfo.version);
                $intro.val(projectInfo.profile);
            }
            else $.notice("提示！", "服务器连接失败!");
        }
    });
    // 文件上传
    $('#app-icon').on('change', function (event) {
        $('.project-id').val(id)
        $('#upload-form-icon').ajaxSubmit(function(message) {
            var status = message.code;
                log(message)
            
            if (status == 200) {
                $.notice('提示！', '文件上传成功');
                
            }
            else $.notice("提示！", "服务器连接失败!");
        }); 
        

    });
    $('#app-screenshot').on('change', function (event) {
        $('.project-id').val(id)
        $('#upload-form-screenshot').ajaxSubmit(function(message) {
            var status = message.code;

            if (status == 200) {
                $.notice('提示！', '文件上传成功');
                
            }
            else $.notice("提示！", "服务器连接失败!");
        }); 
    });
    $('#app-upload').on('change', function (event) {
        $('.project-id').val(id)
        $('#upload-form-app').ajaxSubmit(function(message) {
            var status = message.code;
            if (status == 200) {
                $.notice('提示！', '文件上传成功');
                
            }
            else $.notice("提示！", "服务器连接失败!");
        }); 
    });
    $('.btn-submit').on('click', submit);
});
