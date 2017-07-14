/**
 * create by archer
 * @param time
 * 游戏动画类(工具类)
 */
var animation = {
    /**
     * 动画类调用标识
     */
    flag : true,
    /**
     * 下方的倒计时实时更新时间
     * @param time
     */
    updateTime: function (time) {
        $('#goTime').text(time + 'S');
    },


    /**
     * 下注区域的数字 实时更新
     * @param e
     * @returns {number}
     */
    updateBetBet: function (e) {
        // console.log(e);
        var ss = 0;
        for (var i = 0; i <= 10; i++) {
            $('#span-' + i).html(e[i]);
            var s = $('#span-' + i).html();
            ss += parseInt(s);
        }
        // console.log('updateBetBet---'+ss);
        return ss;
    },


    /**
     * 玩家总分进行更新
     * @param i
     * @returns {*}
     */
    showScore: function (i) {
        $('#user-score').text(i);
        return i;
    },

    /**
     * 提示之前按钮不可用，提示并且按钮可用；
     * @param info
     */
    availableBtn: function (info) {
        $('[name=bet-animal]').prop('disabled', 'disabled');
        $('#bet-before').prop('disabled', 'disabled');
        $("#chess-information-info").html(info).show(300).delay(1000).hide(300, function () {

            $('[name=bet-animal]').prop('disabled', '');
            $('#bet-before').prop('disabled', '');
            // console.log(_this,123);
        });
    },

    /**
     * 所有的按钮不可用
     */

    allBtnNotCan:function () {
        $('[name=bet-animal]').prop('disabled', 'disabled');
        $('#bet-before').prop('disabled', 'disabled');
    },

    /**
     * 所有的按钮可用
     */
    allBtnCan :function () {
        $('[name=bet-animal]').prop('disabled', '');
        $('#bet-before').prop('disabled', '');
    },

    /**
     * 更新提示信息
     * @param info
     */
    updatePromptInformation: function (info) {
        setTimeOut(function () {
            $("#div").hide();
        }, 2000);
    },

    /**
     * 分数的更新
     * @param all
     * @param get
     * @param use
     * @returns {number}
     */
    updateSore: function (all, get, use) {

        // console.log(all);
        // console.log(get);
        // console.log(use);
        var i = parseInt(all) + parseInt(get) - parseInt(use);
        return i;
    },
}
