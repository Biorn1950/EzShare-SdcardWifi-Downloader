var canvas = document.getElementById("imgresults");
// var jspid, jsfn, jsftype, jspcount;
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
   // É¾³ý½Úµã
   var url = u;
   url = url.slice(url.indexOf('?') + 1);
   var a = url.split('&');
   for(l in a)
   {
      var s = a[l].split('=');
      var op = document.getElementById(s[0]);
      if(op != null)
      {
         document.postform.removeChild(op);
      }
   }
}
function touchStart(e)
{
   var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
   for (; i < l; i ++ )
   {
      touch = touches[i];
      startx = touch.pageX;
      starty = touch.pageY;
   }
}
function touchMove(e)
{
   var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
   for (; i < l; i ++ )
   {
      touch = touches[i];
      endx = touch.pageX;
      endy = touch.pageY;
   }
}
function touchEnd(e)
{
   var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
   for (; i < l; i ++ )
   {
      touch = touches[i];
      endx = touch.pageX;
      endy = touch.pageY;
      var absy = (endy > starty) ? (endy - starty) : starty - endy;      
      if(absy < 60)
      {
         if(endx - startx > 100)
         {
         	//alert(jspid);
            if(jspid > 1)
            {
               jspid = (jspid - 1 <= 1) ? 1 : (jspid - 1);
               var url = jsPrePage + "&pid=" + jspid;// + "&ajax=1";
               //get2post(url);
               //alert(url);
               //ajaxFunction(url, jspid);
               window.location.href=url;
            }
         }
         else
         if(startx - endx > 100)
         {
         	//alert(jspid+"=="+jspcount);
            if(jspid < jspcount)
            {
            	jspid = (jspid + 1) > jspcount ? jspcount : (jspid + 1);
                var url = jsNextPage + "&pid=" + jspid;// + "&ajax=1";
               //get2post(url);
               //alert(url, jspid);
               //ajaxFunction(url, jspid);
               window.location.href=url;
            }
         }
      }
   }
}
function touchCancel(e)
{
   var touches = e.changedTouches, i = 0, l = touches.length, touch, stack;
   for (; i < l; i ++ )
   {
      endx = touch.pageX;
      endy = touch.pageY;
   }
}
canvas.addEventListener("touchstart", touchStart, false);
canvas.addEventListener("touchmove", touchMove, false);
canvas.addEventListener("touchend", touchEnd, false);
canvas.addEventListener("touchCancel", touchCancel, false);

addEventListener("load", function()
{
   //setTimeout(hideURLbar, 0);
}
, false);
function hideURLbar()
{
   //window.scrollTo(0, 1);
}
(function()
{
   var B = window.navigator.userAgent.toString().toLowerCase();
   var D =
   {
      isAndroid : B.indexOf("android") >= 0, isIphone : B.indexOf("iphone") >= 0, isIphoneAbove4 : B.search("iphone os [4-9]") != - 1, isNexus : B.indexOf("nexus") >= 0
   }
   ;
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
            if(D.isAndroid)
            {
               updateView(569, 320);
            }
            else
            {
            	updateView(0, 0);
            }
            J.width = 480;
            J.height = 268;
            break;
            case 0 :
            case 180 :
            if(D.isAndroid)
            {
               updateView(320, 569);
            }
            else
            {
            	updateView(0, 0);
            }
               
            J.width = 320;
            J.height = 416;
            break;
            default :
            break;
         }
      }
      else if("orientation" in window)
      {
         switch(window.orientation)
         {
            case 90 :
            case - 90 :
            updateView(0, 0);
            break;
            case 0 :
            case 180 :
            updateView(0, 0);
            break;
            default :
         }
      }
      else
      {
         J.width = window.innerWidth;
         J.height = window.innerHeight;
         updateView(0, 0);
      }
      return J
   }
   var I = [];
   var A = "onorientationchange" in window, F = A ? "orientationchange" : "resize";
   window.addEventListener(F, function()
   {
      var L = H();
   }
   , false);
}
)();
