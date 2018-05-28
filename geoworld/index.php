<?php
//echo "Hello world!";
include_once("functions.php");
$connection = connect();
$continents = getContinents($connection);
//print_r($continents);
?>
<?php include("header.php"); ?>
        <main>
            <div class="container">
                <div class="row">
                    <?php foreach ($continents as $continentItem) : ?>
                    <div class="col-6 col-md-4">
                        <div class="card p-2 mb-2">
                            <img class="card-img-top" src="Source_Files/images/continents/<?= strtolower($continentItem['code']) ?>.png" alt="Africa">
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a href="continent.php?code=<?= $continentItem['code'] ?>">
                                        <?= $continentItem['name'] ?>
                                    </a>
                                </h4>
                                <p class="card-text"><?= $continentItem['description'] ?></p>
                            </div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>

            </div>
        </main>
<?php include("footer.php"); ?>
