<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php

//開啟session
session_start();
header("Content-Type:text/html;charset=utf-8");
$username=$_POST['username'];          //根據變數取得前端傳來的值
$password=$_POST['password'];

$check ="SELECT *FROM `user` WHERE `username`='$username'" ;       //去資料庫搜尋是否有一樣的username
$check1 ="SELECT * FROM `user` WHERE `username`='$username' AND`password`='$password'"; //去資料庫搜查是否有一樣的帳號密碼
$check2 = "SELECT `userId` FROM `user` WHERE `username`='$username' AND `password`='$password'";
$result = mysqli_query($link,$check2);
$myArray = array();
while($row = mysqli_fetch_assoc($result)){         //將資料以陣列的形式存起來
    $myArray[]= $row;
}
if(mysqli_num_rows(mysqli_query($link,$check))==0){     //判斷Row是否是0,是的話代表沒有從資料庫取到資料
    echo "帳號錯誤";
}
else{
    if(mysqli_num_rows(mysqli_query($link,$check1))==0){    //同上
        echo "密碼錯誤"; 
}
    else{                                   /*登入成功,並將username存入session,
                                            以便之後能夠使main.php取用並顯示於前端畫面*/
        $_SESSION["userId"]=json_encode($myArray[0]['userId']);//將使用者的id以session的形式傳輸.
        $_SESSION["userName"]=$username;
        echo "Login Success";    
       exit;
}
}
     mysqli_close($link); 
?>


