var utils = new Utils();

$(document).ready(function () {
    $(':file').filestyle({buttonText: "浏览"});
    // 解析url中的id
    id = window.location.href.split('?')[1].split('=')[1];
    if (id == null) {
        $.notice('项目查看：', '请在项目列表中选择查看项目！');
        setTimeout(function () {
            window.location.href = '../list/page.html';
        }, 1000);
        return ;
    }
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

    $(':file').filestyle({buttonText: "浏览"});

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
});
