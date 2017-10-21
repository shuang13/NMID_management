var log = console.log.bind(console)
var Utils = function() {
    var utils = {
        URLHead: '',
        my_id: '',
        my_role: ''
    }

    // 验证
    utils.validateEmpty = function(data) {
        for (key in data) {
            if ($.trim(data[key]) == '') {
                $.notice("提示！", "部分信息未填写！");
                return false;
            }
        }
        return true;
    }
    // 绘制表格
    utils.drawTable = function(data) {
        var $frag = $(document.createDocumentFragment());
        var $table = $('table');
        var $ths = $table.find('th');

        for (var i = 0; i < data.length; i++) {
            var $tr = $('<tr data-id="' + data[i].id + '"></tr>');
            for (var j = 0; j < $ths.length; j++) {
                $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');
            }
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);
    }

    // 加载图标
    utils.loading = function(element) {
        var loadingHtml = '<div id="loading"></div>';
        element.html(loadingHtml);
    }
    // 解析时间戳
    utils.getdate = function(sourceDate) {
        var now = new Date(sourceDate * 1000),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }
    // 解析url中的id
    utils.getUrlId = function() {
        try {
            var id = window.location.href.split('?')[1].split('=')[1];
            return id;
        } catch ( err ) {
            $.notice('提示！', '请选择编辑对象！');
            setTimeout(function() {
                window.location.href = '../list/page.html';
            }, 1000);
            return false;
        }
    }
    // 获取登录状态
    utils.getLoginState = function() {
        var state = sessionStorage.getItem('my_id');
        if (state) {
            return JSON.parse(state);
        } else {
            return false;
        }
    }
    // 设置登录状态
    utils.setLoginState = function(userInfo) {
        if (userInfo !== false) {
            sessionStorage.setItem('my_id', userInfo.id);
            sessionStorage.setItem('my_role', userInfo.role);
        } else {
            sessionStorage.removeItem('my_id');
            sessionStorage.removeItem('my_role');
        }
    }
    // 设置cookie
    utils.setCookie = function(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    //读取cookies 
    utils.getCookie = function(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    //删除cookies 
    utils.delCookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    // 地址跳转
    utils.jumpUrl = function(url, time) {
        setTimeout(function() {
            window.location.href = url;
        }, time)
    }
    utils.loginTesting = function() {
        // 登录状态判断
        if (!utils.getLoginState) {
            $.notice('提示！', '请进行用户登录，正在跳转登录页面...');
            utils.jumpUrl('../../login/index/login.html', 2000);
        } else {
            utils.my_id = sessionStorage.getItem('my_id');
            utils.my_role = sessionStorage.getItem('my_role');
            $.ajax({
                type: "GET",
                url: utils.URLHead + "/users/" + utils.my_id,
                success: function(data) {
                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var aaData = data.body;
                    var status = data.code;
                    if (status == 200) {
                        $('.user-image i').css('background', 'url(' + utils.URLHead + aaData.portrait + ') center no-repeat');
                        $('.user-image i').css('background-size', '130px 130px');
                        $('.user-image .name').html(aaData.name);


                    } else {
                        $('.jq-notice-context').html('链接服务器失败!');
                    }
                }
            });
        }
        // 用户权限判断
        if (utils.my_role != 'admin') {
            $('.admin-view').remove();
        }
        // 暂时隐藏消息功能
        // $('.top-nav').remove();
        // 注销
        $('.top-nav').empty().html('<li class="sign-out">退出</li>');
        $('.sign-out').on('click', function() {
            $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在注销...', function() {
                    utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/users/logout",
                success: function(data) {
                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;
                    if (status == 200) {
                        $('.jq-notice-context').html('注销成功，正在跳转登录页面...');
                        utils.jumpUrl('../../login/index/login.html', 2000);
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                        window.reload();
                    }
                }
            });
        })
    }
    utils.adminRightTesting = function() {
        // 登录权限判断
        if (utils.my_role != 'admin') {
            $.notice('提示！', '对不起，您无浏览该页面权限，正在跳转登录页面...');
            utils.jumpUrl('../../login/index/login.html', 2000);
            return false;
        } else return true
    }

    return utils;
}