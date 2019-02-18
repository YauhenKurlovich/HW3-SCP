const Teamlib = $.import('xsjs.team', 'team').team;

const teamLib = new Teamlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT : {
                    teamLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.GET : {
                    teamLib.doGet();
                    break;
                }
                case $.net.http.POST : {
                    teamLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    teamLib.doDelete(JSON.parse($.request.body.asString()));
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
