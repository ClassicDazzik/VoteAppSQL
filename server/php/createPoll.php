<?php
session_start();
if (!isset($_SESSION['user_id'])){
    $errorMsg = array(
        'error' => 'You must be logged in to create polls.'
    );
    die();
}


if (!isset($_POST['topic']) || !isset($_POST['option1'])){
    $errorMsg = array(
        'error' => 'No data found.'
    );
    die();
}

$topic = $_POST['topic'];
$start = $_POST['start'];
$end = $_POST['end'];
$user_id = $_SESSION['user_id'];

include_once '../SQLconnect.php';

try{
    $stmt = $conn->prepare("INSERT INTO poll (topic, start, end, user_id) 
        VALUES (:topic, :start, :end, :user_id);");
    $stmt->bindParam(':topic', $topic);
    $stmt->bindParam(':start', $start);
    $stmt->bindParam(':end', $end);
    $stmt->bindParam(':user_id', $user_id);
    if($stmt->execute() == false){
        $errorMsg = array(
            'error' => 'Data send failed'
        );
    } else {
        $errorMsg = array(
            'success' => 'Poll created.'
        );
    }
} catch (PDOException $e) {
        $errorMsg = array(
            'error' => 'Something went wrong...'
        );
    }

// If succeeded, add options into database aswell
$options = array();

foreach ($_POST as $key => $value) {
    if(substr($key, 0, 6) == 'option'){
        $options[] = $value;
    }
}

$poll_id = $conn->lastInsertId();

try{

    foreach($options as $option){
        $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :poll_id)");
        $stmt->bindParam(':name', $option);
        $stmt->bindParam(':poll_id', $poll_id);

        if($stmt->execute() == false){
            $errorMsg = array(
                'error' => 'Data send failed'
            );
        } else {
            $errorMsg = array(
                'success' => 'Entry added to database.'
            );
        }
    }
catch (PDOException $e) {
    $errorMsg = array(
        'error' => $e->getMessage()
    );
}
}
header("Content-type: application/json;charset=utf-8");
echo json_encode($errorMsg);