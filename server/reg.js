document.forms['register'].addEventListener('submit', registerNewUser);

function registerNewUser(event){
    event.preventDefault();

    const username = document.forms['register']['username'].value;
    const password = document.forms['register']['password'].value;
    const password2 = document.forms['register']['password2'].value;

    if(username.length <= 0) {
        showMessage('error', "No username inputted.")
        return;
    }

    if(password.length <= 4) {
        showMessage('error', "Password must be longer than 4 letters.")
        return;
    }

    if(password.localeCompare(password2) != 0){
        showMessage('error',"Passwords don't match.")
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        const msgBox = JSON.parse(this.responseText);
        console.log(msgBox);
        if (msgBox.hasOwnProperty('success')) {
            window.location.href = "login.php?type=success&notifBox=Account successfully created! You can now login.";
            return;
        } else {
            showMessage('error',msgBox.error);
        }
    }
    ajax.open("POST", "server/php/registerUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("username="+username+"&password="+password);
    console.log('Data send was succesful!');
}