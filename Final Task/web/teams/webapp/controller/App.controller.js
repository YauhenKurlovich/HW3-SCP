sap.ui.define([
	'jquery.sap.global',
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/List',
		'sap/m/StandardListItem',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
], function(jQuery, Button, Dialog, List, StandardListItem, Controller, JSONModel) {
	"use strict";

	this.editOn = function (items, index) {
		items[index].getCells()[5].setEnabled(false);
		items[index].getCells()[6].setEnabled(true);
	}

	this.editOff = function (items, index) {
			items[index].getCells()[1].setEditable(false);
			items[index].getCells()[2].setEditable(false);
		
		items[index].getCells()[5].setEnabled(true);
		items[index].getCells()[6].setEnabled(false);
	}

	return Controller.extend("teams.controller.App", {

		fixedSizeDialog: null,
		
		onEdit : function(oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
			var selItem = oTable.getSelectedItem();
            var aItems = oTable.getItems();
			var index = oTable.indexOfItem(selItem);
            for (var j = 1; j < 3; j++) {
                aItems[index].getCells()[j].setEditable(aItems[index].getSelected());
            }
            editOn(aItems, index);
		},

		onSave : function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
            var selItem = oTable.getSelectedItem();
            var aItems = oTable.getItems();
			var index = oTable.indexOfItem(selItem);
			var id = aItems[index].getCells()[0].getValue();
            var name = aItems[index].getCells()[1].getValue();
            var sportName = aItems[index].getCells()[2].getValue();
            var teamId = selItem.getBindingContext("dataModel").getObject().teamId;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/team/team.xsjs",
                "method": "PUT",
                "headers": {
                    "content-type": "application/json"
                },
                "processData": false,
                "data": "{\"teamId\": \"" + id + "\",\"name\": \"" + name + "\", \"sportName\": \"" + sportName + "\"}"
            };
            $.ajax(settings).done(function (response) {
                selItem.getBindingContext("dataModel").getModel().refresh(true);
            });
            editOff(aItems, index);
		},
		onDelete : function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
            var selItem = oTable.getSelectedItem();
            var team = selItem.getBindingContext("dataModel").getObject().teamId;
            var settings = {
                "async": true,
                "crossDomain": true,
				"url": "https://p2001126657trial-trial-dev-router.cfapps.eu10.hana.ondemand.com/api/xsjs/team/team.xsjs",
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json"
                },
				"processData": false,
				"data": "{\"teamId\": \"" + team + "\"}"
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                selItem.getBindingContext("dataModel").getModel().refresh(true);
            });
		},

		onAdd :  function (oEvent) {
			if (!this.fixedSizeDialog) {
				this.fixedSizeDialog = new Dialog({
					title: 'Add new Team',
					contentWidth: "350px",
					contentHeight: "150px",
					content:[
						new sap.m.Label({text:"Team Name"}),
						new sap.m.Input({ maxLength: 20, id: "TName" }),

						new sap.m.Label({text:"Sport Name"}),
						new sap.m.Input({ maxLength: 20, id: "SName"})

					],

					beginButton: new Button({
						text: 'Add',
						press: function () {
						var oTable = this.getView().byId('idTeamsTable');
						var teamName = sap.ui.getCore().byId("TName").getValue();
						var sportName = sap.ui.getCore().byId("SName").getValue();
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
						$.ajax(settings).done(function (response) {
							oTable.getModel("dataModel").refresh(true);
						});
							this.fixedSizeDialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: 'Close',
						press: function () {
							this.fixedSizeDialog.close();
						}.bind(this)
					})
				}),
				this.getView().addDependent(this.fixedSizeDialog);
			}

			this.fixedSizeDialog.open();
		}

	});
});