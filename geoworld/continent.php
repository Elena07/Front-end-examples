<?php
include("functions.php");
$connection = connect();
$code = $_GET['code'];
$continent = getContinent($connection, $code);
$countries = getCountriesByContinent($connection, $code);
//print_r($continent);
//print_r($countries);
?>

<?php include("header.php"); ?>
    <main>
        <div class="container">
            <?= $continent['name'] ?>

            <div class="list-group">
                <div class="list-group-item list-group-item-secondary">Country List</div>
                <?php foreach ($countries as $countryItem) : ?>
                <a href="country.php?code=<?= $countryItem['code'] ?>" class="list-group-item list-group-item-action">
                    <img src="Source_Files/images/countries/png100px/<?= strtolower($countryItem['code']) ?>.png">
                    <?= $countryItem['name'] ?>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
    </main>
<?php include("footer.php"); ?>
