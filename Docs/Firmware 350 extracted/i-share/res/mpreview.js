function $(id)
{
   return document.getElementById(id);
}
function tag(t)
{
   return document.getElementsByTagName(t);
}
var B = window.navigator.userAgent.toString().toLowerCase();
//var ImgD = new Image();
var ImgD;//=document.createElement("img"); 
//alert(B);
var D =
{
   isIpad:B.indexOf("ipad") >= 0, isTouch : B.indexOf("ipod") >= 0, isAndroid : B.indexOf("android") >= 0, isIphone : B.indexOf("iphone") >= 0, isIphoneAbove4 : B.search("iphone os [4-9]") != - 1, isNexus : B.indexOf("nexus") >= 0
}
;
var st;//timer
var orgw = 0;
var orgh = 0;
if(B.indexOf("msie") > 0)
{
	window.onresize = function(){getHeight(0, 0);}
}
function getPageSize()
{
   var xScroll, yScroll;
   //alert(xScroll +"=00="+yScroll);

   if (window.innerHeight && window.scrollMaxY)
   {
      xScroll = document.body.scrollWidth;
      yScroll = window.innerHeight + window.scrollMaxY;
      //alert(xScroll +"=1="+yScroll);
   }
   else if (document.body.scrollHeight > document.body.offsetHeight)
   {
      // all but Explorer Mac
      xScroll = document.body.scrollWidth;
      yScroll = document.body.scrollHeight;
      //alert(xScroll +"=2="+yScroll);
   }
   else
   {
      // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = document.body.offsetWidth;
      yScroll = document.body.offsetHeight;
      //alert(xScroll +"=3="+yScroll);
   }

   var windowWidth, windowHeight;
   if (self.innerHeight)
   {
      // all except Explorer
      windowWidth = self.innerWidth;
      windowHeight = self.innerHeight;
      //alert(windowWidth +"*1*"+windowHeight);
   }
   else if (document.documentElement && document.documentElement.clientHeight)
   {
      // Explorer 6 Strict Mode
      windowWidth = document.documentElement.clientWidth;
      windowHeight = document.documentElement.clientHeight;
      //alert(windowWidth +"*2*"+windowHeight);
   }
   else if (document.body)
   {
      // other Explorers
      windowWidth = document.body.clientWidth;
      windowHeight = document.body.clientHeight;
      //alert(windowWidth +"*3*"+windowHeight);
   }

   // for small pages with total height less then height of the viewport
   if(yScroll < windowHeight)
   {
      pageHeight = windowHeight;
   }
   else
   {
      pageHeight = yScroll;
   }

   // for small pages with total width less then width of the viewport
   if(xScroll < windowWidth)
   {
      pageWidth = windowWidth;
   }
   else
   {
      pageWidth = xScroll;
   }

   arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
   //alert("<br>pageWidth, pageHeight, windowWidth, windowHeight : "+arrayPageSize);
   //getPageScroll();
   return arrayPageSize;
}

function getViewHeight()
{
   var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
   return A.clientHeight
   //var h = getPageSize();
   //return h[3];
}

function getViewWidth()
{
   var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
   return A.clientWidth
   //var w = getPageSize();
   //return w[2];
}

function updateView()
{
	//alert(getViewHeight()+"=="+getViewWidth()+"=="+windowHeight1()+"=="+windowWidth1());
	//if(w == 0 || h == 0)
	{
		w = getViewWidth();//document.body.clientWidth;
		h = getViewHeight();//document.body.clientHeight;
	}

	if(D.isAndroid)
	{
		switch(window.orientation)
		{
		case 90 :
		case - 90 :
		   orgw = 470;
		   orgh = 208;
		   break;
		case 0 :
		case 180 :
		   orgw = 310;
		   orgh = 350;
		   break;
		default :
		}
		
		if(w < orgw)
		{
			//alert(w+"=="+h+"---"+window.orientation);
			w = orgw;
			h = orgh;
		}
	}
	$("panel").style.width = w+"px";
	$("panel").style.height = h+"px";
	$("bigimg").style.height = h+"px";
	$("header").style.width = w+"px";
	$("footer").style.width = w+"px";
	$("footer").style.top = h - 40+"px";
	$("footer").style.bottom = 0+"px";
	
	//alert(B+"--"+w+"--"+h);
	if($("img_load") != null)
	{
	   $("img_load").width=32;
	   $("img_load").height=32;
	   $("img_load").style.marginTop = (h - $("img_load").height) / 2 + "px";
	   $("img_load").style.marginBottom = (h - $("img_load").height) / 2 + "px";
	}
	
	if($("img_src") != null)
	{
		var image = $("img_src");
		reSize(image, w, h);
	   	image.style.marginTop = (h - image.height) / 2 + "px";
	   	image.style.marginBottom = (h - image.height) / 2 + "px";
	   	//alert(h +":"+ image.height+":"+image.style.marginTop+":--getHeight--:"+image.style.marginBottom);
	}
}
function getHeight(w, h, atype)
{
	setTimeout(updateView, 500);
}

