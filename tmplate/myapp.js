var MYAPP = MYAPP || {};
/**
 * [namespace 创建新的命名空间]
 * @param  {[String]} name [要要创建的命名空间]
 * @return {[Object]}      [新的命名空间对象]
 */
MYAPP.namespace = function( name ){
	var props = name.split('.'),
		current = MYAPP;

	for( var i in props ){
		if( current[props[i]] === undefined ){
			current[props[i]] = {};
		}
		current = current[props[i]];
	}
}

MYAPP.namespace('console');
MYAPP.console.log = function(message){
	// if( window.console && typeof console.log === 'function' ){
	// 	console.log(message);
	// }else{
	// 	// alert(message);
	// }
}
/**
 * 分页类
 */
MYAPP.pagination = function(options){
	MYAPP.console.log(options+32);
	options.current = parseInt(options.current, 10);
	options.itemCount = parseInt(options.itemCount, 10);
	options.pageLimit = 10;
	// 页码总数判断
	if(options.itemCount%options.pageLimit>0 && options.itemCount/options.pageLimit < 1){
		options.pageCount = 1;
	}else if( options.itemCount%options.pageLimit == 0 && options.itemCount/options.pageLimit >= 1 ){
		options.pageCount = parseInt(options.itemCount/options.pageLimit, 10);
	}else{
		options.pageCount = parseInt(options.itemCount/options.pageLimit, 10)+1;
	}
	MYAPP.console.log(options.pageCount+44);
	// 当前页获取
	options.current = options.current || 1;
	MYAPP.console.log(options.current == options.pageCount+47);
	if(!options.pageCtner){
		options.pageCtner = '#pagination';
	}
	var pageHtml = [];
	if(options.itemCount){
		switch (options.pageCount){
			case 1:
				pageHtml.push('<a href="#page" data-item="1" class="side-page disable">&lt;&lt;</a>');
				pageHtml.push('<a href="#page" data-item="prev" class="disable">&lt;</a>');
				pageHtml.push('<a href="#page" data-item="1" class="current">1</a>');
				pageHtml.push('<a href="#page" data-item="next" class="disable">&gt;</a>');
				pageHtml.push('<a href="#page" data-item="1" class="side-page disable">&gt;&gt;</a>');
				break;
			default:
				if( options.current == 1 ){
					// 分页--第一页
					pageHtml.push('<a href="#page" data-item="1" class="side-page disable">&lt;&lt;</a>');
					pageHtml.push('<a href="#page" data-item="prev" class="disable">&lt;</a>');
				}else{
					pageHtml.push('<a href="#page" data-item="1" class="side-page">&lt;&lt;</a>');
					pageHtml.push('<a href="#page" data-item="prev" class="">&lt;</a>');
				}

				if(options.pageCount<8){
					//页面小于8页的时候不会出现...
					for(var i = 1; i <= options.pageCount; i++){
						if( i == options.current ){
							pageHtml.push('<a href="#page" data-item="'+i+'" class="current">'+i+'</a>');
						}else{
							pageHtml.push('<a href="#page" data-item="'+i+'" class="">'+i+'</a>');
						}
					}
				}else{
					//页面大于8页的时候出现，前5后3的分布...
					
					// 当前页面位置
					if( options.current < 5 ){
						//如果当前页码小于5
						// 输出1-5页
						for(var i = 1; i <= 5; i++){
							if( i == options.current ){
								pageHtml.push('<a href="#page" data-item="'+i+'" class="current">'+i+'</a>');
							}else{
								pageHtml.push('<a href="#page" data-item="'+i+'" class="">'+i+'</a>');
							}
						}
						// 输出中间过度页码
						pageHtml.push('<a href="#page" data-item="" class="">...</a>');
						// 输出尾部两页
						for(var j = (options.pageCount-1); j <= options.pageCount; j++){
							if( j == options.current ){
								pageHtml.push('<a href="#page" data-item="'+j+'" class="current">'+j+'</a>');
							}else{
								pageHtml.push('<a href="#page" data-item="'+j+'" class="">'+j+'</a>');
							}
						}
					}else if( options.current < (options.pageCount-4) ){
						// 如果当前页码大于5
						//格式为 3 4 5.current 6 7，一次后移
						//输出格式化部分
						for(var i = (options.current-2); i <= (options.current+2); i++){
							if( i == options.current ){
								pageHtml.push('<a href="#page" data-item="'+i+'" class="current">'+i+'</a>');
							}else{
								pageHtml.push('<a href="#page" data-item="'+i+'" class="">'+i+'</a>');
							}
						}
						// 输出中间过度页码
						pageHtml.push('<a href="#page" data-item="" class="">...</a>');
						// 输出尾部两页
						for(var j = (options.pageCount-1); j <= options.pageCount; j++){
							if( j == options.current ){
								pageHtml.push('<a href="#page" data-item="'+j+'" class="current">'+j+'</a>');
							}else{
								pageHtml.push('<a href="#page" data-item="'+j+'" class="">'+j+'</a>');
							}
						}
					}else{
						// 当前页码接近结尾时，要多显示一点后边的
						//输出最先的2页
						pageHtml.push('<a href="#page" data-item="1" class="">1</a>');
						pageHtml.push('<a href="#page" data-item="2" class="">2</a>');
						// 输出中间过度页码
						pageHtml.push('<a href="#page" data-item="" class="">...</a>');
						// 输出结尾部分的页码
						for(var i = (options.pageCount-4); i <= options.pageCount; i++){
							if( i == options.current ){
								pageHtml.push('<a href="#page" data-item="'+i+'" class="current">'+i+'</a>');
							}else{
								pageHtml.push('<a href="#page" data-item="'+i+'" class="">'+i+'</a>');
							}
						}
					}
				}
				
				if( options.current != options.pageCount ){
					pageHtml.push('<a href="#page" data-item="next" class="">&gt;</a>');
					pageHtml.push('<a href="#page" data-item="'+options.pageCount+'" class="side-page">&gt;&gt;</a>');
				}else{
					pageHtml.push('<a href="#page" data-item="next" class="side-page disable">&gt;&gt;</a>');
					pageHtml.push('<a href="#page" data-item="'+options.pageCount+'" class="disable">&gt;</a>');
				}
				break;
		}

		$(pageHtml.join(' ')).appendTo($(options.pageCtner));
		// 修复ie8新插入的分页不显示
		var ie8 = document.createElement('em');
		var ie8s = document.createTextNode(' ');
		ie8.appendChild(ie8s);
		var page = $(options.pageCtner)[0];
		page.appendChild(ie8);

		$(options.pageCtner+' a').bind('click', function(){
			if($(this).hasClass('disable')||$(this).hasClass('current')){
				return false;
			}else{
				var targetAttr = $(this).attr('data-item'),
					reqPage = 1;
				switch (targetAttr){
					case 'prev':
						reqPage = options.current-1;
						break;
					case 'next':
						reqPage = options.current+1;
						break;
					default:
						reqPage = targetAttr;
						break;
				}
			}

			MYAPP.console.log('请求的页面页码是：'+reqPage+107);
			MYAPP.console.log($('#asideBar .current').parents('.btn')+108);
			$('#asideBar .current').parents('.btn').attr('data-page',reqPage);
			$('#asideBar .current').parents('.btn').click();
		});

		// 分页加载后根据内容判断分页的正确性，将分页移动到上一页
		var curLen = $('#contentCtner .data-grid tbody tr').length,
			reqPage = $('#asideBar .current').parents('.btn').attr('data-page') || 1;
		if(curLen<=1){
			$('#asideBar .current').parents('.btn').attr('data-page',(reqPage-1)>0?(reqPage-1):1 );
			$('#asideBar .current').parents('.btn').click();
		}


	}
}

/**
 * [AsideBar 点击按钮基础类]
 * @param {[Object]} obj [按钮的容器]
 * @return {[Object]}      [实例对象]
 */
MYAPP.AsideBar = function( obj ){
	this._ctner = obj;
	this._btnItem = obj.find('.btn');
	this._btnStatic = obj.find('.static');
	this._btnFolder = obj.find('.navFolder');
	this.config = {
		"requestUrl": '',
		"requestMethod": 'POST',
		"returnCtner": '',
		"requestCallback" : '',
		"eventTarget": null
	};

	//合并用户参数与默认参数配置
	$.extend( this.config, this._getConfig() );
	this._bindEvent();
	return this;
}
MYAPP.AsideBar.prototype = {
	/**
	 * [_bindEvent 按钮事件绑定]
	 * @return {[type]} [description]
	 */
	_bindEvent: function(){
		var _that = this;
		// 点击可以直接发送ajax请求的侧导航按钮
		this._btnItem.each(function(){
			$(this).bind('click', function( evt ){

				$('.navFolder').removeClass('show-nav');
				_that._btnFolder.find('em.left').html('+');
				$(this).parents('.navFolder,.btn').addClass('show-nav').find('em.left').html('-');;

				_that._btnItem.find('em.left').html('+');
				_that._btnStatic.find('em.left').html('+');

				evt = evt || window.event; 

				// 在这里判断编辑器那个鸟东西
				// 销毁编辑器不然不能再次初始化
		  		
		  		// 获取一个编辑器数组的那个--党群建设
				if(typeof window.ueditorArray !== 'undefined'){
					$('#contentCtner .floatPageOver').find('.editCancle').click();
				}

				// 编辑的编辑器
				if($('#contentCtner .floatPage:visible').length > 0){
					if($('#contentCtner .floatPage:visible').find('.artCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.artCancle').click();
					}

					if($('#contentCtner .floatPage:visible').find('.productCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.productCancle').click();
					}

					if($('#contentCtner .floatPage:visible').find('.editCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.editCancle').click();
					}
				}

				if($('#contentCtner .floatPageOver').length > 0){
					if($('#contentCtner .floatPageOver').find('.editCancle').length>0){
						$('#contentCtner .floatPageOver').find('.editCancle').click();
					}
				}
				// 获取一个编辑器数组的那个--党群建设
				if(typeof window.ueditorArray !== 'undefined'){
					$('#contentCtner .floatPageOver').find('.editCancle').click();
				}


				// ----------------------------------------------------------------------------------------

				_that.config.eventTarget = $(this);
				var dataGroup = $(this).parents('.navFolder').attr('data-group'),
					dataChannel = $(this).attr('data-channel'),
					dataPage = $(this).attr('data-page');
				_that.config.groupId = dataGroup || 1;
				_that.config.channelId = dataChannel || 1;
				_that.config.page = dataPage || 1;

				if(dataGroup){
					_that.config.literals = 'channelId='+dataGroup;
					if(dataChannel){
						_that.config.literals = _that.config.literals + '&columnId='+_that.config.channelId;
					}
				}else{
					if(dataChannel){
						_that.config.literals = 'channelId='+dataChannel;
					}
				}

				// 定位到顶端
				if(window.scrollTo){
					window.scrollTo(0,0);
				}

				
				_that.config.literals = _that.config.literals + '&page='+_that.config.page;
				

				_that.config.requestUrl = $(this).attr('data-href');

				_that.eventRespone(_that.config );

				$(this).find('em.left').html('-');
				evt.preventDefault();
				evt.stopPropagation();
			});
		});
		// 点击可以展开和折叠的侧导航按钮
		this._btnFolder.each(function(){
			$(this).bind('click', function( evt ){
				
				_that._btnFolder.find('em.left').html('+');
				// _that._btnItem.find('em.left').html('+');
				// _that._btnStatic.find('em.left').html('+');

				evt = evt || window.event;
				_that.toggleFolder($(this));
				evt.stopPropagation();
			});
		});
		// 点击请求当前页面隐藏域静态页面的按钮
		this._btnStatic.each(function(){
			$(this).bind('click', function(){

				_that._btnFolder.find('em.left').html('+');
				_that._btnItem.find('em.left').html('+');
				_that._btnStatic.find('em.left').html('+');

				$('.navFolder').removeClass('show-nav');

				// 在这里判断编辑器那个鸟东西
				// 销毁编辑器不然不能再次初始化
				// 获取一个编辑器数组的那个--党群建设
				if(typeof window.ueditorArray !== 'undefined'){
					$('#contentCtner .floatPageOver').find('.editCancle').click();
				}
		  		// 编辑的编辑器
				if($('#contentCtner .floatPage:visible').length > 0){
					if($('#contentCtner .floatPage:visible').find('.artCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.artCancle').click();
					}

					if($('#contentCtner .floatPage:visible').find('.productCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.productCancle').click();
					}

					if($('#contentCtner .floatPage:visible').find('.editCancle').length>0){
						$('#contentCtner .floatPage:visible').find('.editCancle').click();
					}
					
				}


				// ----------------------------------------------------------------------------------------
				// 
				_that.config.eventTarget = $(this);
				$(this).find('a').addClass('current').find('em.left').html('-');
				$('#contentCtner').html($($(this).attr('data-static')).html());
				MYAPP.example.aside.config.requestCallback();
			});
		});
		// 点击用自身  data-href  属性去发送请求的按钮
		// this._btnSpecial.each(function(){
		// 	$(this).bind('click', function( evt ){
		// 		evt = evt || window.event;
		// 		_that.config.eventTarget = $(this);
		// 		_that.config.requestUrl = $(this).attr('data-href');
		// 		_that.eventRespone(_that.config);
		// 		evt.preventDefault();
		// 		evt.stopPropagation();
		// 	});
		// });

	},
	/**
	 * [_getConfig 参数配置的读取]
	 * @return {[type]} [description]
	 */
	_getConfig: function(){
		if( this._ctner ){
            var config = this._ctner.attr('data-setting');
            if( config && config != '' ){
                return $.parseJSON( config );
            }else{
                return {};
            }
        }
	},
	/**
	 * [eventRespone 事件相应方法]
	 * @return {[type]} [description]
	 */
	eventRespone: function(){
		alert('I am clicked !');
	},
	toggleFolder: function(obj){
		// 只有展开后有子栏目才可以点击打开
		obj.siblings('.navFolder.show-nav').removeClass('show-nav');
		if(obj.find('ul>li').length > 0){
			if( obj.hasClass('show-nav') ){
				obj.removeClass('show-nav');
				$('em', obj).html('+');
			}else{
				obj.addClass('show-nav');
				$('em', obj).html('-');
			}
		}
	}
}

/**
 * 创建ajax请求的命名空间
 */
MYAPP.namespace('ajaxHandler');
/**
 * [ajaxAction ajax请求方式]
 * @return {[type]} [description]
 */
MYAPP.ajaxHandler.ajaxAction = function( options ){
	MYAPP.console.log(options+'261');
	switch (options.type){
		case 'aside': 
			alert('aside');
			break;
		case 'detail':
			alert('detail');
			break;
		case 'deleteItem':
			$.ajax({
				type : options.requestMethod,
		        async : false,
		        dataType : "json",
		        url : options.requestUrl,
		        data:options.literals,
		        success : function(data){
		        	MYAPP.ajaxHandler.ajaxReturn(data, options);
		            if( typeof options.requestCallback == 'function' ){
		            	options.requestCallback(data);
		            }
		        },
		        complete : function(data){
		        	if( typeof options.ajaxComp == "function" ){
		        		options.ajaxComp(data);
		        	}
		        },
		        error : function(data){
		        	if( typeof options.ajaxError == "function" ){
		        		options.ajaxError(data);
		        	}
		        }
			});
			break;
		case 'noEditor':
			$.ajax({
				type : options.requestMethod,
		        async : false,
		        dataType : "html",
		        url : options.requestUrl,
		        data: options.literals,
		        success : function(data){
		            if( typeof options.requestCallback == 'function' ){
		            	options.requestCallback(data);
		            }
		        },
		        complete : function(data){
		        	if( typeof options.ajaxComp == "function" ){
		        		options.ajaxComp(data);
		        	}
		        },
		        error : function(data){
		        	if( typeof options.ajaxError == "function" ){
		        		options.ajaxError(data);
		        	}
		        }
			});
			break;
		default:
			$.ajax({
				type : options.requestMethod,
		        async : false,
		        dataType : "html",
		        url : options.requestUrl,
		        data: options.literals,
		        success : function(data){
		        	// 销毁编辑器不然不能再次初始化
		        	// 编辑的编辑器
					// try{
					// 	if($('#contentCtner .floatPage:visible #editEditor').length > 0){
					// 		alert('1');
					// 		UE.getEditor('editEditor').destroy();	
					// 		console.log(UE.getEditor('editEditor'));
					// 		console.log(307);
					// 	}
					// }catch(e){
					// 	MYAPP.console.log('没找到editEditor编辑器 --311！');
					// }

					// // 文章内容的编辑器
					// try{
					// 	if($('#contentCtner .floatPage:visible #arcContent').length > 0){	
					// 		alert('2');
					// 		UE.getEditor('arcContent').destroy();
					// 		console.log(UE.getEditor('arcContent'));
					// 		console.log(317);
					// 	}
					// }catch(e){
					// 	MYAPP.console.log('没找到editEditor编辑器 --322！');
					// }

					// // 产品描述的编辑器
					// try{
					// 	if($('#contentCtner .floatPage:visible #productContent').length > 0){
					// 		alert('3');
					// 		UE.getEditor('productContent').destroy();
					// 		console.log(UE.getEditor('productContent'));
					// 		console.log(327);
					// 	}
					// }catch(e){
					// 	MYAPP.console.log('没找到editEditor编辑器 --333！');
					// }

		        	MYAPP.ajaxHandler.ajaxReturn(data, options);
		            if( typeof options.requestCallback == 'function' ){
		            	options.requestCallback(data);
		            }
		        },
		        complete : function(data){
		        	if( typeof options.ajaxComp == "function" ){
		        		options.ajaxComp(data);
		        	}
		        },
		        error : function(data){
		        	if( typeof options.ajaxError == "function" ){
		        		options.ajaxError(data);
		        	}
		        }
			});
			break;
	}
}
/**
 * [ajaxReturn ajax请求完成的执行方法]
 * @return {[type]} [description]
 */
