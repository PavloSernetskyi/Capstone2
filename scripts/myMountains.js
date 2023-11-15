"use strict"

window.onload = init;

function init() {

    addMountainsToDropdownMenu();

    displayAllMountains();
}


//populate dropdown menu.
function addMountainsToDropdownMenu() {
    //grab html element for displaying in dropwdown.
    const mountainsDropdown = document.getElementById('mountainsDropdown');

    mountainsArray.forEach(mountain => {
        const option = document.createElement('option');

        option.value = mountain.name;
        option.text = mountain.name;
        mountainsDropdown.appendChild(option);

    });

    let mountainBtn = document.getElementById('mountainBtn');
    mountainBtn.onclick = searchMountain;

}


//click button to choose mountain and display mountain name, description, evelation, etc.
function searchMountain() {
    const mountainsDropdown = document.getElementById('mountainsDropdown');
    const selectedMountainName = mountainsDropdown.value;
//    alert(selectedMountainName);

    //display selected mountain.
    const selectedMountainData = mountainsArray.find(mountain => mountain.name === selectedMountainName);

    console.log(`Elevation ${selectedMountainData.elevation}`);

    let message = "";
    message += ` <div class="card my-3" style="width: 23rem; height: 75vh;">
    <div class="card-body">
    <img class="mountain-photo" src="images/${selectedMountainData.img}">
        <h5 class="card-title">${selectedMountainData.name}</h5>
        <p class="card-text"> Description: ${selectedMountainData.desc} </p>
        <p class="card-text">Elevation: ${selectedMountainData.elevation} </p>
        <p class="card-text">Effort: ${selectedMountainData.effort} </p>
        <p class="card-text">Coordinates:</p>
        <p class="card-text">Latitude: ${selectedMountainData.coords.lat} </p>
        <p class="card-text">Longitude: ${selectedMountainData.coords.lng} </p>

        <a href="mountains.html" class="btn btn-primary">Go back to website</a>
        
    </div>
    </div>`;
    document.getElementById('output').innerHTML = message;

}

function displayAllMountains() {
    //display all mountains and then when user selects one mountain display only one mountain. (maybe in new window?).
    // const allMountainCards = document.getElementById('output');

    let message = "";

    mountainsArray.forEach(mountain => {
        //       allMountainCards.innerHTML += `
        message += `
        <div class="card my-3" style="width: 23rem; height: 57vh;">
        <div class="card-body">
            <img src="images/${mountain.img}" class="card-img-top" alt="...">
            <h5 class="card-title">${mountain.name}</h5>
            <p class="card-text"> Description: ${mountain.desc}<p>
            <p class="card-text"> Elevation: ${mountain.elevation}<p>
        </div>
        </div>
    `;
    }
    );
    document.getElementById('output').innerHTML = message;

}
