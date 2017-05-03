/**
 * 游戏数据基类
 */

var util = require('util');
var _  = require('underscore');

var consts = require('../../consts/consts'),
    Entity = require('./entity'),
    dataUtils = require('../../util/dataUtils'),
    dataApi = require('../../util/dataApi'),
    SeatData = require('./SeatData'),
    area = require('../../domain/area/area'),
    EVENTS = require('../event/events'),
    Code = require('../../../shared/code'),
    thirteenCards = require("../rules/thirteenCards");

//推送房间属信息，会推送给房间内的所有玩家
function onUpdateProp(prop, value) {
    var room = this;
    //if (_.indexOf(player.saveProperties, prop) !== -1) {
    //    player.save();
    //}
    room.pushMsgToMembers('room.updateProp', {prop: prop, value: value});
}

var RoomData = function(opts){
    opts.type = consts.ENTITY_TYPE.ROOM;
    Entity.call(this,opts);

    this.createPlayerId = opts.createPlayerId;         //房间创建者id
    this.seatDataList = [];          //座位信息集合, 如果是已经有的房间重新初始化,调用initSeatDataList方法复制
    this.currOutCardPlayerId = this.currOutCardPlayerId || 0;    //当前出牌人id
    this.createTime = opts.createTime || new Date().getTime();             //创建房间的时间,如果不是已经有的房间重新初始化，就默认为创建房间
    this.finshGameCnt = opts.finshGameCnt || 0;           //已完成游戏局数
    this.bankerSeatIndex = opts.bankerSeatIndex || 0;   //庄家的座位号，默认从0开始
    this.memberCount = opts.count;//本房间允许的玩家人数，几人房
    //牌堆
    this.originalCards = [];

    //上一场的结果
    this.lastResult = null;

    //初始化牌堆
    var _self = this;
    dataApi.PkConfig.getIdsWithoutKing(function(id){
        _self.originalCards.push(id);
    });

    this.on(EVENTS.UPDATE_ROOMPROP, onUpdateProp.bind(this));
};

util.inherits(RoomData, Entity);

var pro = RoomData.prototype;

/*
初始化作为集合信息
* */
pro.initSeatDataList = function(seatDatas){
    var _self = this;
    seatDatas.forEach(function(data){
        _self.addSeatData(data);
    })
}


/***新增一个座位数据 */
pro.addSeatData = function( player ){
    var newSeat = {},
        playerId = player.id;
    newSeat.playerId = playerId
    var seatIndex = this.seatDataList.length;
    newSeat.id = seatIndex;
    newSeat.room = this;
    var seatData = new SeatData( newSeat );
    this.seatDataList.push(seatData);

    //向房间内的玩家推送玩家信息
    var _self = this;
    this.seatDataList.forEach(function(seatData){
        seatData.pushPublicClientInfo(_self.seatDataList);
    });

    player.set("roomId",this.id);
    //判断是否可以发牌,发牌做到装备里面
    //if(this.isMemberFull()){
    //}


};

/**
 * 通过玩家编号获取座位信息
 * */
pro.getSeatByPlayerId = function ( playerId ) {
    for(var i = 0 ; i < this.seatDataList.length ; i++){
        if(this.seatDataList[i].playerId == playerId){
            return this.seatDataList[i];
        }
    }
    return null;
};

/**
 * 是否已经满员
 * */
pro.isMemberFull = function () {
    if(this.seatDataList.length >= this.memberCount){
        return true;
    }
    return false;
};

/**
 * 是否所有人都准备好了
 * */
pro.isAllReady = function () {
    for(var i = 0 ; i < this.seatDataList.length ; i++){
        if(!this.seatDataList[i].getBoolIsReady()){
            return false;
        }
    }
    return true;
};

/**
 * 是否所有人都出牌了
 * */
pro.isAllPlay = function () {
    for(var i = 0 ; i < this.seatDataList.length ; i++){
        if(!this.seatDataList[i].getBoolIsPlay()){
            return false;
        }
    }
    return true;
};


/**
 * 一个座位玩家准备
 * */
pro.getReadByPlayerId = function ( playerId ) {
    var seat = this.getSeatByPlayerId(playerId);
    if(!seat){
        return Code.AREA.NOT_MEMBER_ROOM;
    }
    seat.setIsReady(true);

    //所有人准备好了就发牌
    if(this.isMemberFull() && this.isAllReady()){
        console.log("开始给大家发牌");
        distributeCard(this);
    }

    //thirteenCards.isSpecialType(consts.SHISANSHUI_SPECIAL.SANTONGHUASHUN, [1,2,3,4,5,6,7,8,9,10,11,12,13]);//测试特殊牌型

    return Code.OK;
};

/**
 * 一个座位玩家打牌出来
 * isSpecial:是否为特殊牌型 1 == 是
 * cards：非特殊牌型的组牌顺序
 * */
