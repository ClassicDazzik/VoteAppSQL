document.forms['login'].addEventListener('submit', loginUser);

function loginUser(event){
    event.preventDefault();

    const username = document.forms['login']['username'].value;
    const password = document.forms['login']['password'].value;

    if(username.length <= 0) {
        showMessage('error', "No username inputted.")
        return;
    }

    if(password.length <= 4) {
        showMessage('error', "Invalid password.")
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        const msgBox = JSON.parse(this.responseText);

        if (msgBox.hasOwnProperty('success')){
            window.location.href = "index.php?type=success&notifbox=You have succesfully logged in."
            return; 
        } else {
            showMessage('error','Password does not match username or Username does not exist.')
        }
    }
    ajax.open("POST","server/php/loginUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(`username=${username}&password=${password}`);
}