MYAPP.ajaxHandler.ajaxReturn = function(){
	if(!arguments[1].flpage){
		// 是为了判断第3层浮层出现的时候是不是要将floatpage层移除，如果传递了flapage则不移除
		if($('#contentCtner .floatPageOver').length>0){
			$('#contentCtner .floatPageOver').remove();
		}else{
			$('#contentCtner .floatPage').remove();
		}
	}
	$(arguments[1].returnCtner).html(arguments[0]);

}

/**
 * 创建layout相关的命名空间--布局
 */
MYAPP.namespace('layout');
MYAPP.layout.twoColsStyle = function(options){
	var _self = this,
		_args = {
			widthOfWindow : $(window).width(),
			mainParCtnerObj : null,
			widthOfMainParCtner : 0,
			asideObj : null,
			widthOfAside : 0,
			mainCtnerObj : null,
			widthOfMainCtner : 0,
			_config : {
				"mainParentctner" : ".main-container",
				"sideBar" : "asideBar",
				"mainCtner" : "contentCtner",
				"minwidth" : 1366
			}
		};

	//合并用户参数与默认参数配置
	$.extend( _args._config, options );

	_args.widthOfWindow = _args.widthOfWindow < _args._config.minwidth ? _args._config.minwidth : _args.widthOfWindow;
	_args.mainParCtnerObj = $(_args._config.mainParentctner);
	_args.widthOfMainParCtner = _args.mainParCtnerObj.outerWidth();
	_args.asideObj = $(_args._config.sideBar);
	_args.widthOfAside = _args.asideObj.outerWidth();
	_args.mainCtnerObj = $(_args._config.mainCtner);
	_args.widthOfMainCtner = _args.mainCtnerObj.outerWidth();

	this.format(_args);

}
// MYAPP.layout.twoColsStyle.prototype = {
// 	format : function(){
// 		var _self = this,
// 			_args = arguments[0];
// 		if( _args.widthOfWindow < _args._config.minwidth ){
// 			_args.mainCtnerObj.css({
// 				"width" : _args._config.minwidth - _args.widthOfAside
// 			});
// 		}else{
// 			_args.mainCtnerObj.css({
// 				"width" : _args.widthOfWindow - _args.widthOfAside
// 			});
// 		}
// 		_args.mainParCtnerObj.siblings().css({
// 			"min-width" : _args.widthOfWindow
// 		});
// 		$(window).bind('resize', function(){
// 			_self.format(_args);
// 		});
// 	}
// }


// 创建一个分组选择的check的grid
MYAPP.groupCheck = function(options){
	var self = this;
	this.grid = options.grid || $('.groupCkeck:visible');
	this.inputs = this.grid.find('input[type=checkbox]:visible');
	this._bindEvt();
	this.initFormat(options);
};
MYAPP.groupCheck.prototype = {
	_bindEvt : function(){
		var that = this;
		this.inputs.bind('change', function(){
			var judge = {
				group: $(this).attr('data-group'),
				belong1: $(this).attr('data-belong1'),
				belong2: $(this).attr('data-belong2'),
				eventSrc: $(this)
			};

			// 清除错误提示
			$('.data-grid-limits:visible').removeClass('wrong').siblings('.wrongmsg').removeClass('error').html('');

			that.doAction(judge);
		});
	},
	doAction : function(options){
		var eventSrc = options.eventSrc;
		// 全选操作
		var groupInfo = options.group;
		if(options.group === 'all'){
			this.toggleCheck({
				target: eventSrc,
				relative: this.inputs
			});
		}else{	//给其他子类checkbox添加
			this.toggleCheck({
				target: eventSrc,
				relative: this.inputs
			});
		}
	},
	toggleCheck: function(options){
		var evtSrc = options.target,
			group = options.target.attr('data-group'),
			belong1 = options.target.attr('data-belong1'),
			belong2 = options.target.attr('data-belong2'),
			bel1Len = 0,
			bel2Len = 0,
			bel21Len = 0,
			allLen = 0,
			checkedLen = 0;




		// 判断是顶级全选按钮吗？
		if(group==='all'){
			// 是最顶层的全选按钮
			if(evtSrc.attr('checked')=='checked'||evtSrc.attr('checked')==true){
				// 是选中状态就全部选中
				if(options.relative.length>0){
					options.relative.attr('checked', 'checked');
				}
			}else{
				// 不是选中状态，就取消全选
				if(options.relative.length>0){
					options.relative.removeAttr('checked');
				}
			}
		}else{
			// 不是最顶层的全选按钮
			 
			if(evtSrc.attr('checked')=='checked'||evtSrc.attr('checked')==true){

				// 是选中状态
				if(group){
					$('input[data-belong1='+group+']:visible').attr('checked', 'checked');
					$('input[data-belong2='+group+']:visible').attr('checked', 'checked');
				}
				if(belong1){
					bel1Len = $('input[data-belong1='+belong1+']:visible:not(:checked)').length;
					if(bel1Len == 0){
						$('input[data-group='+belong1+']:visible').attr('checked', 'checked');
					}
				}
				if(belong2){
					bel2Len = $('input[data-belong2='+belong2+']:visible:not(:checked)').length;
					// alert(bel2Len);
					if(bel2Len == 0){
						$('input[data-group='+belong2+']:visible').attr('checked', 'checked');
					}

					if(belong1){
						bel21Len = $('input[data-belong1='+belong1+']:visible:not(:checked)').length;
						if(bel21Len==0){
							$('input[data-group='+belong1+']:visible').attr('checked', 'checked');
						}
					}
				}
			}else{
				// 取消选中状态
				if(group){
					$('input[data-belong1='+group+']:visible').removeAttr('checked');
					$('input[data-belong2='+group+']:visible').removeAttr('checked');
				}

				if(belong1){
					$('input[data-group='+belong1+']:visible').removeAttr('checked', 'checked');
				}
				if(belong2){
					$('input[data-group='+belong2+']:visible').removeAttr('checked', 'checked');
				}
			}
		}
		allLen = options.relative.length;
		checkedLen = $(options.relative+':checked').length;
		// alert('options.relative.length'+options.relative.length);
		// alert(allLen-checkedLen);
		if(evtSrc.attr('checked')=='checked'||evtSrc.attr('checked')==true){
			// 从未选中到都选中，会差一个全选的
			if((allLen-checkedLen)===1||(allLen-checkedLen)===0){
				$('input[data-group=all]:visible').attr('checked', 'checked');
			}
		}else{
			// alert('sdbefore');
			if((allLen-checkedLen)===0){
				// alert('sd');
				$('input[data-group=all]:visible').attr('checked', 'checked');
			}else{
				$('input[data-group=all]:visible').removeAttr('checked');
			}
		}
	},
	initFormat: function(options){
		// console.log(this);
		// 现获取所有的从属关系
		var depends = {};
		var groups1 = [],
			groups2 = [],
			groupsAll = [];
		this.inputs.each(function(){
			var bel1 = $(this).attr('data-belong1'),
				bel2 = $(this).attr('data-belong2');

			if(bel1){
				// 如果当前分组信息的数组中，就放进去
				var flag = $.inArray(bel1, groups1);
				if(flag<0){
					groups1.push(bel1);
				}
			}
			
			if(bel2){
				// 如果当前分组信息的数组中，就放进去
				var flag = $.inArray(bel2, groups2);
				if(flag<0){
					groups2.push(bel2);
				}
			}

		});
		window.test = this.inputs;


		// 以及分组信息去判断选中状态
		for(var i=0; i<groups1.length; i++){
			var lenAll = $(this.inputs+'[data-belong1='+groups1[i]+']:visible').length;
			var lenChe = $(this.inputs+'[data-belong1='+groups1[i]+']:visible:checked').length;
			var lesAll = $(this.inputs+'[data-group][data-belong1='+groups1[i]+']:visible').length;

			if(lenAll==lenChe){
				$(this.inputs+'[data-group='+groups1[i]+']:visible').attr('checked', 'checked');
			}

			var les = $(this.inputs+'[data-group][data-belong1='+groups1[i]+']:visible:checked').length;
			// alert(lesAll-les);
			// 如果存在那种比较特别的二级的要做个处理
			if(lesAll>0){
				if(lenChe+(lesAll-les)==lenAll){
					$(this.inputs+'[data-group='+groups1[i]+']:visible').attr('checked', 'checked');
				}
			}
		}

		for(var j=0; j<groups2.length; j++){
			var lenAll = $(this.inputs+'[data-belong2='+groups2[j]+']:visible').length;
			var lenChe = $(this.inputs+'[data-belong2='+groups2[j]+']:visible:checked').length;
			if((lenAll==lenChe)&&lenChe!=0){
				$(this.inputs+'[data-group='+groups2[j]+']:visible').attr('checked', 'checked');
			}
		}

		// 都处理完还要判断是不是把全选选中
		var total = $(this.inputs).length;
		var checkedAft = $(this.inputs+':checked:visible').length;
		if(total==(checkedAft+1)){
			$(this.inputs+'[data-group=all]').attr('checked', 'checked');
		}
	}
}

/**
 * [grid 数据表格结构]
 * @param  {[Object]} options [传递配置参数]
 * @return {[type]}         [description]
 */
