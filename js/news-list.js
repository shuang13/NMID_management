$(document).ready(function() {
    var URLHead = 'http:119.29.234.36:8080/nmid';
    $.ajax({
        type: "GET",
        url: URLHead + "/news",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            console.log(data.body.list.length);
            // 引用jqpaginator库实现分页功能
            $.jqPaginator('.pagination', {
                totalPages: 10,
                visiblePages: 4,
                currentPage: 1,
                first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>',
                next: '<li class="next"><a href="javascript:void(0);">&raquo;</a></li>',
                last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
                // 页面修改时当前页面
                onPageChange: function onPageChange(num) {
                }
            });

            window.data = data;
            // 解析表格数据
            parseTable(data.body.list);
            
            // 根据解析的结果，绘制表格
            drawTable(window.formdata);
            // console.log(window.data.body.list.length);

            // 操作
            // operate();
            
        }
    });
    // 解析时间戳
    function getdate(sourceDate) {
        var now = new Date(sourceDate), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
    // 解析表格数据
    function parseTable(data) {
        window.formdata = [];
        for(var i = 0; i < data.length; i++) {
            window.formdata.push({
                "order-number": (i + 1),
                "title": data[i].title,
                // "status": data[i].authors,
                "update-time": getdate(data[i].update_time),
            });
        }
    }
    // // 绘制表格
    function drawTable (data, callback) {
        var $frag = $(document.createDocumentFragment());

        var $table = $('table');
        var $ths = $table.find('th');
    
        for(let i = 0; i < data.length; i++) {
            var $tr = $('<tr></tr>');
            for(let j = 0; j < $ths.length - 1; j++) {
                $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');  
            }
            $tr.append( '<td class="operate">' +
                            '<a href="#">编辑</a>' +
                        '</td>');
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);

    };
    // // 引用jqpaginator库实现分页功能
    // $.jqPaginator('.pagination', {
    //     totalPages: 10,
    //     visiblePages: 4,
    //     currentPage: 1,
    //     first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
    //     prev: '<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>',
    //     next: '<li class="next"><a href="javascript:void(0);">&raquo;</a></li>',
    //     last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
    //     page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
    //     // 页面修改时当前页面
    //     onPageChange: function onPageChange(num) {
    //     }
    // });

})