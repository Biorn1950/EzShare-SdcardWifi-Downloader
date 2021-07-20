var Tweener =
{
   easeNone : function(t, b, c, d)
   {
      return c * t / d + b;
   }
   ,
   easein : function(t, b, c, d)
   {
      return c * (t /= d) * t + b;
   }
   ,
   easeinout : function(t, b, c, d)
   {
      if (t < d / 2) return 2 * c * t * t / (d * d) + b;
      var ts = t - d / 2;
      return - 2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b;
   }
}
;
function $( id )
{
   return document.getElementById(id);
}
var list = $("imgList");
var imgs = list.getElementsByTagName("img");
var uagent = window.navigator.userAgent.toString().toLowerCase();
var iepx = (uagent.indexOf("msie 6") >= 0 || uagent.indexOf("msie 7") >= 0) ? 0 : 15;
var px = (list.clientHeight + iepx) / imgs.length;
//var listClientHeight = (list.clientHeight + iepx);
var PLHeight = px * 4;
var index = 1;
var selected = 2;
var selectPoint = 0;
var isok = false;
// 定位
var run;
$("slideNext").onclick = function ()
{
	if($("slideNext").className.indexOf("None") > 0)
	{
		return;
	}
    Nrun();
}
;
function nextNormal()
{
	$("slideNext").className = "nextNormal";
	$("slideNext").onmouseover = function ()
	{
	   this.className = "nextHover";
	}
	$("slideNext").onmouseout = function ()
	{
	   this.className = "nextNormal";
	}
}
function nextNone()
{
	$("slideNext").className = "nextNone";
	$("slideNext").onmouseover = function ()
	{
	   this.className = "nextNone";
	}
	$("slideNext").onmouseout = function ()
	{
	   this.className = "nextNone";
	}
}


$("slidePre").onclick = function ()
{
	if($("slidePre").className.indexOf("None") > 0)
	{
		return;
	}
    Prun();
}
;
function preNormal()
{
	$("slidePre").className = "preNormal";
	$("slidePre").onmouseover = function ()
	{
	   this.className = "preHover";
	}
	$("slidePre").onmouseout = function ()
	{
	   this.className = "preNormal";
	}
}
function preNone()
{
	$("slidePre").className = "preNone";
	$("slidePre").onmouseover = function ()
	{
	   this.className = "preNone";
	}
	$("slidePre").onmouseout = function ()
	{
	   this.className = "preNone";
	}
}

var init = imgInit();

