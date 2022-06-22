<?php

session_start();        //開啟session
$userName=$_SESSION['userName'];
if($userName)
{
    echo $userName;

}
else{
    echo null;
}
?>