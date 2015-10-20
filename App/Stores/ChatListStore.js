var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ChatMessage     = require('../Models/ChatMessage');
var Dispatcher   = require('../Dispatcher');
var AppConstants = require('../Constants/AppConstants');

var CHANGE_EVENT = 'change';

// TODO: Immutable?
var _hash = {};

function setList(key, list) {
  var models = [];
  for(var i in list) {
    var model = new ChatMessage(list[i]);
    models.push(model);
  }
  _hash[key] = models;
}

var ModelStore = assign({}, EventEmitter.prototype, {
  get: function(key) {
    return _hash[key];
  },

  emitChange: function(key) {
    this.emit(CHANGE_EVENT, key);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case AppConstants.CHAT_LIST_UPDATED:
      setList(action.listProps.room_id, action.listProps.messages);
      ModelStore.emitChange(action.listProps.room_id);
      break;
    // TODO: save
    default:
      // no op
  }
});

module.exports = ModelStore;
