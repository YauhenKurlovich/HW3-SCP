const Servicelib = $.import('xsjs', 'crudService').crudService;
const serviceLib = new Servicelib();

const AppConst = $.import('xsjs', 'crudConst').crudConst;
const appConst = new AppConst();

var player = function (connection) {

    this.doPost = function (oPlayer) {

        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oPlayer));
    };


    this.doPut = function (oPlayer) {

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oPlayer));
    };

    this.doGet = function () {
        const result = connection.executeQuery(`SELECT * FROM "${appConst.PLAYER_TABLE}"`);
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oPlayer) {

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oPlayer));
    };
};
