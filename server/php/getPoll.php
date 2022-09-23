<?php

if (!isset($_GET['id'])){
    header('Location: ../../index.php');
}

$pollid = $_GET['id'];

include_once '../SQLconnect.php';

// Get specified poll
try {
    $stmt = $conn->prepare("SELECT id, topic, start, end, user_id FROM poll WHERE id = :poll_id");

    $stmt->bindParam(':poll_id', $pollid);

    if ($stmt->execute() == false){
        $data = array(
            'error' => 'Error occured!'
        );
    } else {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $data = $result;
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'Tapahtui joku virhe!!'
    );
}

// Get specified poll's options
try {
    $stmt = $conn->prepare("SELECT id, name, votes FROM option WHERE poll_id = :poll_id");
    $stmt->bindParam(':poll_id', $pollid);

    if ($stmt->execute() == false){
        $data = array(
            'error' => 'Error occured!'
        );
    } else {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $options = $result;
        $data['options'] = $options;
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'Tapahtui joku virhe!!'
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);