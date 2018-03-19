



//时间格式插件

function formatCSTDate(strDate, format){
	return formatDate(new Date(strDate),format)
}

function formatDate (date, format) {
	var paddNum = function (num) {
		num += ''
		return num.replace(/^(\d)$/,'0$1');
	}
	
	var cfg = {
		yyyy : date.getFullYear(),
		yy : date.getFullYear().toString().substring(2),
		M : date.getMonth() + 1,
		MM : paddNum(date.getMonth() + 1),
		d : date.getDate(),
		dd : paddNum(date.getDate()),
		hh : date.getHours(),
		mm : date.getMinutes(),
		ss : date.getSeconds()
	}
	format || (format = 'yyyy-MM-dd hh:mm:ss');
	return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m]})
}
//alert(formatDate((new Date()), "yyyy-MM-dd"))