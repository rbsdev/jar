var orderBy = function(obj, callback, context) {
  var tuples = [];

  for (var key in obj) {
    if(obj.hasOwnProperty(key)) {
      tuples.push([key, obj[key]]);
    }
  }

  tuples.sort(function(a, b) { return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0; });

  var length = tuples.length;
  while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
};

var DB = {
  users: new window.Firebase('https://ss15-verage.firebaseio.com/users/'),

  save: function(username, time) {
    this.users.child(username).set(time);
  },

  all: function(callback) {
    var getUsers = function(result) {
      var users = [];

      orderBy(result.val(), function(key, value) {        
        var user = {key: value};
        users.push(user);
      });

      callback(users.reverse());
    };

    this.users.on('value', getUsers);
  }
};

module.exports = DB;
