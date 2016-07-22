// 鼠标滚动，tab切换跟随
function anchorScroll(options){
    var h = parseInt($(document).scrollTop()),
        anchorLen = anchorLen || $('.anchorItem').length,
        anchorData = [],
        screenH = $(window).outerHeight(),
        footerH = $('.anchorScroll-footer').outerHeight() || 0,
        HAll = 0,
        scrollL = 0,
        idx = 0,
        fixOffset = options.fixOffset||0;

        for(var i = 0; i < anchorLen; i ++){
            if($('.anchorItem:eq('+i+')').length > 0 && $('.partBox:eq('+i+')').length > 0){
                anchorData.push({
                    offset: parseInt($('.anchorItem:eq('+i+')').offset().top, 10),
                    height: parseInt($('.partBox:eq('+i+')').outerHeight(), 10)
                });
                HAll = HAll + parseInt($('.anchorItem:eq('+i+')').offset().top, 10);
            }
        }

        // 判断哪一个是最后满足一屏高度的
        if(HAll > screenH){
            idx = comparePos();
        }
        initEvt();
        // alert(idx);

        function initEvt(){
            // 判断设备
            var device = getUserAgent();
            var self = this;
            // 滚动事件
            switch (device){
                case 'ios':
                    document.addEventListener("touchmove", Scroll, false);
                    document.addEventListener("scroll", Scroll, false);
                    break;
                case 'android':
                    document.addEventListener("touchmove", Scroll, false);
                    document.addEventListener("touchend", Scroll, false);
                    document.addEventListener("scroll", Scroll, false);
                    break;
                case 'pc':
                default:
                    $(document).scroll(function(){
                        Scroll();
                    });
                    break;
            }
            // 点击事件
            $( '.anchorNav').on('click', function(evt){
                evt = evt || window.event;
                var evtDelay = setTimeout(bridge(evt), 100);

                function doFunc(evt){
                    var tar = evt.target.nodeName.toLowerCase();
                    if( $('.anchorNav '+tar+'.active').length > 0 ){
                        $('.anchorNav '+tar).removeClass('active');
                        $(evt.target).addClass('active');
                    }else{
                        $('.anchorNav li').removeClass('active');
                        $(evt.target).parents('li').addClass('active');
                    }
                }

                function bridge(evt){
                    return function(){
                        doFunc(evt);
                    };
                }
            });
        }

        function Scroll() {
            scrollL = document.documentElement.scrollTop || document.body.scrollTop;
            for(var j = (anchorLen-1); j >= 0; j--){
                if( (idx !== undefined && j < idx)||idx === undefined ){
                    // 不满一屏元素之前的元素，滚到顶部实现切换tab
                    if(scrollL >= anchorData[j]['offset']+fixOffset ){
                        selectIt(j);
                        return true;
                    }
                }else{
                    // 不满一屏元素的元素，出现自身全部后区域切换tab
                    if((scrollL+screenH) > anchorData[j]['offset']+anchorData[j]['height']+footerH){
                        selectIt(j);
                        return true;
                    }
                }
            }
        }

        function getUserAgent(){
            if(navigator.userAgent.match(/(iPhone|iPod|ios)/i)){
                return 'ios';
            }else if(navigator.userAgent.match(/(Android)/i)){
                return 'android';
            }else{
                return 'pc';
            }
        }

        function comparePos(){
            for(var i = anchorLen-1; i >= 0; i--){
                // 最后一个
                if( i == anchorLen-1 ){
                    if(anchorData[i]['height'] > (screenH - fixOffset)){
                        return undefined;
                    }
                }else{
                    // 不是最后一个
                    var leftH = 0;
                    for(var o = i; o < anchorLen; o++){
                        if(anchorData[o]){
                            leftH = leftH + anchorData[o]['height'];
                        }
                    }
                    if(leftH > (screenH - fixOffset)){
                        return i+1;
                    }
                }
            }
        }

        function selectIt(idx){
            // console.log(idx);
            // 尝试结构
            var nodeNa = $('.anchorNav .active')[0].nodeName.toLowerCase();
            $( '.anchorNav '+nodeNa ).removeClass('active').removeClass('prev');
            if($('.anchorNav '+nodeNa+':eq('+idx+')').length>0){
                $('.anchorNav '+nodeNa+':eq('+idx+')').addClass('active');
                if( idx-1 >= 0 ){
                    $('.anchorNav '+nodeNa+':eq('+(idx-1)+')').addClass('prev');   
                }
            }
        }
}
