/*
* 单例模式
* 十三张的规则
* */
var consts = require('../../consts/consts'),
    dataApi = require('../../util/dataApi'),
    _ = require('underscore');

//数组相减，arr1中重复的不会被剪掉，不然直接使用_.without方法就可以了。
function arraysubtract(arr1,arr2){
    for (var i = arr1.length - 1; i >= 0; i--) {
        a = arr1[i];
        for (var j = arr2.length - 1; j >= 0; j--) {
            b = arr2[j];
            if (a == b) {
                arr1.splice(i, 1);
                arr2.splice(j, 1);
                break;
            }
        }
    }
    return arr1;
}

//判断给出点数的牌是否为顺子  points是三张牌的点数数组
function isShunzi_3(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        return true;
    }
    else{
        return false;
    }
}

//判断给出点数的牌是否为顺子  points是五张牌的点数数组
function isShunzi_5(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        return true;
    }
    else{
        return false;
    }
}

//判断给出点数的牌是否为顺子  points是八张牌的点数数组
function isShunzi_8(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [3,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }
    order = [5,3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }

    return false;
}


//判断给出点数的牌是否为顺子  points是十张牌的点数数组
function isShunzi_10(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [5,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }

    return false;
}

//------------------判断是否为特殊牌型------------------------
//判断给出点数的牌是否为三顺子  points是十三张牌的点数数组
function isSanshunzi(points){
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray,true);

    var order = [3,5,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前三个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的10个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的5个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    order = [5,3,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前五个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的8个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的5个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    order = [5,5,3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前五个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的8个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的3个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    return false;

   /* 这是心路历程，有问题，但是保留
   if(uniqArray.length < 5){//小于5，则不可能找到5个的顺子了。
        return false;
    }
    else {
        if (uniqArray[4] - uniqArray[0] == 4) {//第一個是是个五顺子
            var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//_.without(orderArray,uniqArray[0],uniqArray[1],uniqArray[2],uniqArray[3],uniqArray[4]);//剩下的8个
            var uniqArray = _.uniq(orderArray,true);

            if(uniqArray.length < 5) {
                return false;
            }
            else{
                if (uniqArray[4] - uniqArray[0] == 4) {//第二个是五顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//剩下的3个
                    if(orderArray[2] - orderArray[0] == 2){//是顺子
                        return true;//553
                    }
                    else{
                        return false;
                    }
                }
                else if (uniqArray[2] - uniqArray[0] == 2) {//是个三顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,3));//剩下的5个
                    if(orderArray[4] - orderArray[0] == 4){//是顺子
                        return true;//535
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
        }
        else if(uniqArray[2] - uniqArray[0] == 2){//第一个是个三顺子
            var orderArray = arraysubtract(orderArray,_.first(uniqArray,3));//剩下的10个
            var uniqArray = _.uniq(orderArray,true);

            if(uniqArray.length < 5) {
                return false;
            }
            else{
                if (uniqArray[4] - uniqArray[0] == 4) {//第一个是五顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//剩下的5个
                    if(orderArray[4] - orderArray[0] == 4){//是顺子
                        return true;//355
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }*/
}

//判断给出编号的牌是否为三顺子,注意A可以是1，也可以是14
function isSanshunziByPkIds(handCards){
    var points = [];
    var Acount = 0;//尖儿的个数
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5) {
            if (temp.value == 1) {
                Acount = Acount + 1;
            }
            else {
                points.push(temp.value);
            }
        }
    });
    if(Acount == 0){
        return isSanshunzi(points);
    }
    else if(Acount == 1){
        return isSanshunzi(points.slice(0).push(1)) || isSanshunzi(points.slice(0).push(14));
    }
    else if(Acount == 2){
        var temp = points.slice(0);
        temp.push(1);
        temp.push(1);
        var temp1 = points.slice(0);
        temp1.push(1);
        temp1.push(14);
        var temp2 = points.slice(0);
        temp2.push(14);
        temp2.push(14);
        return isSanshunzi(temp) || isSanshunzi(temp1) || isSanshunzi(temp2);
    }
    else if(Acount == 3){
        var temp = points.slice(0);
        temp.push(1);
        temp.push(1);
        temp.push(1);
        var temp1 = points.slice(0);
        temp1.push(1);
        temp1.push(1);
        temp1.push(14);
        var temp2 = points.slice(0);
        temp2.push(1);
        temp2.push(14);
        temp2.push(14);
        var temp3 = points.slice(0);
        temp3.push(14);
        temp3.push(14);
        temp3.push(14);
        return isSanshunzi(temp) || isSanshunzi(temp1) || isSanshunzi(temp2) || isSanshunzi(temp3);
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三同花
function isSantonghuaByPkIds(handCards){
    var types = [0,0,0,0];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            types[temp.cardType - 1] = types[temp.cardType - 1] + 1;
        }
    });
    if(types[0] > 0 && types[1] > 0 && types[2] > 0 && types[3] > 0){//有四种花色，肯定不对
        return false;
    }
    for(var i = 0 ; i < 4 ; i ++){
        if(types[i] > 0){
            if(types[i] != 3 && types[i] != 5 && types[i] != 8 && types[i] != 10 && types[i] != 13) {
                return false;
            }
        }
    }
    return true;
}

