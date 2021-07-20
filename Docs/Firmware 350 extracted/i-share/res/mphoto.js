function $(id)
{
   return document.getElementById(id);
}

function checkAllPic()
{
	var id = 1;
   	for(id=1; id <= jsCurrCount; id++)
   	{
   		var imgid = "img"+id;
   		var img = $(imgid);
   		if(img != null && (img.width == 0 || img.height == 0))
   		{
   			//showPic(img, 100, 75, 75, imgid);
   		}
   	}
}

function updateView(w,h)
{   
   if(w == 0 || h == 0)
   {
   		w = getViewWidth();
  	    h = getViewHeight();
	}
	//checkAllPic();
	setTimeout(review,500);
}
function review()
{
	var w = getViewWidth();
	var imgH;
	
	$("imgresults").style.width = ((w < 320) ? 320 : w) + "px";
	var lie = parseInt(w/102);
    var hang = Math.ceil(jsCurrCount/lie);//jsPreCount/lie + (jsPreCount%lie > 0 ? 1 : 0); 
    imgH = hang * 77 + 5;
    
    $("imgresults").style.height = imgH + "px";    
    
    if($("searchpre") != null)
    {
		$("searchpre").style.width = (w - 30) + "px";
   		$("searchSuggest").style.width = (w - 90) + "px";
	}
	//$("pagenav").style.top = imgH + "px";   
    //$("footer").style.top = (imgH + 94) + "px";
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

var B = window.navigator.userAgent.toString().toLowerCase();
if(B.indexOf("msie") > 0)
{
	window.onresize = function(){updateView(0, 0);}
}

function showPic(img, iwidth, iheight, divH, id)
{
	var israw = img.getAttribute("israw");
   if(img.height > img.width && israw != null && israw != 1)
   {
   		var nokia = B.indexOf("symbian");
   		var sonyericssonx10i = B.indexOf("x10i");
	    var ie = B.indexOf("msie");
	    if(ie > 0 || sonyericssonx10i > 0 || nokia > 0)
	    {
	    	scaleImg(img, iwidth, iheight, divH);
	  		return;
	    }
	    rotate(img, iheight, iwidth, divH);
	    return;
   }
   scaleImg(img, iwidth, iheight, divH);
}

function scaleImg(img, iwidth, iheight, divH)
{
   var image = new Image();
   image.src = img.src;
   if(B.indexOf("safari") >= 0)
   {
	  	image.width=(img.naturalWidth==0 || (typeof img.naturalWidth=="undefined"))?image.width:img.naturalWidth;
	    image.height=(img.naturalHeight==0 || (typeof img.naturalWidth=="undefined"))?image.height:img.naturalHeight;
   }
   if(image.width <= 0 || image.height <= 0)
   {
   		image.width = (img.width == 0) ? 100 : img.width;
   		image.height = (img.height == 0) ? 75 : img.height;
   }
   if(image.width / image.height >= iwidth / iheight)
   {
      if(image.width > iwidth)
      {
         img.width = iwidth;
         img.height = (image.height * iwidth) / image.width;
      }
      else
      {
         img.width = image.width;
         img.height = image.height;
      }
   }
   else
   {
      if(image.height > iheight)
      {
         img.height = iheight;
         img.width = (image.width * iheight) / image.height;
      }
      else
      {
         img.width = image.width ;
         img.height = image.height;
      }
   }
   img.style.marginTop = (divH - img.height) + "px";
}

function rotate(img, iwidth, iheight, divH)
{
   var image = new Image();
   image.src = img.src;
   if(B.indexOf("safari") >= 0)
   {
   		image.width=(img.naturalWidth==0 || (typeof img.naturalWidth=="undefined"))?image.width:img.naturalWidth;
	    image.height=(img.naturalHeight==0 || (typeof img.naturalWidth=="undefined"))?image.height:img.naturalHeight;
   }
   if(image.width <= 0 || image.height <= 0)
   {
   		image.width = img.width == 0 ? 100:img.width;
   		image.height = img.height == 0 ? 75 : img.height;
   }
  
   var canW, canH;
   if(image.width / image.height >= iwidth / iheight)
   {
      var tempW, tempH;
      if(image.width > iwidth)
      {
         tempW = iwidth;
         tempH = (image.height * iwidth) / image.width;
      }
      else
      {
         tempW = image.width;
         tempH = image.height;
      }
      canW = tempH;
      canH = tempW;
   }
   else
   {
      if(image.height > iheight)
      {
         canW = iheight;
         canH = (image.width * iheight) / image.height;
      }
      else
      {
         canW = image.width ;
         canH = image.height;
      }
   }
   var id = img.id;
   var c = document.getElementById('canvas_' + id);
   if(c == null)
   {
      img.style.visibility = 'hidden';
      img.style.position = 'absolute';
      c = document.createElement('canvas');
      c.setAttribute("id", 'canvas_' + id);
      img.parentNode.appendChild(c);
   }
   
   var canvasContext = c.getContext('2d');
   //alert(canvasContext+"==="+canW + "===" + canH + "---" + canW / img.height + "===" + canH / img.width);
   c.setAttribute('width', canW);
   c.setAttribute('height', canH);
   c.style.marginTop = (divH - canH) + "px";
   // canvasContext.rotate(90 * Math.PI / 180);
   // canvasContext.drawImage(img, 0, - img.height);
   // canvasContext.clearRect(0, 0, canW, cnaH);
   canvasContext.translate(canW / 2, canH / 2);
   canvasContext.rotate(90 * Math.PI / 180);
   canvasContext.scale(canW / img.height, canH / img.width);
   canvasContext.drawImage(img, - img.width / 2, - img.height / 2);
   img.width=canW;
   img.height=canH;
}

function picerror(img)
{
	img.src = "i-share/img/loaderror.jpg"
}

function checkSearch(vtype)
{
	var name = $("searchSuggest").value;
	if(name.length > 8 || name.length < 1)
	{
		if(vtype == 1)
		{
        	alert("文件名长度必须小于等于8且不能为空!");
    	}
    	else
    	{
    		alert("File name no more than 8 characters and not be empty!");
    	}	 	
	    $("searchSuggest").focus();
	    return false;
	}
	else if(isSpace(name))
	{
		if(vtype == 1)
		{
        	alert("文件名只能包含字母,数字,_和-!");
    	}
    	else
    	{
    		alert("File name only contain char、number、_ and -!");
    	}
    	$("searchSuggest").focus();
		return false;
	}
}

function isSpace(names)
{
	var name = names.split("");
	for(i = 0; i < name.length; i++)
    {
    	if(name[i] == " ")
    	{
    		return true;
    	}
    	else if( !((name[i] <= "z" && name[i] >= "a") || (name[i] <= "Z" && name[i] >= "A") 
        || name[i] == "-" || name[i] == "_" || (name[i] <= "9" && name[i] >= "0")))
        {
            return true;
        }
    }
    return false;
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
function ajaxFunction(url, pid)
{
	jspid = pid;
    xmlHttp=GetXmlHttpObject();
    //alert("get xmlhttp!!"+xmlHttp);
    if(xmlHttp==null)
    {
        //alert("你的浏览不支持AJAX！");
        var a = url.indexOf("&ajax=");
        var temp = url.substr(0, a);
        if(a>0&&url.length>a+7)
        {
        	temp += url.substr(a+7,url.length-a+7);
    	}
        get2post(temp);
        return;
    }
    //url = url + "&ssid=" + a;
    //alert("get url = " + url);
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
function stateChanged()
{
    if (xmlHttp.readyState == 4)
    {
    	if(xmlHttp.status == 200)
    	{
	    	var a = xmlHttp.responseText.indexOf("<DIV");
	    	var b = xmlHttp.responseText.indexOf("szg");
	    	var content = xmlHttp.responseText.substr(a, b - a);
	    	var thumbs = $("thumbs");
	    	if(thumbs)
	    	{
	    		while(thumbs.firstChild != null)
	    		{
	    			thumbs.removeChild(thumbs.firstChild);
	    		}
	    	}
	    	thumbs.innerHTML=content;
	    	a = xmlHttp.responseText.indexOf("szg");
	    	b = xmlHttp.responseText.indexOf("</body>");
	    	content = xmlHttp.responseText.substr(a + 3, b - a -3);
	    	var pages = $("pageTurn");
	    	if(pages)
	    	{
	    		while(pages.firstChild != null)
	    		{
	    			pages.removeChild(pages.firstChild);
	    		}
	    	}
	    	//alert(content);
	    	pages.innerHTML=content;
	    	updateView();   	
    	}
    }
}