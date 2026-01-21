qx.Class.define("restcp.service.UserService", {
  extend: restcp.service.BaseService,

  construct() {
    this.base(arguments, "/api/users");
    this.map("getAll", { method: "GET", url: "" });
    this.map("get", { method: "GET", url: "/{id}" });
    this.map("create", { method: "POST", url: "" });
    this.map("update", { method: "PUT", url: "/{id}" });
    this.map("remove", { method: "DELETE", url: "/{id}" });
  }
});