MYAPP.grid = function(options){
	this.options = options;
	this.target = options.gridTarget.length>0?options.gridTarget:$('. '+options.gridTarget) ;
	this.itemAddBtn = $('#contentCtner '+options.itemAddBtn);	//添加grid的item的按钮
	this.articleAddBtn = $('#contentCtner '+options.articleAddBtn);		//添加文章的按钮
	this.editBtn = this.target.find(options.editBtn);	//编辑按钮
	this.delBtn = this.target.find(options.delBtn);	//删除单条按钮
	this.delMulti = this.target.find(options.delMulti);	//删除多条数据
	this.moveBtn = this.target.find(options.moveBtn);	//移动单条按钮
	this.reqPage = this.target.find(options.reqPage);	//请求静态资源(不发送网络请求，直接从页面隐藏区域那内容)的按钮
	this.checkBtn = this.target.find('input');	//多选的选择框
	this.reqEdit = this.target.find(options.reqEdit);	//页面编辑方法（非弹框）
	this.moveMulti = this.target.find(options.moveMulti);	//批量移动的按钮
	this.productAdd = $('#contentCtner '+options.productAdd);	//发布产品的按钮
	this.addEGridItem = $('#contentCtner .floatPage '+options.addEGridItem);	//编辑页面添加列表的item
	this.addEGridItemZizhi = $('#contentCtner .floatPage '+options.addEGridItemZizhi);	//编辑页面添加--公司资质
	this.editPWD = this.target.find(options.editPWD);	//更改密码
	return this;
}
MYAPP.grid.prototype ={
	 style: function(){
	 	if( this.target.length > 0 ){
	 		this.target.find('tr').removeClass('even-child').removeClass('odd-child');
	 		this.target.find('tr:even').addClass('even-child');
	 	}else{
	 		$('.data-grid').find('tr').removeClass('even-child').removeClass('odd-child');
	 		$('.data-grid').find('tr:even').addClass('even-child');
	 	}
	 	// 添加标题栏的动态改变
 		var _tempTitle =$('.titleBar:visible').find('.titleCtner')
 			currentTitle = $('#asideBar .current').html();
 			_tempTitle.html(currentTitle);

 		// 改变按钮的文字
 		if($('#asideBar .current').parents('li.btn').attr('data-channel')==1 || $('#asideBar .current').parents('li.btn').attr('data-channel')==7){
 			if($('#mainHeader .active').attr('data-part')==='content' || $('#mainHeader .active').attr('data-part')==='column'){
 				$('.itemAdd:visible').html('创建文章栏目');
 			}
 		}
	 	
	 	MYAPP.console.log('表格应用样式执行完毕！');
	 },
	 //全选的判断以及返回相关选中items的id数组
	 checkItem: function(obj){

	 	var _checkId = obj.attr('data-id'),
	 		checkedArray = [];

		if( obj.attr('checked') || obj.attr('checked')=='checked' ){
			if( _checkId === 'all' ){
				// 全选
 				this.checkBtn.each(function(){
 					if(!($(this).attr('disabled') || $(this).attr('readonly'))){
						$(this).attr('checked', 'checked');	
					}
 				});
 			}else{
 				var lenAll = $('input[type=checkbox][data-id!=all]:visible').length,
 					lenCkecked = $('input[type=checkbox][data-id!=all]:visible:checked').length;
 				if(lenAll==lenCkecked){
 					$('input[type=checkbox][data-id=all]:visible').attr('checked', 'checked');
 				}
 			}
		}else{
			if( _checkId === 'all' ){
				// 全不选
 				this.checkBtn.removeAttr('checked');
 			}else{
 				$('input[data-id=all]').removeAttr('checked');
 			}
		}

		this.checkBtn.each(function(){
			if( $(this).attr('data-id') !== 'all' && $(this).attr('checked') == 'checked' ){
				checkedArray.push($(this).attr('data-id'));
			}
		});
		
		return checkedArray;
 		
	 },
	 //添加grid的item的相关操作
	 addItemAction: function(options){
	 	var obj = options.eventSrc;

	 	var dataTarget = $('#asideBar .current').parents('li').attr('data-target')||'',
	 		curId = options.eventSrc.parents('td').attr('data-item');

	 	window.itemAdition = new MYAPP.Alert.AlertBox('add'+dataTarget, function(flag){

	 		if( !flag ){

	 			// 点击取消按钮，直接隐藏弹窗，并且清空输入框的数据
	 			itemAdition.remove();
	 			itemAdition.Initialization();
	 		}else{

	 			// 点击确定按钮，发起提交的请求，根据返回状态执行不同的操作
	 			
	 			if( obj.attr('data-method') === undefined || obj.attr('data-method') == 'ajax'  ){
	 				// ajax提交的数据，则用这个方式进行提交状态的判断
	 				MYAPP.console.log('提交方式是：ajax');
	 				// $(document).ajaxComplete(function(event, xhr, settings) {
	 				// 	/* executes whenever an AJAX request completes */
	 				// 	var jsonResponse = $.parseJSON( xhr.responseText );
	 				// 	if( jsonResponse.api_code == 1 ){
	 				// 		if(!jsonResponse.data){
	 				// 			itemAdition.remove();
		 			// 			itemAdition.Initialization();
		 			// 			var id = $('.asidebar .current').parents('.btn').attr('data-channel');
		 			// 			// 刷新列表
		 			// 			$('.asidebar .btn[data-channel='+id+']').click();
	 				// 		}
	 				// 	}

	 				// 	$(document).unbind('ajaxComplete');
	 				// });
	 			}else if( obj.attr('data-method') == 'form' ){
	 				// 如果是iframe隐藏域模拟页面无刷新的表单提交，则用这个方法判断
	 				MYAPP.console.log('提交方式是：form');
	 				// var curFlag = $('#contentCtner>.wrapper').find('.data-grid').attr('data-current');
	 				// var result = '';

	 				// // 动态探测结果json数据的返回
	 				// var delay = setInterval(function(){
	 				// 	result = $.parseJSON($(window.frames["targetFrm"].document).find('pre').html());

	 				// 	if( result ){
	 				// 		clearInterval(delay);
		 			// 		if( result.api_code == 1 ){
		 			// 			// 刷新列表
		 			// 			if(curFlag){
		 			// 				MYAPP.console.log($('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit')+'623');
		 			// 				$('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit').click();
		 			// 			}else{
		 			// 				MYAPP.refreshAction({
		 			// 					type: 'asideChild',
		 			// 					eventSrc: $(this)
		 			// 				});
		 			// 			}
		 			// 			$('.cancleBtn:visible').click();	//关闭弹框
		 			// 		}else if( result.api_code == -1 ){
		 			// 			alert('创建失败，原因：'+result.message);
		 			// 		}
		 			// 	}

	 				// }, 100);
	 			}
	 		}
	 	});

		// 探测是否存在iframe，如果有则初始化一下
		// var iframe = $('#newDocColume'+dataTarget+' iframe'),
		// 	iframeName = iframe.attr('name')||"targetFrm";
		// if(iframe.length > 0){
		// 	iframe.remove();
		// 	$('<iframe name="'+iframeName+'" id="'+iframeName+'" style="display:none;" />').appendTo('#newDocColume'+dataTarget+' .conpacityCon');
		// }else{
		// 	$('<iframe name="'+iframeName+'" id="'+iframeName+'" style="display:none;" />').appendTo('#newDocColume'+dataTarget+' .conpacityCon');
		// }

		itemAdition.initValue({
			'channelId': $('#asideBar .current').parents('li').attr('data-channel')
		});

		//创建用户的页面需要实时请求role的类型
		if($('#roles:visible').length>0){
			$.ajax({
		 		type : 'GET',
		        async : false,
		        dataType : "json",
		        url : '/admin/getRole',
		        success : function(data){
		        	if(data.api_code == 1){
		        		var optionHtml = [];
		        		if(data.data){
		        			var objData = data.data;
		        			for(var i in objData){
		        				optionHtml.push('<option value="'+objData[i].roleId+'" title="'+objData[i].roleName+'">'+objData[i].roleName+'</option>');
		        			}
		        			$('#roles').find('option').remove();
		        			$(optionHtml.join('')).appendTo('#roles');
		        		}
		        	}

		        }
		 	});
		}

		// 给图片的实时预览进行初始化
		MYAPP.console.log($('#IMGupload'+dataTarget)+' 681');
		if( $('#IMGupload'+dataTarget).length > 0 ){
			$("#IMGupload"+dataTarget).uploadPreview({
				Img: "ImgPr"+dataTarget,
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					window.itemAdition.fixed(false);
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				},
				Callback: function(obj){
					window.itemAdition.fixed();
				}
			});
			$("#ImgPr"+dataTarget).siblings('.close-btn').unbind('click');
			$("#ImgPr"+dataTarget).siblings('.close-btn').bind('click', function(){
				$("#IMGupload"+dataTarget).val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');
				window.itemAdition.fixed(false);
			});

			$('#upLodifyBTN'+dataTarget).unbind('click');
			$('#upLodifyBTN'+dataTarget).bind('click', function(){
				$(this).siblings('input[type=file]:visible').click();
			});
		}

	 	// 注册validate
	 	$('#newDocColume'+dataTarget+' .inputsection').validate({});
	 },
	 // 创建文章相对应的操作---//创建角色
	 addArtAction: function(options){
	 	$($('#articleSec').html()).appendTo('#contentCtner');
	 	$('input[type=checkbox]').removeAttr('checked');

	 	// 修改标题
	 	// 实时更新title栏的标题
	 	var _tempTitle =$('.titleBar:visible').find('.titleCtner')
 			currentTitle = $('#asideBar .current').html();
 			_tempTitle.html(currentTitle);

 		// ie11再次创建会保留上次的内容，手动清一下内容 bug7416
 		$('#arcContent').html('').val('');

	 	try{
	 		var ueditor = UE.getEditor('arcContent',{
		 		textarea: 'content',
		 		initialFrameWidth: 950,
		 		initialFrameHeight: 500
		 	});

		 	window.ueditor = ueditor;
	 	}catch(e){
	 		MYAPP.console.log('没有可用编辑器！');
	 	}
	 	
	 	var chId = $('#asideBar .current').parents('.navFolder').attr('data-group'),
	 		colId = $('#asideBar .current').parents('li').attr('data-channel');
	 		$('input[name=channelId]').val(chId);
	 		$('input[name=columnId]').val(colId);
	 	
	 		$('#contentCtner .artCancle').bind('click', function(){
	 			try{
	 				UE.getEditor('arcContent').destroy();
	 			}catch(e){
	 				MYAPP.console.log('不存在编辑器！');
	 			}

	 			if($('#contentCtner .floatPageOver').length>0){
	 				$('#contentCtner .floatPageOver').remove();
	 			}else{
	 				$('#contentCtner .floatPage').remove();
	 			}
	 		});

	 		// $('#contentCtner .submit').bind('click', function(){
	 			// $(document).ajaxComplete(function(event, xhr, settings) {
	 			// 	/* executes whenever an AJAX request completes */

	 			// 	var jsonResp = $.parseJSON(xhr.responseText);
	 			// 	if( jsonResp.api_code == 1 ){

	 			// 		// 发布文章成功后，分页跳转到第一页
	 			// 		$('#asideBar .current').parents('li').attr('data-page',1);
	 			// 		// 弹出成功的提示
	 			// 		var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
	 			// 			if(true){
	 			// 				publishMsg.remove();
	 			// 				$('#contentCtner .artCancle').click();
	 			// 				$('#asideBar .current').parent().click();
	 			// 			}
	 			// 		});
	 			// 	}else if(jsonResp.api_code==-1){
	 			// 		if(jsonResp.message=='文章内容不能为空content=[]' || jsonResp.message=='描述不能为空description=[]'){
	 			// 			$('.floatPage .orationArea').parents('.inputframe').addClass('wrong').parent().siblings('.wrongmsg').addClass('error').html('请输入正文');
	 			// 		}
	 			// 	}

	 			// 	$(document).unbind('ajaxComplete');
	 			// });
	 			
	 		// });

	 	if( $('.groupCkeck:visible').length > 0 ){
	 		var limitsGrid = new MYAPP.groupCheck({
	 			'grid': $('.groupCkeck:visible')
	 		});
	 	};


	 	// 发布文章的validate
	 	$('.inputsectionArt').validate({});
	 },
	 //添加产品的相关操作方法
	 addProduct: function(options){
	 	$($('#productSec').html()).appendTo('#contentCtner');

	 	// 实时更新title栏的标题
	 	var _tempTitle =$('.titleBar:visible').find('.titleCtner')
 			currentTitle = $('#asideBar .current').html();
 			_tempTitle.html(currentTitle);

 		// ie11再次创建会保留上次的内容，手动清一下内容 bug7416
 		$('#productContent').html('').val('');
 		
 		try{
	 		var ueditor = UE.getEditor('productContent',{
		 		textarea: 'description',
		 		initialFrameWidth: 950,
		 		initialFrameHeight: 500
		 	});
		 	window.ueditor = ueditor;
	 	}catch(e){
	 		MYAPP.console.log('没有可用编辑器！');
	 	}
	 	


	 	// 给图片的实时预览进行初始化
		if( $('#IMGuploadAdd').length > 0 ){
			$("#IMGuploadAdd").uploadPreview({
				Img: "ImgProAdd",
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				}
			});
			$("#ImgProAdd").siblings('.close-btn').unbind('click');
			$("#ImgProAdd").siblings('.close-btn').bind('click', function(){
				$("#IMGuploadAdd").val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');

			});

			$('#upLodifyBTNPro').unbind('click');
			$('#upLodifyBTNPro').bind('click', function(){
				$(this).siblings('input[type=file]:visible').click();
			});
		}
	 	
	 	var chId = $('#asideBar .current').parents('.navFolder').attr('data-group'),
	 		colId = $('#asideBar .current').parents('li').attr('data-channel');
	 		$('input[name=channelId]').val(chId);
	 		$('input[name=columnId]').val(colId);
	 	
	 		$('#contentCtner .productCancle').bind('click', function(){
	 			UE.getEditor('productContent').destroy();
	 			if($('#contentCtner .floatPageOver').length>0){
	 				$('#contentCtner .floatPageOver').remove();
	 			}else{
	 				$('#contentCtner .floatPage').remove();	
	 			}
	 			
	 		});

	 	// 发布文章的validate
	 	$('.inputsectionPro').validate({});
	 },
	 // grid的item编辑的相关操作
	 editAction: function(options){
	 	MYAPP.console.log(options+' 834');
	 	var obj = options.eventSrc;
	 	var dataTarget = $('#asideBar .current').parents('li').attr('data-target')||'',
	 		curId = options.eventSrc.parents('td').attr('data-item');

	 	window.userDecision = new MYAPP.Alert.AlertBox('edit'+dataTarget, function(flag){
	 			if(flag){
	 				if( obj.attr('data-method') == 'form' ){
		 				// 如果是iframe隐藏域模拟页面无刷新的表单提交，则用这个方法判断
		 				MYAPP.console.log('提交方式是：form 976');
		 				// var curFlag = $('#contentCtner>.wrapper').find('.data-grid').attr('data-current');
		 				// var result = '';

		 				// // 动态探测结果json数据的返回
		 				// var delay = setInterval(function(){

		 				// 	try{
		 				// 		result = $.parseJSON($(window.frames["editifm"].document).find('pre').html());
		 				// 	}catch(e){
		 				// 		MYAPP.console.log('内容不能被格式化');
		 				// 	};

		 				// 	if( result ){
		 				// 		clearInterval(delay);
			 			// 		if( result.api_code == 1 ){
			 			// 			// 刷新列表
			 			// 			if(curFlag){
			 			// 				MYAPP.console.log($('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit')+ ' 856');
			 			// 				$('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit').click();
			 			// 			}else{
			 			// 				alert('请手动刷新列表！');
			 			// 			}
			 			// 			$('.cancleBtn:visible').click();	//关闭弹框
			 			// 		}else if( result.api_code == -1 ){
			 			// 			alert('创建失败，原因：'+result.message);
			 			// 		}
			 			// 	}

		 				// }, 100);
		 			}else if( obj.attr('data-method') === undefined || obj.attr('data-method') == 'ajax' ){

						 ///////////////////////////
		 				// 请求状态判断转到validate参数里面了 //
						 ///////////////////////////
						 
		 				// 编辑操作的数据表格可以提供全部，不需要ajax请求，所以只需要跟踪ajax请求的状态，来把新数据伪动态的添加到表格中
	 					// var newInfo = $('#editDocColume .inputsection').serializeArray();	//数组
		 				// $(document).ajaxComplete(function(event, xhr, settings) {
		 					/* executes whenever an AJAX request completes */
		 					// var jsonResponse = $.parseJSON( xhr.responseText );
		 					// if( jsonResponse.api_code == 1 ){
		 						// var newItem = $('*[data-item='+ newInfo[0].value +']').parent('tr');
		 						// for(var i = 1;i < newInfo.length; i++){
		 						// 	newItem.find("td:nth-child("+ (i+1) +")").html(newInfo[i]['value']);
		 						// }
		 						// 
		 						// 刷新页面就好了
		 						// MYAPP.refreshAction({
		 			// 				type: 'asideChild'
		 			// 			});
		 			// 			window.userDecision.remove();
		 			// 			window.userDecision.Initialization();
		 			// 		}

		 			// 		$(document).unbind('ajaxComplete');
		 			// 	});
		 			}
	 			}else{
	 				window.userDecision.remove();
	 				userDecision.Initialization();
	 			}
	 		});
	 	// 获取编辑的banner的id--编辑图片为空，后台用
	 	$('#editDocColume #bannerId').val(options['id']);

	 	// 每次弹出编辑都添加一下类，不然关闭后再打开不显示图片了
	 	$('.upload-preview:visible').addClass('uploaded');

	 	// 给图片的实时预览进行初始化
		if( $('#IMGuploadEdit'+dataTarget).length > 0 ){
			$("#IMGuploadEdit"+dataTarget).uploadPreview({
				Img: "ImgPrEdit"+dataTarget,
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
					window.userDecision.fixed(false);
				},
				Callback: function(obj){
					window.userDecision.fixed();
				}
			});
			$("#ImgPrEdit"+dataTarget).siblings('.close-btn').unbind('click');
			$("#ImgPrEdit"+dataTarget).siblings('.close-btn').bind('click', function(){
				$("#IMGuploadEdit"+dataTarget).val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');
				window.userDecision.fixed(false);

			});

			$('#upLodifyBTNEdit'+dataTarget).unbind('click');
			$('#upLodifyBTNEdit'+dataTarget).bind('click', function(){
				$(this).siblings('input[type=file]:visible').click();
			});

			// 图片加载完毕，重新定位弹框
			$('#editDocColume'+dataTarget).find('.upload-preview img').bind('load error', function(){
				window.userDecision.fixed();
			});
		}

	 	// 注册validate
	 	$('#editDocColume'+dataTarget+' .inputsection').validate({});
	 	MYAPP.console.log('编辑相应动作的validate验证初始化完成！1298');

		if(options.url){
			$.ajax({
		 		type : 'GET',
		        async : false,
		        dataType : "json",
		        url : options.url,
		        data: 'id='+curId,
		        success : function(data){
		        	if(data.api_code == 1){
		        		data.data.id = curId;
		        		data.data.filePretend = data.data.picUrl;
		        		MYAPP.console.log(data.data +'936');
		        		userDecision.initValue(data.data);
		        	}

		        }
		 	});
		}
	 },
	 // 页面包含grid的item编辑的相关操作
	 editCtnerAction: function(options){
	 	var obj = options.eventSrc,
	 		types = '';
	 		if(options.target){
	 			types = options.target;
	 		}else{
	 			types = editCtnerLeader;
	 		}

	 	window.userDecision = new MYAPP.Alert.AlertBox(types, function(flag){
	 		if(!flag){
	 			window.userDecision.remove();
	 			window.userDecision.Initialization();
	 		}else{
	 			// 关于我们--公司资质的表格编辑
	 			// $(document).ajaxComplete(function(event, xhr, settings) {
 				// 	/* executes whenever an AJAX request completes */
 				// 	var jsonResponse = $.parseJSON( xhr.responseText );

 				// 	if( jsonResponse.api_code == 1 && !jsonResponse.data ){
 				// 		userDecision.remove();
 				// 		userDecision.Initialization();
 				// 		MYAPP.refreshAction({
					// 			type: 'mainCtner',
					// 			eventSrc: $(this)
					// 		});
 				// 	}

 				// 	$(document).unbind('ajaxComplete');
 				// });
	 		}
	 	});
		//把当前编辑对象的id放到表单中
		var curId = options.eventSrc.parents('td').attr('data-item');
		$('input[name="id"]').val(curId);

		// 给图片的实时预览进行初始化
		if( $('#IMGuploadEGedit').length > 0 ){
			$("#IMGuploadEGedit").uploadPreview({
				Img: "ImgPrEGedit",
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					window.userDecision.fixed(false);
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				},
				Callback: function(obj){
					window.userDecision.fixed();
				}
			});
			$("#ImgPrEGedit").siblings('.close-btn').unbind('click');
			$("#ImgPrEGedit").siblings('.close-btn').bind('click', function(){
				$("#IMGuploadEGedit").val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');
				window.userDecision.fixed(false);

			});

			$('#upLodifyBTNEGedit').unbind('click');
			$('#upLodifyBTNEGedit').bind('click', function(){
				$(this).siblings('input[type=file]').click();
			});

			// 编辑的话，会有图片的高度需要计算
			$('.admin-Capacity:visible').find('.upload-preview img').bind('load error', function(){
				window.userDecision.fixed();
			});
		}

		// 领导的创建
		if( $('#IMGuploadEG').length > 0 ){
			$("#IMGuploadEG").uploadPreview({
				Img: "ImgPrEG",
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				},
				Callback: function(obj){
					window.userDecision.fixed();
				}
			});
			$("#ImgPrEG").siblings('.close-btn').unbind('click');
			$("#ImgPrEG").siblings('.close-btn').bind('click', function(){
				$("#IMGuploadEG").val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');
				window.userDecision.fixed(false);

			});

			$('#upLodifyBTNEG').unbind('click');
			$('#upLodifyBTNEG').bind('click', function(){
				$(this).siblings('input[type=file]').click();
			});
		}

		// 领导的编辑
		// if( $('#IMGuploadEGedit').length > 0 ){
		// 	$("#IMGuploadEGedit").uploadPreview({
		// 		Img: "ImgPrEGedit",
		// 		Width: 120, 
		// 		Height: 120
		// 	});
		// 	$("#ImgPrEGedit").siblings('.close-btn').unbind('click');
		// 	$("#ImgPrEGedit").siblings('.close-btn').bind('click', function(){
		// 		$("#IMGuploadEGedit").val('').siblings().val('');
		// 		$(this).parents('.upload-preview').removeClass('uploaded');

		// 	});

		// 	$('#upLodifyBTNEGedit').bind('click');
		// 	$('#upLodifyBTNEGedit').bind('click', function(){
		// 		$(this).siblings('input[type=file]').click();
		// 	});
		// }

	 	// 每次弹出编辑都添加一下类，不然关闭后再打开不显示图片了
	 	$('.upload-preview:visible').addClass('uploaded');

	 	//动态拿取编辑item的数据
	 	$.ajax({
	 		type : 'GET',
	        async : false,
	        dataType : "json",
	        url : options.url,
	        data: 'id='+curId,
	        success : function(data){
	        	if(data.api_code == 1){
	        		data.data.id = curId;
	        		data.data.filePretend = data.data.picUrl;
	        		MYAPP.console.log(data.data +' 1013');
	        		window.userDecision.initValue(data.data);
	        	}

	        }
	 	});

	 	// 注册validate
	 	$('#'+types+' .inputsection').validate({});
	 	MYAPP.console.log('编辑相应动作的validate验证初始化完成！ -1022');
	 },
	 delAction: function(options){	//删除栏目
	 	var obj = options.eventSrc,
	 	  	currentId = obj.parents('td').attr('data-item'),
	 		childTotal = obj.parents('td').attr('data-total');


	 		if(typeof options['id'] == 'object'){
	 			//多选时候id用数组传递过来
	 			var literals = [];
	 			for( var i = 0; i < options['id'].length; i++ ){
	 				literals.push('ids='+options['id'][i]);
	 			}
	 			literals = literals.join('&');

	 		}else{
	 			var literals = '';
	 			literals = 'id='+ options['id'] ;
	 		}

	 	if( childTotal === undefined || childTotal <= 0 ){
	 		window.userDecision = new MYAPP.Alert.AlertBox('delConfirm', function(flag){
	 			MYAPP.console.log(flag+' 1045');
	 			userDecision.remove();
	 			if( flag ){
	 				MYAPP.ajaxHandler.ajaxAction({
				 		"type" : "deleteItem",
				 		"literals" : literals,
				 		"requestMethod" : "GET",
				 		"requestUrl" : options.url,
				 		"requestCallback" : function(data){
				 			if( data.api_code == 1 ){

				 				if( data.cmap ){
				 					MYAPP.refreshAction({
				 						'type': data.cmap.section,
				 						'eventTarget': null
				 					});
				 				}else if(data.data && data.data.section){
				 					MYAPP.refreshAction({
				 						'type': data.data.section,
				 						'eventTarget': null
				 					});
				 				}else{
				 					MYAPP.refreshAction({
				 						'type': 'asideChild',
				 						'eventTarget': null
					 				});
				 				}

				 				
				 			}
				 		}
				 	});
	 			}
	 		});
	 	}else{
	 		window.userDecision= new MYAPP.Alert.AlertBox('delNot', function(flag){
	 			MYAPP.console.log(flag+' 1088');
	 			window.userDecision.remove();
	 		});
	 	}
	 },
	 moveAction: function(options){
	 	var obj = options.eventTarget,
	 		currentTar = obj.parents('tr'),
	 		nextTar = null;
	 	if( obj.attr("data-dir") == "down" ){
	 		nextTar = currentTar.next();
	 	}else if( obj.attr("data-dir") == "up" ){
	 		nextTar = currentTar.prev();
	 	}
	 	trArrays = this.target.find('tbody>tr'),
	 		targetTr = obj.parents('tr');
	 		MYAPP.ajaxHandler.ajaxAction({
		 		"type" : "noEditor",
		 		"literals" : options.literals,
		 		"requestMethod" : options.requestMethod,
		 		"requestUrl" : options.requestUrl,
		 		"requestCallback" : function(data){
		 			data = $.parseJSON(data);
		 			if( data.api_code == 1 ){
		 				MYAPP.console.log('移动操作与后台数据同步成功，正在运行前台操作。。。');
		 				if( typeof obj.attr('data-dir') != 'undefined' && obj.attr('data-dir') == "up" ){
					 		if( targetTr.hasClass('even-child')){
					 			targetTr.removeClass('even-child');
					 			targetTr.prev().addClass('even-child');
					 		}else{
					 			targetTr.addClass('even-child');
					 			targetTr.prev().removeClass('even-child');
					 		}
					 		if( targetTr.hasClass('last') ){
					 			targetTr.removeClass('last');
					 			targetTr.prev().addClass('last');
					 		}
					 		if( targetTr.prev().hasClass('first') ){
					 			targetTr.addClass('first');
					 			targetTr.prev().removeClass('first');
					 		}
					 		var _temp = targetTr.find('td:first').html()
					 		targetTr.find('td:first').html(targetTr.prev().find('td:first').html());
					 		targetTr.prev().find('td:first').html(_temp);

					 		targetTr.insertBefore(targetTr.prev());
					 	}else if( typeof obj.attr('data-dir') != 'undefined' && obj.attr('data-dir') == "down" ){
					 		if( targetTr.hasClass('even-child') ){
					 			targetTr.removeClass('even-child');
					 			targetTr.next().addClass('even-child');
					 		}else{
					 			targetTr.addClass('even-child');
					 			targetTr.next().removeClass('even-child');
					 		}
					 		if( targetTr.hasClass('first') ){
					 			targetTr.removeClass('first');
					 			targetTr.next().addClass('first');
					 		}
					 		if( targetTr.next().hasClass('last') ){
					 			targetTr.next().removeClass('last');
					 			targetTr.addClass('last');
					 		}
					 		var _temp = targetTr.find('td:first').html()
					 		targetTr.find('td:first').html(targetTr.next().find('td:first').html());
					 		targetTr.next().find('td:first').html(_temp);

					 		targetTr.insertAfter(targetTr.next());
					 	}
					 	MYAPP.console.log('移动操作前台操作完成，移动成功！');
		 			}
		 		}
		 	});

	 	return false;
	},
	moveMultiAction: function(options){
		MYAPP.console.log(options+' 1163');
		var obj = options.eventSrc;

 		if(typeof options['id'] == 'object'){
 			//多选时候id用数组传递过来
 			var literals = [];
 			for( var i = 0; i < options['id'].length; i++ ){
 				literals.push('ids='+options['id'][i]);
 			}
 			literals = literals.join('&');

 		}else{
 			var literals = '';
 			literals = 'id='+ options['id'] ;
 		}

		var currentCols = $('#asideBar .current').parents('li').attr('data-channel');
		
		$('#moveMulti input[name=columnId]').val(currentCols);	

 		// 动态的去请求当前分类子分类的数据
 		$.ajax({
			type : 'GET',
	        async : false,
	        dataType : "json",
	        url : '/admin/getColumnItem',
	        data: 'channelId='+$('#asideBar .current').parents('li.navFolder').attr('data-group'),
	        success : function(data){
	        	if(data.api_code == 1){
	        		var options = [],
	        			_temp = '',
	        			cur = $('#asideBar .current').parents('li').attr('data-channel');
	        			MYAPP.console.log('当前的分类是：'+ cur+' 1195');
	        		for( var i in data.data ){
	        			if(cur == data.data[i]['id']){
	        				options.push('<option value="'+data.data[i]['id']+'" selected="selected">'+data.data[i]['name']+'</option>');
	        			}else{
	        				options.push('<option value="'+data.data[i]['id']+'">'+data.data[i]['name']+'</option>');
	        			}
	        		}
	        		_temp = options.join('');
	        		$('#moveMulti select').html('');
	        		$(_temp).appendTo('#moveMulti select');

	        		literalsPost = literals + '&'+$('#moveMulti form').serialize();
	        		$('#moveMulti select').bind('change', function(){
	        			// 由事件触发的异步数据改变
	        			literalsPost = '';
	        			literalsPost = literals + '&'+$('#moveMulti form').serialize();
	        		});
	        	}

	        }
		});



 		window.userDecision = new MYAPP.Alert.AlertBox('moveMulti', function(flag){
 			MYAPP.console.log(flag+' 1221');
 			if( flag ){
 				var reqUrl = MYAPP.urlMap.getUrl({
 					type: 'move',
 					eventSrc: $(this)
 				});
 				MYAPP.ajaxHandler.ajaxAction({
			 		"literals" : literalsPost,
			 		"requestMethod" : "GET",
			 		"requestUrl" : reqUrl,
			 		"requestCallback" : function(data){
			 			data = $.parseJSON(data);
			 			// console.log(data);
			 			if( data.api_code == 1 ){

			 				if( data.cmap ){
			 					MYAPP.refreshAction({
			 						'type': data.cmap.section,
			 						'eventTarget': null
			 					});
			 				}
			 				
			 			}

			 			MYAPP.refreshAction({
			 				type: 'asideChild',
			 				eventSrc: $(this)
			 			});
			 		}
			 	});
 			}
 			window.userDecision.remove();
 		});
	},
	delMultiAction: function(options){
		MYAPP.console.log(options+' 1256');
		var obj = options.eventSrc;

 		if(typeof options['id'] == 'object'){
 			//多选时候id用数组传递过来
 			var literals = [];
 			for( var i = 0; i < options['id'].length; i++ ){
 				literals.push('ids='+options['id'][i]);
 			}
 			literals = literals.join('&');

 		}else{
 			var literals = '';
 			literals = 'id='+ options['id'] ;
 		}

 		window.userDecision = new MYAPP.Alert.AlertBox('delConfirm', function(flag){
 			MYAPP.console.log(flag+' 1273');
 			if( flag ){
 				MYAPP.ajaxHandler.ajaxAction({
			 		"literals" : literals,
			 		"requestMethod" : options.requestMethod,
			 		"requestUrl" : options.requestUrl,
			 		"requestCallback" : function(data){
			 			data = $.parseJSON(data);
			 			// console.log(data);
			 			if( data.api_code == 1 ){
			 				window.userDecision.remove();
			 				MYAPP.refreshAction({
			 					type: 'asideChild'
			 				});			 				
			 			}
			 		}
			 	});

			 	return false;
 			}
 			window.userDecision.remove();
 		});
	},
	//编辑页的表格的添加条目
	addEGridItemAction: function(options){
		var obj = options.eventSrc;
		if(options.frameType){
			types = options.frameType;
		}else{
			types = 'addEGridItem';
		}
	 	var itemAdition = new MYAPP.Alert.AlertBox(types, function(flag){

	 		if( !flag ){

	 			// 点击取消按钮，直接隐藏弹窗，并且清空输入框的数据
	 			itemAdition.remove();
	 			itemAdition.Initialization();
	 		}else{

	 			// 点击确定按钮，发起提交的请求，根据返回状态执行不同的操作
	 			
	 			if( obj.attr('data-method') === undefined || obj.attr('data-method') == 'ajax'  ){
	 				// ajax提交的数据，则用这个方式进行提交状态的判断
	 				MYAPP.console.log('提交方式是：ajax');
	 				// $(document).ajaxComplete(function(event, xhr, settings) {
	 					/* executes whenever an AJAX request completes */
	 					// var jsonResponse = $.parseJSON( xhr.responseText );
	 					// if( jsonResponse.api_code == 1 ){
	 						// itemAdition.remove();
	 						// alert();
	 						// itemAdition.Initialization();
	 						// var id = $('.asidebar .current').parents('.btn').attr('data-channel');
	 						// 刷新列表
	 						// $('.asidebar .btn[data-channel='+id+']').click();
	 						// MYAPP.refreshAction({
 							// 	type: 'mainCtner',
 							// 	eventSrc: $(this)
 							// });
	 					// }

	 					// $(document).unbind('ajaxComplete');
	 				// });
	 			}else if( obj.attr('data-method') == 'form' ){
	 				// 如果是iframe隐藏域模拟页面无刷新的表单提交，则用这个方法判断
	 				// MYAPP.console.log('提交方式是：form');
	 				// var curFlag = $('#contentCtner>.wrapper').find('.data-grid').attr('data-current');
	 				// var result = '';

	 				// // 动态探测结果json数据的返回
	 				// var delay = setInterval(function(){
	 				// 	result = $.parseJSON($(window.frames["targetFrm"].document).find('pre').html());

	 				// 	if( result ){
	 				// 		clearInterval(delay);
		 			// 		if( result.api_code == 1 ){
		 			// 			// 刷新列表
		 			// 			if(curFlag){
		 			// 				MYAPP.console.log($('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit')+' 1350');
		 			// 				$('#contentCtner>.wrapper').find('td[data-item='+curFlag+']').find('.edit').click();
		 			// 			}else{
		 			// 				MYAPP.refreshAction({
		 			// 					type: 'asideChild',
		 			// 					eventSrc: $(this)
		 			// 				});
		 			// 			}
		 			// 			$('.cancleBtn:visible').click();	//关闭弹框
		 			// 		}else if( result.api_code == -1 ){
		 			// 			alert('创建失败，原因：'+result.message);
		 			// 		}
		 			// 	}

	 				// }, 100);
	 			}
	 		}
	 	});
		itemAdition.Initialization();

		// 探测是否存在iframe，如果有则初始化一下
		var iframe = $('#newDocColume iframe'),
			iframeName = iframe.attr('name');
		if(iframe.length > 0){
			iframe.remove();
			$('<iframe name="'+iframeName+'" id="'+iframeName+'" style="display:none;" />').appendTo('#newDocColume .conpacityCon');
		}

		// 给图片的实时预览进行初始化
		if( $('#IMGuploadEG').length > 0 ){
			$("#IMGuploadEG").uploadPreview({
				Img: "ImgPrEG",
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				}
			});
			$("#ImgPrEG").siblings('.close-btn').unbind('click');
			$("#ImgPrEG").siblings('.close-btn').bind('click', function(){
				$("#IMGuploadEG").val('').siblings().val('');
				$(this).parents('.upload-preview').removeClass('uploaded');

			});

			$('#upLodifyBTNEG').unbind('click');
			$('#upLodifyBTNEG').bind('click', function(){
				$(this).siblings('input[type=file]').click();
			});
		}
	 	// 注册validate
	 	$('#newEGridItem .inputsection,#newZizhi .inputsection').validate({});
	},
	//修改密码
	changePwd : function(options){
	 	window.userDecision = new MYAPP.Alert.AlertBox('changePwd', function(flag){
	 		if(!flag){
	 			window.userDecision.remove();
	 		}
	 	});
		//把当前编辑对象的id放到表单中
		var curId = options.eventSrc.parents('td').attr('data-item');
		$('input[name="id"]').val(curId);
		//添加验证
		$('#newPWD .inputsection').validate({});
	},
	requestPage: function(){
	 	alert('from edit -- requestPage');
	}
	 
};

