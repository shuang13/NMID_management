var log = console.log.bind(console)
var Utils = function () {
    var utils = {
        URLHead: 'http:119.29.234.36:8080/nmid',

    }

    // 验证
    utils.validateEmpty = function (data) {
        for(key in data) {
            if ($.trim(data[key]) == '') {
                $.notice("提示！", "部分信息未填写！");
                return false;
            }
        }
        return true;
    }
    // 绘制表格
    utils.drawTable = function (data) {
        var $frag = $(document.createDocumentFragment());
        var $table = $('table');
        var $ths = $table.find('th');
    
        for(var i = 0; i < data.length; i++) {
            var $tr = $('<tr data-id="' + data[i].id + '"></tr>');
            for(var j = 0; j < $ths.length; j++) {
                $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');
            }
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);
    }
    // 删除
    utils.delete = function (URL) {
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
                        id: $this.closest('tr').attr('data-id')
                    }
                    $.ajax({
                        type: "POST",
                        url: URL,
                        beforeSend: user.loading($('.jq-notice-context')),
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
    
    
    // 加载图标
    utils.loading = function (element) {
        var loadingHtml = '<div id="loading"></div>';
        element.html(loadingHtml);
    }
    // 解析时间戳
    utils.getdate = function (sourceDate) {
        var now = new Date(sourceDate * 1000), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
    // 解析url中的id
    utils.getUrlId = function () {
        var id = window.location.href.split('?')[1].split('=')[1];
        if (id == null) {
            $.notice('提示！', '请在选择编辑对象！');
            setTimeout(function () {
                window.location.href = '../list/page.html';
            }, 1000);
            return false;
        }
        return id;
    }
    return utils;
}

