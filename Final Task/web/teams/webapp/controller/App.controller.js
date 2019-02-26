sap.ui.define([
	'jquery.sap.global',
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/List',
	'sap/m/StandardListItem',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'./AjaxTeam',
	'./AjaxPlayer'
], function (jQuery, Button, Dialog, List, StandardListItem, Controller, JSONModel, AjaxTeam,AjaxPlayer) {
	"use strict";

	this.editModeOn = function (items, index) {
		items[index].getCells()[6].setEnabled(true);
	}

	this.editModeOff = function (items, index) {
		items[index].getCells()[1].setEditable(false);
		items[index].getCells()[2].setEditable(false);
		items[index].getCells()[6].setEnabled(false);
	}

	this.editModePOn = function (items, index) {
		items[index].getCells()[7].setEnabled(true);
	}

	this.editModePOff = function (items, index) {
		items[index].getCells()[2].setEditable(false);
		items[index].getCells()[3].setEditable(false);
		items[index].getCells()[7].setEnabled(false);
	}

	return Controller.extend("teams.controller.App", {
		fixedSizeDialog: null,
		fixedSizeDialogP: null,

		onEdit: function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
			var aItems = oTable.getItems();

			for(var i = 0; i < aItems.length; i ++)
			{
				for (var j = 1; j < 3; j++) {
					aItems[i].getCells()[j].setEditable();
				}
				editModeOn(aItems, i);
			}
		},

		offEdit: function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
			var aItems = oTable.getItems();

			for(var i = 0; i < aItems.length; i ++)
			{
				for (var j = 1; j < 3; j++) {
					aItems[i].getCells()[j].setEditable(false);
				}
				editModeOff(aItems, i);
			}
		},

		onEditP: function (oEvent) {
			var oTable = this.getView().byId('idPlayersTable');
			var aItems = oTable.getItems();

			for(var i = 0; i < aItems.length; i ++)
			{
				for (var j = 2; j < 4; j++) {
					aItems[i].getCells()[j].setEditable();
				}
				editModePOn(aItems, i);
			}
		},

		offEditP: function (oEvent) {
			var oTable = this.getView().byId('idPlayersTable');
			var aItems = oTable.getItems();

			for(var i = 0; i < aItems.length; i ++)
			{
				for (var j = 2; j < 4; j++) {
					aItems[i].getCells()[j].setEditable(false);
				}
				editModePOff(aItems, i);
			}
		},

		onSave: function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
			var selItem = oTable.getSelectedItem();
			var aItems = oTable.getItems();
			var index = oTable.indexOfItem(selItem);
			var id = aItems[index].getCells()[0].getValue();
			var name = aItems[index].getCells()[1].getValue();
			var sportName = aItems[index].getCells()[2].getValue();
			var teamId = selItem.getBindingContext("dataModel").getObject().teamId;
			$.ajax(AjaxTeam.updateTeam(teamId, sportName, name)).done(function (response) {
				selItem.getBindingContext("dataModel").getModel().refresh(true);
			});
			editModeOff(aItems, index);
		},
		onDelete: function (oEvent) {
			var oTable = this.getView().byId('idTeamsTable');
			var selItem = oTable.getSelectedItem();
			var id = selItem.getBindingContext("dataModel").getObject().teamId;

			$.ajax(AjaxTeam.deleteTeam(id)).done(function (response) {
				selItem.getBindingContext("dataModel").getModel().refresh(true);
			});
		},

		onSaveP: function (oEvent) {
			var oTable = this.getView().byId('idPlayersTable');
			var selItem = oTable.getSelectedItem();
			var aItems = oTable.getItems();
			var index = oTable.indexOfItem(selItem);
			var id = aItems[index].getCells()[0].getValue();
			var name = aItems[index].getCells()[2].getValue();
			var country = aItems[index].getCells()[3].getValue();
			$.ajax(AjaxPlayer.updatePlayer(id, name, country)).done(function (response) {
				selItem.getBindingContext("dataModel").getModel().refresh(true);
			});
			editModeOff(aItems, index);
		},
		onDeleteP: function (oEvent) {
			var oTable = this.getView().byId('idPlayersTable');
			var selItem = oTable.getSelectedItem();
			var id = selItem.getBindingContext("dataModel").getObject().pId;

			$.ajax(AjaxPlayer.deletePlayer(id)).done(function (response) {
				selItem.getBindingContext("dataModel").getModel().refresh(true);
			});
		},

		onAdd: function (oEvent) {
			if (!this.fixedSizeDialog) {
				this.fixedSizeDialog = new Dialog({
						title: 'Add new Team',
						contentWidth: "350px",
						contentHeight: "150px",
						content: [
							new sap.m.Label({
								text: "Team Name"
							}),
							new sap.m.Input({
								maxLength: 20,
								id: "TName"
							}),

							new sap.m.Label({
								text: "Sport Name"
							}),
							new sap.m.Input({
								maxLength: 20,
								id: "SName"
							})

						],

						beginButton: new Button({
							text: 'Add',
							press: function () {
								var oTable = this.getView().byId('idTeamsTable');
								var teamName = sap.ui.getCore().byId("TName").getValue();
								var sportName = sap.ui.getCore().byId("SName").getValue();

								$.ajax(AjaxTeam.createTeam(teamName, sportName)).done(function (response) {
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
		},

		onAddP: function (oEvent) {
			if (!this.fixedSizeDialogP) {
				this.fixedSizeDialogP = new Dialog({
						title: 'Add new Player',
						contentWidth: "370px",
						contentHeight: "200px",
						content: [
							new sap.m.Label({
								text: "Player Name"
							}),
							new sap.m.Input({
								maxLength: 20,
								id: "PName"
							}),

							new sap.m.Label({
								text: "Country"
							}),
							new sap.m.Input({
								maxLength: 20,
								id: "Country"
							}),

							new sap.m.Label({
								text: "Id Team"
							}),
							new sap.m.Input({
								maxLength: 20,
								id: "tId"
							})

						],

						beginButton: new Button({
							text: 'Add',
							press: function () {
								var oTable = this.getView().byId('idPlayersTable');
								var playerName = sap.ui.getCore().byId("PName").getValue();
								var country = sap.ui.getCore().byId("Country").getValue();
								var tId = sap.ui.getCore().byId("tId").getValue();

								$.ajax(AjaxPlayer.createPlayer(playerName, country,tId)).done(function (response) {
									oTable.getModel("dataModel").refresh(true);
								});
								this.fixedSizeDialogP.close();
							}.bind(this)
						}),
						endButton: new Button({
							text: 'Close',
							press: function () {
								this.fixedSizeDialogP.close();
							}.bind(this)
						})
					}),
					this.getView().addDependent(this.fixedSizeDialogP);
			}

			this.fixedSizeDialogP.open();
		}

	});
});