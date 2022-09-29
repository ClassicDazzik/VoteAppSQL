<?php

/* if(isset($_GET['id'])){
    header('Location: ../../index.php');
} */

$optionid = $_GET['id'];
$data = array();

include_once '../SQLconnect.php';

/*
Check the following things before proceeding:
-Has the user voted already?
-Is the poll still active?
*/

try {
    $stmt = $conn->prepare("SELECT id, start, end FROM poll WHERE id = (SELECT poll_id FROM option WHERE id = :optionid)");
    $stmt->bindParam(":optionid", $optionid);

    if ($stmt->execute() == false){
        $data['error'] = 'Error occured!';
    } else { 
        $poll = $stmt->fetch(PDO::FETCH_ASSOC);
        $pollid = $poll['id'];

        $currentTime = time();
        $startTime = strtotime($poll['start']);
        $endTime = strtotime($poll['end']);

        /* Check following things 
        -Has the poll started/expired yet?
        -Has the user already voted on the poll?*/
        $cookie_name = "poll_$pollid";
        if (isset($_COOKIE[$cookie_name])){
            $data['warning'] = 'Already voted on this poll.';
        } else if($endTime < $currentTime && $poll['end'] != '0000-00-00 00:00:00'){
            $data['warning'] = 'This poll has expired.';
        } else if($startTime > $currentTime){
            $data['warning'] = 'This poll has not started yet.';
        }
    }

    // If no warnings then proceed to save the vote
    if(!array_key_exists('warning',$data)){
        
        $stmt = $conn->prepare("UPDATE option SET votes = votes + 1 WHERE (id = :optionid);");
        $stmt->bindParam(':optionid', $optionid);

        if ($stmt->execute() == false){
            $data['error'] = 'Failed to execute SQL statement.';
        } else {
            $data['success'] = 'Vote successful!';
            $cookie_name = "poll_$pollid";
            $cookie_value = 1;
            setcookie($cookie_name, $cookie_value, time() + (86400*30), "/");
        }
    }
} catch (PDOException $e) {
    $data = array(
        'error' => 'Couldnt vote'
    );
}

header("Content-type: application/json;charset=utf-8");
echo json_encode($data);