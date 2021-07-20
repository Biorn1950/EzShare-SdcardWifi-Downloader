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

function getVersion()
{
    xmlHttp=GetXmlHttpObject();
    //alert(\"get xmlhttp!!\");
    if(xmlHttp==null)
    {
        alert("你的浏览不支持AJAX！");
        return;
    }
    var url = "../../publicdir/index.htm?version=0";
    var myDate = new Date();
    url = url + "&time=" + myDate.getTime();
    xmlHttp.onreadystatechange=showVersion;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function showVersion()
{
    if (xmlHttp.readyState == 4)
    {
    	if(xmlHttp.status == 200)
    	{
    		var slip = xmlHttp.responseText.toUpperCase().indexOf(" ");
    		if(slip > 0)
    		{
    			var subversion = xmlHttp.responseText.toUpperCase().split(" ");
    			var versiontxt = "V";
    			var n = 0;
    			for(n = 0; n < subversion.length; n++)
    			{
    				var temp = subversion[n].split(":");
    				versiontxt = versiontxt + temp[1];
    				if(n == 0)
    				{
    					versiontxt = versiontxt + "/R";
    				}
    			}    			
	    		document.getElementById("core_version").innerHTML = versiontxt;
	    	}
    	}
    }
}

function checkAuth()
{
	var loginPass = document.getElementById("loginPass").value;
	xmlHttp=GetXmlHttpObject();	
    //alert(\"get xmlhttp!!\");
    if(xmlHttp==null)
    {
        alert("你的浏览不支持AJAX！");
        return;
    }
    var url = "sendurl?client=1&password="+loginPass;
    var myDate = new Date();
    url = url + "&time=" + myDate.getTime();
    xmlHttp.onreadystatechange=authResponse;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function authResponse()
{
	if (xmlHttp.readyState == 4)
    {
    	if(xmlHttp.status == 200)
    	{
    		var vtype = document.getElementById("vtype").value;
    		var str = xmlHttp.responseText.toLowerCase();
    		var isok = str.indexOf("<clientlogin>1<")
    		var isExist = str.indexOf("<clientlogin>-2<");
    		if(isExist > 0)
    		{
    			if(vtype == 1)
				{
					alert("主人已登录! 请等待!");
				}
				else
				{
					alert("Please wait! Administrator is online!");
				}
    		}
    		else if(isok > 0)
    		{
    			var url = window.location.href;
    			var index = url.indexOf("?");
    			var substr = url.substr(index);
    			document.loginform.action = "../config"+substr;
    			document.loginform.submit();
	    	}
	    	else
	    	{
				if(vtype == 1)
				{
					alert("主人密码错误!");
				}
				else
				{
					alert("Administrator password error!");
				}
	    	}
    	}
    }
}