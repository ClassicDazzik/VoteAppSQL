<?php
if (isset($_POST, $_SESSION["logged_in"])) {
    include "../SQLconnect.php";

    // Validate submitted form //
    switch(true) {
        case (!isset($_POST["username"])):
            echo "Username not given";
            die();
        case (!isset($_POST["password"], $_POST["password2"])):
            echo "Password not given";
            die();
        case ($_POST["password"] !== $_POST["password2"]):
            echo "Password is not confirmed";
            die();
        case (strlen(trim($_POST["username"])) > 50):
            echo "Username is too long";
            die();
        case (mysqli_query($SQLconnection, sprintf("SELECT EXISTS(SELECT * FROM user WHERE username = '%1')", mysqli_real_escape_string($SQLconnection, trim($_POST["username"]))))):
            echo "Username is already in use";
            die();
        default:
            // Values are valid; finalize user registration //
            mysqli_query($SQLconnection, sprintf("INSERT INTO user (username, pwd) VALUES ('%1', '%2')", mysqli_real_escape_string($SQLconnection, trim($_POST["username"])), password_hash($_POST["password"], PASSWORD_DEFAULT)));
            echo "SUCCESS!";
    }
}