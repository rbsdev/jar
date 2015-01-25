var DB = {
  users: new Firebase('https://ss15-verage.firebaseio.com/users/'),
  save: function(username, time) {
    this.users.child(username).set(time);
  }
};

module.exports = DB;
