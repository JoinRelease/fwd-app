var Dispatcher   = require('../Dispatcher');
var AppConstants = require('../Constants/AppConstants');
var AuthService  = require('../Api/AuthService');

var AuthActions = {

  authCallback: function(callback) {
    return function(error, data) {
      if(callback) callback(error);

      console.log(data);

      if (!error) {
        Dispatcher.dispatch({
          actionType: AppConstants.LOGIN_USER,
          userProps: data.userProps,
          token: data.token
        });
      }
    };
  },

  submitLogin: function(username, password, callback) {
    AuthService.login(username, password, this.authCallback(callback));
  },

  submitSignup: function(username, password, password_confirm, callback) {
    AuthService.signup(username, password, password_confirm, this.authCallback(callback));
  }
};

module.exports = AuthActions;
