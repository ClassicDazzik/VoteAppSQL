let optionCount = 2;

document.getElementById('addOption').addEventListener('click', newOption);
document.getElementById('removeOption').addEventListener('click', deleteLastOption);
document.forms['poll'].addEventListener('submit', createNewPoll);

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

function createNewPoll(event) {
    event.preventDefault();

    const topic = document.forms['poll']['topic'].value;
    const start = document.forms['poll']['start'].value;
    const end = document.forms['poll']['end'].value;

    const options = [];

    const inputs = document.querySelectorAll('input');

    // See if there is more options
    inputs.forEach(function (input){
        if (input.name.indexOf('option') == 0){
            options.push(input.value);
        }
        console.log(options);
    })

    // Checks that the topic and options arent empty.
    if (topic.length <= 0 || options[0].length <= 0 || options[1].length <= 0){
        showMessage('error', 'Topic and at least 2 options must be set.');
        return;
    }

    let postData = `topic=${topic}&start=${start}&end=${end}`;
    let i = 0;
    options.forEach(function(option){
        postData += `&option${i++}=${option}`
    })

    let ajax = new XMLHttpRequest();
    ajax.onload = function(){
        const msgBox = JSON.parse(this.responseText);
        console.log(msgBox);
        if (msgBox.hasOwnProperty('success')) {
           window.location.href = "index.php?type=success&msg=Your poll has been added!"
        } else {
            showMessage('error',msgBox.error);
        }
    }
    ajax.open("POST", "server/php/createPoll.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(postData);
}