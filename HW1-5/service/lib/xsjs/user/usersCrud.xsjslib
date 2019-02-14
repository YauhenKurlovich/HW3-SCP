const Servicelib = $.import('xsjs.user', 'crudService').crudService;
const serviceLib = new Servicelib();

 const USER_TABLE = "HW3SCP::User";
 const SEQ_NAME = "HW3SCP::User";

function usersDelete(param){
  var after = param.afterTableName;
  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");

  var oResult = pStmt.executeQuery();

  var oUserItems = serviceLib.recordSetToJSON(oResult, "items");
  var oUser = oUserItems.items[0];

  var dStmt = param.connection.prepareStatement(`DELETE FROM "HW3SCP::User" WHERE "usid"='${oUser.usid}'`);
  dStmt.executeUpdate();
}

function usersUpdate(param) {
  var after = param.afterTableName;

  var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
  var oResult = pStmt.executeQuery();

  var oUserItems = serviceLib.recordSetToJSON(oResult, "items");
  var oUser = oUserItems.items[0];

  var uStmt;
  uStmt = param.connection.prepareStatement(`UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`);
  uStmt.executeUpdate();
}

 function usersCreate(param) {
   var after = param.afterTableName;

   var pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");
   var oResult = pStmt.executeQuery();

   var oUserItems = serviceLib.recordSetToJSON(oResult, "items");
   var oUser = oUserItems.items[0];

   pStmt = param.connection.prepareStatement('select "HW3SCP::usid".NEXTVAL from dummy');
   var result = pStmt.executeQuery();

   while (result.next()) {
     oUser.id = result.getString(1);
   }

   pStmt.close();

  pStmt = param.connection.prepareStatement(`insert into \"${USER_TABLE}\" values(?,?)`);
  serviceLib.fillAndExecute(pStmt, oUser);
  pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\"" );
  pStmt.executeUpdate();
  pStmt.close();
  pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?)" );
  serviceLib.fillAndExecute(pStmt, oUser);
}
