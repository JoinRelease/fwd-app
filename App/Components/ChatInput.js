var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var TextInput   = require('../Components/TextInput');
var Button      = require('../Components/Button');
var PostActions = require('../Actions/PostActions');
var AppActions  = require('../Actions/AppActions');

var KeyboardListener = require('../Mixins/KeyboardListener');

var ChatInput = React.createClass({
  mixins: [KeyboardListener],

  getInitialState: function() {
    return {
      content: ''
    };
  },

  onSubmitButton: function() {
    ChatActions.createMessage(this.state.content, function(error) {
      if (error) {
        // TODO: better error handling
        alert(error.message);
      }
      else {
        AppActions.goBack(this.props.navigator);
      }
    }.bind(this));
  },

  render: function() {
    return (
      <View>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput ref="content"
            placeholder={"What do you have to say for yourself?"}
            keyboardType="default"
            multiline={true}
            clearTextOnFocus={true}
            autoGrow={true}
            autoFocus={false}
            style={styles.input}
            enablesReturnKeyAutomatically={true}
            returnKeyType='send'
            onChange={(event) => this.state.content = event.nativeEvent.text }
            />
          </View>
          <View style={styles.inputButton} />
          <Button type='blue' style={styles.button} onPress={this.onSubmitButton}>
            send
          </Button>
        </View>
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>    );
  }
});

var styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
  },
  inputButton: {

  },
  button: {
  },
  footer: {
    padding: 10,
    flexDirection: 'row'
  }
});

module.exports = ChatInput;
