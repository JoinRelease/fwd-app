var React = require('react-native');

var ChatHelper = require('../Mixins/ChatHelper');

var PostListStore = require('../Stores/PostListStore');
var PostActions   = require('../Actions/PostActions');


var PostList = React.createClass({

  mixins: [ChatHelper],

  getDefaultProps: function() {

    return {
      store: PostListStore,
      //navBarHidden: true,
      listProps: {
        noTap: true
      }
    };
  },
  getListItems: function() {
    return PostListStore.get(this.getUsername());
    // var day = this.getListDay();
    // PostListStore.get_sorted(this.getUsername(), day);
  },

  isListChange: function(username) {
    return this.getUsername() == username;
  },

  getItemProps: function(post) {
    return {
      key: post.data.id,
      title: post.data.content
    }
  },

  reloadList: function() {
    console.log("reloading posts: " + this.getUsername());
    PostActions.fetchList(this.getUsername(), function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  }
});



module.exports = PostList;
