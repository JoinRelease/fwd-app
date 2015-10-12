var React = require('react-native');

var ListHelper = require('../Mixins/ListHelper');

var PostListStore = require('../Stores/PostListStore');
var PostActions   = require('../Actions/PostActions');


var PostList = React.createClass({
  mixins: [ListHelper],

  getDefaultWeek: function() {
    var date = new Date();
    var today = date.getDay();

    return {
        items: [
          {
            title: 'Sun',
            selected: today === 0
          },
          {
            title: 'Mon',
            selected: today === 1
          },
          {
            title: 'Tue',
            selected: today === 2
          },
          {
            title: 'Wed',
            selected: today === 3
          },
          {
            title: 'Thu',
            selected: today === 4
          },
          {
            title: 'Fri',
            selected: today === 5
          },
          {
            title: 'Sat',
            selected: today === 6
          }
        ],
        day: today
    }

  },

  getDefaultProps: function() {

    return {
      store: PostListStore,
      //navBarHidden: true,
      listProps: {
        noTap: true
      },
      tabItem: {
        items: [
          {
            title: 'Posts',
            replacePath: 'posts',
            selected: true,
            icon: 'ios-paper'
          },
          {
            title: 'Follows',
            replacePath: 'follows',
            icon: 'person'
          },
          {
            title: 'Chat',
            replacePath: 'chatRoomList',
            icon: 'chatboxes'
          }

        ]
      },
    };
  },

updateDay: function(day) {
  var weekdays = {
    "Sun": 0,
    "Mon": 1,
    "Tue": 2,
    "Wed": 3,
    "Thu": 4,
    "Fri": 5,
    "Sat": 6
  };
  var today = weekdays[day];
    this.setState({
      week: {
        items: [
          {
            title: 'Sun',
            selected: day === 'Sun'
          },
          {
            title: 'Mon',
            selected: day === 'Mon'
          },
          {
            title: 'Tue',
            selected: day === 'Tue'
          },
          {
            title: 'Wed',
            selected: day === 'Wed'
          },
          {
            title: 'Thu',
            selected: day === 'Thu'
          },
          {
            title: 'Fri',
            selected: day === 'Fri'
          },
          {
            title: 'Sat',
            selected: day === 'Sat'
          }
        ],
        day: today
      }
    });
  },

  getListDay: function() {
    console.log(this.state);
    var wkitems = this.state.week.items;
      for (var i in wkitems){
        if (wkitems[i].selected) return wkitems[i].title;
    }
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
