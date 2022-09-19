<?php

include_once '../SQLconnect.php';

try{
    $stmt = $conn->prepare("SELECT id, topic, start, end, user_id FROM poll");

    if ($stmt->execute() == false){
        $errorMsg = array(
            'error' => 'Failed to retrieve polls'
        );
    } else {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $errorMsg = $result;
    }
} catch (PDOException $e) {
    $errorMsg = array(
        'error' => 'An error with database occured.'
    )
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($errorMsg);