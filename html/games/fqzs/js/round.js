/**
 * 游戏轮转类
 * @type
 * {{index: number, speed: number, roll: number, cycle: number,
 *   times: number, prize: number, rime: number, setTimeout: round.setTimeout,
 *   beginRound: round.beginRound, runAStep: round.runAStep, init: round.init,
 *   upSpeed: round.upSpeed, downSpeed: round.downSpeed, start: round.start, stop: round.stop}}
 */
var round = {
    //轮转程序类
    index: 1, //起点
    speed: 400, //初始速度
    roll: 0, //定时器id
    cycle: 1, //已跑的圈数
    times: 4, //至少跑几圈
    prize: -1, //中奖索引
    rime: 0,
    flag: false,//是否轮转

    setTimeout: function () {

    },


    //外部暴露函数
    beginRound: function (beforeAnimal, animal, minRunTimes, speed) {

        //初始化常量
        round.init(beforeAnimal, animal, minRunTimes, speed);

        //开始轮转
        round.runAStep();


    },


    //轮转一步
    runAStep: function () {
        //分别得到第一个和第二个元素
        //第一个元素类型下标chess-cell-1
        var before = round.index;
        //之前的删除class ，下一个加上
        before = (1 == before ? 28 : round.index - 1);
        // console.log(before,round.index);
        $(".chess-cell-" + round.index).addClass('active');
        $(".chess-cell-" + before).removeClass("active");
        // console.log('nowcell-', nowCell.html());

        //先加速跑
        round.upSpeed();
        //再减速跑
        round.downSpeed();

        //更改初始索引 ,走一步
        round.index++;
        round.index = (round.index == 29 ? 1 : round.index);
        // console.log('runAStep');
    },


    //初始化
    init: function (beforeAnimal, animal, minRunTimes, speed) {
        // console.log(beforeAnimal,animal,minRunTimes,speed);
        //根据beforeAnimal 计算出类型下标
        // //      <div class="chess-cell chess-cell-1" id="cell-0-0">猴子</div>
        //         <div class="chess-cell chess-cell-2" id="cell-0-1">兔子</div>
        //         <div class="chess-cell chess-cell-3" id="cell-0-2">兔子</div>
        //         <div class="chess-cell chess-cell-4" id="cell-0-3">兔子</div>
        //         <div class="chess-cell chess-cell-5" id="cell-0-4">鲨鱼</div>
        //         <div class="chess-cell chess-cell-6" id="cell-0-5">燕子</div>
        //         <div class="chess-cell chess-cell-7" id="cell-0-6">燕子</div>
        //         <div class="chess-cell chess-cell-8" id="cell-0-7">燕子</div>
        //         <div class="chess-cell chess-cell-9" id="cell-0-8">鸽子</div>
        //
        //         <div class="chess-cell chess-cell-10" id="cell-1-8">鸽子</div>
        //         <div class="chess-cell chess-cell-11" id="cell-2-8">鸽子</div>
        //         <div class="chess-cell chess-cell-12" id="cell-3-8">鲨鱼</div>
        //         <div class="chess-cell chess-cell-13" id="cell-4-8">孔雀</div>
        //         <div class="chess-cell chess-cell-14" id="cell-5-8">孔雀</div>
        //         <div class="chess-cell chess-cell-15" id="cell-6-8">孔雀</div>
        //
        //         <div class="chess-cell chess-cell-16" id="cell-6-7">老鹰</div>
        //         <div class="chess-cell chess-cell-17" id="cell-6-6">老鹰</div>
        //         <div class="chess-cell chess-cell-18" id="cell-6-5">老鹰</div>
        //         <div class="chess-cell chess-cell-19" id="cell-6-4">鲨鱼</div>
        //         <div class="chess-cell chess-cell-20" id="cell-6-3">狮子</div>
        //         <div class="chess-cell chess-cell-21" id="cell-6-2">狮子</div>
        //         <div class="chess-cell chess-cell-22" id="cell-6-1">狮子</div>
        //         <div class="chess-cell chess-cell-23" id="cell-6-0">熊猫</div>
        //
        //         <div class="chess-cell chess-cell-24" id="cell-5-0">熊猫</div>
        //         <div class="chess-cell chess-cell-25" id="cell-4-0">熊猫</div>
        //         <div class="chess-cell chess-cell-26" id="cell-3-0">鲨鱼</div>
        //         <div class="chess-cell chess-cell-27" id="cell-2-0">猴子</div>
        //         <div class="chess-cell chess-cell-28" id="cell-1-0">猴子</div>

        var beforeIndex = $('#cell-' + beforeAnimal[1] + '-' + beforeAnimal[2]).attr('class');
        var nowIndex = $('#cell-' + animal[1] + '-' + animal[2]).attr('class');

        round.flag = false;
        round.cycle = 1;
        round.index = parseInt(beforeIndex.replace(/[^0-9]/ig, ""));
        round.prize = parseInt(nowIndex.replace(/[^0-9]/ig, ""));
        round.times = parseInt(minRunTimes);
        round.speed = parseInt(speed);
        // console.log('init');
        // console.log('轮转初始化');
        // console.log('从'+round.index,'到'+round.prize,'最少圈'+round.times,'速度'+round.speed);
    },


    //加速跑
    upSpeed: function () {
        //前两圈加速跑
        if (round.cycle < 3&& round.speed > 50) {
        //
        //     console.log('up',round.cycle,round.speed);
            round.speed -= round.index;
            round.stop();
            round.start();
        }
        // console.log('up');
    },
    //减速跑
    downSpeed: function () {
        //记圈数
        if (round.index == 28) {
            // console.log('down1');
            round.cycle += 1;
        }
        if ((round.cycle > (round.times - 1))&& (round.speed <400)) {
        //
        //     console.log('down',round.cycle,round.speed);
            // console.log('down2');
            round.speed += 20;
            round.stop();
            round.start();
        }
        if ((round.cycle > round.times) && (round.index == round.prize)) {
            // console.log('down3');
            round.stop();
            //倒计时和轮转都已经结束
            logic.flag = true;
            // console.log('轮转结束,再次调用countDown()');
            logic.countDown();

        }
        // console.log('down');
    },
    //开始跑
    start: function () {
        round.roll = setInterval(round.runAStep, round.speed);
        // console.log('start');
    },
    //停止
    stop: function () {
        clearInterval(round.roll);
        // console.log('stop');
    },


}
