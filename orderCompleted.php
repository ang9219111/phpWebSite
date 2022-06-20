<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
session_start();        //開啟session
header("Content-Type:text/html;charset=utf-8");

$a=mb_substr ( $_SESSION['userId'] , 1 ,8 , "utf-8" ); 
$orderId = $_POST['orderId'];
$allOrder=$a."allorder";
$order=$a."order";

$sql1 = " UPDATE `$allOrder` SET `states` = '3' WHERE `orderId` = '$orderId' ";
$sql2 = " UPDATE `$order` SET `states` = '3' WHERE `orderId` = '$orderId' ";
$sql3 = " UPDATE `bossallorder` SET `states` = '3' WHERE `orderId` = '$orderId' ";
$sql4 = " UPDATE `bossorder` SET `states` = '3' WHERE `orderId` = '$orderId' ";

mysqli_query($link,$sql1);
mysqli_query($link,$sql2);
mysqli_query($link,$sql3);
mysqli_query($link,$sql4);


echo "完成商品";

mysqli_close($link); 
?>