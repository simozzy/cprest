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

/*
 * Provides ability to check that the system is ready to accept requests
*/
qx.Class.define("restcp.utils.PreConditions", {
    extend: qx.core.Object,
    statics: {
        checkServices() {
            // Itterate through the REST_SERVICES defined in restcp.Constants and instatiates one, to check that the services are available
            Object.keys(restcp.Constants.REST_SERVICES).forEach(key => {
                const test = new restcp.Constants.REST_SERVICES[key]();
                if (!test) {
                    throw new Error(`The service ${key} could not be instantiated.`);
                }
            });
        }
    }
});
