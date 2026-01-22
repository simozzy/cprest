/* ************************************************************************

PlaidCloud

https://plaidcloud.com

Copyright:
2026 PlaidCloud, Inc

License:
Commercial - Visit plaidcloud.com for details on obtaining a valid license


Authors:
* Simon Moscrop

************************************************************************ */

/**
 * Provides a reference for Global Constants
 */
qx.Class.define("restcp.Constants", {
    extend: qx.core.Object,
    type: "singleton",

    statics: {
        URLS: {
            CONTROL_PLANE: "https://controlplane.plaidcloud.io/control-plane"
            // CONTROL_PLANE: "http://localhost:8001/control-plane"
        },
        USE_MOCKS: false, // Set to true to use mock data instead of actual API calls,
        REST_SERVICES: {
            "users": restcp.service.UsersService,
            "user": restcp.service.UserService,
            "organization": restcp.service.OrganizationService,
            "organizationAuthorization": restcp.service.OrgAuthService,
            "billings": restcp.service.BillingsService,
            "workspace": restcp.service.WorkspaceService
        }
    }
});
