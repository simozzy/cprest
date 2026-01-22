qx.Class.define("restcp.service.UserService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments, "/user");
    this.map("get", { method: "GET", url: "/{id}" });
  },

  members: {
    /**
     * Get a specific user by ID
     * @param {String} id - User ID
     * @return {Promise} Promise that resolves with user data
     */
    getUser(id) {
      return this.sendRequest("get", { id: id });
    }
  }
});