function showTips()
{
	if(jsimgurl.toLowerCase().indexOf(".jpg") >= 0 && (D.isIphone || D.isIphoneAbove4 || D.isTouch || D.isIpad))
    {
    	$("showtip").style.display="";
		$("showtip").style.visibility = "visible";
		$("showtip").style.zIndex="50";
    }
    else
    {
   		$("showtip").style.display="none";
		$("showtip").style.visibility = "hidden";
    }
}

function loadimg()
{
	ImgD = document.createElement("img");  
	//var url = "mpreview?lhe="+jslhe+"&devw=" + jsdevw+ "&devh=" + jsdevh + "&fname=" + jsfnpre + "&fdir=" + jsfd + "&pid=" + jspid + "&ftype=" + jsftype + "&preCount=" + jspreCount + "&vtype=" + jsvtype;
	//alert(url);
	//get2post(url);
	/*
	if(img.complete)
	{
		if(true)//!D.isAndroid)
		{
			document.getElementById('img').style.display="none";
			//$("img").innerHTML="";   
			$("img").removeChild($("img_load"));
			var image=document.createElement("img");    
			image.src=jsimgurl;
			image.id="img_src";		
			document.getElementById("img").appendChild(image);
			$("img").style.display="block";
			reSize(image);
			getHeight();
		}
		else
		{
			//showPic(img, 320, 320);
		}
	}
	else*/
	{
		ImgD.onload=function()
		{
			if(true)//!D.isAndroid)
			{
				//alert("onload loading over ---");
				//showPic(img, 320, 320);
				//document.getElementById("imgparent").style.display="none";
				//$("bigimg").innerHTML="";   
				//$("bigimg").removeChild($("img_load"));
				//var image=document.createElement("img");    
				//image.src=ImgD.src;
				ImgD.id="img_src";	
				//ImgD.id="img_src";
				document.getElementById("imgparent").appendChild(ImgD);
				$("bigimg").style.display="block";
				$("img_src").style.borderWidth="0";
				reSize($("img_src"), document.body.clientWidth, document.body.clientHeight);
				getHeight();
				showTips();
				if(st)
				{
					clearTimeout(st);
				}
				st = setTimeout("showfooter(1)", 5000);
				addFunction();
			}
			else
			{
				//showPic(img, 320, 320);
			}
			//alert(image.width+"--onload function--"+image.height);
			//$("img_src").style.webkitTransitionProperty = 'left';
	        //$("img_src").style.webkitTransitionDuration = '2s';
			//setTimeout(css, 10)
		}
		ImgD.onerror=function()
		{
			ImgD.src = "i-share/img/loaderror.jpg"
			//showPic(img, 320, 320);
		}
	}
	ImgD.src = jsimgurl;
	//alert("loading over ---"+jsimgurl);
}

