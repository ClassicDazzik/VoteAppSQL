<?php
session_start();

if(!isset($_SESSION['user_id'])){
    $data = array(
        'error' => 'Please log in...'
    );
    die();
}

$json = file_get_contents('php://input')
$polldata = json_encode($json);
$data = array();

include_once 'pdo-connect.php';

try {
    $stmt = $conn->prepare("UPDATE poll SET topic = :topic, start = :start, end = :end WHERE id = :id ;");
    $stmt->bindParam(":topic", $polldata->topic);
    $stmt->bindParam(":start", $polldata->start);
    $stmt->bindParam(":topic", $polldata->end);
    $stmt->bindParam(":topic", $polldata->id);

    if($stmt->execute() == false){
        $data['error'] = 'Some serverside error happened';
    } else {
        $data['success'] = 'Poll edited.';
    }
} catch (PDOException $e){
    $data['error'] = $e->getMessage();
}


try {
    // Update Options table
    foreach ($polldata->options as $option){
        if(isset($option->id)){
            $stmt = $conn->prepare("UPDATE option SET name = :name WHERE id = id");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":id", $option->id);
        } else {
            $stmt = $conn->prepare("INSERT INOT option (name, poll_id) VALUES (:name, :pollid)");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":id", $polldata->id);
        }
        
        if($stmt->execute() == false){
            $data['error'] = 'Error modifying option!';
        } else {
            $data['success'] = 'Option edit successful';
        }
    }
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);