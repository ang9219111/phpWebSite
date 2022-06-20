
function checkData(){                                   //前端與後端資料傳遞
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    fetch("index.php",{
        method:"POST",
        body:encodeURI('username='+username+'&password='+password
        ),
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
        }
    })
    .then(function(res){
        return res.text();
    
    }).then(function(result){
        if(result=="Login Success")
        {
            location.href="main.html";
        }
        console.log(result);
        document.getElementById("accountError").innerHTML=result;
    
    });                                      //前端 傳輸資料給 後端
    return false;
}
/*fetch("index.php",{
    method:"POST",
    body:encodeURI(JSON.stringify({
        username:username,
        password:password
    })),
    headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
    }
})
.then(function(res){
    if(res.text()=="Login Success")
    {
        location.href="main.html";
    }
    document.getElementById("accountError").innerHTML=str;

}).catch(function(err){

});*/
 