pro.setPlayCards = function (playerId, specialType ,ordinaryType, cards){
    var seat = this.getSeatByPlayerId(playerId);
    if(!seat){
        return Code.AREA.NOT_MEMBER_ROOM;
    }
    if(seat.getBoolIsPlay()){//已经出牌
        return Code.AREA.HAVE_PLAYERED;
    }
    if(cards ==null)
    {
        cards = seat.getHandData();
    }
    //如果是特殊牌型
    if(specialType != consts.SHISANSHUI_SPECIAL.NULL){
        if(thirteenCards.isSpecialType(specialType, cards)){//检验是否真的指定特殊牌
            seat.setSpecialType(specialType);
        }
        else{
            return Code.AREA.NOT_FIGER_SPECIALTYPE;
        }
    }
    else{
        if(ordinaryType[0] > ordinaryType[1] || ordinaryType[1] > ordinaryType[2]){
            return Code.AREA.TYPE_SORT_ERROR;
        }
        if(thirteenCards.checkOrdinaryCard(ordinaryType, cards))
        {
            seat.setHandData(cards);//前中后墩放一起了。
            seat.setOrdinaryType(ordinaryType);
        }
        else{
            return Code.AREA.ORDINARY_TYPE_ERROR;
        }
    }
    seat.setIsPlay(true);

    return Code.OK;
}

//设置上一场的结果
/*pro.setLastResult = function(_result){
    this.lastResult = _result;
}

//获取上一场的结果
pro.getLastResult = function(){
    return this.lastResult;
}*/

//处理成员离线
pro.onMemberLogoff = function(player){
    for(var i = 0 ; i < this.seatDataList.length ; i++){
        var seatData = this.seatDataList[i];
        if(seatData.getPlayerId() == player.id){
            seatData.setIsOffline(true);
            if(!seatData.getBoolIsPlay()){//如果没有出牌
                var cards = thirteenCards.offlineSort(seatData.getHandData());
                var _code = this.setPlayCards(player.id ,consts.SHISANSHUI_SPECIAL.NULL, [consts.SHISANSHUI_ORDINARY.SANPAI,consts.SHISANSHUI_ORDINARY.SANPAI,consts.SHISANSHUI_ORDINARY.SANPAI], cards);
                //都出牌了，要进行各种积分
                if(this.isAllPlay()){
                    //第一步，将不是特殊牌型的几个玩家的牌进行比较，分别得出第一二三轮的出牌顺序和得分情况。
                    var ordinarySeatList = {};//普通牌型的座位信息 {座位号：座位信息}
                    var specialSeatList = {};//特殊牌型的座位信息
                    for(var i = 0 ; i < this.seatDataList.length ; i++){
                        if(this.seatDataList[i].getSpecialType() == consts.SHISANSHUI_SPECIAL.NULL){
                            ordinarySeatList[this.seatDataList[i].getSeatIndex()] = this.seatDataList[i];
                        }
                        else{
                            specialSeatList[this.seatDataList[i].getSeatIndex()] = this.seatDataList[i];
                        }
                    }

                    //结果计算完毕，把结果推送给玩家
                    var result = thirteenCards.calcResult(ordinarySeatList,ordinarySeatList);

                    this.pushMsgToMembers('thirtyCards.result',result);

                    this.setLastResult(result);
                }
            }
            //delete this.seatDataList[i];//不能直接删除，不然会出问题
            break;
        }
    }
}


/***刷新一个座位数据 */
pro.refreshSeatData = function(seatData){
    var seatIndex = seatData.seatIndex;
    this.seatDataList[seatIndex].refreshData(seatData);
};

/***推送一条信息给房间里所有人 */
pro.pushMsgToMembers = function(route, msg){
    this.seatDataList.forEach(function(seatData){
        var playerId = seatData.playerId;
        var player = area.getPlayer(playerId);
        if(!!player && !seatData.getBoolIsOffline()){
            player.pushMsg(route, msg);
        }
    });
}


pro.getClientInfo = function(){
    var info = {};
    info.id = this.id;
    info.createPlayerId = this.createPlayerId;
    info.currOutCardPlayerId = this.currOutCardPlayerId;
    info.createTime = this.createTime;
    info.finshGameCnt = this.finshGameCnt;
    info.bankerSeatIndex = this.bankerSeatIndex;
    //info.seatDataList = _map(this.seatDataList.);//等座位功能完成后再写    --座位信息不再这里发，而是没进来一个人就像房间内的所有人推送桌位信息

    return info;
}

//发牌方法
function distributeCard(room){
    //先要洗牌
    room.originalCards = _.shuffle(room.originalCards);

    var countEachroom = room.memberCount;
    var countEachseat = dataUtils.getOptionValue('NumEachSeat_shisanshui', 13);
    var cardsOfseat = [];
    for(var i = 0 ; i < countEachroom ; i ++){//连续的牌发给一个座位，从庄家开始
        var distSeatIndex = (room.bankerSeatIndex + i + countEachroom)%countEachroom;//应该发牌的座位号
        //cardsOfseat.length = 0;
        cardsOfseat = [];
        for(var j = distSeatIndex* countEachseat ; j < distSeatIndex* countEachseat + countEachseat ; j ++){
            cardsOfseat.push(room.originalCards[j]);
        }

        var seatData = room.seatDataList[distSeatIndex];
        seatData.setHandData(cardsOfseat);

        var player = area.getPlayer(seatData.playerId);
        if(player){
            player.pushMsg("seat.getHandCards",{cards:cardsOfseat});
        }
        else{
            logger.error("player "+ seatData.playerId +" is not online");
        }
    }
}


module.exports = RoomData;