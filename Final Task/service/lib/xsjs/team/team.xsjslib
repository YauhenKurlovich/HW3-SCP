const Servicelib = $.import('xsjs', 'crudService').crudService;
const serviceLib = new Servicelib();

const AppConst = $.import('xsjs', 'crudConst').crudConst;
const appConst = new AppConst();

var team = function (connection) {

    this.doPost = function (oTeam) {
        if(oTeam.name == undefined || oTeam.sportName == undefined){
            throw new Error(appConst.UNDEFINED);
        }
        else{
          oTeam.teamId = serviceLib.getNextval(appConst.SEQUENCE_TEAM,connection);
          const statement = serviceLib.createPreparedInsertStatement(appConst.TEAM_TABLE, oTeam);
          connection.executeUpdate(statement.sql, statement.aValues);
          connection.commit();
          $.response.status = $.net.http.CREATED;
          $.response.setBody(JSON.stringify(oTeam));
        }
    };


    this.doPut = function (oTeam) {
      if(oTeam.name == undefined && oTeam.sportName == undefined){
          throw new Error(appConst.UNDEFINED);
      }
      else{
        let sql = serviceLib.createPreparedUpdateStatement(appConst.TEAM_TABLE, oTeam);
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oTeam));
      }
    };

    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${appConst.TEAM_TABLE}"`);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oTeam) {
      if(oTeam.teamId == undefined){
          throw new Error(appConst.UNDEFINED_ID);
      }
      else{
        let sql = `DELETE FROM "${appConst.TEAM_TABLE}" WHERE "teamId"=${oTeam.teamId};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oTeam));
      }
    };
};
