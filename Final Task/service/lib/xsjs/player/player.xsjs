const Playerlib = $.import('xsjs.player', 'player').player;

const playerLib = new Playerlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT : {
                    playerLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.GET : {
                    playerLib.doGet();
                    break;
                }
                case $.net.http.POST : {
                    playerLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    playerLib.doDelete(JSON.parse($.request.body.asString()));
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