//模拟刷新列表的动作集合
MYAPP.refreshAction = function(options){
	MYAPP.console.log(options+' 1406');
	
	switch (options.type){
		case 'mainCtner':
			MYAPP.console.log('点击页面点击按钮来源实现刷新--mainCtner'+' 1409');
			var current = $('.wrapper .data-grid').attr('data-current'),
				refreshTar = $('.wrapper .data-grid tbody td[data-item='+current+']').find('.editPage');
				if(refreshTar.length == 0){
					refreshTar = $('.wrapper .data-grid tbody td[data-item='+current+']').find('.edit');
				}
				// refreshTar.css({
				// 	'color': '#f00',
				// 	'background': '#f0f'
				// });
			refreshTar.click();
			break;
		case 'asideChild':
			// 这两个是一起的
		default:		
			MYAPP.console.log('点击左侧导航实现刷新--asideChild'+' 1420');
			$('#asideBar .current').parents('.btn').click();
			break;
	}
}

// alert弹框封装
MYAPP.namespace('Alert');
	// newEGridItem

	// addEGridItem
MYAPP.Alert.AlertBox = function(whitch, callback){
	
	this.alertGroup = {
		"add" : "#newDocColume",	//新建grid的item的弹框
		"add1" : "#newDocColume1",	//新建grid的item的弹框
		"add2" : "#newDocColume2",	//新建grid的item的弹框
		"add3" : "#newDocColume3",	//新建grid的item的弹框
		"delNot" : "#delDocColumeNot",	//不可以删除的提醒
		"delConfirm" : "#delDocColumeConfirm",	//删除确认弹框
		"edit" : "#editDocColume",	//编辑弹框
		"edit1" : "#editDocColume1",	//编辑弹框
		"edit2" : "#editDocColume2",	//编辑弹框
		"edit3" : "#editDocColume3",	//编辑弹框
		"moveMulti" : '#moveMulti',	//多选移动
		"moveEmpty": "#moveEmpty",	//多选为空提示弹框
		"delMultiEmty": "#delMultiEmty",//多选删除为空提示
		"addEGridItem": "#newEGridItem",//内容里有包含表格的添加grid条目
		"editCtnerLeader": "#editCtnerLeader",	//内容里有包含表格的添加grid条目--领导
		"newZizhi": "#newZizhi",	//内容里有包含表格的添加grid条目--资质
		"editZizhi": "#editZizhi",	//编辑资质
		"successAlert": "#successAlert",  //提交成功提示
		"changePwd": '#newPWD'
	};
	if( typeof this.alertGroup[whitch] != 'undefined' ){
		this.userBtn = {
			"close" : $(this.alertGroup[whitch]).find('.closeBtn'),
			"yes" : $(this.alertGroup[whitch]).find('.yesBtn'),
			"cancle": $(this.alertGroup[whitch]).find('.cancleBtn')
		}

		$(this.alertGroup[whitch]).show();
		this.bindEvent();
		this.whitch = this.alertGroup[whitch];
		this.cover();
	}
	this.callback = callback;
}
MYAPP.Alert.AlertBox.prototype = {
	bindEvent : function(){
		var _that = this;
		this.fixed();
		if( this.userBtn.close.length > 0 ){
			this.userBtn.close.unbind('click');
			this.userBtn.close.bind('click', function(){
				// alert('close');
				_that.Initialization();
				MYAPP.Alert.remove(_that.alertGroup);
				if( typeof _that.callback == "function"  ){
					_that.callback(false);
				}
			});
		}
		if( this.userBtn.yes.length > 0 && this.userBtn.cancle.length > 0 ){
			this.userBtn.yes.unbind('click');
			this.userBtn.yes.bind('click', function(event) {
				// alert('yes');
				if( typeof _that.callback == "function"  ){
					_that.callback(true);
				}
			});
			this.userBtn.cancle.unbind('click');
			this.userBtn.cancle.bind('click', function(event) {
				// alert('cancle');
				_that.Initialization();
				if( typeof _that.callback == "function"  ){
					_that.callback(false);
				}
			});
		}else if( this.userBtn.yes.length > 0 ){
			this.userBtn.yes.unbind('click');
			this.userBtn.yes.bind('click', function(event) {
				// alert('yes');
				if( typeof _that.callback == "function"  ){
					_that.callback(false);
				}
			});
		}else if( this.userBtn.cancle.length > 0 ){
			this.userBtn.cancle.unbind('click');
			this.userBtn.cancle.bind('click', function(event) {
				_that.Initialization();
				MYAPP.Alert.remove(_that.alertGroup);
				// alert('cancle');
			});
		}
	},
	remove : function(){
		for(var i in this.alertGroup){
			if( this.alertGroup[i].length > 0 ){
				$(this.alertGroup[i]).hide();
			}
			// console.log(this.alertGroup[i]);
		}
		$('.mask').hide();
	},
	initValue :  function(args){
		MYAPP.console.log(args+' 1525');
		for( var i in args ){
			if( i.toLowerCase() == 'picurl' ){
				$(this.whitch).find('*[name='+ i +']').attr('src',args[i]);
				$(this.whitch).find('.upload-preview img:last').attr('src',args[i]);
				
				// 判断是否有路径值，如果没有需要把图片容器的uploaded类去掉
				if( args[i] === null||args[i].length <= 0 ){
					$(this.whitch).find('.upload-preview:visible').removeClass('uploaded');
				}
			}else if( i == 'file' ){

			}else if( i == 'filePretend'){
				if(args[i]){
					var arrayUrl = args[i].split('/');
					$(this.whitch).find('*[name='+ i +']').val(arrayUrl[arrayUrl.length-1]);
				}
			}else if( i == 'list' ){
				try{
				var optionsHtml = [];
					for(var i in args.list){
						if(args.list[i].equal){
							optionsHtml.push('<option selected="selected" value="'+args.list[i].roleId+'">'+args.list[i].roleName+'</option>');
						}else{
							optionsHtml.push('<option value="'+args.list[i].roleId+'">'+args.list[i].roleName+'</option>');
						}
					}
					$('#rolesEdit:visible').find('option').remove();
					$(optionsHtml.join(' ')).appendTo('#rolesEdit:visible');
				}catch(e){
					MYAPP.console.log('不需要拼select的options');
				}
			}else{
				$(this.whitch).find('*[name='+ i +']').val(args[i]);
			}
		}

		// if(args.list){
			
		// }
	},
	cover: function(){
		MYAPP.console.log($('.mask').length+' 1554');
		if( $('.mask').length <= 0 ){
     		$('body').append("<div class='mask' style='opacity:0.5'></div>").show();
		}else{
			$('.mask').show();
		}
	},
	Initialization: function(){
		// 清空输入框的值
		$(this.whitch).find('input,textarea').each(function(){
			if($(this).attr('name') !== "cmap['section']"){
				$(this).val('');
			}
			$(this).parents('.inputframe').removeClass('wrong');
		});
		// 清除输入框的错误提示
		$(this.whitch).find('.wrongmsg').each(function(){
			var defaultMsg = $(this).attr('data-default');
			$(this).removeClass('error');
			if( defaultMsg && defaultMsg.length > 0 ){
				$(this).html(defaultMsg);
			}else{
				$(this).html('');
			}
		});

		// 清除防止重复提交的标志
		$('.submit').removeClass('posting');
		$('#upLodifyBTN').unbind('click');
		$('#ImgPr').removeAttr('src');
		$(this.whitch).find('.conpacityCon img').removeAttr('src');
		$('.upload-preview').removeClass('uploaded');

	},
	fixed: function(flag){
		var curWin = $('.admin-Capacity:visible'),
			curWinH = curWin.height();

			curWin.css({'height':'auto','min-height':'auto'});
			curWin.find('.conpacityCon').removeAttr('style');
			if(flag===false){
				curWinH = curWinH - 100;
			}
			if(curWinH>=520){
				curWin.css({"margin-top": -520/2+'px',"height": '520px', "min-height": '520px'});
				curWin.find('.conpacityCon').css({"height": '440px', "overflow-y": 'auto'});
			}else{
				curWin.css({"margin-top": -curWinH/2+'px',"min-height": curWinH});
				curWin.find('.conpacityCon').removeAttr('style');
			}
			MYAPP.console.log(curWinH+'  ---2059');
	}
}


