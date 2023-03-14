function main()
{
var str=lista({"t1":"社区","url":"http://hongxin.byethost15.com"});
   str+=lista({"t1":"视频","url":"https://www.ixigua.com/home/55760142613"});
str+=lista({"t1":"上鸭埚","url":"/syg.html"});
   str+=lista({"t1":"仓库","url":"https://github.com/xuhongxin79"});
ap(str,jid("show"),1);
}
function fx()  
{  
ap("<div>fx</div>",jid("show"),1);  
}  
function txl()
{
ap("<div>通信录</div>",jid("show"),1);
}
function my()
{
var h="";
  h+="<div>个人中心</div>";
  h+='<form name="form1"　id＝"form1" method="post" action=""　>';
  h+='<input type="text" id="t1" name="t1">';
    h+='<input type="button" id="b1" name="b1" value="保存" onclick="mysave()">';
h+='</form>';
ap(h,jid("show"),1);
}

function mysave(){
  
var d={};
  d=hqbdB('form1');
dbq({"tableName":"wb","bql":"t44=='wb' ","iif":"and","ts":"","method":"read","data":"","arr":[],"callBack":function(c){
		//console.dir(c);
		if(c.arr.length>0){
			log(c);
		}
	}});

/*
dbq(
  {
  "tableName":"wb",
     "bql":"",
     "iif":"",
     "ts":"",
     "method":"read",
     "data":d,
     "callBack":function(js){
log(js.arr[0]);
}
  }
);*/
}
