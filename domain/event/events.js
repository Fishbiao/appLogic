/**
 * Created by employee11 on 2015/12/11.
 */

module.exports = {
    PLAYER:{
        UPDATE_FRAG: 'updateFrag',
        UPDATE_ITEM: 'upateItem',
        LEAVE: 'leave',
        LEVEL_UP: 'levelUp'
    },
    ENTITY: {
        ADD_BUF: 'addBuf',
        REMOVE_BUF: 'removeBuf'
    },
    PERSISTENT:{
        SAVE: 'save',
        FLUSH: 'flush'
    },
    UPDATE_PROP: 'updateProp',//玩家信息修改
    UPDATE_ROOMPROP: 'updateRoomProp',//房间信息修改
    UPDATE_SEATPROP: 'updateSeatProp',//座位信息修改
    REFRESH_PROP: 'refreshProp',
    ON_DEAD: 'onDead',
    REFRESH_HERO_FIGHT:'refreshHeroFight',
};
