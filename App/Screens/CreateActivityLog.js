var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var TextInput   = require('../Components/TextInput');
var Text = require('../Components/Text');
var Button      = require('../Components/Button');
var PostActions = require('../Actions/PostActions');
var AppActions  = require('../Actions/AppActions');
var ScrollSelect = require('../Components/ScrollSelect');
var TimeInput = require('../Components/TimeInput');
var NavBarHelper = require('../Mixins/NavBarHelper');

var KeyboardListener = require('../Mixins/KeyboardListener');

var CreateActivityLog = React.createClass({
  mixins: [KeyboardListener, NavBarHelper],

  getInitialState: function() {
    console.log(this.props);
    return {
      time: new Date(),
      name: '',
      intensity: '',
      duration: 0,
      notes: '',
      editingDuration: false,
      activity: {
        items: [
         {
            label: 'Running',
            selected: false
          },
          {
            label: 'Biking',
            selected: false
          },
          {
            label: 'Walking',
            selected: false
          },
          {
            label: 'Hiking',
            selected: false
          }
        ]
      }
    };
  },

  onButtonSelect: function(label) {
    this.setState({
      activity: {
        items: [
          {
            label: 'Running',
            selected: label === 'Running'
          },
          {
            label: 'Biking',
            selected: label === 'Biking'
          },
          {
            label: 'Walking',
            selected: label === 'Walking'
          },
          {
            label: 'Hiking',
            selected: label === 'Hiking'
          }
        ]
      }
    });
  },
  getNavBarState: function() {
    var title = this.state.loading ? 'Sending...' : 'Create Activity Log';
    return { title: title };
  },

  onSubmitButton: function() {
    PostActions.createActivityLog({
      time: this.state.time.toISOString(),
      name: this.state.name,
      intensity: this.state.intensity,
      notes: this.state.notes,
      duration: this.state.duration

    }, function(error) {
      if (error) {
        // TODO: better error handling
        alert(error.message);
      }
      else {
        AppActions.goBack(this.props.navigator);
      }
    }.bind(this));
  },

  toggleDurationEdit: function() {
    this.setState({editingDuration: !this.state.editingDuration})
  },

  changeDuration: function(duration) {
    this.setState({duration: duration});
  },

  render: function() {
    var durationEdit;
    if (this.state.editingDuration) {
      durationEdit = (
        <TextInput
          clearTextOnFocus={false}
          onSubmitEditing={this.toggleDurationEdit}
          onBlur={this.toggleDurationEdit}
          onChangeText={this.changeDuration}
          keyboardType={'numeric'}
          style={[styles.right, styles.durationEdit]}
          value={this.state.duration.toString()}
        />
      )
    }
    else {
      durationEdit = (
        <Text style={[styles.right, styles.durationLabel]} onPress={this.toggleDurationEdit}>
          {this.state.duration} mins.
        </Text>
      )
    }
    return (
      <View style={styles.flex}>
        <ScrollSelect currentRoute={this.props.currentRoute} {...this.state.activity} onButtonSelect={this.onButtonSelect} />
        <View style={styles.duration} >
          <Text style={[styles.durationLabel, styles.left]}> Duration: </Text>
          {durationEdit}
        </View>
        <TextInput ref="content"
          placeholder={"What do you have to say for yourself?"}
          keyboardType="default"
          multiline={true}
          autoFocus={true}
          style={styles.input}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
          onChange={(event) => this.state.notes = event.nativeEvent.text }
        />
        <View style={styles.footer}>
          <View style={styles.flex} />
          <Button type='blue' style={styles.button} onPress={this.onSubmitButton}>
            Submit
          </Button>
        </View>
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    padding: 20
  },
  duration: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  durationLabel: {
    fontSize: 18
  },
  durationEdit: {
    height: 50,
    width: 50,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 18,

  },
  button: {

  },
  left: {
    flex: 1,
  },
  right: {

  },
  footer: {
    padding: 10,
    flexDirection: 'row'
  }
});

module.exports = CreateActivityLog;
