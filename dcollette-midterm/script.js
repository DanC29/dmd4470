const item_input = document.querySelector("#item_input");
const add_item_btn = document.querySelector("#add_new_task");
const my_list = document.querySelector("#my_list");

var cardOBJ = document.querySelector(".card");

add_item_btn.addEventListener("click", addToDB);

db.collection("list_items").onSnapshot((querySnapshot) => {
  my_list.innerHTML = "";

  querySnapshot.forEach((doc) => {
    console.log("DOC: ", doc);

    //CARD
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "col-md-8");
    cardDiv.id = doc.data().id;
    //TITLE
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = doc.data().name;
    cardTitle.classList.add("card-title");
    cardDiv.appendChild(cardTitle);
    //BTN DIV
    var btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btnDiv");
    cardDiv.appendChild(btnsDiv);
    //CHECK BTN
    var cardCheck = document.createElement("button");
    cardCheck.innerText = "Check Item";
    cardCheck.classList.add("btn", "card-complete");
    cardCheck.addEventListener("click", function () {
      cardComplete(doc.id);
    });
    btnsDiv.appendChild(cardCheck);
    //DELETE BTN
    var cardDelete = document.createElement("button");
    cardDelete.innerText = "Delete Item";
    cardDelete.classList.add("btn", "cardDelete");
    cardDelete.addEventListener("click", function () {
      removeCard(doc.id);
    });
    btnsDiv.appendChild(cardDelete);

    my_list.appendChild(cardDiv);
  });
});

//CHECK FUNCTION
function cardComplete(id) {
  var cardRef = db.collection("list_items").doc(id);

  const cardBgRef = document.querySelector(".card");

  // Set the "capital" field of the city 'DC'
  return cardRef
    .update({
      status: "complete",
    })
    .then(() => {
      console.log("Document successfully updated!");
      cardBgRef.style.backgroundColor = "green";
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

//DELETE FUNCTION
function removeCard(id) {
  db.collection("list_items")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
//ADD DOC TO COLLECTION
function addToDB() {
  var itemName = item_input.value;
  // Add a new document with a generated id.
  db.collection("list_items")
    .add({
      name: itemName,
      status: "active",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

/* class Items {
  constructor(name, status) {
    this.name = name;
    this.status = status;
    itemsArray.push(this);
  }
  displayToPage() {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "col-md-8");

    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = this.name;
    cardTitle.classList.add("card-title");
    cardDiv.appendChild(cardTitle);

    return cardDiv;
  }
} */

//new_item_btn.addEventListener("click", genID);
// ADD DOC WITH ID
//function genID() {
// var user_input_task = new_task_text.value;

// Add a new document in collection "list_items"
/*   db.collection("list_items")
    .doc()
    .set({
      name: user_input_task,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
} */

/* function getItems()  */

// CODE FOR LATER

// ORDER ITEMS
/* citiesRef.orderBy("state").orderBy("population", "desc"); */

// GET DATA
/* db.collection("cities").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
}); */

// SET DATA
// Add a new document in collection "cities"
/* db.collection("cities").doc("LA").set({
  name: "Los Angeles",
  state: "CA",
  country: "USA"
})
.then(() => {
  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
}); */

/*   let i = 0;
  var order = i++; */

/* db.collection("list_items")
    .doc("user_input_task")
    .set({
      id: user_input_task,
      name: user_input_task,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  new_task_text.value = ""; */

// REFRENCE NOTE
/* var cityRef = db.collection('cities').doc('BJ');

var setWithMerge = cityRef.set({
    capital: true
}, { merge: true }); */

// TEST CODE
/* const new_task_text = document.querySelector("#item-input-text");
const add_new_button = document.querySelector("#new_item_btn");

const my_list = document.querySelector("#my_list");
db.collection("list_items").onSnapshot((querySnapshot) => {
  my_list.innerHTML = "";
  querySnapshot.forEach((doc) => {
    var taskName = doc.data().name;
    var itemOrder = doc.data().order;
    console.log(taskName);

    var newLI = document.createElement("div");
    newLI.innerHTML = taskName;

    newLI.addEventListener("click", function () {
      deleteTask(doc.id);
    });

    my_list.appendChild(newLI);
  });
});

function deleteTask(id) {
  db.collection("list_items")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

add_new_button.addEventListener("click", function () {
  // Add a new document with a generated id.

  var new_task_name = new_task_text.value;

  db.collection("list_items")
    .add({
      name: new_task_name,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  new_task_text.value = "";
});
 */

// TEST CODE
/* const new_task_text = document.querySelector("#item-input-text");
const new_item_btn = document.querySelector("#new_item_btn");

// GET DATA
const my_list = document.querySelector("#my_list");
db.collection("list_items")
  .orderBy("name", "desc")
  .onSnapshot((querySnapshot) => {
    my_list.innerHTML = "";
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      var itemTitle = doc.data().name;
      console.log(itemTitle);

      var cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "col-md-8");

      var cardTitle = document.createElement("h4");
      cardTitle.innerHTML = itemTitle;
      cardTitle.classList.add("card-title");
      cardDiv.appendChild(cardTitle);

     );  var noteInput = document.createElement("input");
      noteInput.setAttribute("type", "text");
      noteInput.setAttribute("value", "Add Note");
      noteInput.classList.add("note-input");
      cardDiv.appendChild(noteInput);

      /*     var noteBTN = document.createElement("button");
    noteBTN.innerHTML = "Add Note";
    cardDiv.appendChild(noteBTN);

    button.addEventListener("click", addNote*/
/* 
      my_list.appendChild(cardDiv);
    });
  });
 */
/* function addNote () {
  var item_notes = 
} */

//new_item_btn.addEventListener("click", genID);
// ADD DOC WITH ID
//function genID() {
// var user_input_task = new_task_text.value;

// Add a new document in collection "list_items"
/*   db.collection("list_items")
    .doc()
    .set({
      name: user_input_task,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
} */

/* db.collection("list_items")
  .doc("user_input_task")
  .set({
    name: user_input_task,
    order: order,
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
 */
