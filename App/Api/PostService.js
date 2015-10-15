var client = require('../Api/HTTPClient')

var PostService = {
  parseFoodLog: function(response) {
    if (!response) return null;

    return {
      id: response.id,
      type_of_log: response.type_of_log,
      user_id: response.user_id,
      time: response.time,
      description: response.description,
      heart: response.heart,
      created_at: response.created_at,
      updated_at: response.updated_at

    };
  },
  parseActivityLog: function(response) {
    if (!response) return null;

    return {
      id: response.id,
      type_of_log: response.type_of_log,
      user_id: response.user_id,
      time: response.time,
      name: response.name,
      intensity: response.intensity,
      notes: response.notes,
      heart: response.heart,
      created_at: response.created_at,
      updated_at: response.updated_at

    };
  },

  parseLogs: function(response, username) {
    if (!response) return null;

    var out = {posts: []};
    for(var i in response) {
      var paresed_post;
      if (response[i].type_of_log == 'activity')
        parsed_post = PostService.parseActivityLog(response[i]);
      else if (response[i].type_of_log == 'food')
        parsed_post = PostService.parseFoodLog(response[i]);

      out.posts.push(parsed_post);
    }
    out.username = username;
    return out;
  },

  fetchList: function(username, callback) {
    client.get("/logs", {}, function(error, response) {
      var listProps = PostService.parseLogs(response, username);
      callback(error, listProps);
    });
  },

  createFoodPost: function(content, callback) {
    client.post("/food_logs", {content: content}, function(error, response) {
      var postProps = PostService.parseFoodLog(response);
      callback(error, postProps);
    });
  },
  createActivityPost: function(content, callback) {
    client.post("/activity_logs", {content: content}, function(error, response) {
      var postProps = PostService.parseActivityLog(response);
      callback(error, postProps);
    });
  },

};

module.exports = PostService;
