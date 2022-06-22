var xmlHTTP;

function $_xmlHttpRequest(){    //連線函式
    if(window.ActiveXObject)
    {
        xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
        xmlHTTP=new XMLHttpRequest();
    }
}

function init(){
	$_xmlHttpRequest();
	xmlHTTP.open("POST","updateInit.php", true);		
	xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                var str;
                str=xmlHTTP.responseText;
                document.getElementById("userName").innerHTML=str;
                document.getElementById("userName2").innerHTML=str;

            }
        }
    }
	xmlHTTP.send(null);
}
function checkData(){
    var password=document.getElementById("password").value;
    var newpassword=document.getElementById("newpassword").value;
    var newApassword=document.getElementById("newApassword").value;
    var data ='password='+password+'&newpassword='+newpassword;
    $_xmlHttpRequest();

    if(newpassword!=newApassword){      //於前端確認輸入密碼以及再次輸入密碼是否相同
        document.getElementById("updateError").innerHTML="密碼及再次輸入密碼不同";
    }
    else{                               //相同則傳輸至後端
        xmlHTTP.open("POST","update.php", true);
        xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHTTP.onreadystatechange=function check_user(){
            if(xmlHTTP.readyState == 4){
                if(xmlHTTP.status == 200){
                    var str=xmlHTTP.responseText;
                    console.log(str);
                    if(str=="密碼修改完成")         //密碼修改完成,即跳轉頁面
                    {
                        location.href="main.html";
                    }
                    document.getElementById("updateError").innerHTML=str;
                }
            }
        }
        xmlHTTP.send(data);
    }
    return false;

}