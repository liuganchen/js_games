//棋盘的绘画
//找到棋盘
var chess = document.getElementById('chess');
//绘画的内建对象
var context = chess.getContext('2d');
//绘画的样式
context.strokeStyle = '#BFBFBF';
//游戏角色 true 代表黑色，false白色
var m = true;
//游戏开关
var over = false;
//棋盘落子信息
var chess_info = [];
for (var i = 0; i < 15; i++) {
    //把这个数据扩展成二维数组
    chess_info[i] = []
    for (var j = 0; j < 15; j++) {
        chess_info[i][j] = 0;
    }
}
//绘画作者信息
var info = new Image();
info.src = "../img/info.png";
info.onload = function () {
    //画info
    context.drawImage(info, 0, 0, 450, 450);
    //画棋线
    drawChessBoard();
    //画棋子
    // drawChessPiece(2, 2, true);
    // drawChessPiece(1, 1, false);
}

//循环作画棋盘的线
var drawChessBoard = function () {
    for (var i = 0; i < 15; i++) {
        // 画竖线
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 450 - 15);
        context.stroke();

        //画横线
        context.moveTo(15, 15 + i * 30);
        context.lineTo(450 - 15, 15 + i * 30);
        context.stroke();
    }
}

//画旗子,xy 坐标，m黑白子
var drawChessPiece = function (x, y, m) {
    context.beginPath();
    context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    //设置棋子颜色渐变
    var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
    if (m) {
        //黑色棋子
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(1, '#636766');

    } else {
        //白色棋子
        gradient.addColorStop(0, '#D1D1D1');
        gradient.addColorStop(1, '#F9F9F9');
    }
    context.fillStyle = gradient;
    context.fill();
}

//给棋盘绑定点击事件
chess.onclick = function (e) {
    //游戏结束或者不是黑子，直接return
    if (over) {
        return;
    }
    if (!m) {
        return;
    }
    //获取鼠标位置
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    //i,j位置没有棋子，才能落子
    if (chess_info[i][j] == 0) {
        drawChessPiece(i, j, m);
        chess_info[i][j] = 1;

        //    判断胜负
        for (var c = 0; c < count; c++) {
            if (wins[i][j][c]) {
                //向胜利逼近
                myWin[c]++;
                //AI不能走
                AIWin[c] = 6;
                if (myWin[c] == 5) {
                    window.alert('你赢了！');
                    over = true;
                }
            }
        }
        //AI走子
        if (!over) {
            m = !m;
            computerAI();
        }
    }
}

//********************************************************AI**********************************************************************//
//赢法数组 三维的数组
var wins = [];
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
//赢法种类
var count = 0;

// 所有的竖线赢法种类
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            //记录下
            var nu = j + k;
            wins[i][nu][count] = true;
            // console.log(i+','+nu+','+count);
        }
        count++;
    }
}
//横线的赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 15; j++) {
        for (var k = 0; k < 5; k++) {
            //记录下
            var nu = i + k;
            wins[i + k][j][count] = true;
            // document.write(nu+','+j+','+count+'<br>');
        }
        count++;
    }
}

//斜线的赢法 /
for (var i = 4; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            //记录下
            var nx = i - k;
            var ny = j + k;
            wins[nx][ny][count] = true;
            // document.write(nx+','+ny+','+count+'<br>');
        }
        count++;
    }
}
//反斜线的赢法  \
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            //记录下
            var nx = i + k;
            var ny = j + k;
            wins[nx][ny][count] = true;
            // document.write(nx+','+ny+','+count+'<br>');
        }
        count++;
    }
}

//***************************************************************************************//
//赢法的统计数组
//我赢
var myWin = [];
//AI赢
var AIWin = [];
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    AIWin[i] = 0;
}

//********************************************************************************************//
//AI逻辑
var computerAI = function () {
    var myScore = [];
    var AIScore = [];
    var max = 0;
    var u = 0, v = 0;
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        AIScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            AIScore[i][j] = 0;
        }
    }
    //遍历棋盘
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            //找到所有空闲的点
            if (chess_info[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    //此处可以落子
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 100;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (AIWin[k] == 1) {
                            AIScore[i][j] += 200;
                        } else if (AIWin[k] == 2) {
                            AIScore[i][j] += 400;
                        } else if (AIWin[k] == 3) {
                            AIScore[i][j] += 3000;
                        } else if (AIWin[k] == 4) {
                            AIScore[i][j] += 20000;
                        }
                    }
                }
                //分析my 的分数
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;

                } else if (myScore[i][j] == max) {
                    if (AIScore[i][j] > AIScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                //分析自己的分数
                if (AIScore[i][j] > max) {
                    max = AIScore[i][j];
                    u = i;
                    v = j;

                } else if (AIScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    drawChessPiece(u,v,false);
    chess_info[u][v] = 2;
    //    判断胜负
    for (var c = 0; c < count; c++) {
        if (wins[u][v][c]) {
            //向胜利逼近
            AIWin[c]++;
            //AI不能走
            myWin[c] = 6;
            if (AIWin[c] == 5) {
                window.alert('计算机赢了！');
                over = true;
            }
        }
    }
    //AI走子
    if (!over) {
        m = !m;
    }

}





