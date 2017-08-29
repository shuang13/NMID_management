var utils = new Utils();
// 分页
var pagination = function (totalPage) {
    $("#pagination").pagination({
        totalPage: totalPage,
        callback: function(current) {
            var ajaxArgs = {
                page: current,
            };
            $.ajax({
                type: "POST",
                url:  utils.URLHead + "/signUpList",
                data: ajaxArgs,
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;
                    if (status == 200) {
                        // 获取原始数据
                        var aaData = data.body.list;
                        var pageNum = Math.ceil(data.body.num / data.body.list.length);
                        window.current = current;
                        // 数据解析
                        drawBox(aaData);
                    }
                }
            });
        }
    });
}
// 渲染数据
var drawBox = function (data) {
    var box = $(".message-box");
    var $frag = $(document.createDocumentFragment());
    for (var i = 0; i < data.length; i++) {
        $frag.append('<div class="applicant-box">'+
        '<div class="applicant-header">'+
            '<div class="applicant-name">' + data[i].name + '</div>'+
            '<div class="applicant-platform">申请平台：' + data[i].platform + '</div>'+
            '<div class="applicant-date">申请时间：' + data[i].time + '</div>'+
        '</div>'+
        '<div class="applicant-content">'+
            '<span class="content-text">'+ data[i].introduction + '</span>'+
        '</div>'+
    '</div>')
    }
    box.empty().append($frag);
}
$(document).ready(function() {
    utils.loginTesting();
    var ajaxArgs = {
        type：'pass',
    }
    $.ajax({
        type: "POST",
        url:  utils.URLHead + "/signUpList",
        success: function (data) {
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                // 获取原始数据
                var aaData = data.body.list;
                var pageNum = Math.ceil(data.body.num / data.body.list.length);
                window.current = 1;
                // 数据解析
                drawBox(aaData);
                pagination(pageNum);
            }
        }
    });
    
    
})