MYAPP.Alert.remove = function(args){
	for( var i in args ){
		if( args[i].length > 0 ){
			$(args[i]).hide();
		}
	}
	$('.mask').hide();
}

MYAPP.namespace("Form.message");
// 弹框ajax提交，提交结果响应事件
MYAPP.Form.message.response = function( data ){
	MYAPP.console.log(data+' 1601');
	if( data.api_code == 1 ){

		if($('.conpacityCon:visible').length<=0){

			// 如果是页面的提交，要有成功的提示--根据可见弹框的个数判断
			// 粗现成功提示弹框
			// 
			var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
				if(true){
					publishMsg.remove();
					
					if($('.floatPageOver').length>0){
						$('.floatPageOver .cancleBtn:visible,.floatPageOver .editCancle:visible').click();	
					}else{
						$('.floatPage .cancleBtn:visible,.floatPage .editCancle:visible').click();	
					}

					MYAPP.console.log(data.cmap+' 1674');
					// 根据返回的section的值，去判断如何刷新列表
					if( data.cmap ){
						MYAPP.refreshAction({
							'type': result.cmap.section,
							'eventSrc': null
						});
					}else{
						MYAPP.refreshAction({
	 						'type': 'asideChild',
	 						'eventTarget': null
	 					});
					}
				}
			});						
		}else{
			// 创建用户弹框
			if(typeof window.itemAdition !== 'undefined'){
				window.itemAdition.remove();
				window.itemAdition.Initialization();
				return;
			}
			if(typeof window.userDecision !== 'undefined'){
				window.userDecision.remove();
				window.userDecision.Initialization();
				return;
			}

			MYAPP.Alert.remove({
				"frame" : $('#editDocColume'),
				"addFrame" : $('#newDocColume')
			});
			
			// 11/30 解决7029
			$('#asideBar .current').parents('li.btn').click();
		}
		
	}else if( data.api_code == -1 ){
		// 创建用户弹框
		if(typeof window.itemAdition !== 'undefined'){
			window.itemAdition.remove();
			window.itemAdition.Initialization();
		}

	}
};

//用户部分的返回结果判断--标准
MYAPP.Form.message.Useresponse = function(data){
	if(data.api_code==1){
		// 发布文章成功后，分页跳转到第一页
		$('#asideBar .current').parents('li').attr('data-page',1);

		if(typeof window.userDecision !== 'undefined'){
			window.userDecision.remove();
			window.userDecision.Initialization();
		}
		if(typeof window.itemAdition !== 'undefined'){
			window.itemAdition.remove();
			window.itemAdition.Initialization();
		}

		// 刷新列表
		MYAPP.refreshAction({
			'type': 'asideChild',
			'eventSrc': null
		});

	}else if(data.api_code==-3){
		if(data.data && data.data.type){
			// 判断是不是floatpage中的编辑部分
			if($('#contentCtner .floatPage:visible').length>0){
				$('#contentCtner .floatPage:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				return;
			}
			$('.admin-Capacity:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
		}
	}
};

MYAPP.Form.message.UseresponseEdit = function(data){
	if(data.api_code==1){

		if(typeof window.userDecision !== 'undefined'){
			window.userDecision.remove();
			window.userDecision.Initialization();
		}
		if(typeof window.itemAdition !== 'undefined'){
			window.itemAdition.remove();
			window.itemAdition.Initialization();
		}

		// 刷新列表
		MYAPP.refreshAction({
			'type': 'asideChild',
			'eventSrc': null
		});

	}else if(data.api_code==-3){
		if(data.data && data.data.type){
			// 判断是不是floatpage中的编辑部分
			if($('#contentCtner .floatPage:visible').length>0){
				$('#contentCtner .floatPage:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				return;
			}
			$('.admin-Capacity:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
		}
	}
};

//跳转页面的操作都需要弹框
MYAPP.Form.message.UseresponsePage = function(data){
	if(data.api_code==1){
		// 发布文章成功后，分页跳转到第一页
		$('#asideBar .current').parents('li').attr('data-page',1);

		var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
			if(true){
				publishMsg.remove();
				$('#contentCtner .artCancle').click();

				// 刷新列表
				MYAPP.refreshAction({
					'type': 'asideChild',
					'eventSrc': null
				});
			}
		});

	}else if(data.api_code==-3){
		if(data.data && data.data.type){
			// 判断是不是floatpage中的编辑部分
			if($('#contentCtner .floatPage:visible').length>0){
				$('#contentCtner .floatPage:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				if(data.data.type == 'permission'){
					$('#contentCtner .floatPage:visible').find('.data-grid-limits').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				}
				return;
			}
			$('.admin-Capacity:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
			if(data.data.type == 'permission'){
				$('.admin-Capacity:visible').find('.data-grid-limits').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);;
			}
		}
	}
};

//跳转页面的操作都需要弹框
MYAPP.Form.message.UseresponsePageEdit = function(data){
	if(data.api_code==1){
		var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
			if(true){
				publishMsg.remove();
				$('#contentCtner .artCancle').click();

				// 刷新列表
				MYAPP.refreshAction({
					'type': 'asideChild',
					'eventSrc': null
				});
			}
		});

	}else if(data.api_code==-3){
		if(data.data && data.data.type){
			// 判断是不是floatpage中的编辑部分
			if($('#contentCtner .floatPage:visible').length>0){
				$('#contentCtner .floatPage:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				if(data.data.type == 'permission'){
					$('#contentCtner .floatPage:visible').find('.data-grid-limits').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
				}
				return;
			}
			$('.admin-Capacity:visible').find('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
			if(data.data.type == 'permission'){
				$('.admin-Capacity:visible').find('.data-grid-limits').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);;
			}
		}
	}
};

// 页面编辑ajax提交，提交结果响应事件
MYAPP.Form.message.pageResponse = function(data){
	
};

// 页面编辑ajax提交含有ueditor编辑器，提交结果响应事件
MYAPP.Form.message.pageEditorResponseAdd = function(data){
	if(data.api_code == 1){
		// 发布文章成功后，分页跳转到第一页
		$('#asideBar .current').parents('li').attr('data-page',1);
		// 弹出成功的提示
		var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
			if(true){
				publishMsg.remove();
				$('#contentCtner .artCancle').click();
				$('#asideBar .current').parent().click();
			}
		});
	}else if(data.api_code==-1){
		if(message=='文章内容不能为空content=[]' || message=='描述不能为空description=[]'){
			$('.floatPage .orationArea').parents('.inputframe').addClass('wrong').parent().siblings('.wrongmsg').addClass('error').html('请输入正文');
		}
	}
	// console.log(data);
};

// 页面编辑ajax提交含有ueditor编辑器，提交结果响应事件
MYAPP.Form.message.pageEditorResponse = function(data){
	if(data.api_code == 1){
		// 发布文章成功后，分页跳转到第一页
		// $('#asideBar .current').parents('li').attr('data-page',1);
		// 弹出成功的提示
		var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
			if(true){
				publishMsg.remove();
				$('#contentCtner .artCancle').click();
				$('#asideBar .current').parent().click();
			}
		});
	}else if(data.api_code==-1){
		if(message=='文章内容不能为空content=[]' || message=='描述不能为空description=[]'){
			$('.floatPage .orationArea').parents('.inputframe').addClass('wrong').parent().siblings('.wrongmsg').addClass('error').html('请输入正文');
		}
	}
	// console.log(data);
};

