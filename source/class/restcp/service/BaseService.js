qx.Class.define("restcp.service.BaseService", {
  extend: qx.io.rest.Resource,

  members: {
    sendRequest(method, params, data) {
      const req = this.map(method).cloneRequest(params, data);

      const tokenPromise = restcp.auth.AuthManager.attachAuthHeader(req);

      const promise = tokenPromise instanceof Promise ? tokenPromise.then(() => this._send(req)) : this._send(req);

      return promise.catch(err => {
        if (err.status === 401) {
          restcp.auth.AuthManager.clearTokens();
          restcp.auth.AuthManager.login(); // redirect to Keycloak
        }
        throw err;
      });
    },

    _send(req) {
      return new Promise((resolve, reject) => {
        req.addListener("success", e => resolve(req.getResponse()));
        req.addListener("fail", e => reject({ status: req.getStatus(), response: req.getResponse() }));
        req.send();
      });
    }
  }
});
