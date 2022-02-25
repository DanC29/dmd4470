const item_input = document.querySelector("#item_input");
const add_item_btn = document.querySelector("#add_new_task");
const my_list = document.querySelector("#my_list");

add_item_btn.addEventListener("click", addToDB);

db.collection("list_items").onSnapshot((querySnapshot) => {
  my_list.innerHTML = "";

  querySnapshot.forEach((doc) => {
    console.log("DOC: ", doc);

    // CARD
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "status-" + doc.data().status);

    //

    // TITLE
    var cardTitle = document.createElement("h4");
    cardTitle.innerHTML = doc.data().name;
    cardTitle.classList.add(
      "card-title",
      "card-header",
      "status-" + doc.data().status
    );
    cardDiv.appendChild(cardTitle);

    //

    // ITEM NOTES DIV
    var notesDiv = document.createElement("div");
    notesDiv.classList.add("notes");
    cardDiv.appendChild(notesDiv);

    // ITEM NOTES LIST
    var listCont = document.createElement("ul");
    listCont.classList.add("notes-ul", `${doc.id}`);
    listCont.id = "note_list";
    if (doc.data().notesArray) {
      doc.data().notesArray.forEach((note) => {
        // NOTE LI
        var noteLI = document.createElement("li");
        noteLI.classList.add("notes-li");
        noteLI.innerHTML = note;
        noteLI.addEventListener("click", function () {
          noteDelete();
        });
        listCont.appendChild(noteLI);
      });
    }
    notesDiv.appendChild(listCont);

    //

    // ITEM NOTES INPUT DIV
    var notesInputDiv = document.createElement("div");
    notesInputDiv.classList.add("notes", "card-body");
    notesInputDiv.id = "note_list";
    cardDiv.appendChild(notesInputDiv);

    // ITEM NOTE INPUT
    var noteInput = document.createElement("input");
    noteInput.setAttribute("type", "text");
    noteInput.setAttribute("value", "Add Note");
    noteInput.classList.add("note-input", "form");
    noteInput.id = "note-input-text";
    notesInputDiv.appendChild(noteInput);

    // NOTE BTN
    var noteBTN = document.createElement("button");
    noteBTN.classList.add("btn", "note-btn");
    noteBTN.innerHTML = "Add Note";
    noteBTN.id = "note_input_btn";
    noteBTN.addEventListener("click", function () {
      addNote(doc.id, noteInput.value, doc);
    });
    notesInputDiv.appendChild(noteBTN);

    //

    // BTN DIV
    var btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btnDiv", "card-footer");
    cardDiv.appendChild(btnsDiv);
    // CHECK BTN
    var cardCheck = document.createElement("button");
    cardCheck.innerText = "Check Item";
    cardCheck.classList.add("btn", "card-complete");
    cardCheck.addEventListener("click", function () {
      cardComplete(doc.id);
    });
    btnsDiv.appendChild(cardCheck);
    // DELETE BTN
    var cardDelete = document.createElement("button");
    cardDelete.innerText = "Delete Item";
    cardDelete.classList.add("btn", "card-delete");
    cardDelete.addEventListener("click", function () {
      removeCard(doc.id);
    });
    btnsDiv.appendChild(cardDelete);

    my_list.appendChild(cardDiv);
  });
});

// ADD DOC TO COLLECTION
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

// DELETE FUNCTION
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

// DELETE NOTE

function noteDelete() {
  console.log("click");
}

// CHECK FUNCTION
function cardComplete(id) {
  let itemCheck = db.collection("list_items").doc(id);
  itemCheck.get().then(function (doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if (status == "active") {
        itemCheck.update({
          status: "completed",
        });
        console.log(doc.data().status);
      } else if (status == "completed") {
        itemCheck.update({
          status: "active",
        });
        console.log(doc.data().status);
      }
    }
  });
}
// ADD NOTE

function addNote(id, noteContent, doc) {
  var noteArrayRef = db.collection("list_items").doc(id);

  console.log("notesArray", doc, doc.data());

  var notes = doc.data().notesArray || [];

  // Set the "capital" field of the city 'DC'
  return noteArrayRef
    .update({
      notesArray: [...notes, noteContent],
    })
    .then(() => {
      console.log("Document successfully updated!", doc.data().noteArray);
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}