// 公司资质ajax提交，提交结果响应事件
MYAPP.Form.message.GSZZresponse = function(data){
	if(data.api_code == 1){
		MYAPP.Alert.remove({
			"frame" : $('#editZizhi'),
			"addFrame" : $('#newZizhi')
		});
		MYAPP.refreshAction({
			'type': data.cmap.section,
			'eventSrc': null
		});
	}
}
MYAPP.Form.watchIframeState = function(){
	MYAPP.console.log('form成功提交，开启iframe内容动态检测。');
	// 尝试初始化iframe的内容初始化--如果上次验证留下json串会影响检验结果
	// 
	
	var iframeCtner = $('.conpacityCon:visible'),
		iframe = null,
		iframeName = '';
		if(iframeCtner.length>0){
			iframeCtner = $('.conpacityCon:visible');
			iframe = $('.conpacityCon:visible iframe');
			iframeName = iframe.attr('name');
			iframe[0].contentWindow.document.body.innerHTML = '';
			MYAPP.console.log('iframe文本被清空！'+' 1626');
		}else if($('.floatPage:visible').length>0){

			if($('.floatPageOver:visible').length > 0){
				var iframeCtner = $('.floatPageOver:visible'),
				iframe = iframeCtner.find('iframe:first'),
				iframeName = iframe.attr('name');
				// iframe.css({
				// 	'display': 'block',
				// 	'background': '#f00'
				// });
			}else{
				// 都是同名的iframe惹的祸
				if(document.documentMode||(navigator.userAgent.indexOf('MSIE') >= 0)&&(navigator.userAgent.indexOf('Opera') < 0)){	//ie会把返回内容放到同名iframe组中的第一个，但用js去取会获得第一个
					var iframeCtner = $('.floatPage:visible'),
					iframe = iframeCtner.find('iframe:first'),
					iframeName = iframe.attr('name');
					// iframe.css({
					// 	'display': 'block',
					// 	'background': '#f00'
					// });
				}else{	//非ie会把返回内容放到同名iframe组中的第一个，用js去取也会获得最后一个
					var _iframeCtner = $('#contentCtner .floatPage:visible'),
					_iframe = _iframeCtner.find('iframe:first'),
					_iframeName = _iframe.attr('name');
					// _iframeCtner.css({'background':'#eee'});
					// _iframe.css({'display':'block','background':'#dcdcdc'});
					iframeCtner = $('#productSec .floatPage');
					iframe = _iframe.length>0?_iframe:iframeCtner.find('iframe:first');
					iframeName = iframe.attr('name');
					iframe = iframeName=='targetFrm11'?iframeCtner.find('iframe:first'):iframe;
					// alert(iframeName);
					// iframe.css({
					// 	'display': 'block',
					// 	'background': '#f0f'
					// });
				}
			}
		}
	iframe.bind('load', function(){
		// alert('loaded');
		try{
			var pre = iframe[0].contentWindow.document.body.getElementsByTagName('pre'),
				len = pre.length;
			result = $.parseJSON(pre[len-1].innerHTML);
			// alert(result);

			if( result ){
				if( result.api_code == 1 ){	
					MYAPP.console.log('iframe返回状态--提交成功。');


					if($('.conpacityCon:visible').length<=0){

						// 如果是页面的提交，要有成功的提示--根据可见弹框的个数判断
						// 粗现成功提示弹框
						// 
						var publishMsg = new MYAPP.Alert.AlertBox('successAlert', function(flag){
							if(true){
								publishMsg.remove();
								
								if($('.floatPageOver').length>0){
									$('.floatPageOver .cancleBtn:visible,.floatPageOver .editCancle:visible').click();	
								}else{
									$('.floatPage .cancleBtn:visible,.floatPage .editCancle:visible').click();	
								}

								MYAPP.console.log(result.cmap+' 1674');

								// 根据返回的section的值，去判断如何刷新列表
								if( result.cmap ){
									// 编辑页会返回cmap['page']，此时不需要跳转到第一页
									if(!result.cmap.page){
										// // 发布文章成功后，分页跳转到第一页
										$('#asideBar .current').parents('li').attr('data-page',1);
									}
									
									MYAPP.refreshAction({
										'type': result.cmap.section,
										'eventSrc': null
									});
								}else{
									MYAPP.refreshAction({
				 						'type': 'asideChild',
				 						'eventTarget': null
				 					});
								}
							}
						});						
					}else{
						// 关闭弹框或者飘层
						$('.cancleBtn:visible,.editCancle:visible').click();

						MYAPP.console.log(result.cmap+' 1674');
						// 根据返回的section的值，去判断如何刷新列表
						if( result.cmap ){
							MYAPP.refreshAction({
								'type': result.cmap.section,
								'eventSrc': null
							});
						}else{
							MYAPP.refreshAction({
		 						'type': 'asideChild',
		 						'eventTarget': null
		 					});
						}
					}
				}else if( result.api_code == -1 ){
					$('.submit').removeClass('posting');
					alert('创建失败，原因：'+result.message);
				}else if( result.api_code == -4 ){
					if(typeof result.data.index !== 'undefined'){
						$('input[type=file]:visible:eq('+result.data.index+')').focus().closest('dd').find('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(result.data.message);
					}else{
						$('input[type=file]:visible').focus().closest('dd').find('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(result.data.message);
					}
					$('.submit').removeClass('posting');
				}
			}
		}catch(error){
			MYAPP.console.log('返回结果，格式化失败！');
		};

		iframe.unbind('load');
	});
		
	// 动态探测结果json数据的返回
	// var times = 0;
	// var delay = setInterval(function(){
	// 	times++;
	// 	try{
	// 		result = $.parseJSON($(window.frames[iframeName].document).find('pre').html());
	// 		MYAPP.console.log(result);
	// 		if( result ){
	// 			MYAPP.console.log('iframe内容动态检测成功。');
	// 			clearInterval(delay);
	// 			if( result.api_code == 1 ){	
	// 				MYAPP.console.log('iframe返回状态--提交成功。');

	// 				// 关闭弹框或者飘层-无需刷新显示列表
	// 				$('.cancleBtn:visible,.editCancle:visible').click();	

	// 				MYAPP.console.log(result.cmap+' 1674');
	// 				// 根据返回的section的值，去判断如何刷新列表
	// 				if( result.cmap ){
	// 					MYAPP.refreshAction({
	// 						'type': result.cmap.section,
	// 						'eventSrc': null
	// 					});
	// 				}else{
	// 					MYAPP.refreshAction({
	//  						'type': 'asideChild',
	//  						'eventTarget': null
	//  					});
	// 				}
	// 			}else if( result.api_code == -1 ){
	// 				$('.submit').removeClass('posting');
	// 				alert('创建失败，原因：'+result.message);
	// 			}else if( result.api_code == -4 ){
	// 				$('input[type=file]:visible').parents('.inputframe').siblings('.wrongmsg').addClass('error').html(result.data.message);
	// 			}
	// 		}
	// 	}catch(error){
	// 		MYAPP.console.log('返回结果，格式化失败！');
	// 	}
	// 	if(times>=50){
	// 		clearInterval(delay);
	// 	}
	// }, 150);
}

// formEdit{
// 	// 销毁编辑器不然不能再次初始化
// 					try{
// 						if($('#contentCtner .floatPage:visible #editEditor').length > 0){
// 							UE.getEditor('editEditor').destroy();	
// 							console.log(UE.getEditor('editEditor'));
// 							console.log(307);
// 						}
// 					}catch(e){
// 						MYAPP.console.log('没找到editEditor编辑器 --1737！');
// 					}

// 					// 文章内容的编辑器
// 					try{
// 						if($('#contentCtner .floatPage:visible #arcContent').length > 0){	
// 							UE.getEditor('arcContent').destroy();
// 							console.log(UE.getEditor('arcContent'));
// 							console.log(317);
// 						}
// 					}catch(e){
// 						MYAPP.console.log('没找到editEditor编辑器 --1748！');
// 					}

// 					// 产品描述的编辑器
// 					try{
// 						if($('#contentCtner .floatPage:visible #productContent').length > 0){
// 							UE.getEditor('productContent').destroy();
// 							console.log(UE.getEditor('productContent'));
// 							console.log(327);
// 						}
// 					}catch(e){
// 						MYAPP.console.log('没找到editEditor编辑器 --1759！');
// 					}
// }
// 登录成功跳转
MYAPP.Form.loginState = function(data){
	if(data.api_code == 1){
		window.location.href = data.data.to_url;
	}else{
		if(data.data.message && data.data.type){
			$('input[name='+data.data.type+']').focus().siblings('.wrongmsg').addClass('error').html(data.data.message);
		}
	}
}
// 修改密码的
MYAPP.Form.modifypwd = function(data){
	if(data.api_code == 1){
		var success = new MYAPP.Alert.AlertBox('successAlert', function(flag){
			if(!flag){
				$('a[data-part=exit]').click();
			}
		});
	}else{
		if(data.data){
			$('input[name='+data.data.type+']').focus().parents('.inputframe').addClass('wrong').siblings('.wrongmsg').addClass('error').html(data.data.message);
		}
	}
}

MYAPP.namespace('urlMap');
MYAPP.urlMap.requestUrl = {
	'delete' : {
		// 栏目管理
		'column': {
			// 业务动态
			'1': {
				'single': '/admin/deleteColumn',
				'Multi': ''
			},
			'2': {
				'single': '/admin/deleteColumn',
				'Multi': ''
			},
			'3': {
				'single': '/admin/deleteColumn',
				'Multi': ''
			},
			'7': {
				'single': '/admin/deleteColumn',
				'Multi': ''
			}

		},
		// 内容管理
		'content': {
			//业务动态-子频道文章删除
			'1':{
				'single': '/admin/delArticle',
				'Multi': '/admin/delSelArticle'
			},
			'7':{
				'single': '/admin/delArticle',
				'Multi': '/admin/delSelArticle'
			},
			//产品与系统
			'2':{
				'single': '/admin/delProduct',
				'Multi': '/admin/delSelProduct'
			},
			'3':{
				'single': '/admin/delProduct',
				'Multi': '/admin/delSelProduct'
			},
			// 网站首页
			'4': {
				'banner': {
					'single': '/admin/delBannerItem',
					'Multi': ''
				}
			}
		},
		// 用户管理
		'user': {
			'1': {
				'single': '/admin/deleteUser',
				'Multi': '/admin/deleteSelUser'
			},
			'2': {
				'single': '/admin/deleteRole',
				'Multi': '/admin/deleteSelRole'
			}
		}
	},
	'setOrder' : {
		// 栏目的移动
		'column': {
			// 业务动态
			'1': '/admin/setOrder',
			// 产品与系统
			'2': '/admin/setOrder',
			'3': '/admin/setOrder',
			'7': '/admin/setOrder'

		},
		// 内容管理
		'content': {
			// 网站首页
			'4': {
				'banner': '/admin/setBannerOrder'
			},
			//关于我们
			'5':'/admin/setAboutUsOrder'
		}
	},
	'add': {
		// 内容管理
		'content': {

		}
	},
	'edit':{
		//栏目的编辑
		'column': {

		},
		// 内容管理
		'content':{
			//业务动态文章编辑
			'1': '/admin/editorArticle',
			// 网站首页
			'4': {
				'banner': '/admin/editBannerItem'
			}
		},
		'user':  {
			'1': '/admin/editUser'
		}
	},
	'move': {
		// 栏目管理
		'column': {
			// 业务动态
			'1': {
				'single': '/admin/deleteColumn',
				'Multi': ''
			}
		},
		// 内容管理
		'content': {
			//业务动态-子频道文章移动
			'1': '/admin/moveArticle',
			'7': '/admin/moveArticle',
			//产品与系统
			'2': '/admin/moveProduct',
			//航空名片
			'3': '/admin/moveProduct'
		}
	},
	//文章的删除--批量
	'deleteArt': '/admin/delSelArticle',
	// 关于我们编辑--请求静态页面的url
	'aboutUs': {
		'1': {
			'edit': '/admin/lingDaoZhiCi',
			'save': '/admin/updateLingDaoZhiCi'
			},
		'2': {
			'edit': '/admin/gongSiJianJie',
			'save': '/admin/updateGongSiJianJie'
			},
		'3': {
			'edit': '/admin/lingDaoTuanDui',
			'save': '/admin/updateLingDaoTuanDui'
			},
		'4': {
			'edit': '/admin/zuZhiJiaGou',
			'save': '/admin/updateZuZhiJiaGou'
			},
		'5': {
			'edit': '/admin/gongSiZiZhi',
			'save': '/admin/updateGongSiZiZhi'
			},
		'6': {
			'edit': '/admin/liNianRongYu',
			'save': '/admin/updateLiNianRongYu'
			},
		'7': {
			'edit': '',
			'save': ''
			},
		'8': {
			'edit': '/admin/qiYeWenHua',
			'save': '/admin/updateQiYeWenHua'
			},
		'9': {
			'edit': '/admin/Construct',
			'save': '/admin/updateShangJiJingShen'
			},
		'10': {
			'edit': '',
			'save': ''
			},
		'11':{
			'edit': '',
			'save': ''
			},
		'construct-1':{
			'edit': '/admin/shangJiJingShen',
			'save': '/admin/updateShangJiJingShen'
			},
		'construct-2':{
			'edit': '/admin/dangQunYaoWen',
			'save': '/admin/updateDangQunYaoWen'
			}
	}
};
MYAPP.urlMap.getUrl = function(options){
	var type = options['type'],
		flag = options.flag,
		obj = options.eventSrc; 

	// 根据页面各个按钮的选中状态来遍历当前请求的 请求连接 地图目标
	var currentCols = $('#mainHeader .active').attr('data-part');
	var currentAside = '';
	if( type == 'delete' || type == 'move' ){
		currentAside = $('#asideBar .current').parents('li.navFolder').attr('data-group') || $('#asideBar .current').parents('li').attr('data-channel') || $('#asideBar .current').parents('li').attr('data-group');
		MYAPP.console.log('获取的是删除的url，他吧，有点特殊，拿到的currentAside是:'+currentAside+' 1907');
	}else{
		currentAside = $('#asideBar .current').parents('li').attr('data-channel') || $('#asideBar .current').parents('li').attr('data-group');
	}
		currentPart = obj.parents('.data-grid').attr('data-part'),
		reqUrl = MYAPP.urlMap.requestUrl[type][currentCols][currentAside];
		MYAPP.console.log(reqUrl+' 1913');

		if(currentPart){
			try{
				reqUrl = reqUrl[currentPart];	
			}catch(e){
				alert('MYAPP.urlMap.requestUrl下的'+type+'>'+currentCols+'>'+currentAside+'下的'+currentPart+'级url未配置');
			}
			
		}
		MYAPP.console.log(reqUrl+' 1923');
		// 仅仅删除才会有单个和多个区别
		if(type=='delete'){
			if(flag === true){
				try{
					reqUrl = reqUrl.Multi;
				}catch(e){
					alert('MYAPP.urlMap.requestUrl下的'+type+'>'+currentCols+'>'+currentAside+'>'+currentPart+'下的Mutil级url未配置');
				}
			}else if(flag === false){
				try{
					reqUrl = reqUrl.single;
				}catch(e){
					alert('MYAPP.urlMap.requestUrl下的'+type+'>'+currentCols+'>'+currentAside+'>'+currentPart+'下的single级url未配置');
				}
			}
		}
		

	MYAPP.console.log('自动获取对应url成功:'+ reqUrl);
	return reqUrl;
}

MYAPP.namespace('functions');
MYAPP.functions.staticResponse = function(options){

	// 静态请求返回表格页面--绑定了按钮的事件

	MYAPP.console.log('模拟页面切换，高层内容加载完毕！');

	// 当前跳第二页，用高层div模拟
	$('#contentCtner .floatPage').remove();
	$('#floatPage .floatPage').clone().html(options)
							  .appendTo('#contentCtner');


	// 创建新建grid对象
	MYAPP.example.contentGrid = new MYAPP.grid({
			'itemAddBtn' : '.itemAdd',
			'gridTarget' : $('#contentCtner .floatPage .data-grid:first'),
			'editBtn' : '.editBtn',
			'delBtn' : '.delBtn',
			'moveBtn' : '.moveBtn',
			'reqPage' : '.edit',
			'reqEdit' : '.editPage'
		});

	MYAPP.console.log(MYAPP.example.contentGrid+' 1970');

	// 格式化奇偶行的样式
	MYAPP.example.contentGrid.style();

	// 给多选checkbox绑定事件--不确定会不会用到呢
	// $('.floatPage .data-grid input').bind('change', function(){
	// 	var checkedLine = MYAPP.example.grid.checkItem($(this));
	// 	console.log(checkedLine);
	// 	return false;
	// });
	
	// 绑定事件添加按钮--添加banner
	MYAPP.example.contentGrid.itemAddBtn.bind('click', function(){
		$('#newDocColume input[name=channelId]').val($('.data-grid').attr('channelId'));

		// 执行对应咯
		MYAPP.example.contentGrid.addItemAction({
			'eventSrc': $(this)
		});

		// 给图片的实时预览进行初始化
		// if( $('#IMGupload').length > 0 ){
		// 	$("#IMGupload").uploadPreview({
		// 		Img: "ImgPr",
		// 		Width: 120, 
		// 		Height: 120
		// 	});
		// 	$("#ImgPr").siblings('.close-btn').unbind('click');
		// 	$("#ImgPr").siblings('.close-btn').bind('click', function(){
		// 		$("#IMGupload").val('').siblings().val('');
		// 		$(this).parents('.upload-preview').removeClass('uploaded');

		// 	});

		// 	$('#upLodifyBTN').unbind('click');
		// 	$('#upLodifyBTN').bind('click', function(){
		// 		$(this).siblings('input[type=file]').click();
		// 	});
		// }
		return false;
	});

	// 编辑按钮绑定事件
	MYAPP.example.contentGrid.editBtn.bind('click', function(){
		
		// 点击编辑会把当前点击的item的data-item值给到表格上，为的是摸你刷新效果 ==
		$('.floatPage .data-grid').attr('data-current',$(this).parents('td').attr('data-item'));

		// 根据页面各个按钮的选中状态来遍历当前请求的 请求连接 地图目标
		var reqUrl = MYAPP.urlMap.getUrl({
				type : 'edit',
				eventSrc: $(this)
			});

			//执行编辑的动作
			MYAPP.example.contentGrid.editAction({
				"eventSrc": $(this),
				"url": reqUrl,
				"id": $(this).parents('td').attr('data-item')
			});

			// 给图片的实时预览进行初始化
			// if( $('#IMGuploadEdit').length > 0 ){
			// 	$("#IMGuploadEdit").uploadPreview({
			// 		Img: "ImgPrEdit",
			// 		Width: 120, 
			// 		Height: 120
			// 	});
			// 	$("#ImgPrEdit").siblings('.close-btn').unbind('click');
			// 	$("#ImgPrEdit").siblings('.close-btn').bind('click', function(){
			// 		$("#IMGuploadEdit").val('').siblings().val('');
			// 		$(this).parents('.upload-preview').removeClass('uploaded');
			// 	});


			// 	$('#upLodifyBTNEdit').unbind('click');
			// 	$('#upLodifyBTNEdit').bind('click', function(){
			// 		$(this).siblings('input[type=file]').click();
			// 	});
			// }

		return false;
	});

	// 删除按钮绑定事件
	MYAPP.example.contentGrid.delBtn.bind('click', function(){
		var reqUrl = MYAPP.urlMap.getUrl({
			type: 'delete',
			flag: false,
			eventSrc: $(this)
		});

		// alert(currentCols);
		// alert(currentAside);
		// alert(currentPart);
		// alert( isCheckedBox);
		// if(typeof console.log === 'function'){
		// 	MYAPP.console.log('删除请求连接:'+reqUrl+' 2066');
		// }
		
		MYAPP.example.contentGrid.delAction({
			"eventSrc" : $(this),
			"id" : $(this).parents('td').attr('data-item'),
			"url" : reqUrl
		});
		return false;
	});
	MYAPP.example.contentGrid.moveBtn.bind('click', function(){
		var currentCols = $('#mainHeader .active').attr('data-part'),
			currentAside = typeof $('#asideBar .current').parents('li').attr('data-channel') == 'undefined' ? $('#asideBar .current').parents('li').attr('data-group') : $('#asideBar .current').parents('li').attr('data-channel'),
			currentPart = $(this).parents('.data-grid').attr('data-part'),
			reqUrl = MYAPP.urlMap.requestUrl.setOrder[currentCols][currentAside],
			id1 = $(this).parents('td').attr('data-item'),
			moveDir = $(this).attr('data-dir'),
			id2 = 0;
			if( moveDir == 'up' ){
				id2 = $(this).parents('tr').prev('tr').find('td:last').attr('data-item');
			}else if( moveDir == 'down' ){
				id2 = $(this).parents('tr').next('tr').find('td:last').attr('data-item');
			}
			if(currentPart){
				reqUrl = reqUrl[currentPart];
			}else{
				reqUrl = reqUrl;
			}
			MYAPP.console.log(reqUrl+' 2094');
		MYAPP.example.contentGrid.moveAction({
			'eventTarget': $(this),
			'requestMethod': 'POST',
			'literals': 'id1='+id1+'&id2='+id2,
			'requestUrl': reqUrl
		});
	});

	// 第一屏列表，请求第二屏添加到浮动层（页面返回）
	MYAPP.example.contentGrid.reqEdit.bind('click', function(){
		// alert('contentGrid');
		$('.data-grid').attr('data-current',$(this).parents('td').attr('data-item'));
		MYAPP.ajaxHandler.ajaxAction({
			'requestMethod': 'POST',
			'requestUrl': $(this).attr('data-href'),
			'requestCallback': MYAPP.functions.staticResponseEdit
		});
		return false;
	});
	
}

MYAPP.functions.staticResponseEdit = function(options){

	// 静态请求返回表格页面--绑定了按钮的事件
	MYAPP.console.log('模拟页面切换，高层内容加载完毕！（编辑页面）');

	// 当前跳第二页，用高层div模拟
		
	$('#contentCtner .floatPage').remove();
	$('#floatPage .floatPage').clone().html(options)
							  .appendTo('#contentCtner');

	// 添加标题栏的动态改变
	var _tempTitle =$('.titleBar:visible').find('.titleCtner')
		currentTitle = $('#asideBar .current').html();
		_tempTitle.html(currentTitle);

	$('.floatPage:visible .editCancle').unbind('click');
	$('.floatPage:visible .editCancle').bind('click', function(){

		// 销毁编辑器不然不能再次初始化
		try{
			// 直销毁ajax提交的表单中的编辑器
			if($('#contentCtner .floatPage:visible').length > 0 && $('div#editEditor').length > 0){
				UE.getEditor('editEditor').destroy();
				MYAPP.console.log('删除了MYAPP.functions.staticResponseEdit中的编辑器'+' 2136');
			}
		}catch(e){
			MYAPP.console.log('没找到editEditor编辑器！ 2139');
		}
		if($('#contentCtner .floatPageOver').length>0){
			$('#contentCtner .floatPageOver').remove();
		}else{
			$('#contentCtner .floatPage').remove();
		}

		// 定位到顶端
		if(window.scrollTo){
			window.scrollTo(0,0);
		}
	});


	//网站首页2、3、4的编辑

	// 编辑的validate
	$('.floatPage .inputsectionEdit').validate({});
	MYAPP.console.log('数据验证相关部署完成！');

	// 给图片的实时预览进行初始化
	if( $('#IMGuploadEdit:visible').length > 0 ){
		$("#IMGuploadEdit").uploadPreview({
			Img: "ImgPrEdit",
			Width: 120, 
			Height: 120,
			Error: function(obj){
				obj.val('');
				obj.siblings('input').val('');
				obj.closest('dd').find('.upload-preview').removeClass('uploaded');
			}
		});
		$("#ImgPrEdit").siblings('.close-btn').unbind('click');
		$("#ImgPrEdit").siblings('.close-btn').bind('click', function(){
			$("#IMGuploadEdit").val('').siblings().val('');
			$(this).parents('.upload-preview').removeClass('uploaded');
		});


		$('#upLodifyBTNEdit').unbind('click');
		$('#upLodifyBTNEdit').bind('click', function(){
			$(this).siblings('input[type=file]').click();
		});
	}

	// 存在全选设置的表格要初始化一下
	if( $('.groupCkeck:visible').length > 0 ){
 		var limitsGrid = new MYAPP.groupCheck({
 			'grid': $('.groupCkeck:visible')
 		});
 	};

	// 文章编辑用到的
	// 编辑器初始化
	if($('#editEditor:visible').length > 0){
		// alert('editor.visible');

		// 销毁编辑器不然不能再次初始化
		// try{
		// 	if($('#contentCtner .floatPage').length > 0){
		// 		UE.getEditor('editEditor').destroy();	
		// 	}
		// }catch(e){
		// 	MYAPP.console.log('没找到editEditor编辑器！');
		// }

		MYAPP.console.log('探测到编辑器，初始化编辑器'+' 2191');
		var ueditor = UE.getEditor('editEditor',{
	 		textarea: 'content',
	 		initialFrameWidth: 950,
	 		initialFrameHeight: 500
	 	});
	 	window.ueditor = ueditor;
	 	
	 	var chId = $('#asideBar .current').parents('.navFolder').attr('data-group'),
	 		colId = $('#asideBar .current').parents('li').attr('data-channel'),
	 		artId = $('.data-grid').attr('data-current');
	 		$('input[name=channelId]').val(chId);
	 		$('input[name=columnId]').val(colId);
	 		$('input[name=id]').val(artId);
	 	
	 		$('#contentCtner .artCancle').bind('click', function(){
	 			UE.getEditor('editEditor').destroy();
	 			if($('#contentCtner .floatPageOver').length>0){
	 				$('#contentCtner .floatPageOver').remove();	
	 			}else{
	 				$('#contentCtner .floatPage').remove();
	 			}
	 			

	 			// 定位到顶端
				if(window.scrollTo){
					window.scrollTo(0,0);
				}

	 		});

	 		$('#contentCtner .submit').bind('click', function(){
	 			
	 			if($(this).parents('form').attr('ajax_response')){
	 				return;
	 			}
	 			// $(document).ajaxComplete(function(event, xhr, settings) {
	 			// 	/* executes whenever an AJAX request completes */

	 			// 	var jsonResp = $.parseJSON(xhr.responseText);
	 			// 	if( jsonResp.api_code == 1 ){

	 			// 		$('#contentCtner .artCancle').click();
	 			// 		$('#asideBar .current').parent().click();

	 			// 		MYAPP.refreshAction({
					// 		type: 'asideChild',
					// 		eventSrc: $(this)
					// 	});
	 			// 	}

	 			// 	$(document).unbind('ajaxComplete');
	 			// });
	 			
	 		});
	}

	//领导团队还有表格的编辑，初始化表格吧！
	MYAPP.example.editGrid = new MYAPP.grid({
			'itemAddBtn' : '.itemAdd',	
			'articleAddBtn': '.articleAdd',	
			'gridTarget' : $('#contentCtner .floatPage .data-grid:last'),	
			'editBtn' : '.editBtn',
			'delBtn' : '.delBtn',
			'moveBtn' : '.moveBtn',
			'reqPage' : '.edit',
			'reqEdit' : '.editPage',
			// 'moveMulti' : '.moveMulti',
			// 'delMulti' : '.delMulti',
			'productAdd' : '.productAdd',
			'addEGridItem': '.addEGridItem',
			'addEGridItemZizhi': '.addEGridItemZizhi'
		});

	// 格式换单双行样式
	MYAPP.example.editGrid.style();

	//grid的item的移动
	MYAPP.example.editGrid.moveBtn.bind('click', function(){
		var reqUrl = '';
		if( $(this).parents('td').attr('data-move') ){
			reqUrl = $(this).parents('td').attr('data-move');
		}else{
			MYAPP.urlMap.getUrl({
				type: 'setOrder',
				eventSrc: $(this)
			});
		}
		var	id1 = $(this).parents('td').attr('data-item'),
			moveDir = $(this).attr('data-dir'),
			id2 = 0;
			if( moveDir == 'up' ){
				id2 = $(this).parents('tr').prev('tr').find('td:last').attr('data-item');
			}else if( moveDir == 'down' ){
				id2 = $(this).parents('tr').next('tr').find('td:last').attr('data-item');
			}

			MYAPP.console.log(reqUrl+' 2273');
		MYAPP.example.grid.moveAction({
			'eventTarget': $(this),
			'literals':'id1='+id1+'&id2='+id2,
			'requestMethod': 'POST',
			'requestUrl': reqUrl
		});
	});

	// grid条目添加
	MYAPP.example.editGrid.addEGridItem.bind('click', function(){
		$('#newDocColume input[name=channelId]').val($('.data-grid').attr('channelId'));
		MYAPP.example.grid.addEGridItemAction({
			'eventSrc': $(this),
			"id": $(this).parents('td').attr('data-item')
		});
		return false;
	});

	//公司资质addEGridItemZizhi
	MYAPP.example.editGrid.addEGridItemZizhi.bind('click', function(){
		$('#newDocColume input[name=channelId]').val($('.data-grid').attr('channelId'));
		MYAPP.example.grid.addEGridItemAction({
			'eventSrc': $(this),
			"id": $(this).parents('td').attr('data-item'),
			'frameType': 'newZizhi'
		});
		return false;
	});

	// 删除grid条目，需要ajax请求，提交id
	MYAPP.example.editGrid.delBtn.bind('click', function(){
		var reqUrl = '';

		if( $(this).parents('td').attr('data-delete') ){
			reqUrl = $(this).parents('td').attr('data-delete');
		}else{
			MYAPP.urlMap.getUrl({
				type: 'delete', 
				flag: false,
				eventSrc: $(this)
			});
		}

		MYAPP.console.log(reqUrl+' 2317');
		MYAPP.example.grid.delAction({
			"eventSrc" : $(this),
			"id" : $(this).parents('td').attr('data-item'),
			"url" : reqUrl
		});
		return false;
	});


	// 编辑grid条目，需要ajax请求编辑数据的数据
	MYAPP.example.editGrid.editBtn.bind('click', function(){
		var reqUrl = '',
			target = $(this).parents('td').attr('data-target');

		if( $(this).parents('td').attr('data-edit') ){
			reqUrl = $(this).parents('td').attr('data-edit');
		}else{
			MYAPP.urlMap.getUrl({
				type: 'edit', 
				flag: false,
				eventSrc: $(this)
			});
		}

		MYAPP.console.log(reqUrl+' 2342');
		MYAPP.example.grid.editCtnerAction({
			"eventSrc" : $(this),
			"id" : $(this).parents('td').attr('data-item'),
			"url" : reqUrl,
			"target" : target
		});
		return false;
	});	

	// 新加的功能--党群建设--还要是页面的编辑
	MYAPP.example.editGrid.reqEdit.bind('click', function(){
		var reqUrl = '',
			currentItem = '';
		if( $(this).hasClass('urlMap') ){
			currentItem = $(this).attr('data-href');
			reqUrl = MYAPP.urlMap.requestUrl.aboutUs[currentItem]['edit'];
		}else{
			reqUrl = $(this).attr('data-href')
		}
		
		MYAPP.ajaxHandler.ajaxAction({
			'flpage': true,
			'requestMethod': 'POST',
			'requestUrl': reqUrl,
			'requestCallback': MYAPP.functions.staticResponseEditOver,
			'literals': 'id='+$(this).parents('td').attr('data-item')
		});
		return false;
	});
	
}

MYAPP.functions.staticResponseEditOver = function(options){

	// 第3层页面--关于我们党群建设
	$('.floatPageOver').remove();
	$('<div class="floatPageOver"></div>').html(options)
							  			  .appendTo('#contentCtner');


	// 添加标题栏的动态改变
	var _tempTitle =$('.titleBar:visible').find('.titleCtner')
		currentTitle = $('#asideBar .current').html();
		_tempTitle.html(currentTitle);

	$('.floatPageOver .editCancle').unbind('click');
	$('.floatPageOver .editCancle').bind('click', function(){
		// alert('editCancle');
		// 销毁编辑器不然不能再次初始化
		try{
			// 直销毁ajax提交的表单中的编辑器
			if($('#contentCtner .floatPageOver').length > 0 && $('div#editEditor').length > 0){
				UE.getEditor('editEditor').destroy();
				MYAPP.console.log('删除了MYAPP.functions.staticResponseEdit中的编辑器'+' 2136');
			}
		}catch(e){
			MYAPP.console.log('没找到editEditor编辑器！ 2139');
		}

		// 获取一个编辑器数组的那个--党群建设
		if(typeof window.ueditorArray !== 'undefined'){
			// alert('destroy ueditor array');
			for(var i=(window.ueditorArray.length-1); i>=0; i--){
				if(window.ueditorArray[i]){
					try{
						UE.getEditor('editDQ'+i).destroy();
						window.ueditorArray[i] = undefined;
					}catch(ex){
						//do nothing
					}
				}
			}
			window.ueditorArray.length = 0;
			window.ueditorArray = undefined;

		}

		$('#contentCtner .floatPageOver').remove();

		// 定位到顶端
		if(typeof window.scrollTo === 'function'){
			window.scrollTo(0,0);
		}
	});


	//网站首页2、3、4的编辑

	// 编辑的validate
	$('.floatPageOver .inputsectionEdit').validate({});
	MYAPP.console.log('数据验证相关部署完成！');

	// 给图片的实时预览进行初始化
	if( $('#IMGuploadEdit:visible').length > 0 ){
		$("#IMGuploadEdit").uploadPreview({
			Img: "ImgPrEdit",
			Width: 120, 
			Height: 120,
			Error: function(obj){
				obj.val('');
				obj.siblings('input').val('');
				obj.closest('dd').find('.upload-preview').removeClass('uploaded');
			}
		});
		$("#ImgPrEdit").siblings('.close-btn').unbind('click');
		$("#ImgPrEdit").siblings('.close-btn').bind('click', function(){
			$("#IMGuploadEdit").val('').siblings().val('');
			$(this).parents('.upload-preview').removeClass('uploaded');
		});


		$('#upLodifyBTNEdit').unbind('click');
		$('#upLodifyBTNEdit').bind('click', function(){
			$(this).siblings('input[type=file]').click();
		});
	}

	// 存在全选设置的表格要初始化一下
	if( $('.groupCkeck:visible').length > 0 ){
 		var limitsGrid = new MYAPP.groupCheck({
 			'grid': $('.groupCkeck:visible')
 		});
 	};

	// 文章编辑用到的
	// 编辑器初始化
	if($('#editEditor:visible').length > 0){
		// alert('editor.visible');

		// 销毁编辑器不然不能再次初始化
		// try{
		// 	if($('#contentCtner .floatPage').length > 0){
		// 		UE.getEditor('editEditor').destroy();	
		// 	}
		// }catch(e){
		// 	MYAPP.console.log('没找到editEditor编辑器！');
		// }


		MYAPP.console.log('探测到编辑器，初始化编辑器'+' 2191');
		var ueditor = UE.getEditor('editEditor',{
	 		textarea: 'content',
	 		initialFrameWidth: 950,
	 		initialFrameHeight: 500
	 	});
	 	window.ueditor = ueditor;
	 	
	 	var chId = $('#asideBar .current').parents('.navFolder').attr('data-group'),
	 		colId = $('#asideBar .current').parents('li').attr('data-channel'),
	 		artId = $('.data-grid').attr('data-current');
	 		$('input[name=channelId]').val(chId);
	 		$('input[name=columnId]').val(colId);
	 		$('input[name=id]').val(artId);
	 	
	 		$('#contentCtner .artCancle').bind('click', function(){
	 			UE.getEditor('editEditor').destroy();
	 			if($('#contentCtner .floatPageOver').length>0){
	 				$('#contentCtner .floatPageOver').remove();
	 			}else{
	 				$('#contentCtner .floatPage').remove();
	 			}

	 			// 定位到顶端
				if(window.scrollTo){
					window.scrollTo(0,0);
				}

	 		});
	}


	// 编辑器添加那个很美好的东西==
	// 
	//初始化当前存在的插件，包括图片上传预览以及编辑器
	$('.floatPageOver:visible .team-input .ueditorItem:first').css({'margin-top':0,'padding-top':0,'border-top':0});
	if($('.floatPageOver:visible .team-input .ueditorItem').length>0){
		var itemCount = $('.floatPageOver:visible .team-input .ueditorItem').length;
		for(var i=0; i<itemCount;i++){
			
			// 初始化图片上传插件
			$("#IMGuploadDQ"+(i+1)).uploadPreview({
				Img: "ImgPrDQ"+(i+1),
				Width: 120, 
				Height: 120,
				Error: function(obj){
					obj.val('');
					obj.siblings('input').val('');
					obj.closest('dd').find('.upload-preview').removeClass('uploaded');
				}
			});

			// 异步事件，i的值有问题了
			$("#ImgPrDQ"+(i+1)).siblings('.close-btn').unbind('click');
			$("#ImgPrDQ"+(i+1)).siblings('.close-btn').bind('click', (function(){
				var a = i;
				return function(){
					$("#IMGuploadDQ"+(a+1)).val('').siblings().val('');
					$(this).parents('.upload-preview').removeClass('uploaded');
				}
			})(i));


			$('#upLodifyBTNQU'+(i+1)).unbind('click');
			$('#upLodifyBTNQU'+(i+1)).bind('click', function(){
				$(this).siblings('input[type=file]').click();
			});

			// 初始化编辑器组
			var ueditorArray = window.ueditorArray || [];
				ueditorArray[i+1] = UE.getEditor('editDQ'+(i+1) ,{
		 		textarea: 'content',
		 		initialFrameWidth: 950,
		 		initialFrameHeight: 500
		 	});
		 	window.ueditorArray = ueditorArray;

		};

		$('.floatPageOver:visible .team-input .ueditorItem').each(function(){
			//移除按钮绑定事件
			$(this).find('.removeMe').bind('click', function(){
				var idx = $(this).attr('data-index');
				MYAPP.UEditor.deleteEditor({
					idx: idx
				});
			});
		});
		
	};

	if($('.floatPageOver .addUEditor').length>0){
		// 要不要首先获取已经存在的编辑器的个数呢？要！！！
		$('.floatPageOver .addUEditor').bind('click', function(){
			var ueditorExsist = $('.floatPageOver #ueditorCount').val()>0?$('.floatPageOver #ueditorCount').val():1;
			MYAPP.UEditor.createEditor(ueditorExsist);
		});

	}

	// 现在的提交只能是手动搞
	$('.floatPageOver .submitSelf').bind('click', function(){
		/*
		 * todo 判断为空，然后拼数据提交 
		 */
		MYAPP.validate.mini({
			formCtner: $(this).parents('.inputsectionEdit2')
		});
	});
}

MYAPP.namespace('validate');
MYAPP.validate.mini = function(options){
	// 获取必要的变量
	var container = options.formCtner,
		inputs = container.find('input,textarea'),
		validRes = true;

	// 给每个input框绑定自动清除错误信息提示的标志
	inputs.bind('change', function(){
		if($(this).attr('type')!=='file'&&$(this).attr('name')!=='filePretend'){
			var errorCtner = $(this).parents('.inputframe').siblings('.wrongmsg'),
				errorCtner = errorCtner.length>0 ? errorCtner :  $(this).parents('.inputframe').parent().siblings('.wrongmsg'),
				msgDef = errorCtner.attr('data-default');
			$(this).parents('.inputframe').removeClass('wrong');
			errorCtner.removeClass('error');
			if(msgDef&&msgDef.length>0){
				errorCtner.html(msgDef);
			}else{
				errorCtner.html('');
			}
		}
	});

	// 给每个input框进行验证
	inputs.each(function(){
		var itemEmpty = $(this).attr('valid-empty'),
			itemWrong = $(this).attr('valid-wrong'),
			itemValid = $(this).attr('valid-type'),
			itemValidObj = null,
			itemVal = $(this).val(),
			errorCtner = $(this).parents('.inputframe').siblings('.wrongmsg'),
			errorCtner = errorCtner.length>0 ? errorCtner :  $(this).parents('.inputframe').parent().siblings('.wrongmsg'),
			validFunc = $(this).attr('data-needcheck');

		if(itemValid){
			try{
				itemValidObj = new RegExp(itemValid);
			}catch(e){}
		}

		// 如果设置了need-check求值方法，要调用一下
		if(validFunc){
			var idx = $(this).parents('.ueditorItem').find('.removeMe').attr('data-index')||1;
			var res = eval(validFunc+'('+idx+')');
			
			if(!res){
				// 返回false说明有值，其实是不在需要验证了，保持一样的流程这里就赋下值继续验证
				itemVal = $(this).val();
			}else{
				$(this).parents('.inputframe').addClass('wrong');
				errorCtner.addClass('error').html(itemEmpty);
				validRes = false;
				return false;
			}
		}

		if($.trim(itemVal).length == 0){
			if(itemEmpty&&itemEmpty.length>0){
				$(this).focus().parents('.inputframe').addClass('wrong');
				errorCtner.addClass('error').html(itemEmpty);
				validRes = false;
				return false;
			}
		}else if(itemValidObj){
			var res = itemValidObj.test(itemVal);
			if(res){
				validRes = true;
			}else{
				$(this).focus().parents('.inputframe').addClass('wrong');
				errorCtner.addClass('error').html(itemWrong);
				validRes = false;
				return false;
			}
		}
	});

	if(validRes){
		// 验证通过，给后台拼数据
		// var data=[];

		// $('.floatPageOver .ueditorItem').each(function(){
		// 	var _temp = {};
		// 	$(this).find('input,textarea').each(function(){
		// 		_temp[$(this).attr('name')] = $(this).val();
		// 	});
		// 	if(!_temp.name){
		// 		_temp.name = $('#DQname').val();
		// 	}
		// 	if(!_temp.display){
		// 		_temp.display = $('#DQdisplay').val();
		// 	}
			
		// 	console.log(_temp);
		// 	data.push(_temp);

		// });

		// console.log(data);

		// var action = $('.floatPageOver .inputsectionEdit2').attr('action');
		// $('.floatPageOver .inputsectionEdit2').attr('action', action+'?data='+JSON.stringify(data)).submit();
		$('.floatPageOver .inputsectionEdit2').submit();
		var formRes = $('.floatPageOver .inputsectionEdit2').attr('form_response');
		if(formRes){
			eval(formRes+'()');
		}

	}
}

MYAPP.namespace('UEditor');
MYAPP.UEditor.createEditor = function(count){

	// console.log(count);

	// 拼接ueditorItem的数据
	var tempStr = [],
		count = parseInt(count, 10)+1;

		// 动态改变条目的个数
		$('.floatPageOver #ueditorCount').val(count);

	if(count<=1){
		tempStr.push('<div class="ueditorItem always"><dd class="clearfix team-inputCon"><em class="removeMe remove_me" data-index="'+count+'"></em>');
	}else{
		tempStr.push('<div class="ueditorItem"><dd class="clearfix team-inputCon"><input type="hidden" value="" name="id"/><em class="removeMe remove_me" data-index="'+count+'"></em>');
	}
	tempStr.push('<div class="clearfix">');
	tempStr.push('<label class="left" for=""><span>*</span> 栏目配图：</label>');
	tempStr.push('<div class="left input-text inputframe">');
	tempStr.push('<input type="text" data-type="file" name="filePretend" valid-type="^(.*)$" valid-empty="请选择图片" readonly="readonly"/>');
	tempStr.push('<div id="upLodifyBTNQU'+count+'" class="upload-file">选择图片</div>');
	tempStr.push('<input type="file" class="file_opa" data-type="file" id="IMGuploadDQ'+count+'" name="file" valid-type="^(.*)$"  style="visibility:hidden;"/>');
	tempStr.push('</div><span class="hint wrongmsg" data-default="建议图片宽度：220px，JPG/JPEG/PNG/GIF/BMP格式">建议图片宽度：220px，JPG/JPEG/PNG/GIF/BMP格式</span>');
	tempStr.push('<div class="upload-preview"><span class="preview-iframe"><img id="ImgPrDQ'+count+'" src="" name="PicUrl" width="158"/><em class="close-btn"></em></span></div>');
	tempStr.push('</div></dd>');
	tempStr.push('<dd class="clearfix team-inputCon">');
	tempStr.push('<label for="" class="left"><span>*</span> 描述：</label>');
	tempStr.push('<div class="clearfix">');
	tempStr.push('<div class="left inputframe">');
	tempStr.push('<textarea data-type="text" class="orationArea" data-needcheck="getEditorContentArr" valide-type="^(.*){1,12000}$"  valid-empty="输入描述" valiwrong="描述格式错误"  id="editDQ'+count+'" name="description"></textarea>');
	tempStr.push('</div></div>');
	tempStr.push('<div class="hint wrongmsg" data-default="" style="margin-left: 110px;"></div>');
	tempStr.push('</dd></div>');
	var neweditor = $(tempStr.join(' '));

	// 将结构插入到结构中
	neweditor.insertAfter($('.floatPageOver .ueditorItem:last'));

	// 给移除按钮添加事件
	neweditor.find('.removeMe').bind('click', function(){
		var idx = $(this).attr('data-index');
		MYAPP.UEditor.deleteEditor({
			idx: idx
		});
	});


	// 初始化相关插件
	// ueditor 
	var ueditorArray = window.ueditorArray || [];
		ueditorArray[count] = UE.getEditor('editDQ'+count ,{
 		textarea: 'content',
 		initialFrameWidth: 950,
 		initialFrameHeight: 500
 	});

		// console.log(ueditorArray);

 	window.ueditorArray = ueditorArray;
 	// 上传图片预览
 	$("#IMGuploadDQ"+count).uploadPreview({
		Img: "ImgPrDQ"+count,
		Width: 120, 
		Height: 120,
		Error: function(obj){
			obj.val('');
			obj.siblings('input').val('');
			obj.closest('dd').find('.upload-preview').removeClass('uploaded');
		}
	});
	$("#ImgPrDQ"+count).siblings('.close-btn').unbind('click');
	$("#ImgPrDQ"+count).siblings('.close-btn').bind('click', function(){
		$("#IMGuploadDQ"+count).val('').siblings().val('');
		$(this).parents('.upload-preview').removeClass('uploaded');
	});


	$('#upLodifyBTNQU'+count).unbind('click');
	$('#upLodifyBTNQU'+count).bind('click', function(){
		$(this).siblings('input[type=file]').click();
	});

}

MYAPP.UEditor.deleteEditor = function(options){
	var idx = options.idx,
		id = $('.removeMe[data-index='+idx+']').attr('data-id'),
		returnState = false;
	if(id){
		// 需要发送ajax请求
		returnState = (function(){
			$.ajax({
				type : 'POST',
		        async : true,
		        dataType : "json",
		        url : '/admin/deleteDangQun',
		        data: 'id='+id,
		        success : function(data){
		        	if(data.api_code==1){
		        		// 成功后，销毁编辑器，移除相应dom结构
						UE.getEditor('editDQ'+idx).destroy();
						ueditorArray[idx] = null;
						$('.removeMe[data-index='+idx+']').parents('.ueditorItem').remove();
						// 如果可以应该是把图片上传预览的事件都解除来释放内存
		        		return true;
		        	}else{
		        		// alert('删除失败');
		        		return false;
		        	}
		        }
			});
		})();
	}else{
		//不需要发送请求
		returnState = true;
	}

	if(returnState){
		// 成功后，销毁编辑器，移除相应dom结构
		UE.getEditor('editDQ'+idx).destroy();
		ueditorArray[idx] = undefined;
		$('.removeMe[data-index='+idx+']').parents('.ueditorItem').remove();
		// 如果可以应该是把图片上传预览的事件都解除来释放内存
	}
}

$(function(){

	MYAPP.namespace('example');

	
	MYAPP.example.aside = new MYAPP.AsideBar( $('.asidebar') );
	MYAPP.example.aside.eventRespone = MYAPP.ajaxHandler.ajaxAction;
	MYAPP.example.aside.config.requestCallback = function(){
		// 页面滚到最顶端
		if( typeof window.scrollTop === 'function' ){
			window.scrollTo(0,0);
		}
		// alert('requestCallback');
		// 格式化分页
		// 分页调取
		var curGrid = $('.data-grid:visible:last'),
			curCount = curGrid.attr('data-total')||0,
			curPage = curGrid.attr('page-current')||1,
			curShow = curGrid.attr('show-page')||false;
		if(curShow){
			MYAPP.pagination({
				itemCount: curCount,
				current: curPage 
			});
		}
		
		// 改变sidenav侧栏状态
		$('#asideBar .current').removeClass('current');
		this.eventTarget.find('a').addClass('current');

		$('.data-grid').attr('channelId',this.eventTarget.attr('data-channel'));
		$('.data-grid').attr('columnId',this.eventTarget.parents('.navFolder ').attr('data-group'));
		// 最初需要动态请求数据的grid
		MYAPP.example.grid = new MYAPP.grid({
			'itemAddBtn' : '.itemAdd',	
			'articleAddBtn': '.articleAdd',	
			'gridTarget' : $('#contentCtner .data-grid:first'),	
			'editBtn' : '.editBtn',
			'delBtn' : '.delBtn',
			'moveBtn' : '.moveBtn',
			'reqPage' : '.edit',
			'reqEdit' : '.editPage',
			'moveMulti' : '.moveMulti',
			'delMulti' : '.delMulti',
			'productAdd' : '.productAdd',
			'editPWD': '.editPWD'
		});
		MYAPP.example.grid.style();

		// 选中顶部，底部全选选择框
		$('.data-grid input').bind('change', function(){
			MYAPP.example.grid.checkedLine = MYAPP.example.grid.checkItem($(this));
			// return false;
		});
		// 全选文字绑定事件
		$('.data-grid .allBtn').bind('click', function(){
			var checkObj = $(this).parents('td').prev().find('input');
			checkObj.click();
			checkObj.change();
		});
		// grid条目添加
		MYAPP.example.grid.itemAddBtn.bind('click', function(){
			$('#newDocColume input[name=channelId]').val($('.data-grid').attr('channelId'));
			MYAPP.example.grid.addItemAction({
				'eventSrc': $(this),
				"id": $(this).parents('td').attr('data-item')
			});
			return false;
		});
		// 发布文章，请求新的页面--将相关的隐藏区域展示出来
		MYAPP.example.grid.articleAddBtn.bind('click', function(){
			// alert('asdfasd111');
			$('#newDocColume input[name=channelId]').val($('.data-grid').attr('channelId'));
			MYAPP.example.grid.addArtAction({
				"eventSrc": $(this),
				"id": $(this).parents('td').attr('data-item')
			});
			return false;
		});
		//发布产品的按钮，请求页面--就是把页面隐藏的区域显示出来，大概同发布文章，但是由于编辑器的问题，只能设置不同的方法与区块
		MYAPP.example.grid.productAdd.bind('click', function(){
			MYAPP.example.grid.addProduct({
				"eventSrc" : $(this)
			});
			return false;
		});
		// 编辑grid条目，需要ajax请求数据
		MYAPP.example.grid.editBtn.bind('click', function(){

			var  isHasBox = $('.data-grid input[type=checkbox]').length > 0;
				 isCheckedBox = $('.data-grid input[type=checkbox]:checked').length > 0;

			var reqUrl = '',
				target = $(this).parents('td').attr('data-target');

			if( $(this).parents('td').attr('data-edit') ){
				reqUrl = $(this).parents('td').attr('data-edit');
			}else{
				reqUrl = MYAPP.urlMap.getUrl({
					type: 'edit', 
					flag: false,
					eventSrc: $(this)
				});
			}
			// if(isHasBox && isCheckedBox){
				// 当前grid有多选框，并且在选中的时候去点击编辑
				// MYAPP.console.log('多选模式下不能进行编辑！！！');
				// return false;
			// }else if(!isHasBox || (isHasBox&&!isCheckedBox)){
				// 当前grid没有多选框 或者 有多选框但是都没有选中 的时候去点击编辑
				MYAPP.example.grid.editAction({
					"eventSrc": $(this),
					"url" : reqUrl
				});
			// }
			return false;
		});
		// 删除grid条目，需要ajax请求，提交id
		MYAPP.example.grid.delBtn.bind('click', function(){
			var isCheckedBox = $('.data-grid input[type=checkbox]').length > 0 && $('.data-grid input[type=checkbox]:checked').length > 0 && $(this).parents('td').attr('data-item') == undefined,
			reqUrl = MYAPP.urlMap.getUrl({
				type: 'delete', 
				flag: isCheckedBox,
				eventSrc: $(this)
			}),
			checkedItems;

			if(isCheckedBox){
				checkedItems = MYAPP.example.grid.checkedLine;
			}else{
				checkedItems = $(this).parents('td').attr('data-item');
			}
			MYAPP.console.log(reqUrl+' 2481');
			MYAPP.example.grid.delAction({
				"eventSrc" : $(this),
				"id" : checkedItems,
				"url" : reqUrl
			});
			return false;
		});
		// grid条目的移动，需要ajax请求，提交交换位置的两个item的id
		MYAPP.example.grid.moveBtn.bind('click', function(){
			var reqUrl = MYAPP.urlMap.getUrl({
				type: 'setOrder',
				eventSrc: $(this)
			}),
				id1 = $(this).parents('td').attr('data-item'),
				moveDir = $(this).attr('data-dir'),
				id2 = 0;
				if( moveDir == 'up' ){
					id2 = $(this).parents('tr').prev('tr').find('td:last').attr('data-item');
				}else if( moveDir == 'down' ){
					id2 = $(this).parents('tr').next('tr').find('td:last').attr('data-item');
				}
				MYAPP.console.log(reqUrl+' 2503');
			MYAPP.example.grid.moveAction({
				'eventTarget': $(this),
				'literals':'id1='+id1+'&id2='+id2,
				'requestMethod': 'POST',
				'requestUrl': reqUrl
			});
		});

		// 文章列表，多选移动
		MYAPP.example.grid.moveMulti.bind('click', function(){
			var isCheckedBox = $('.data-grid input[type=checkbox]').length > 0 && $('.data-grid input[type=checkbox]:checked').length > 0 && $(this).parents('td').attr('data-item') == undefined,
			reqUrl = MYAPP.urlMap.getUrl({
				type: 'move',
				flag: true,
				eventSrc: $(this)
			}),
			checkedItems;
			// alert(currentCols);
			// alert(currentAside);
			// alert(currentPart);
			// alert( isCheckedBox);
			if(isCheckedBox){
				checkedItems = MYAPP.example.grid.checkedLine;
			}else{
				checkedItems = $(this).parents('td').attr('data-item');
			}

			MYAPP.console.log(checkedItems+' 2531');
			if( checkedItems === undefined || checkedItems.length <= 0 ){
				var userDecision = new MYAPP.Alert.AlertBox('moveEmpty', function(flag){
					userDecision.remove();
				});
				return;
			}

			MYAPP.console.log(reqUrl+' 2539');
			MYAPP.example.grid.moveMultiAction({
				'eventTarget': $(this),
				'id':checkedItems,
				'requestMethod': 'POST',
				'requestUrl': reqUrl
			});
		});

		// grid列表items，多选删除
		MYAPP.example.grid.delMulti.bind('click', function(){
			var isCheckedBox = $('.data-grid input[type=checkbox]').length > 0 && $('.data-grid input[type=checkbox]:checked').length > 0 && $(this).parents('td').attr('data-item') == undefined,
			reqUrl = '',
			checkedItems;

			reqUrl = MYAPP.urlMap.getUrl({
				type: 'delete',
				flag: true,
				eventSrc: $(this)
			});
			// alert(currentCols);
			// alert(currentAside);
			// alert(currentPart);
			// alert( isCheckedBox);
			if(isCheckedBox){
				checkedItems = MYAPP.example.grid.checkedLine;
			}else{
				checkedItems = $(this).parents('td').attr('data-item');
			}

			MYAPP.console.log(checkedItems+' 2569');
			if( checkedItems === undefined || checkedItems.length <= 0 ){
				var userDecision = new MYAPP.Alert.AlertBox('delMultiEmty', function(flag){
					userDecision.remove();
				});
				return;
			}

			MYAPP.console.log(reqUrl+' 2577');
			MYAPP.example.grid.delMultiAction({
				'eventTarget': $(this),
				'id':checkedItems,
				'requestMethod': 'POST',
				'requestUrl': reqUrl
			});
		});

		// 第一屏列表，请求第二屏添加到浮动层（表格返回）
		MYAPP.example.grid.reqPage.bind('click', function(){
			$('.data-grid').attr('data-current',$(this).parents('td').attr('data-item'));
			var reqUrl = $(this).attr('data-href');
			MYAPP.ajaxHandler.ajaxAction({
				'requestMethod': 'POST',
				'requestUrl': reqUrl,
				'requestCallback': MYAPP.functions.staticResponse,
				'literals': 'id='+ $(this).parents('td').attr('data-item')
			});
			return false;
		});

		// 第一屏列表，请求第二屏添加到浮动层（编辑页面返回）
		MYAPP.example.grid.reqEdit.bind('click', function(){
			$('.data-grid').attr('data-current',$(this).parents('td').attr('data-item'));

			var reqUrl = '',
				currentItem = '';
			if( $(this).hasClass('urlMap') ){
				currentItem = $(this).attr('data-href');
				reqUrl = MYAPP.urlMap.requestUrl.aboutUs[currentItem]['edit'];
			}else{
				reqUrl = $(this).attr('data-href')
			}

			MYAPP.ajaxHandler.ajaxAction({
				'requestMethod': 'POST',
				'requestUrl': reqUrl,
				'requestCallback': MYAPP.functions.staticResponseEdit,
				'literals': 'id='+$(this).parents('td').attr('data-item')
			});
			return false;
		});

		// 用户弹框修改密码
		MYAPP.example.grid.editPWD.bind('click', function(){
			MYAPP.example.grid.changePwd({
				'eventSrc': $(this)
			});
		});
	}



	// MYAPP.example.baseLayout = new MYAPP.layout.twoColsStyle({
	// 	"mainParentctner" : ".main-container",
	// 	"sideBar" : "#asideBar",
	// 	"mainCtner" : "#contentCtner",
	// 	"minwidth" : 1300
	// });

});

$(function(){
	// css hack用
    $('body').addClass('ie'+ document.documentMode );
});