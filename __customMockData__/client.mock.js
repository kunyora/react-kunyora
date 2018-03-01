let Client = {
  users: [
    { id: 1, name: "Anifowoshe Gbenga David" },
    { id: 2, name: "Badewa Kayode" }
  ],

  posts: [
    {
      id: 1,
      title: "JavaScript is a great Language"
    },
    { id: 2, title: "ReactJs rocks" }
  ],

  getUsers: function(config) {
    return new Promise(function(resolve, reject) {
      resolve({ success: true, data: Client.users });
    });
  },

  getUser: function(config) {
    let { params: { ID } } = config;
    return new Promise(function(resolve, reject) {
      let _keys = Client.users.map(function({ id }) {
        return id;
      });
      if (_keys.indexOf(parseInt(ID))) {
        resolve({ success: true, data: Client.users[ID - 1] });
      } else {
        reject({
          success: false,
          message: "The Id supplied for users does not exist"
        });
      }
    });
  },

  createUser: function(config) {
    let { data } = config;
    return new Promise(function(resolve, reject) {
      if (data instanceof Array) {
        Client.users.push(data);
        resolve({ success: true, message: "User created successfully", data });
      } else {
        reject({
          success: false,
          message: "You passed in a wrong config object"
        });
      }
    });
  },

  getPosts: function(config) {
    return new Promise(function(resolve, reject) {
      resolve({ success: true, data: Client.posts });
    });
  }
};

module.exports = Client;
