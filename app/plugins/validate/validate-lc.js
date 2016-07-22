!(function($){


    $.fn.validate = function( userSetting,callback ){

        if ( !this.length ) {
            if ( window.console ) {
                console.warn( "未选择任何对象." );
            }
            return;
        }

        this.each(function(){

            $this = $(this);

            var target = $this.find('.submit');
            var validateObj = $this;

            var configMap = $.extend({
                    targetObj : target,
                    subEvent : 'click',
                    trim : 'all',
                    special : [{
                        tar : $('#validCon .special'),
                        valit : function(){}
                    }],
                    ajaxAction : function(){}
                }, userSetting ),
                isCanSubmit = false,
                validateResult = false,
                validMethod = {
                    rules : {
                        'check' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var value = obj.attr('checked');

                                if(value != type){
                                    validMethod.showError(false,obj,obj.attr('valid-wrong'),false);
                                    return false;
                                } else {
                                    validateResult = true;
                                    return true;
                                }
                            }
                        },
                        'yzm' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();
                                var value_length = inputTxt.length;
                                // alert(value_length);

                                var min = obj.attr('valid-min');
                                if(min != undefined){
                                    // alert( value_length < min);
                                    if(value_length < min){
                                        validMethod.showError(false,obj,obj.attr('min-message'),true);
                                        return false;
                                    }
                                }
                                var max = obj.attr('valid-max');
                                if(max != undefined){
                                    if(value_length > max){
                                        validMethod.showError(false,obj,obj.attr('max-message'),true);
                                        return false;
                                    }
                                }

                                var re = new RegExp(type);

                                var isTrue = re.test(inputTxt);

                                if( !isTrue ){
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }else{
                                    validateResult = true;
                                    isCanSubmit = true;
                                    // validMethod.showError(validateResult,obj);
                                }

                                return isTrue;
                            }
                        },
                        'text' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var wrongmsg = obj.attr('valid-wrong');
                                var inputTxt = obj.val();

                                if(!obj.hasClass('no-spacing') && obj.attr('type') != 'password'){
                                    inputTxt = Trim(obj.val(),'g');
                                    obj.val(inputTxt);
                                }

                                var value_length = inputTxt.length;

                                var min = obj.attr('valid-min');
                                if(min != undefined){
                                    if(value_length < min){
                                        validMethod.showError(false,obj,obj.attr('min-message'),flag);
                                        return false;
                                    }
                                }
                                var max = obj.attr('valid-max');
                                if(max != undefined){
                                    if(value_length > max){
                                        validMethod.showError(false,obj,obj.attr('max-message'),flag);
                                        return false;
                                    }
                                }

                                var re = new RegExp(type);

                                var isTrue = re.test(inputTxt);

                                if( !isTrue ){
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }else{
                                    validateResult = true;
                                    isCanSubmit = true;
                                    // validMethod.showError(validateResult,obj);
                                }

                                return isTrue;
                            }
                        },
                        'title' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();
                                if(obj.attr('type') != 'password'){
                                    inputTxt = $.trim(obj.val());
                                    obj.val(inputTxt);
                                }
                                var value_length = inputTxt.length;

                                var re = new RegExp(type);

                                var isTrue = re.test(inputTxt);

                                if( !isTrue ){
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }else{
                                    validateResult = true;
                                    isCanSubmit = true;
                                    // validMethod.showError(validateResult,obj);
                                }

                                return isTrue;
                            }
                        },
                        'number': {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();

                                var re = new RegExp(type);

                                var isTrue = re.test(inputTxt);

                                if( isTrue && (parseInt(inputTxt, 10)+'') == inputTxt ){
                                    validateResult = true;
                                    isCanSubmit = true;
                                }else{
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }

                                return isTrue;
                            }
                        },
                        'email' : {
                            validate:function(obj, callback, flag){
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = Trim(obj.val(),'g');
                                obj.val(inputTxt);
                                var value_length = inputTxt.length;

                                var min = obj.attr('valid-min');
                                if(min != undefined){
                                    if(value_length < min){
                                        validMethod.showError(false,obj,obj.attr('min-message'),true);
                                        return false;
                                    }
                                }
                                var max = obj.attr('valid-max');
                                if(max != undefined){
                                    if(value_length > max){
                                        validMethod.showError(false,obj,obj.attr('max-message'),true);
                                        return false;
                                    }
                                }

                                var re = new RegExp("(\\w|\\d)+@(\\w|\\d)+\\.\\w{2,3}");

                                var isTrue = re.test(inputTxt);

                                if( !isTrue ){
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                    return;
                                }


                                return true;
                            }
                        },
                        'password' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');

                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();
                                var value_length = inputTxt.length;
                                var value_length2 = Trim(obj.val(),'g').length;

                                // 首先确认是第一输入密码还是第二次输入确认密码
                                var equal = obj.attr('valid-equal');
                                if(equal){
                                    var equal_id = $("#"+equal);
                                    var equal_message = obj.attr('equal-message');
                                    if( equal_id.val() == '' ){
                                        validateResult = false;
                                        isCanSubmit = false;
                                        validMethod.showError(false,obj,obj.attr('valid-empty'),true);
                                        return false;
                                    }else if( equal_id.val() != inputTxt ){
                                        validateResult = false;
                                        isCanSubmit = false;
                                        validMethod.showError(false,obj,equal_message,true);
                                        return false;
                                    }else{
                                        validateResult = true;
                                        isCanSubmit = true;
                                        validMethod.showError(validateResult,obj,wrongmsg,true);
                                        return true;
                                    }
                                }else{

                                    var wrong = obj.attr('valid-wrong')
                                    if( value_length != value_length2 && wrong != undefined ){
                                        validMethod.showError(false,obj,wrong,true);
                                        return false;
                                    }else{

                                        var min = obj.attr('valid-min');
                                        if(min != undefined){
                                            if(value_length < min){
                                                validMethod.showError(false,obj,obj.attr('min-message'),true);
                                                return false;
                                            }
                                        }
                                        var max = obj.attr('valid-max');
                                        if(max != undefined){
                                            if(value_length > max){
                                                validMethod.showError(false,obj,obj.attr('max-message'),true);
                                                return false;
                                            }
                                        }

                                        var re = new RegExp(type);

                                        var isTrue = re.test(inputTxt);

                                        if( !isTrue ){
                                            validateResult = false;
                                            isCanSubmit = false;
                                            validMethod.showError(validateResult,obj,wrongmsg,true);
                                            return isTrue;
                                        }else{
                                            validateResult = true;
                                            isCanSubmit = true;
                                            validMethod.showError(validateResult,obj,wrongmsg,true);
                                            return isTrue;
                                        }

                                        return true;

                                    }

                                }

                            }
                        },
                        'editor' : {
                            validate:function(obj, callback, flag){
                                var wrongmsg = obj.attr('valid-wrong');
                                var data_max = obj.attr('data-max');
                                var data_cur = obj.attr('data-num');

                                var inputTxt = obj.val();

                                if( data_max < data_cur ){
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }else{
                                    validateResult = true;
                                    isCanSubmit = true;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }

                                return isCanSubmit;
                            }
                        },
                        'label' : {
                            validate:function(obj, callback, flag){
                                var type = obj.attr('valid-type');
                                var inputTxt = Trim(obj.val(),'g');
                                obj.val(inputTxt);
                                var labels = inputTxt.split(',');
                                var wrongmsg = obj.attr('valid-wrong');
                                var re = new RegExp(type);
                                var isTrue = re.test(inputTxt);
                                if( isTrue ){
                                    for(var i = 0; i < labels.length; i++){
                                        if( labels[i].length<2 || labels[i].length>10 ){
                                            validateResult = false;
                                            isCanSubmit = false;
                                            validMethod.showError(validateResult,obj,wrongmsg,true);
                                            return;
                                        }else{
                                            validateResult = true;
                                            isCanSubmit = true;
                                        }
                                    }
                                }else{
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                }
                                return isCanSubmit;
                            }
                        },
                        'Mphone': {
                            validate:function(obj, callback, flag){
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();

                                var regExpressMobile = new RegExp('^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
                                var regExpressPhone = new RegExp('^([0-9]{3,4}-)?[0-9]{7,8}$');
                                var regExpressPhone2 = new RegExp('^([0-9]{3,4}\b)?[0-9]{7,8}$');
                                var regExpressPhone3 = new RegExp('^([0-9]{3,4} )?[0-9]{7,8}$');

                                if( regExpressMobile.test(inputTxt) || regExpressPhone.test(inputTxt) || regExpressPhone2.test(inputTxt) || regExpressPhone3.test(inputTxt) ){
                                    validateResult = true;
                                    isCanSubmit = true;
                                }else{
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                    return;
                                }
                                return true;
                            }
                        },
                        'MphoneOnly' : {
                            validate:function(obj, callback, flag){
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();

                                var regExpressMobile = new RegExp('^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
                                if( regExpressMobile.test(inputTxt) ){
                                    validateResult = true;
                                    isCanSubmit = true;
                                }else{
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                    return;
                                }
                                return true;
                            }
                        },
                        'select': {
                            validate:function(obj, callback, flag){
                                var wrongmsg = obj.attr('valid-wrong');

                                var inputTxt = obj.val();

                                if( inputTxt>0 ){
                                    validateResult = true;
                                    isCanSubmit = true;
                                }else{
                                    validateResult = false;
                                    isCanSubmit = false;
                                    validMethod.showError(validateResult,obj,wrongmsg,true);
                                    return;
                                }
                                return true;
                            }
                        }
                    },
                    showError : function(flag,obj,str,focus){
                        if( flag == false ){
                            obj.closest('.inputframe ').addClass('wrong');
                            if( $('.wrongmsg').length == 1 ){
                                $('.wrongmsg').html(str);
                            }else{
                                var wrongmsg = obj.closest('dd,dt').find('.wrongmsg');
                                if(wrongmsg.length > 0){
                                    wrongmsg.html(str);
                                } else {
                                    obj.closest('.inputsection').find('.wrongmsg').html(str);
                                }
                            }
                            if( focus ){
                                $(obj).focus().click();
                            }
                        }else{
                            if( $('.wrongmsg').length == 1 ){
                                $('.wrongmsg').html(' ');
                            }else{
                                obj.closest('dd,dt').find('.wrongmsg').html(' ');
                            }
                            obj.closest('.inputframe ').removeClass('wrong');
                            $('.wrongmsg').html('');
                        }
                    },
                    // 检测内容是否正确
                    _check : function(obj){
                        var data_type = obj.attr('data-type');

                        var data_checkbefore = obj.attr('data-checkbefore');
                        if(data_checkbefore){
                            eval(data_checkbefore+"()");
                        }

                        var data_needcheck = obj.attr('data-needcheck');
                        if(data_needcheck){
                            var data_needcheck_return = eval(data_needcheck+"(obj)");
                            if(!data_needcheck_return){
                                return true;
                            }
                        }

                        var data_require = obj.attr("valid-empty");
                        if( data_require != '' && data_require != undefined ){   //只有包含了valid-empty的输入框才是必填的

                            var nodeNameStr = obj.get('0').nodeName.toLowerCase();

                            if( nodeNameStr == 'textarea' && obj.css('display') == 'none' ){
                                var value = obj.html();
                            }else{
                                var value = obj.val();
                            }
                            
                            if( obj.attr('type') != 'password' ){
                                value = Trim(value, 'g');
                            }

                            if ((value == "" ) &&(data_require != undefined || data_require != "")){
                                validMethod.showError(false,obj,data_require,true);
                                return false;
                            }

                            if(validMethod.rules.hasOwnProperty(data_type)){
                                var res = validMethod.rules[data_type].validate(obj);
                                if(res){
                                    var valid_ajax_url = obj.attr('valid-ajax');
                                    var valid_single = obj.attr('valid-single');
                                    if(valid_ajax_url){
                                        var data = {};
                                        data[obj.attr('name')] = obj.val();
                                        $.ajax({
                                            type : 'POST',
                                            async : false,
                                            data : data,
                                            dataType : "json",
                                            url : valid_ajax_url,
                                            success : function(data){
                                                if(data.api_code == 1){
                                                    validateResult = false;
                                                    isCanSubmit = false;
                                                    valid_single = valid_single ? valid_single : data.message;
                                                    validMethod.showError(validateResult,obj,valid_single,true);
                                                    return false;
                                                }
                                            }
                                        });
                                    }
                                }
                                return res; 
                            } else {
                                validMethod.showError(false,obj,"没有" + data_type + "过滤条件");
                                return false;
                            }

                        }else{
                            return true;
                        }
                    },
                    // 初始化时间
                    initEvent : function( obj, callback ){
                        var inputs = obj.find('input,select,textarea');

                        // 如果是新的ajax返回来的输入框就获取不到了
                        $(document).ajaxComplete(function(event, xhr, settings) {
                            /* executes whenever an AJAX request completes */
                            var inputs2 = obj.find('input,select,textarea');
                            if(!(inputs.lenght == inputs2.length)){
                                inputs = obj.find('input,select,textarea');

                                inputs.each(function(){
                                    if($(this).is('select')){
                                        $(this).live('change',function(){
                                            validMethod.validate_select($(this), callback);
                                        });
                                    }
                                });

                                inputs.each(function(){
                                    // $(this).unbind('change');
                                    $(this).live('change',function(){
                                        $(this).parent('.inputframe ').removeClass('wrong');
                                        $('.wrongmsg').html('');
                                        // if( $('.wrongmsg').length == 1 ){
                                        //     $('.wrongmsg').html('');
                                        // }else{
                                        //     $(this).closest('dd,dt').find('.wrongmsg').html('');
                                        // }
                                    });
                                });
                            }
                        });

                        var valid_msg = {};

                        /*
                         inputs.live('blur',function(){

                         validMethod._check($(this));

                         });
                         */
                         inputs.each(function(){
                            if($(this).is('select')){
                                $(this).live('change',function(){
                                    validMethod.validate_select($(this), callback);
                                });
                            }
                        });

                        inputs.each(function(){
                            $(this).live('change',function(){
                                $(this).parent('.inputframe ').removeClass('wrong');
                                $('.wrongmsg').html('');
                                // if( $('.wrongmsg').length == 1 ){
                                //     $('.wrongmsg').html('');
                                // }else{
                                //     $(this).closest('dd,dt').find('.wrongmsg').html('');
                                // }
                            });
                        });

                        configMap.targetObj.live(configMap.subEvent, function(){
                            var _flag = validMethod.validate_before(inputs, valid_msg, callback);
                            if( _flag && !$(this).hasClass('posting') ){
                                // 提交状态变化
                                var do_action = configMap.targetObj.attr('do_action');
                                if(do_action){
                                    eval(do_action+"('start')");
                                }
                                // 防止重复点击添加的方法
                                $(this).addClass('posting');

                                var ajax_url = validateObj.attr('ajax_url');
                                if( ajax_url != undefined ){
                                    var ajax_method = validateObj.attr('ajax_method');
                                    var ajax_success = validateObj.attr('ajax_success');
                                    var ajax_error = validateObj.attr('ajax_error');

                                    var ajax_data = validateObj.serializeArray();

                                    $.ajax({
                                        type : ajax_method,
                                        async : true,
                                        data : ajax_data,
                                        dataType : "json",
                                        url : ajax_url,
                                        success : function(data){
                                            if(data.api_code == 1){
                                                if(ajax_success){
                                                    eval(ajax_success+"(data)");
                                                }
                                                if(data.hasOwnProperty('url')){
                                                    window.location.href = data.url;
                                                }
                                                if(do_action){
                                                    eval(do_action+"('success')");
                                                }
                                            } else {
                                                if(ajax_error){
                                                    eval(ajax_error+"(data)");
                                                }
                                                // validMethod.showError(false,configMap.targetObj,data.message);
                                                if(data.hasOwnProperty('to_url')){
                                                    window.location.href = data.to_url;//is account is not active
//                                                    var _time = 3;
//                                                    var redircet = setInterval(function(){
//                                                        _time--;
//                                                        if(_time == 1){
//                                                            clearInterval(redircet);
//                                                            window.location.href = data.to_url;//is account is not active
//                                                        }
//                                                    }, 1000);
                                                }
                                                if(do_action){
                                                    eval(do_action+"('error')");
                                                }
                                            }
                                            configMap.targetObj.removeClass('posting');

                                        }
                                    });
                                } else {
                                    $('#form').submit();
                                }
                            }
                        });

                    },

                    validate_before : function(objs, msgs, callback){
                        for(var i = 0; i < objs.length; i++){
                            isCanSubmit = validMethod._check($(objs[i]));
                            if(!isCanSubmit){
                                break;
                            }
                        }
                        return isCanSubmit;
                    },

                    validate_select : function(obj,callback){
                        if(obj.val() == 0 && typeof callback == 'function'){
                            callback(false,obj,obj.attr('valid-empty'));
                        }else if(typeof callback == 'function'){
                            callback(true,obj);
                        }
                    }

                };

            /**
             * 通用的Trim类，去除所有的空格包含中间的空格
             * @param str
             * @param is_global
             * @returns {string|*}
             * @constructor
             */
            function Trim(str,is_global)
            {
                var result =  $.trim(str);
                result = str.replace(/(^\s+)|(\s+$)/g,"");
                if(is_global != undefined && is_global.toLowerCase()=="g")
                    result = result.replace(/\s/g,"");
                return result;
            }

            return $this.each(function(){

                // console.log(configMap);

                validMethod.initEvent( $(this), callback );

            });
        });




    }

    

})(jQuery);