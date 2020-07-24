function main()
{
var str=lista({"t1":"跑腿实例","url":"https://xuhongxin79.github.io"});
  str+=lista({"t1":"社交软件","url":"http://hongxin.byethost15.com"});
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
  h+='<form name="ｆorm1"　id＝"form1" method="post" action=""　>';
  h+='<input type="text" id="t1" name="t1">';
    h+='<input type="button" id="b1" name="b1" value="保存">';
h+='</form>';
ap(h,jid("show"),1);
}
