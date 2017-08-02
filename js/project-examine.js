$(document).ready(function () {
    var URLHead = '119.29.234.36:8080/nmid';
    $.ajax({
            type: "POST",
            url: URLHead + "/works/unpass",
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }

                // 解析表格数据
                // parseTable(data.aaData);
                
                // 根据解析的结果，绘制表格
                // drawTable(window.formdata);

                // window.data = data;

                // 操作
                // operate();
                
            }
        });
    // 解析表格数据
    // function parseTable(data) {
    //     window.formdata = [];
    //     for(var i = 0; i < data.length; i++) {
    //         window.formdata.push({
    //             "order-number": data[i][0],
    //             "name": data[i][1],
    //             "member": data[i][2],
    //             "system": data[i][3],
    //             "type": data[i][4],
    //             "version": data[i][5],
    //             "update-time": data[i][6],
    //             "status": data[i][7]
    //         });
    //     }
    // }
    // // 绘制表格
    // function drawTable (data, callback) {
    //     var $frag = $(document.createDocumentFragment());

    //     var $table = $('table');
    //     var $ths = $table.find('th');
    
    //     for(var i = 0; i < data.length; i++) {
    //         var $tr = $('<tr></tr>');
    //         for(var j = 0; j < $ths.length - 1; j++) {
    //             if (data[i][$ths.eq(j).attr('data-name')] == "审核中" ) {
    //                 $tr.append('<td class="state">' +
    //                                 '<a class="pass" href="##">通过</a>' + 
    //                                 '<a class="unpass" href="##">不通过</a>' +
    //                             '</td>');
    //             }
    //             else {
    //                 $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');
    //             }

    //         }
    //         $tr.append( '<td class="operate">' +
    //                         '<a href="project-update.html?id=' + 
    //                         data[i]['order-number'] + '">查看</a>' +
    //                         '<a href="project-update.html?id=' + 
    //                         data[i]['order-number'] + '">更新</a>' +
    //                     '</td>');
    //         $frag.append($tr);
    //     }
    //     $table.find('tbody').empty().append($frag);

    // };
    // // 表格操作
    // function operate() {
    //     $('.pass').on('click',function (event) {
    //         event.preventDefault();
    //          // 插入到弹出框的内容
    //         var html = [
    //             '<div>确认要通过此项目？</div>',
    //             '<button class="true btn btn-danger"',
    //                 ' style="position: absolute; bottom: 10px;',
    //                 ' right: 100px;">确定</button>',
    //             '<button class="false btn btn-default"',
    //                 ' style="position: absolute; bottom: 10px;',
    //                 ' right: 30px;">取消</button>'
    //         ].join('');
    
    //         $.notice('项目审核提示：', html, function () {
    //             // 确认修改
    //             $('.jq-notice-container .true').on('click', function () {
    //                 var id = $(this).parent().parent('tr').index() + 1;
    //                 var statue = "通过";
    //                 var info = {
    //                         id: id,
    //                         statue: statue
    //                     };
    //                 $.ajax({
    //                     type: "POST",
    //                     url: "????",
    //                     data: info,
    //                     success: function (data) {
    //                         if(typeof data == 'string') {
    //                             data = JSON.parse(data);
    //                         }
    //                         // 解析表格数据
    //                         parseTable(data.aaData);
                            
    //                         // 根据解析的结果，绘制表格
    //                         drawTable(window.formdata);
            
    //                         window.data = data;
    //                     }
    //                 });
    //             });

    //             // 取消修改
    //             $('.jq-notice-container .false').on('click', function () {
    //                 $.closeNotice();
    //             });
    //         }, 300, 150);
    //     });
    //     $('.unpass').on('click',function (event) {
    //         event.preventDefault();
    //          // 插入到弹出框的内容
    //         var html = [
    //             '<div>确认要不通过此项目？</div>',
    //             '<button class="true btn btn-danger"',
    //                 ' style="position: absolute; bottom: 10px;',
    //                 ' right: 100px;">确定</button>',
    //             '<button class="false btn btn-default"',
    //                 ' style="position: absolute; bottom: 10px;',
    //                 ' right: 30px;">取消</button>'
    //         ].join('');
    
    //         $.notice('项目审核提示：', html, function () {
    //             // 确认修改
    //             $('.jq-notice-container .true').on('click', function () {
    //                 var id = $(this).parent().parent('tr').index() + 1;
    //                 var statue = " 不通过";
    //                 var info = {
    //                         id: id,
    //                         statue: statue
    //                     };
    //                 $.ajax({
    //                     type: "POST",
    //                     url: "????",
    //                     data: info,
    //                     success: function (data) {
    //                         if(typeof data == 'string') {
    //                             data = JSON.parse(data);
    //                         }
    //                         // 解析表格数据
    //                         parseTable(data.aaData);
                            
    //                         // 根据解析的结果，绘制表格
    //                         drawTable(window.formdata);
            
    //                         window.data = data;
    //                     }
    //                 });
    //             });

    //             // 取消修改
    //             $('.jq-notice-container .false').on('click', function () {
    //                 $.closeNotice();
    //             });
    //         }, 300, 150);
    //     });
    // }
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
});