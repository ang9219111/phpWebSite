<?php
// 載入db.php來連結資料庫
require_once 'config.php';

?>

<?php
//addCart.php主要功能為將購物車商品加入資料庫內,以便後續使用者再使用購物車時,會有之前的紀錄.
$userId=$_POST["userId"];
$goodId=$_POST["goodId"];
$goodName=$_POST["goodName"];
$goodPrice=$_POST["goodPrice"];
$goodType = $_POST["goodType"];

$cart=$userId."cart";

$check = "SELECT *FROM `$cart` WHERE `goodId`='$goodId'";
$result=mysqli_query($link,$check);
if(mysqli_num_rows(mysqli_query($link,$check))==0){
    $sql = "INSERT INTO `$cart` (`cartId`,`userId`,`goodId`,`goodName`,`goodNum`,`goodPrice`,`goodType`) VALUE('$userId','$userId','$goodId','$goodName','1','$goodPrice','$goodType')";
    mysqli_query($link,$sql);
}
else{
    $myArray = array();
    while($row = mysqli_fetch_assoc($result)){
    $myArray[]= $row;
    }
    $num=$myArray[0]['goodNum']+1;
    if($num<=10)    //避免購物車內的商品數量超過10
    {
        $sql2= "UPDATE `$cart` SET `goodNum`='$num' WHERE `goodId` = '$goodId'";
        mysqli_query($link,$sql2);
        echo "goodNum".$num;
    }
}




echo "cartId:".$cart;

mysqli_close($link);
?>