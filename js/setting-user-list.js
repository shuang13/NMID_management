$(document).ready(function() {
    var URLHead = 'http:119.29.234.36:8080/nmid';
    $.get(URLHead + "/users",{
        page: 1,
        page_size: 16
    }, function(data){
        if(typeof data == 'string') {
            data = JSON.parse(data);
        }
        // 引用jqpaginator库实现分页功能
        $.jqPaginator('.pagination', {
            // 计算总页数
            totalPages: Math.ceil(data.body.num/data.body.list.length),
            visiblePages: 4,
            currentPage: 1,
            first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
            prev: '<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>',
            next: '<li class="next"><a href="javascript:void(0);">&raquo;</a></li>',
            last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
            page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
            // 页面修改时当前页面
            onPageChange: function onPageChange(num) {
                $('table').find('tbody').empty();
                currentPage = num;
                
                $.get(URLHead + "/news", {
                        page: currentPage,
                        page_size: 16
                    }, function(data){
                        if(typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                        window.data = data;
                        // 解析表格数据
                        parseTable(data.body.list);
                        // 根据解析的结果，绘制表格
                        drawTable(window.formdata);
                        // 操作
                        // operate();
                    });
                }
        });
        window.data = data;
        // 解析表格数据
        parseTable(data.body.list);    
        // 根据解析的结果，绘制表格
        drawTable(window.formdata);
        // 操作
        // operate();  
    });
    // 解析时间戳
    function getdate(sourceDate) {
        var now = new Date(sourceDate), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
    // 解析表格数据
    function parseTable(data) {
        window.formdata = [];
        for(var i = 0; i < data.length; i++) {
            window.formdata.push({
                "order-number": ((i + ((currentPage-1)*16)) + 1),
                "name": data[i].name,
                "mail": data[i].mail,
                "role": data[i].role,
                "platform": data[i].platform,
                "status": data[i].status,
                "last-login": data[i].login
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
                            '<a href="#">编辑</a> | ' +
                            '<a href="#">编辑</a>' +
                        '</td>');
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);
    };
})