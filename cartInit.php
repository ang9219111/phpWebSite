<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
session_start();        //開啟session
header("Content-Type:text/html;charset=utf-8");

echo $_SESSION['userName']."!".$_SESSION['userId']."!"; //取得index.php給的session (username)
$a=mb_substr ( $_SESSION['userId'] , 1 ,8 , "utf-8" );  //此處字串ex:"00000001",此處為了把""刪掉,才用這函式
$cart=$a."cart";  //這裡會長這樣ex:00000001cart

$sql = "SELECT *FROM `$cart`";
$result=mysqli_query($link,$sql);
$myArray = array();
while($row = mysqli_fetch_assoc($result)){
    $myArray[]= $row;
}
echo json_encode($myArray);
mysqli_close($link); 
?>