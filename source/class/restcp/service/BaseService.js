qx.Class.define("restcp.service.BaseService", {
  extend: qx.io.rest.Resource,

  construct() {
    this.base(arguments);

    // Configure all requests to include auth header
    this.configureRequest(function(req) {
      const token = restcp.auth.AuthManager.getAccessToken();
      if (token && !(token instanceof Promise)) {
        req.setRequestHeader("Authorization", "Bearer " + token);
      }
    });
  },

  members: {
    async sendRequest(actionName, params, data) {
      // Handle token refresh if needed
      let token = restcp.auth.AuthManager.getAccessToken();
      if (token instanceof Promise) {
        token = await token; // Wait for token refresh to complete
      }

      return new Promise((resolve, reject) => {
        // Get the action
        const action = this[actionName];
        if (!action) {
          throw new Error(`Action '${actionName}' not found on resource`);
        }

        // Listen for completion using action name
        this.addListenerOnce(`${actionName}Success`, e => {
          //const req = e.getData().request;
          resolve(e.getData());
        });

        this.addListenerOnce(`${actionName}Error`, e => {
          const req = e.getRequest();
          const status = req.getStatus();

          if (status === 401) {
            restcp.auth.AuthManager.clearTokens();
            restcp.auth.AuthManager.login();
          }

          reject({
            status: status,
            response: req.getResponse()
          });
        });

        // Invoke the action - returns request ID
        action.call(this, params, data);
      });
    }
  }
});
