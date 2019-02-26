sap.ui.define(function() {
	"use strict";

	var AjaxTeam = {

	updateTeam :  function (teamModel, url) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://p2001126657trial-trial-dev-service.cfapps.eu10.hana.ondemand.com/xsjs/team/team.xsjs",
            "method": "PUT",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{ \"teamId\": \"" + teamModel.teamId + "\", \"name\": \"" + teamModel.teamName + "\", \"sportName\": \"" + teamModel.sportName + "\" }"
        };
            return settings;
        },
        
        deleteTeam: function (id) {
            var settings = {
                "async": true,
                "crossDomain": true,
				"url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/team/team.xsjs",
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
				"processData": false,
				"data": "{\"teamId\": \"" + id + "\"}"
            };
            return settings;
        },

        createTeam: function (teamName, sportName){
            var settings = {	
                "async": true,
                "crossDomain": true,
                "url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/team/team.xsjs",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"name\": \"" + teamName + "\", \"sportName\": \"" + sportName + "\"}"
            };
            return settings;
        }
	};

	return AjaxTeam;

}, true);