<?php session_start(); ?>
<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div id="notifBox" class="alert alert-dismissible alert-success d-none">
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  <h4 class="alert-heading">Message Box!</h4>
  <p class="mb-0"></a></p>
</div>

<div class="container">
<form name="login">
  <fieldset>
    <legend>Login</legend>
    <div class="form-group">
      <label for="username" class="col-sm-2 col-form-label">Username</label>
      <input name="username" type="text" class="form-control" placeholder="username">
    </div>
    <div class="form-group">
      <label for="password" class="form-label mt-4">Password</label>
      <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="password">
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </fieldset>
</form>

<script src="js/script.js"></script>
<script src="server/login.js"></script>
<?php include_once 'layout/bottom.php'; ?>

