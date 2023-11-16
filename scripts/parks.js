"use strict";

window.onload = () => {
  //
  const states = document.getElementById("states");
  hideOrShow();
  addParkTypesToDropdown();
  addLocationsToDropdown();
  addNationalParksToDropdown();

  //onchage event for updating second dropdown filtered by state.
  // states.onchange = function () {
  //   let clearParksList = parktype;
  //   clearParksList.innerHTML = "";
  //   updateParksByState();


  // }

  //onclick event to clear the search.

  // let clearBtn = document.getElementById('clear');
  // clearBtn.addEventListener('click', function(){

  // })


}; // end of window onload.

//hide or show info based on schoosen radio button.
function hideOrShow(section) {
  //making variables to manipulate by sections by id.
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

  // for (let index = 0; index < filteredParksByState.length; index++) {
  //   console.log(index);
  //   console.log(`You choose this state.. and filtered parks by state are ${filteredParksByState[index].LocationName}`);
  //   return filteredParksByState[index].LocationName;
  // display filtered states in dropdown. (this list will get updated after i pressed the search by location button and this function got executed).

  let message = "";
  for (let index = 0; index < filteredParksByState.length; index++) {
    const image = filteredParksByState[index].Image;
    const name = filteredParksByState[index].LocationName;
    const address = filteredParksByState[index].Address;
    const city = filteredParksByState[index].City;
    const zipCode = filteredParksByState[index].ZipCode;
    //TODO not all parks have phone numbers. some parks give me 0 in the carts. how to handle this ?
    const phoneNumber = filteredParksByState[index].Phone;
    //TODO  not all websites have link to a vebsite. so how do i display links only for those
    //TODO  websites which has links. some logic with if statement ?
    const link = filteredParksByState[index].Visit;
    const state = filteredParksByState[index].State;
    
    message += ` <div class="card my-3" style="width: 18rem; height: 35vh;">
      <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"> Address: ${address} ${city} ${state} ${zipCode}</p>
          <p class="card-text">Phone number: ${phoneNumber}.</p>
          <a href="${link}" target="_blank" class="btn btn-secondary">Visit External Website</a>
      </div>
      </div>`;

  }
  document.getElementById('output').innerHTML = message;
}

// }


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


//TODO functions for searching by park type.

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
    //TODO not all parks have phone numbers. some parks give me 0 in the carts. how to handle this ?
    const phoneNumber = filteredParksByType[index].Phone;
    //TODO  not all websites have link to a vebsite. so how do i display links only for those
    //TODO  websites which has links. some logic with if statement ?
    const link = filteredParksByType[index].Visit;

    message += ` <div class="card my-3" style="width: 18rem; height: 35vh;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"> Address: ${address} ${city} ${zipCode}</p>
            <p class="card-text">Phone number: ${phoneNumber}.</p>
            <a href="${link}" target="_blank" class="btn btn-secondary">Visit External Website</a>
        </div>
        </div>`;

  }
  document.getElementById('output2').innerHTML = message;

}

