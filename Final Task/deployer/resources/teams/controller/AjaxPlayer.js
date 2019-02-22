sap.ui.define(function() {
	"use strict";

	var AjaxPlayer = {

	updatePlayer :  function (id,name,country) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/player/player.xsjs",
                "method": "PUT",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"pId\": \"" + id + "\",\"name\": \"" + name + "\", \"country\": \"" + country + "\"}"
            };
            return settings;
        },
        
    deletePlayer: function (id) {
            var settings = {
                "async": true,
                "crossDomain": true,
				"url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/player/player.xsjs",
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
				"processData": false,
				"data": "{\"pId\": \"" + id + "\"}"
            };
            return settings;
        },

    createPlayer: function (playerName, country,teamId){
            var settings = {	
                "async": true,
                "crossDomain": true,
                "url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/player/player.xsjs",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"name\": \"" + playerName + "\", \"country\": \"" + country + "\", \"teamId\": \"" + teamId + "\"}"
            };
            return settings;
        }
	};

	return AjaxPlayer;

}, true);