<?php include_once 'layout/top.php'; ?>
<?php include_once 'layout/nav.php'; ?>

<div class="container">
<form>
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
</div>
<?php include_once 'layout/bottom.php'; ?>

