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


      // const organizationService = new restcp.service.OrganizationService();
      // organizationService.getAll().then(organizations => {

      // Load the json from a file
      fetch("./organizationsResponse.json").then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }).then(organizations => {
        // Create table model
        const tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns([
          "Name",
          "ID",
          "Plan",
          "Billing Cycle",
          "Active",
          "Created By",
          "Created Date",
          "Edit",
          "Delete"
        ]);

        // Populate table data
        const tableData = organizations.map(org => [
          org.name,
          org.id,
          org.plan || "",
          org.billing_cycle || "",
          org.is_active ? "Yes" : "No",
          org.created_by || "",
          org.created_date ? new Date(org.created_date).toLocaleDateString() : ""
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
        tcm.setColumnWidth(2, 100); // Plan
        tcm.setColumnWidth(3, 120); // Billing Cycle
        tcm.setColumnWidth(4, 80); // Active
        tcm.setColumnWidth(5, 150); // Created By
        tcm.setColumnWidth(6, 120); // Created Date
        //tcm.setColumnWidth(7, 30); // Edit
        //tcm.setColumnWidth(8, 30); // Delete


        // Add table to document
        const doc = this.getRoot();
        doc.add(table, { left: 0, top: 0, right: 0, bottom: 0 });
      });
    }
  }
});
