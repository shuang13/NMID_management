/* 通过sessionStorage检查和设置浏览器端的登录状态
 * 暴露到全局的只有一个session对象
 * session对象拥有getLoginState/setLoginState两个方法
 */
    var session = {};
    session.getUserId = '1';
    /* 获取当前登录状态
    * @method window.session.getLoginState
    * @param 无
    * @return {false|String} state|userInfo，未登录则返回false，已登录则返回对应的用户信息
    */
    session.getLoginState = function () {
        var state = sessionStorage.getItem('loginState');
        if(state) {
            return JSON.parse(state);
        } else {
            return false;
        }
    };

    /* 修改当前登录状态
    * @method window.session.setLoginState
    * @param {false|String} state|userInfo，退出登录则输入false，设置登录账户则输入对应的用户信息
    * @return 无
    */
    session.setLoginState = function (userInfo) {
        if(userInfo !== false) {
            sessionStorage.setItem('loginState', JSON.stringify(userInfo));
        } else {
            sessionStorage.removeItem('loginState');
        }
    };

module.exports = session;
