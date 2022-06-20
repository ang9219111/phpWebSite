<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
session_start();        //開啟session
header("Content-Type:text/html;charset=utf-8");


$sql = "SELECT * FROM `bossorder` WHERE `states` != '3'";
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