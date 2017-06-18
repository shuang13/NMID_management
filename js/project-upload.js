$(document).ready(function () {
    var URLHead = '119.29.234.36:8080';
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
    var $submit = $('.btn-submit');


    $submit.on('click', function (event) {
        event.preventDefault();
        // 每次点击按钮时，读取用户名和密码
        var info = {
            member: $member.val(),
            // name: $name.val(),
            size: $size.val(),
            // version: $version.val(),
            // support: $system.val(),
            // profile: $intro.val(),
            // utility: $func.val(),
            // feature: $feature.val(),
            // instruction: $instruction.val(),
            // links: $link.val()
        };

        // 检测信息是否为空
        $.each(info,function(index,item) {
            if(info[index] == '') {
                $.notice('项目更新提示：', '部分信息未填写！', undefined, 300, 150);  
            }
        })
        
        // 文件上传
        $.ajaxFileUpload ({
            url: URLHead + '/works/uploadImgAndFile', //你处理上传文件的服务端
            secureuri:false, //与页面处理代码中file相对应的ID值
            fileElementId:'file',
            data: '',
            dataType: 'json', 
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
            }
        });
        $.ajax({
            type: 'POST',
            url: URLHead + '/works',
            data: info,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
            }
        });
    });
});
