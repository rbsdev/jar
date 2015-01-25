var DB = {
  save: function(username, time) {
    var users = new Firebase('https://ss15-verage.firebaseio.com/users/');
    var params = {};
    params[username] = time;

    users.set(params);
  }
};

module.exports = DB;
