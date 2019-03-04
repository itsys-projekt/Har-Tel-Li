<?php

use adminAccessLogin\DatabaseConnection;

include 'DatabaseConnection.php';

// Check if Submit and set Variables
if (isset($_POST['loginSubmit'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $code = $_POST['code'];
    checkData($email, $password, $code);
}

// Check if Data is the same as the data in DB
function checkData(string $email, string $password, string $code) {
    $conn = new DatabaseConnection();
    $result = $conn->query("SELECT * FROM files.users WHERE email = '{$email}'");

    if (\password_verify($password, $result->fetchAll()[0]['password'])) {
        if ($code === CODE) {
            // TODO implement header Location to File upload for admins
        }
    }
}