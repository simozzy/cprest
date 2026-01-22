
qx.Class.define("restcp.service.BillingsService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments);
    this.setBaseUrl(restcp.Constants.URLS.CONTROL_PLANE + "/billings");

    // Map routes - these create methods on the resource
    this.map("get", "GET", "/{organizatiopnId}");
  },

  members: {
    /**
     * Get billings for a specific organization by ID
     * @param {String} organizatiopnId - Organization ID
     * @return {Promise} Promise that resolves with organization data
     */
    getBillings(organizatiopnId) {
        return this.sendRequest("get", { organizatiopnId: organizatiopnId });
    }
  }
});
