var React  = require('react-native');
var {
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} = React;

var cssVar = require('../Lib/cssVar');


var Text       = require('../Components/Text');
var AppActions = require('../Actions/AppActions');

var SimpleListItem = React.createClass({

  onSelection: function() {
    AppActions.launchRelativeItem(this.props.currentRoute, this.props);
  },

  capitalize: function(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  },

  parseTime: function(time) {
    date = new Date(time);
    hours = date.getHours();
    minutes = date.getMinutes();
    var suffix = hours >= 12 ? "PM":"AM";
    hours = ((hours + 11) % 12 + 1);
    return  hours + ':' + minutes + ' ' + suffix;
  },

  renderHeader: function() {
    var type = this.props.type
    if (!type) return null;
    type = this.capitalize(type);

    time = this.parseTime(this.props.time);

    return (
      <View style={[styles.inline, styles.underline]}>
        <Text style={[styles.type, styles.left]}>
          {type}
        </Text>
        <Text style={[styles.time, styles.right]}>
          {time}
        </Text>
      </View>
    );
  },

  renderImage: function() {
    //if (!this.props.subtitle) return null;
    // TODO: set defaultSource {uri: string} (local file to display in meantime)
    return (
      <View style={styles.imageContainer}>
      <View style={{flexDirection: 'row'}}>
      <Image style={styles.image}
                source = {{uri: 'http://media.tumblr.com/tumblr_m6cqzd18ow1qm4rc3.jpg'}} />
      </View>
      </View>
    );
  },

  renderRightIcon: function() {
    if (!this.props.nextIcon) return null;

    // caret-right-semi
    return (
      <Text style={styles.rightIcon}>
        >
      </Text>
    );
  },

  renderContent: function() {
    return (
      <View style={[styles.row, this.props.noTap && styles.touch]}>
        <View style={styles.left}>
          {this.renderHeader()}
          {this.renderImage()}
        </View>
        <View style={styles.right}>
          {this.renderRightIcon()}
        </View>
      </View>
    );
  },

  render: function() {
    if (this.props.noTap) {
      return this.renderContent();
    }

    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  touch: {
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding:20,
  },
  inline: {
    flexDirection: 'row',
  },
  type: {
    fontSize: 14,
    fontWeight: '800',
  },
  time: {
    color: cssVar('gray30'),
    fontSize: 14,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  subtitle: {
    paddingTop: 5,
    fontSize: 14,
    color: cssVar('gray20'),
  },
  left: {
    flex: 1,
  },
  right: {

  },
  spacer: {
    flex: 1
  },
  image: {
    width: 335,
    height: 335
  },
  underline: {
    borderBottomWidth: 0.5,
    borderBottomColor: cssVar('gray10'),
  },
  imageContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  rightIcon: {
    fontFamily: cssVar('fontIcon'),
    color: cssVar('gray30'),
    fontSize: 12,
  }
});

module.exports = SimpleListItem;
