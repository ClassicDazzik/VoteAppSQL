const pollQueryString = window.location.search;

const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has('id')){
    getPollData(pollParams.get('id'));
}

function getPollData(id){
    let ajax = new XMLHttpRequest;
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        showResults(data);    
    }
    ajax.open("GET","server/php/getPoll.php?id=" + id);
    ajax.send();
}

const colors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

const bordercolors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

function showResults(data){
    const ul = document.getElementById('options');
    let CHdata = {
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }],
        labels: []
    };
    let colorIndex = 0;

    document.querySelector('h1').innerHTML = data.topic;
    
    // Doughnut chart
    data.options.forEach(function(option){
        // Prepare vote data for chart
        CHdata.labels.push(option.name);
        CHdata.datasets[0].data.push(option.votes);
        CHdata.datasets[0].backgroundColor.push(colors[colorIndex]);
        CHdata.datasets[0].borderColor.push(bordercolors[colorIndex]);
        colorIndex++;

        // Create display elements
        const newLi = document.createElement('li');
        newLi.className = 'list-group-item';
        const liText = document.createTextNode(option.name);

        const newSpan = document.createElement('span');
        newSpan.className = 'badge badge-primary badge-pill float-right';
        const spanText = document.createTextNode(option.votes);

        newSpan.appendChild(spanText);
        newLi.appendChild(liText);
        newLi.appendChild(newSpan);
        ul.appendChild(newLi);
    });

    const CHconfig = {
        type: 'doughnut',
        data: CHdata
        /* options: {} */
    };
    
    const chart = new Chart(document.getElementById('chart'), CHconfig);
}