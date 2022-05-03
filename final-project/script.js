// Feed Page
var feedPage = new Vue({
  el: "#feed-page",
  vuetify: new Vuetify(),
  data: function () {
    return {
      app_title: "Still Thinking",
      dialog: false,
      posts: [],
      likeIcon: "cards-heart-outline",
      likedIcon: "mdi-heart",
      avatar: "",
    };
  },

  methods: {
    profileInfo() {
      var docRef = db.collection("users").doc(localStorage.getItem("user"));
      docRef.get().then((doc) => {
        this.avatar = doc.data().avatarColor;
      });
    },
    getPosts: function () {
      // get the tweets from the firestore database and prep them for display
      db.collection("posts")
        .orderBy("timestamp", db.Desc)
        .onSnapshot((querySnapshot) => {
          this.posts = [];
          querySnapshot.forEach((doc) => {
            this.posts.push({
              id: doc.id,
              caption: doc.data().caption,
              likes: doc.data().likes,
              timestamp: doc.data().timestamp,
              createdDate: doc.data().timestamp.toDate().toLocaleDateString(),
              createdTime: doc.data().timestamp.toDate().toLocaleTimeString(),
              username: doc.data().username,
              avatar: doc.data().avatarColor,
            });
          });
        });
    },

    newPost: function () {
      db.collection("posts")
        .add({
          username: localStorage.getItem("user"),
          likes: [],
          id: this.posts.id,
          caption: this.posts.caption,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          dialog: false,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },

    likePost: function (docID) {
      var docRef = db.collection("posts").doc(docID);

      this.likeIcon = this.likeIcon ? this.likedIcon : this.likeIcon;

      // Set the "capital" field of the city 'DC'

      //firebase.firestore.FieldValue.arrayUnion("joelsalisbury")

      return docRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion("joelsalisbury"),
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    logout: function () {
      localStorage.clear();
      window.location.replace("index.html");
    },
  },

  mounted() {
    this.getPosts();
  },
});
