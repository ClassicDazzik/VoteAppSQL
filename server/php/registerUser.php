<?php

if (!isset($_POST['username']) || !isset($_POST['password'])){
    $errorMsg = array(
        'error' => 'Failed to post name or password.'
    );
    die();
}

$username = $_POST['username'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

include_once '../SQLconnect.php';

try{
    $stmt = $conn->prepare("INSERT INTO user (username, pwd) VALUES (:username, :pwd)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':pwd', $pass);
    if($stmt->execute() == false){
        $errorMsg = array(
            'error' => 'Data send failed'
        );
    } else {
        $errorMsg = array(
            'success' => 'Account successfully created!'
        );
    }
} catch (PDOException $e) {
    if (strpos($e->getMessage(), '1062 Duplicate entry')){
        $errorMsg = array(
            'error' => 'Username already exists, try another.'
        );
    } else {
        $errorMsg = array(
            'error' => 'Something went wrong...'
        );
    }
}
header("Content-type: application/json;charset=utf-8");
echo json_encode($errorMsg);


// Altengeance's code, we doing this differently now

# if (isset($_POST, $_SESSION["logged_in"])) {

    // Validate submitted form //
#        case (!isset($_POST["username"])):
#            echo "Username not given";
#           die();
#       case (!isset($_POST["password"], $_POST["password2"])):
#            echo "Password not given";
#            die();
#        case ($_POST["password"] !== $_POST["password2"]):
#            echo "Password is not confirmed";
#            die();
#        case (strlen(trim($_POST["username"])) > 50):
#            echo "Username is too long";
#            die();
#        case (mysqli_query($SQLconnection, sprintf("SELECT EXISTS(SELECT * FROM user WHERE username = '%1')", mysqli_real_escape_string($SQLconnection, trim($_POST["username"]))))):
#            echo "Username is already in use";
#            die();
#        default:
            // Values are valid; finalize user registration //
#            mysqli_query($SQLconnection, sprintf("INSERT INTO user (username, pwd) VALUES ('%1', '%2')", mysqli_real_escape_string($SQLconnection, trim($_POST["username"])), password_hash($_POST["password"], PASSWORD_DEFAULT)));
#            echo "SUCCESS!";
#    }
#}