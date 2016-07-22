/**
 * by 旧资源
 * added by wanghsuai
 * 解决ie问题低版本placeholder问题
 * 资源详情页面调用
 * 参数无
 */
function placeholders(){
    //ie9以下的placeholder
    function ieplaceholder(){
        var lessThenIE9 = function () {
            var UA = navigator.userAgent,
                isIE = UA.indexOf('MSIE') > -1,
                v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
            return v <= 9;

        }();
        
        if(lessThenIE9){
            var objInput=$('input,textarea');
            objInput.each(function(){
                var lineHeightObj=this.tagName;
                var pla =$(this).attr('placeholder');
                var left=$(this).position().left+parseInt($(this).css('padding-left'));
                var top=$(this).position().top+parseInt($(this).css('padding-top'));
                var this_labelLength=$(this).siblings('label.pla-label').length;
                var parent=$(this).parent();

                // parent.css('position','relative');
                                
                if(this_labelLength==0 && !$(this).val()){
                    if(pla){
                        $(this).after('<label class="pla-label">'+pla+'</label>');
                    }
                }
                $('.search-txt').siblings('.pla-label').css({
                    'line-height':$('.search-txt').outerHeight()+'px'
                });
                // $(this).before('<label>'+$(this).position().left+'----'+parseInt($(this).css('padding-left'))+'</label>');
                var left1=parseInt($(this).css('padding-left'));
                var top1=parseInt($(this).css('padding-top'));
                var height= ($(this).outerHeight()-5);
                var selfHeight = $(this).siblings('.pla-label').outerHeight();

                $(this).siblings('label.pla-label').css({
                    'position' : 'absolute',
                    'z-index':'2',
                    'left' :left+'px',
                    'color':'#c5c5c5',
                    'cursor':'text',
                    'width':$(this).outerWidth()-20,
                    'top': top + 'px',
                    'font-size' : '14px'
                });
                var str = lineHeightObj.toLocaleLowerCase();
                if(str=='input'){
                    $(this).siblings('label.pla-label').css({
                        'line-height':height+'px'
                    });
                }
                if(str=='textarea'){
                    $(this).siblings('label.pla-label').css({
                        'top':top+'px'
                    });
                }

                //点击自定义的内容
                $('label.pla-label').live('click',function(){
                    $(this).siblings('input').focus();
                });
                //失去焦点
                $(this).live('blur',function(){
                    var pla_labelLength=$(this).siblings('label.pla-label').length;
                    if(pla_labelLength==0 && !($(this).val())){
                        if(pla){
                            $(this).before('<label class="pla-label">'+pla+'</label>');
                        }
                    }
                    $(this).siblings('label.pla-label').css({
                        'position' : 'absolute',
                        'z-index':'2',
                        'left' :left+'px',
                        'cursor':'text',
                        'color':'#c5c5c5'
                    });
                    var str = lineHeightObj.toLocaleLowerCase();
                    if(str=='input'){
                        $(this).siblings('label.pla-label').css({
                            'line-height':height+'px'
                        });
                    }

                });

            });

            //事件
            $('label.pla-label').click(function(){
                $(this).hide();
                $(this).siblings('input').focus();
            });
            objInput.focus(function(){
                $(this).siblings('label.pla-label').hide();
            });
            objInput.blur(function(){
                if($(this).val()==''){
                    $(this).siblings('label.pla-label').show();
                }
            });
            
        }

    }
    ieplaceholder();
}

/**
 * by wanghsuai
 * 低版本浏览器检测
 * 判断浏览器版本是否过低
 * 无参数
 * 自调用
 */
$(function() {
    var b_name = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_version = version[1] ? version[1].replace(/[ ]/g, "") : '';
    // console.log(b_name);
    if (b_name == "Microsoft Internet Explorer") {
        /*如果是IE6或者IE7*/
        if (trim_version == "MSIE8.0" || trim_version == "MSIE7.0" || trim_version == "MSIE6.0") {
            $('<div class="lowAppMsg"><section class="Mc clearfix"><div class="hm-fl msg-text"><em class="yellow-warn sprite"></em>您正在使用的浏览器版本较低，为了您的账号安全和更好的产品体验，强烈建议您使用更快更安全的浏览器</div><div class="hm-fr browsers"><a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html" class="chrome sprite" target="_blank"></a><a href="http://www.firefox.com.cn/download/" class="firefox sprite" target="_blank"></a><a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" class="ie sprite hm-marign-rNot" target="_blank"></a></div></section></div>').insertBefore($('body *:first')).slideDown('1000');
        }

        if( trim_version == "MSIE9.0" || trim_version == "MSIE8.0" || trim_version == "MSIE7.0" ){
             $('.closeouter em.iconfont ').click(function(){
                if($(this).parent('.closeouter').hasClass('active')){
                    $(this).parents('li').remove()
                }else{
                    $(this).parent('.closeouter').removeClass('active')
                }
            });
        }
    }
});


/**
 * by wangshuai
 * 左右适应布局计算
 */
function LRWidthAuto(){
    var noWraperWidth = $('.LRWidthCtner').length > 0 ? $('.LRWidthCtner').innerWidth() : 0;
    if( noWraperWidth > 0 && $('.LRwidth').length>0 ){
        // alert($('.LRwidth').next().outerWidth());
        $('.LRwidth').next().css({
            'width' : noWraperWidth - $('.LRwidth').outerWidth()-2
        });
    }
}

/**
 * by wangshuai
 * 移动端屏幕翻转事件
 */
function orientationChange(){
    if( browser != 'web' ){
        var handler = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(handler, function() {
            window.location.reload();
        }, false);

    }else{
        return;
    }
}

/**
 * added by wanghsuai
 * 输入字数实时显示
 */
;(function ($) {
    //可以再输入字数
    $.fn.NumberWords=function(callback){
        //可以再输入字数
        var inputValueObj=function(element){
            var thisTextShu=element.closest('.parent_input_shu').find('.input_shu').text();
            function inputTextShu(){
                var thisText=$.trim(element.val()),
                    thisLength=$.trim(element.val()).length,
                    in_len = thisTextShu-thisLength;
                if(in_len>=0){
                    element.closest('.parent_input_shu').find('.show_text').html('还可以输入<span class="input_shu hm-bold">'+in_len+'</span>字');
                    element.attr('tmp',1);
                }else{
                    thisText=thisText.substr(0,thisTextShu);
                    element=element.val(thisText);
                    element.attr('tmp',0);
                }
            }
            $(window).on('load',inputTextShu);
            element.on('focus',inputTextShu);
            element.on('blur',inputTextShu);
            element.on('change',inputTextShu);
            element.on('keyup',inputTextShu);
            element.on('keydown',inputTextShu);
            element.on('keypress',inputTextShu);
            element.on('afterpaste',inputTextShu);
        };
        return $(this).each(function() {
            inputValueObj($(this));
        });
    };

})(jQuery);