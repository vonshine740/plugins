;(function($, window){
    $.fn.validate = function( userSetting, callback ){
        var self = this,
            defaultConf = {
                validBefore: [],  //对于需要在验证前进行一定操作的方法配置，可对某一个输入框做单独定义，可以放到单个item的data-validBefore中，也可以用对象的形式传递过来
                validFunc: [],     //对于用户要指定验证方法  可以放到单个item的data-validFunc中，也可以用一个对象的形式传递过来
                // errorTip: 'Multiple',   //错误提示方法：分为 多条提示(Multiple)/单条提示(Single)
                errorContainer: '.wrongMsg',    //错误信息存放的容器
                postingFlag: '.posting',    //信息提交中的标识，用来防止多次提交
                validTime: 'realtime',   //验证出发时间：分为 实时(realtime) 随之键盘的输入改变/ 过时的(outmoded) 触发change事件 可以为单个输入框配置实时验证/ 提交的(submoded) 触发提交事件时
                validStop: false,       //验证停止的位置，为true，检查到错误想就停止后面的检测，否则验证所有输入项
                withoutSpacing: 'all-aside',      //指定对每个input的空格处理方式，分为all/part/none - aside/all
                subMethod: 'POST',      //指定表单提交的方式 POST/GET
                subSource: 'system',     //指定提交的数据来源，system是调用form的serilaize方法拼合数据，user的话是用户传入数据
                subAction: 'ajax',    //表单提交的方式 分为 form 和 ajax
                subData: null,    //当指定提交数据来源使用户的时候，把数据放到这个里面传递
                subButton: '.submit',    //需要触发事件的button的选择器
                validType : {
                    checkbox: function(){
                            var name = $(arguments[0]).attr('name');
                            var checkedBox = $(self).find('input[data-type=checkbox][name='+name+']:checked');
                            // 必填的参与判断，否则直接返回true
                            if( $(arguments[0]).attr('data-require') ){
                                if(checkedBox.length>0){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                            return true;
                        },
                    radio: function(){
                            var name = $(arguments[0]).attr('name');
                            var selRadio = $(self).find('input[data-type=radio][name='+name+']:checked');
                            // 必填的参与判断，否则直接返回true
                            if( $(arguments[0]).attr('data-require') ){
                                if(selRadio.length>0){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                            return true;
                        },
                    select: function(){
                            var inputTxt = arguments[1].validVal;
                            // 必填的参与判断，否则直接返回true
                            if( $(arguments[0]).attr('data-require') ){
                                if( inputTxt>0 ){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                            return true;
                        },
                    code: function(){
                            var type = arguments[1].validReg;
                            var re = new RegExp(type);
                            var isTrue = re.test(arguments[1].validVal);
                            return isTrue;
                        },
                    title: function(){
                            var re = new RegExp(arguments[1].validReg);
                            var isTrue = re.test(arguments[1].validVal);
                            return isTrue;
                        },
                    number: function(){
                            var inputTxt = arguments[1].validVal;
                            var type = arguments[1].validReg;

                            var re = new RegExp(type);

                            var isTrue = re.test(inputTxt);

                            if( isTrue && (parseInt(inputTxt, 10)+'') == inputTxt ){
                                return true;
                            }
                            return false;
                        },
                    email: function(){
                            var inputTxt = valFn.trim(arguments[1].validVal,'g');
                            $(arguments[0]).val(inputTxt);
                            var value_length = inputTxt.length;
                            var re = new RegExp("(\\w|\\d)+@(\\w|\\d)+\\.\\w{2,3}");
                            var isTrue = re.test(inputTxt);
                            if( !isTrue ){
                                return false;
                            }
                            return true;
                        },
                    password: function(){
                            var obj = $(arguments[0]);
                            var type = arguments[1].validReg;
                            var wrongmsg = arguments[1].validError;
                            var inputTxt = obj.val();
                            var value_length = inputTxt.length;
                            var value_length2 = valFn.trim(obj.val(),'g').length;

                            // 首先确认是第一输入密码还是第二次输入确认密码
                            var equal = obj.attr('data-equal');
                            if(equal){
                                var equal_id = $("#"+equal);
                                var equal_message = obj.attr('equal-message');
                                if( equal_id.val() == '' ){
                                    return false;
                                }else if( equal_id.val() != inputTxt ){
                                    return {
                                        result: false,
                                        message: equal_message
                                    };
                                }else{
                                    return true;
                                }
                            }else{

                                var wrong = arguments[1].validError;
                                if( value_length != value_length2 && wrong != undefined ){
                                    return false;
                                }else{

                                    var min = obj.attr('valid-min');
                                    if(min != undefined){
                                        if(value_length < min){
                                            return {
                                                result: false,
                                                message: obj.attr('min-message')
                                            };
                                        }
                                    }
                                    var max = obj.attr('valid-max');
                                    if(max != undefined){
                                        if(value_length > max){
                                            return {
                                                result: false,
                                                message: obj.attr('max-message')
                                            };
                                        }
                                    }

                                    var re = new RegExp(type);

                                    var isTrue = re.test(inputTxt);

                                    if( !isTrue ){
                                        return false;
                                    }
                                    return true;

                                }

                            }
                        },
                    label: function(){
                            var inputTxt = valFn.trim(arguments[1].validVal,'g');
                            $(arguments[0]).val(inputTxt);
                            var labels = inputTxt.split(',');
                            var re = new RegExp(arguments[1].validReg);
                            var isTrue = re.test(inputTxt);
                            if( isTrue ){
                                for(var i = 0; i < labels.length; i++){
                                    if( labels[i].length<2 || labels[i].length>10 ){
                                        return false;
                                    }else{
                                        return true;
                                    }
                                }
                            }else{
                                return false;
                            }
                        },
                    mobilePhone: function(){
                            var regExpressMobile = new RegExp('^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
                            var inputTxt = arguments[1].validVal;
                            var validateResult;

                            if( regExpressMobile.test(inputTxt) || regExpressPhone.test(inputTxt) || regExpressPhone2.test(inputTxt) || regExpressPhone3.test(inputTxt) ){
                                validateResult = true;
                            }else{
                                validateResult = false;
                            }
                            return validateResult;
                        },
                    telephone : function(){
                            var inputTxt = obj.val();

                            var regExpressPhone = new RegExp('^([0-9]{3,4}-)?[0-9]{7,8}$');
                            var regExpressPhone2 = new RegExp('^([0-9]{3,4}\b)?[0-9]{7,8}$');
                            var regExpressPhone3 = new RegExp('^([0-9]{3,4} )?[0-9]{7,8}$');

                            if( regExpressPhone.test(inputTxt) || regExpressPhone2.test(inputTxt) || regExpressPhone3.test(inputTxt) ){
                                validateResult = true;
                                isCanSubmit = true;
                            }else{
                                validateResult = false;
                                isCanSubmit = false;
                                validMethod.showError(validateResult,obj,wrongmsg,true);
                                return;
                            }
                            return true;
                        },
                    phone: function(){
                            var regExpressMobile = new RegExp('^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
                            var regExpressPhone = new RegExp('^([0-9]{3,4}-)?[0-9]{7,8}$');
                            var regExpressPhone2 = new RegExp('^([0-9]{3,4}\b)?[0-9]{7,8}$');
                            var regExpressPhone3 = new RegExp('^([0-9]{3,4} )?[0-9]{7,8}$');
                            var inputTxt = arguments[1].validVal;
                            var validateResult;

                            if( regExpressMobile.test(inputTxt) || regExpressPhone.test(inputTxt) || regExpressPhone2.test(inputTxt) || regExpressPhone3.test(inputTxt) ){
                                validateResult = true;
                            }else{
                                validateResult = false;
                            }
                            return validateResult;
                        },
                    editor: function(){
                        var data_max = $(arguments[0]).attr('data-max');
                        var data_cur = $(arguments[0]).attr('data-num');
                        var inputTxt = arguments[1].validVal;
                        if( parseInt(data_max, 10) < parseInt(data_cur, 10) ){
                            return false;
                        }
                        return true;
                    }

                }     //预定义的验证类型
            },
            valFn = {};
            this.currentInput = {
                item: null,
                attributes: {}
            },   // 用来存取当前验证的对象，避免方法调用之间的参数传递
            this.configMap = null,
            this.inputs = null;     //用来存放所有的表单输入项




        //合并参数的方法
        //为实现validType的继承自定义一个方法，其他属性用户传递过来直接覆盖改写，对于validType属性是继承用户穿的数组和用户数组
        valFn.extend = function(){
            var oOld = arguments[0],
                oNew = arguments[1];
                for(var i in oNew){
                    if( oOld.hasOwnProperty(i) && i !== 'validType' ){
                        oOld[i] = oNew[i];
                    }else if( i === 'validType' ){
                        oOld[i] = $.extend(oOld[i], oNew[i]);
                    }
                }
                return oOld;
        }
        // 去除空格的方法 -- 去除所有空格
        valFn.trim = function(str, is_global){
            var result = $.trim(str);

            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global != undefined && is_global.toLowerCase()=="g"){
                result = result.replace(/\s/g,"");
            }
            return result;
        }



        // 获取配置参数
        this.configMap = valFn.extend( defaultConf, userSetting );

        /*
         * 显示/清楚 错误的方法
         * item 当前input对象 -- 等同于this.currentInput.item，flag 显示/清楚错误提示的标志，focus 是否需要获取焦点
         */
        valFn.showError = function(item, flag, focus, state){
            var errorC = valFn.getErrorContainer(item);
            var defaults = errorC.attr('data-default') || '';
            var errorMsg = '';
            if(state===0){
                errorMsg = self.currentInput.attributes.validEmpty;
            }else if(state>=1){
                errorMsg = self.currentInput.attributes.validError;
            }else if(typeof state === 'string'){
                errorMsg = state;
            }

            if(flag){
                // 显示错误
                errorC.html(errorMsg);
                if(defaults) errorC.addClass('error');
                $(item).parents('.input-frame').addClass('error');
            }else{
                // 隐藏错误
                errorC.html(defaults);
                if(defaults) errorC.removeClass('error');
                $(item).parents('.input-frame').removeClass('error');
            }

            if(focus){
                $(item).focus();
            }
        }

        /*
         * 获取错误显示容器的方法
         * item 查询当前input对象对应的错误显示框 -- 等同于this.currentInput.item
         */
        valFn.getErrorContainer = function(item){
            var item = $(item) || self.currentInput.item;
            var msgCtnerLen = self.find('.wrongMsg').length;
            if(msgCtnerLen.length <= 0){
                return null;
            }else if( msgCtnerLen == 1 ){
                return self.find('.wrongMsg');
            }else{
                // 优先获取当前input最近的错误容器
                if( item.parents('dd,dt,li').find('.wrongMsg').length > 0 ){
                    return item.parents('dd,dt,li').find('.wrongMsg');
                }

                // 获取通过 'data-name' 和 'data-for' 链接起来的输入项
                var attrs = valFn.getAttrbutes( item, 'data-name' );
                if(attrs && attrs.validName && self.find('.wrongMsg[data-for='+attrs.validName+']').length > 0 ){
                    return self.find('.wrongMsg[data-for='+attrs.validName+']');
                }
            }

            if(console){
                console.warn('当前输入框没有对应的错误提示容器，无法显示错误提示，请改变dom结构或者通过给当前输入框通过[data-name]和一个错误容器[data-for]建立关联！');
            }
        }

        /*
         * 获取当前input属性的方法
         * item 查询当前input对象对应的验证相关的属性 -- 等同于this.currentInput.item
         */
        valFn.getAttrbutes = function(item, attr){
            var oCur = arguments[0] || self.currentInput.item;
            var attrs = {};
            if(arguments.length == 1){
                attrs.validRequire = $(oCur).attr('data-require');     //必填项
                attrs.validEmpty = $(oCur).attr('data-empty');     //为空提示
                attrs.validError = $(oCur).attr('data-error');     //错误提示
                attrs.validReg = $(oCur).attr('data-reg');     //验证规则
                attrs.validType = $(oCur).attr('data-type');    //输入框对应的验证预制项
                attrs.validName = $(oCur).attr('data-name');      //为button和wrong做链接的标志
                attrs.validBefore = $(oCur).attr('data-before');   //验证之前要做的处理
                attrs.validValid = $(oCur).attr('data-valid');    //验证的方法
                attrs.validVal = $(oCur).val() || $(oCur).text();  //输入框的值
            }else if(arguments.length > 1){
                var aAttr = attr.split('-');
                attrs['valid'+aAttr[aAttr.length-1].substr(0,1).toUpperCase()+aAttr[aAttr.length-1].substr(1)] = $(oCur).attr(attr);
            }
            return attrs;
        }

        /*
         * (针对于提交验证)触发提交事件时，验证当前表单项之前的表单输入项
         */
        valFn.checkPrevious = function(){
            // validStop
            self.inputs.each(function(){
                var res = valFn.checkThis($(this));
                if( self.configMap.validStop && !res.result ){
                    valFn.showError( this, true, true, res.state );
                    return false;
                }
                if(!res.result){
                    valFn.showError( this, true, false, res.state );
                    window.scrollTo(0,0);
                }
            });
            return self.find('.input-frame.error').length>0? false: true;
        }

        /*
         * (针对于实时验证)触发keyup/pastAfter等或change事件时，验证当前表单项的方法
         */
        valFn.checkThis = function(){
            var oCur = arguments[0] || self.currentInput.item;
            var jsCurAttr = valFn.getAttrbutes(oCur);
            self.currentInput.attributes = jsCurAttr;
            var res = true;
            if( jsCurAttr.validRequire && jsCurAttr.validVal.length === 0 ){
                // 必填项为空，返回验证结果为false
                return {
                    result: false,
                    state: 0
                };
            }else if( jsCurAttr.validVal.length > 0 ){
                // 数值不为空，都要进行验证
                // 去预设类型里面查找
                if(jsCurAttr.validType && self.configMap.validType.hasOwnProperty(jsCurAttr.validType)){
                    res = self.configMap.validType[jsCurAttr.validType](oCur, jsCurAttr);
                }else if(jsCurAttr.validReg){
                    var reg = new RegExp(jsCurAttr.validReg);
                    res = reg.test(jsCurAttr.validVal);
                }else{
                    res = true;
                    if(console){
                        console.warn('当前文本未配置任何验证规则，默认不给，直接验证通过！');
                    }
                }
            }
            return typeof res === 'boolean'?{
                result: res,
                state: 1
            }:{
                result: res.result,
                state: res.message
            };
        }

        /*
         * 根据用户参数改变方法执行走向的路由方法
         */
        valFn.funcSwitcher = function(args){
            switch (args){
                case 'validTime':
                    // 根据validTime的值，判断验证触发的时间，来绑定不同的事件
                    switch (self.configMap.validTime){
                        case 'realtime':
                            // 实时验证 -- keyup
                            return 'keyup afterpaste change'
                            break;
                        case 'outmoded':
                            //change之后验证
                            return 'change';
                            break;
                        case 'submoded':
                        default:
                            // 表单提交触发 -- 默认方式
                            return '';
                            break;
                    }
                    break;
            }
        }

        // 用form方式提交表单
        valFn.submitForm = function(){
            switch (self.configMap.subSource){
                // case 'user':
                //     if(self.configMap.subData){
                //         console.log(self.configMap.subData);
                //         // $(self).submit(function(){
                //             // alert('ssssssss');
                //             // dataType: 'json',
                //             // beforeSubmit: function(a,f,o){
                //             //     console.log(arguments)
                //             // }
                //         // });
                //     }else{
                //         if(console)console.warn('请指定用户拼合表单数据，否则用默认表单提交数据');
                //         // alert('as');
                //         $(self).submit();
                //     }
                //     break;
                // case 'system':
                default:
                    $(self).submit();
                    break;
            }
        }

        // 用ajax方式提交表单
        valFn.submitAjax = function(){
            var subing = self.configMap.postingFlag;
            if(!$(self).find(self.configMap.subButton).hasClass(subing.substr(1))){
                var data = null;
                switch (self.configMap.subSource){
                    case 'user':
                        if(self.configMap.subData){
                            data = self.configMap.subData;
                        }else{
                            if(console)console.warn('请指定用户拼合表单数据，否则用默认表单提交数据');
                            data = $(self).serialize();
                        }
                        break;
                    case 'system':
                    default:
                        data = $(self).serialize();
                        break;
                }
                var subMethod = self.configMap.subMethod || $(self).attr('data-method');
                var subSuccess = self.configMap.subSuccess || $(self).attr('data-success');
                var subError = self.configMap.subError || $(self).attr('data-error');
                var subUrl = self.configMap.subUrl || $(self).attr('data-url');
                $(self).find(self.configMap.subButton).addClass(subing.substr(1));
                $.ajax({
                    type : subMethod,
                    async : true,
                    data : data,
                    dataType : "json",
                    url : subUrl,
                    success : function(data){
                        if(subSuccess)eval(subSuccess+"(data)");
                        $(self).find(self.configMap.subButton).removeClass(subing.substr(1));
                    },
                    error: function(data){
                        if(subError)eval(subError+"(data)");
                        $(self).find(self.configMap.subButton).removeClass(subing.substr(1));
                    }
                });
            }
        }

        /*
         * 绑定事件的方法
         */
        valFn.bindEvts = function(){
            // 根据validTime的值，判断验证触发的时间，来绑定不同的事件
            var inputEvt = valFn.funcSwitcher('validTime');
            $('body').delegate('input, select, textarea', inputEvt, function(event) {
                if( $.inArray(this, self.inputs) >= 0 ){
                    self.currentInput.item = this;
                    // 执行验证方法
                    var itemRes = valFn.checkThis(this);
                    if( itemRes.result ){
                        valFn.showError( this, false, true );
                    }else if( !itemRes.result && itemRes.state <= 0 ){
                        valFn.showError( this, true, true, 0 );
                    }else if( !itemRes.result && itemRes.state > 0 ){
                        valFn.showError( this, true, true, 1 );
                    }else{
                        valFn.showError( this, true, true, itemRes.state );
                    }
                    console.log(itemRes);
                }
            });

            // 绑定各种按钮的事件
            $('body').delegate(self.configMap.subButton, 'click', function(event) {
                // 按钮类别
                var buttonType = $(this).attr('data-for');
                if(buttonType){
                    // 这是一个只针对某个表单项的button
                    return false;
                }

                // 这是一个针对表单提交的button -- 需要对页面的输入项都进行验证
                var allRes = valFn.checkPrevious();
                if(allRes){
                    switch (self.configMap.subAction){
                        case 'form':
                            valFn.submitForm();
                            break;
                        case 'ajax':
                        default:
                            valFn.submitAjax();
                            break;
                    }
                }
                event.preventDefault();
            });
        }

        /*
         * 获取输入项集合的方法
         */
        valFn.getInputs = function(){
            self.inputs = self.find('input, select, textarea');
        }


        // 绑定事件
        $(function(){
            // 获取一次inputs集合，然后绑定事件
            valFn.getInputs();
            // alert(self.inputs.length);
            valFn.bindEvts();
            // console.log(self.configMap);
        });

    }

})(jQuery, window);