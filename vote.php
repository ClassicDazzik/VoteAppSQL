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
    <div id="notifBox" class="alert alert-dismissible alert-success d-none">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <h4 class="alert-heading">Message Box!</h4>
        <p class="mb-0"></a></p>
    </div>
    <ul id="options" class="list-group">
    </ul>
</div>

<script src="js/script.js"></script>
<script src="server/vote.js"></script>

<?php include_once 'layout/bottom.php'; ?>