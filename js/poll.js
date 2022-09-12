let optionCount = 2;

document.getElementById('addOption').addEventListener('click', newOption);
document.getElementById('removeOption').addEventListener('click', deleteLastOption);

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