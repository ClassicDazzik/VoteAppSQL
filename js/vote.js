const voteQueryString = window.location.search;

const pollParams = new URLSearchParams(pollQueryString);

if(pollParams.has('id')){
    getPollData(pollParams.get('id'));
}

function getPollData(id){
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
    }
    ajax.open("GET", "server/php/votePage.php?id=" + id)
    ajax.send()
}