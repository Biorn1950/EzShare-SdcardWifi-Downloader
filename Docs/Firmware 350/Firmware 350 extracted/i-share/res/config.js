var xmlHttp;
var jsvtype;
var havereturn = false;
var timerajax;
var maxSeconds = 15;

function getViewHeight()
{
	var availHeight = window.screen.availHeight;
    var scrollHeight = document.body.scrollHeight;
    var clientHeight = document.body.clientHeight;
    return sheight = Math.max(scrollHeight, clientHeight);
    //return sheight = Math.max(sheight, availHeight);
}

function getViewWidth()
{
   var B = document, A = B.compatMode == "BackCompat" ? B.body : B.documentElement;
   return A.clientWidth;
}

function show()
{
	$("mask").style.display = "block";
	$("panel").style.display = "block";
	var swidth = getViewWidth();
	var sheight = getViewHeight();
	
	$("mask").style.width = swidth + "px";
	$("mask").style.height = sheight + "px";
	
	$("panel").style.left = (swidth - 280) / 2 + "px";
	$("panel").style.top = (sheight - 80) / 2 + "px";
	
	$("button").disabled = true;
	if(jsvtype == 1)
	{
		$("button").innerHTML = "正在配置，请等待 " + maxSeconds + " 秒";
	}
	else
	{
		$("button").innerHTML = "Configuring，Please wait " + maxSeconds + " seconds";
	}

	setTimeout((function()
	{
	  return function()
	  {
	     updateButton();
	  }
	}
	)(), 1000);
}

function updateButton()
{
	maxSeconds -- ;
    if(maxSeconds > 0 )
    {
    	var swidth = getViewWidth();
  		var sheight = getViewHeight();

   		$("mask").style.width = swidth + "px";
   		$("mask").style.height = sheight + "px";

   		$("panel").style.left = (swidth - 280) / 2 + "px";
   		$("panel").style.top = (sheight - 80) / 2 + "px";
   		if(jsvtype == 1)
   		{
      		$("button").innerHTML = "正在配置，请等待 " + maxSeconds + " 秒";
    	}
    	else
    	{
    		$("button").innerHTML = "Configuring，Please wait " + maxSeconds + " seconds";
    	}
      	setTimeout((function()
      	{
        	return function()
         	{
            	updateButton();
         	}
      	}
      	)(), 1000);
   }
   else
   {
   		$("mask").style.display = "none";
        $("panel").style.display = "none";
            	
		if(jsvtype == 1)
		{
    		alert("配置成功,请重新搜索网络!");
		}
		else
		{
			alert("Configuration success, please search the network again!");
		}
		$("back").disabled=false;
   }
}

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
function ajaxFunction()
{
    xmlHttp=GetXmlHttpObject();
    //alert(\"get xmlhttp!!\");
    if(xmlHttp==null)
    {
        //alert("你的浏览不支持AJAX！");
        return;
    }
    var a =  document.getElementById("auth").value;
    var url = "config?auth=" + a;
    a = document.getElementById("uname").value;
    url = url + "&ssid=" + a;
    a = document.getElementById("pword").value;
    url = url + "&pass=" + a;
    a = document.getElementById("channel").value;
    url = url + "&channel=" + a;
    var myDate = new Date();
    url = url + "&time=" + myDate.getTime();
    //alert(\"get url = \" + url);
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
    havereturn = false;
}

function xxxxxxxxx()
{
	if (timerajax.readyState == 4)
	{
		timerajax.abort();
		return;
	}
}

function xxxxxxxxx1()
{
	if (timerajax.readyState == 4)
	{
		if(xmlHttp.status == 200)
    	{
			history.go(-2);
			return false;
		}
		else
		{
				if(jsvtype == 1)
	    	    {
	    		    alert("网络异常！");
	    	    }
	    	    else
	    	    {
	    	        alert("Network anomaly!");
	    	    }
		}
	}
}

function responseRest()
{
	var myDate = new Date();
	var url = "config?reset=1&time=" + myDate.getTime();

	timerajax=GetXmlHttpObject();
	timerajax.onreadystatechange=xxxxxxxxx;
    timerajax.open("GET",url,true);
    timerajax.send(null);
    show();
}

