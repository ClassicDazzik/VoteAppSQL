window.addEventListener('load', getPolls);
document.getElementById('votes').addEventListener('click', openPoll);

let data = null;

function getPolls(){
    let ajax = new XMLHttpRequest;
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPolls(data);
    }
    ajax.open("GET","server/php/getPolls.php?show_all");
    ajax.send();
}

function showPolls(type = 'current'){
    const ul = document.getElementById('votes');
    ul.innerHTML = "";

    const now = new Date();

    console.log(data);

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
                // Create display elements
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.dataset.voteid = poll.id;
    
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
    
                ul.appendChild(newLi);
            }
        }

        // Show expired polls
        if (type == 'old') {
            if (end < now && end != false) {
                // Create display elements
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.dataset.voteid = poll.id;
    
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
    
                ul.appendChild(newLi);
            }
        }

        // Show upcoming future polls
        if (type == 'future') {
            if (start > now && start != false) {
                // Create display elements
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.dataset.voteid = poll.id;

                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
    
                ul.appendChild(newLi);
            }
        }
    });
}

function openPoll(event){
    window.location.href = "vote.php?id=" + event.target.dataset.voteid;
}