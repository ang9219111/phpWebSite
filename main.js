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
	xmlHTTP.open("POST","main.php", true);		
	xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                var str;
                str=xmlHTTP.responseText;
				str = str.split('!');       //暫且先用!做切割,假如username有!會有問題.
				ob = JSON.parse(str[2]);
                document.getElementById("userName").innerHTML=str[0];
                var goodDiv = document.getElementById("goodDiv");
                var newDiv;
                var newLabel;
                for(var i=0;i<ob.length;i++)
                {
                    console.log(i);
                    newDiv = document.createElement("div");
                    newLabel = document.createElement("label");
                    newLabel.innerHTML=ob[i].goodName+"<br>"+ob[i].goodPrice;
                    newDiv.appendChild(newLabel);
                    goodDiv.appendChild(newDiv);
                    newDiv.setAttribute("style","border:5px black solid");

                    newDiv.setAttribute("onclick","addCart('"+ob[i].goodName+"',"+ob[i].goodPrice+",'"+ob[i].id+"',"+str[1]+")"); 
                    /*將商品的id以及使用者的id
                    傳輸給前端,以便將商品加入購物車*/
                    newDiv.setAttribute("class","col");
                    newDiv.setAttribute("align","center");
                }
            }
        }
    }
	xmlHTTP.send(null);
}

function addCart(goodName,goodPrice,goodId,userId)
{
    $_xmlHttpRequest();
    var data = 'userId='+userId+'&goodId='+goodId+'&goodName='+goodName+'&goodPrice='+goodPrice;
    xmlHTTP.open("POST","addCart.php", true);		
	xmlHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHTTP.onreadystatechange=function check_user(){
        if(xmlHTTP.readyState == 4){
            if(xmlHTTP.status == 200){
                var str;
                str=xmlHTTP.responseText;
                //alert(goodName+"已成功加入購物車");
            }
        }
    }
    xmlHTTP.send(data);
    console.log(userId);
    console.log(goodName);
    console.log(goodId);
    console.log("123");
}
