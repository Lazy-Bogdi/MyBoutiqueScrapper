<html>
  <head>
  <head>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
    <title>FakeOfFakeTeeTurtle - Item Details </title>
    
  </head>
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
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2><?= $item['titleProduct'] ?></h2>
        </div>
        <div class="col-6">
        
        </div>
        <div class="col-6">
          <img src="<?= $item['imgLink'] ?>"></p>
        </div>
        <div class="col-6">
        <?= $item['price'] ?>
          <p><?= $item['description'] ?></p>
          <a class="btn btn-success" href="http://vps-7cceaa46.vps.ovh.net/MyBoutiqueScrapper/FakeOfFakeTeeTurtle/">Order Now !</a>
        </div>

      </div>
    </div>
     

  </body>
</html>
