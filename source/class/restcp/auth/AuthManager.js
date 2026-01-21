qx.Class.define("restcp.auth.AuthManager", {
  extend: qx.core.Object,

  statics: {
    _accessToken: null,
    _refreshToken: null,
    _tokenExpiry: null,
    _keycloakConfig: {
      url: " http://localhost:8080/auth",
      realm: "PlaidCloud",
      clientId: "admin-cli"
    },

    setTokens(accessToken, refreshToken, expiresIn) {
      this._accessToken = accessToken;
      this._refreshToken = refreshToken;
      this._tokenExpiry = Math.floor(Date.now() / 1000) + expiresIn;
    },

    getAccessToken() {
      if (!this._accessToken) return null;

      const now = Math.floor(Date.now() / 1000);
      if (this._tokenExpiry - now < 30) {
        return this.refreshToken();
      }
      return this._accessToken;
    },

    attachAuthHeader(req) {
      const token = this.getAccessToken();
      if (token instanceof Promise) {
        return token.then(t => t && req.setRequestHeader("Authorization", "Bearer " + t));
      } else if (token) {
        req.setRequestHeader("Authorization", "Bearer " + token);
      }
    },

    async refreshToken() {
      if (!this._refreshToken) return null;

      const req = new qx.io.request.Xhr(
        `${this._keycloakConfig.url}/realms/${this._keycloakConfig.realm}/protocol/openid-connect/token`,
        "POST"
      );
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      const body = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: this._keycloakConfig.clientId,
        refresh_token: this._refreshToken
      }).toString();

      req.setRequestData(body);

      return new Promise((resolve, reject) => {
        req.addListener("success", e => {
          const resp = JSON.parse(req.getResponseText());
          this.setTokens(resp.access_token, resp.refresh_token, resp.expires_in);
          resolve(resp.access_token);
        });
        req.addListener("fail", e => {
          this.clearTokens();
          reject("Token refresh failed");
        });
        req.send();
      });
    },

    clearTokens() {
      this._accessToken = null;
      this._refreshToken = null;
      this._tokenExpiry = null;
    },

    handleRedirect() {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = parseInt(params.get("expires_in")) || 3600;
      if (token && refreshToken) {
        this.setTokens(token, refreshToken, expiresIn);
        window.location.hash = ""; // clean URL
      }
    },

    login() {
      debugger
      const redirectUri = window.location.origin + window.location.pathname;
      const { url, realm, clientId } = this._keycloakConfig;
      const keycloakUrl = `${url}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token`;
      window.location.href = keycloakUrl;
    }
  }
});
