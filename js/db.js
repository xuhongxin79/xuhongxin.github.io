function gaImg(str){
var arr=[];
var patt=new RegExp("\\\[img src=(.+?)\\\]","g");
var rs=patt.exec(str);
while(rs){
arr.push(rs[1]);
rs = patt.exec(str);
}
if(str.length>5&&arr.length<=0){
arr=[str];
}
return arr;
}
function sToImg(str)
{
	if(!!str){
	var pt = '\\\[img src=(.+?)\\\]';
	str = str.replace(new RegExp(pt, "g"), '<img src="$1" />');
	}
	return str;
}
function db_isKey(key){
var patt=new RegExp("^[tn][1-9][0-9]*$","g");
var rs=patt.test(key);
return rs;
}

function db_check_key(data)
{
	var data2={};
	if(isJson(data)){
		for(var key in data){
			if(db_isKey(key)){
				data2[key]=data[key];
			}
		}
	}
	return data2;
}

function get_table_last_recorder(cb){
	
	var tbns=[
			'论坛',
			'商品',
			'教程资料',
			'分类信息',
			'公司',
			'婚恋',
			'打车',
			'医疗单位档案',
			'在线点餐'
		];
	wbq({
	"tableName":"栏目",
	"bql":'',
	"tbns":tbns,
	"iif":"",
	"ts":"",
	"method":"read_last",
	"data":"",
	"callBack":cb
		});//wbq
}
function web_tb_on(){
try{
		window.clearTimeout(webtb);
		webtb=setTimeout(function(){
		TB4();
	},60000);
	}catch(e){}
}
function gCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  
  if (c_start!=-1)
    { 
	
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start); 
    if(c_end==-1){c_end=document.cookie.length;}
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return ""
}







function wbq(js)
{
	var cb=js.callBack;
	js.callBack=function(c){
		
		if(c.arr.length>0){
			//console.dir(c);
			js_function_Callcack(eval(cb),[c]);
		}
		else
		{
			delete(c["json"]);
			delete(c["dbName"]);
		
			jpost({
						"url":"?lf=postDB",
						"data":"postData="+jsonE(c),
						"cb":function(cp){
							//console.dir(cp);
							var js2=jsonD(cp);
							if(js2.arr.length>0){
								js2.dbName="appDb";
								TB8(js2.arr);
							}
							js_function_Callcack(eval(cb),[js2]);
						}
				  });
		}
		};
	dbq(js);
}







function arr_rand(arr,count) {
	if(arr.length>0){
    var shuffled = arr.slice(0), i = arr.length, min1 = i - count, temp, index;
	if(min1<0){
		min1=0;
	}
    while (i-- > min1) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min1);
	}
	return arr;
}







function db_sql_change(bql){
	try{
var patt=new RegExp("[\(]{0,1}([tn][1-9][0-9]*)(==|\!=|\>=|\<=|\>|\<|inc)(.+?)[\)]* (and|or)*","g");
var rs=patt.exec(bql);
var str=bql;
var str2=bql;
while(rs){
var patt2=new RegExp("(==|\>=|\<=|\>|\<|inc) (and|or)*","g");
var rs2=patt2.exec(str);
while(rs2){
alert("err:"+str);
return;
}
if(rs[1].indexOf("t")==0){
	if(rs[2]=="inc"){
		str=str.replace(rs[1]+"inc"+rs[3],'json["'+rs[1]+'"]'+'.indexOf("'+rs[3]+'")>=0');
		str2=str2.replace(rs[1]+"inc"+rs[3],rs[1]+' like "%'+rs[3]+'%"');
	}else
	{
		var pt =rs[1]+rs[2]+rs[3];
		str=str.replace(new RegExp(pt, "g"),'json["'+rs[1]+'"]'+rs[2]+'"'+rs[3]+'"');
		str2=str2.replace(new RegExp(pt, "g"),rs[1]+rs[2]+'"'+rs[3]+'"');
	}
}else
{
	var pt =rs[1]+rs[2]+rs[3];
	str=str.replace(new RegExp(pt, "g"),'json["'+rs[1]+'"]'+rs[2]+rs[3]);
	str2=str2.replace(new RegExp(pt, "g"),rs[1]+rs[2]+rs[3]);
}
str=str.replace(" and ",'&&');
str=str.replace(" or ",'||');
str2=str2.replace("==",'=');
rs = patt.exec(bql);
}
str='if('+js_trim(str)+'){dbaa=1;}else{dbaa=0;}';
var rt={"bql":str,"sql":str2};
return rt;
}catch(e){alert(e+"43546");}
}






function js_trim(str){ 
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
}






