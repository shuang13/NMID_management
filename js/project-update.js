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
    var $instruction = $('#update-instruction');
    var $file_screenshot = $('#app-screenshot');
    var $file_upload = $('#app-upload');
    var $link = $('#app-link');
    var $submit = $('.btn-submit');

    // 字符串编码，解决地址栏获取中文字符失败乱码
    var urlinfo = window.location.href;
   
    var updateProj = urlinfo.split("?")[1].split("=")[1];


    // 获取地址栏需更新项目序号
    updateProj = decodeURI(updateProj);
    if (updateProj == null) {
        $.notice('项目更新：', '请在项目列表中选择更新项目！', undefined, 300, 150);
        setTimeout(function () {
            window.location.href = 'project-list.html';
        }, 1000);
        return ;
    }

    $.ajax({
            type: 'POST',
            url: '../json/project',
            success: function (data) {
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }
                // 暂时数据测试
                var Dom =[
                    $member ,
                    $name ,
                    $size,
                    $version ,
                    $system ,
                    $intro ,
                    $func ,
                    $feature,
                    $instruction ,
                    $link 
                ];
                for (var i = 0; i < Dom.length; i++) {
                    Dom[i].val(data.aaData[updateProj - 1][i+1]);
                }
            }
        });
    $submit.on('click', function (event) {
        event.preventDefault();
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
        $.each(info,function(index,item) {
            if(info[index] == '') {
                $.notice('项目更新提示：', '部分信息未填写！', undefined, 300, 150);  
            }
        })
        
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
