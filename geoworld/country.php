<?php
include("functions.php");
$connection = connect();
$code = $_GET['code'];
$country = getCountry($connection, $code);
//print_r($country);
?>


<?php include("header.php"); ?>
<main>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <table class="table table-striped">
                    <?php foreach($country as $countryItem => $description ) : ?>
                        <tr>
                            <td><?= $countryItem ?></td>
                            <td><?= $description ?></td>
                        </tr>


                </table>
            </div>
            <div id="map" class="col-6" style="height: 550px; border: 1px solid;">
                <script>
                    var map;
                    function initMap() {
                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 8
                        });
                    }
                </script>
            </div>
            <?php endforeach; ?>
        </div>

    </div>
</main>

<?php include("footer.php"); ?>