function js_function_Callcack(fn,args){
	fn.apply(this, args);
}







function js_db_cs(dbjs){
log(dbjs);
var json=dbjs.json;
var bql=dbjs.bql;
if(bql){
	var bql_js=db_sql_change(dbjs.bql);
		bql=bql_js.bql;
		dbjs.sql=bql_js.sql;
		dbjs.dql=bql_js.bql;
}
	dbjs.arr=[];
	
	if(bql){
	eval(bql);
		if(dbaa==1){
			dbjs.arr.push(dbjs.json);
			/*if(window.hx.db.arr.length>30){
				window.hx.db.arr.push(dbjs.json);
				window.hx.db.arr.splice(0,2);
			}*/
		}
	}
	else
	{
			dbjs.arr.push(dbjs.json);
			/*if(window.hx.db.arr.length>30){
				window.hx.db.arr.push(dbjs.json);
				window.hx.db.arr.splice(0,2);
			}*/
	}
	return dbjs;
}






function isJson(obj){
var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
return isjson;
}






function isArray(obj){
var isarr = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object array]" ; 
return isarr;
}





function dbq(dbjs){
	dbjs=js_db_set(dbjs);
	indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	if(indexedDB!=null){
		js_db_idb(dbjs);
	}else{
		wdb(dbjs);
	}
}






function js_db_del_db(){
dbq({"tableName":"aa","bql":"","iif":"","ts":"","method":"delDb","data":"","callBack":function(js){
js_cookie_set("TBTime",jGetTime(),365);
js_cookie_set("TBTime2",1,365);
ts(js.ts);
}});
}








