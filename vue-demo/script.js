console.log(db);
var app = new Vue({
  el: "#app",
  data: function () {
    return {
      app_title: "My Vue Contact List",
      app_subhead: "Using Vue in the DOM",
      // Reps. new contact
      new_contact: {
        first: "First",
        last: "Last",
        phone: "000-000-0000",
        email: "email@uconn.edu",
        notes: "Notes",
      },
      //Copy filled out data and add it into the array
      contacts: [],
    };
  },
  methods: {
    newContact: function () {
      // Add a new document in collection "cities"
      db.collection("list_contacts")
        .add({
          firstname: this.new_contact.first,
          lastname: this.new_contact.last,
          email: this.new_contact.email,
          phone: this.new_contact.phone,
          notes: this.new_contact.notes,
          id: this.new_contact.id,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    getContactsFromFirestore(orderBy) {
      db.collection("list_contacts")
        .orderBy(orderBy)
        .onSnapshot((querySnapshot) => {
          this.contacts = [];
          querySnapshot.forEach((doc) => {
            this.contacts.push({
              first: doc.data().firstname,
              last: doc.data().lastname,
              phone: doc.data().phone,
              email: doc.data().email,
              notes: doc.data().notes,
              id: doc.id,
            });
          });
          console.log(db);
        });
    },
    updateContact(data) {
      let docId = data.id;
      var docRef = db.collection("list_contacts").doc(docId);

      // Set the "capital" field of the city 'DC'
      return docRef
        .update({
          firstname: data.first,
          lastname: data.last,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },

  mounted() {
    this.getContactsFromFirestore("last");
  },
});
