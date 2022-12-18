<html>
  <head>
    <!-- Include Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
    <title>FakeOfFakeTeeTurtle</title>
    
  </head>
  <body>
    <h1 class= "display-4"><a href ="http://vps-7cceaa46.vps.ovh.net/MyBoutiqueScrapper/FakeOfFakeTeeTurtle/">FakeOfFakeTeeTurtle</a></h1>
    <div class="container">
      <h2 class= "display-4">Products</h2>
      <div class="row">
        <?php
          // Connect to the database and get the items
           // Connection variables
        $host = 'localhost';
        $user = 'root';
        $password = 'admin';
        $database = 'scrapper';

        // Connect to the database
        try {
            $db = new PDO("mysql:host=$host;dbname=$database", $user, $password);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
            exit;
        }
          $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
          $perPage = 16;
          $offset = $perPage * ($page - 1);
          $stmt = $db->query("SELECT * FROM articles LIMIT $offset, $perPage");
          $items = $stmt->fetchAll();


        foreach ($items as $item) : ?>
          <div class='grid-item'>
            <div><img src="<?=$item['imgLink']?>" class="<?= $item['imgClass']?>"></div>
            <diV><h5 class="card-title"><?= $item['title'] ?></h5></div>
            <diV><span class="badge bg-success"><?= $item['badgeContent'] ?><span></div>
            <form method="POST" action="article.php">
              <input type="hidden" name="productId" value="<?= $item['idUrl'] ?>">
              <button type = "submit" class="btn btn-primary">Go to Page!</button>
            </form>
          </div>
          <?php endforeach; ?>
        
      </div>
    </div>
<ul class= "pagination">
    <?php
      // Generate the pagination links
      $total = $db->query("SELECT COUNT(*) FROM articles")->fetchColumn();
      $numPages = ceil($total / $perPage);
      for ($i = 1; $i <= $numPages; $i++) {
        if ($i == $page) {
          echo "<span>$i</span>";
        } else {
          echo "<a href='?page=$i'>$i</a>";
        }
      }
    ?>
  </ul>
  </body>
</html>
