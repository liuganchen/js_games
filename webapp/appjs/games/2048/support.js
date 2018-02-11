//到顶端的距离
var getPosTop = function (i, j) {
    return  i * 120;
}

//到左侧的距离
var getPosLeft = function (i, j) {
    return j * 120;
}

//不同的数字不同的背景色
var getNumberBackgroundColor = function (number) {
    switch (number) {
        case 2:
            return "#0de0ee";
            break;
        case 4:
            return "#16eebd";
            break;
        case 8:
            return "#171716";
            break;
        case 16:
            return "#9aee1c";
            break;
        case 32:
            return "#eec01d";
            break;
        case 64:
            return "#ee6814";
            break;
        case 128:
            return "#ee3b1f";
            break;
        case 256:
            return "#ee1055";
            break;
        case 512:
            return "#ee2be0";
            break;
        case 1028:
            return "#8e09ee";
            break;
        case 2048:
            return "#5215ee";
            break;
        case 4096:
            return "#eee9ed";
            break;


    }
    return 'black';
}

//不同的数字不同的颜色
var getNumberColor = function (number) {
    if (number > 4) {
        return 'white';
    }
    return '#776e65';
}


//是不是还有空闲的空格
var space = function (board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

//能不能向左移动
var canMoveLeft = function (board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            //已经有了数字
            if (board[i][j] != 0) {
                //这个数字左侧有相同的数字或者没有数字，可以移动
                if ((board[i][j] == board[i][j - 1]) || (board[i][j - 1] == 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能不能向右移动
var canMoveRight = function (board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            //已经有了数字
            if (board[i][j] != 0) {
                //这个数字右侧有相同的数字或者没有数字，可以移动
                if ((board[i][j] == board[i][j + 1]) || (board[i][j + 1] == 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能不能向下移动
var canMoveDown = function (board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            //已经有了数字
            if (board[i][j] != 0) {
                //这个数字下侧有相同的数字或者没有数字，可以移动
                if ((board[i][j] == board[i + 1][j]) || (board[i + 1][j] == 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}
//能不能向上移动
var canMoveUp = function () {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //已经有了数字
            if (board[i][j] != 0) {
                //这个数字上侧有相同的数字或者没有数字，可以移动
                if ((board[i][j] == board[i - 1][j]) || (board[i - 1][j] == 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}


//一行上面的一个点到一个点有没有障碍物
var noRowBlockHorizontal = function (row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;

        }
    }
    return true;
}
//一列上面一个点到一个点有没有障碍物
var noColBlockHorizontal = function (col, row1, row2, board) {

    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;

        }
    }
    return true;
}