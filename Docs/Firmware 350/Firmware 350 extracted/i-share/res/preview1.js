function get2post(u)
{
   var r = u.indexOf("?");
   if(r < 0)
   {
      document.postform.action = u;
   }
   else
   {
      document.postform.action = u.slice(0, r);
      u = u.slice(r + 1);
      var a = u.split("&");
      for(l in a)
      {
         var s = a[l].split("=");
         var new_input = document.createElement("input");
         new_input.type = "hidden";
         new_input.name = s[0];
         new_input.value = s[1];
         document.postform.appendChild(new_input);
      }
   }
   document.postform.submit();
}
function picerror(img)
{
	img.src = "i-share/img/loaderror.jpg"
}
function showPic(img, iwidth, iheight)
{
	if(iwidth>=300)
	{
		var loadimg = document.getElementById("loaddiv");
		loadimg.style.display="none";
		img.style.display="";
		//alert(img.width+"--"+img.height);
	}
	  var image = new Image();
	  image.src = img.src;
	  if(img.width == 0 || img.height == 0)
	  {
	  	img.width=500;
	  	img.height=500;
	  	//alert("img.width == 0 || img.height==0");
	  	//return;
	  }
	  var B = window.navigator.userAgent.toString().toLowerCase();
	  if(B.indexOf("safari") >= 0)
	  {
	  	image.width=(img.naturalWidth==0 || (typeof img.naturalWidth=="undefined"))?image.width:img.naturalWidth;
	    image.height=(img.naturalHeight==0 || (typeof img.naturalWidth=="undefined"))?image.height:img.naturalHeight;
	  }
	  else
	  {
	  	//image.width=(img.naturalWidth==0)?image.width:img.naturalWidth;
	    //image.height=(img.naturalHeight==0)?image.width:img.naturalHeight;
	  }
	  //alert();
	  //alert(image.width +"---"+ image.height+"showpic"+iwidth+"---"+iheight+"=="+img.naturalHeight+"=natural="+img.naturalWidth);
	  if(image.width / image.height >= iwidth / iheight)
	  {
	  	 //alert("shaoPic11");
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
	  	 //alert("shaoPic22");
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
}