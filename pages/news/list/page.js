var utils = new Utils();

// 解析表格数据
var parseData = function (data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "id": data[i].id,
            "order-number": ((i + ((current-1)*16)) + 1),
            "title": data[i].title,
            "status": "已通过",
            "update-time": utils.getdate(data[i].update_time),
            "operation": '<a href="../edit/page.html?id=' + 
                        data[i].id + '">编辑</a>|' 
                        + '<a class="btn-delete" href="##">删除</a>'
        }); 
    }
    return formdata;

}
var onDelete = function () {
    event.preventDefault();
        var $this = $(this);
        $.notice('提示！', [
            '<div class="discription_dialog">是否删除此栏目!</div>',
            '<div class="divOperation">',
                '<span class="true btn btn-danger">确认</span>',
                '<span class="false btn btn-default">取消</span>',
            '</div>'
            ].join(''),
            function () {
                var $context = $('.jq-notice-context');
                $context.find('.true').on('click', function (event) {
                    event.preventDefault();
                    // 参数
                    var ajaxArgs = {
                        newsId: $this.closest('tr').attr('data-id'),
                        _method: 'DELETE',
                        uid: utils.my_id,
                    }
                    $.ajax({
                        type: "POST",
                        url: utils.URLHead + '/news/' + ajaxArgs.newsId,
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
                                $('.jq-notice-context').html('删除成功!');
                                setTimeout("location.reload()",1000); 
                            }
                        }
                    });    
                    
                });
                $context.find('.false').on('click', function () {
                    $.closeNotice();
                });
            }
        );
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
                beforeSend: utils.loading($('tbody')),
                url: utils.URLHead + "/news",
                data: ajaxArgs,
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;//状态码
                    if (status == 200) {
                        window.current = current;
                        // 获取原始数据
                        var aaData = data.body.list;
                        var pageNum = data.body.num;
                        
                        console.log(aaData);
                    
                        // 数据解析
                        var new_data = parseData(aaData);
                                        
                        // 根据解析的结果，绘制表格
                        utils.drawTable(new_data);
                    }
                }
            });
        }
    });
}
$(document).ready(function () {
    utils.loginTesting();
    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/news",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                window.current = 1;
                // 获取原始数据
                var aaData = data.body.list;
                var pageNum = Math.ceil(data.body.num / data.body.list.length);

                // 数据解析
                var new_data = parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                utils.drawTable(new_data);
                pagination(pageNum);
                $('.btn-delete').on('click', onDelete);
            }
        }
    });
})