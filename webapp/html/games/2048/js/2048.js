//*****************************************************
//游戏4*4方格数组
var board = [];
//分数
var score = 0;


$(document).ready(function () {

    restart();
});

//游戏重新开始
var restart = function () {
    //游戏初始化
    init();
    //随机生成数字
    getOneNumber();
    getOneNumber();
}
//*********************************************************************************
//响应事件
$(document).keydown(function (e) {
    isGameOver();
    switch (e.keyCode) {
        // ←
        case 37:
            if (moveLeft()) {
                setTimeout('getOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }
            break;
        //↑
        case 38:
            if (moveUp()) {
                setTimeout('getOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }

            break;
        //→
        case 39:
            if (moveRight()) {
                setTimeout('getOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }


            break;
        //↓
        case 40:
            if (moveDown()) {
                setTimeout('getOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }


            break;
        //other
        default:
            break;
    }
});

//*************************************************8*******************************
var init = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = $('#cell-' + i + '-' + j);
            cell.css('top', getPosTop(i, j));
            cell.css('left', getPosLeft(i, j));
        }
    }
    //初始化棋盘上的数组（删除掉游戏上面的所有数字及其颜色背景）
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView();
    score = 0;

}

var getOneNumber = function () {
    if (!space(board)) {
        return false;
    }

    //随机位置0,1,2,3;
    var ranX = parseInt(Math.floor(Math.random() * 4));
    var ranY = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[ranX][ranY] == 0) {
            break;
        }
        ranX = parseInt(Math.floor(Math.random() * 4));
        ranY = parseInt(Math.floor(Math.random() * 4));
    }
    //随机数字
    var ran = Math.random() < 0.5 ? 2 : 4;

    //显示数字
    board[ranX][ranY] = ran;

    showNumberWithAnimation(ranX, ranY, ran);

    return true;
}
//*****************************************************************************888
//更新游戏上的所有数字
var updateBoardView = function () {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#chess').append('<div class="number-cell" id="number-' + i + '-' + j + '"></div>');
            var thisNumber = $('#number-' + i + '-' + j);
            if (board[i][j] == 0) {
                thisNumber.css('width', '0px');
                thisNumber.css('height', '0px');

                thisNumber.css('top', getPosTop(i, j) + 50);
                thisNumber.css('left', getPosLeft(i, j) + 50);
            } else {
                thisNumber.css('width', '100px');
                thisNumber.css('height', '100px');

                thisNumber.css('top', getPosTop(i, j));
                thisNumber.css('left', getPosLeft(i, j));

                thisNumber.css('background-color', getNumberBackgroundColor(board[i][j]));
                thisNumber.css('color', getNumberColor(board[i][j]));
                thisNumber.text(board[i][j]);
            }
        }
    }

}
//*****************************************************************************************
//向左移动函数
var moveLeft = function () {
    //不能移动，直接返回
    if (!canMoveLeft(board)) {
        return false;
    }


    // ← 移动
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    //i,k 为0，并且 i，k到 i，j 之间没有障碍物
                    if (board[i][k] == 0 && noRowBlockHorizontal(i, k, j, board)) {
                        //移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    ////i,k 和 i ，j相等，并且 i，k到 i，j 之间没有障碍物
                    else if (board[i][k] == board[i][j] && noRowBlockHorizontal(i, k, j, board)) {
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        //继续
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 150);
    return true;
}


//向右移动函数
var moveRight = function () {
    //不能移动，直接返回
    if (!canMoveRight(board)) {
        return false;
    }


    // → 移动
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k >= j + 1; k--) {
                    //i,k 为0，并且 i，k到 i，j 之间没有障碍物
                    if (board[i][k] == 0 && noRowBlockHorizontal(i, j, k, board)) {
                        //移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    ////i,k 和 i ，j相等，并且 i，k到 i，j 之间没有障碍物
                    else if (board[i][k] == board[i][j] && noRowBlockHorizontal(i, j, k, board)) {
                        //移动
                        showMoveAnimation(i, j, i, k);
                        //相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        //继续
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 150);
    return true;
}

//向下移动函数
var moveDown = function () {
    //不能移动，直接返回
    if (!canMoveDown(board)) {
        return false;
    }
    // ↓ 移动
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k >= i + 1; k--) {
                    //i,k 为0，并且 i，k到 i，j 之间没有障碍物
                    if (board[k][j] == 0 && noColBlockHorizontal(j, i, k, board)) {
                        //移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    ////i,k 和 i ，j相等，并且 i，k到 i，j 之间没有障碍物
                    else if (board[k][j] == board[i][j] && noColBlockHorizontal(j, i, k, board)) {
                        //移动
                        showMoveAnimation(i, j, k, j);
                        //相加
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        //继续
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 150);
    return true;
}

//向上移动
var moveUp = function () {
    //不能移动，直接返回
    if (!canMoveUp(board)) {
        return false;
    }


    // ↑ 移动
    for (var j = 3; j >= 0; j--) {
        for (var i = 3; i >= 1; i--) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    //k,j 为0，并且 k，j到 i，j 之间没有障碍物
                    if (board[k][j] == 0 && noColBlockHorizontal(j, k, i, board)) {
                        //移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        // console.log('没有障碍0');

                    }
                    ////k,j 和 i ，j相等，并且 i，k到 i，j 之间没有障碍物
                    else if (board[k][j] == board[i][j] && noColBlockHorizontal(j, k, i, board)) {
                        //移动
                        showMoveAnimation(i, j, k, j);
                        //相加
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        // console.log('没有有障碍1');

                        //继续
                        continue;
                    }

                }
            }
        }
    }
    setTimeout('updateBoardView()', 150);
    return true;
}
//*********************************************************************************************
//游戏结束
var isGameOver = function () {
    //判断空格数字
    if (space(board)) {
        //有为0的空格，直接返回false
        return false;
    }

    //判断能否移动
    if (canMoveDown(board) || canMoveRight(board) || canMoveLeft(board) || canMoveUp(board)) {
        //    能任意方向移动，直接返回false
        return false;
    }

    window.alert('游戏结束');
    return true;
}
