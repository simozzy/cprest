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

      // Load workspaces
      const workspaceService = new restcp.service.WorkspaceService();
      workspaceService.getAllWorkspaces()
        .then(workspaces => {
          window.alert(JSON.stringify(workspaces));
        }).catch(err => {
          window.alert("Error:" + JSON.stringify(err));
        });
    }
  }
});
