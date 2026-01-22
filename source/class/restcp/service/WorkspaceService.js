qx.Class.define("restcp.service.WorkspaceService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments);
    this.setBaseUrl("http://localhost:8001/control-plane/workspaces");

    // Map routes - these create methods on the resource
    this.map("getAll", "GET", "/");
    this.map("getOne", "GET", "/{id}");
    this.map("create", "POST", "/");
    this.map("update", "PUT", "/{id}");
    this.map("delete", "DELETE", "/{id}");
  },

  members: {
    /**
     * Get all workspaces
     * @return {Promise} Promise that resolves with workspace list
     */
    getAllWorkspaces() {
      return this.sendRequest("getAll");
    },

    /**
     * Get a specific workspace by ID
     * @param {String} id - Workspace ID
     * @return {Promise} Promise that resolves with workspace data
     */
    getWorkspace(id) {
      return this.sendRequest("getOne", { id: id });
    },

    /**
     * Create a new workspace
     * @param {Object} data - Workspace data
     * @return {Promise} Promise that resolves with created workspace
     */
    createWorkspace(data) {
      return this.sendRequest("create", null, data);
    },

    /**
     * Update an existing workspace
     * @param {String} id - Workspace ID
     * @param {Object} data - Updated workspace data
     * @return {Promise} Promise that resolves with updated workspace
     */
    updateWorkspace(id, data) {
      return this.sendRequest("update", { id: id }, data);
    },

    /**
     * Delete a workspace
     * @param {String} id - Workspace ID
     * @return {Promise} Promise that resolves when deletion is complete
     */
    deleteWorkspace(id) {
      return this.sendRequest("delete", { id: id });
    }
  }
});
