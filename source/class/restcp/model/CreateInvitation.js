qx.Class.define("restcp.model.CreateInvitation",
{
  extend: qx.core.Object,

  properties: {
    invited_users: Object, // An array of InvitedUser objects
    message: String // The message to send to the invited users
  }
});
