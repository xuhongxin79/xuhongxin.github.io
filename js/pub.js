window.H={};

function hqbdB(formid){
	var obj=hqbd(formid);
	var obj2={};
	for(var key in obj){
		obj2[key]=obj[key][0];
		}
	return obj2;
}






function hqbd(formid){
	var FormObj=document.getElementById(formid);
	console.dir(FormObj); 
	var OutPut={};
	var arr=[];
	var js={}
	for(var i=0;i<FormObj.length;i++){
	var TagName=FormObj[i].tagName;
	var Name=FormObj[i].getAttribute("name");
	var id=FormObj[i].getAttribute("id");
	var tag_type=FormObj[i].getAttribute("type");
	if(OutPut[Name]==null){
		OutPut[Name]=[];
		}
	switch(TagName){
		case "INPUT":
			//checkbox
			if(tag_type=="checkbox"){
				if(jid(id).checked)
				{
					OutPut[Name].push(jid(id).value);
				}
				else
				{
					OutPut[Name].push("F");
				}
			}
			else if(tag_type=="button"){
				delete(OutPut[Name]);
				}
			else
			{
				OutPut[Name].push(jid(id).value);
			}
		break;
		case "TEXTAREA":
		OutPut[Name].push(jid(id).value);
		break;
		case "SELECT":
		OutPut[Name].push(FormObj[i].options[FormObj[i].selectedIndex].value);
		break;
		}//switch
		}//for
		return OutPut;	
}





function jcdl()
{
if(cookie_get("uid"))
{
return true;
}
else
{
var h="";
h+='<form name="form3" id="form3" action="" method="post" class="css12">';
h+='<input type="text" name="t2" id="t2" placeholder="手机号码"/>';
h+='<input type="password" name="t3" id="t3" placeholder="密码"/>';
h+='<input type="button" name="sub" id="sub" value="登录"/>';
h+='<input type="button" name="subB" id="subB" value="注册" onclick="location.href=&quot;#f=zc&quot;"/>';
h+='</form>';
ap(h,jid("show"),1);
return false;
}
}







function zc()
{
var h="";
h+='<form name="form3" id="form3" action="" method="post" class="css12">';
h+='<input type="text" name="t1" id="t1" placeholder="用户名"/>';
h+='<input type="text" name="t2" id="t2" placeholder="手机号码"/>';
h+='<select name="t7" id="t7">';
h+='<option value="女">女</option>';
h+='<option value="男">男</option>';
h+='</select>';
h+='<input type="password" name="t3" id="t3" placeholder="密码"/>';
h+='<input type="password" name="t32" id="t32" placeholder="重复密码"/>';
h+='<input type="text" name="t4" id="t4" placeholder="你父亲的姓名"/>';
h+='<input type="text" name="t5" id="t5" placeholder="你母亲的姓名"/>';
h+='<input type="text" name="t6" id="t6" placeholder="你读小学的名称"/>';

h+='<input type="button" name="sub" id="sub" value="注册" onclick="zcSave();"/>';
h+='<input type="button" name="subB" id="subB" value="登录" onclick="location.href=&quot;#f=my&quot;"/>';
h+='</form>';
ap(h,jid("show"),1);
}





function zcSave()
{
var pd=hqbdB("form3");
if(pd.t32!=pd.t3)
{
alert("两次密码不一致。");
return;
}
for(var k in pd)
{
if(!pd[k])
{
alert("不能留空白。");
return;
}
}

delete(pd["t32"]);
pd["n4"]=1;

var js={};
js.tableName="yh";
js.sql="t1="+pd.t1+" or t2="+pd.t2;
js.method="tjkv";
js.data=pd;
js.tss="";
var str=jsonE(js);
jpost(
{
"url":"?lf=postDb",
"data":"pd="+str,
"cb":function(d){
alB(d);
}
}
);


}




