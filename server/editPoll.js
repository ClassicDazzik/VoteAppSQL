//get id from query
const pollQueryString = window.location.search;
const pollParams = new URLSearchParams(pollQueryString);

if (pollParams.has('id')){
    getPollData(pollParams.get('id'));
}

let optionCount = 0;
let toDelete = [];

document.getElementById('addOption').addEventListener('click', newOption);
document.getElementById('removeOption').addEventListener('click', deleteLastOption);
document.forms['editPoll'].addEventListener('submit', modifyPoll);
document.querySelector('fieldset').addEventListener('click', getFieldsetClick);

// get data from db
function getPollData(id){
    let ajax = new XMLHttpRequest;
    ajax.onload = function(){
        data = JSON.parse(this.responseText);
        populatePollForm(data);    
    }
    ajax.open("GET","server/php/getPoll.php?id=" + id);
    ajax.send();
}

function populatePollForm(data){
    document.forms['editPoll']['id'].value = data.id;
    document.forms['editPoll']['topic'].value = data.topic;
    document.forms['editPoll']['start'].value = data.start.replace(" ","t");
    document.forms['editPoll']['end'].value = data.end.replace(" ","t");
    const target = document.querySelector('fieldset');

    data.options.forEach(function(option) {
        optionCount++;
        target.appendChild(createOptionInput(optionCount, option.name, option.id))
    })
}

function createOptionInput(count, name, id){

    // Make divs for new options
    const div = document.createElement('div');
    div.classList.add('form-group');

    // Creates a label
    const label = document.createElement('label');
    const forAttribute = document.createAttribute('for');
    const labelText = document.createTextNode(`Options ${count}`);
    forAttribute.value = `option${count}`;
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    // Create input fields
    const input = document.createElement('input');

    input.classList.add('form-control');

    const inputType = document.createAttribute('type');
    inputType.value = "text";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute('name');
    inputName.value = `option${count}`;
    input.setAttributeNode(inputName);

    const inputPlaceHolder = document.createAttribute('placeholder');
    inputPlaceHolder.value = `Option ${count}`;
    input.setAttributeNode(inputPlaceHolder);

    input.dataset.optionid = id;

    input.value = name;

    const deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-sm btn-danger float-right";

    const deleteText = document.createTextNode('Delete');
    deleteButton.appendChild(deleteText);
    deleteButton.dataset.action = 'delete';

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(deleteButton);

    return div; 
}

function deleteLastOption(event){

    event.preventDefault();

    if(optionCount <= 2) {
        return;
    }

    const optionToDelete = document.querySelector('fieldset').lastElementChild;
    const parentElement = document.querySelector('fieldset');
    parentElement.removeChild(optionToDelete);

    optionCount--;
}

function newOption(event){

    event.preventDefault();

    optionCount++;

    // Make divs for new options
    const div = document.createElement('div');
    div.classList.add('form-group');

    // Creates a label
    const label = document.createElement('label');
    const forAttribute = document.createAttribute('for');
    const labelText = document.createTextNode(`Options ${optionCount}`);
    forAttribute.value = `option${optionCount}`;
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    // Create input fields
    const input = document.createElement('input');

    input.classList.add('form-control');

    const inputType = document.createAttribute('type');
    inputType.value = "text";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute('name');
    inputName.value = `option${optionCount}`;
    input.setAttributeNode(inputName);

    const inputPlaceHolder = document.createAttribute('placeholder');
    inputPlaceHolder.value = `Option ${optionCount}`;
    input.setAttributeNode(inputPlaceHolder);

    div.appendChild(label);
    div.appendChild(input);

    document.querySelector('fieldset').appendChild(div);

    console.log(div);    

}

function modifyPoll(event){
    event.preventDefault();

    // Get data from form
    let polldata = {};
    polldata.id = document.forms['editPoll']['id'].value;
    polldata.topic = document.forms['editPoll']['topic'].value;
    polldata.start = document.forms['editPoll']['start'].value;
    polldata.end = document.forms['editPoll']['end'].value;

    // Get options
    const options = [];
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function(input){
        if(input.name.indexOf('option') == 0){
            options.push({id: input.dataset.optionsid, name: input.value})
        }
    })

    polldata.options = options;
    polldata.todelete = toDelete;

    // Send edits to backend
    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        let data = JSON.parse(this.responseText);
        if (data.hasOwnProperty('success')){
            window.location.href = "admin.php?type=success&msg=Poll edited";
        } else {
            showMessage('error', data.error);
        }
    }
    ajax.open("POST", "server/modifyPoll.php", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(polldata));
}

function getFieldsetClick(event){
    event.preventDefault();
    let btn = event.target;
    if (btn.dataset.action == 'delete'){
        let div = btn.parentElement;
        let input = div.querySelector('input');
        let fieldset = div.parentElement;

        toDelete.push({id: input.dataset.optionid});
        fieldset.removeChild(div);
    }
}