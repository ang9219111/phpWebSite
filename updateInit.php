<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
header("Content-Type:text/html;charset=utf-8");

session_start();        //開啟session
$userName=$_SESSION['userName'];

$sql = "SELECT * FROM `user` WHERE `username` = '$userName'";

$result = mysqli_query($link,$sql);
$myArray = array();

while($row = mysqli_fetch_assoc($result)){
    $myArray[]= $row;
}
echo $userName."!";


echo json_encode($myArray);


?>