function js_db_idb(dbjs)
{

	if(!dbjs.arr){
	dbjs.arr=[];
	}
	try{
		db.close();
	}catch(e){}
	if(!!dbjs.v)
	{
		var req = indexedDB.open(dbjs.dbName,dbjs.v);
	}else{
		var req = indexedDB.open(dbjs.dbName);
	}
	

	req.onsuccess = function (evt) {
		db = this.result;
		
		if(!evt.target.result.objectStoreNames.contains(dbjs.dbName)){//升级
			db.close();
			dbjs.v=parseInt(db.version)+1;
			idb(dbjs);
		}
		else
		{
			dbjs.db=db;
			if(dbjs.method=="delDb"){
				setTimeout(function(){
					db.close();
					indexedDB.deleteDatabase(dbjs.dbName);
					dbjs.ts="数据库重置";
					js_function_Callcack(eval(dbjs.callBack),[dbjs]);
				},500);
			}

			else
			{

				if(dbjs.db.objectStoreNames.contains(dbjs.dbName)){
					var transaction = db.transaction([dbjs.dbName],"readwrite");//获取表
					transaction.oncomplete = function(event){};//获取表成功时
					transaction.onerror = function(event){console.dir(event);};//获取表错误时
					var objectStore = transaction.objectStore(dbjs.dbName);//得到person的objectStore对象
					switch(dbjs.method)
					{
						case "tj":
										if(!!dbjs.data["t41"]&&dbjs.data["t41"]=='已同步'){
											dbjs.data["t41"]='已同步';
										}else{
											dbjs.data["t41"]='本地';
										}
							//添加一条记录
							delete(dbjs.data["n44"]);
							objectStore.add(dbjs.data);
							dbjs.ts='添加成功';
							js_function_Callcack(eval(dbjs.callBack),[dbjs]);
						break;

case "read_last":
window.hx.rs_json={};
objectStore.openCursor(null, 'prev').onsuccess = function(event){
var result=event.target.result;
if(!!result==false){
if(window.hx.rs_json){
for(var k in window.hx.rs_json){
	window.hx.db.arr.push(window.hx.rs_json[k]);
}
}
window.hx.rs_json={};
delete(dbjs["hx.rs_json"]);
dbjs.arr=window.hx.db.arr;
window.hx.db.arr=[];
js_function_Callcack(eval(dbjs.callBack),[dbjs]);
return;
}else{
if(event.target.result&&event.target.result.value){//有值
var cursor = event.target.result.value;
var tbns=dbjs.tbns;
//sql
var bql='t44=='+tbns[0];
if(tbns.length>1){
for(var i_last=1;i_last<tbns.length;i_last++){
bql+=' or t44=='+tbns[i_last];
}//for
}//if
bql+=' ';
dbjs.bql=bql;
dbjs.json=cursor;
var rs=js_db_cs(dbjs);
//console.dir(rs);
if(rs.arr.length>0){
var t44=rs.arr[0]["t44"];
if(!window.hx.rs_json[t44]){
window.hx.rs_json[t44]=rs.arr[0];
}
}
}
}
result.continue();
};//openCursor
break;

						case "read":	
									
							objectStore.openCursor(null, 'prev').onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									dbjs.arr=window.hx.db.arr;
									window.hx.db.arr=[];
									dbjs.json={};
									dbjs=js_db_cs(dbjs);
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}
								else{//游标
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;									
										var rs=js_db_cs(dbjs);
										if(rs.arr.length>0){
											if(window.hx.db.arr.length<30){
												window.hx.db.arr.push(dbjs.json);
											}
										}
										/*rs.tableName=dbjs.tableName;
										rs.dbName=dbjs.dbName;

										rs.bql=dbjs.bql;
										rs.iif=dbjs.iif;
										rs.method=dbjs.method;
										rs.data=dbjs.data;
										rs.ts=dbjs.ts;
										rs.callBack=dbjs.callBack;
										js_function_Callcack(eval(dbjs.callBack),[rs]);*/
									}
									else{//有值
										dbjs.arr=[];
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}
								}
								result.continue();//这边执行轮询读取
							};
						break;
						//分页读取
						case "readfy":
						dbjs=js_fy(dbjs);
						var len=parseInt(dbjs.len);
						var start=parseInt(dbjs.start);
						var end=start+len;
						window.fyi=0;
						window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange||window.msIDBKeyRange;
						var boundKeyRange = IDBKeyRange.upperBound("0", false);
						var index = objectStore.index("n42Index");	//时间戳				
							index.openCursor(boundKeyRange, 'prev').onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									dbjs.arr=window.hx.db.arr;
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}
								else{//游标
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										if(rs.arr.length>0){
											if(window.fyi>=start&&window.fyi<end){
												window.hx.db.arr.push(dbjs.json);
											}
											else{
												result.close;
												db.close();
											}
											window.fyi++;
										}
										
													

										/*if(window.fyi>=start&&window.fyi<end){
											var rs=js_db_cs(dbjs);
											//console.dir(rs);
											if(rs.arr.length==0){
												end++;
											}*/
										/*}else{
											result.close;
											db.close();
										}*/
										
										
										
										/*rs.tableName=dbjs.tableName;
										rs.dbName=dbjs.dbName;
										rs.bql=dbjs.bql;
										rs.iif=dbjs.iif;
										rs.method=dbjs.method;
										rs.data=dbjs.data;
										rs.ts=dbjs.ts;
										rs.callBack=dbjs.callBack;*/
										/*if(window.fyi>=start&&window.fyi<end&&rs.arr.length>0){
											//js_function_Callcack(eval(dbjs.callBack),[rs]);
										}else{
											result.close;
											db.close();
										}*/
										
									}
									/*else{//有值
										dbjs.arr=[];
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}*/
								}
								
								result.continue();//这边执行轮询读取
							};
						break;
						case "rand":

						window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange||window.msIDBKeyRange;
						var boundKeyRange = IDBKeyRange.upperBound("0", false);
						//var boundKeyRange =IDBKeyRange.lowerBound(0);
						var index = objectStore.index("n42Index");					
							index.openCursor(boundKeyRange, 'prev').onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									dbjs.arr=arr_rand(window.hx.db.arr,dbjs.len);
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}
								else{//游标
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										if(rs.arr.length>0){
											if(window.hx.db.arr.length<30){
												window.hx.db.arr.push(dbjs.json);
											}
										}
										if(window.hx.db.arr.length>(dbjs.len+10)){
											window.hx.db.arr=arr_rand(window.hx.db.arr,dbjs.len);
										}
										/*rs.tableName=dbjs.tableName;
										rs.dbName=dbjs.dbName;
										rs.bql=dbjs.bql;
										rs.iif=dbjs.iif;
										rs.method=dbjs.method;
										rs.data=dbjs.data;
										rs.ts=dbjs.ts;
										rs.callBack=dbjs.callBack;
										var rn=Math.random();
										if(rn>0.7&&rs.arr.length>0){
											js_function_Callcack(eval(dbjs.callBack),[rs]);
										}*/
									}
									/*else{//有值
										dbjs.arr=[];
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}*/
								}
								
								result.continue();//这边执行轮询读取
							};
						break;
										
						case "xg"://修改
							objectStore.openCursor().onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									dbjs.arr=[];
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}//游标
								else{//游标
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										//console.dir(rs);
										if(rs.arr.length>0){
											var js=rs.arr[0];
											var n44=js.n44;
											//console.log(n44);
											var request_xg=objectStore.get(n44);
											 request_xg.onsuccess=function(e){
												 var json_1=e.target.result;
												if(!!dbjs.data["t41"]&&dbjs.data["t41"]=='已同步'){
													dbjs.data["t41"]='已同步';
												}else{
													dbjs.data["t41"]='本地';
												}
												 for(var k in dbjs.data){
												 	if(dbjs.data[k]==""&&json_1[k]!=""){
														json_1[k]=json_1[k];
													}else{
														json_1[k]=dbjs.data[k];
													}
												}
												json_1["n43"]=1;
												json_1["n44"]=n44;
												objectStore.put(json_1);
												rs.ts="修改成功";
												js_function_Callcack(eval(dbjs.callBack),[rs]);
											};
										}
									}else{//有值
										dbjs.arr=[];
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}//有值
								}
								result.continue();//这边执行轮询读取 
							};
						break;
