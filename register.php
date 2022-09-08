<?php session_start(); ?>
<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div class="container">

<div id="notifBox" class="alert alert-dismissible alert-warning d-none">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  <h4 class="alert-heading">Message Box!</h4>
  <p class="mb-0"></a></p>
</div>

<form name="register">
  <fieldset>
    <legend>Register</legend>
    <div class="form-group">
      <label for="username" class="col-sm-2 col-form-label">Username</label>
      <input name="username" type="text" class="form-control" placeholder="username">
    </div>
    <div class="form-group">
      <label for="password" class="form-label mt-4">Password</label>
      <input name="password" type="password" class="form-control" id="password" placeholder="password">
    </div>
    <div class="form-group">
      <label for="password2" class="form-label mt-4">Password</label>
      <input name="password2" type="password" class="form-control" id="password2" placeholder="confirm password">
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
  </fieldset>
</form>
</div>

<script src="js/script.js"></script>
<script src="server/reg.js"></script>
<?php include_once 'layout/bottom.php'; ?>

