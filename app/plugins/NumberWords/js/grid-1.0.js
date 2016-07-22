/**
 * by wangshuai
 * 发布商品价格等的字段只允许输入数字的方法
 */
;(function ($) {
    $.fn.inputNumOnly=function(callback){
        var pageInput = $(this),
            valReg = new RegExp('^[1-9][0-9]{0,15}$'),
            preVal = '',
            curVal = '',
            numType = '',
            numMax = '';

            // 重新获取当前input的当前值
            pageInput.bind('focus', function(){
                preVal = $(this).val();
            });

            pageInput.bind('keyup', function(){
                numType = $(this).attr('numOnly-type');
                numMax = $(this).attr('numOnly-max');
                if( numType === 'float' ){
                    valReg = new RegExp('^[1-9][0-9]{0,15}(.[0-9]{0,2})?$|^0(.[0-9]{0,2})?$');
                }else{
                    valReg = new RegExp('^[1-9][0-9]{0,15}$');
                }
                curVal = $(this).val();
                if(curVal.length > 0){
                    if(valReg.test(curVal) && parseInt(curVal, 10)<parseInt(numMax, 10)){
                        preVal = curVal;
                    }else{
                        $(this).val(preVal);
                    }
                }else{
                    preVal = '';
                }
            });
            pageInput.bind('change', function(){
                numType = $(this).attr('numOnly-type');
                numMax = $(this).attr('numOnly-max');
                if( numType === 'float' ){
                    valReg = new RegExp('^[1-9][0-9]{0,15}(.[0-9]{0,2})?$|^0(.[0-9]{0,2})?$');
                }else{
                    valReg = new RegExp('^[1-9][0-9]{0,15}$');
                }
                curVal = $(this).val();
                if(curVal.length > 0){
                    if(valReg.test(curVal) && parseInt(curVal, 10)<parseInt(numMax, 10)){
                        preVal = curVal;
                    }else{
                        $(this).val(preVal);
                    }
                }else{
                    preVal = '';
                }
            });
    };

})(jQuery);