<?php
$servername = "localhost";
$db_user = "root";
$db_pass = "";
$db = "votedb";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>