
qx.Class.define("restcp.service.WorkspaceService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments);
    this.setBaseUrl(restcp.Constants.URLS.CONTROL_PLANE + "/workspaces");

    // Map routes - these create methods on the resource
    this.map("getAll", "GET", "/");
    this.map("get", "GET", "/{id}");
    this.map("create", "POST", "/");
    this.map("update", "PUT", "/{id}");
    this.map("delete", "DELETE", "/{id}");
  },

  members: {
    /**
     * Get all workspaces
     * @return {Promise} Promise that resolves with workspace list
     */
    getAll() {
      return this.sendRequest("getAll");
    },

    /**
     * Get a specific workspace by ID
     * @param {String} id - Workspace ID
     * @return {Promise} Promise that resolves with workspace data
     */
    get(id) {
      return this.sendRequest("get", { id: id });
    },

    /**
     * Create a new workspace
     * @param {Object} data - Workspace data
     * @return {Promise} Promise that resolves with created workspace
     */
    create(data) {
      return this.sendRequest("create", null, data);
    },

    /**
     * Update an existing workspace
     * @param {String} id - Workspace ID
     * @param {Object} data - Updated workspace data
     * @return {Promise} Promise that resolves with updated workspace
     */
    update(id, data) {
      return this.sendRequest("update", { id: id }, data);
    },

    /**
     * Delete a workspace
     * @param {String} id - Workspace ID
     * @return {Promise} Promise that resolves when deletion is complete
     */
    delete(id) {
      return this.sendRequest("delete", { id: id });
    }
  }
});
