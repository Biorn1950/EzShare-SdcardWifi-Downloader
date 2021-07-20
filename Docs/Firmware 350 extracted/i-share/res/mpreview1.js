// addEventListener("load", function(){setTimeout(hideURLbar, 0); }, false);
// function hideURLbar(){window.scrollTo(0, 1); }
function $(id)
{
   return document.getElementById(id);
}
var canvas = document.getElementById("bigimg");
var jsfnpre, jsfnnext, jspid, jsfn, jsftype;
var startx = 0, endx = 0;
var starty = 0, endy = 0;
function get2post(u)
{
   var r = u.indexOf('?');
   if(r < 0)
   {
      document.postform.action = u;
   }
   else
   {
      document.postform.action = u.slice(0, r);
      u = u.slice(r + 1);
      var a = u.split('&');
      for(l in a)
      {
         var s = a[l].split('=');
         var new_input = document.createElement("input");
         new_input.type = "hidden";
         new_input.name = s[0];
         new_input.value = s[1];
         document.postform.appendChild(new_input);
      }
   }
   document.postform.submit();
}
var doubleFig = false;
function touchStart(e)
{
	var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
	doubleFig = false;
	if(e.touches.length == 2)
	{
		doubleFig = true;
		return;
	}
    if(e.touches.length != 2)
    {
    	for (; i < l; i ++ )
    	{
    		touch = touches[i];
        	startx = touch.pageX;
        	starty = touch.pageY;
    	}
	}

}
function touchMove(e)
{
	var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
	if(e.touches.length == 2)
	{
		doubleFig = true;
		return;
	}
    if(e.touches.length != 2)
    {	
	    for (; i < l; i ++ )
	    {
	       touch = touches[i];
	       endx = touch.pageX;
	       endy = touch.pageY;
	    }
    }
}
function touchEnd(e)
{
    var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
    if(e.touches.length == 2)
	{
		//doubleFig = true;
		endx = startx;
      	endy = starty;
		return;
	}
    if((e.touches.length==0)&&!doubleFig)
    {
    	for (; i < l; i ++ )
   		{
      		touch = touches[i];
      		endx = touch.pageX;
      		endy = touch.pageY;
	        if(endx - startx > 100)
	        {
	        	//alert("111111111111jspid="+jspid+"jslhe="+jslhe);
	      	 	if(jslhe == 1)
	      	 	{
	      	 		jspid = (jspid - 1 < 1) ? 1 : (jspid - 1);
	      	 	}
	      	 	else
	      	 	{
	      	 		jslhe = (jslhe == 2) ? 0 : jslhe;
	      	 	}
	         	var url = jspreurl;//"mpreview?lhe="+jslhe+"&devw=" + jsdevw+ "&devh=" + jsdevh + "&fname=" + jsfnpre + "&fdir=" + jsfd + "&pid=" + jspid + "&ftype=" + jsftype + "&preCount=" + jspreCount + "&vtype=" + jsvtype;
	         	//alert(url);
	         	//get2post(url);
	         	window.location.href=url;
	      	}
	      	else
	      	if(startx - endx > 100)
	      	{
	      	 	//alert("2222222jspid="+jspid+"jslhe="+jslhe);
	      	 	if(jslhe == 2)
	      	 	{
	      	 		jspid = jspid + 1;
	      	 	}
	         	var url = jsnexturl;//"mpreview?lhe="+jslhe+"&devw=" + jsdevw+ "&devh=" + jsdevh + "&fname=" + jsfnnext + "&fdir=" + jsfd + "&pid=" + jspid + "&ftype=" + jsftype + "&preCount=" + jspreCount + "&vtype=" + jsvtype;
	         	//alert(url);
	         	//get2post(url);
	         	window.location.href=url;
	      	}
   		}
	}

}
function touchCancel(e)
{
    var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
    if(e.touches.length == 2)
	{
		//doubleFig = true;
		return;
	}
    if(e.touches.length == 2)
    {
    	for (; i < l; i ++ )
   		{
      		//endx = touch.pageX;
      		//endy = touch.pageY;
   		}
	}   
}

function getstureStart(e)
{
	doubleFig = true;
}
function getstureChange(e)
{
	doubleFig = true;
}
function getstureEnd(e)
{
	doubleFig = true;
}

var B = window.navigator.userAgent.toString().toLowerCase();
var D =
{
      isIpad:B.indexOf("ipad") >= 0, isTouch : B.indexOf("ipod") >= 0, isAndroid : B.indexOf("android") >= 0, isIphone : B.indexOf("iphone") >= 0, isIphoneAbove4 : B.search("iphone os [4-9]") != - 1, isNexus : B.indexOf("nexus") >= 0
}
;
if(D.isIphone || D.isIphoneAbove4 || D.isIpad || D.isTouch)
{
	canvas.addEventListener("gesturestart", getstureStart, false);
	canvas.addEventListener("gesturechange", getstureChange, false);
	canvas.addEventListener("gestureend", getstureEnd, false);
	canvas.addEventListener("touchstart", touchStart, false);
	canvas.addEventListener("touchmove", touchMove, false);
	canvas.addEventListener("touchend", touchEnd, false);
	canvas.addEventListener("touchCancel", touchCancel, false);
}
(function()
{
   
   function H()
   {
      var J =
      {
         width : 0, height : 0
      }
      ;
      if("onorientationchange" in window)
      {
         switch(window.orientation)
         {
            case 90 :
            case - 90 :
            	//alert("window.orientation="+window.orientation);
                if(D.isAndroid)
            	{
               		getHeight(569, 320);
            	}
            	else
            	{
            		getHeight(0, 0);
            	}
               J.width = 480;
               J.height = 268;
               break;
            case 0 :
            case 180 :
            //alert("window.orientation="+window.orientation);
               if(D.isAndroid)
            	{
               		getHeight(320, 569);
            	}
            	else
            	{
            		getHeight(0, 0);
            	}
               J.width = 320;
               J.height = 416;
               break;
            default :
         }
      }
      else if("orientation" in window)
      {
         switch(window.orientation)
         {
            case 90 :
            case - 90 :
            //alert("window.orientation="+window.orientation);
            getHeight(0, 0);
            break;
            case 0 :
            case 180 :
            //alert("window.orientation="+window.orientation);
            getHeight(0, 0);
            break;
            default :
         }
      }
      else
      {
         J.width = window.innerWidth;
         J.height = window.innerHeight;
         //alert("null window.orientation");
         getHeight(0, 0, 1);
      }
      return J
   }
   var I = [];
   var A = "onorientationchange" in window, F = A ? "orientationchange" : "resize";
   //alert( + [1, ]);
   if( + [1, ])
   {
      window.addEventListener(F, function()
      {
         var L = H();
      }
      , false);
   }
}
)();
