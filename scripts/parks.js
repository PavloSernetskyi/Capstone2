"use strict";

window.onload = () => {
  //
  const states = document.getElementById("states");
  hideOrShow();
  addParkTypesToDropdown();
  addLocationsToDropdown();
  addNationalParksToDropdown();
}; // end of window onload.

//hide or show info based on schoosen radio button.
function hideOrShow(section) {
  //making variables to manipulate sections by id.
  let stateSection = document.getElementById('state');
  let parkTypeSection = document.getElementById('type');
  if (section === 'state') {
    //Show by state section and hide by park section.
    stateSection.style.display = 'block';
    parkTypeSection.style.display = 'none';
  } else {
    //Show by park type section and hide by state section.
    stateSection.style.display = 'none';
    parkTypeSection.style.display = 'block';
  }
}

function addLocationsToDropdown() {
  // Get the dropdown element by its ID
  // Use forEach to iterate over the array
  locationsArray.forEach(function (location) {
    // Create a new option element
    let option = document.createElement("option");

    // Set the value and text content for the new option
    option.value = location;
    option.textContent = location;

    // Add the new option to the dropdown
    states.appendChild(option);
  });
}

function addNationalParksToDropdown() {
  // Get the dropdown element by its ID
  let parktype = document.getElementById('parkType');
  // Use forEach to iterate over the array
  nationalParksArray.forEach(function (park) {
    // Create a new option element
    let option = document.createElement("option");

    // Set the value and text content for the new option
    option.value = park.LocationName;
    option.textContent = park.LocationName;

    // Add the new option to the dropdown
    parktype.appendChild(option);
  });
}
// grab the value of a selected item from the dropdown.
function searchLocation() {
  const selectedValue = states.value;
  //  alert(selectedValue);
  let filteredParksByState = nationalParksArray.filter(filt => filt.State === states.value);
  let message = "";
  for (let index = 0; index < filteredParksByState.length; index++) {
    const image = filteredParksByState[index].Image;
    const name = filteredParksByState[index].LocationName;
    const address = filteredParksByState[index].Address;
    const city = filteredParksByState[index].City;
    const zipCode = filteredParksByState[index].ZipCode;
    const latitude = filteredParksByState[index].Latitude;
    const longitude = filteredParksByState[index].Longitude;
    const state = filteredParksByState[index].State;
    let phoneNumber = null;
    if (filteredParksByState[index].Phone == 0) {
      phoneNumber = "N/A";
    }
    else if (filteredParksByState[index].Phone.includes("(")) {
      phoneNumber = filteredParksByState[index].Phone;
    }
    //fax logic.
    // fax logic. display fax otherwise display no fax available.
    let fax = null;

    if (filteredParksByState[index].Fax == 0) {
      fax = "Not available";
    }
    else if (filteredParksByState[index].Fax.includes("(")) {
      fax = filteredParksByState[index].Fax;
    }

    //logic for dislayin existing website or if website not exsists then display message.
    let link = null;
    if (filteredParksByState[index].Visit) {
      link = `<a href="${filteredParksByState[index].Visit}" target="_blank" class="btn btn-secondary">Visit External Website</a>`
    }
    else {
      link = "No external website exists";
    }
    message += ` <div class="card my-3" style="width: 18rem; height: 45vh;">
      <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"> Address: ${address} ${city} ${state} ${zipCode}</p>
          <p class="card-text">Phone number: ${phoneNumber}.</p>
          <p class="card-text">Fax: ${fax}.</p>
          <p class="card-text">Coordinates:</p>
            <p class="card-text">Latitude: ${latitude}</p>
            <p class="card-text">Longitude: ${longitude}</p>
            <p class="card-text">${link}</p>
      </div>
      </div>`;

  }
  document.getElementById('output').innerHTML = message;
}

// Function to filter parks by a specific state
function filterParksByState(parksArray, state) {
  return parksArray.filter(park => park.State === state);
}

// Update states in second dropdown that filtered By State.
function onStateSelect() {
  let stateDropdown = document.getElementById('states').value;
  const filteredPark = nationalParksArray.filter(fl => fl.State.includes(stateDropdown));
  return filteredPark;
}
function updateParksByState() {
  let parkName = document.getElementById('parktype');
  const updatedParks = onStateSelect();
  updatedParks.forEach(element => {
    let updatedDropdownList = new Option(element.LocationName, element.State);
    parkName.appendChild(updatedDropdownList);
  })
}

function addParkTypesToDropdown() {
  //  Get the select element by its id

  const parkTypesDropdown = document.getElementById("parkType");
  // Loop through the parkTypesArray and add options to the dropdown
  parkTypesArray.forEach(parkType => {
    const option = document.createElement('option');

    option.value = parkType; // Set the option value
    option.text = parkType;  // Set the text content
    parkTypesDropdown.appendChild(option); // Append the option to the dropdown
    //     console.log(option);
  });

  let parkBtn = document.getElementById('parkTypeBtn');
  parkBtn.onclick = searchByParkType;
}

function searchByParkType() {
  const parkTypesDropdown = document.getElementById('parkType');
  const selectedValue2 = parkTypesDropdown.value;
  //  alert(selectedValue2);


  //filter by park type.
  let filteredParksByType = nationalParksArray.filter(fil => fil.LocationName.includes(selectedValue2));
  //format and display.
  let message = "";
  for (let index = 0; index < filteredParksByType.length; index++) {
    const image = filteredParksByType[index].Image;
    const name = filteredParksByType[index].LocationName;
    const address = filteredParksByType[index].Address;
    const city = filteredParksByType[index].City;
    const zipCode = filteredParksByType[index].ZipCode;
    const latitude = filteredParksByType[index].Latitude;
    const longitude = filteredParksByType[index].Longitude;
    //phone number logic. display phone number othervise display no phone number available. N/A.
    let phoneNumber = null;
    if (filteredParksByType[index].Phone == 0) {
      phoneNumber = "N/A";
    }
    else if (filteredParksByType[index].Phone.includes("(")) {
      phoneNumber = filteredParksByType[index].Phone;
    }

    // fax logic. display fax otherwise display no fax available.
    let fax = null;

    if (filteredParksByType[index].Fax == 0) {
      fax = "Not available";
    }
    else if (filteredParksByType[index].Fax.includes("(")) {
      fax = filteredParksByType[index].Fax;
    }
    let link = null;
    if (filteredParksByType[index].Visit) {
      link = `<a href="${filteredParksByType[index].Visit}" target="_blank" class="btn btn-secondary">Visit External Website</a>`
    }
    else {
      link = "No external website exists";
    }

    message += ` <div class="card my-3" style="width: 18rem; height: 45vh;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"> Address: ${address} ${city} ${zipCode}</p>
            <p class="card-text">Phone number: ${phoneNumber}.</p>
            <p class="card-text">Fax: ${fax}.</p>
            <p class="card-text">Coordinates:</p>
            <p class="card-text">Latitude: ${latitude}</p>
            <p class="card-text">Longitude: ${longitude}</p>
            <p class="card-text">${link}</p>
            
        </div>
        </div>`;
  }
  document.getElementById('output2').innerHTML = message;

}

