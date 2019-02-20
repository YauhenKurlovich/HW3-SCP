const Servicelib = $.import('xsjs', 'crudService').crudService;
const serviceLib = new Servicelib();

const AppConst = $.import('xsjs', 'crudConst').crudConst;
const appConst = new AppConst();

var player = function (connection) {

    this.doPost = function (oPlayer) {
      if(oPlayer.name == undefined || oPlayer.country == undefined || oPlayer.teamId == undefined){
          throw new Error(appConst.UNDEFINED);
      }
      else {
        if (serviceLib.checkExistTeamForPlayer(oPlayer.teamId, connection)){
          oPlayer.pId = serviceLib.getNextval(appConst.SEQUENCE_PLAYER, connection);
          const statement = serviceLib.createPreparedInsertStatement(appConst.PLAYER_TABLE, oPlayer);
          connection.executeUpdate(statement.sql, statement.aValues);
          connection.commit();
          $.response.status = $.net.http.CREATED;
          $.response.setBody(JSON.stringify(oPlayer));
        }
        else {
          throw new Error(appConst.NOT_EXIST_TEAM);
        }
      }
    };


    this.doPut = function (oPlayer) {
      if(oPlayer.pId == undefined){
          throw new Error(appConst.UNDEFINED_ID);
      }
      else{
        let statement = serviceLib.createPreparedUpdateStatement(appConst.PLAYER_TABLE, oPlayer);
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oPlayer));
      }
    };

    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${appConst.PLAYER_TABLE}"`);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oPlayer) {
      if(oPlayer.pId == undefined){
          throw new Error(appConst.UNDEFINED_ID);
      }
      else{
        let sql = `DELETE FROM "${appConst.PLAYER_TABLE}" WHERE "pId"=${oPlayer.pId};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oPlayer));
      }
    };
};
