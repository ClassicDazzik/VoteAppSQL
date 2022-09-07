document.forms['register'].addEventListener('submit', registerNewUser);

function registerNewUser(event){
    event.preventDefault();

    const username = document.forms['register']['username'].value;
    const password = document.forms['register']['password'].value;
    const password2 = document.forms['register']['password2'].value;

    if(username.length <= 0) {
        errorWindow("No username inputted")
        return;
    }

    if(password.length <= 4) {
        errorWindow("Password must be longer than 4 letters.")
        return;
    }

    if(password.localeCompare(password2) != 0){
        errorWindow("Passwords don't match.")
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        const errorMsg = JSON.parse(this.responseText);
        console.log(errorMsg);
        if (errorMsg.hasOwnProperty('success')) {
            alert(errorMsg.success)
        } else {
            errorWindow(errorMsg.error);
        }
    }
    ajax.open("POST", "server/php/registerUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("username="+username+"&password="+password);
    console.log('Data send was succesful!');
}

function errorWindow(type, err){
    let errorBox = document.getElementById("err");
    errorBox.querySelector('p').innerHTML = err;
    errorBox.classList.remove('d-none');
}