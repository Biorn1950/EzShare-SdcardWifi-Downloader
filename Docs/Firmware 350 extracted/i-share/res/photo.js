//var dlw;
function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6. 
{ 
    var arVersion = navigator.appVersion.split("MSIE") 
    var version = parseFloat(arVersion[1]) 
    if ((version >= 5.5) && (document.body.filters)) 
    { 
       for(var j=0; j<document.images.length; j++) 
       { 
          var img = document.images[j] 
          var imgName = img.src.toUpperCase() 
          if (imgName.substring(imgName.length-3, imgName.length) == "PNG") 
          { 
             var imgID = (img.id) ? "id='" + img.id + "' " : ""
             var imgClass = (img.className) ? "class='" + img.className + "' " : ""
             var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
             var imgStyle = img.style.cssText + "float:left;"
             if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
             var strNewHTML = "<span " + imgID + imgClass + imgTitle
             + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
             + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
             + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
             img.outerHTML = strNewHTML
             j = j-1
          } 
       } 
    }    
}
window.onload = function()
{
	correctPNG(); 
}

function ajaxFunction(url, vtype, ftype)
{
	//alert(url);
	var B = window.navigator.userAgent.toString().toLowerCase();
    //alert(B.indexOf("ipad") >= 0);
    if(B.indexOf("ipad") >= 0)
    {
    	if(vtype == 1)
		{
	    	alert("请确认使用的设备支持TAR格式文件下载!");
	    }else
	    {
	    	alert("Please confirm TAR file download is supported by the device!");
	    }
    }
	if(url == 0)
	{
		var a = document.getElementsByName("checkimg");
	    var n = a.length;
	    var num = 0;
	    var url = "";
	    for (var i = 0; i < n; i ++ )
	    {
	       if(a[i].checked)
	       {
	          num ++ ;
	          if(url.indexOf("fd") < 0)
	          {
	             var locl_of_fd = (a[i].value).indexOf("&fdir=") + 1;
	             if(locl_of_fd > 0)
	             {
	                url += (a[i].value.substring(locl_of_fd, (a[i].value).length));
	             }
	          }
	          var locl_of_fn = (a[i].value).indexOf("=");
	          var locl_of_fd = (a[i].value).indexOf("&fdir=");
	          url += "&fn" + num + a[i].value.substring(locl_of_fn, locl_of_fd);
	       }
	    }
	    if(num < 1)
	    {
	    	if(vtype == 1)
			{
				if(ftype==0)
				{
	       			alert("请选择需要下载的图片!");
	       		}
	       		else
	       		{
	       			alert("请选择需要下载的视频!");
	       		}
	    	}else
	    	{
	    		if(ftype==0)
				{
	    			alert("Please select photos!");
	    		}
	    		else
	    		{
	    			alert("Please select videos!");
	    		}
	    	}
	       return;
	    }
	    url = "download?num=" + num + "&" + url;
	}
   // alert(num + \"===\" + url);
   get2post(url);
   // 删除节点
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
         new_input.id = s[0];
         new_input.value = s[1];
         document.postform.appendChild(new_input);
      }
   }
   document.postform.submit();
}

function $(id)
{
   return document.getElementById(id);
}
var B = window.navigator.userAgent.toString().toLowerCase();
function showPic(img, iwidth, iheight, index)
{
   var image = new Image();
   image.src = img.src;
   if(B.indexOf("safari") >= 0)
   {
	  	image.width=(img.naturalWidth==0 || (typeof img.naturalWidth=="undefined"))?image.width:img.naturalWidth;
	    image.height=(img.naturalHeight==0 || (typeof img.naturalWidth=="undefined"))?image.width:img.naturalHeight;
   }
   if(image.width <= 0 || image.height <= 0)
   {
   		return;
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
   img.alt = image.width + "x" + image.height;
   //alert(img.src+"=="+img.width+"--"+img.height+"===="+image.width+"--"+image.height);
}

function picerror(img)
{
	img.src = "i-share/img/loaderror.jpg"
	//alert("Image load error!");
}

function checkAll(str)
{
   if($("checkall").checked)
   {
      var a = document.getElementsByName(str);
      var n = a.length;
      for (var i = 0; i < n; i ++ )
      {
         a[i].checked = true;
      }
   }
   else
   {
      var a = document.getElementsByName(str);
      var n = a.length;
      for (var i = 0; i < n; i ++ )
      {
         a[i].checked = false;
      }
   }
}

function checkSearch(vtype)
{
	var name = $("searchInput").value;
	if(name.length > 8 || name.length < 1)
	{
		if(vtype == 1)
		{
        	alert("文件名长度必须小于等于8且不能为空！");
    	}
    	else
    	{
    		alert("File name can not be null and no more than 8 characters!");
    	}
	    $("searchInput").focus();
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
    		alert("File name can only contain letter,number,_ and -!");
    	}
    	$("searchInput").focus();3
		return false;
	}
}

function isSpace(names)
{
	var name = names.split("");
	//alert(name.length+"names"+names);
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

function showDiv(divCount, show)
{
	var lie = parseInt(divCount/8);
   	var hang = lie + ((divCount %8) > 0 ? 1 : 0);//Math.ceil(jsPreCount/lie);
   	if(show > 0)
   	{
	   	$("foldersp").style.height=hang*25+"px";
	   	$("folders").style.height=hang*25+"px";
	   	for(i = 1; i <= divCount; i++)
	   	{
	   		$("folder"+i).style.display="";
	   	}
	   	$("more+").style.display="none";
	   	$("more-").style.display="";
	}
	else
	{
		$("foldersp").style.height=50+"px";
	   	$("folders").style.height=50+"px";
	   	for(i = 16; i <= divCount; i++)
	   	{
	   		$("folder"+i).style.display="none";
	   	}
	   	$("more+").style.display="";
	   	$("more-").style.display="none";
	}
   	//alert(hang+"-----");
}
