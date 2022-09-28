document.getElementById('addOption').addEventListener('click', newOption);

function newOption(event){

    event.preventDefault();

    // Make divs for new options
    const div = document.createElement('div');
    div.classList.add('form-group');

    // Creates a label
    const label = document.createElement('label');
    const forAttribute = document.createAttribute('for');
    const labelText = document.createTextNode("Option 3");
    forAttribute.value = "option3";
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    // Create input fields
    const input = document.createElement('input');

    input.classList.add('form-control');

    const inputType = document.createAttribute('type');
    inputType.value = "text";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute('name');
    inputName.value = "option3";
    input.setAttributeNode(inputName);

    const inputPlaceHolder = document.createAttribute('placeholder');
    inputPlaceHolder.value = "option3";
    input.setAttributeNode(inputPlaceHolder);

    div.appendChild(label);
    div.appendChild(input);

    console.log(div);    

}