<?php
// 載入db.php來連結資料庫
require_once 'config.php';
?>
<?php
//新增商品的php檔
header("Content-Type:text/html;charset=utf-8");
$goodName=$_POST['goodName'];

$goodPrice=$_POST['goodPrice'];
$goodType=$_POST['goodType'];

$check ="SELECT *FROM `good` WHERE `goodName`='$goodName'";     //去資料庫搜尋是否有一樣的username存在
$check1 = "SELECT *FROM `good`"; //搜尋good資料表
$goodNum=mysqli_num_rows(mysqli_query($link,$check1)); // 搜尋資料表內已有幾個商品,以便後續自動生成id
$goodNum=$goodNum+1;                                    //自動生成商品id(系統辨識)
$goodNum=str_pad($goodNum,8,"0",STR_PAD_LEFT);          //自動補0到八位數

if(mysqli_num_rows(mysqli_query($link,$check))==0){             //如果row是0,代表資料庫目前沒有此商品名稱
    $sql = "INSERT INTO `good` (`goodName`,`goodPrice`,`goodId`,`goodType`) VALUE('$goodName','$goodPrice','$goodNum','$goodType')"; //將使用者註冊的username及密碼插入資料庫
    if(mysqli_query($link, $sql)){     //插入後,回傳註冊成功給前端(顯示於使用者畫面)
        echo "新增成功";
        exit;
    }else{
        echo "Error creating table: " . mysqli_error($link);
    }
}
else{ 
    echo "該商品名稱已取過";

}
     mysqli_close($link); 
?>


