<?php

session_start();

if (!isset($_POST['username']) || !isset($_POST['password'])){
    $errorMsg = array(
        'error' => 'Failed to post name or password.'
    );
    die();
}

$username = $_POST['username'];
$pass = $_POST['password'];

include_once '../SQLconnect.php';

try{
    $stmt = $conn->prepare("SELECT id, username, pwd FROM user WHERE username = :username");
    $stmt->bindParam(':username', $username);
    
    if($stmt->execute() == false){
        $errorMsg = array(
            'error' => 'An error happened.'
        );
    } else {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result == FALSE){
            $errorMsg = array(
                'error' => 'Username does not exist.'
            );
        }

        else if(password_verify($pass, $result['pwd'])) {
            $errorMsg = array(
                'success' => 'Logged in.'
            );

            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $result['id'];
            $_SESSION['username'] = $result['username'];

        } else {
            $errorMsg = array(
                'error' => 'Password does not match username.'
            );
        }
    }
} catch (PDOException $e) {
    $errorMsg = array(
            'error' => 'Something went wrong...'
        );
    }
header("Content-type: application/json;charset=utf-8");
echo json_encode($errorMsg);
?>