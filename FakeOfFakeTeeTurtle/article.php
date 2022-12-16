<html>
  <head>
    <title>My Item Details</title>
  </head>
  <body>
    <h1>My Item Details</h1>
    <?php

      $host = 'localhost';
      $user = 'root';
      $password = '';
      $database = 'scrapper';

      try {
          $db = new PDO("mysql:host=$host;dbname=$database", $user, $password);
          $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
          echo 'Connection failed: ' . $e->getMessage();
          exit;
      }



      $itemId = $_POST['productId'];
    //   var_dump($itemId);


      $stmt = $db->prepare("SELECT * FROM articles inner join description_articles on articles.idUrl =  description_articles.idUrl WHERE description_articles.idUrl = :idUrl");
      $stmt->execute(['idUrl' => $itemId]);
      $item = $stmt->fetch();
    ?>
    <div>
      <h2><?= $item['title'] ?></h2>
      <p><?= $item['description'] ?></p>
    </div>
  </body>
</html>
