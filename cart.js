var xmlHTTP;

function $_xmlHttpRequest() {
    if (window.ActiveXObject) {
        xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHTTP = new XMLHttpRequest();
    }
}
var ob;
var total=0;
function init() 				//取得後端Session (username)的函式
{
    $_xmlHttpRequest();
    xmlHTTP.open("POST", "cartInit.php", true);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHTTP.onreadystatechange = function check_user() {
        if (xmlHTTP.readyState == 4) {
            if (xmlHTTP.status == 200) {
                var str;
                var count =0;
                str=xmlHTTP.responseText;
				str = str.split('!');       //暫且先用!做切割,假如username有!會有問題.
				ob = JSON.parse(str[2]);
                document.getElementById("userName").innerHTML=str[0];  //印出用戶名稱
                var orderBody = document.getElementById("orderBody");
                var newTr = document.createElement("tr");
                var newTh = document.createElement("th");
                var newTd
                var newButton ;
                newTh.innerHTML= "購物車";
                newTh.setAttribute("colspan", "6");
                newTr.setAttribute("class", "table-primary");
                newTr.appendChild(newTh);
                orderBody.appendChild(newTr);
                for(var i = 0 ; i<ob.length ; i++)
                {
                    newTr=document.createElement("tr");
                    newTh=document.createElement("th");
                    newTr.setAttribute("id","newTr"+i+"");
                    count = count + 1;
                    newTh.innerHTML=count;
                    newTh.setAttribute("style","text-align:center");
                    newTr.appendChild(newTh);

                    newTd = document.createElement("td");
                    newTd.innerHTML=ob[i].goodName;
                    newTd.setAttribute("style","text-align:center");
                    newTr.appendChild(newTd);

                    newTd = document.createElement("td");
                    newTd.innerHTML = ob[i].goodPrice;
                    newTr.appendChild(newTd);

                    newTd = document.createElement("td");

                    newDiv1 = document.createElement("div");
                    newDiv1.setAttribute("class","input-group w-50");
                    newDiv1.setAttribute("style","margin:auto");
                    newTd.appendChild(newDiv1);
                    newDiv2 = document.createElement("div");
                    newDiv2.setAttribute("class","input-group-prepend");
                    newDiv1.appendChild(newDiv2);
                    newButton = document.createElement("button");
                    newButton.setAttribute("type","button")
                    newButton.setAttribute("class","btn btn-outline-secondary");
                    newButton.setAttribute("onclick","subNum('"+i+"','"+ob[i].userId+"','"+ob[i].goodId+"','"+i+"')");
                    newButton.innerHTML="減";
                    newDiv2.appendChild(newButton);
                    newDiv1.innerHTML+="<input type='text'class='form-control' id='"+i+"'value='"+ob[i].goodNum+"' style='text-align:center' >";
                    newDiv3 = document.createElement("div");
                    newDiv3.setAttribute("class","input-group-append");
                    newDiv1.appendChild(newDiv3);
                    newButton = document.createElement("button");
                    newButton.setAttribute("type","button")
                    newButton.setAttribute("class","btn btn-outline-secondary");
                    newButton.setAttribute("onclick","addNum('"+i+"','"+ob[i].userId+"','"+ob[i].goodId+"','"+i+"')");
                    newButton.innerHTML="加";
                    newDiv3.appendChild(newButton);
                    newTd.setAttribute("style","text-align:center");
                    newTr.appendChild(newTd);

                    newTd = document.createElement("td");
                    newTd.setAttribute("id","td"+i+"");
                    newTd.innerHTML= ""+ob[i].goodPrice*ob[i].goodNum+"";
                    newTr.appendChild(newTd);
                    newTd = document.createElement("td");
                    newTd.innerHTML = "<button class='btn btn-primary' onclick=deleteGood('"+i+"','"+ob[i].goodName+"','"+ob[i].goodId+"','"+ob[i].userId+"','"+i+"')>刪除</button>";
                    newTd.setAttribute("style","text-align:center");
                    newTr.appendChild(newTd);
                    orderBody.appendChild(newTr);
                    total=total+(ob[i].goodNum*ob[i].goodPrice);
                    //(numId,goodName,goodId,userId,i
                }
                newTr = document.createElement("tr");
                newTh = document.createElement("th");
                newTh.setAttribute("colspan", "6");
                newTh.innerHTML = "總金額:" + total;
                if(total==0)
                {
                    newTh.innerHTML = "購物車為空" ;
                }
                newTh.setAttribute("id","total");
                newTr.appendChild(newTh);
                newTh.setAttribute("style", "text-align:right");
                orderBody.appendChild(newTr);

                newTr = document.createElement("tr");
                newTh = document.createElement("th");
                newTh.setAttribute("colspan", "6");
                newTh.innerHTML = "<button type='button' class='btn btn-warning' onclick=sendCart()>送出訂單</button>";
                newTh.setAttribute("style", "text-align:right");
                newTr.appendChild(newTh);
                
                orderBody.appendChild(newTr);
            
            }
        }
    }
    xmlHTTP.send(null);
}

