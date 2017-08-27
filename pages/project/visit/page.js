var utils = new Utils();
var init = function () {
    utils.loginTesting();
    $(':file').filestyle({buttonText: "浏览"});
    // 地址id   
    window.id = utils.getUrlId();
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
});
