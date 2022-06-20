<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php

$userId=$_POST['userId'];
$goodId=$_POST['goodId'];
$goodNum=$_POST['goodNum'];


$cart=$userId."cart";
$sql = "UPDATE `$cart` SET `goodNum`='$goodNum' WHERE `goodId`='$goodId'";

mysqli_query($link,$sql);
mysqli_close($link); 
?>