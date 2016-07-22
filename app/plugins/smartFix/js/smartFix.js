/**
 * by wanghsuai
 * 9.10自动浮动元素 滚定向上移
 */
;(function($){
    var smartFixObj = function(itemElem){
        var self = this;
        this.elem = itemElem;
        this.initH = this.elem.siblings('.smartFix-fixOffsetCon').length>0?parseInt(this.elem.siblings('.smartFix-fixOffsetCon').offset().top, 10):parseInt((this.elem).offset().top, 10);
        this.initSelfH = parseInt(this.elem.outerHeight(), 10);
        this.initW = parseInt(this.elem.outerWidth(), 10);
        this.scrollFlag = false;
        this.footer = $('.smartFixElemFooter');
        this.mgt = parseInt(this.elem.css('margin-top'), 10);
        // 默认参数
        this.setting = {
            "offsetTopVal" : 0,
            "zIndexVal" : 1
        }
        //合并用户参数与默认参数配置
        $.extend( this.setting, this.getSetting() );
        // 绑定事件
        $(document).scroll(function(){
            var scrolls = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(1);
            self.judgeFixed(scrolls);
            self.scrollFlag = self.judgeVisible(scrolls);
        });
        window.onload = function(){
            self.fixOnloadBugs();
        }
    };
    smartFixObj.prototype = {
        // 获取配置参数
        getSetting : function(){
            var setting = this.elem.attr('data-setting');
            if( setting && setting != '' ){
                return $.parseJSON( setting );
            }else{
                return {};
            }
        },
        judgeFixed : function(offsetT){
            var footerH = this.footer? this.footer.outerHeight() : 0;
            var footerOffsetT = this.footer? this.footer.offset().top : 0;
            if(offsetT > this.initH - this.mgt){ //需要固定的部分达到临界固定值
                if( (offsetT + $(window).height() - footerOffsetT) + this.initSelfH + parseInt(this.setting.offsetTopVal,10) >= $(window).height() ){
                    // console.log(1);
                    // 可是区域放不下底部和当前浮动元素了
                    this.scrollByPage( $(window).height() - (offsetT + $(window).height() - footerOffsetT) - this.initSelfH - 50 );  // - (进入可视区域的底部的距离 + 自身高度 + 偏移值 - 窗口高度）
                }else{
                    // console.log(2);
                    this.fixOffset();   //添加固定定位后原位置的占位容器
                    this.fixElement();  //固定需要固定的元素
                }
            }else if(this.elem.siblings('.smartFix-fixOffsetCon').length > 0){
                this.fixOffset("remove");
                this.fixElement("remove");
            }
        },
        fixOffset : function( action ){
            if(!this.scrollFlag){
                return;
            }
            if(this.elem.siblings('.smartFix-fixOffsetCon').length > 0){
                if( action == "remove" ){
                    this.elem.siblings('.smartFix-fixOffsetCon').remove();
                }
            }else{
                $('<div class="smartFix-fixOffsetCon"></div>').insertBefore(this.elem).css({'height':this.initSelfH});
            }
        },
        fixElement : function(action){
            if(!this.scrollFlag){
                return;
            }
            if( action == "remove" ){
                this.elem.css({
                    "position" : "static"
                });
            }else{
                this.elem.css({'position':'fixed','z-index':this.setting.zIndexVal, 'top':this.setting.offsetTopVal - this.mgt, "width" : this.initW});
            }
        },
        judgeVisible : function(offsetT){
            if(this.initH - offsetT <= $(window).height()){
                return true;
            }else{
                return false;
            }

        },
        scrollByPage : function(topVal){
            this.elem.css({
                "position" : "fixed",
                "top" : topVal,
                "width" : this.initW
            });
        },
        fixOnloadBugs : function(){
            var scrolls = document.documentElement.scrollTop || document.body.scrollTop;
            if( scrolls != 0 ){
                this.judgeFixed(scrolls);
                this.elem.css('position','static')
            }
            window.scrollTo(0, scrolls+1);
        }
    };
    smartFixObj.init = function(){
        var smartFixEles = $('.smartFixElem'),
            _this_ = this;
        smartFixEles.each(function(){
            new _this_($(this));
        });
    };
    window.smartFixObj = smartFixObj;
})(jQuery);

$(function(){
    var initSmartFix = (function(){
        var smartFixObjItems = $('.smartFixElem'),
            smartFixObjLen = smartFixObjItems.length,
            smartFixObjNewLen = 0;
        if( smartFixObjLen > 0 ){
            smartFixObj.init();    
        }     
        $(document).ajaxComplete(function(){
            smartFixObjNewLen = $('.smartFixElem').length;
            if(smartFixObjLen != smartFixObjNewLen){
                smartFixObj.init();
            }
        });
    })();
});
