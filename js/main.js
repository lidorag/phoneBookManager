/***********************************
 * This work made by :
 * Lidor ben shimol
 ***********************************/
"use strict";

const tableKey = "pbs-table";
// holding the JSON key if we edit user
let tmpKeyHold = 0;
/**
 * To reset the database
 */
let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  localStorage.removeItem(tableKey);
});
/**
 * Creat our main table
 */
let pbsTableMain;
/**
 * Creat our demo table
 */
let pbsTableDemo = {
  1: {
    name: "Lidor Ben shimol",
    phone: "054-2155555",
    address: "Afula",
    email: "lll@gmail.com",
    description: "This is a Demo description of Lidor",
  },
  2: {
    name: "Addy elvin",
    phone: "054-5678940",
    address: "Afula Rova izrael 25",
    email: "aaa@gmail.com",
    description: "This is a Demo description of Addy",
  },
  3: {
    name: "Israel Israeli",
    phone: "054-1234567",
    address: "Afula Israel 25",
    email: "lll@gmail.com",
    description: "This is a Demo description of Israel",
  },
};

/**
 *
 * @param {*} pbsTable Out table we want to display
 * this is the main function to load all the table on the screen and build the tables function
 * like edit, delete
 */
let buildContectTable = (pbsTable) => {
  /**
   * Sorting the JSON Object
   */
  pbsTable = sortTable(pbsTable); // set the table to display as the sorted table
  
  /**
   * get HTML elements
   */
  let pbsTableKeys = Object.keys(pbsTable);
  let tableContainer = document.getElementById("pbsTableContainer");

  /**
   * This will remove the table we alread creted and make us "clean"
   * table, if we dont do that we will have duplicates every time we add new item
   * or make any change on our original table
   */
  let oldTableBody = document.getElementById("tableBody");
  tableContainer.removeChild(oldTableBody);
  let newTableBody = document.createElement("span");
  newTableBody.id = "tableBody";

  /**
   * add the table elements
   */
  tableContainer.appendChild(newTableBody);
  for (let i = 0; i < pbsTableKeys.length; i++) {
    let curretRow = document.createElement("div");
    let currentNameCol = document.createElement("div");
    let currentNameTooltip = document.createElement("span");
    let currentPhoneCol = document.createElement("div");
    let currentEditBtn = document.createElement("div");
    let currentDeleteBtn = document.createElement("div");

    currentNameTooltip.className = "tooltiptext-disable";
    currentNameTooltip.textContent = pbsTable[pbsTableKeys[i]].name;

    curretRow.className = "pbs-table-row";
    currentNameCol.className = "pbs-table-column pbs-name";
    // adding element id to the name and tooltip
    currentNameCol.id = pbsTableKeys[i];
    currentNameTooltip.id = pbsTableKeys[i];

    currentPhoneCol.className = "pbs-table-column pbs-phone";
    currentEditBtn.className = "pbs-table-column pbs-edit";
    currentDeleteBtn.className = "pbs-table-column pbs-delete";

    currentNameCol.innerHTML = pbsTable[pbsTableKeys[i]].name;
    currentPhoneCol.innerHTML = pbsTable[pbsTableKeys[i]].phone;
    currentNameCol.appendChild(currentNameTooltip);
    // create the edit and delete icones
    currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';

    curretRow.appendChild(currentNameCol);
    curretRow.appendChild(currentPhoneCol);
    curretRow.appendChild(currentEditBtn);
    curretRow.appendChild(currentDeleteBtn);
    newTableBody.appendChild(curretRow);
  }
  /* 
  This section adding the mouse hover effect
  */
  let hoverEffect = document.getElementsByClassName("pbs-table-row");
  for (let i = 1; i < hoverEffect.length; i++) {
    hoverEffect[i].addEventListener("mouseenter", ($event) => {
      $event.target.style.background = "rgba(208, 208, 208, 0.8)";
      $event.target.style.color = "white";
      $event.target.style.fontWeight = "bold";
    });

    hoverEffect[i].addEventListener("mouseleave", ($event) => {
      $event.target.style.background = "";
      $event.target.style.color = "black";
      $event.target.style.fontWeight = "normal";
    });
  }
  /* */
  /*
  This section handle the popup detil window when we click on the 
  Name or Phone on each row
  */
  let popNameBtn = document.getElementsByClassName("pbs-name");
  let popPhoneBtn = document.getElementsByClassName("pbs-phone");
  // i = 1 so our title will no popup display message
  for (let i = 1; i < popNameBtn.length; i++) {
    // add for the username
    popNameBtn[i].addEventListener("click", ($event) => {
      /* hide the tool tip */
      try {
      let toolKit = $event.target.getElementsByTagName("span")[0];
      toolKit.className = "tooltiptext-disable";
      }
      catch(e){
      }
      finally {
        if ($event.target.className === "tooltiptext-enable") {
          $event.target.className = "tooltiptext-disable";
        }
      }

      let id = $event.target.parentElement.children[0].id;
      let personToPop = pbsTable[id];
      document.querySelector(".bg-modal").style.display = "flex";
      let PersonName = document.getElementById("personName");
      let PersonPhone = document.getElementById("personPhone");
      let PersonAddress = document.getElementById("personAddress");
      let PersonEmail = document.getElementById("personEmail");
      let PersonDescription = document.getElementById("personDescription");
      PersonName.value = "Name " + personToPop.name;
      PersonPhone.value = "Phone " + personToPop.phone;
      PersonAddress.value = "Address " + personToPop.address;
      PersonEmail.value = "Email " + personToPop.email;
      PersonDescription.value = personToPop.description;
    });
    /**
     * Adding tool tip text to overflow text
     */
    popNameBtn[i].addEventListener("mouseenter", ($event) => {
      let id = $event.target.parentElement.children[0];
      if (isEllipsisActive(id)) {
        let toolKit = $event.target.getElementsByTagName("span")[0];
        toolKit.className = "tooltiptext-enable";
      }
    });
    popNameBtn[i].addEventListener("mouseleave", ($event) => {
        let toolKit = $event.target.getElementsByTagName("span")[0];
        toolKit.className = "tooltiptext-disable";
    });
    /*End of adding tooltip */

    /* This fuction test if the text is overflowing ( is there ellipsis )*/
    function isEllipsisActive(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }

    // add for the phone
    popPhoneBtn[i].addEventListener("click", ($event) => {
      let id = $event.target.parentElement.children[0].id;
      let personToPop = pbsTable[id];
      document.querySelector(".bg-modal").style.display = "flex";
      let PersonName = document.getElementById("personName");
      let PersonPhone = document.getElementById("personPhone");
      let PersonAddress = document.getElementById("personAddress");
      let PersonEmail = document.getElementById("personEmail");
      let PersonDescription = document.getElementById("personDescription");
      PersonName.value = "Name " + personToPop.name;
      PersonPhone.value = "Phone " + personToPop.phone;
      PersonAddress.value = "Address " + personToPop.address;
      PersonEmail.value = "Email " + personToPop.email;
      PersonDescription.value = personToPop.description;
    });

    document.querySelector(".close").addEventListener("click", () => {
      document.querySelector(".bg-modal").style.display = "none";
    });
  }

  // END of popup detailes

  /**
   * This section handle the submit and cancle btn
   */

  let newPersonSubmitBtn = document.getElementById("newPersonSubmitBtn");
  let newPersonCancleBtn = document.getElementById("newPersonCancleBtn");
  /**
   * Handle the submit click btn
   */
  newPersonSubmitBtn.addEventListener("click", (e) => {
    // will prevent the HTML form submit
    e.preventDefault();
    let newPersonName = document.getElementById("newPersonName").value.trim();
    let newPersonPhone = document.getElementById("newPersonPhone").value.trim();
    let newPersonAddress = document
      .getElementById("newPersonAddress")
      .value.trim();
    let newPersonEmail = document.getElementById("newPersonEmail").value.trim();
    let newPersonDescription = document
      .getElementById("newPersonDescription")
      .value.trim();
    /* check if our input is valid */
    let isValidInput = checkInputs();
    if (isValidInput) {
      let keyValue = Date.now();
      if (tmpKeyHold != 0) {
        keyValue = tmpKeyHold;
        tmpKeyHold = 0;
      }
      pbsTableMain[keyValue] = {
        name: newPersonName,
        phone: newPersonPhone,
        address: newPersonAddress,
        email: newPersonEmail,
        description: newPersonDescription,
      };
      localStorage.setItem(tableKey, JSON.stringify(pbsTableMain));
      hideFormControl(); // restore the class name for our form table
      enableDisableNewUserModal("disable");
      buildContectTable(pbsTableMain);
    }
  });

  /**
   *
   * @param {*} option enable / disable
   * this method will hide / display our new user / edit user form
   */
  let enableDisableNewUserModal = (option) => {
    let newPersonName = document.getElementById("newPersonName");
    let newPersonPhone = document.getElementById("newPersonPhone");
    let newPersonAddress = document.getElementById("newPersonAddress");
    let newPersonEmail = document.getElementById("newPersonEmail");
    let newPersonDescription = document.getElementById("newPersonDescription");
    newPersonName.value = "";
    newPersonPhone.value = "";
    newPersonAddress.value = "";
    newPersonEmail.value = "";
    newPersonDescription.value = "";

    let newPersonModal = document.getElementById("NewPersonModal");
    let backdrop = document.getElementById("backdrop");

    // we will use `` for enter the javascript code.
    // the '-modal' is our css code name so if we will write disable it will be
    // disable-modal, same as enable-modle
    newPersonModal.className = `${option}-modal`;
    backdrop.className = `${option}-modal`;
  };
  // handle the cancle btn
  newPersonCancleBtn.addEventListener("click", () => {
    enableDisableNewUserModal("disable");
  });
  /**
   * END OF Handle the submit click btn
   */

  /**
   * Handle the add new user,Edit and delete
   */
  // add new user btn
  let addNewEntryBtn = document.getElementById("pbsAddNewEntry");
  addNewEntryBtn.addEventListener("click", () => {
    enableDisableNewUserModal("enable");
  });

  /**
   * add edit btn listener so when we want to edit a row in out
   * contact table we will be able to
   */
  let editBtn = document.getElementsByClassName("pbs-edit");
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", ($event) => {
      tmpKeyHold = $event.target.parentElement.children[0].id;
      let personToEdit = pbsTable[tmpKeyHold];
      enableDisableNewUserModal("enable");
      let newPersonName = document.getElementById("newPersonName");
      let newPersonPhone = document.getElementById("newPersonPhone");
      let newPersonAddress = document.getElementById("newPersonAddress");
      let newPersonEmail = document.getElementById("newPersonEmail");
      let newPersonDescription = document.getElementById(
        "newPersonDescription"
      );
      newPersonName.value = personToEdit.name;
      newPersonPhone.value = personToEdit.phone;
      newPersonAddress.value = personToEdit.address;
      newPersonEmail.value = personToEdit.email;
      newPersonDescription.value = personToEdit.description;
    });
  }
  /**
   * add delete btn listener so when we want to delete a row in out
   * contact table we will be able to
   */
  let deleteBtn = document.getElementsByClassName("pbs-delete");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", ($event) => {
      let idToDelete = $event.target.parentElement.children[0].id;
      let name = pbsTable[idToDelete].name;
      let isSure = window.confirm(
        "Are you sure you want to delete " + name + "?"
      );
      if (isSure) {
        // delete user from table
        deleteUserFromTable(idToDelete);
      }
    });
  }
  /**
   * END OF Handle the add new user,Edit and delete
   */
};

