var React = require('react-native');
var {
  View,
  StyleSheet
} = React;

var TextInput   = require('../Components/TextInput');
var Button      = require('../Components/Button');
var ChatActions = require('../Actions/ChatActions');
var AppActions  = require('../Actions/AppActions');
var CurrentUserStore = require('../Stores/CurrentUserStore');

var KeyboardListener = require('../Mixins/KeyboardListener');

var ChatInput = React.createClass({
  mixins: [KeyboardListener],

  getInitialState: function() {
    return this.blankContent();
  },

  blankContent: function() {
    return {
      content: {
        body: '',
        user_id: CurrentUserStore.get().data.id,
        room_id: this.props.roomId,
        answered: false,
        submitting: false,
      }
    };
  },

  updateText: function(text) {
    this.setState({content: {
      body: text,
      user_id: this.state.content.user_id,
      room_id: this.state.content.room_id,
      answered: this.state.content.answered
    }});
  },
  clearText: function() {
    this.setState(this.blankContent);
  },

  toggleSubmitting: function() {
    this.setState({submitting: (!this.state.submitting)})
  },

  onSubmitButton: function() {
    if (!this.state.submitting) {
      this.props.toggleSubmitting();
      this.toggleSubmitting();
      ChatActions.createMessage(this.state.content, function(error) {
        if (error) {
          // TODO: better error handling
          alert(error.message);
        }
        else {
          this.props.messageAdded();
          this.clearText();
          this.toggleSubmitting();
          this.props.toggleSubmitting();
        }
      }.bind(this));
    };
  },

  render: function() {
    return (
      <View>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput ref="message"
            placeholder={"Add a Message..."}
            keyboardType="default"
            multiline={true}
            clearTextOnFocus={true}
            autoGrow={true}
            autoFocus={false}
            style={styles.input}
            enablesReturnKeyAutomatically={true}
            returnKeyType={'send'}
            onChangeText={this.updateText}
            value={this.state.content.body}
            />
          </View>
          <View style={[styles.inputButton]} />
          <Button type='blue' style={styles.button} disabled={this.state.submitting} onPress={this.onSubmitButton}>
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
    fontSize: 14,
    height: 50,
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
