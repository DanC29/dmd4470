var app = new Vue({
  el: "#app",
  data: function () {
    return {
      new_task: {
        taskName: "",
        notes: "",
        dueDate: "",
      },

      tasks: [],
    };
  },
  methods: {
    newNote: function () {
      db.collection("task_list")
        .add({
          newTaskName: this.new_task.taskName,
          newNote: this.new_task.notes,
          newDueDate: this.new_task.dueDate,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    getTasksFromFirestore() {
      db.collection("task_list")
        .orderBy("newDueDate")
        .onSnapshot((querySnapshot) => {
          this.tasks = [];
          querySnapshot.forEach((doc) => {
            this.tasks.push({
              taskName: doc.data().newTaskName,
              notes: doc.data().newNote,
              dueDate: doc.data().newDueDate,
              id: doc.id,
            });
          });
          console.log(db);
        });
    },
    updateTask(data) {
      let docId = data.id;
      var docRef = db.collection("task_list").doc(docId);
      return docRef
        .update({
          newTaskName: data.taskName,
          newNotes: data.notes,
          newDueDate: data.dueDate,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteTask(id) {
      db.collection("task_list")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    this.getTasksFromFirestore("last");
  },
});
