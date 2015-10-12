var assign = require('../Lib/assignDefined');

var Model = function(options) {
  this.data = {};
  this.setAttributes(options);
};

Model.prototype.setAttributes = function(options) {
  options = (options || {});
  assign(this.data, {
    id: options.id,
    content: options.content,
    username: options.username,
    created_at: options.created_at,
    updated_at: options.updated_at
  });
};

module.exports = Model;