//判断给出编号的牌是否为六对半
function isLiuduibanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;

    values.forEach(function(value){
        if(value % 2 == 1){
            singeCount = singeCount + 1;
        }
    });

    if(singeCount == 1){//如果只有一个是单的
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为五对冲三
function isWuduichongsanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var threeCount = 0;

    values.forEach(function(value){
        if(value == 3){
            threeCount = threeCount+ 1;
        }
        else{
            if(value % 2 == 1){
                singeCount = singeCount + 1;
            }
        }
    });

    if(threeCount == 1 && singeCount == 0){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为四套冲三
function isSitaochongsanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var threeCount = 0;

    values.forEach(function(value){
        if(value == 3){
            threeCount = threeCount+ 1;
        }
        if(value == 1){
            singeCount = singeCount+ 1;
        }
    });

    if(threeCount == 4 && singeCount == 1){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为凑一色
function isChouyiseByPkIds(handCards){
    var types = [0,0,0,0];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            types[temp.cardType - 1] = types[temp.cardType - 1] + 1;
        }
    });
    var blackCount = types[0]+types[2];
    var redCount = types[1]+types[3];

    if(blackCount == 13 && redCount == 0 || (blackCount == 0 && redCount == 13)){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为全小
function isQuanxiaoByPkIds(handCards){
    var valuesBig = 0;
    var valuesSmall = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value >= 8){
                valuesBig = valuesBig + 1;
            }
            if(temp.value >= 2 && temp.value <= 8){
                valuesSmall = valuesSmall + 1;
            }
        }
    });

    if(valuesBig == 0 && valuesSmall == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为全大
function isQuandaByPkIds(handCards){
    var valuesBig = 0;
    var valuesSmall = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value >= 8){
                valuesBig = valuesBig + 1;
            }
            if(temp.value >= 2 && temp.value <= 8){
                valuesSmall = valuesSmall + 1;
            }
        }
    });

    if(valuesBig == 13 && valuesSmall == 0){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三套炸弹
function isSantaozadanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var fourCount = 0;

    values.forEach(function(value){
        if(value == 4){
            fourCount = fourCount+ 1;
        }
        if(value == 1){
            singeCount = singeCount+ 1;
        }
    });

    if(fourCount == 3 && singeCount == 1){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三同花顺---没写完
function isSantonghuashunByPkIds(handCards){
    var typePoints = [];
    typePoints.push([]);
    typePoints.push([]);
    typePoints.push([]);
    typePoints.push([]);
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            typePoints[temp.cardType - 1].push(temp.value);
        }
    });

    var typeCount = 0;
    typePoints.forEach(function (typePoint) {
        if(typePoint.length > 0){
            typeCount = typeCount + 1;
        }
    })
    if(typeCount >3){//花色超过三种，肯定不是
        return false;
    }

    var noSanlian = true;
    for(var i = 0; i < typePoints.length ; i ++){
        var thisLength = typePoints[i].length;
        var bAcount = false;//因为是同花，所以A最多一个
        var indexA = -1;
        for(var j = 0 ; j < typePoints[i].length ; j ++){
            if(typePoints[i][j] == 1)
            {
                bAcount = true;
                indexA = j;
                break;
            }
        }
        if(thisLength > 0){
            if(noSanlian && thisLength == 3){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_3(typePoints[i]) || isShunzi_3(pointsClone)){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_3(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }

            }
            else if(thisLength == 5){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_5(typePoints[i]) || isShunzi_5(pointsClone)){
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_5(typePoints[i])){
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(noSanlian && thisLength == 8){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_8(typePoints[i]) || isShunzi_8(pointsClone)){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_8(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(thisLength == 10){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_10(typePoints[i]) || isShunzi_10(pointsClone)){
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_10(typePoints[i])){
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(noSanlian && thisLength == 13){
                if(bAcount){
                    if(isSanshunzi(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{//13张都是同一种颜色时，如果没有A，那肯定不是顺子
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }


    return  true;
}

//判断给出编号的牌是否为十二皇族
function isShierhuangzuByPkIds(handCards){
    var huangzuCount = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value > 10){
                huangzuCount = huangzuCount + 1;
            }
        }
    });

    if(huangzuCount == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为十三水
function isShisanshuiByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });

    var singleCount = 0;

    values.forEach(function(value){
        if(value == 1){
            singleCount = singleCount+ 1;
        }
    });

    if(singleCount == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为同花十三水
function isTonghuashisanshuiByPkIds(handCards){
    var values = [];
    var types = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
            types[temp.cardType - 1] = (types[temp.cardType - 1] || 0) + 1;
        }
    });

    var singleCount = 0;
    var typeCount = 0;

    values.forEach(function(value){
        if(value == 1){
            singleCount = singleCount+ 1;
        }
    });
    types.forEach(function (type) {
        typeCount = typeCount + 1;
    });

    if(singleCount == 13 && typeCount == 1){
        return true;
    }
    else{
        return false;
    }
}
//end------------------判断是否为特殊牌型------------------------

//------------------判断是否为普通牌型------------------------
//判断给出编号的牌是否为一对
function isYiduiByPkIds(handCards){
    var points = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            points.push(temp.value);
        }
    });
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray,true);
    if(handCards.length > uniqArray.length){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为两对
function isLiangduiByPkIds(handCards){
    if(handCards.length == 3){
        return false;
    }
    var points = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            points.push(temp.value);
        }
    });
    var orderArray = _.sortBy(points);
    if((orderArray[0] == orderArray[1] && orderArray[2] == orderArray[3])
        ||(orderArray[0] == orderArray[1] && orderArray[3] == orderArray[4])
        ||(orderArray[1] == orderArray[2]) && orderArray[3] == orderArray[4]){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三条
function isSantiaoByPkIds(handCards){
    var points = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            points.push(temp.value);
        }
    });
    var orderArray = _.sortBy(points);
    if((orderArray[0] == orderArray[1] && orderArray[0] == orderArray[2])
        ||(orderArray[1] == orderArray[2] && orderArray[1] == orderArray[3])
        ||(orderArray[2] == orderArray[3] && orderArray[2] == orderArray[4])){
        return true;
    }else{
        return false;
    }
}

