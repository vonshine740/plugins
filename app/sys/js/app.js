var myScroll;

function loaded () {
	myScroll = new IScroll('#wrapper', { 
		useTransition: false,
		mouseWheel: true,	//支持鼠标滚动
		scrollbars: true,	//显示滚动条
		click: true,		//支持相应click事件(不阻止默认行为)
		momentum: true,
		freeScroll: true
	});
}

function getList(){
	if(list && list.length > 0){
		return list;
	}else{
		return false;
	}
}

function initList(data, container){
	if(data && data.length > 0){
		var item = [];
		for(var i in data){
			item.push('<li data-item="'+data[i]['id']+'">');
			item.push('<a target="_blank" href="'+data[i]['href']+'"><h2>'+data[i]['title']+'</h2></a>');

			if(data[i].cover){
				// 含有图片
				item.push('<p class="cover"><img src="'+data[i]['cover']+'" alt=""></p>');
			}
			item.push('<p>'+data[i]['desc']+'</p>');
			item.push('</li>');
		};
		item.push('<li></li>');
		if( typeof container === 'string' && $(container).length > 0 || typeof container === 'object' ){
			$(container).append(item.join(' '));
			return true;
		}else{
			return false;
		}
	}
}


$(function(){
	// 初始化iScroll
	loaded();

	var list = getList();
	
	var flag = initList(list, $('#data-list'));

	if(flag){
		myScroll.refresh();
	}

});