qx.Class.define("restcp.service.UsersService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments, "/users");
    this.map("get", { method: "GET", url: "/" });
  },

  members: {
    /**
     * Get all users
     * @return {Promise} Promise that resolves with user data
     */
    getUsers() {
      return this.sendRequest("get");
    }
  }
});