//##################################################################
case "tjxg":
	//同步数据库解决方法
	//1.回传数据的种类：（1）自己在本地添加上传的（2）别人上传的
	//2.方法：如果n24(uid)存在，条件为n24=myid and n44=bdid
	//3.如果n24不存在，比如用户，条件为n42=本地时间 and n44=bdid
	
	//判断data类型,转化数组
	if(isJson(dbjs.data)){
		dbjs.data=[dbjs.data];
	}else if(isArray(dbjs.data)){
		dbjs.data=dbjs.data;
	}else{
		return;
	}
	//判断data类型
	
	var getNum=dbjs.data.length;//数据的个数
	
	//用法
	for(var i_d=0;i_d<dbjs.data.length;i_d++){
		if(isJson(dbjs.data[i_d]["t6"])){
			isJson(dbjs.data[i_d]["t6"])=jsonE(dbjs.data[i_d]["t6"]);
		}
	}
	//用法
	
	objectStore.openCursor().onsuccess = function(event){//cursor
		var result=event.target.result;
		if(!!result==false||result==null){//游标，本地没有数据
			if(dbjs.data.length>0){
				for(var jj=0;jj<dbjs.data.length;jj++){
					delete(dbjs.data[jj]["n44"]);//删除主键，自动增长的
					objectStore.add(dbjs.data[jj]);//入库
					dbjs["ts"]="操作成功";
					//my_log("添加："+dbjs.data[jj]["n45"]);
				}
			}
			
			dbjs["getNum"]=getNum;
			js_function_Callcack(eval(dbjs.callBack),[dbjs]);
			return;
		}else{
			if(event.target.result&&event.target.result.value){//有值
				var cursor = event.target.result.value;
				var json_1=cursor;//一条游标记录
				dbjs.json=cursor;

				var ddel=[];//删除
				for(var ii=0;ii<dbjs.data.length;ii++){//历遍数据条数
					
					if(dbjs.data[ii]["n43"]>=10){//3这是服务器回传的数据
						dbjs.tableName=dbjs.data[ii]["t44"];//表名
						dbjs.iif="and";
						if(dbjs.tbflag==1){//2
							//这里分两种情况：n24是否存在。
							//如果n45存在按n45修改
							if(!!json_1["n45"]&&!!dbjs.data[ii]["n45"]){//1
								//dbjs.bql="t44=="+dbjs.data[ii]["t44"]+" and n45=="+dbjs.data[ii]["n45"]+" ";
								dbjs.bql="n45=="+dbjs.data[ii]["n45"]+" ";
							}else{//1
								if(!!dbjs.data[ii]["n24"]){
									//dbjs.bql="t44=="+dbjs.data[ii]["t44"]+" and n24=="+dbjs.data[ii]["n24"]+" and n44=="+dbjs.data[ii]["n44"]+" ";
									dbjs.bql="n24=="+dbjs.data[ii]["n24"]+" and n44=="+dbjs.data[ii]["n44"]+" ";
								}else{
									//dbjs.bql="t44=="+dbjs.data[ii]["t44"]+"and n42=="+dbjs.data[ii]["n42"]+" and n44=="+dbjs.data[ii]["n44"]+" ";
									dbjs.bql="n42=="+dbjs.data[ii]["n42"]+" ";
								}
							}//1
							
						}//2
					}//3
					var rs=js_db_cs(dbjs);//查询
					if(rs.arr.length>0){//如果本地数据库存在此记录，修改
						for(var k in dbjs.data[ii]){//for
							delete(dbjs.data[ii]["n44"]);//删除主键，自动增长的
							//如果data的值是空白，数据库的值不是空白，保留原值。
							if(dbjs.data[ii][k]==""&&json_1[k]!=""){
								json_1[k]=json_1[k];
							}else{
								json_1[k]=dbjs.data[ii][k];
							}
							objectStore.put(json_1);//入库
							ddel.push(ii);//记录已操作过的data，删除掉
							dbjs["ts"]="操作成功";
						}//for
						//删除已操作的数据
						for(var ji=0;ji<ddel.length;ji++){
							dbjs.data.splice(ddel[ji],1);
						}
					}
				}
			}
		}
		result.continue();//这边执行轮询读取
	};//cursor
