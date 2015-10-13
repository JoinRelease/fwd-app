var client = require('../Api/HTTPClient')

var UserService = {

  parseAccount: function(response) {
    if (!response) return null;
    var data = {};
    data.token = response.auth_token;
    data.userProps = {
      id: response.id,
      username: response.email,
      created_at: response.created_at,
      updated_at: response.updated_at
    };
    return data;
  },

  accountCallback: function(callback) {
    return function(error, response) {
      var data = UserService.parseAccount(response);
      callback(error, data);
    };
  },

  signup: function(username, password, password_confirm, callback) {
    client.post("signup", {email: username, password: password, password_confirm: password_confirm}, UserService.accountCallback(callback));
  },

  login: function(username, password, callback) {
    client.post("login", {email: username, password: password}, UserService.accountCallback(callback));
  }
};

module.exports = UserService;
