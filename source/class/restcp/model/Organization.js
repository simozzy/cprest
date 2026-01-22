qx.Class.define("restcp.model.Organization",
{
  extend: qx.core.Object,

  properties: {
    created_by: String,
    created_date: String,
    updated_by: String,
    updated_date: String,
    can_access_billing: Boolean,
    can_access_security: Boolean,
    id: String,
    name: String,
    memo: String,
    billing_cycle: String,
    billing_price: Number,
    payment_type: String,
    plan: String,
    tax_id: String,
    is_active: Boolean,
    locked: Boolean,
    require_sso: Boolean,
    sso_allow_dynamic_group_assignment: Boolean,
    sso_allow_dynamic_user_creation: Boolean,
    sso_dynamic_group_assignment_name: String
  }
});
