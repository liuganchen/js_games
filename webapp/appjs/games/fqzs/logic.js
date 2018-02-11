/**
 * Created by archer on 2017/6/3.
 * 游戏逻辑相关类
 */
var logic = {
    //轮转动物数组
    board: [],
    // 最少轮转圈数，最少跑4圈
    minRunTimes: 4,
    //计时最大时间
    mostime: 30,
    //上次目标动物数组,默认是左上角的猴子
    beforeAnimal: [1, 0, 0],
    //本次目标动物数组[飞禽还是走兽,坐标X，坐标Y]
    animal: [],
    //轮转的初始速度
    speed: 400,
    //计时器id1
    interval1: 0,
    //计时器id2
    interval2: 0,
    //总分
    allScore: 0,
    //实时总分
    allRealScore: 0,
    //本次得分
    getScore: 0,
    //使用的分数
    useScore: 0,
    //刚结算的下注的数组 [飞禽，鲨鱼，走兽，燕子，鸽子，孔雀，老鹰，狮子，熊猫，猴子，兔子]
    beforeBet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //还未开始的下注数组
    nowBet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //赌注的倍数
    multiple: 1,
    //对局
    onGameTimes: 1,
    //能否续压
    canContinue: false,
    //能否下注
    canDoBet: false,
    //历史打中动物的数组
    historyAnimal: ['', '', '', '', '', '', '', '', '', ''],
    //两轮加钱100金币,设置计时器
    goldPlus: 0,
    //计时器的实时数值
    num: 0,
    rime: 1,
    //游戏是否完成一轮
    flag: false,

    /**
     * 定时器
     */
    setTimeout: function () {

        window.setTimeout(function () {
            logic.countDown();
        }, 1000);
    },


    /**
     * 游戏初始化函数
     */
    init: function () {
        //加载游戏场景
        //加载轮转动物
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 9; j++) {
                var cell = $('#cell-' + i + '-' + j);
                cell.css('top', support.getPosTop(i, j));
                cell.css('left', support.getPosLeft(i, j));
                if ((i + j) % 2 == 0) {
                    cell.css('background-color', '#c38564');
                } else {
                    cell.css('background-color', '#c1c39c');
                }
            }
        }

        //加载轮转中心区域
        var information = $('#chess-information');
        information.css('top', 100);
        information.css('left', 130);

        //加载历史打中动物信息
        for (var i = 0; i < 10; i++) {
            var cii = $('#cii-' + i);
            // console.log(cii.attr('id'), getCiiLeft(i));
            cii.css('left', support.getCiiLeft(i));
            if (i % 2 == 0) {
                cii.css('background-color', '#14c3a0');
            } else {
                cii.css('background-color', '#1088c3');
            }
            if (i == 9) {
                cii.css('background-color', '#c30d16');
            }
        }

        //个人信息加载
        var user = $('#chess-user');
        user.css('top', 580);
        user.css('left', 20);
        //赌注区域加载
        var bet = $('#chess-bet');
        bet.css('top', 580);
        bet.css('left', 230);
        var creator = $('#creator');
        //作者信息加载
        creator.css('top', 780);
        creator.css('left', 490);


        //更改续压
        $('#bet-before').val('续压');


        //获取总分数
        logic.allScore = parseInt($('#user-score').html());
        //实时总分更新
        logic.allRealScore = logic.allScore;

        //判断续压
        parseInt(logic.allScore) > parseInt(logic.useScore) ? logic.canContinue = true : logic.canContinue = false;
        //使用分数,获得分数归零
        logic.getScore = 0, logic.useScore = 0;
        //获取对局次数
        logic.onGameTimes = parseInt($('#user-onGameTimes').html());
        //更新数组
        support.betArray(logic.nowBet, logic.beforeBet);
        // console.log('before', beforeBet);
        // console.log('now',nowBet);

        //更新显示
        animation.updateBetBet(logic.nowBet);
        //给游戏所有按钮绑定函数
        $('#chess-bet').off('click');
        $('#chess-bet').on('click', 'input', function (e) {

            // console.log($(this).val() + 'is click');
            // console.log($(this).attr("id") + 'is click');
            //续压被点击
            if ('bet-before' == $(this).attr('id')) {
                if (!logic.canContinue) {
                    $(this).prop('disabled', 'disabled');
                    var str = '~金币不足，不能续压~';
                    animation.availableBtn(str);

                } else {
                    //重复上一次的下注
                    // nowBet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    // console.log('续压被点击1:nowBet' + nowBet);
                    // console.log('续压被点击2:before' + beforeBet);
                    $(this).val('清空');
                    support.betArray(logic.beforeBet, logic.nowBet);
                    // console.log('续压被点击2:nowBet' + nowBet);
                    //更新
                    logic.useScore = animation.updateBetBet(logic.nowBet);
                    // console.log(nowBet);
                    logic.allRealScore = animation.updateSore(logic.allScore, logic.getScore, logic.useScore);
                    animation.showScore(logic.allRealScore);
                }


            } else
            //倍数区被点击
            if ('multiple' == $(this).attr("name")) {
                //所有的颜色不变
                $('[name=multiple]').css('color', '#171716');
                //获取到点击对象的value
                logic.multiple = parseInt($(this).val());
                // console.log('倍数区被点击' + multiple);
                // console.log(multiple);
                $(this).css('color', '#0ac30d');
            } else
            //动物下注区被点击
            if ('bet-animal' == $(this).attr("name")) {
                // console.log('以前的'+beforeBet);
                // console.log('现在的'+nowBet);
                logic.canDoBet = support.canBet(logic.allRealScore, logic.multiple);
                if (!logic.canDoBet) {

                    var str = '~金币不足，不能下注~';
                    animation.availableBtn(str);

                } else {
                    var ccc = parseInt(($(this).attr('id')).replace(/[^0-9]/ig, ""));
                    // console.log('动物下注区被点击:' + ccc);
                    // console.log(ccc);
                    //根据下标进行赋值
                    // console.log("before:  "+nowBet[ccc]);
                    logic.nowBet[ccc] += parseInt(logic.multiple);
                    // console.log("after   :"+nowBet[ccc]);
                    //更新
                    logic.useScore = animation.updateBetBet(logic.nowBet);
                    logic.allRealScore = animation.updateSore(logic.allScore, logic.getScore, logic.useScore);
                    animation.showScore(logic.allRealScore);

                }

            } else {
                alert('系统异常');
            }
        });

    },

    /**
     * 倒计时函数
     */
    goTime: function () {
        logic.num = logic.mostime;
        //倒计时
        logic.setTimeout();

    },
    /**
     * 更新历史打中的动物信息
     */
    updateTheHistoricalOfHitAnimal: function (animals) {
        var ani = support.updateArrayOfLast(logic.historyAnimal, animals);
        // console.log('ani', ani);
        for (var i = 0; i < 10; i++) {
            $('#cii-0-' + i).html(ani[9 - i]);
        }
    },

    /**
     * 倒计时逻辑代码
     */
    countDown: function () {
        //如果游戏没有完成一轮并且num =0
        if (logic.num == 0 && !logic.flag) {
            // console.log('可以开始轮转');
            //可以开始轮转
            round.flag = true;
            //计时器回到最大值
            logic.num = logic.mostime;

        }
        //如果游戏没有完成一轮并且游戏num !=0
        if (logic.num != 0 && !logic.flag) {
            //倒计时逻辑
            animation.updateTime(logic.num);
            logic.num--;
            logic.goldPlus++;
            // animation.updateTime(logic.num);
        }
        //开始执行轮转
        if (round.flag) {
            animation.allBtnNotCan();
            // console.log('开始轮转');
            //计算这次的目标动物
            logic.animal = support.getATargetAnimal();
            // console.log('轮转：'+logic.beforeAnimal,logic.animal);
            round.beginRound(logic.beforeAnimal, logic.animal, logic.minRunTimes, logic.speed);
        } else {
            // console.log('继续倒计时');
            logic.setTimeout();
        }


        //已经完成了一轮开始游戏结算
        if (logic.flag) {
            // console.log('开始游戏结算');
            logic.gameEnd();
            animation.allBtnCan();
            logic.flag = false;
        }


    },
    /**
     * 游戏结算逻辑
     */
    gameEnd: function () {
        //对局++
        logic.onGameTimes++;
        $('#user-onGameTimes').html(logic.onGameTimes);
        //更新打中的历史动物
        logic.updateTheHistoricalOfHitAnimal(logic.animal);


        //判断输赢计算得分
        logic.getScore = support.calculatedScore(logic.nowBet, logic.animal);
        //每分钟加钱100;
        if (logic.goldPlus / 2 == logic.mostime) {

            logic.getScore += 100;
            // console.log('加钱100', getScore);
            logic.goldPlus = 0;
        }

        //更新分数
        logic.allRealScore = animation.updateSore(logic.allScore, logic.getScore, logic.useScore);
        // console.log(allScore, getScore, useScore, allRealScore);
        //显示得分
        animation.showScore(logic.allRealScore);

        //更新上次目标动物数组
        var betArrayResult = support.betArray(logic.animal, logic.beforeAnimal);
        if (!betArrayResult) {
            console.log('更新上次目标动物数组失败');
        }

        logic.init();

    },

}