break;
//##################################################################
						case "tjkv":
							//判断data类型
							if(isJson(dbjs.data)){
								dbjs.data=[dbjs.data];
							}else if(isArray(dbjs.data)){
								dbjs.data=dbjs.data;
							}else{
								return;
							}
							
							objectStore.openCursor().onsuccess = function(event){//cursor
								var result=event.target.result;
								if(!!result==false||result==null){//游标
									if(dbjs.data.length>0){
										var flag=0;
										for(var jj=0;jj<dbjs.data.length;jj++){
											delete(dbjs.data[jj]["n44"]);
											console.dir(dbjs.data[jj]);
											objectStore.add(dbjs.data[jj]);
											flag++;
										}
										if(flag>0){
											dbjs["ts"]="操作成功";
										}else{
											dbjs["ts"]="操作失败";
										}
									}									
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}else{
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										var json_1=cursor;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										if(rs.arr.length>0){
											dbjs.data=[];
											dbjs.ts="不能重复添加";
										}										
									}
								}
								result.continue();//这边执行轮询读取
							};//cursor
						break;
//1133					
						case "tjxgb"://添加修改
							j=0;
							m=0;
							objectStore.openCursor().onsuccess = function(event){//6
								var result=event.target.result;
								dbjs["next"]="";
								if(!!result==false){//游标
								
									if(j==m){//if
//											try{
//											var n45=result["n44"];								
//											objectStore.delete(n44);
//											}catch(e){}
										if(!!dbjs.data["t41"]&&dbjs.data["t41"]=='已同步'){
											dbjs.data["t41"]='已同步';
										}else{
											dbjs.data["t41"]='本地';
										}
										objectStore.add(dbjs.data);
										dbjs["ts"]="操作成功";
										dbjs["next"]="next";
										//setTimeout(function(){
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
										//},3000);
										//console.log("tj");
									}//if
									else
									{
										dbjs["next"]="next";
										//setTimeout(function(){
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
										//},3000);
										//console.log("下一个");
									}
									return;
								}//游标
								else
								{
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										//console.log(dbjs.json["t44"]+"本地：");
										//console.log(dbjs.json["n44"]);
										var rs=js_db_cs(dbjs);
										j++;
										m++;
										if(rs.arr.length>0)//if
										{
											m--;
											
											var js=rs.arr[0];
											var n44=js.n44;
											var request_xg=objectStore.get(n44);
											request_xg.onsuccess=function(e){
												 var json_1=e.target.result;
												 if(!!dbjs.data["t41"]&&dbjs.data["t41"]=='已同步'){
													dbjs.data["t41"]='已同步';
												}else{
													dbjs.data["t41"]='本地';
												}
												for(var k in dbjs.data){//for
													//如果data的值是空白，数据库的值不是空白，保留原值。
													if(dbjs.data[k]==""&&json_1[k]!=""){
														json_1[k]=json_1[k];
													}else{
												 		json_1[k]=dbjs.data[k];
													}
												}//for
												objectStore.put(json_1);
												rs.ts="操作成功";
												rs["next"]="";
												//js_function_Callcack(eval(dbjs.callBack),[rs]);
											//	console.log("xg");
												
											};
										}//if
									}//有值
								}//游标
								result.continue();//这边执行轮询读取
							};//6
						break;//添加修改
						
						case "zc"://添加修改
							j=0;
							m=0;
							objectStore.openCursor().onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									if(j==m){//if
										if(!!dbjs.data["t41"]&&dbjs.data["t41"]=='已同步'){
											dbjs.data["t41"]='已同步';
											dbjs.data["n43"]=11;
										}else{
											dbjs.data["t41"]='本地';
											dbjs.data["n43"]=1;
										}
										objectStore.add(dbjs.data);
										dbjs["ts"]="操作成功";
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}//if
									return;
								}//游标
								else
								{
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										j++;
										m++;
										if(rs.arr.length>0)//if
										{
											m--;
											rs.ts="注册失败，手机号码或用户名不能重复";
											js_function_Callcack(eval(dbjs.callBack),[rs]);
											return;
										}//if
									}//有值
								}//游标
								result.continue();//这边执行轮询读取
							};//6
						break;//添加修改
						case "login"://添加修改
							j=0;
							m=0;
							objectStore.openCursor().onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									if(j==m){//if
										dbjs["ts"]="登录失败";
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}//if
									return;
								}//游标
								else
								{
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										j++;
										m++;
										if(rs.arr.length>0)//if
										{
											m--;
											rs.ts="登录成功";
											js_function_Callcack(eval(dbjs.callBack),[rs]);
											return;
										}//if
									}//有值
								}//游标
								result.continue();//这边执行轮询读取
							};//6
						break;//添加修改
					
						case "del"://删除
							objectStore.openCursor().onsuccess = function(event){//6
								var result=event.target.result;
								if(!!result==false){//游标
									dbjs.arr=[];
									dbjs.ts="没有找到记录";
									js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									return;
								}else{//游标
									if(event.target.result&&event.target.result.value){//有值
										var cursor = event.target.result.value;
										dbjs.json=cursor;
										var rs=js_db_cs(dbjs);
										if(rs.arr.length>0)
										{
											var js=rs.arr[0];
											var n44=js.n44;									
											objectStore.delete(n44);											 
											rs.ts="删除成功";
											js_function_Callcack(eval(dbjs.callBack),[rs]);
										}
									}//有值
									else{//有值
										dbjs.arr=[];
										js_function_Callcack(eval(dbjs.callBack),[dbjs]);
									}
								}//游标
								result.continue();//这边执行轮询读取 
								db.close();
							};
						break;//添加修改
						case "clear"://清空
							 objectStore.clear();
							 dbjs.ts="操作成功";
							 js_function_Callcack(eval(dbjs.callBack),[dbjs]);
						break;//清空
					}//switch
				}
			}
		}
	};
	req.onerror = function (evt) {//错误时
      console.error("HXDB:", evt.target.errorCode);
    };//错误时
    req.onupgradeneeded = function (evt) {//升级
	 	if(!evt.target.result.objectStoreNames.contains(dbjs.dbName)){//创建表
			var store = evt.currentTarget.result.createObjectStore(dbjs.dbName, {keyPath: 'n44', autoIncrement: true });
			store.createIndex('n42Index','n42',{unique:false});
			
		}//创建表
    };//升级
}

