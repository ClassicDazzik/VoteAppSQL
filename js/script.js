const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString); 

if(urlParams.has('notifBox') && urlParams.has('type')) {
    const msg = urlParams.get('notifBox');
    const type = urlParams.get('type');

    showMessage(type, msg);
}

function showMessage(type, notifBox){
    let msgBox = document.getElementById("notifBox");
    if(type == 'success') {
        msgBox.classList.add('alert-success');
        msgBox.classList.remove('alert-warning');
        msgBox.classList.remove('alert-danger');
        msgBox.querySelector('h4').innerHTML = "Success!";
    } else if(type == 'error') {
        msgBox.classList.add('alert-danger');
        msgBox.classList.remove('alert-success');
        msgBox.classList.remove('alert-warning');
        msgBox.querySelector('h4').innerHTML = "An Error!";
    } else if(type == 'warning') {
        msgBox.classList.add('alert-warning');
        msgBox.classList.remove('alert-success');
        msgBox.classList.remove('alert-danger');
        msgBox.querySelector('h4').innerHTML = "Warning!!";
    }
    msgBox.querySelector('p').innerHTML = notifBox;
    msgBox.classList.remove('d-none');
}