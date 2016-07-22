$(function(){
	var URL = window.location.href;	
	if( URL.indexOf('index.html') === -1 ){
		URL = URL;
	}else{
		URL = URL.substr(0, URL.indexOf('index.html'));
	}
	
	$.ajax({
        type : 'GET',
        async : false,
        dataType : "json",
        url : URL+'version.json',
        success : function(data){
            if(data){
                // 读取名字，替换到页面中
                if(data['info']){
                    $('title,#header').html(data['info']['name']);
                }
                
                // 读取更新日志，填充到页面中
                if(data.versions.length > 0){
                    var vsCtenr = $('#versions');
                    if( vsCtenr instanceof jQuery && vsCtenr.length>0){
                        var _str = [];
                        for(var i in data.versions){
                            _str.push('<li class="clearfix"><div class="left"><p class="time">'+data.versions[i].date+'</p>');   
                            _str.push('<p>'+data.versions[i].desc+'</p></div><div class="right">');
                            if(data.versions[i].file.compress.length>0){
                                _str.push('<p><a href="'+data.versions[i].file.compress+'">压缩版</a></p>');    
                            }else{
                                _str.push('<p><span>未上传压缩版</span></p>');    
                            }
                            if(data.versions[i].file.uncompress.length>0){
                                _str.push('<p><a href="'+data.versions[i].file.uncompress+'">未压缩版</a></p></div></li>');  
                            }else{
                                _str.push('<p><span>未上传未压缩版</span></p></div></li>');    
                            }
                        }
                        
                        vsCtenr.html(_str.join(''));
                    }
                }else{
                    var vsCtenr = $('#versions');
                    if( vsCtenr instanceof jQuery && vsCtenr.length>0){
                        vsCtenr.html('<li>没有读取到更新日志记录！</li>');
                    }
                }
            }else{
               var vsCtenr = $('#versions');
                if( vsCtenr instanceof jQuery && vsCtenr.length>0){
                    vsCtenr.html('<li>没有读取到更新日志记录！</li>');
                } 
            }
        },
        error: function(data){
        	var vsCtenr = $('#versions');
            if( vsCtenr instanceof jQuery && vsCtenr.length>0){
            	vsCtenr.html('<li>没有读取到更新日志记录！</li>');
            }
        }
    });
});