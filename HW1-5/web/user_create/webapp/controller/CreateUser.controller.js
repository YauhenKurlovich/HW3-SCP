sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("user_create.controller.CreateUser", {
        onInit: function () {
        },
        createUser: function () {
            var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
            console.log(Name);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001081746trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsodata/crud.xsodata/Users",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"name\": \"" + Name  + "\"}"
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        }
    });

});