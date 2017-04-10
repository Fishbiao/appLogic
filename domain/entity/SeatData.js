/**
 * 座位数据
 */
var util = require('util');

var _  = require('underscore');

var Entity = require('./entity'),
    consts = require('../../consts/consts'),
    area = require('../../domain/area/area'),
    EVENTS = require('../event/events');

//推送房间属性
function onUpdateProp(prop, value) {
    var seat = this;
    var playerId = seat.playerId;
    var player = area.getPlayer(playerId);

    if(!!player){
        player.pushMsg('seat.updateProp', {prop: prop, value: value});
    }
}

var SeatData = function(opts){
    opts = opts || {};
    opts.type = consts.ENTITY_TYPE.SEAT;
    Entity.call(this,opts);

    this.clearn();
    this.playerId = opts.playerId;
    this.room = opts.room;

    this.on(EVENTS.UPDATE_SEATPROP, onUpdateProp.bind(this));
}


util.inherits(SeatData, Entity);
var pro = SeatData.prototype;
 
/***
 * 初始化座位数据
 * */ 
pro.clearn = function(){ 

    /*=========================公开数据========================*/
    //座位号
    //this.seatIndex = -1; //使用Entity中的id

    //墙牌牌数量
    this.WallCardCnt  = 0;  

    //吃牌数据
    this.eatData = [];  

    //碰牌数据 
    this.pengData = [];  

    //杠牌数据
    this.gangData = [];  

    /*=========================私有数据========================*/
    //手牌数据
    this.handData = [];

    //普通牌型
    this.ordinaryType = [];

    //默认没有准备好
    this.isReady = false;

    //特殊牌型
    this.specialType = 0;

    //是否出牌了
    this.isPlay = false;
};

//================================黄金分割线=================================
/***
 * 设置座位号
 * */  
pro.setSeatIndex = function(seatIndex){
    this.id = seatIndex;
    return this; 
};

/***
 * 设置吃牌数据
 * */  
pro.setEatData = function(eatData){
    this.eatData = eatData;
    return this;  
};

/***
 * 设置碰牌数据
 * */  
pro.setPengData = function(pengData){
    this.pengData = pengData;
    return this;  
};

/***
 * 设置杠牌数据
 * */  
pro.setGangData = function(gangData){
    this.gangData = gangData;
    return this;  
};

/***
 * 设置手牌数据
 * */
pro.setHandData = function(handData){
    this.handData = handData;
    return this;
};

/***
 * 设置手牌类型
 * */
pro.setOrdinaryType = function(ordinaryType){
    this.ordinaryType = ordinaryType;
    return this;
};


//================================黄金分割线=================================

/***
 * 获取座位号
 * return int；
 * */  
pro.getSeatIndex = function(){
    return  this.id;
};

/***
 * 获取碰牌数据
 * return 二维数组；
 * */  
pro.getPengData = function(){
    return  this.pengData; 
};

/***
 * 获取吃牌数据   
 * return 二维数组；
 * */  
pro.getEatData = function(){
    return  this.eatData; 
};

/***
 * 获取杠牌数据
 * return 二维数组；
 * */  
pro.getGangData = function(){
    return  this.gangData; 
};

/***
 * 获取手牌数据
 * return 二维数组；
 * */  
pro.getHandData = function(){
    return  this.handData; 
};

/***
 * 获得手牌类型
 * */
pro.getOrdinaryType = function(){
    return this.ordinaryType;
};

pro.setIsReady = function(_isReady){
    this.isReady = _isReady;
    this.room.pushMsgToMembers('seat.ready',{seatId:this.id});
};

pro.getBoolIsReady = function(){
    return this.isReady;
};

pro.setIsPlay = function(_isPlay){
    this.isPlay = _isPlay;
};

pro.getBoolIsPlay = function(){
    return this.isPlay;
};

pro.setSpecialType = function(_specialType){
    this.specialType = _specialType;
}

pro.getSpecialType = function(){
    return this.specialType;
};

pro.refreshData = function(data){
    this.mSeatData = data;

}

pro.getSeatPublicClientInfo = function(){
    var info = {};
    info.id = this.id;
    info.playerId = this.playerId;
    info.WallCardCnt = this.WallCardCnt;//墙牌牌数量
    info.eatData = this.eatData;//吃牌数据
    info.pengData = this.pengData;//碰牌数据
    info.gangData = this.gangData;//杠牌数据
    info.isReady = this.isReady ? 1 : 0;//是否已经准备好 1=是，0=否

    return info;
}

pro.pushPublicClientInfo = function(seatDataList){
    var playerId = this.playerId;

    var player = area.getPlayer(playerId);
    if(player){//在线的才推送
        var seats = [];
        for(var i = 0 ; i < seatDataList.length ; i++){
            seats.push(seatDataList[i].getSeatPublicClientInfo());
        }
        player.pushMsg('seatData.push', seats);
    }
}

module.exports = SeatData;