// 上
function Prun( runc, actType)
{
   var b = list.style.marginTop ? parseInt(list.style.marginTop) : 0;
   var c = typeof runc == "number" ? runc : px ;
   var t = 0, ttl = 5, d = 1;
   clearInterval(run);
   if(imgs.length  < 1 && !isok)
   {
   		return;
   }
   
   if(!b && jspid > 1 && (typeof actType=="undefined"))
   {
   		var url="preview?ajax=1&startend=0&vtype="+jsvtype+"&fdir="+jsfd+"&pid="+(jspid-1>1?jspid-1:1)+"&devw="+jsdevw+"&devh="+jsdevh+"&allpage="+jscount + "&fname=" + jsfname;
        var myDate = new Date();
        url = url + "&time=" + myDate.getTime();
        ajaxFunction(url);
        jspid=jspid-1;
        list.style.marginTop = -2032+"px";
        
	    if(jspid < jscount)
	    {
	    	nextNormal();
	    }
        //document.getElementById("imgList").marginTop = 0+"px";
        //get2post(url);
   }
   if(b)run = setInterval(function ()
   {
   	  isok = false;
      var top = Tweener.easeinout(t, b, c, d);
      if(top >= 0)
      {
      	 //alert("jspid="+jspid+"----"+"actType="+actType);
         list.style.marginTop  = "0px";         
         if(jspid <= 1)
		 {
		     preNone();
		 }
		 isok = true;
         clearInterval(run);
         return;
      }
      list.style.marginTop  = top + "px";
      if(jspid < jscount || (list.clientHeight + iepx) - (top<0?-top:top) >= PLHeight)
	  {
		  nextNormal();
	  }
      if(t < d)
      {
         t ++ ;
      }
      else
      {
      	 isok = true;
         clearInterval(run);
      }
   }
   , ttl)
}
;
// 下
function Nrun( runc, actType )
{
	var b = list.style.marginTop ? - parseInt(list.style.marginTop) : 0;
    var c = typeof runc == "number" ? runc : px ;
    var d = 1;
    var t = 0, ttl = 5;
    if(imgs.length  < 1 && !isok)
    {
    	return;
    }
    if(imgs.length < 5)
    {
   		nextNone();
   		return;
    }
    clearInterval(run);
    if( jspid < jscount && b >= (list.clientHeight + iepx) - PLHeight)
	{
		//list.style.marginTop  = - (list.clientHeight + iepx) + PLHeight + "px";
	 	if(jspid + 1 <= jscount && (typeof actType=="undefined"))
	 	{
	 		var url="preview?ajax=1&startend=1&vtype="+jsvtype+"&fdir="+jsfd+"&pid="+(jspid+1>jscount?jscount:(jspid+1))+"&devw="+jsdevw+"&devh="+jsdevh+"&allpage="+jscount + "&fname=" + jsfname;
	 		//alert("Nrun"+url);
	 		var myDate = new Date();
	 		url = url + "&time=" + myDate.getTime();
	 		ajaxFunction(url);
	 		jspid=jspid+1;
	 		list.style.marginTop = 0+"px";
	 		
	        if(jspid > 1)
		    {
		        preNormal();
		    }
		    if((list.clientHeight + iepx) <= 505)
		    {
		    	nextNone();
		    }
	 		//get2post(url);
	 	}
	 	return;
	}
      
   run = setInterval(function ()
   {
   	  isok = false;
      var top = Tweener.easeinout(t, b, c, d);
      if(top >= (list.clientHeight + iepx) - PLHeight)
      {
      	list.style.marginTop  = - (list.clientHeight + iepx) + PLHeight + "px";
        clearInterval(run);
        isok = true;
        if((list.clientHeight + iepx) - ((list.clientHeight + iepx) + PLHeight) <= 555 && jspid>=jscount)
      	{
      		nextNone();
      	}
      	if((list.clientHeight + iepx) - PLHeight > 0)
      	{
      		preNormal();
      	}
        return;
      }
      list.style.marginTop  = - top + "px";
      var temp = list.style.marginTop ? - parseInt(list.style.marginTop) : 0;
      if((list.clientHeight + iepx) - temp <= 555 && jspid>=jscount)
      {
      	 nextNone();
      }
      if(jspid > 1 || temp > 0)
      {
      	  preNormal();
      }
      if(t < d)
      {
         t ++ ;
      }
      else
      {
      	 isok = true;
         clearInterval(run);
      }
   }
   , ttl)
}
;
function selectIndex()
{
	list = $("imgList");
	imgs = list.getElementsByTagName("img");
	iepx = window.navigator.userAgent.toString().toLowerCase().indexOf("msie 6") >= 0 ? 0 : 15;
	px = (list.clientHeight + iepx) / imgs.length;
	//(list.clientHeight + iepx) = list.clientHeight + iepx;
	PLHeight = px * 4;

	for(k = 1; k < imgs.length + 1; k ++ )
    {
    	if($("pn_" + k).className.indexOf("no") == - 1)
        {
      		//changePic();
      		//alert("pn_" + k);
      		//$("picName").innerHTML=imgs[k-1].getAttribute("title");
   			//$("picSize").innerHTML=imgs[k-1].getAttribute("size");
	      	//$("srcPic").src = "download" + imgs[k-1].getAttribute("rel");
	      	//alert($("srcPic").src);
	      	//$("zoomSrc").href = "download" + imgs[k-1].getAttribute("rel");
	      	
	      	var b = list.style.marginTop ? parseInt(list.style.marginTop) : 0;
	      	var runc = (imgs[k-1].name - selected) * px + b;
	      	// 需要滚动像素
	      	index = imgs[k-1].name;
	      	if(index > selected)
	      	{
	        	 Nrun( runc, 1);
	      	}
	      	if(runc < 0)
	      	{
	        	 Prun( Math.abs(runc), 1);
	      	}
	      	/*var img = new Image();
	      	img.onload=function()
			{
				
				//alert("OK!!!!!!!!!!!!!");
				$("img_load").src = "download" + imgs[k-1].getAttribute("rel");
				$("img_load").width=700;
				$("img_load").height=580;
				showPic($("img_load"), 700, 580);
				
			}
	      	img.src = "download" + imgs[k-1].getAttribute("rel");	      	
	      	//loadinit("download" + imgs[k-1].getAttribute("rel"))
	      	*/
      		break;
        }
    }
    showTips(jsfname);
}

function showTips(name)
{
    var B = window.navigator.userAgent.toString().toLowerCase();
    var D =
    {
    	isJPG:name.toLowerCase().indexOf(".jpg") >= 0, isIpad:B.indexOf("ipad") >= 0, isTouch : B.indexOf("ipod") >= 0, isAndroid : B.indexOf("android") >= 0, isIphone : B.indexOf("iphone") >= 0, isIphoneAbove4 : B.search("iphone os [4-9]") != - 1, isNexus : B.indexOf("nexus") >= 0
    }
    ;
    if((D.isIphone || D.isIphoneAbove4 || D.isTouch || D.isIpad) && D.isJPG )
    {
    	$("downloadpad").style.display="";
    	$("downloadpc").style.display="none";
    }
    else
    {
    	$("downloadpad").style.display="none";
   		$("downloadpc").style.display="";
    }
}

function changePic()
{
	//$("srcPic").width=0;
	//$("srcPic").height=0;
	//$("img_load").width=32;
	//$("img_load").height=32;
	//alert($("loading").width +"===="+$("loading").height);
}

