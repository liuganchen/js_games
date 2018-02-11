//移动的动画
var showMoveAnimation = function (fX, fY, tX, tY) {
    var thisNumber = $('#number-' + fX + '-' + fY);
    thisNumber.animate({
        top: getPosTop(tX, tY),
        left: getPosLeft(tX, tY)
    }, 150);
}


//数字生成动画
var showNumberWithAnimation = function (i, j, ran) {
    var thisNumber = $('#number-' + i + '-' + j);

    thisNumber.css('background-color', getNumberBackgroundColor(ran));
    thisNumber.css('color', getNumberColor(ran));
    thisNumber.text(ran);
    thisNumber.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}
//分数生成
var updateScore = function (score) {
    $('#score').text(score);
}