function stateChanged()
{
    if (xmlHttp.readyState == 4)
    {
    	if(xmlHttp.status == 200 && !havereturn)
    	{
    		if(xmlHttp.responseText.indexOf("config_success")>0)
    		{
    			havereturn = true;
    		
		    	responseRest();
	    		$("finish").disabled=true;
	    	}
	    	else
	    	{
	    	    if(jsvtype == 1)
	    	    {
	    		    alert("网络异常！");
	    	    }
	    	    else
	    	    {
	    	        alert("Network anomaly!");
	    	    }
	    	}
    	}
    	//alert(xmlHttp.status + "--" + xmlHttp.responseText);
    }
}

function $(id)
{
	return document.getElementById(id);
}

function logout()
{
	var url = "logout?time=";
	var myDate = new Date();
    url = url + myDate.getTime();
	timerajax=GetXmlHttpObject();
	timerajax.onreadystatechange=xxxxxxxxx1;
    timerajax.open("GET",url,true);
    timerajax.send(null);
}

function subTest(vtype)
{
	var pward = $("pword").value;
	var name = $("uname").value;
	var channel = $("channel").value;
	var auth = $("auth").value;
	
	var oldName = $("oldNick").value;
	var oldPward = $("oldPass").value;
	var oldChannel = $("oldChannel").value;
	var oldAuth = $("oldAuth").value;
	jsvtype = vtype;
	var answer;
	
	if(oldPward == pward && oldName == name && oldChannel == channel && auth == oldAuth)
	{
		if(vtype == 1)
		{
			alert("请修改主人密码、无线网络名称、无线网络密码或者无线信道!");
		}
		else
		{
			alert("Please change administrator password,WIFI SSID,WIFI password or WIFI channel!");
		}
		return;
	}
	
	if(isSpace(auth))
	{
        if(vtype == 1)
        {
        	alert("主人密码只能包含字母、数字、下划线和空格!");
    	}
    	else
    	{
    		alert("Administrator password can only contain letter,number,underline and space!");
    	}
    	$("auth").focus();
        return false;
    }
    else if(auth.length < 1 || auth.length > 8)
    {
    	if(vtype == 1)
		  {
        	alert("主人密码不能为空且不能大于8位");
    	}
    	else
    	{
    		alert("Administrator password can not be null and no more than 8 characters!");
    	}
    	$("auth").focus();
    	return false;
    }
	if(isSpace(name))
	{
        if(vtype == 1)
        {
        	alert("无线网络名称只能是字母,数字,下划线和空格!");
    	}
    	else
    	{
    		alert("WIFI SSID can only contain letter,number,underline and space!");
    	}
    	$("uname").focus();
        return false;
    }
    else if(name.length < 1 || name.length > 32)
    {
    	if(vtype == 1)
		{
        	alert("无线网络名称不能为空且不能大于32位");
    	}
    	else
    	{
    		alert("WIFI SSID can not be null and no more than 32 characters!");
    	}    	
    	$("uname").focus();
    	return false;
    }
    else if((pward.length < 8) || (pward.length > 63))
	{
		   if (pward.length != 0)
    	{    		
		if(vtype == 1)
		{
        	alert("无线网络密码长度必须是8-63字符长度,或者为空!");
    	}
    	else
    	{
    		alert("WIFI password must be 8-63 characters long or be null!");
    	}
        $("pword").focus();
        return false;
      }
	}
	else if(isNum(pward))
	{
		if(vtype == 1)
		{
        	alert("无线网络密码只能是字母、数字和下划线，或为空!");
    	}
    	else
    	{
    		alert("WIFI password can only contain letter,number and underline，or be null!");
    	}
    	$("pword").focus();
        return false;
	}
	
	if(vtype == 1)
	{
		answer = confirm("确定更改吗？");
	}
	else
	{
		answer = confirm("Wish to modify?");
	}
	if(!answer)
	{
		return;
	}
	$("finish").disabled=true;
	$("back").disabled=true;
    ajaxFunction();
}

function isSpace(names)
{
	var name = names.split("");
    for(i = 0; i < name.length; i++)
    {
		if( !((name[i] <= "z" && name[i] >= "a") || (name[i] <= "Z" && name[i] >= "A") 
        || name[i] == " " || name[i] == "_" || (name[i] <= "9" && name[i] >= "0")))
        {
            return true;
        }
    }
    return false;
}

function isNum(pass)
{
	var name = pass.split("");
    for(i = 0; i < name.length; i++)
    {
    	if( !((name[i] <= "z" && name[i] >= "a") || (name[i] <= "Z" && name[i] >= "A") 
        || name[i] == "_" || (name[i] <= "9" && name[i] >= "0")))
        {
            return true;
        }
    }
    return false;
}

