<form method="POST" action="">
    <input type = "hidden" value= "first" name="hidden">
    <label for ="produits">Envoyer les données concernants les pages produits multiples</label>
    <input type ="submit" name ="produits" value = "Envoyer les données">
</form>
<form method="POST" action="">
    <input type = "hidden" value= "second" name="hidden">
    <label for ="produits">Envoyer les données concernants les pages de présentation de produit</label>
    <input type ="submit" name ="produits" value = "Envoyer les données">
</form>


<?php

    if(isset($_POST['produits']) && isset($_POST['hidden'])) {
        // Connection variables
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

        if($_POST['hidden'] == "first"){
            // Read the contents of the JSON file
            $json = file_get_contents('../jsonDatasOutput/output.json');
            $data = json_decode($json);

            // Insert the data into the database
            foreach ($data as $row) {
                $sql = "INSERT INTO articles (title, imgLink, imgClass, productpageUrl, badgeContent, idUrl) VALUES (:value1, :value2, :value3, :value4, :value5, :value6)";
                $stmt = $db->prepare($sql);
                $stmt->execute([
                    'value1' => $row->title,
                    'value2' => $row->imgLink,
                    'value3' => $row->imgClass,
                    'value4' => $row->productPageUrl,
                    'value5' => $row->badgeContent,
                    'value6' => $row->idUrl
                ]);
            }
        }

        elseif($_POST['hidden'] == "second"){
            $json = file_get_contents('../jsonDatasOutput/productDescriptionPage.json');
            $data = json_decode($json);

            foreach ($data as $row) {
                $sql = "INSERT INTO description_articles (productPageUrl, price, description, idUrl) VALUES (:value1, :value2, :value3, :value4)";
                $stmt = $db->prepare($sql);
                $stmt->execute([
                    'value1' => $row->urLone,
                    'value2' => $row->price,
                    'value3' => $row->description,
                    'value4' => $row->idUrl
                ]);
            }
        }
        echo "Données envoyées avec succès !! ";
        header( "refresh:2;url=sendtoDb.php" ); exit;
    }
    else{
        echo "Données en attente d'envoi...";
    }



