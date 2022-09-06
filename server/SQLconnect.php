<?php
$SQLservername = "localhost";
$SQLusername = "root";
$SQLpassword = "";
$SQLdbname = "votedb";

$SQLconnection = new mysqli($SQLservername, $SQLusername, $SQLpassword, $SQLdbname);

if ($SQLconnection->connect_error) {
    die("Connection failed: "
    . $SQLconnection->connect_error);
};
?>