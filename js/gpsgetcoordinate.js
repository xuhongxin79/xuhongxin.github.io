//浏览器定位
function gpsgetcoordinate(){
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function (position) {
s="";
        lng=position.coords.longitude;
        lat=position.coords.latitude;
        s += "准确度" + position.coords.accuracy;
        s += "海拔" + position.coords.altitude;
        s += "海拔准确度" + position.coords.altitudeAcuracy;
        s += "行进方向" + position.coords.heading;
        s += "地面速度" + position.coords.speed;
        s += "请求的时间" + new Date(position.timestamp);
par=url_get_par();
if(par.url){
location.href=decodeURIComponent(par.url)+"&lng="+lng+"&lat="+lat;

}

//location.href="http://hongxin.byethost15.com?f=gpszbset&lng="+lng+"&lat="+lat;

//ap("{lng:"+lng+",lat:"+lat+"}",document.body,1);
      }, function (err) {
ap("错误，请刷新页面",document.body,1);
window.location.reload();
       // alert(err.code);
// code：返回获取位置的状态
//          0  :  不包括其他错误编号中的错误
// ​		     1  :  用户拒绝浏览器获取位置信息
// ​		     2  :  尝试获取用户信息，但失败了
// ​		     3  :   设置了timeout值，获取位置超时了
      }, {
          enableHighAcuracy: false, //位置是否精确获取
          timeout: 10000,            //获取位置允许的最长时间
          maximumAge: 1000          //多久更新获取一次位置
        });
}else{
ap("{err:'不能定位'}",document.body,1);

}
}
