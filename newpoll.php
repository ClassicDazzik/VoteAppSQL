<?php session_start(); ?>
<?php
if(!isset($_SESSION['logged_in'])){
  header('Location: index.php');
  die();
}
?>
<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div class="container">

<div id="notifBox" class="alert alert-dismissible alert-warning d-none">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  <h4 class="alert-heading">Message Box!</h4>
  <p class="mb-0"></a></p>
</div>

<form name="poll">
  <fieldset>
    <legend>Create Poll</legend>
    <div class="form-group">
      <label for="Topic" class="col-sm-2 col-form-label">Topic</label>
      <input name="topic" type="text" class="form-control" placeholder="topic">
    </div>
    <div class="form-group">
      <label for="start" class="form-label mt-4">Start Time</label>
      <input name="start" type="datetime" class="form-control" id="start" placeholder="start">
    </div>
    <div class="form-group">
      <label for="end" class="form-label mt-4">End Time</label>
      <input name="end" type="datetime" class="form-control" id="end" placeholder="end">
    </div>

    <h4>Options</h4> <button class="btn btn-success"id="addOption">Add Option</button>
    <button class="btn btn-warning" id="removeOption">Remove Option</button>

    <div class="form-group">
      <label for="option1" class="col-sm-2 col-form-label">Option 1</label>
      <input name="option1" type="text" class="form-control" placeholder="option1">
    </div>
    <div class="form-group">
      <label for="option2" class="col-sm-2 col-form-label">Option 2</label>
      <input name="option2" type="text" class="form-control" placeholder="option2">
    </div>
  </fieldset>
  <button type="submit" class="btn btn-primary">Save Poll</button>
</form>
</div>

<script src="js/script.js"></script>
<script src="js/poll.js"></script>
<?php include_once 'layout/bottom.php'; ?>