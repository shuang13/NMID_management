var utils = new Utils();
// 分页
var pagination = function (totalPage) {
    $("#pagination").pagination({
        currentPage: 1,
        totalPage: totalPage,
        callback: function(current) {
            var ajaxArgs = {
                page: current,
            };
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
                        // 审核
                        $('.btn-pass').on('click', examine);
                
                    }
                }
            });
        }
    });
}
// 进行审核
var examine = function(event) {
    event.preventDefault();
    var $this = $(this);
    $.notice('提示！', [
        '<div class="discription_dialog">是否通过此栏目!</div>',
        '<div class="divOperation">',
            '<span class="true btn btn-danger">通过</span>',
            '<span class="false btn btn-default">不通过</span>',
        '</div>'
        ].join(''),
        function () {
            var $context = $('.jq-notice-context');
            // 参数
            var id = $this.attr('data-id');
            

            log(ajaxArgs)
            $context.find('.true').on('click', function (event) {
                event.preventDefault();
                var ajaxArgs = {
                    signupId: id,
                }
                $.ajax({
                    type: "POST",
                    url: utils.URLHead + '/passSignUp',
                    beforeSend: $.notice('提示！', '正在提交...', function () {
                        utils.loading($('.jq-notice-context'));
                    }),
                    data: ajaxArgs,
                    success: function (data) {
                        if(typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                        var status = data.code;
                        if (status == 200) {
                            $('.jq-notice-context').html('审核成功!');
                            setTimeout("location.reload()",1000); 
                        }
                    }
                });    
                
            });
            $context.find('.false').on('click', function () {
                event.preventDefault();
                var ajaxArgs = {
                    signupId: id,
                    _method: 'DELETE',
                }
                $.ajax({
                    type: "POST",
                    url: utils.URLHead + '/news/' + ajaxArgs.signupId,
                    beforeSend: $.notice('提示！', '正在提交...', function () {
                        utils.loading($('.jq-notice-context'));
                    }),
                    success: function (data) {
                        if(typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                        var status = data.code;
                        if (status == 200) {
                            $('.jq-notice-context').html('审核成功!');
                            setTimeout("location.reload()",1000); 
                        }
                    }
                });
            });
        }
    );
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
        '<div class="join-btn">'+
            '<div class="btn-pass" data-id="' + data[i].signupId + '">'+
               '<a href="##">进行审核</a>'+
            '</div>'+
       '</div>'+
    '</div>')
    }
    box.append($frag);
}
$(document).ready(function() {
    utils.loginTesting();
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
                // 审核
                $('.btn-pass').on('click', examine);
        
            }
        }
    });
    
    
})