function js_db_read(tbn,bql,callback)
{
	dbq(
		{
			"tableName":tbn,
			"bql":bql,
			"sql":"",
			"iif":"and",
			"tss":"",
			"method":"read",
			"data":"",

			"callBack":callback
		}
	);
}

/*
	初始化数据
*/
function js_db_set(dbjs)
{
window.hx={};
window.hx.db={};
window.hx.db.arr=[];
//dbName
	if(!dbjs.dbName){
		dbjs.dbName='appDb';
	}
//data
if(dbjs.data&&isJson(dbjs.data)){
	//去除非正常的键值
	dbjs.data=db_check_key(dbjs.data);
//tableName
	if(dbjs.data&&dbjs.tableName&&!dbjs.data["t44"]){
		dbjs.data["t44"]=dbjs.tableName;
	}

if(dbjs.data){
//将data的null设置为空白
	for(var i=1;i<=45;i++){
		dbjs.data["t"+i]=dbjs.data["t"+i]?strE(dbjs.data["t"+i]):'';
		dbjs.data["n"+i]=dbjs.data["n"+i]?dbjs.data["n"+i]:'';
	}
//删除data的本地id，因为是自动增值的
//	delete(dbjs.data["n44"]);
	//设置发表人id和昵称
	dbjs.data["n24"]=gCookie("uid");
	dbjs.data["t43"]=strE(gCookie("un"));
	//设置时间戳
	if(dbjs.data["n43"]&&dbjs.data["n42"]&&dbjs.data["n43"]>=10){
		
	}else{
		dbjs.data["n42"]=jGetTime();
		//window.TBTime=jGetTime();//更新获取服务器数据的时间
	}
	//设置操作记录，1添加2修改3添加修改4有值添加-1删除
	if(!dbjs.data["n43"]||dbjs.data["n43"]==""){
		dbjs.data["n43"]=1;
	}
}
}
//以上data为json，以下为array
else if(isArray(dbjs.data)){
	var datab=[];
		for(var ii=0;ii<dbjs.data.length;ii++){
		//一条json
			var data=dbjs.data[ii];
			//去除非正常的键值
			data=db_check_key(data);
			if(data){
			//设置表名
				if(!data["t44"]){
					data["t44"]=dbjs.tableName;
				}
				//设置null的数据为空白
				for(var i=1;i<=45;i++){
					data["t"+i]=data["t"+i]?strE(data["t"+i]):'';
					data["n"+i]=data["n"+i]?data["n"+i]:'';
				}
				//发表人				
				data["n24"]=gCookie("uid");
				data["t43"]=strE(gCookie("un"));
				
				//服务器回传不改时间
				if(data["n43"]&&data["n42"]&&data["n43"]>=10){
					data["n42"]=data["n42"];
				}else{
					data["n42"]=jGetTime();
				}
				
				if(!data["n43"]||data["n43"]==""){
					data["n43"]=1;
				}
				datab[ii]=data;
			}
		}
		dbjs.data=datab;
	}
	return dbjs;
}
function db_tb(){
//-------------------------------
	if(!gCookie("TBTime2")){//正序时间
		js_cookie_set("TBTime2",1,365);
	}
	if(!gCookie("TBTime")){//倒序时间
		js_cookie_set("TBTime",jGetTime(),365);
	}

	if(!window.yx_n43){//优先回传
		window.yx_n43=11;
	}
			if(window.px==2){
				window.px=1;
			}
			else
			{
				window.px=2;
			}

var pd={};
pd.Time=gCookie("TBTime");
pd.Time2=gCookie("TBTime2");
pd.yx_n43=window.yx_n43;
//console.log("T1:"+pd.Time+',T2:'+pd.Time2+','+pd.yx_n43);
//--------------------------------
	dbq({"tableName":"医疗数据","bql":"n43==1 ","iif":"and","ts":"","method":"read","data":"","arr":[],"callBack":function(c){
		//console.dir(c);
		pd.arr="";
		if(c.arr.length>0){
			var arr=c["arr"];
			/*var Item=arr[0];
			if(Item["t44"]=="用户"){
				Item["n24"]=Item["n44"];
			}*/
			pd.arr=arr;
		}
		var js2={};
			js2.url="?lf=db_tb";
			js2.data="pd="+jsonE(pd);
			js2.cb=function(c){
				TB7(c);
			};
			jpost(js2);
	}});

}
function TB1()
{
	dbq({"tableName":"医疗数据","bql":"n43==1 ","iif":"and","ts":"","method":"read","data":"","arr":[],"callBack":function(c){
		//console.dir(c);
		if(c.arr.length>0){
			var arr=c["arr"];
			/*var Item=arr[0];
			if(Item["t44"]=="用户"){
				Item["n24"]=Item["n44"];
			}*/
			var str=jsonE(arr);
			
			var js2={};
			js2.url="?lf=tb";
			js2.data="pd="+str;
			js2.cb="TB2";
			
			jpost(js2);
		}
	}});
}
function TB2(js){
//console.dir(js);
	if(js){
		js=jsonD(js);
		if(js.ts=="操作成功"){
			ts("上传成功");
		}
	}
}
function TB5(){
	setTimeout(function(){
		TB4();
	},5000);
}
function TB4(){
	var tbsj=jid("tbsj").options[jid("tbsj").selectedIndex].value; 
	tbsj=tbsj*1000;
	db_tb();
	//TB1();
	/*setTimeout(function(){
		TB6();
	},5000);*/
	
	webtb=setTimeout(function(){
		TB4();
	},tbsj);
}
function TB6(){
	
	if(!window.TBTime){//正序时间
		window.TBTime=0;
	}
	
	if(!window.TBTime2){//倒序时间
		window.TBTime2=jGetTime();
	}
	
	if(!window.px){//初始为正序
		window.px=2;
	}
	if(!window.yx_n43){//优先回传
		window.yx_n43=11;
	}	
var pd={};
pd.Time=window.TBTime;
pd.Time2=window.TBTime2;
pd.px=window.px;
pd.yx_n43=window.yx_n43;
pd=jsonE(pd);
var js2={};
js2.url="?lf=tb_get";
js2.data="pd="+pd;
js2.cb="TB7";
jpost(js2);
}
function TB7(str){//同步返回处理
//console.dir(str);
	if(str){
		var js_get=jsonD(str);
		if(!!js_get["err"]){
			ts(js_get["err"]);
		}
		var arr_get=js_get.arr;
		
		//console.log(px);
		window.yx_n43=js_get["yx_n43"];
		if(js_get.arr.length>0){
			js_cookie_set("TBTime",js_get["Time"],365);
			if(gCookie("TBTime2")==js_get.Time2){
				js_cookie_set("TBTime2",1,365);
			}
			else{
				js_cookie_set("TBTime2",js_get.Time2,365);
			}
/*			if(px==1){
				js_cookie_set("TBTime",js_get["Time"],365);
				//window.TBTime=jGetTime();
			//window.TBTime=js_get.arr[js_get.arr.length-1]["n42"];
			}else{
			//	console.log(js_get.arr[js_get.arr.length-1]["n42"]-js_get.arr[0]["n42"]);
				js_cookie_set("TBTime",jGetTime(),365);
				if(gCookie("TBTime2")==js_get.Time2){
					js_cookie_set("TBTime2",1,365);
				}
				else{
					js_cookie_set("TBTime2",js_get.Time2,365);
				}
			//window.TBTime=js_get.arr[js_get.arr.length-1]["n42"];
			}*/
			var arr=js_get.arr;
			TB8(arr);
		}else{
		js_cookie_set("TBTime",1,365);
		}
	}else{
		js_cookie_set("TBTime",1,365);
		}
}
function TB8(arr){
	//console.log("TB8:");
	//console.dir(arr);
	if(arr.length>0){	
	setTimeout(function(){
		dbq({"tableName":"医疗数据","bql":"","tbflag":1,"iif":"and","ts":"","method":"tjxg","data":arr,"callBack":function(js){
			//ts(js.ts);
			if(js.ts=="操作成功"){
				var getNum=js.getNum;
				//my_log("更新了"+getNum+"条数据");				
			}
		}});
		},600);
	}
}
function js_db_tj(json)
{
var sql='';
if(json.sql){
sql=json.sql;
}
var pd={"tableName":json.tbn,"sql":sql,"method":"tj","data":json.data,"tss":"","isTB":0};
	jpost({
			"url":"load.php?load=load&f=phpPostDB",
			"data":"postData="+jsonE(pd),
			"cb":function(str){
			//console.dir(str);
			var json1=jsonD(str);
			ts(json1.ts);
			}
	});
}

