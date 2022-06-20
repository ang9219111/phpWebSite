<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
$username=$_POST['username'];
$password=$_POST['password'];
$newpassword=$_POST['newpassword'];

$sql = "UPDATE `user` SET`password` = '$newpassword' WHERE `username`='$username' 
AND `password`= '$password'"; //當輸入的username 及 password 吻合 資料庫內部的資料,即更新其密碼.

$result = mysqli_query($link,$sql); //執行sql語法

    if (mysqli_affected_rows($link)>0) {  //如果受影響的row大於0,即代表有資料被更新過,也代表密碼修改成功
        echo "密碼修改完成";
        exit;
    }
    elseif(mysqli_affected_rows($link)==0) {    //反之,則代表密碼修改失敗.
        echo "密碼修改失敗";
    }
    else {
        echo "{$sql} 語法執行失敗，錯誤訊息: " . mysqli_error($link);
    }
     mysqli_close($link); 
?>