function addNum(numId,userId,goodId,i)  //當點選+鍵時
{
    console.log(numId);
    var num =document.getElementById(""+numId+"").value;    //讀取現在商品的數量
    if(parseInt(num)<10)        //數量不可超過10
    {
        num=parseInt(num)+parseInt(1);  //自動將商品數量+1;
        total+=ob[i].goodPrice*1;       //更新訂單總金額
        document.getElementById("td"+i+"").innerHTML=ob[i].goodPrice*num;
        document.getElementById("total").innerHTML="total:"+total; //顯示總金額
        document.getElementById(""+numId+"").value=num; //改變商品數量為更改後數量
        numChange(num,userId,goodId);   //執行數量改變後的funciton
    }
}

function subNum(numId,userId,goodId,i)  //當點選-鍵時
{
    var num =document.getElementById(""+numId+"").value;    //讀取現在商品的數量
    if(parseInt(num)>1)     //數量不可小於1
    {
        num=parseInt(num)-parseInt(1);      //自動將商品數量+1
        total-=ob[i].goodPrice*1;           //更新訂單總金額
        document.getElementById("td"+i+"").innerHTML=ob[i].goodPrice*num;
        document.getElementById("total").innerHTML="total:"+total; //顯示總金額
        document.getElementById(""+numId+"").value=num; //改變商品數量為更改後數量
        numChange(num,userId,goodId);   //執行數量改變後的function
    }

}

function numChange(newInputNum,userId,goodId)       //溝通後端的function,將更新後的商品數量傳至後端
{   
    $_xmlHttpRequest();
    var data = 'userId='+userId+'&goodId='+goodId+'&goodNum='+newInputNum;
    xmlHTTP.open("POST","updateCartNum.php", true);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                //var str;
                //str=xmlHTTP.responseText;
            }
        }
    }
    xmlHTTP.send(data);

}

function deleteGood(numId,goodName,goodId,userId,i) //刪除商品按鍵的function
{
    var num =document.getElementById(""+numId+"").value;    //取得現有商品的數量
    total-=num*ob[i].goodPrice; //更新訂單總金額(新總金額=原總金額-(被刪除商品數量*被刪除商品價格)))*
    var orderBody = document.getElementById("orderBody");   //
    var newTr = document.getElementById("newTr"+i+"");
    document.getElementById("total").innerHTML="total:"+total;
    if(total==0)
    {
        document.getElementById("total").innerHTML="購物車為空";

    }
    orderBody.removeChild(newTr);    //刪除商品的div

    $_xmlHttpRequest();     //將商品被刪除的資訊傳至後端.
    var data = 'userId='+userId+'&goodId='+goodId;
    xmlHTTP.open("POST","cartDelete.php", true);
    xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                //var str;
                //str=xmlHTTP.responseText;
                //alert(goodName+"已刪除");
            }
        }
    }
    xmlHTTP.send(data);
}

function sendCart() //送出購物車的內容
{
    if(total==0){   
        alert("購物車為空,不可送出訂單");
    }
    else{   //購物車不為空,因此送出購物車的內容.
        $_xmlHttpRequest();
        var data='userId='+ob[0].userId+'&cartId='+ob[0].cartId+'&totalMoney='+total;
        xmlHTTP.open("POST","cartSend.php", true);
        xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHTTP.onreadystatechange=function check_user(){
            if(xmlHTTP.readyState == 4){
                if(xmlHTTP.status == 200){
                    //var str;
                    //str=xmlHTTP.responseText;
                    //alert("訂單已送出");
                    document.getElementById("orderBody").innerHTML="";
                    total=0;
                    init();
                }
                else{
                    alert("訂單送出失敗");
                }
            }
        }
        xmlHTTP.send(data);
    }
}
