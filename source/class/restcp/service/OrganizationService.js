
qx.Class.define("restcp.service.OrganizationService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments);
    this.setBaseUrl(restcp.Constants.URLS.CONTROL_PLANE + "/organizations");

    // Map routes - these create methods on the resource
    this.map("getAll", "GET", "/");
    this.map("getOne", "GET", "/{id}");
    this.map("create", "POST", "/");
    this.map("update", "PUT", "/{id}");
    this.map("delete", "DELETE", "/{id}");
    this.map("createInvite", "POST", "/{id}/invite");
    this.map("getInvites", "GET", "/{id}/invite");
    this.map("deleteInvite", "GET", "/{id}/invite{inviteId}");
    this.map("acceptInvite", "POST", "/{id}/invite{inviteId}");
  },

  members: {
    /**
     * Get all organizations
     * @return {Promise} Promise that resolves with organization list
     */
    getAllOrgs() {
      return this.sendRequest("getAll");
    },

    /**
     * Get a specific organization by ID
     * @param {String} id - Organization ID
     * @return {Promise} Promise that resolves with organization data
     */
    getOrg(id) {
      return this.sendRequest("getOne", { id: id });
    },

    /**
     * Create a new organization
     * @param {Object} data - Organization data
     * @return {Promise} Promise that resolves with created organization
     */
    createOrg(data) {
      return this.sendRequest("create", null, data);
    },

    /**
     * Update an existing organization
     * @param {String} id - Organization ID
     * @param {Object} data - Updated workspace data
     * @return {Promise} Promise that resolves with updated organization
     */
    updateOrg(id, data) {
      return this.sendRequest("update", { id: id }, data);
    },

    /**
     * Delete a organization
     * @param {String} id - Organization ID
     * @return {Promise} Promise that resolves when deletion is complete
     */
    deleteOrg(id) {
      return this.sendRequest("delete", { id: id });
    },

    /**
     * Create an invite
     * @param {String} id - Organization ID, 
     * @param {Object} data - will conatain a CreateInvitation
     * @return {Promise} Promise that resolves when invitation is created
     */
    async createOrgInvite(id, data) {
        return this.sendRequest("createInvite", { id: id }, data);
    },

    /**
     * Retrieve all invites for a specific organization
     * @param {String} id - Organization ID
     * @returns {Object} Promise that resolves with an array of Invitation objects
     */
    async getOrgInvites(id) {
        return this.sendRequest("getInvites", { id: id });
    },

    /**
     * Deletes a specific invite from a specific organization
     * @param {String} id - Organization ID
     * @param {String} inviteId - Invite ID
     * @returns {Object} Promise that resolves when invitation is deleted
     */
    async deleteOrgInvite(id, inviteId) {
        return this.sendRequest("deleteInvite", { id: id, inviteId: inviteId });
    },

    /**
     * Accept a specific invite from a specific organization
     * @param {String} id - Organization ID
     * @param {String} inviteId - Invite ID
     * @returns {Object} Promise that resolves when invitation is accepted
     */
    async acceptOrgInvite(id, inviteId) {
        return this.sendRequest("deleteInvite", { id: id, inviteId: inviteId });
    }
  }
});
