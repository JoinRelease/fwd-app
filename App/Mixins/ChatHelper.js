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
var SegmentedControl    = require('../Components/SegmentedControl');
var SimpleList       = require('../Components/SimpleList');
var AppActions       = require('../Actions/AppActions')

var ChatHelper = {
  mixins: [NavigationListener, NavBarHelper],

  getInitialState: function() {
    return this.getListState();
  },

  getListState: function() {
    var week = (typeof this.getDefaultWeek == 'function') ? this.getDefaultWeek() : null;
    return {
      items: this.getListItems(),
      week: week
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
    };
    // if (this.props.navBarHidden) {
    //   AppActions.hideNavBar();
    // };
  },

  componentWillUnmount: function() {
    this.props.store.removeChangeListener(this.onListChange);
  },

  getNavBarState: function() {
    var title = this.props.navBarTitle ? this.props.navBarTitle : "Forward";
    return { title: title };
  },

  getUsername: function() {
    if (!this.username) {
      this.username = this.props.username || CurrentUserStore.get().data.username;
    }
    return this.username;
  },


  sortItems: function() {
    if (this.state.week) {
      items = this.state.items;
      day = this.state.day
      // todo: sort items by day of week
    }
    return this.state.items
  },


  renderItems: function() {
    return (
      <SimpleList
        style={styles.flex}
        currentRoute={this.props.currentRoute}
        getItemProps={this.getItemProps}
        items={this.sortItems()}
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
    if (this.props.segment) {
      return (
        <SegmentedControl currentRoute={this.props.currentRoute} {...this.props.segment} />
      );
    }
    else if(this.state.week) {
      return (
        <WeekView currentRoute={this.props.currentRoute} {...this.state.week} updateDay={this.updateDay} />
      );
    }
  },

  renderTabs: function(content) {
    if (!this.props.tabItem) return null;
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
    var header = this.renderHeader();
    return (
      <View style={styles.flex}>
        {content}
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

module.exports = ChatHelper;
