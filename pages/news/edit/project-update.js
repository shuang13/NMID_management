$(document).ready(function () {
    var URLHead = 'http:119.29.234.36:8080/nmid';
    // 解析url中的id
    var id = window.location.href.split('?')[1].split('=')[1];
    console.log(id);
    // $(':file').filestyle({buttonText: "浏览"});
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

    if (id == null) {
        $.notice('项目更新：', '请在项目列表中选择更新项目！', undefined, 300, 150);
        setTimeout(function () {
            window.location.href = 'project-list.html';
        }, 1000);
        return ;
    }

    $.get(URLHead + '/works/' + id, {}, function (data) {
        if(typeof data == 'string') {
            data = JSON.parse(data);
        }
        console.log(data);
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
    });


// *************************************************
//             以下接口未对接
// *************************************************
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
        // $.each(info,function(index,item) {
        //     if(info[index] == '') {
        //         $.notice('项目更新提示：', '部分信息未填写！', undefined, 300, 150);  
        //     }
        // })
        
        // 文件上传
        // $.ajaxFileUpload ({
        //     url:'', //你处理上传文件的服务端
        //     secureuri:false, //与页面处理代码中file相对应的ID值
        //     fileElementId:'file',
        //     data: '',
        //     dataType: 'json', 
        //     success: function (data) {
        //         if(typeof data == 'string') {
        //             data = JSON.parse(data);
        //         }
        //     }
        // });
        // $.post(URLHead + '/works/' + id, {info}, function (data) {
        //     if(typeof data == 'string') {
        //         data = JSON.parse(data);
        //     }
        // }
        // });
    });
});
