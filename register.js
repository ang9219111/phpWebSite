var xmlHTTP;

function $_xmlHttpRequest(){                //連線函式
    if(window.ActiveXObject)
    {
        xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
        xmlHTTP=new XMLHttpRequest();
    }
}

function checkData(){       
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    var againPassword=document.getElementById("againPassword").value;
    var data = 'username='+username+'&password='+password;
    $_xmlHttpRequest();

    if(password!=againPassword){            //於前端判斷密碼以及再次輸入密碼是否不同
        document.getElementById("accountError").innerHTML="密碼及再次輸入密碼不同";
    }
    else{                                   //相同的話,傳輸資料去後端
        xmlHTTP.open("POST","register.php", true);
        xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHTTP.onreadystatechange=function check_user(){
            if(xmlHTTP.readyState == 4){
                if(xmlHTTP.status == 200){
                    var str=xmlHTTP.responseText;
                    if(str=="Register Success"){        //註冊成功的話,就跳入登入畫面
                        location.href="index.html";
                    }
                    document.getElementById("accountError").innerHTML=str;
                }
            }
        }
        xmlHTTP.send(data);
    }
    return false;

}