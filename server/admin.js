window.addEventListener('load', getOwnPolls);
document.getElementById('votes').addEventListener('click', openPoll);

let data = null;

function getOwnPolls(){
    let ajax = new XMLHttpRequest;
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPolls(data);
    }
    ajax.open("GET","server/php/getPolls.php");
    ajax.send();
}

function showPolls(type = 'current'){
    const ul = document.getElementById('votes');
    ul.innerHTML = "";

    const now = new Date();

    /* console.log(data); */

    data.forEach(poll => {
        // Process JSON data
        let start = false;
        let end = false; 

        if (poll.start != '0000-00-00 00:00:00') {
            start = new Date(poll.start);
        }
        if (poll.end != '0000-00-00 00:00:00') {
            end = new Date(poll.end);
        }

        // Show currently active polls
        if (type == 'current') {
            if ((start == false || start <= now) && (end == false || end >= now)) {
                createPollLi(ul, poll.id, poll.topic);
            }
        }       

        // Show expired polls
        else if (type == 'old') {
            if (end < now && end != false) {
                createPollLi(ul, poll.id, poll.topic);
            }
        }

        // Show upcoming future polls
        else if (type == 'future') {
            if (start > now && start != false) {
                createPollLi(ul, poll.id, poll.topic);
            }
        }
    });
}

// Create display elements
function createPollLi(target, pollId, pollTopic){
    const newLi = document.createElement('li');
    newLi.classList.add('list-group-item');
    newLi.dataset.voteid = pollId;

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.dataset.action = 'delete';
    const deleteText = document.createTextNode('Delete poll');
    newDeleteBtn.appendChild(deleteText);

    const newEditBtn = document.createElement('button');
    newEditBtn.dataset.action = 'edit';
    const editText = document.createTextNode('Edit poll');
    newEditBtn.appendChild(editText);

    const liText = document.createTextNode(pollTopic);
    newLi.appendChild(liText);

    newLi.appendChild(newEditBtn);
    newLi.appendChild(newDeleteBtn);
    target.appendChild(newLi);
}

function openPoll(event){
    const action = event.target.dataset.action;

    if (action == 'delete') {
        let pollId = event.target.parentElement.dataset.voteid;
        deletePoll(pollId);
        return;
    }

    if (action == 'edit') {
        let pollId = event.target.parentElement.dataset.voteid;
        editPoll(pollId);
        return;
    }

    window.location.href = "vote.php?id=" + event.target.dataset.voteid;
}

function deletePoll(id) {
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        data = JSON.parse(this.responseText);

        let liToDelete = document.querySelector(`[data-voteid="${id}"]`);
        liToDelete.parentElement.removeChild(liToDelete);
    }
    ajax.open("GET", "server/php/deletePoll.php?id=" + id);
    ajax.send();
}

function editPoll(id) {
    window.location.href = "editPoll.php?id="+id;
}