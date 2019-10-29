window.addEventListener('error',function(e){
alert("错误:"+e.message+",\n"+e.stack+",\n名称:"+e.name+",\n文件:"+e.filename+"\n行："+e.lineno);     });