function addFunction()
{
	var ddiv =  $("img_src");
    if(B.indexOf("msie") < 0)
    {
    	ddiv.addEventListener("click", function()
	    {
	    	showfooter(1);
	   		stopEvent(event, 1);
	    }, false);
	    var navPre =  $("navPre");
	    navPre.addEventListener("click", function()
	    {
	    	if(typeof(jspreurl)!="undefined")
	    	{
		   		get2post(jspreurl);
		   		stopEvent(event, 1);
	   		}
	    }, false);
	    var navNext =  $("navNext");
	    navNext.addEventListener("click", function()
	    {
	    	if(typeof(jsnexturl)!="undefined")
	    	{
	   			get2post(jsnexturl);
	   			stopEvent(event, 1);
	   		}
	    }, false);
	 }
	 else
	 {
	 	ddiv.attachEvent("onclick", function()
		{
			showfooter(1);
			stopEvent(window.event, 0);
		});
		var navPre =  $("navPre");
	    navPre.attachEvent("click", function()
	    {
	    	if(typeof(jspreurl)!="undefined")
	    	{
	   			get2post(jspreurl);
	   			stopEvent(window.event, 0);
	   		}
	    });
	    var navNext =  $("navNext");
	    navNext.attachEvent("click", function()
	    {
	    	if(typeof(jsnexturl)!="undefined")
	    	{
	   			get2post(jsnexturl);
	   			stopEvent(window.event, 0);
	   		}
	    });
	}
}

window.onload = function()
{
	$("panel").style.width = getViewWidth()+"px";
	$("panel").style.height = getViewHeight()+"px";
	$("bigimg").style.height = getViewHeight()+"px";
	//alert(getViewHeight()+"---"+B+"--"+getPageSize());
   	loadimg();
}

function stopEvent(e, btype)
{
	if(btype)
	{
		e.stopPropagation();
		e.preventDefault();
	}
	else
	{
		e.cancelBubble = true;
	}
}

function showfooter(obj)
{
	if(obj == 1)
	{
		var disp = $("footer").style.display;
		var height = $("footer").offsetHeight;
		if(disp == "none" || height <= 0)
		{
			$("nextimg").style.height=32+"px";
			$("navNext").style.height=32+"px";
			$("previmg").style.height=32+"px";
			$("navPre").style.height=32+"px";

			$("footer").style.height=40+"px";
			$("footer").style.display="";
			
			$("vieworig").style.height=25+"px";
			
			$("header").style.display = "";
			$("header").style.height=36+"px";
			$("header").style.zIndex="50";
			
			$("bigimg").style.zIndex="100";
			$("bigimg").style.zIndex="-1";
			if(st)
			{
				clearTimeout(st);
			}
			st = setTimeout("showfooter(1)", 5000);
		}
		else
		{
			if(st)
			{
				clearTimeout(st);
			}
			
			$("nextimg").style.height=0+"px";
			$("navNext").style.height=0+"px";
			$("previmg").style.height=0+"px";
			$("navPre").style.height=0+"px";

			$("footer").style.height=0+"px";
			$("footer").style.display="none";

			$("header").style.zIndex="-10";
		}
	}
}

function reSize(srcimg, iwidth, iheight)
{
	if(srcimg.width==0||srcimg.height==0)
    {
    	srcimg.width=document.body.clientWidth;
   		srcimg.height=document.body.clientHeight;
	}
	var image=new Image();
	image.src=srcimg.src;
	if(image.width == 0)
	{
		image.width=(srcimg.naturalWidth==0 || (typeof srcimg.naturalWidth=="undefined"))?ImgD.width:srcimg.naturalWidth;
		image.height=(srcimg.naturalHeight==0 || (typeof srcimg.naturalWidth=="undefined"))?ImgD.height:srcimg.naturalHeight;
	}
	if(image.width>0 && image.height>0)
	{
		flag=true;
		if(image.width/image.height>= iwidth/iheight)
		{
			if(image.width>iwidth)
			{
				srcimg.width=iwidth;
				srcimg.height=(image.height*iwidth)/image.width;
			}
			else
			{
				srcimg.width=image.width; 
				srcimg.height=image.height;
			}
			srcimg.alt=image.width+"¡Á"+image.height;
		}
		else
		{
			if(image.height>iheight)
			{
				srcimg.height=iheight;
				srcimg.width=(image.width*iheight)/image.height; 
			}
			else
			{
				srcimg.width=image.width; 
				srcimg.height=image.height;
			}
			srcimg.alt=image.width+"¡Á"+image.height;
		}
	}
    //alert(srcimg.width+":---:"+srcimg.height);//getHeight();
}