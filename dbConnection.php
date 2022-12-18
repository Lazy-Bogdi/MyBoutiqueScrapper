<?php
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'scrapper';

    // Connect to the database
    try {
        $db = new PDO("mysql:host=$host;dbname=$database", $user, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
        exit;
    }
?>