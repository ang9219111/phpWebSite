<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
session_start();        //開啟session
header("Content-Type:text/html;charset=utf-8");

echo $_SESSION['userName']."!".$_SESSION['userId']."!"; //取得index.php給的session (username)
$a=mb_substr ( $_SESSION['userId'] , 1 ,8 , "utf-8" ); 

$order=$a."order";

$sql = "SELECT * FROM `$order` WHERE `states` != '3'";
$empty = array(0=>array('endDate' => '',
'goodId' => '',
'goodName' => '無',
'goodNum'  => '0',
'goodPrice' => '0',
'orderId' => '無訂單',
'startDate' => '',
'states' => '-1',
'userId' => '')
);
$result=mysqli_query($link,$sql);
$myArray = array();
while($row = mysqli_fetch_assoc($result)){
    $myArray[]= $row;
}
if($myArray)
{
    echo json_encode($myArray);
}
else
{
    echo json_encode($empty);
}

mysqli_close($link);
?>