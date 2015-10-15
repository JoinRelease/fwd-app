var React  = require('react-native');
var {
  ListView
} = React;

var RefreshableListView = require('react-native-refreshable-listview');

var SimpleListItem = require('../Components/SimpleListItem')
var ActivityItem = require('../Components/ActivityItem');
var FoodItem = require('../Components/FoodItem');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


var SimpleList = React.createClass({
  renderRow: function(item, sectionId, rowId) {
    var passAlong = {};
    if (this.props.currentRoute) passAlong.currentRoute = this.props.currentRoute;
    if (this.props.navigator)    passAlong.navigator    = this.props.navigator;
    if (this.props.nextIcon)     passAlong.nextIcon     = this.props.nextIcon;
    if (this.props.noTap)        passAlong.noTap        = this.props.noTap;

    if (this.props.getItemProps) {
      // swtich it out
      item = this.props.getItemProps(item);
    }

    var ListItem;
    if (item.type === 'activity') ListItem = ActivityItem;
    else if (item.type === 'food') ListItem = FoodItem;
    else ListItem = SimpleListItem;

    return (
      <ListItem {...passAlong} {...item} key={"item" + (item.key || rowId)} />
    );
  },

  onPress: function() {
    this.props.hideNavBar()
  },

  render: function() {
    var Component = this.props.reloadList ? RefreshableListView : ListView;
    return (
      <Component
        automaticallyAdjustContentInsets={true}
        dataSource={ds.cloneWithRows(this.props.items)}
        renderRow={this.renderRow}
        loadData={this.props.reloadList}
        refreshDescription="Working Some Magic"
      />
    );
  }
});

module.exports = SimpleList;
