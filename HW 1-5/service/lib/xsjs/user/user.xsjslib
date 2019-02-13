var user = function (connection) {

    const USER_TABLE = "HW3SCP::User";

    this.doPost = function (oUser) {
        oUser.usid = getNextval("HW3SCP::usid");
        const statement = createPreparedInsertStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oUser));
    };


    this.doPut = function (oUser) {
        let sql = `UPDATE "${USER_TABLE}" SET "name"='${oUser.name}' WHERE "usid"=${oUser.usid};`;
        connection.executeUpdate(sql);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody("Updated");
    };

    this.doGet = function () {
        const result = connection.executeQuery('SELECT * FROM "HW3SCP::User"');
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oUser) {
        const statement = createPreparedDeleteStatement(USER_TABLE, oUser);
        connection.executeUpdate(statement.sql, statement.aValues);
        connection.commit();
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oUser));
    };

    function getNextval(sSeqName) {
        const statement = `select "${sSeqName}".NEXTVAL as "ID" from dummy`;
        const result = connection.executeQuery(statement);

        if (result.length > 0) {
            return result[0].ID;
        }
        else {
            throw new Error('ID was not generated');
        }
    }

    function createPreparedInsertStatement(sTableName, oValueObject) {
       let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sColumnList = '', sValueList = '';

        for(let key in oValueObject){
                sColumnList += "${key}",;
                oResult.aParams.push(key);
                sValueList += "?, ";
                oResult.aValues.push(oValueObject[key]);
        }

        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        return oResult;
    };

    function createPreparedDeleteStatement(sTableName, oConditionObject) {
        let sql = `DELETE FROM "${sTableName}" WHERE "usid"=${oConditionObject.userid};`;
        return sql;
    };
};