//判断给出编号的牌是否为顺子
function isShunziByPkIds(handCards){
    if(handCards.length == 3){
        return false;
    }
    var points = [];
    var Acount = 0;//尖儿的个数
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5) {
            if (temp.value == 1) {
                Acount = Acount + 1;
            }
            else {
                points.push(temp.value);
            }
        }
    });
    if(Acount == 0){
        var orderArray = _.sortBy(points);
        if(orderArray[0] == orderArray[1] - 1 && orderArray[0] == orderArray[2] - 2 && orderArray[0] == orderArray[3] - 3 && orderArray[0] == orderArray[4] - 4){
            return true;
        }else{
            return false;
        }
    }
    else if(Acount == 1){
        var orderArray = _.sortBy(points.slice(0).push(1));
        var orderArray1 = _.sortBy(points.slice(0).push(14));
        if((orderArray[0] == orderArray[1] - 1 && orderArray[0] == orderArray[2] - 2 && orderArray[0] == orderArray[3] - 3 && orderArray[0] == orderArray[4] - 4) ||
            (orderArray1[0] == orderArray1[1] - 1 && orderArray1[0] == orderArray1[2] - 2 && orderArray1[0] == orderArray1[3] - 3 && orderArray1[0] == orderArray1[4] - 4)){
            return true;
        }else{
            return false;
        }
    }
    else{
        return false;//两个以上的A不可能为顺子了
    }
}

//判断给出编号的牌是否为同花
function isTonghuaByPkIds(handCards) {
    if(handCards.length == 3){
        return false;
    }
    var firstType = -1;
    var ret = true;
    for(var i = 0 ; i < handCards.length ;  i++){
        var temp = dataApi.PkConfig.findById(handCards[i]);
        if(temp.cardType < 5) {
            if(firstType == -1){//记录第一个
                firstType = temp.cardType;
            }
            else{
                if(temp.cardType != firstType){
                    ret = false;
                    break;
                }
            }
        }
    }
    return ret;
}

//判断给出编号的牌是否为葫芦（由三条加一对组成）
function isHuluByPkIds(handCards) {
    if(handCards.length == 3){
        return false;
    }
    var points = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            points.push(temp.value);
        }
    });
    var orderArray = _.sortBy(points);
    if((orderArray[0] == orderArray[1] && orderArray[0] == orderArray[2] && orderArray[3] == orderArray[4]) ||
        (orderArray[0] == orderArray[1] && orderArray[2] == orderArray[3] && orderArray[2] == orderArray[4])){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为铁支（4张相同的牌）
function isHTiezhiByPkIds(handCards) {
    if(handCards.length == 3){
        return false;
    }
    var points = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            points.push(temp.value);
        }
    });
    var orderArray = _.sortBy(points);
    if((orderArray[0] == orderArray[1] && orderArray[0] == orderArray[2] && orderArray[0] == orderArray[3]) ||
        (orderArray[1] == orderArray[2] && orderArray[1] == orderArray[3] && orderArray[1] == orderArray[4])){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为同花顺
function isTonghuashunByPkIds(handCards) {
    if(handCards.length == 3){
        return false;
    }
    return isTonghuaByPkIds(handCards)  && isShunziByPkIds(handCards);
}


//end------------------判断是否为普通牌型------------------------

//------------------比较普通牌型大小------------------------
function getComparePoints(A,B){
    var pointsA = [];
    A.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1){
                pointsA.push(14);
            }
            else{
                pointsA.push(temp.value);
            }
        }
    });

    var pointsB = [];
    B.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1){
                pointsB.push(14);
            }
            else{
                pointsB.push(temp.value);
            }
        }
    });

    return [pointsA,pointsB];
}

function compareSanpaiByValue(pointsA,pointsB){
    var orderArrayA = _.sortBy(pointsA);
    var orderArrayB = _.sortBy(pointsB);
    for(var i = 0 ; i < orderArrayA.length ; i++){
        if(orderArrayA[i] > orderArrayB[i]){
            return 1;
        }
        else if(orderArrayA[i] < orderArrayB[i]){
            return -1;
        }
    }
    return 0;
}
//比较散牌
function compareSanpaiPkIds(A,B){
    if(A.length != B.length){
        return 0;
    }

    var points = getComparePoints(A,B);

    return compareSanpaiByValue(points[0],points[1]);
}

//比较一对
function compareYiduiPkIds(A,B){
    var points = getComparePoints(A,B);

    //先找出对子
    var duiziAValue = 1,
        duiziBValue = 1;
    var temp = _.sortBy(points[0]);
    temp = _.uniq(temp,true);
    duiziAValue = arraysubtract(points[0].slice(0),temp)[0];
    temp = _.sortBy(points[1]);
    temp = _.uniq(temp,true);
    duiziBValue = arraysubtract(points[1].slice(0),temp)[0];
    if(duiziAValue > duiziBValue){
        return 1;
    }
    else if(duiziAValue < duiziBValue){
        return -1;
    }

    //对牌相同，比较散牌
    var sanA = _.without(points[0].slice(0),duiziAValue);
    var sanB = _.without(points[1].slice(0),duiziBValue);
    return compareSanpaiByValue(sanA,sanB);
}

