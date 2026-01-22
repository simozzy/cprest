
qx.Class.define("restcp.service.OrgAuthService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments);
    this.setBaseUrl(restcp.Constants.URLS.CONTROL_PLANE + "/org_authorizations");

    // Map routes - these create methods on the resource
    this.map("getAll", "GET", "/");
    this.map("update", "PUT", "/");
    this.map("create", "POST", "/");
    this.map("delete", "DELETE", "/");
    this.map("get", "GET", "/{id}");
  },

  members: {
    /**
     * Get all organization authorizations
     * @return {Promise} Promise that authorization data
     */
    getAllOrgAuths() {
      return this.sendRequest("getAll");
    },

    /**
     * Create a new organization authorization
     * @param {Object} data - authorization data
     * @return {Promise} Promise that resolves with created authorization
     */
    createOrgAuth(data) {
      return this.sendRequest("create", null, data);
    },

    /**
     * Update organization authorization
     * @param {Object} data - Updated authorization data
     * @return {Promise} Promise that resolves with updated authorization
     */
    updateOrgAuth(data) {
      return this.sendRequest("update", null, data);
    },

    /**
     * Delete organization authorization
     * @return {Promise} Promise that resolves when deletion is complete
     */
    deleteOrgAuth() {
      return this.sendRequest("delete");
    },

    /**
     * Get all organization authorizations for a specific organization
     * @param {String} id - Organization ID
     * @return {Promise} Promise that authorization data
     */
    getOrgAuth(id) {
        return this.sendRequest("get", { id: id });
    }
  }
});