function cookie_get(c_name)
{
if (document.cookie.length>0)   { 
	c_start=document.cookie.indexOf(c_name + "=");    
	if (c_start!=-1)     {        
		c_start=c_start + c_name.length+1;    
		c_end=document.cookie.indexOf(";",c_start);     
		if(c_end==-1){c_end=document.cookie.length;}   
		return unescape(document.cookie.substring(c_start,c_end));  
	}    
}
return ""
}
function cookie_set(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
//临时传递数据
function temporary(str)
{ 	
	cookie_set("temporary",str,1);
}
function getBody()
{
if(document.body)
{
return document.body;
}
else
{
return document.documentElement;
}
};

function lista(js)
{
	var h="";
	h+='<div class="cssa">';
        h+='<div class="cssb">';
h+=js.t1.substr(0,1);
	h+='</div>'; 
	h+='<div class="cssc">';
	h+=js.t1;
	h+='</div>';
	h+='</div>';
if(js.url){
h='<a href="'+js.url+'">'+h+'</a>';
}
	return h;
	
};
function strindexstr(str)
{
al(str);
	if(str.length>1){
	   str=str.substr(0,1);
}
	return str;
};
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
var f=theRequest["f"];
var func=eval("("+f+")");
func.apply(this,[theRequest]);
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




function ap(h,obj,kb)
{
	//try{clearInterval(tinter);}catch(e){}
	if(kb==1){
		obj.innerHTML="";
	}
	if(typeof(h)=="string"){
		var obj_dom=cel(h);
	}else
	{
		var obj_dom=h;
	}
		var arr=[];
		for(var ik=0;ik<obj_dom.length;ik++){
			arr.push(obj_dom[ik]);
		}
	if(kb==1||kb==0){
		for(var ik=0;ik<arr.length;ik++){
			obj.appendChild(arr[ik]);
		}
	}else if(kb==3){//前插入
		var parent = obj.parentNode;
		for(var ik=0;ik<arr.length;ik++){
				//parent.appendChild(arr[ik]);
				parent.insertBefore(arr[ik], obj);
		}
		/*if (parent.lastChild == obj) {
			// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			for(var ik=0;ik<arr.length;ik++){
				//parent.appendChild(arr[ik]);
				parent.insertBefore(arr[ik], obj);
			}
		}else {
			for(var ik=0;ik<arr.length;ik++){
					parent.insertBefore(arr[ik], obj.nextSibling);
			}
    	}*/
	}//if
	else if(kb==4){
var parent = obj.parentNode;
if (parent.lastChild == obj) {
for(var ik=0;ik<arr.length;ik++){			parent.appendChild(arr[ik]);				
}
}else {
for(var ik=0;ik<arr.length;ik++){				parent.insertBefore(arr[ik], obj.nextSibling);
}
}
}else if(kb==5){//内部前插入
var os = obj.children;
if(os.length>0)
{
var oFirst=os[0];
for(var ik=0;ik<arr.length;ik++){
				obj.insertBefore(arr[ik], oFirst);
			}
		}
		else
		{
			for(var ik=0;ik<arr.length;ik++){
					obj.appendChild(arr[ik]);				
			}
		}
		
		/*if (parent.lastChild == obj) {
			// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			for(var ik=0;ik<arr.length;ik++){
				//parent.appendChild(arr[ik]);
				parent.insertBefore(arr[ik], obj);
			}
		}else {
			for(var ik=0;ik<arr.length;ik++){
					parent.insertBefore(arr[ik], obj.nextSibling);
			}
    	}*/
	}
	
	//allBj();
}





function pm(){ 
var js={};
js.w=getBody.offsetWidth; 
js.h=getBody.offsetHeight; 	
return js;
}




function cel(h){ 	
var objcel=document.createElement("div"); 
objcel.innerHTML=h; 
return objcel.childNodes;
}




function jid(id)
{
if(!document.getElementById(id)){
return;
} 	
return document.getElementById(id);
}




function alB(str)
{
if(typeof str=="object"){  	
str=JSON.stringify(str);
}
alert(str);
}





function al(str)
{
if(typeof str=="object"){  	
str=JSON.stringify(str);
}
var pm1=pm();
var oLog=jid("my_ts");
var oLogB=jid("myTs");
oLogB.style.display='block';

oLog.value=str+"\n-----------\n"+oLog.value;
oLog.style.margin='auto'; 
oLog.style.display='block';
oLog.style.width=pm1.w+'px';
oLog.style.overflow="scroll";
oLog.style.fontSize='12px';
//oLog.style.position='fixed';
oLog.style.left="0";
oLog.style.top="0";
oLog.style.right="0";
oLog.style.height="100px";
oLog.style.zIndex="1500";
//oLog.scrollTo(0,0);

var oLogC=jid("myTsC");
oLogC.onclick=function()
{
jid("myTs").style.display="none";
};
} 








function jpost(js)
{
/*
if(window.navigator.onLine==false){alert("当前网络离线，请检查网络");}
*/ 	
var url="load.php"+js.url; 
var data=js.data; 	
var cb=js.cb;
var xmlhttp;

if (window.XMLHttpRequest)   {  
xmlhttp=new XMLHttpRequest();
}
else{  
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}



xmlhttp.onreadystatechange=function(){
if (xmlhttp.readyState==4 && xmlhttp.status==200){
var rs=xmlhttp.responseText;
eval(cb).apply(this,[rs]); 	
var html = rs;    	
if(!jid("script1")){
ap('<div id="script1" style="display:none;"></div>',getBody,0);
}
var hd=jid("script1");
hd.innerHTML='';  	
var re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig;      	
var srcRe = /\ssrc=([\'\"])(.*?)\1/i;      
var typeRe = /\stype=([\'\"])(.*?)\1/i;      
var match;      	
while(match = re.exec(html)){        
var attrs = match[1];       
var srcMatch = attrs ? attrs.match(srcRe) : false;        
if(srcMatch && srcMatch[2]){      
var s = document.createElement("script");  
s.src = srcMatch[2];
var typeMatch = attrs.match(typeRe);  
if(typeMatch && typeMatch[2]){             s.type = typeMatch[2];           }           hd.appendChild(s);          }else if(match[2] && match[2].length > 0){           if(window.execScript) {             window.execScript(match[2]);           } else {             window.eval(match[2]);           }         }      	}  	
}
if(xmlhttp.status==500){
alert(500);
}
}
xmlhttp.onerror=function(){
jpost(js);
};
xmlhttp.open("POST",url,true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);
}