var xmlHttp;
function GetXmlHttpObject()
{
    try
    {
        xmlHttp=new XMLHttpRequest();
    }
    catch (e)
    {
        try
        {
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function ajaxFunction(url)
{
	if(url == null)
	{
		var img = document.getElementById("srcPic");
		if((img.width == 0 || img.height == 0) && img != null)
		{
			//alert(img.width + "---" + img.height);
			showPic(img, 700, 580);
		}
		
		var currURL="preview?vtype="+jsvtype+"&fdir="+jsfd+"&pid="+jspid+"&devw="+jsdevw+"&devh="+jsdevh+"&allpage="+jscount + "&fname=" + jsfname;
		var myDate = new Date();
		url = currURL + "&ajax=1&time=" + myDate.getTime();
		selectPoint = 1;
	}
    xmlHttp=GetXmlHttpObject();
    //alert(\"get xmlhttp!!\");
    if(xmlHttp==null)
    {
        //alert("你的浏览不支持AJAX！");
        return;
    }
    //url = url + "&ssid=" + a;
    //alert("get url = " + url);
    //xmlHttp.setRequestHeader("Content-Type", "text/html;charset=GBK");
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function stateChanged()
{
    if (xmlHttp.readyState == 4)
    {
    	//alert(xmlHttp.status + "--" + xmlHttp.responseText);
    	if(xmlHttp.status == 200)
    	{
    		if($("imgList"))
    		{
    			while($("imgList").firstChild != null)
    			{
    				$("imgList").removeChild($("imgList").firstChild);
    			}
    		}
    		var index = xmlHttp.responseText.indexOf("<div");
    		if(index <= 0)
    		{
    			if(jsvtype>0)
    			{
    				alert("没有找到文件或者文件列表已刷新，建议返回浏览界面并刷新！");
    			}
    			else
    			{
    				alert("Not found the file or file list has been refreshed, suggest to back the main page and refresh!");
    			}
    			var url="photo?vtype="+jsvtype+"&fdir="+jsfd+"&devw="+jsdevw+"&devh="+jsdevh;
    			window.location.href=url;
    			return;
    		}
    		var lastIndex = xmlHttp.responseText.indexOf("</body>");
			document.getElementById("imgList").innerHTML=xmlHttp.responseText.substr(index, lastIndex - index);
			//var mytext = xmlHttp.responseText.substr(index, lastIndex - index);
			//alert(mytext);
			//var xx = new GB2312UTF8();
			//var Gb2312 = xx.Utf8ToGb2312(mytext);
			//alert(Gb2312);
    	}
        imgInit();
        if(selectPoint == 1)
        {
        	selectIndex();
        	selectPoint = 0;
    	}
        if(imgs.length < 5 && jspid>=jscount)
      	{
      	 	nextNone();
      	}
    }
}

function imgInit()
{
	for(i = 0; i < imgs.length; i ++ )
	{
		if(imgs[i] == null)
		{
			return;
		}
   		imgs[i].onclick = function ()
   		{
   			if($("picName").innerHTML == this.getAttribute("title"))
   			{
   				$("pn_" + this.name).className == "select";
   				return;
   			}
   			   			
   			var url="preview?vtype="+jsvtype+"&fdir="+jsfd+"&pid="+jspid+"&devw="+jsdevw+"&devh="+jsdevh+"&allpage="+jscount + "&fname=" + this.getAttribute("title");
   			get2post(url);
   			if(true)
   			{
   				return;
   			}
   			
   	  		changePic();
   	  		if(jsvtype == 0)
   	  		{
   	  			$("backphoto").innerHTML="";
   	  			$("backphoto").innerHTML="<a href=\"photo?fdir="+jsfd+"&pid="+jspid+"&devw="+jsdevw+"&devh="+jsdevh+"&vtype="+jsvtype+"\">Back</a>";
   	  		}
   	  		else
   	  		{
   	  			$("backphoto").innerHTML="";
   	  			$("backphoto").innerHTML="<a href=\"photo?fdir="+jsfd+"&pid="+jspid+"&devw="+jsdevw+"&devh="+jsdevh+"&vtype="+jsvtype+"\">返回</a>";
   	  		}
   	  		$("picName").innerHTML=this.getAttribute("title");
   	  		$("picSize").innerHTML=this.getAttribute("size");
   	  		if(this.getAttribute("title").toLowerCase().indexOf(".jpg") < 0)
   	  		{
   	  			$("srcPic").src = "thumbnail" + this.getAttribute("rel")+"&isFail=1";
   	  		}
   	  		else
   	  		{
      			$("srcPic").src = "download" + this.getAttribute("rel");
      		}
      		$("zoomSrc").href = "download" + this.getAttribute("rel");
      		//showTips(this.getAttribute("title"));
      		for(k = 1; k < imgs.length + 1; k ++ )
      		{
         		if(k == this.name)
         		{
            		$("pn_" + k).className = "select";
         		}
         		else
         		{
            		$("pn_" + k).className = "noselect";
         		}
      		}
      		var b = list.style.marginTop ? parseInt(list.style.marginTop) : 0;
      		var runc = (this.name - selected) * px + b;
      		// 需要滚动像素
      		index = this.name;
      		if(index > selected)
      		{
        		Nrun( runc, 1);
      		}
      		if(runc < 0)
      		{
        		Prun( Math.abs(runc), 1);
      		}
   		}
	}
}