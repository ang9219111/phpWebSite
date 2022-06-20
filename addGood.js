var xmlHTTP;

function $_xmlHttpRequest() {                //連線函式
    if (window.ActiveXObject) {
        xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHTTP = new XMLHttpRequest();
    }
}

//新增商品的js檔
function checkData() {
    var goodName = document.getElementById("goodName").value;
    var goodPrice = document.getElementById("goodPrice").value;
    var goodType = document.getElementById("goodType").value;
    var goodPicture = document.getElementById("goodPicture").value;
    console.log(goodPicture);
    var data = 'goodName=' + goodName + '&goodPrice=' + goodPrice +
     '&goodPicture=' + goodPicture +'&goodType=' +goodType;
    $_xmlHttpRequest();                                  //相同的話,傳輸資料去後端
    xmlHTTP.open("POST", "addGood.php", true);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHTTP.onreadystatechange = function check_user() {
        if (xmlHTTP.readyState == 4) {
            if (xmlHTTP.status == 200) {
                var str = xmlHTTP.responseText;
                document.getElementById("accountError").innerHTML = str;
            }
        }
    }
    xmlHTTP.send(data);

    return false;

}