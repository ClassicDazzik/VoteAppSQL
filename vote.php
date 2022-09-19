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
    <h1></h1>
    <ul id="options" class="list-group">
    </ul>
</div>

<script src="js/script.js"></script>
<script src="server/vote.js"></script>

<?php include_once 'layout/bottom.php'; ?>