var utils = new Utils();

// 解析表格数据
var parseData = function (data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "id": data[i].id,
            "order-number": ((i + ((current-1)*16)) + 1),
            "title": data[i].title,
            "update-time": utils.getdate(data[i].update_time),
            "status": '未审核', 
            "operation": '<a class="btn-examine" href="##">进行审核</a>'
        }); 
    }
    return formdata;

}
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
                type: "GET",
                beforeSend: user.loading($('tbody')),
                url: utils.URLHead + "/news/unPassNews",
                data: ajaxArgs,
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;//状态码
                    if (status == 200) {
                        // 获取原始数据
                        var aaData = data.body.list;
                        var pageNum = data.body.num;
                        window.current = current;
                        // 数据解析
                        var new_data = parseData(aaData);
                        // 根据解析的结果，绘制表格
                        utils.drawTable(new_data);
                        $('.btn-examine').on('click', examine);
                    }
                }
            });
        }
    });
}
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
                var id = $this.closest('tr').attr('data-id');
                
                $context.find('.true').on('click', function (event) {
                    event.preventDefault();
                    var ajaxArgs = {
                        ids: id,
                    }
                    $.ajax({
                        type: "POST",
                        url: utils.URLHead + '/news/passNews',
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
                        ids: id,
                        _method: 'DELETE',
                        uid: utils.my_id,
                    }
                    $.ajax({
                        type: "POST",
                        url: utils.URLHead + '/news/' + ajaxArgs.ids,
                        data: ajaxArgs,
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
$(document).ready(function () {
    utils.loginTesting();
    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/news/unPassNews",
        success: function(data){
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
                var new_data = parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                utils.drawTable(new_data);
                pagination(pageNum);
                // 项目审核
                $('.btn-examine').on('click', examine);
            }
        }
    });
})