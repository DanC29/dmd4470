// Feed Page
var feedPage = new Vue({
  el: "#feed-page",
  vuetify: new Vuetify(),
  data: function () {
    return {
      app_title: "Still Thinking",
      dialog: false,
      addCmt: false,
      posts: [],
      comments: [],
      avatar: "",
      postLiked: false,

      commentText: "",
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
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          this.posts = [];
          querySnapshot.forEach((doc) => {
            this.posts.push({
              id: doc.id,
              username: doc.data().username,
              avatar: doc.data().avatarColor,

              caption: doc.data().caption,

              comments: doc.data().comments,

              timestamp: doc.data().timestamp,
              createdDate: doc.data().timestamp.toDate().toLocaleDateString(),
              createdTime: doc
                .data()
                .timestamp.toDate()
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),

              likes: doc.data().likes,
              likesNum: doc.data().likes.length,
              postLiked: doc.data().postLiked,
            });
          });
          this.posts.forEach(function (element) {
            if (element.likes.indexOf(localStorage.getItem("user")) > -1) {
              element["postLiked"] = true;
            } else {
              element["postLiked"] = false;
            }
          });
        });
    },

    newPost: function () {
      db.collection("posts")
        .add({
          username: localStorage.getItem("user"),
          avatar: this.avatar,

          caption: this.posts.caption,

          timestamp: new Date(),

          comments: [],

          likes: [],
          likesNum: 0,
          postLiked: false,
        })
        .then(() => {
          console.log("Document successfully written!");
          console.log(this.avatar);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },

    likePost: function (data) {
      let docId = data.id;
      var docRef = db.collection("posts").doc(docId);
      if (data.likes.indexOf(localStorage.getItem("user")) > -1) {
        return docRef
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(
              localStorage.getItem("user")
            ),
            likesNum: data.likesNum - 1,
            postLiked: false,
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else {
        return docRef
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(
              localStorage.getItem("user")
            ),
            likesNum: data.likesNum + 1,
            postLiked: true,
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    },
    postStatus: function (data) {
      return data.postLiked;
    },

    addComment: function (data) {
      let docId = data.id;
      var docRef = db.collection("posts").doc(docId);
      if (data.comments.indexOf > -1) {
        return docRef.update({
          content: this.comment.content,
          username: localStorage.getItem("user"),
        });
      }
    },

    /* getComments: function () {
      db.collection("posts").onSnapshot((querySnapshot) => {
        this.postComments = [];
        querySnapshot.forEach((doc) => {
          this.postComments.push({
            id: doc.id,
            username: doc.data().username,

            comments: [
              {
                username: doc.data().username,
                content: doc.data().content,
              },
            ],
          });
        });
        this.posts.forEach(function (element) {
          if (element.likes.indexOf(localStorage.getItem("user")) > -1) {
            element["postLiked"] = true;
          } else {
            element["postLiked"] = false;
          }
        });
      });
    }, */

    logout: function () {
      localStorage.clear();
      window.location.replace("index.html");
    },
  },

  mounted() {
    this.profileInfo();
    this.getPosts();
    //this.getComments();
  },
});