//比较两对
function compareLiangduiPkIds(A,B){
    var points = getComparePoints(A,B);

    //先找出对子
    var duiziAValues = [],
        duiziBValues = [];
    var temp = _.sortBy(points[0]);
    temp = _.uniq(temp,true);
    duiziAValues = arraysubtract(points[0].slice(0),temp);
    duiziAValues =_.sortBy(duiziAValues);
    duiziAValues.forEach(function (value){
        if(value == 1){
            value = 14;
        }
    });
    temp = _.sortBy(points[1]);
    temp = _.uniq(temp,true);
    duiziBValues = arraysubtract(points[1].slice(0),temp);
    duiziBValues =_.sortBy(duiziBValues);
    duiziBValues.forEach(function (value){
        if(value == 1){
            value = 14;
        }
    });
    var liangduiResult = compareSanpaiByValue(duiziAValues,duiziBValues);

    if(liangduiResult == 0){//比较剩下的一张牌的大小
        var sanA = _.without(points[0].slice(0),duiziAValues[0],duiziAValues[1]);
        var sanB = _.without(points[1].slice(0),duiziBValues[0],duiziBValues[1]);
        if(sanA == 1){
            sanA = 14;
        }if(sanB == 1){
            sanB = 14;
        }
        if(sanA > sanB){
            return 1;
        }
        else if(sanA == sanB){
            return 0;
        }
        else{
            return -1;
        }
    }
    else{
        return liangduiResult;
    }
}

//比较三条,好巧，跟判断一对的过程一模一样
function compareSantiaoPkIds(A,B){
    return compareYiduiPkIds(A,B);
}

//比较顺子
function compareShunziPkIds(A,B){
    var pointsA = [];
    var ABool = false;
    A.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1){
                ABool = true;
            }
            else{
                pointsA.push(temp.value);
            }
        }
    });

    var pointsB = [];
    var BBool = false;
    B.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1){
                BBool = true;
            }
            else {
                pointsB.push(temp.value);
            }
        }
    });

    if(ABool){
        if(pointsA[0] <= 5){
            pointsA.push(1);
        }
        else{
            pointsA.push(14);
        }
    }
    if(BBool){
        if(pointsB[0] <= 5){
            pointsB.push(1);
        }
        else{
            pointsB.push(14);
        }
    }

    var orderArrayA = _.sortBy(pointsA);
    var orderArrayB = _.sortBy(pointsB);
    if(orderArrayA[0] > orderArrayB[0]){
        return 1;
    }
    else if(orderArrayA[0] < orderArrayB[0]){
        return -1;
    }
    return 0;
}

//比较同花
function compareTonghuaPkIds(A,B){
    return compareSanpaiPkIds(A,B);
}