/**
 *
 * @param {*} userName the name we want to delete from our table
 * delete user from out localStorage
 * our method is to copy all users excapt the user we want to delete then
 * save the new list to our localstorage
 */
let deleteUserFromTable = (userName) => {
  let tempTable = {};
  let pbsTableKeys = Object.keys(pbsTableMain);
  for (let i = 0; i < pbsTableKeys.length; i++) {
    if (userName !== pbsTableKeys[i]) {
      tempTable[pbsTableKeys[i]] = pbsTableMain[pbsTableKeys[i]];
    }
  }
  pbsTableMain = tempTable;
  localStorage.setItem(tableKey, JSON.stringify(pbsTableMain));
  buildContectTable(pbsTableMain);
};

/**
 * when we run the code this will run first
 */
let init = () => {
  /**
   * if we already use the table and make changes then load it
   * otherwish load the demo table
   */
  if (localStorage.getItem(tableKey)) {
    pbsTableMain = JSON.parse(localStorage.getItem(tableKey));
  } else {
    pbsTableMain = pbsTableDemo;
    localStorage.setItem(tableKey, JSON.stringify(pbsTableMain));
  }

  buildContectTable(pbsTableMain);
};

init();

/**
 * Search bar
 */
const search = document.getElementById("searchBar");

let searchPerson = (userName) => {
  let tempTable = {};
  let pbsTableKeys = Object.keys(pbsTableMain);
  /*
   * g : matches the pattern multiple times.
   * i : makes the regex case insensitive.
   */
  const re = new RegExp(`${userName}`, "gi");
  for (let i = 0; i < pbsTableKeys.length; i++) {
    if (re.test(pbsTableMain[pbsTableKeys[i]].name)) {
      tempTable[pbsTableKeys[i]] = pbsTableMain[pbsTableKeys[i]];
    }
  }
  // send out filterd table to dispay only
  buildContectTable(tempTable);
};

