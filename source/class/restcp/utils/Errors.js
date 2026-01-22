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
qx.Class.define("restcp.utils.Errors", {
    extend: qx.core.Object,
    type: "singleton",

    statics: {
        handleError: function(error) {
            // This will be extended to handle different error types and display appropriate messages
            throw new Error(error);
        }
    }
});
