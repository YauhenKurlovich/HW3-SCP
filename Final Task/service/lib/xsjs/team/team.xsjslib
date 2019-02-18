const Servicelib = $.import('xsjs', 'crudService').crudService;
const serviceLib = new Servicelib();

var team = function (connection) {

    this.doPost = function (oTeam) {

        $.response.status = $.net.http.CREATED;
        $.response.setBody(JSON.stringify(oTeam));
    };


    this.doPut = function (oTeam) {

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oTeam));
    };

    this.doGet = function () {
        const result = '';
        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(result));
    };

    this.doDelete = function (oTeam) {

        $.response.status = $.net.http.OK;
        $.response.setBody(JSON.stringify(oTeam));
    };
};
