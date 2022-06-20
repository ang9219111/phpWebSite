<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
session_start();        //開啟session
header("Content-Type:text/html;charset=utf-8");

echo $_SESSION['userName']."!".$_SESSION['userId']."!"; //取得index.php給的session (username)

$sql = "SELECT *FROM `good`";
$result=mysqli_query($link,$sql);
$myArray = array();
while($row = mysqli_fetch_assoc($result)){
    $myArray[]= $row;
}
echo json_encode($myArray);
?>