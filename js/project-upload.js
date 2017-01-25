$(document).ready(function () {
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
        // 每次点击按钮时，读取用户名和密码
        var info = {
            member: $member.val(),
            name: $name.val(),
            size: $size.val(),
            version: $version.val(),
            system: $system.val(),
            intro: $intro.val(),
            func: $func.val(),
            feature: $feature.val(),
            instruction: $instruction.val(),
            link: $link.val()
        };

        // 检测信息是否为空
        if(info.member == '') {
            alert("部分信息未填！");
            return ;
        }

        if(info.name == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.size == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.version == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.system == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.intro == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.func == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.feature == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.instruction == '') {
            alert("部分信息未填！");
            return ;
        }
        if(info.link == '') {
            alert("部分信息未填！");
            return ;
        }
        // 文件上传
        $.ajaxFileUpload ({
            url:'', //你处理上传文件的服务端
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
            url: '',
            data: info,
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
            }
        });
    });
});
