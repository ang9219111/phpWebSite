<?php
// 載入db.php來連結資料庫
require_once 'config.php';

?>

<?php
//addCart.php主要功能為將購物車商品加入資料庫內,以便後續使用者再使用購物車時,會有之前的紀錄.
$userId=$_POST["userId"];
$goodId=$_POST["goodId"];

$cart=$userId."cart";
$check = "DELETE FROM `$cart` WHERE `goodId`='$goodId'";

mysqli_query($link,$check);



mysqli_close($link);
?>