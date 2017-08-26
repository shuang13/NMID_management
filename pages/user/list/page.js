var utils = new Utils();

// 解析表格数据
var parseData = function (data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "id": data[i].id,
            "order-number": ((i + ((current-1)*16)) + 1),
            "name": data[i].name,
            "mail": data[i].mail,
            "role": data[i].role,
            "platform": data[i].platform,
            "status": data[i].status,
            "last-login": data[i].login,
            "operation": '<a href="../edit/page.html?id=' + 
                        data[i].id + '">编辑</a>' +" | " +
                        '<a class="btn-delete" href="##">删除</a>' 
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
                beforeSend: utils.loading($('tbody')),
                url: utils.URLHead + "/users",
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
                        
                        console.log(aaData);
                        window.current = current;
                        // 数据解析
                        var new_data = parseData(aaData);
                                        
                        // 根据解析的结果，绘制表格
                        utils.drawTable(new_data);

                        $('.btn-delete').on('click', onDelete);
                    }
                }
            });
        }
    });
}
// 删除
var onDelete = function (event) {
    event.preventDefault();
        var $this = $(this);
        var id = $this.closest('tr').attr('data-id')
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
                        uid: id,
                    }
                    log(ajaxArgs)
                    axios({
                        method:"DELETE",
                        url: utils.URLHead + '/users/' + id,
                        success: function (data) {
                            if(typeof data == 'string') {
                                data = JSON.parse(data);
                            }
                            var status = data.code;
                            if (status == 200) {
                                
                            }
                        }
                    });
                    // $.ajax({
                    //     type: "DELETE",
                    //     url: utils.URLHead + '/users/' + id,
                    //     success: function (data) {
                    //         if(typeof data == 'string') {
                    //             data = JSON.parse(data);
                    //         }
                    //         var status = data.code;
                    //         if (status == 200) {
                                
                    //         }
                    //     }
                    // });    
                    
                });
                $context.find('.false').on('click', function () {
                    $.closeNotice();
                });
            }
        );
}
$(document).ready(function () {

    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/users",
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
                $('.btn-delete').on('click', onDelete);
            }
        }
    });
})