search.addEventListener("input", () => searchPerson(search.value));

/*TEST CHECK INPUTS  */
function checkInputs() {
  const activeForm = document.getElementsByClassName("enable-modal");

  if (activeForm.length > 0) {
    // trim to remove the whitespaces
    let newPersonNameTag = document
      .getElementById("newPersonName")
      .value.trim();
    let newPersonPhoneTag = document
      .getElementById("newPersonPhone")
      .value.trim();
    let newPersonAddressTag = document
      .getElementById("newPersonAddress")
      .value.trim();
    let newPersonEmailTag = document
      .getElementById("newPersonEmail")
      .value.trim();
    let newPersonDescriptionTag = document
      .getElementById("newPersonDescription")
      .value.trim();
    let errorOff = true;
    if (newPersonNameTag === "") {
      setErrorFor(newPersonName, "Username cannot be blank");
      errorOff = false;
    } else {
      setSuccessFor(newPersonName);
    }

    if (newPersonPhoneTag === "") {
      setErrorFor(newPersonPhone, "Phone cannot be blank");
      errorOff = false;
    } else if (!isPhone(newPersonPhoneTag)) {
      setErrorFor(newPersonPhone, "Not a valid Phone number");
      errorOff = false;
    } else {
      setSuccessFor(newPersonPhone);
    }

    if (newPersonAddressTag === "") {
      setErrorFor(newPersonAddress, "Address cannot be blank");
      errorOff = false;
    } else {
      setSuccessFor(newPersonAddress);
    }

    if (newPersonDescriptionTag === "") {
      setErrorFor(newPersonDescription, "Description cannot be blank");
      errorOff = false;
    } else {
      setSuccessFor(newPersonDescription);
    }

    if (newPersonEmailTag === "") {
      setErrorFor(newPersonEmail, "Email cannot be blank");
      errorOff = false;
    } else if (!isEmail(newPersonEmailTag)) {
      setErrorFor(newPersonEmail, "Not a valid email");
      errorOff = false;
    } else {
      setSuccessFor(newPersonEmail);
    }

    return errorOff;
  }
}
/**
 *
 * @param {*} input the element we want to display error message
 * @param {*} message the message we want to display
 */
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

