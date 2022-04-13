// HEADERS
var mainHeader = new Vue({
  el: "#main-header",
  vuetify: new Vuetify(),
  data: function () {
    return {
      drawer: false,
      group: null,
      header_title: "Still Thinking",
      settings: {
        privacy: "Privacy",
        account: "Account Settings",
        passwords: "Passwords",
        notifications: "Notifications",
      },
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
});

var newPostHeader = new Vue({
  el: "#new-post-header",
  vuetify: new Vuetify(),
  data: function () {
    return {
      drawer: false,
      group: null,
      header_title: "Still Thinking",
    };
  },
});

var profileHeader = new Vue({
  el: "#profile-header",
  vuetify: new Vuetify(),
  data: function () {
    return {
      drawer: false,
      group: null,
      header_title: "Still Thinking",
      user_name: "John Doe",
    };
  },
});

// BOTTOM NAV
var bottomNav = new Vue({
  el: "#bottom-nav",
  vuetify: new Vuetify(),
  data: function () {
    return {};
  },
});

// NEW POST
var newPostContent = new Vue({
  el: "#new-post-content",
  vuetify: new Vuetify(),
  data: function () {
    return {
      drawer: false,
      group: null,
      header_title: "Still Thinking",
    };
  },
});

// POST STYLE
var postStyle = new Vue({
  el: "#post-style",
  vuetify: new Vuetify(),
  data: function () {
    return {
      text: {
        card_user: "random_user",
        card_caption: "Heres my generic caption",
        card_caption_two:
          "This is a post about some random shower thought I had... Testing out how longer post look... hopefully this is a couple lines",
        status: "unliked",
      },
      comments: {
        user_comments: "",
        random_comments: "This is a random comment",
      },
    };
  },
});

// PERSONAL PROFILE
var personalProfileTop = new Vue({
  el: "#personal-profile-top",
  vuetify: new Vuetify(),
  data: function () {
    return {
      profile: {
        user: "random user",
        user_bio: "Heres my generic caption",
      },
    };
  },
});
