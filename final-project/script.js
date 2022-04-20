// Feed Page
var feedPage = new Vue({
  el: "#feed-page",
  vuetify: new Vuetify(),
  data: function () {
    return {
      app_title: "Still Thinking",
      posts: [],
    };
  },
  methods: {
    getPosts: function () {
      // get the tweets from the firestore database and prep them for display
      db.collection("posts")
        .orderBy("timestamp")
        .onSnapshot((querySnapshot) => {
          this.posts = [];
          querySnapshot.forEach((doc) => {
            this.posts.push({
              id: doc.id,
              caption: doc.data().caption,
              likes: doc.data().likes,
              timestamp: doc.data().timestamp,
              username: doc.data().username,
            });
          });
        });
    },

    likePost: function (docID) {
      var docRef = db.collection("posts").doc(docID);

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
  },
  mounted() {
    this.getPosts();
  },
});

/* // BOTTOM NAV
var bottomNav = new Vue({
  el: "#bottom-nav",
  vuetify: new Vuetify(),
  data: function () {
    return {};
  },
}); */
