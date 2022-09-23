<?php

if(isset($_GET['id'])){
    header('Location: ../../index.php');
}

$optionid = $_GET['id'];

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("UPDATE option SET votes = votes + 1 WHERE (id = :optionid);");
    $stmt->bindParam(':optionsid', $optionid);

    if ($stmt->execute() == false){
        $data = array(
            'error' => 'Failed to execute SQL statement.'
        );
    } else {
        $data = array(
            'success' => 'Vote successful!'
        );
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'Couldnt vote'
    );
}