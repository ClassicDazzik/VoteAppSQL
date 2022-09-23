<?php session_start(); ?>
<?php
if (!isset($_SESSION['logged_in'])){
  header('Location: index.php');
  die();
}
?>
<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div class="jumbotron">
    <h1 class="display-3">Voteapp (admin)</h1>
    <?php if(isset($_SESSION['logged_in'])):?>
        <p>Welcome <?php echo $_SESSION['username']; ?></p>
    <?php endif; ?>
</div>

<div class="container">
  <div id="notifBox" class="alert alert-dismissible alert-success d-none">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <h4 class="alert-heading">Message Box!</h4>
    <p class="mb-0"></a></p>
  </div>

  <h2>Votes</h2>
  <button class="btn btn-info" onclick="showPolls('old')">Old polls</button>
  <button class="btn btn-info" onclick="showPolls('future')">Upcoming polls</button>
  <button class="btn btn-info" onclick="showPolls('current')">Current polls</button>
  <ul id="votes" class="list-group">
  </ul>
</div>

<script src="server/admin.js"></script>
<script src="js/script.js"></script>

<?php include_once 'layout/bottom.php'; ?>