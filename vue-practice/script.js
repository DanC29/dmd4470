var app = new Vue({
  el: "#app",
  data: function () {
    return {
      new_task: {
        taskName: "",
        notes: "",
        dueDate: "",
        status: "active",
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
          taskStatus: this.new_task.status,
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
              id: doc.id,
              taskName: doc.data().newTaskName,
              notes: doc.data().newNote,
              dueDate: doc.data().newDueDate,
              status: doc.data().taskStatus,
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
          newNote: data.notes,
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
    taskComplete(id) {
      console.log("click", id);
      let currentStatus = db.collection("task_list").doc(id);
      currentStatus.get().then(function (doc) {
        if (doc.exists) {
          let taskStatus = doc.data().taskStatus;
          if (taskStatus == "active") {
            currentStatus.update({
              taskStatus: "completed",
            });
            console.log(doc.data().taskStatus);
          } else if (taskStatus == "completed") {
            currentStatus.update({
              taskStatus: "active",
            });
            console.log(doc.data().taskStatus);
          }
        }
      });
    },
  },
  mounted() {
    this.getTasksFromFirestore("last");
  },
});

/* taskComplete(id) {
  console.log("click", id);
  let taskCheck = db.collection("task_list").doc(id);
  taskCheck.get().then(function (doc) {
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
}, */
