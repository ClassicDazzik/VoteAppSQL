<?php
session_start();

if(!isset($_SESSION['user_id'])){
    $data = array(
        'error' => 'Please log in...'
    );

    header("Content-type: application/json;charset=utf-8");
    echo json_encode($data);
    die();
}

$json = file_get_contents('php://input');
$polldata = json_decode($json);
$data = array();

include_once '../SQLconnect.php';

// Update Topic table
try {
    $stmt = $conn->prepare("UPDATE poll SET topic = :topic, start = :start, end = :end WHERE id = :id");
    $stmt->bindParam(":topic", $polldata->topic);
    $stmt->bindParam(":start", $polldata->start);
    $stmt->bindParam(":end", $polldata->end);
    $stmt->bindParam(":id", $polldata->id);

    if($stmt->execute() == false){
        $data['error'] = 'Error modifying poll!';
    } else {
        $data['success'] = 'Poll edited.';
    }
} catch (PDOException $e){
    $data['error'] = $e->getMessage();
}

// Update Option table
try {
    foreach ($polldata->options as $option){
        if(isset($option->id)){
            $stmt = $conn->prepare("UPDATE option SET name = :name WHERE id = :id");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":id", $option->id);
        } else {
            $stmt = $conn->prepare("INSERT INTO option (name, poll_id) VALUES (:name, :pollid)");
            $stmt->bindParam(":name", $option->name);
            $stmt->bindParam(":pollid", $polldata->id);
        }
        
        if($stmt->execute() == false){
            $data['error'] = 'Error modifying option!';
        } else {
            $data['success'] = 'Option edited.';
        }
    }
} catch (PDOException $e){
    $data['error'] = $e->getMessage();
}

// Delete from Option table
try {
    foreach ($polldata->todelete as $option){
            $stmt = $conn->prepare("DELETE FROM option WHERE id = :id");
            $stmt->bindParam(":id", $option->id);

        if($stmt->execute() == false){
            $data['error'] = 'Error deleting option!';
        } else {
            $data['success'] = 'Option delete successful';
        }
    }
} catch (PDOException $e){
    $data['error'] = $e->getMessage();
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);