//比较葫芦
function compareHuluPkIds(A,B){
    var points = getComparePoints(A,B);

    var orderArrayA = _.sortBy(points[0]);
    var orderArrayB = _.sortBy(points[1]);

    var santiaoAValue = 0,
        yiduiAValue = 0,
        santiaoBValue = 0,
        yiduiBValue = 0;
    if(orderArrayA[0] == orderArrayA[1] && orderArrayA[0] == orderArrayA[2]){
        santiaoAValue = orderArrayA[0];
        yiduiAValue = orderArrayA[4];
    }
    else{
        santiaoAValue = orderArrayA[4];
        yiduiAValue = orderArrayA[0];
    }
    if(orderArrayB[0] == orderArrayB[1] && orderArrayB[0] == orderArrayB[2]){
        santiaoBValue = orderArrayB[0];
        yiduiBValue = orderArrayB[4]
    }
    else{
        santiaoBValue = orderArrayB[4];
        yiduiBValue = orderArrayB[0];
    }

    if(santiaoAValue > santiaoBValue){
        return 1;
    }
    else if(santiaoAValue == santiaoBValue){
        if(yiduiAValue > yiduiBValue){
            return 1;
        }
        else if(yiduiAValue == yiduiBValue){
            return 0;
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

//比较铁支
function compareTiezhiPkIds(A,B){
    var points = getComparePoints(A,B);

    var orderArrayA = _.sortBy(points[0]);
    var orderArrayB = _.sortBy(points[1]);

    var tiezhiAValue = 0,
        sanAValue = 0,
        tieHiBValue = 0,
        sanBValue = 0;
    if(orderArrayA[0] == orderArrayA[1] && orderArrayA[0] == orderArrayA[2] && orderArrayA[0] == orderArrayA[3]){
        tiezhiAValue = orderArrayA[0];
        sanAValue = orderArrayA[4];
    }
    else{
        tiezhiAValue = orderArrayA[4];
        sanAValue = orderArrayA[0];
    }
    if(orderArrayB[0] == orderArrayB[1] && orderArrayB[0] == orderArrayB[2] && orderArrayB[0] == orderArrayB[3]){
        tieHiBValue = orderArrayB[0];
        sanBValue = orderArrayB[4];
    }
    else{
        tieHiBValue = orderArrayB[4];
        sanBValue = orderArrayB[0];
    }

    if(tiezhiAValue > tieHiBValue){
        return 1;
    }
    else if(tiezhiAValue == tieHiBValue){
        if(sanAValue > sanBValue){
            return 1;
        }
        else if(sanAValue == sanBValue){
            return 0;
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

//比较同花顺
function compareTonghuaShunPkIds(A,B){
    return compareShunziPkIds(A,B);
}
//end------------------比较普通牌型大小------------------------

//判断普通牌型是否正确,这里只有一墩牌
function checkOrdinary(type,handCards){
    switch (type) {
        case consts.SHISANSHUI_ORDINARY.SANPAI:
            return true;//散牌是最小的，不做判断，直接判定为真
        case consts.SHISANSHUI_ORDINARY.YIDUI:
            return isYiduiByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.LIANGDUI:
            return isLiangduiByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.SANTIAO://三条
            return isSantiaoByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.SHUNZI://顺子
            return isShunziByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.TONGHUA://同花
            return isTonghuaByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.HULU://葫芦
            return isHuluByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.TIEZHI://铁支
            return isHTiezhiByPkIds(handCards);
        case consts.SHISANSHUI_ORDINARY.TONGHUASHUN://同花顺
            return isTonghuashunByPkIds(handCards);
        default:
            return false;
    }
}

module.exports = {
    singleton: 5,
    isSpecialType: function(specialType,handCards) {
        switch (specialType) {
            case consts.SHISANSHUI_SPECIAL.SANSHUNZI:
                return isSanshunziByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTONGHUA:
                return isSantonghuaByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.LIUDUIBAN:
                return isLiuduibanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.WUDUICHONGSAN:
                return isWuduichongsanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SITAOCHONGSAN:
                return isSitaochongsanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.CHOUYISE:
                return isChouyiseByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.QUANXIAO:
                return isQuanxiaoByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.QUANDA:
                return isQuandaByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTAOZADAN:
                return isSantaozadanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTONGHUASHUN:
                return isSantonghuashunByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SHIERHUANGZU:
                return isShierhuangzuByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SHISANSHUI:
                return isShisanshuiByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.TONGHUASHISANSHUI:
                return isTonghuashisanshuiByPkIds(handCards);
            default:
                return false;
        }
    },

    //判断普通牌型
    checkOrdinaryCard: function(ordinaryType, cards){
        var tempBegin = [0,3,8];
        var tempEnd = [3,8,13];
        for(var i = 2 ; i >= 0 ; i ++)//从后面往前面判断，因为头墩可能会用到后面两墩的结果
        {
            if(!checkOrdinary(ordinaryType[i],cards.slice(tempBegin[i],tempEnd[i]))){
                return false;
            }
        }
        return true;
    },

    //判断同一牌型大小，A>B返回1，A==B返回0 ，A<B返回-1
    compareSameType: function(A,B,ordinaryType){
        switch (ordinaryType){
            case consts.SHISANSHUI_ORDINARY.SANPAI:
                return compareSanpaiPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.YIDUI:
                return compareYiduiPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.LIANGDUI:
                return compareLiangduiPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.SANTIAO://三条
                return compareSantiaoPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.SHUNZI://顺子
                return compareShunziPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.TONGHUA://同花
                return compareTonghuaPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.HULU://葫芦
                return compareHuluPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.TIEZHI://铁支
                return compareTiezhiPkIds(A,B);
            case consts.SHISANSHUI_ORDINARY.TONGHUASHUN://同花顺
                return compareTonghuaShunPkIds(A,B);
            default:
                return false;
        }
    },

    //离线后按照从小到大的顺序
    offlineSort :function(handCards){
        var points = [];
        handCards.forEach(function(pkId){
            var temp = dataApi.PkConfig.findById(pkId);
            if(temp.cardType < 5){
                var data = [];
                if(temp.value == 1){
                    data.value = 14;
                }
                else{
                    data.value = temp.value;
                }
                data.pkId = pkId;

                points.push(data);
            }
        });

        var sortData = _.sortBy(points, 'value');

        var ret = [];
        sortData.forEach(function (data) {
            ret.push(data.pkId);
        });
        sortData.length = 0;
        points.length = 0;

        return ret;
    },

    //计算结果
    calcResult:function(ordinarySeatList,specialSeatList){
        var firstCycle = [];//第一轮出牌顺序和内容*****
        for(var seatIndex in ordinarySeatList){
            var playData = {};
            playData.seatIndex = seatIndex;//出牌的座位号
            playData.ordinaryType = ordinarySeatList[seatIndex].getOrdinaryType();
            playData.cards = ordinarySeatList[seatIndex].getHandData().slice(0,3);//打出的牌编号
            firstCycle.push(playData);
        }
        //按照牌型从大到小排序
        var firstCycleSort = _.sortBy(firstCycle,function(data){
            return -data.ordinaryType;
        });
        var firstScore = [0,0,0,0];//第一轮得分，按座位号顺序*****
        var firstDaqiangFlag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var firstDaqiangScore = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];//用于计算打枪分数
        for(var i = 0 ; i < firstCycle.length ; i++){
            for(var j = i + 1 ; j < firstCycle.length ; j++){
                if(firstCycle[i].ordinaryType > firstCycle[j].ordinaryType){
                    var rate = 1;
                    if(firstCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.SANTIAO){
                        rate = 3;//头墩为冲三，3分
                    }
                    firstScore[firstCycle[i].seatIndex] += 1*rate;
                    firstScore[firstCycle[j].seatIndex] -= 1*rate;

                    firstDaqiangFlag[firstCycle[i].seatIndex][firstCycle[j].seatIndex] += 1;
                    firstDaqiangFlag[firstCycle[j].seatIndex][firstCycle[i].seatIndex] -= 1;

                    firstDaqiangScore[firstCycle[i].seatIndex][firstCycle[j].seatIndex] += 1*rate;
                    firstDaqiangScore[firstCycle[j].seatIndex][firstCycle[i].seatIndex] -= 1*rate;

                }
                else if(firstCycle[i].ordinaryType == firstCycle[j].ordinaryType){//比较里面的大小
                    var comp = thirteenCards.compareSameType(firstCycle[i].cards,firstCycle[j].cards,firstCycle[i].ordinaryType);
                    if(comp > 0)
                    {
                        var rate = 1;
                        if(firstCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.SANTIAO){
                            rate = 3;//头墩为冲三，3分
                        }
                        firstScore[firstCycle[i].seatIndex] += 1*rate;
                        firstScore[firstCycle[j].seatIndex] -= 1*rate;

                        firstDaqiangFlag[firstCycle[i].seatIndex][firstCycle[j].seatIndex] += 1;
                        firstDaqiangFlag[firstCycle[j].seatIndex][firstCycle[i].seatIndex] -= 1;

                        firstDaqiangScore[firstCycle[i].seatIndex][firstCycle[j].seatIndex] += 1*rate;
                        firstDaqiangScore[firstCycle[j].seatIndex][firstCycle[i].seatIndex] -= 1*rate;
                    }
                    else if(comp < 0){
                        var rate = 1;
                        if(firstCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.SANTIAO){
                            rate = 3;//头墩为冲三，3分
                        }
                        firstScore[firstCycle[i].seatIndex] -= 1*rate;
                        firstScore[firstCycle[j].seatIndex] += 1*rate;

                        firstDaqiangFlag[firstCycle[i].seatIndex][firstCycle[j].seatIndex] -= 1;
                        firstDaqiangFlag[firstCycle[j].seatIndex][firstCycle[i].seatIndex] += 1;

                        firstDaqiangScore[firstCycle[i].seatIndex][firstCycle[j].seatIndex] -= 1*rate;
                        firstDaqiangScore[firstCycle[j].seatIndex][firstCycle[i].seatIndex] += 1*rate;
                    }
                }
                else{
                    var rate = 1;
                    if(firstCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.SANTIAO){
                        rate = 3;//头墩为冲三，3分
                    }
                    firstScore[firstCycle[i].seatIndex] -= 1*rate;
                    firstScore[firstCycle[j].seatIndex] += 1*rate;

                    firstDaqiangFlag[firstCycle[i].seatIndex][firstCycle[j].seatIndex] -= 1;
                    firstDaqiangFlag[firstCycle[j].seatIndex][firstCycle[i].seatIndex] += 1;

                    firstDaqiangScore[firstCycle[i].seatIndex][firstCycle[j].seatIndex] -= 1*rate;
                    firstDaqiangScore[firstCycle[j].seatIndex][firstCycle[i].seatIndex] += 1*rate;
                }
            }
        }

        var secondCycle = [];//第二轮出牌顺序和内容,第一轮中按牌面大小顺序出*****
        firstCycleSort.forEach(function(cycleData){
            var seatData = ordinarySeatList[cycleData.seatIndex];
            var playData = {};
            playData.seatIndex = seatData.seatIndex;
            playData.ordinaryType = seatData.getOrdinaryType();
            playData.cards = seatData.getHandData().slice(3,8);//打出的牌编号
            secondCycle.push(playData);
        });
        //按照牌型从大到小排序
        var secondCycleSort = _.sortBy(secondCycle,function(data){
            return -data.ordinaryType;
        });
        var secondScore = [0,0,0,0];//第二轮得分，按座位号顺序*****
        var secondDaqiangFlag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var secondDaqiangScore = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];//用于计算打枪分数
        for(var i = 0 ; i < secondCycle.length ; i++){
            for(var j = i + 1 ; j < secondCycle.length ; j++){
                if(secondCycle[i].ordinaryType > secondCycle[j].ordinaryType){
                    var rate = 1;
                    if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.HULU){
                        rate = 2;//中墩葫芦，2分
                    }
                    else if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                        rate = 7;//铁支在中墩，7分
                    }
                    else if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                        rate = 9;//同花顺在中墩，9分
                    }
                    secondScore[secondCycle[i].seatIndex] += 1*rate;
                    secondScore[secondCycle[j].seatIndex] -= 1*rate;

                    secondDaqiangFlag[secondCycle[i].seatIndex][secondCycle[j].seatIndex] += 1;
                    secondDaqiangFlag[secondCycle[j].seatIndex][secondCycle[i].seatIndex] -= 1;

                    secondDaqiangScore[secondCycle[i].seatIndex][secondCycle[j].seatIndex] += 1*rate;
                    secondDaqiangScore[secondCycle[j].seatIndex][secondCycle[i].seatIndex] -= 1*rate;
                }
                else if(secondCycle[i].ordinaryType == secondCycle[j].ordinaryType){//比较里面的大小
                    var comp = thirteenCards.compareSameType(secondCycle[i].cards, secondCycle[j].cards, secondCycle[i].ordinaryType);
                    if(comp > 0)
                    {
                        var rate = 1;
                        if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.HULU){
                            rate = 2;//中墩葫芦，2分
                        }
                        else if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                            rate = 7;//铁支在中墩，7分
                        }
                        else if(secondCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                            rate = 9;//同花顺在中墩，9分
                        }
                        secondScore[secondCycle[i].seatIndex] += 1*rate;
                        secondScore[secondCycle[j].seatIndex] -= 1*rate;

                        secondDaqiangFlag[secondCycle[i].seatIndex][secondCycle[j].seatIndex] += 1;
                        secondDaqiangFlag[secondCycle[j].seatIndex][secondCycle[i].seatIndex] -= 1;

                        secondDaqiangScore[secondCycle[i].seatIndex][secondCycle[j].seatIndex] += 1*rate;
                        secondDaqiangScore[secondCycle[j].seatIndex][secondCycle[i].seatIndex] -= 1*rate;
                    }
                    else if(comp < 0){
                        var rate = 1;
                        if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.HULU){
                            rate = 2;//中墩葫芦，2分
                        }
                        else if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                            rate = 7;//铁支在中墩，7分
                        }
                        else if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                            rate = 9;//同花顺在中墩，9分
                        }
                        secondScore[secondCycle[i].seatIndex] -= 1*rate;
                        secondScore[secondCycle[j].seatIndex] += 1*rate;

                        secondDaqiangFlag[secondCycle[i].seatIndex][secondCycle[j].seatIndex] -= 1;
                        secondDaqiangFlag[secondCycle[j].seatIndex][secondCycle[i].seatIndex] += 1;

                        secondDaqiangScore[secondCycle[i].seatIndex][secondCycle[j].seatIndex] -= 1*rate;
                        secondDaqiangScore[secondCycle[j].seatIndex][secondCycle[i].seatIndex] += 1*rate;
                    }
                }
                else{
                    var rate = 1;
                    if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.HULU){
                        rate = 2;//中墩葫芦，2分
                    }
                    else if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                        rate = 7;//铁支在中墩，7分
                    }
                    else if(secondCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                        rate = 9;//同花顺在中墩，9分
                    }
                    secondScore[secondCycle[i].seatIndex] -= 1*rate;
                    secondScore[secondCycle[j].seatIndex] += 1*rate;

                    secondDaqiangFlag[secondCycle[i].seatIndex][secondCycle[j].seatIndex] -= 1;
                    secondDaqiangFlag[secondCycle[j].seatIndex][secondCycle[i].seatIndex] += 1;

                    secondDaqiangScore[secondCycle[i].seatIndex][secondCycle[j].seatIndex] -= 1*rate;
                    secondDaqiangScore[secondCycle[j].seatIndex][secondCycle[i].seatIndex] += 1*rate;
                }
            }
        }

        var thirdCycle = [];//第三轮出牌顺序和内容,第二轮中按牌面大小顺序出*****
        secondCycleSort.forEach(function(cycleData){
            var seatData = ordinarySeatList[cycleData.seatIndex];
            var playData = {};
            playData.seatIndex = seatData.seatIndex;
            playData.ordinaryType = seatData.getOrdinaryType();
            playData.cards = seatData.getHandData().slice(8,13);//打出的牌编号
            thirdCycle.push(playData);
        });
        var thirdScore = [0,0,0,0];//第三轮得分，按座位号顺序*****
        var thirdDaqiangFlag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var thirdDaqiangScore = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];//用于计算打枪分数
        for(var i = 0 ; i < thirdCycle.length ; i++){
            for(var j = i + 1 ; j < thirdCycle.length ; j++){
                if(thirdCycle[i].ordinaryType > thirdCycle[j].ordinaryType){
                    var rate = 1;
                    if(thirdCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                        rate = 4;//铁支在中墩，4分
                    }
                    else if(thirdCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                        rate = 5;//同花顺在中墩，5分
                    }
                    thirdScore[thirdCycle[i].seatIndex] += 1*rate;
                    thirdScore[thirdCycle[j].seatIndex] -= 1*rate;

                    thirdDaqiangFlag[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] += 1;
                    thirdDaqiangFlag[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] -= 1;

                    thirdDaqiangScore[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] += 1*rate;
                    thirdDaqiangScore[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] -= 1*rate;
                }
                else if(thirdCycle[i].ordinaryType == thirdCycle[j].ordinaryType){//比较里面的大小
                    var comp = thirteenCards.compareSameType(thirdCycle[i].cards,thirdCycle[j].cards,thirdCycle[i].ordinaryType);
                    if(comp > 0)
                    {
                        var rate = 1;
                        if(thirdCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                            rate = 4;//铁支在中墩，4分
                        }
                        else if(thirdCycle[i].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                            rate = 5;//同花顺在中墩，5分
                        }
                        thirdScore[thirdCycle[i].seatIndex] += 1*rate;
                        thirdScore[thirdCycle[j].seatIndex] -= 1*rate;

                        thirdDaqiangFlag[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] += 1;
                        thirdDaqiangFlag[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] -= 1;

                        thirdDaqiangScore[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] += 1*rate;
                        thirdDaqiangScore[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] -= 1*rate;
                    }
                    else if(comp < 0){
                        var rate = 1;
                        if(thirdCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                            rate = 4;//铁支在中墩，4分
                        }
                        else if(thirdCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                            rate = 5;//同花顺在中墩，5分
                        }
                        thirdScore[thirdCycle[i].seatIndex] -= 1*rate;
                        thirdScore[thirdCycle[j].seatIndex] += 1*rate;

                        thirdDaqiangFlag[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] -= 1;
                        thirdDaqiangFlag[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] += 1;

                        thirdDaqiangScore[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] -= 1*rate;
                        thirdDaqiangScore[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] += 1*rate;
                    }
                }
                else{
                    var rate = 1;
                    if(thirdCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TIEZHI){
                        rate = 4;//铁支在中墩，4分
                    }
                    else if(thirdCycle[j].ordinaryType == consts.SHISANSHUI_ORDINARY.TONGHUASHUN){
                        rate = 5;//同花顺在中墩，5分
                    }
                    thirdScore[thirdCycle[i].seatIndex] -= 1*rate;
                    thirdScore[thirdCycle[j].seatIndex] += 1*rate;

                    thirdDaqiangFlag[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] -= 1;
                    thirdDaqiangFlag[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] += 1;

                    thirdDaqiangScore[thirdCycle[i].seatIndex][thirdCycle[j].seatIndex] -= 1*rate;
                    thirdDaqiangScore[thirdCycle[j].seatIndex][thirdCycle[i].seatIndex] += 1*rate;
                }
            }
        }

        var specialCycle = [];//特殊牌型出牌*****
        for(var seatIndex in specialSeatList){
            var playData = {};
            playData.seatIndex = seatIndex;//出牌的座位号
            playData.specialType = specialSeatList[seatIndex].getSpecialType();
            playData.cards = specialSeatList[seatIndex].getHandData();//打出的牌编号
            specialCycle.push(playData);
        }
        var specialScoreTemplate = [3,4,4,5,6,10,10,10,20,20,24,36,108];
        var specialScore = [0,0,0,0];//特殊牌得分，按座位号顺序*****
        for(var i = 0 ; i < specialCycle.length ; i++) {//特殊牌之间的比较得分
            for (var j = i + 1; j < specialCycle.length; j++) {
                if(specialCycle[i].specialType > specialCycle[j].specialType){
                    specialScore[specialCycle[i].seatIndex] += 1*specialScoreTemplate[specialCycle[i].specialType];
                    specialScore[specialCycle[j].seatIndex] -= 1*specialScoreTemplate[specialCycle[i].specialType];
                }
                else if(specialCycle[i].specialType < specialCycle[j].specialType){
                    specialScore[specialCycle[i].seatIndex] -= 1*specialScoreTemplate[specialCycle[j].specialType];
                    specialScore[specialCycle[j].seatIndex] += 1*specialScoreTemplate[specialCycle[j].specialType];
                }

            }
        }
        for(var i = 0 ; i < specialCycle.length ; i++) {//特殊牌和普通牌之间的比较得分
            for(var j = 0 ; j < ordinarySeatList.length ; j++){
                specialScore[specialCycle[i].seatIndex] += 1*specialScoreTemplate[specialCycle[i].specialType];
                specialScore[ordinarySeatList[j].seatIndex] -= 1*specialScoreTemplate[specialCycle[i].specialType];
            }
        }

        //----------到这里，出牌顺序和得分计算完成，接下来计算打枪和全垒打
        //打枪计算
        var daqiangData = [];//[[a,b],[]]表示座位号a对座位号b打枪*****
        var daqiangScore = [0,0,0,0];//打枪结果每个座位应该加减的分数，按座位号顺序*****
        //if(room.seatDataList.length >= 3){//3人和3人以上的局才算打枪
        for(var i = 0 ; i < room.seatDataList.length ; i ++){
            for(var j = i + 1 ; j < room.seatDataList.length ; j ++){
                if(firstDaqiangFlag[i][j] + secondDaqiangFlag[i][j] + thirdDaqiangFlag[i][j] == 3){//表示i对j打枪,i,j就是座位顺序 3表示三轮
                    var temp = {};
                    temp.fire = i;
                    temp.beShot = j;
                    daqiangData.push(temp);

                    daqiangScore[i] = firstDaqiangScore[i][j] + secondDaqiangScore[i][j] + thirdDaqiangScore[i][j];
                    daqiangScore[j] = firstDaqiangScore[j][i] + secondDaqiangScore[j][i] + thirdDaqiangScore[j][i];
                }
            }
        }
        // }

        //计算全垒打
        var quanleidaIndex = -1;//全垒打的座位号*****
        var quanleidaScore = [0,0,0,0];//全垒打结果每个座位应该加减的分数，按座位号顺序*****
        if(room.seatDataList.length == 4){//4人局才算全垒打
            var daqiangCount = [0,0,0,0];
            for(var i = 0 ; i < daqiangData.length ; i ++){
                daqiangCount[daqiangData[i][0]] += 1;
            }
            for(var i = 0 ; i < daqiangCount.length ; i ++){
                if(daqiangCount[i] == room.seatDataList.length - 1){
                    quanleidaIndex = i;
                    break;
                }
            }
            if(quanleidaIndex != -1){//有全垒打者
                for(var i = 0 ; i < room.seatDataList.length ; i ++){
                    quanleidaScore[i] += 2*daqiangScore[i];//这里的倍率应该配置
                }
            }
        }

        //结果计算完毕，把结果推送给玩家
        var result = {};
        result.firstCycle = firstCycle;//第一轮出牌数据
        result.secondCycle = secondCycle;//第二轮出牌数据
        result.thirdCycle = thirdCycle;//第三轮出牌数据
        result.specialCycle = specialCycle;//特殊牌出牌数据

        result.firstScore = firstScore;//第一轮得分，按座位号顺
        result.secondScore = secondScore;//第二轮得分，按座位号顺
        result.thirdScore = thirdScore;//第三轮得分，按座位号顺
        result.specialScore = specialScore;//特殊牌出牌得分，按座位号顺

        result.daqiangData = daqiangData;//打枪数据
        result.daqiangScore = daqiangScore;//打枪结果每个座位应该加减的分数

        result.quanleidaIndex = quanleidaIndex;//全垒打的座位号 -1=没有全垒打
        result.quanleidaScore = quanleidaScore;//全垒打结果每个座位应该加减的分数

        return result;
    }
}