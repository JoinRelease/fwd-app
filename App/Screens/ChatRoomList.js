var React = require('react-native');

var ListHelper = require('../Mixins/ListHelper');

var FollowListStore = require('../Stores/FollowListStore');
var ChatListStore = require('../Stores/ChatListStore')
var FollowActions   = require('../Actions/FollowActions');

var FollowList = React.createClass({
  mixins: [ListHelper],

  getDefaultProps: function() {
    return {
      store: FollowListStore,
      navBarTitle: 'Messages',
      listProps: {
        nextIcon: true
      },
      tabItem: {
        items: [
          {
            title: 'Logs',
            replacePath: 'posts',
            icon: 'ios-paper'
          },
          {
            title: 'Follows',
            replacePath: 'follows',
            icon: 'person'
          },
          {
            title: 'Messages',
            replacePath: 'chatRoomList',
            selected: true,
            icon: 'chatboxes'
          }
        ]
      },
    };
  },

  getListItems: function() {
    return (
      [
      {
        data: {
          id: 1,
          name: 'Nutrition Team',
          replacePath: '_nutrition'
        }
      },
      {
        data: {
          id: 2,
          name: 'Cooking Hotline',
          replacePath: '_cooking'
        }
      },
      {
        data: {
          id: 3,
          name: 'Activity Team',
          replacePath: '_activity'
        }
      }
      ]);
  },

  isListChange: function(username) {
    return this.getUsername() == username;
  },

  getItemProps: function(room) {
    return {
      key: room.data.id,
      title: room.data.name,
      subPath: room.data.replacePath
    }
  },

  reloadList: function() {
    console.log("reloading follows: " + this.getUsername());
    FollowActions.fetchList(this.getUsername(), function(error) {
      // TODO: handle error
      if (error) {
        alert(error.message);
      }
    });
  }
});



module.exports = FollowList;