function js_db_dq(json)
{
var sql='';
if(json.sql){
sql=json.sql;
}
var pd={"tableName":json.tbn,"sql":sql,"method":"select","data":{},"tss":"","isTB":0};
	jpost({
			"url":"load.php?load=load&f=phpPostDB",
			"data":"postData="+jsonE(pd),
			"cb":function(str){
			//console.dir(str);
			var json1=jsonD(str);
			eval(json.callBack).apply(this,[json1.arr]);
			}
	});
}

function js_db_tjkv(tbn,data,bql)
{
	dbq(
		{
			"tableName":tbn,
			"bql":bql,
			"sql":"",
			"iif":"and",
			"tss":"",
			"method":"tjkv",
			"data":data,
			"callBack":function(js){
				ts(js["ts"]);
			}
		}
	);
}
function url_get_par()
{
	var theRequest={};
	var url=location.href;
	var arr1=new RegExp("\[#|?](.+)", "g").exec(url);
	if(!arr1){
		var a='f=main';
	}else
	{
		var a=arr1[1];
	}
	//console.dir(a);
	var arr2 = a.split("&");
	//console.dir(arr2);
	var theRequest={};
	for(var j=0;j<arr2.length;j++)
	{
		var sTemp = arr2[j].split("=");
		theRequest[sTemp[0]]=sTemp[1];
	}
	return theRequest;
}
function jsonToUrl(obj)
{
	try{
	var urlpar=jsontourlpar(obj);
	urlpar='?'+urlpar;
	return urlpar;
	}catch(e){alert('partourl:'+e);}
}
function jsontourlpar(json)
{
	try{
		var str='';
		for(var key in json){
			str+=key+'='+json[key]+'&';
			}
			str=str.substr(0,str.length-1);
			return str;
		}catch(e){alert('1'+e);}
}
function js_fy(dbjs){
	len=dbjs.len;
	var pars=url_get_par();
	var js=url_get_par();
	pars["len"]=parseInt(len);
	js["len"]=parseInt(len);
	if(!pars["start"]){
		pars["start"]=0;
		js["start"]=0;
	}
//pars["len"]=parseInt(len);
	pars["start"]=parseInt(pars["start"])+parseInt(len);
	var url=jsonToUrl(pars);
	dbjs["url1"]=url;
	dbjs["down"]='<a href="'+url+'" >下页</a>';
	pars["start"]=js["start"];
	pars["start"]=parseInt(pars["start"])-parseInt(len);
	if(pars["start"]<0){
		pars["start"]=0;
	}
	var url2=jsonToUrl(pars);
	dbjs["url2"]=url2;
	dbjs["up"]='<a href="'+url2+'" >上页</a>';
	var ym={"up":dbjs["up"],"down":dbjs["down"]};
	dbjs.ym=ym;
	var zfy='<div id="zfy">'+dbjs["down"]+dbjs["up"]+'</div>';
	dbjs.zfy=zfy;
	if(!!dbjs.e){
		ap(zfy,dbjs.e,1);
	}
	return dbjs;
}
