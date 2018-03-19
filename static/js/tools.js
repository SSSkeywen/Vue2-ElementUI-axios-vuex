var tools = function(){
   return{
    /**
     *
     * 共用AJAX
     *
     * @param:url
     * @param:data
     * @param:type
     * @param:dataType
     × @return: result 
     */
     ajaxComm:function(url,data,type,dataType){
//   	debugger;
            var result;
            //var rand = Math.random();
            $.ajax({
                url :url,
                async : false,
                type : type,
                data : data,
                dataType : dataType,
                timeout : 60000,
                success : function(data) {
                    result=data;
                },
                error : function(data) {
                	alert("尊敬的用户，数据请求失败，请刷新后重试!");
                } 
            }); 
            return result;
        },
        ajaxAsyncComm:function(url,data,type,dataType,func){
            var result;
            //var rand = Math.random();
            $.ajax({
                url :url,
                async : true,
                type : type,
                data : data,
                dataType : dataType,
                timeout : 600000,
                success : function(data) {
                    result=data;
                	func(data);
                },
                error : function(data) {
                	alert("尊敬的用户，数据请求失败，请刷新后重试!");
                } 
            }); 
            return result;
        },
    /**
     * 去除字符串中所有的空格
     *
     * @param:str
     × @return: str 
     */
    trim:function(str){
        return str.replace(/\s+/g,"");
    },
    /**
     * 去除字符串左右两边的空格
     *
     * @param:str
     × @return: str 
     */
    trimLR:function(str){
        if ((typeof(str) != "string") || !str){
                return "";
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");  
    },
    /**
     * 输入的字符只允许输入数字
     *
     * @param:str
     × @return: str 
     */
    inputWordsAllowNumber:function(obj){
       $(obj).val($(obj).val().replace(/[^\d]/g,""));
    },
       /**
		* 数据验证
		×
	    * @param
		* @return
		*/
	    validate:function(valConfig){
	         var result = "";
	         //保存验证信息的数组
	         var messages=new Array();
	         //把验证配置数据转换为JSON对象
	         var _objs= eval("("+valConfig+")");
	         //验证
	         for(var i=0;i< _objs.length;i++){
	             //非空验证
	             if(!$TOOLS.validateNull(_objs[i])){ 
	                 result = _objs[i].label+"不能为空！";
	                 return result;
	             }
	             //格式验证
	             if(!$TOOLS.validateFormat(_objs[i])){
	                 result =_objs[i].label+"格式有误！";
	                 return result;
	             }
	             //格式验证
	             if(!$TOOLS.validateMaxCount(_objs[i])){
	                 result =_objs[i].label+"的值不能超过"+_objs[i].maxCount+"字";
	                 return result;
	             }
	         }
	         return result;
	    },
      /**
        * 非空验证
		×
	    * @param
		* @return
		*/
	    validateNull:function(_obj){
	       var resultFlag = true;
		   if(_obj.required){
		      if($TOOLS.trimLR($("[name='"+_obj.name+"']").val())==""){
		          resultFlag = false;
		      }
		      if(typeof(_obj.tip)!="undefined"&&$TOOLS.trimLR($("[name='"+_obj.name+"']").val())==_obj.tip){
		          resultFlag = false;
		      }
		   }
		   return resultFlag;
	    },
	   /**
		* 格式验证
		×
	    * @param
		* @return
		*/
	    validateFormat:function(_obj){
	        var resultFlag = true;
	        if(typeof(_obj.format)!="undefined"){
	            //允许为空(但要验证数据格式)
		        if($TOOLS.trim($("[name='"+_obj.name+"']").val())==""){
		            return resultFlag;
		        }
                switch(_obj.format){
                  //手机格式验证
                  case "mobilephone":
                      var regex =/^1\d{10}$/;
                      if(!regex.exec($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }
                  break;
                  //电话号码验证
                  case "telephone":
                      var regex = /^((0\d{2,3})-)(\d{7,8})$/;
                      if(!regex.test($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }
                      break;
                  //数字验证
                  case "number":
                      var regex = /^(\d{1,2})$/;
                      if(!regex.test($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }
                      break;
                      
                  //验证注册用户名
                  case "zcusername":
  					var regex = /^(?![0-9]+$)[a-zA-Z_]+[0-9A-Za-z]{4,30}$/
  					 if(!regex.test($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }                
                  	  break;
                 //验证注册是密码
                 case "zcuaserpassword":
                 	var regex =  /^(?![^a-zA-Z]+$)(?!\D+$)(?![a-zA-Z0-9]+$).{8,20}$/  ;
                 	if(!regex.test($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }     
                 break;
                  //邮编验证
                  case "zipcode":
                      var regex = /^[0-9]{6}$/;
                      if(!regex.exec($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                         resultFlag = false;
                      }
                  break;
                 //身份证验证
                  case "identityCard":
                        code = $("[name='"+_obj.name+"']").val().toUpperCase();
                        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
			            if( code.length==18){
	                     	if(!city[code.substr(0,2)]){
				               resultFlag = false;
				               return;
				            }
			                //18位身份证需要验证最后一位校验位
			                if(code.length == 18){
					            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
					               resultFlag = false;
					               return;
					            }
			                    code = code.split('');
			                    //∑(ai?áWi)(mod 11)
			                    //加权因子
			                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			                    //校验位
			                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			                    var sum = 0;
			                    var ai = 0;
			                    var wi = 0;
			                    for (var i = 0; i < 17; i++)
			                    {
			                        ai = code[i];
			                        wi = factor[i];
			                        sum += ai * wi;
			                    }
			                    var last = parity[sum % 11];
			                    if(parity[sum % 11] != code[17]){
			                        resultFlag = false;
			                    }
			                }
			            }else{
			            	return ;
			            }
                  break;
                  //身份证验证
                  case "useridentityCard":
                	  code = $("[name='"+_obj.name+"']").val().toUpperCase();
                      var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
			            if(code.length==18){
	                     	if(!city[code.substr(0,2)]){
				               resultFlag = false;
				               return;
				            }
			                //18位身份证需要验证最后一位校验位
			                if(code.length == 18){
					            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
					               resultFlag = false;
					               return;
					            }
			                    code = code.split('');
			                    //∑(ai?¨￠Wi)(mod 11)
			                    //加权因子
			                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			                    //校验位
			                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			                    var sum = 0;
			                    var ai = 0;
			                    var wi = 0;
			                    for (var i = 0; i < 17; i++)
			                    {
			                        ai = code[i];
			                        wi = factor[i];
			                        sum += ai * wi;
			                    }
			                    var last = parity[sum % 11];
			                    if(parity[sum % 11] != code[17]){
			                        resultFlag = false;
			                    }
			                }
			            }else{
			            	resultFlag = false;
			            }
                break;
                //邮箱验证
                case "email":
                    var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
                    if(!regex.exec($TOOLS.trim($("[name='"+_obj.name+"']").val()))){
                       resultFlag = false;
                    }
                  break;
                  //验证业务员id
                  case "operNo":
                   	var reg=/^[A-Za-z0-9]{11}$/;
			        if(!reg.test($("[name='"+_obj.name+"']").val())){
			         resultFlag= false;
			        }
                  break;
                  //验证红包激活码
			      case "hbjh":
			         var v=/^[A-Za-z0-9]{12}$/;
			         if(!v.test($("[name='"+_obj.name+"']").val())){
			          resultFlag= false;
			         }
			       break;

			      case "yzbe":
			      	var reg=/^[0-9]*$/;
			      	if(!reg.test($("[name='"+_obj.name+"']").val())){
			      		resultFlag= false;
			      	}
			      	break;
			      ;
			      case "lbtyzbe":
//			    	  	var reg=/^\d+(\.\d{1,1})$/;
			    	  var reg=/^\d*\.?\d{0,1}$/;
//				      	var reg=/^[0-9]+([.][0-9]{1}){0,1}$/;
				      	if(!reg.test($("[name='"+_obj.name+"']").val())){
				      		resultFlag= false;
				      	}
				      	break;
				      ;
			      //验证银行卡号
			      case "yzyhkh":
			      	 var reg2 = /^([0-9]{1,19})?$/;
			      	 if(!reg2.test($("[name='"+_obj.name+"']").val())){
			          resultFlag= false;
			      }
			      break;
                  //验证业务员姓名
                  case "operName":
			        var val=$("[name='"+_obj.name+"']").val();
			        var reg=/^[\u4e00-\u9fa5][\u4e00-\u9fa5\·]+$/;
			        if(!reg.test(val)){
			         resultFlag= false;
			        }
                  break;
                //最新姓名规范
                  case "nameRule":
			        var vals=$("[name='"+_obj.name+"']").val();
			        var reg=/^[A-Za-z0-9_\u4e00-\u9fa5][A-Za-z0-9_\u4e00-\u9fa5\·]+$/;
			        if(!reg.test(vals)){
			         resultFlag= false;
			        }
                  break;
                }
             }
	      return resultFlag;
	    },
	   /**
		* 文本输入框最大数验证
		×
	    * @param
		* @return
		*/
	    validateMaxCount:function(_obj){
	        var resultFlag = true;
	        if(typeof(_obj.maxCount)!="undefined"){
	            //允许为空
		        if($TOOLS.trim($("[name='"+_obj.name+"']").val())==""){
		            return resultFlag;
		        }
	            var value = $TOOLS.trimLR($("[name='"+_obj.name+"']").val());
	            var maxCount = parseInt(_obj.maxCount);
		        if(value.length>maxCount){
		            resultFlag = false;
		        }
             }
	      return resultFlag;
	    },
	   //操作复选框（根复选框和节点复选框互相操作）
	   opeCheckbox:function(_rootName,_nodeName){
		    $("input[name='"+_rootName+"']").bind("click",function(){
		         $("input[name='"+_nodeName+"']").each(function(){
		               $(this).prop("checked", $("input[name='"+_rootName+"']").prop("checked"));
		         });
		    })
		    $("input[name='"+_nodeName+"']").each(function(){
		        $(this).bind("click",function(){
		            var flag = true;
		            $("input[name='"+_nodeName+"']").each(function(){
		                  if(!$(this).prop("checked")){
		                      flag = false;
		                      return;
		                  }
		            });
		            $("input[name='"+_rootName+"']").prop("checked",flag);
		        })
		    });
	   },
	   //复选框实现单选效果
	   checkboxTransformRadio:function(_names){
	   /*
	      for(var i=0;i<_names.length;i++){
	           var _name = _names[i];
		       $("input[name = '"+_name+"']").each(function () {
			         $(this).bind("click",function(){
			              if($(this).prop("checked")){
			                  $("input[name = '"+_name+"']").each(function () {
	                               $(this).prop("checked",false);
			                  })
			                  $(this).prop("checked",true);
			              }
			         })	
				})
	      }*/
	   
	   },
	      //Url中是否存在某个参数
	isExistParamOfUrl:function(paramName) {
		var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r == null) {
			return false;
		}
		return true;
	},
      //删除某个参数
	getDelParamOfUrl:function(url, ref) {
		var str = "";
		if (url.indexOf("?") != -1) {
			str = url.substr(url.indexOf("?") + 1);
		} else {
			return url;
		}
		var arr = "";
		var returnurl = "";
		var setparam = "";
		if (str.indexOf("&") != -1) {
			arr = str.split("&");
			for (i in arr) {
				if (arr[i].split("=")[0] != ref) {
					returnurl = returnurl + arr[i].split("=")[0] + "=" + arr[i].split("=")[1] + "&";
				}
			}
			return url.substr(0, url.indexOf("?")) + "?" + returnurl.substr(0, returnurl.length - 1);
		} else {
			arr = str.split("=");
			if (arr[0] == ref) {
				return url.substr(0, url.indexOf("?"));
			} else {
				return url;
			}
		}
	},
        //获取指定参数名的参数值
		getQueryParameter:function(qs)
		{
		    var s = location.href;
		    s = s.replace("?","?&").split("&");//这样可以保证第一个参数也能分出来
		    var re = "";
		    for(i=1;i<s.length;i++)
		        if(s[i].indexOf(qs+"=")==0)
		            re = s[i].replace(qs+"=","");//取代前面的参数名，只剩下参数值

		    return re;
		},
		// 隐藏微信tabbar
		hideOptionMenu:function()
		{
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
				WeixinJSBridge.call('hideOptionMenu');
			});
		},
		
		// 显示tabbar
		showOptionMenu:function()
		{
			document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
				WeixinJSBridge.call('showOptionMenu');
			});
		}
		
   }
}();
window.$TOOLS=tools;