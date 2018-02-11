/**
 * 游戏主函数，页面加载完成开始调用
 */

$(document).ready(function () {
    //开始游戏
    startGame();

});
/**
 * 开始游戏
 */
var startGame = function () {

    //游戏初始化
    logic.init();
    //开始计时，游戏开始
    logic.goTime();

}

