window.addEventListener('load', getPolls);

let data = null;


function getPolls(){
    console.log('Getting polls...')
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showPolls();
    }
    ajax.open("GET", "server/php/getPolls.php");
    ajax.send();
}

function showPolls(type = 'current'){

    const ul = document.getElementById("polls");

    data.forEach(poll => {

        let start = false;
        let end = false;

        if(poll.start != '0000-00-00 00:00:00'){
            start = new Date(poll.start);
        }
        if(poll.end != '0000-00-00 00:00:00'){
            end = new Date(poll.end);
        }
        
        // check poll dates for currently active polls, show by default
        if(type == 'current') {
        if((start == false || start <= now)&& (end == false || end >= now)){


            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');

            const liText = document.createTextNode(poll.topic);
            newLi.appendChild(liText);

            ul.appendChild(newLi);
        }}

        // check poll dates for expired polls, show if button pressed
        if(type == 'old'){
        if((end < now)&& (end != false)){


            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
    
            const liText = document.createTextNode(poll.topic);
            newLi.appendChild(liText);
    
            ul.appendChild(newLi);
        }}

        // check poll dates for upcoming polls, show if button pressed
        if(type == 'new'){
        if(start > now && start != false){


            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
    
            const liText = document.createTextNode(poll.topic);
            newLi.appendChild(liText);
    
            ul.appendChild(newLi);
        }}

});
}