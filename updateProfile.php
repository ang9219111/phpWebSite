<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php

header("Content-Type:text/html;charset=utf-8");

$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$realName = $_POST['realName'];
$address = $_POST['address'];

$sql = "UPDATE `user` SET `email` = '$email' , `phone` = '$phone',`realName` = '$realName' , `address` = '$address'WHERE `username`='$username' "; //當輸入的username 資料庫內部的資料,即更新其密碼.

$result = mysqli_query($link, $sql); //執行sql語法

if ($result) {  //如果受影響的row大於0,即代表有資料被更新過,也代表密碼修改成功
    echo "access";
} elseif (!$result) {    //反之,則代表密碼修改失敗.
    echo "修改失敗";
} else {
    echo "{$sql} 語法執行失敗，錯誤訊息: " . mysqli_error($link);
}
mysqli_close($link);
?>


