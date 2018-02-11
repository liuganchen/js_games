/**
 * 游戏底层js(工具类)
 * @param i
 * @param j
 * @returns {number}
 */
var support = {

    //到顶端的距离
    getPosTop: function (i, j) {
        return 20 + i * 80;
    },

    //到左侧的距离
    getPosLeft: function (i, j) {
        return 20 + j * 110;
    },
    //到左侧的距离
    getCiiLeft: function (e) {
        return 10 + e * 73.5;
    },


    //获取一个目标动物
    getATargetAnimal: function () {
        //**********************************************
        // 燕子 猴子 兔子  鸽子  X6    16% 概率  → 65%        13      16.7
        // 熊猫 孔雀            X8    12%     --20%        6       12.5
        // 老鹰 狮子            X12   5%      --12%         4        8%
        // 鲨鱼                X24   2%       --3%          1        4%
        //
        //
        var animal1 = [[0, 0], [1, 0], [2, 0],//猴子
            [0, 1], [0, 2], [0, 3],//兔子
            [0, 5], [0, 6], [0, 7],//燕子
            [0, 8], [1, 8], [2, 8]]//鸽子
        var animal2 = [[4, 0], [5, 0], [6, 0],//熊猫
            [4, 8], [5, 8], [6, 8]]//孔雀
        var animal3 = [[6, 5], [6, 6], [6, 7],//老鹰
            [6, 1], [6, 2], [6, 3]]//狮子
        var animal4 = [[0, 4], [3, 0], [3, 8], [6, 4]]//鲨鱼

        //随机数0-99
        var r = parseInt(Math.floor(Math.random() * 100));


        //返回的数组三个元素。飞禽还是走兽，坐标X,Y
        var as = [0, 0, 0];

        if (r < 65) {
            var r1 = parseInt(Math.floor(Math.random() * animal1.length));
            //返回随机的猴子，兔子，燕子，鸽子
            //判断是飞禽还是走兽
            if (r1 < 6) {
                //走兽
                as[0] = 1;
            } else {
                //飞禽
                as[0] = 0;
            }
            as[1] = animal1[r1][0];
            as[2] = animal1[r1][1];

        } else if (r < 85) {
            var r2 = parseInt(Math.floor(Math.random() * animal2.length));
            //返回随机的熊猫 孔雀
            if (r2 < 3) {
                //走兽
                as[0] = 1;
            }
            as[1] = animal2[r2][0];
            as[2] = animal2[r2][1];

        } else if (r < 97) {
            var r3 = parseInt(Math.floor(Math.random() * animal3.length));
            // 老鹰 狮子
            if (r3 < 3) {
                //飞禽
                as[0] = 0;
            } else {
                //走兽
                as[0] = 1;
            }

            as[1] = animal3[r3][0];
            as[2] = animal3[r3][1];
        } else {
            var r4 = parseInt(Math.floor(Math.random() * animal4.length));
            // 是鲨鱼
            as[0] = 2;
            // 鲨鱼
            as[1] = animal4[r4][0];
            as[2] = animal4[r4][1];
        }

        return as;
    },

    /**
     * 计算得分
     *入参为下注的数组，和目标动物名称
     * <!--   0   1     2    3     4    5     6   7    8    9     10 -->
     * <!--[飞禽，鲨鱼，走兽，燕子，鸽子，孔雀，老鹰，狮子，熊猫，猴子，兔子]-->
     *
     * @param beforeBet
     * @param as
     * @returns {number}
     */
    calculatedScore: function (beforeBet, as) {
        //分数
        var score = 0;
        var bet = 0;
        // /下标
        var xiaBiao;
        //根据目标as 找到对应的下标
        //判断是飞禽还是走兽 走兽=1，飞禽=0
        var isAni = as[0];
        if (0 == isAni) {
            score += parseInt(beforeBet[0]) * 2;
            // console.log('飞禽');
        } else if (1 == isAni) {
            score += parseInt(beforeBet[2]) * 2;
            // console.log('走兽');
        }

        //找到目标方块
        var cell = $('#cell-' + as[1] + '-' + as[2]);
        // 根据目标方块找到对应的动物
        var animalName = cell.html();

        //进行判断 和 计算
        // 燕子 猴子 兔子  鸽子  X6    16% 概率  → 65%        13      16.7
        // 熊猫 孔雀            X8    12%     --20%        6       12.5
        // 老鹰 狮子            X12   5%      --12%         4        8%
        // 鲨鱼                X24   2%       --3%          1        4%
        if ('鲨鱼' == animalName) {
            // console.log('鲨鱼');
            xiaBiao = 1;
            bet = 24;
        } else if ('燕子' == animalName) {
            // console.log('燕子');

            xiaBiao = 3;
            bet = 6;
        } else if ('鸽子' == animalName) {
            // console.log('鸽子');

            xiaBiao = 4;
            bet = 6;
        } else if ('孔雀' == animalName) {
            // console.log('孔雀');

            xiaBiao = 5;
            bet = 8;
        } else if ('老鹰' == animalName) {
            // console.log('老鹰');

            xiaBiao = 6;
            bet = 12;
        } else if ('狮子' == animalName) {
            // console.log('狮子');

            xiaBiao = 7;
            bet = 12;
        } else if ('熊猫' == animalName) {
            // console.log('熊猫');

            xiaBiao = 8;
            bet = 8;
        } else if ('猴子' == animalName) {
            // console.log('猴子');

            xiaBiao = 9;
            bet = 6;
        } else if ('兔子' == animalName) {
            // console.log('兔子');

            xiaBiao = 10;
            bet = 6;
        }

        //计算
        score += parseInt(beforeBet[xiaBiao]) * bet;
        // console.log(score+' : 获得分数');
        return score;

    },

//下注数组的赋值(把第一个入参的数组的值,给第二个入参的数组),第一个数组清空
    betArray: function (one, two) {

        if (one.length != two.length) {
            return false;
        }
        for (var i = 0; i < one.length; i++) {
            var k = one[i];
            var l = two[i];

            two[i] = k;
            one[i] = 0;

            // console.log('one',i,one[i]);
            // console.log('two',i,two[i]);
        }
        return true;
    },

    /**
     * 把入参加入到数组(10位的)的第一位，数组数据先后平移，删除原来的数组最后一个下标的内容
     * @param arr
     * @param args
     * @returns {*}
     */
    updateArrayOfLast: function (arr, args) {
        // console.log('arr',arr);
        var i = args[1];
        var j = args[2];
        var animal = $('#cell-' + i + '-' + j).html();
        for (var i = 9; i >= 0; i--) {
            if (i > 0) {
                arr[i] = arr[i - 1]
            }
        }
        arr[0] = animal;

        return arr;
    },
    //能否下注
    canBet: function (all, bet) {
        // console.log('canBet()',all,bet);
        if (bet <= all) {
            return true;
        } else {
            return false;
        }
    },

}





