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

      if (restcp.Constants.USE_MOCKS) {
        fetch("./organizationsResponse.json").then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }).then(organizations => {
          this._createOrganizationTable(organizations);
        }).catch(error => {
          console.error("Failed to load organizations:", error);
        });
      } else {
        // Load the json from a file
        const organizationService = new restcp.service.OrganizationService();
        organizationService.getAllOrgs().then(organizations => {
          this._createOrganizationTable(organizations);
        }).catch(error => {
          console.error("Failed to load organizations:", error);
        });
      }
    },

    _createOrganizationTable(organizations) {
      // Create table model
      const tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([
        "Name",
        "ID",
        "Memo",
        "Plan",
        "Billing Cycle",
        "Active",
        "Updated By",
        "Updated Date",
        ""
        // "Delete"
      ]);

      // Populate table data
      const tableData = organizations.map(org => [
        org.name,
        org.id,
        org.memo,
        org.plan || "",
        org.billing_cycle || "",
        org.is_active ? "Yes" : "No",
        org.updated_by || "",
        org.updated_date ? new Date(org.updated_date).toLocaleDateString() : "",
        "../cprest/resource/fugue/icons/pencil.png"
      ]);
      tableModel.setData(tableData);

      // Create table
      const table = new qx.ui.table.Table(tableModel);
      table.set({
        decorator: "main",
        statusBarVisible: false
      });

      // Configure column widths
      const tcm = table.getTableColumnModel();
      tcm.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
      tcm.setColumnWidth(0, 200); // Name
      tcm.setColumnVisible(1, false); // ID
      tcm.setColumnWidth(2, 200); // Memo
      tcm.setColumnWidth(3, 100); // Plan
      tcm.setColumnWidth(4, 90); // Billing Cycle
      tcm.setColumnWidth(5, 40); // Active
      tcm.setColumnWidth(6, 150); // Updated By
      tcm.setColumnWidth(7, 120); // Updated Date
      tcm.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Image());
      tcm.setColumnWidth(8, 30); // Edit
      //tcm.setColumnWidth(9, 30); // Delete


      // Add table to document
      const doc = this.getRoot();
      doc.add(table, { left: 0, top: 0, right: 0, bottom: 0 });
    }
  }
});
