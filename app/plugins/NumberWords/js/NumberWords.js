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