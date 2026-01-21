qx.Class.define("restcp.Application", {
  extend: qx.application.Standalone,

  members: {
    main() {
      this.base(arguments);

      // Handle Keycloak redirect tokens
      restcp.auth.AuthManager.handleRedirect();

      // If no token, login
      if (!restcp.auth.AuthManager.getAccessToken()) {
        restcp.auth.AuthManager.login();
        return;
      }

      // Load user list
      const userService = new restcp.service.UserService();
      userService.sendRequest("getAll")
        .then(users => console.log("Users:", users))
        .catch(err => console.error("Error fetching users:", err));
    }
  }
});
