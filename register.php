<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
$username = $_POST['username'];

$password = $_POST['password'];

$check = "SELECT *FROM `user` WHERE `username`='$username'";     //去資料庫搜尋是否有一樣的username存在
$check1 = "SELECT *FROM `user`"; //搜尋user資料表
$acNum = mysqli_num_rows(mysqli_query($link, $check1)); // 搜尋資料表內已有幾隻帳號,以便後續自動生成id
$acNum = $acNum + 1;                                    //自動生成帳號id(系統辨識)
$acNum = str_pad($acNum, 8, "0", STR_PAD_LEFT);          //自動補0到八位數
$cart = $acNum . "cart";
$order = $acNum . "order";
$allOrder = $acNum . "allorder";
if (mysqli_num_rows(mysqli_query($link, $check)) == 0) {             //如果row是0,代表沒有人使用過這username
    $sql = "INSERT INTO `user` (`username`,`password`,`userId`) VALUE('$username','$password','$acNum')"; //將使用者註冊的username及密碼及自動生成id插入資料庫
    if (mysqli_query($link, $sql)) {     //插入後,回傳註冊成功給前端(顯示於使用者畫面)
        $sql1 = "CREATE TABLE `$cart`(`cartId` VARCHAR(8) NOT NULL, `userId` VARCHAR(8) NOT NULL,
        `goodId` VARCHAR(8) NOT NULL,`goodNum` VARCHAR(8) NOT NULL,`goodName`VARCHAR(8) NOT NULL,`goodPrice` VARCHAR(8) NOT NULL )";
        $sql2 = "CREATE TABLE `$order`(`orderId` VARCHAR(8) NOT NULL, `userId` VARCHAR(8) NOT NULL,
        `goodId` VARCHAR(8) NOT NULL,`goodName` VARCHAR(8) NOT NULL,`goodNum` VARCHAR(8) NOT NULL,`goodPrice` VARCHAR(8) NOT NULL,`states` VARCHAR(8) NOT NULL,`startDate` VARCHAR(25) NOT NULL
        ,`endDate` VARCHAR(25) NOT NULL)";
        $sql3 = "CREATE TABLE `$allOrder`(`orderId` VARCHAR(8) NOT NULL, `userId` VARCHAR(8) NOT NULL,`totalMoney` VARCHAR(8) NOT NULL,`states` VARCHAR(8) NOT NULL,`startDate` VARCHAR(25) NOT NULL
        ,`endDate` VARCHAR(25) NOT NULL)";
        mysqli_query($link, $sql1);
        mysqli_query($link, $sql2);
        mysqli_query($link, $sql3);
        echo "Register Success";
        exit;
    } else {
        echo "Error creating table: " . mysqli_error($link);
    }
} else {
    echo "該帳號已有人使用";
}
mysqli_close($link);
?>


