var xmlHTTP;

function $_xmlHttpRequest(){   
    if(window.ActiveXObject)
    {
        xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
        xmlHTTP=new XMLHttpRequest();
    }
}
var ob;
function init() 				//取得後端Session (username)的函式
{  
	$_xmlHttpRequest();
	xmlHTTP.open("POST","customerOrder.php", true);		
	xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                var oldOrderId;
                var str;
                var totalMoney = 0;
                str = xmlHTTP.responseText;
                str = str.split('!');       //暫且先用!做切割,假如username有!會有問題.
                ob = JSON.parse(str[2]);
                console.log(ob);
                document.getElementById("userName").innerHTML = str[0];
                var orderBody = document.getElementById("orderBody");
                var newTr;
                var newTh;
                var newTd;
                var newButton;
                var count=0;
                newTr = document.createElement("tr");
                newTh = document.createElement("th");
                newTh.setAttribute("colspan", "4");
                newTh.innerHTML = ob[0].startDate + "   訂單編號:" + ob[0].orderId;
                oldOrderId = ob[0].orderId;
                newTr.setAttribute("class", "table-primary");
                newTr.appendChild(newTh);
                orderBody.appendChild(newTr);
                for (var i = 0; i < ob.length; i++) {
                    if (ob[i].orderId != oldOrderId) {
                        newTr = document.createElement("tr");
                        newTh = document.createElement("th");
                        newTh.setAttribute("colspan", "4");
                        newTh.innerHTML = ob[i].startDate + "   訂單編號:" + ob[i].orderId;
                        oldOrderId = ob[i].orderId;
                        newTr.setAttribute("class", "table-primary");
                        newTr.appendChild(newTh);
                        orderBody.appendChild(newTr);
                        count = 0;
                    }
                    newTr = document.createElement("tr");
                    newTh = document.createElement("th");
                    count = count + 1;
                    newTh.innerHTML = count;
                    newTd = document.createElement("td");
                    newTd.innerHTML = ob[i].goodName;
                    newTr.appendChild(newTh);
                    newTr.appendChild(newTd);
                    newTd = document.createElement("td");
                    newTd.innerHTML = ob[i].goodPrice;
                    newTr.appendChild(newTd);
                    newTd = document.createElement("td");
                    newTd.innerHTML = ob[i].goodNum;
                    newTr.appendChild(newTd);
                    orderBody.appendChild(newTr);
                    totalMoney += ob[i].goodNum * ob[i].goodPrice;
                    if (i + 1 < ob.length) {
                        if (ob[i + 1].orderId != oldOrderId || i == (ob.length - 1)) {  //判斷什麼時候要印出訂單編號

                            newTr = document.createElement("tr");
                            newTh = document.createElement("th");
                            newTh.setAttribute("colspan", "4");
                            newTh.innerHTML = "總金額:" + totalMoney;
                            newTr.appendChild(newTh);
                            newTh.setAttribute("style", "text-align:right");
                            orderBody.appendChild(newTr);
                            totalMoney = 0;

                            newTr = document.createElement("tr");
                            newTh = document.createElement("th");
                            newTh.setAttribute("colspan", "4");
                            newTh.setAttribute("style", "text-align:right");
                            newButton = document.createElement("button");
                            switch (ob[i].states) {
                                case '-1':
                                    newButton.setAttribute("class","btn btn-secondary");
                                    newButton.setAttribute("type","button");
                                    newButton.setAttribute("disabled",true);
                                    newButton.innerHTML = "訂單為空";
                                    break;
                                case '0':
                                    newButton.setAttribute("class", "btn btn-secondary");
                                    newButton.setAttribute("type", "button");
                                    newButton.setAttribute("disabled", true);
                                    newButton.innerHTML = "訂單已送出";
                                    break;

                                case '1':
                                    newButton.setAttribute("class", "btn btn-secondary");
                                    newButton.setAttribute("type", "button");
                                    newButton.setAttribute("disabled", true);
                                    newButton.innerHTML = "店家處理訂單中";
                                    break;

                                case '2':
                                    newButton.setAttribute("class", "btn btn-warning");
                                    newButton.setAttribute("type", "button");
                                    var completedButtonId = "completedButton" + i;
                                    newButton.setAttribute("id",""+completedButtonId+"");
                                    newButton.setAttribute("onclick","completedOrder('"+ob[i].orderId+"','"+completedButtonId+"')");
                                    newButton.innerHTML = "完成訂單";
                                    break;
                                case '3':
                                    break;
                            }
                            newTh.appendChild(newButton);
                            newTr.appendChild(newTh);
                            orderBody.appendChild(newTr);

                        }
                    }
                    else {          //判斷什麼時候要印出訂單編號

                        newTr = document.createElement("tr");
                        newTh = document.createElement("th");
                        newTh.setAttribute("colspan", "4");
                        newTh.innerHTML = "總金額:" + totalMoney;
                        newTh.setAttribute("style", "text-align:right");
                        newTr.appendChild(newTh);
                        orderBody.appendChild(newTr);
                        totalMoney = 0;

                        newTr = document.createElement("tr");
                        newTh = document.createElement("th");
                        newTh.setAttribute("colspan", "4");
                        newButton = document.createElement("button");
                        newTh.setAttribute("style", "text-align:right");
                        switch (ob[i].states) {
                            case '-1':
                                newButton.setAttribute("class","btn btn-secondary");
                                newButton.setAttribute("type","button");
                                newButton.setAttribute("disabled",true);
                                newButton.innerHTML = "訂單為空";
                                break;
                            case '0':
                                newButton.setAttribute("class", "btn btn-secondary");
                                newButton.setAttribute("type", "button");
                                newButton.setAttribute("disabled", true);
                                newButton.innerHTML = "訂單已送出";
                                break;

                            case '1':
                                newButton.setAttribute("class", "btn btn-secondary");
                                newButton.setAttribute("type", "button");
                                newButton.setAttribute("disabled", true);
                                newButton.innerHTML = "店家處理訂單中";
                                break;

                            case '2':
                                newButton.setAttribute("class", "btn btn-warning");
                                newButton.setAttribute("type", "button");
                                var completedButtonId = "completedButton" + i;
                                newButton.setAttribute("id",""+completedButtonId+"");
                                newButton.setAttribute("onclick","completedOrder('"+ob[i].orderId+"','"+completedButtonId+"')");
                                newButton.innerHTML = "完成訂單";
                                break;

                            case '3':
                                break;

                        }
                        newTh.appendChild(newButton);
                        newTr.appendChild(newTh);
                        orderBody.appendChild(newTr);

                    }
                }
            }
        }
    }
	xmlHTTP.send(null);
}

function completedOrder(orderId,completedButtonId) {

    $_xmlHttpRequest();
    var completedButton = document.getElementById(""+completedButtonId+"");
    xmlHTTP.open("POST", "orderCompleted.php", true);
    var data = 'orderId='+orderId;
    console.log(orderId);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHTTP.onreadystatechange = function check_user() {
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                completedButton.setAttribute("class","btn btn-secondary");
                completedButton.innerHTML = "已完成訂單";
                completedButton.setAttribute("disabled",true);
            }
        }
    }
    xmlHTTP.send(data);

}