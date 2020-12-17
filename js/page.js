function main()
{
var str=lista({"t1":"跑腿实例","url":"https://xuhongxin79.github.io"});
  str+=lista({"t1":"社交软件","url":"http://hongxin.byethost15.com"});
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
  d.t1=hqbdB('form1');
dbq(
  {
  "tableName":"wb",
     "bql":"",
     "iif":"",
     "ts":"",
     "method":"add",
     "data":d,
     "callBack":function(js){
alert(js);
}
  }
);
}
