var bw, bh;

function photo()
{
	//获取页面宽高
    var tempw=getViewWidth();
    var temph=getViewHeight();
	var myDate = new Date();
	var zone = myDate.getTimezoneOffset()/60*(-1);
	var url="sendurl?welcome=1&devw="+tempw+"&devh="+temph+"&tzone="+zone;
	window.location.href=url;
}


function getViewHeight()
{
   var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
   return A.clientHeight
}

function getViewWidth()
{
   var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
   return A.clientWidth
}
