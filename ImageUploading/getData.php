<?php

$uploadDir = 'images/';
$targetFile = $uploadDir . \basename($_FILES['image']['name']);
$allowedTypes = ['jpg', 'png', 'jpeg'];

if (isset($_POST['submitData'])) {
    $fileInfo = \strtolower(\pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    if (!in_array($fileInfo, $allowedTypes)) {
        die('Only pictures allowed');
    }

    if (\file_exists($targetFile)) {
        die('File already exists');
    }

    if (\move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        echo 'Upload successful';
        \header('refresh:1;index.html');
    }
}

