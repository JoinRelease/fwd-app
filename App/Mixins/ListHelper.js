// helper to handle showing lists of things
// parent must implement methods
// required: getListItem, getItemProps
// optional: isListChange, reloadList
//
// and give props
// required: store, currentRoute
// optional: listProps, segment

var React = require('react-native');
var {
  View,
  StyleSheet,
  ListView
} = React;

var CurrentUserStore   = require('../Stores/CurrentUserStore');
var NavigationListener = require('../Mixins/NavigationListener');
var NavBarHelper       = require('../Mixins/NavBarHelper');

var Loading          = require('../Screens/Loading');
var Text             = require('../Components/Text');
var WeekView         = require('../Components/WeekView');
var TabbedControl    = require('../Components/TabbedControl');
var SimpleList       = require('../Components/SimpleList');

var ListHelper = {
  mixins: [NavigationListener, NavBarHelper],

  getInitialState: function() {
    return this.getListState();
  },

  getListState: function() {
    return {
      items: this.getListItems()
    };
  },

  onListChange: function(arg) {
    if (!this.isListChange || this.isListChange(arg)) {
      this.setState(this.getListState());
    }
  },

  onDidFocusNavigation: function() {
    // items may have changed
    this.setState(this.getListState());
  },

  componentDidMount: function() {
    this.props.store.addChangeListener(this.onListChange);
    if (this.reloadList) {
      this.reloadList();
    }
  },

  componentWillUnmount: function() {
    this.props.store.removeChangeListener(this.onListChange);
  },

  getNavBarState: function() {
    var title = this.props.username ? this.props.username : "Dashboard";
    return { title: title };
  },

  getUsername: function() {
    if (!this.username) {
      this.username = this.props.username || CurrentUserStore.get().data.username;
    }
    return this.username;
  },

  renderItems: function() {
    return (
      <SimpleList
        style={styles.flex}
        currentRoute={this.props.currentRoute}
        getItemProps={this.getItemProps}
        items={this.state.items}
        reloadList={this.reloadList}
        {...this.props.listProps}
      />
    );
  },

  renderEmpty: function() {
    return(
      <View style={styles.container} >
        <Text style={styles.description}>
          No Content
        </Text>
      </View>
    );
  },

  renderHeader: function() {
    if (!this.props.segment) return null;
    return (
      <WeekView currentRoute={this.props.currentRoute} {...this.props.segment} />
    );
  },

  renderTabs: function(content) {
    return (
      <TabbedControl currentRoute={this.props.currentRoute} {...this.props.tabItem} content={content}/>
    );
  },

  renderContent: function() {
    var header = this.renderHeader();

    var content;
    var empty;
    if (this.state.items.length === 0) {
      content = this.renderEmpty();
    }
    else {
      content = this.renderItems();
    }
    var tabs = this.renderTabs(content);
    return (
      <View style={styles.flex}>

        {tabs}

      </View>
    );
  },

  render: function() {
    if (!this.state.items) {
      // TODO: load error?
      return <Loading />;
    }
    else {
      return this.renderContent();
    }
  }
};

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123456',
  }
});

module.exports = ListHelper;