/**
 *
 * @param {*} input the element we want to display success message
 * @param {*} message the message we want to display
 */
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

/**
 * This function using Regax to make sure the email is valid format
 * test@test.com
 * @param {*} email
 * @returns is valid email
 */
function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
/**
 * this function will check that the phone number is valid
 */
function isPhone(phone) {
  /*
  Valid formats:
+42 555.123.4567
+1-(800)-123-4567
+7 555 1234567
+7(926)1234567
(926) 1234567
+79261234567
926 1234567
9261234567
1234567
123-4567
123-89-01
495 1234567
469 123 45 67
89261234567
8 (926) 1234567
  */
  const re =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
  return re.test(String(phone).toLowerCase());
}

/**
 * this function will pass throw all our
 * form-control id and change there class to form-control
 * its importent to change it all back becuse if we keep the
 * error / succses message we will keep see it on the screen after
 * the form is closed
 */
function hideFormControl() {
  let i = 0;
  let formControl = document.querySelectorAll(".form-control");
  for (i = 0; i < formControl.length; i++) {
    formControl[i].className = "form-control";
  }
}


/**
 * this function using bubble sort algorithem to sort
 * the JSON object table
 * @param {*} tableToSort
 * @returns sorted table
 */
function sortTable(tableToSort) {
  let pbsTableKeys = Object.keys(tableToSort);
  let firstName;
  let secondName;
  let temp;
  for (let j = 0; j < pbsTableKeys.length - 1; j++) {
    // get only first name by using split
    firstName = tableToSort[pbsTableKeys[j]].name.split(" ")[0];
    
    for (let i = j + 1; i < pbsTableKeys.length; i++) {
      secondName = tableToSort[pbsTableKeys[i]].name.split(" ")[0];
      if (firstName.localeCompare(secondName) > 0) {
        temp = tableToSort[pbsTableKeys[j]];
        tableToSort[pbsTableKeys[j]] = tableToSort[pbsTableKeys[i]];
        tableToSort[pbsTableKeys[i]] = temp;
      }
    }
  }
  return tableToSort;
}
