<?php
// 載入db.php來連結資料庫
require_once 'config.php';

?>

<?php

$userId = $_POST["userId"];
$cartId = $_POST["cartId"];
$totalMoney = $_POST["totalMoney"];

$cart = $userId . "cart";
$order = $userId . "order";
$allOrder = $userId . "allorder";
$check = "SELECT *FROM `bossallorder`"; //搜尋user資料表
$orderNum = mysqli_num_rows(mysqli_query($link, $check)); // 搜尋資料表內已有幾個訂單,以便後續自動生成id
$orderNum = $orderNum + 1;                                    //自動生成帳號id(系統辨識)
$orderNum = str_pad($orderNum, 8, "0", STR_PAD_LEFT);          //自動補0到八位數
$today = date('Y/m/d H:i:s');
$sql1 = "INSERT INTO `$order` (userId,goodId,goodNum,goodName,goodPrice) SELECT userId,goodId,goodNum,goodName,goodPrice FROM `$cart`";
$sql2 = "INSERT INTO `$allOrder` (`orderId`,`totalMoney`,`states`,`userId`,`startDate`)  VALUE('$orderNum','$totalMoney','1','$userId','$today') ";
$sql3 = "INSERT INTO `bossallorder` (`orderId`,`totalMoney`,`states`,`userId`,`startDate`) VALUE('$orderNum','$totalMoney','1','$userId','$today')";
$sql4 = "UPDATE `$order` SET
        `orderId` = '$orderNum',
        `startDate` = '$today',
        `states` = '1' 
        WHERE `orderId` = '' ";
$sql5 = "INSERT INTO `bossorder` (userId,goodId,goodNum,goodName,goodPrice) SELECT userId,goodId,goodNum,goodName,goodPrice FROM `$cart`";
$sql6 = "UPDATE `bossorder` SET 
        `orderId` = '$orderNum',
        `startDate` = '$today',
        `states` = '1'
        WHERE `orderId` = '' AND `userId` = '$userId'";
$sql7 = "DELETE FROM `$cart` ";
mysqli_query($link, $sql1);  //將消費者購物車內的產品直接複製到消費者訂單裡面去
mysqli_query($link, $sql2);  //將消費者訂單插入消費者總訂單(只有總金額跟訂單id)
mysqli_query($link, $sql3);  //將消費者訂單插入老闆訂單(只有總金額跟訂單id)裡.
mysqli_query($link, $sql4);  //給消費者訂單一個id
mysqli_query($link, $sql5);  //將消費者購物車內的產品複製到老闆總訂單(有訂單內的產品內容)
mysqli_query($link, $sql6);  //給老闆總訂單消費者訂單的id
mysqli_query($link, $sql7);



mysqli_close($link);
?>