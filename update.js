var xmlHTTP;

function $_xmlHttpRequest() {    //連線函式
    if (window.ActiveXObject) {
        xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHTTP = new XMLHttpRequest();
    }
}

var ob;
function init() {
    $_xmlHttpRequest();
    xmlHTTP.open("POST", "updateInit.php", true);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHTTP.onreadystatechange = function check_user() {
        if (xmlHTTP.readyState == 4) {
            if (xmlHTTP.status == 200) {
                var str;
                str = xmlHTTP.responseText;
                str = str.split("!");
                ob = JSON.parse(str[1]);
                document.getElementById("userName").innerHTML = str[0];
                document.getElementById("userName2").innerHTML = str[0];
                document.getElementById("userName3").value = str[0];
                document.getElementById("email").value = ob[0].email;
                document.getElementById("phone").value = ob[0].phone;
                document.getElementById("realName").value = ob[0].realName;
                document.getElementById("address").value = ob[0].address;
            }
        }
    }
    xmlHTTP.send(null);
}

function changeProfile() {                                   //前端與後端資料傳遞
    var userName = document.getElementById("userName3").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var realName = document.getElementById("realName").value;
    var address = document.getElementById("address").value;
    fetch("updateProfile.php", {
        method: "POST",
        body: encodeURI('username=' + userName + '&email=' + email + '&phone=' + phone + '&realName=' + realName + '&address=' + address
        ),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
    })
        .then(function (res) {
            return res.text();

        }).then(function (result) {
            if (result == "access") {
                alert("修改成功");
            }
            console.log(result);
            document.getElementById("updateError").innerHTML = result;
        });

    return false;
}

function checkData() {
    var password = document.getElementById("password").value;
    var newpassword = document.getElementById("newpassword").value;
    var newApassword = document.getElementById("newApassword").value;
    var data = 'password=' + password + '&newpassword=' + newpassword;
    $_xmlHttpRequest();

    if (newpassword != newApassword) {      //於前端確認輸入密碼以及再次輸入密碼是否相同
        document.getElementById("updateError").innerHTML = "密碼及再次輸入密碼不同";
    }
    else {                               //相同則傳輸至後端
        xmlHTTP.open("POST", "update.php", true);
        xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHTTP.onreadystatechange = function check_user() {
            if (xmlHTTP.readyState == 4) {
                if (xmlHTTP.status == 200) {
                    var str = xmlHTTP.responseText;
                    console.log(str);
                    document.getElementById("updateError").innerHTML = str;
                }
            }
        }
        xmlHTTP.send(data);
    }
    return false;

}