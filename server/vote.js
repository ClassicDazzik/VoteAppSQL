const pollQueryString = window.location.search;

const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has('id')){
    getPollData(pollParams.get('id'));
}

document.getElementById('options').addEventListener('click', giveVote)

function getPollData(id){
    let ajax = new XMLHttpRequest;
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPoll(data);    
    }
    ajax.open("GET","server/php/getPoll.php?id=" + id);
    ajax.send();
}

function showPoll(data){
    document.querySelector('h1').innerHTML = data[0].topic;
    const options = document.getElementById('options');

    data['options'].forEach(option => {
        const newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        newLi.dataset.optionid = option.id;

        const newButton = document.createElement('button');
        newButton.classList.add('btn');
        newButton.classList.add('btn-lg');
        newButton.classList.add('btn-info');
        newButton.dataset.optionid = option.id;

        const buttonText = document.createTextNode(option.name);

        newButton.appendChild(buttonText);
        newLi.appendChild(newButton);
        options.appendChild(newLi);
    });
}

function giveVote(event){
    let id = event.target.dataset.optionid;

    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPoll(data);
    }
    ajax.open("GET", "server/php/giveVote.php?id=" + id);
    ajax.send();
}