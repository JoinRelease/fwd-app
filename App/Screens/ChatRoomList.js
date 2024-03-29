var React = require('react-native');

var ListHelper = require('../Mixins/ListHelper');


var ChatListStore = require('../Stores/ChatListStore');


var ChatRoomList = React.createClass({
  mixins: [ListHelper],

  getDefaultProps: function() {
    return {
      store: ChatListStore,
      navBarTitle: 'Messages',
      listProps: {
        nextIcon: true
      },
      tabItem: {
        items: [
          {
            title: 'Logs',
            replacePath: 'logs',
            icon: 'ios-paper'
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
    // TODO: Maybe get rooms w/ notifications from server?
  }
});



module.exports = ChatRoomList;
