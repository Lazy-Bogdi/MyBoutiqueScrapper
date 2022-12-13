<?php

// Connection variables
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'myboutiquescrapper';

// Connect to the database
try {
    $db = new PDO("mysql:host=$host;dbname=$database", $user, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

// Read the contents of the JSON file
$json = file_get_contents('../output.json');
$data = json_decode($json);

// Insert the data into the database
foreach ($data as $row) {
    $sql = "INSERT INTO articles (title, imgLink, imgClass, productpageUrl, badgeContent) VALUES (:value1, :value2, :value3, :value4, :value5)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        'value1' => $row->title,
        'value2' => $row->imgLink,
        'value3' => $row->imgClass,
        'value4' => $row->productpageUrl,
        'value5' => $row->badgeContent,
    ]);
}

