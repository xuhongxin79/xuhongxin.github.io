function a(){  
var url = location.hash;  
if(url==''){
location.href='#f=main';
}  
//console.log("url:"+url);  
af(url);
scrollTo1();
//执行消息提醒
//msgGetMyLast();
isWeiXin();
}
function isWeiXin(){   
var is_weixin = (
function(){     	
return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1     	
}     	
)();  	
if (is_weixin) {  	
ts("<div>检测你正在使用微信浏览器，部分功能不支持，请点击右上角三点在浏览器中打开。</div>"); 	
}
}
function scrollTo1(){
window.scrollTo(0,0);
}
function json_to_url(json)
{
	var str1="";
json["time"]=gettime();
	for(var key in json)
	{
		str1+=key+"="+json[key]+"&";
	}
	str1=str1.substr(0,str1.length-1);
	return str1;
}
function ap2(url)
{
	jpost({"url":url,"data":"","cb":function(d){
//console.dir(d);
		ap(d,jid("show"),1);
		top_back_control(webBt);
	}});
}
//[002]
function af(url){
try{
var arr1=new RegExp("\#(.+)", "g").exec(url)[1];
var arr2 = arr1.split("&");
var theRequest={};
for(var j=0;j<arr2.length;j++)
{
var sTemp = arr2[j].split("=");
theRequest[sTemp[0]]=decodeURI(sTemp[1]);
}
if(theRequest["lf"]){
pa();
}
else
{
var url=json_to_url(theRequest);
url="?"+url;
ap2(url);
//console.log(url);
//var f=theRequest["f"];
//var func=eval("("+f+")");
//func.apply(this,[theRequest]);
}

}catch(e){
	//alert(e);
	location.href="#f=main";
	}
}


function gettime(){
var timestamp = Date.parse(new Date());
return timestamp;
}





