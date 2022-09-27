<?php session_start(); ?>
<?php 
if (!isset($_GET['id'])){
    header('Location: index.php');
}

$id = intval($_GET['id']);

?>
<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div class="container">
    <div class="row">
        <h1></h1>
    </div>
    <div class="row">
        <div class="col">
            <ul id="options" class="list-group"></ul>
        </div>
        <div class="col">
            <canvas id="chart"></canvas>
        </div>
    </div>
</div>

<script src="js/script.js"></script>
<script src="server/results.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>

<?php include_once 'layout/bottom.php'; ?>