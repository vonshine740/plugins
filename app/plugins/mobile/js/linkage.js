// n级联动效果
;(function($){
     $.fn.linkage = function(usersetting, callback){
        var config = $.extend({
            'level': 3,
            'child': '.linkageChild',
            'path': '.linkagePath',
            'url': '',
            'isMulti': false
        }, usersetting);

        var linkageChild = $(this).find(config.child),
            pathCtner = $(this).find(config.path) || null,
            dataNext = '',
            objNext = null,
            self = this,
            linkType = linkageChild.find('select').length > 0? 'select':'ul';

        // 页面加载完后请求一级数据
        // ajax({
        //     url: config.url,
        //     data: '',
        //     targetSel: linkageChild[0]
        // });

        if(linkageChild.length>0){

            initEvt();
            clearData();

            // linkageChild.each(function(){
            //     // 包含初始数据
            //     var curVal = $(this).attr('data-value'),
            //         _this = this;
            //     dataNext = $(this);
            //     if(typeof curVal !== 'undefined'){
            //         ajax({
            //             url: config.url,
            //             data: 'id='+curVal,
            //             targetSel: dataNext
            //         });
            //     }
            // });
            
            // 编辑页面 --- 把当前选中li置于可视区域
            posSelected();
        }

        function posSelected(){
            linkageChild.each(function(){
                if($(this).find('.selected').length > 0){
                    var tops = $(this).find('.selected').offset().top-$(this).offset().top;
                    
                    $(this).scrollTop(tops);
                }
            });
        }

        function initEvt(){
            linkageChild.unbind();
            // 绑定事件-ul 分类联动
            switch (linkType){
                case 'select':
                    // 绑定事件-select 地址联动
                    linkageChild.on('change', function(){
                        dataNext = $(this).attr('data-next');
                        var thisval = $(this).val();
                        if(dataNext && thisval > 0){
                            objNext = $(self).find('select[data-name='+dataNext+']');
                            var data = ajax({
                                url: config.url,
                                data: 'id='+thisval,
                                targetSel: objNext
                            }, function(data, options){
                                if(data){
                                    initData({
                                        data: data,
                                        targetSel: options.targetSel,
                                        idx: options.idx
                                    }, function(options){
                                        var  nextNext = options.targetSel.attr('data-next');
                                        $('select[data-name='+nextNext+']').html('<option value="-1" selected="selected">请选择</option>');
                                    });
                                }
                            });
                        }else if(dataNext && thisval <= 0){
                            var nextSel = $('select[data-name='+dataNext+']');
                            nextSel.html('<option value="0" selected="selected">请选择</option>');
                            var nextNext = nextSel.attr('data-next');
                            if(nextNext){
                                var nextNextSel = $('select[data-name='+nextNext+']');
                                nextNextSel.html('<option value="0" selected="selected">请选择</option>');
                            }
                        }
                    });
                    break;
                case 'ul':
                default: 
                    linkageChild.children('li').unbind();
                    linkageChild.children('li').on('click', function(evt){
                        var par = $(this).parents(config.child),
                            idx = par.attr('data-index') || 0;

                        // 判断是否支持多选类目操作，判断当前要做的操作是什么
                        var action = nextction({target : $(this)});

                        // 发送ajax请求--总是发送请求
                        if(action.request){
                            var data = ajax({
                                url: config.url,
                                data: 'id='+$(this).attr('data-id'),
                                targetSel: $(this),
                                idx: idx
                            }, function(data, options){
                                if(data){
                                    initData({
                                        data: data,
                                        targetSel: par,
                                        idx: options.idx
                                    }, function(){
                                        linkageChild = $(self).find(config.child);
                                        initEvt();
                                    });
                                }
                            });
                        }else{
                            // 选中的分类没有子分类，把之后的删除
                            par.nextAll().remove();
                        }

                        changeSelState({
                            target : $(this),
                            idx: idx,
                            eventSrc: evt.target
                        });

                        showPath({
                            target : $(this),
                            idx: idx
                        });

                    });
                    break;
            }
        }

        function nextction(options){
            var _tar = options.target,
                status = {              //存储的是数据是否具有可变性
                    'request': true,    //是否请求新的数据
                    'after': true      //是否需要移除后边的列表
                };

            // 操作当前条目

            // 如果当前操作和当前选中条目条目和选中的复选框是同一个
            if( _tar.hasClass('selected') ){
                // 不需要发送请求
                status.request = false;
                // 之后的列表是需要移除的
                status.after = true;


            }else if(_tar.hasClass('more')){
                // 如果当前操作条目和选中条目和选中的复选框不是同一个条目
                
                // 需要发送请求
                status.request = true;
                // 之后的列表是需要移除的
                status.after = true;

            }
            return status;
        }

        // 中间数据存储 读写数据
        // 读数据从本地
        function getDataLocal(){
            if(window.localStorage){
                var preTotal = localStorage.getItem('preTotal'),
                    preIdx = localStorage.getItem('preIdx'),
                    preTime = localStorage.getItem('preTime'),
                    types = localStorage.getItem('types');
                    // console.log('types is:');
                    // console.log(types);
                    try{
                        types = JSON.parse(types)||[];
                    }catch(e){
                        types = [];
                    }

                return {
                    preTotal: preTotal,
                    preIdx: preIdx,
                    preTime: preTime,
                    types: types
                };
            }else{
                return false;
            }
            // 先判断数据是否过期
            // console.log(curTime - parseInt(preTime, 10));

        }

        function getActiveDataFromPage(options){
            // 获得的数据读取到当前操作的对象，不关心当前操作的条目是否选中
            // console.log(options);
            var pageData = {};
                pageData.arrId = [];
                pageData.arrName = [];
            for(var i=0; i<config.level;i++){
                var curItem = $('.linkageCategory .linkageChild[data-index='+i+']').find('.selected'),
                    // 获取文字描述
                    _itemStr = curItem.html() && curItem.html().split('>'),
                    chStr = _itemStr?(_itemStr.length>1?_itemStr[_itemStr.length-1]:_itemStr[0]):'null';

                if(curItem.length>0){
                    pageData.arrId.push(parseInt(curItem.attr('data-id'), 10));
                    pageData.arrName.push(chStr);
                }else if(options.idx == i){
                    pageData.arrId.push(parseInt($(options.eventSrc).attr('data-id'), 10));
                    pageData.arrName.push(chStr);
                }
            }

            return pageData;
        }

        function getSelectedDataFromPage(options){
            var pageData = {};
                pageData.arrId = [];
                pageData.arrName = [];
            for(var i=0; i<config.level;i++){
                var curItem = $('.linkageCategory .linkageChild[data-index='+i+']').find('.selected');
                if(curItem.length>0){
                    // 获取文字描述
                    var _itemStr = curItem.html() && curItem.html().split('>'),
                        chStr = _itemStr?(_itemStr.length>1?_itemStr[_itemStr.length-1]:_itemStr[0]): '';
                    if(curItem.length>0){
                        pageData.arrId.push(parseInt(curItem.attr('data-id'), 10));
                        pageData.arrName.push(chStr);
                    }else if(options.idx == i){
                        pageData.arrId.push(parseInt($(options.eventSrc).attr('data-id'), 10));
                        pageData.arrName.push(chStr);
                    }
                }
            }

            return pageData;
        }

        function searchData(current, local){
            var tempRes = [],
                maybeRes = [];
            for(var m = 0; m < current.arrId.length; m++){
                if(tempRes.length == 1){
                    for(var x=0; x<tempRes.length; x++){
                        maybeRes.push(tempRes[x]);
                    }
                }
                if(tempRes.length>0){
                    tempRes = searchInner(m, current.arrId, local.types, 'id', tempRes);
                }else if(tempRes.length == 0 && m > 0){
                    return tempRes[0]||maybeRes[0];
                }else{
                    tempRes = searchInner(m, current.arrId, local.types, 'id');
                }
            }
            return typeof tempRes[tempRes.length-1] === undefined? maybeRes[maybeRes.length-1]: tempRes[tempRes.length-1];
        }

        function searchInner(idx, arr1, arr2, key, arrIdx){
            var _tempArr = [];
            if(arrIdx && arrIdx.length>0){
                for(var i = 0; i < arrIdx.length; i++){
                    if(arr1[idx] == arr2[arrIdx[i]][key][idx]){
                        _tempArr.push(i);
                    }
                }
                return _tempArr;
            }else{
                // 第一轮查找第一位相同的
                for(var i = arr2.length-1; i >= 0; i--){
                    if(arr1[idx] == arr2[i][key][idx]){
                        _tempArr.push(i);
                    }
                }
                return _tempArr;
            }
        }

        function clearData(){
            localStorage.removeItem( 'preTotal' );
            localStorage.removeItem( 'preIdx' );
            localStorage.removeItem( 'preTime' );
            localStorage.removeItem( 'types' ); 
        }

        // 写数据
        function tempData(options){
            // 先检测是否支持localstorage，不支持的话下边的代码无意义
            if(window.localStorage){
                // 读取数据的方式是从当前操作对象向上找
                // 首次点击必然是第一列，判断当前分类是不是可以多选的
                var visibleCheck = $(options.eventSrc).find('input[type=checkbox]:visible').length,
                    curTotal = $('.linkageChild[data-index='+options.idx+'] input:checked').length || 0,
                    curIdx = options.idx,
                    curTime = new Date(),
                    curTime = curTime.getTime(),    //毫秒时间戳
                    tempData = getDataLocal(),
                    curActiveData = getActiveDataFromPage(options),
                    curSelectedData = getSelectedDataFromPage(options),
                    // prePageData = getPrevDataFromPage(options),
                    curData = curSelectedData,
                    initFlag = false;   //数据初始化标记

                // console.log(tempData);
                if( tempData && tempData.types && tempData.types.length>0 ){
                    try{
                        var preTotal = tempData.preTotal, 
                            preIdx = tempData.preIdx, 
                            preTime = tempData.preTime;
                    }catch(e){
                        var preTotal = null,
                            preIdx = null,
                            preTime = null;
                    }
                }else{
                    // 首次写入内存
                    var _curId = $(options.eventSrc).attr('data-id'),
                        _arr = $(options.eventSrc).html().split('>'),
                        _curStr = _arr.length>1 ? _arr[_arr.length-1] : _arr[0];
                    
                    if(tempData.types.length == 0){
                        tempData.types.push({
                            id : curData['arrId'],
                            name : curData['arrName']
                        });

                        initFlag = true;    //标志数据是刚刚插进去的，不需要作进一步的判断
                    }
                }

                if(!initFlag){
                    // 检查选中总数和之前是否一样 通过本地存储的idx和preTotal可以判断
                    if( curTotal == preTotal && curIdx == preIdx && curIdx != 0 ){
                        // 不需要存储
                        return ;
                    }else{
                        //换种思路，用是否查找到和当前数据个位数来判断                        

                        // 以点击的层级为切入点
                        if( curIdx == 0 ){
                            // 点击第一个分类列表
                            if( tempData.types.length == 1 && tempData.types[0]['id'].length == 1 ){
                                //如果数据只有一条 && 该条数据第的id数组只有一项 -- 都是清除不用判断是否存在
                                tempData.types = [];
                            }else if( tempData.types.length == 1 && tempData.types[0]['id'].length != 1 ){
                                //如果数据只有一条 && 该条数据第的id数组含有有多项 -- 都是插入数据不用判断是否存在
                                tempData.types.push({
                                    id : curData['arrId'],
                                    name : curData['arrName']
                                });
                            }else if( tempData.types[tempData.types.length-1]['id'].length == 1 ){
                                // 含有多条数据 -- 数据既然存在就是含有多级的所以，只需要判断最新的数据是不是id数组只有一项
                                tempData.types.splice(tempData.types.length-1,1,{
                                    id : curData['arrId'],
                                    name : curData['arrName']
                                });
                            }
                        }else{
                            // 通过查找当前数据的方式，来存储数据
                            var pos = searchData(curActiveData, tempData);
                            // alert(pos);
                            // 如果返回的pos不是一个数字
                            if(typeof pos !== 'number'){
                                // 不是第一列分类，肯定是由最新插入的一个分类调取出来的
                                // 判断最新的数据存储的id的数组项是一个的吗
                                // 更新最新的一条数据
                                if( tempData.types[tempData.types.length-1]['id'].length < (parseInt(curIdx, 10)+1) ){
                                    tempData.types.splice(tempData.types.length-1,1,{
                                        id : curData['arrId'],
                                        name : curData['arrName']
                                    });
                                }else{
                                    tempData.types.push({
                                        id : curData['arrId'],
                                        name : curData['arrName']
                                    });
                                }
                                
                            }else{
                                // 如果返回的pos是一个数字
                                // 需要把当前匹配项的id数组长读取出来比对一下
                                if( tempData.types[pos]['id'].length == (parseInt(curIdx, 10)+1) ){
                                    // 如果和当前操作的列和匹配项的id数组长度一致，那完全匹配，那需要判断他是不是需要被移除
                                    if( $(options.eventSrc).hasClass('selected') ){
                                        tempData.types.splice(pos,1,{
                                            id : curData['arrId'],
                                            name : curData['arrName']
                                        });
                                    }else{
                                        tempData.types.splice(pos,1);   //删除
                                    }
                                }else{
                                    // 如果和当前操作的列和匹配项的id数组长度不一致，那需要重新茶如一条
                                    tempData.types.push({
                                        id : curData['arrId'],
                                        name : curData['arrName']
                                    });
                                }
                            }
                        }
                    }
                }

                // 先把当前的curTotal 和 curIdx 写到本地
                localStorage.setItem( 'preTotal',curTotal );
                localStorage.setItem( 'preIdx',curIdx );
                localStorage.setItem( 'preTime',curTime );
                localStorage.setItem( 'types',JSON.stringify(tempData.types) );  

                var newData = getDataLocal();
                return newData.types.length;
            }
        }
        
        // 改变条目选中的状态
        function changeSelState(options){
            var _tar = options.target,
                checkBox = _tar.find('input[type=checkbox]');

            var newData = getDataLocal();
            if(newData.types.length>=6){
                $('.linkageCategory .maxMag').addClass('path-wrong');
                return;
            }
            $('.linkageCategory .maxMag').removeClass('path-wrong');

            if(checkBox.length>0 && options.eventSrc.nodeName.toLowerCase() === 'li'){
                if(checkBox.attr('checked') && checkBox.attr('checked') === 'checked'){
                    _tar.removeClass('selected').siblings().removeClass('selected');
                    checkBox.removeAttr('checked');
                }else{
                    _tar.addClass('selected').siblings().removeClass('selected');
                    checkBox.attr('checked', 'checked');
                }
            }else{
                // 改变选中的状态
                _tar.toggleClass('selected').siblings().removeClass('selected');
            }

            // 改变数据
            tempData(options);
        }
        //改变历经显示的值，以及隐藏域的值
        function showPath(options){
            if(config.isMulti){
                // 支持多选，从locaStorage中拿数据去拼路径
                if(options.idx>0){
                    var localData = getDataLocal(),
                        data = localData.types,
                        pathStr = [];
                    pathStr.push('<ul class="slected-list clearfix">');
                    for(var i=0; i<data.length; i++){
                        pathStr.push('<li data-idx="'+i+'">');
                        for(var j=0; j<data[i]['name'].length; j++){
                            if( j == data[i]['name'].length-1 ){
                                pathStr.push('<em class="pathCell">'+data[i]['name'][j]+'</em>');    
                            }else{
                                pathStr.push('<em class="pathCell">'+data[i]['name'][j]+'</em><em class="pathLine">&gt;</em>');
                            }
                        }
                        pathStr.push('<em class="pathClose">×</em></li>');
                    }
                    pathStr.push('</ul>');

                    $('.linkagePath').html(pathStr.join(''));
                    // 绑定item的删除事件
                    bindItemEvt();
                }
            }else{
                // 不支持多选，用选中的方式去拼凑路径指示
                var _tar = options.target,
                    idx = parseInt(options.idx, 10),
                    curId = _tar? _tar.attr('data-id') : -1,
                    curText = _tar? _tar.html() : '',
                    cell = pathCtner.find('.pathCell').length;

                if(pathCtner){
                    // 改变当前层级的值
                    // 如果存在的层级
                    if(pathCtner.find('.pathCell:eq('+idx+')').length>0){
                        // 改变当前层级的显示文本
                        pathCtner.find('.pathCell:eq('+idx+')').html(curText).parent().find('input:eq('+idx+')').val(curId);

                        // 将层级高的部分清除掉
                        pathCtner.find('.pathCell:eq('+idx+')').parent().find('input:eq('+idx+')').nextAll().remove();
                    }else{
                        var _str = [];

                        if(idx != 0){
                            // 判断第一个 路径 之前不添加 > 符号
                            _str.push('<em class="hm-fl">&nbsp;&gt;&nbsp;</em>');
                        }
                        _str.push('<em class="hm-fl hm-colorLink pathCell">');

                        switch (idx){
                            case 1:
                                _str.push(curText+'</em><input type="hidden" name="cate_two_id" data-type="text" value="'+curId+'">');
                                break;
                            case 2:
                                _str.push(curText+'</em><input type="hidden" name="cate_three_id" data-type="text" value="'+curId+'">');
                                break;
                            case 3:
                                _str.push(curText+'</em><input type="hidden" name="cate_four_id" data-type="text" value="'+curId+'">');
                                break;
                            default:
                                _str.push(curText+'</em><input type="hidden" name="cate_one_id" data-type="text" value="'+curId+'">');
                                break;
                        }
                        $(_str.join('')).appendTo(pathCtner);
                    }
                }

                // 改变验证相关的隐藏域的值
                if($('#cate_flag').length > 0){
                    $('#cate_flag').val('selected').parents('.inputframe').siblings('.wrongmsg').html('');
                }
            }            

        }

        function bindItemEvt(){
            $('.linkagePath .slected-list li .pathClose').on('click', function(){
                // var idx = parseInt($(this).parents('li').attr('data-idx'), 10);
                var idx = $(this).parents('li').index();
                var oldData = getDataLocal();
                oldData = oldData.types;
                var newData = oldData.splice(idx, 1);   //对原数组操作，返回的是备操作的项
                if(window.localStorage){
                    localStorage.setItem( 'types',JSON.stringify(oldData) );  
                }

                $(this).parents('li').off().remove();

                // console.log(newData[0]);
                changeDelState(newData[0]);

            });
        }

        function changeDelState(options){
            var ids = options['id'];
            for(var i=0; i<ids.length; i++){
                var item = $('.linkageCategory .types-item[data-id='+ids[i]+']');
                var itemCheck = item.find('input[type=checkbox]:visible');
                var idx = item.parents('.linkageChild').attr('data-index');
                if(!item.hasClass('selected')){
                    itemCheck.removeAttr('checked');
                }else if(idx == ids.length-1){
                    item.removeClass('selected');
                    itemCheck.removeAttr('checked');
                }
            }
        }

        // ajax动态请求的方法
        function ajax(options, callback){
            if(options){
                $.ajax({
                    type: 'POST',
                    async: false,
                    data: options.data,
                    url: options.url,
                    dataType: 'json',
                    success: function(data){
                        if(typeof data === 'object'){
                            if( typeof callback === 'function' ){
                                callback(data, options);
                            }
                            return data;
                        }else{
                            if( typeof callback === 'function' ){
                                callback(data, options);
                            }
                            return '获取数据失败';
                        }
                    }
                });
            }
        }

        // 填充数据的方法
        function initData(options, callback){
            var optionstr = [],
                data = options.data,
                curVal = $(options.targetSel).attr('data-value') || -1;

            for(var i in data){
                if(typeof data[i] === 'string' ){
                    // 城市联动
                    if(typeof curVal !== 'undefined' && curVal == i){
                        optionstr.push('<option value="'+i+'" selected="selected">'+data[i]+'</option>');
                    }else{
                        optionstr.push('<option value="'+i+'">'+data[i]+'</option>');
                    }
                }else{
                    // 分类联动
                    if(data[i].isLeaf === 0){
                        // 数据含有子分类
                        if(config.isMulti){
                            optionstr.push('<li class="types-item more" data-id="'+i+'"><input type="checkbox" value="'+i+'" />'+data[i]['name']+'</li>');   
                        }else{
                            optionstr.push('<li class="types-item more" data-id="'+i+'">'+data[i]['name']+'</li>');
                        }
                    }else{
                        // 数据不含子分类
                        if(config.isMulti){
                            optionstr.push('<li class="types-item" data-id="'+i+'"><input type="checkbox" value="'+i+'" />'+data[i]['name']+'</li>');
                        }else{
                            optionstr.push('<li class="types-item" data-id="'+i+'">'+data[i]['name']+'</li>');
                        }
                    }
                }

            }

            // select的联动
            if(options.targetSel[0].nodeName.toLowerCase() === 'select'){
                $(options.targetSel).html(optionstr.join(''));
            }else{
                $(options.targetSel).nextAll().remove();
                $('<ul/>',{
                    'class': 'goods-type-child linkageChild',
                    'html': optionstr.join(''),
                    'data-index': parseInt(options.idx, 10)+1
                }).appendTo($(options.targetSel).parent());
            }

            if(typeof callback === 'function'){
                callback(options);
            }
            
        }
        
    };
})(jQuery);