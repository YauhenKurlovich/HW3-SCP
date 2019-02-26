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

	return Controller.extend("teams.controller.App", {
		fixedSizeDialog: null,
		fixedSizeDialogP: null,

		onInit: function (oEvent) {
			this.oView = this.getView();
			this.mainConfig = this.oView.getModel("mainConfig").getData();
			this.teamModel= this.oView.getModel("teamModel");
			this.playerModel= this.oView.getModel("playerModel");
			this.teams = this.oView.getModel(this.mainConfig.teamsModelName);
			this.players = this.oView.getModel(this.mainConfig.playersModelName);
			this.teamTableId = this.oView.byId(this.mainConfig.teamTableId);
			this.playerTableId = this.oView.byId(this.mainConfig.playerTableId);
		},

		onEdit: function (oEvent) {
			this.oView.getModel("mainConfig").setProperty("/editModeTTable", true)
		},

		offEdit: function (oEvent) {
			this.oView.getModel("mainConfig").setProperty("/editModeTTable", false)
		},

		onEditP: function (oEvent) {
			this.oView.getModel("mainConfig").setProperty("/editModePTable", true)
		},

		offEditP: function (oEvent) {
			this.oView.getModel("mainConfig").setProperty("/editModePTable", false)
		},

		onSave: function (oEvent) {
			var teamModel = this.teamModel.getData();
			var rowCells = oEvent.getSource().getParent().getCells();

			teamModel.teamId = rowCells[this.mainConfig.teamIdPosition].getValue();
			teamModel.teamName = rowCells[this.mainConfig.teamNamePosition].getValue();
			teamModel.sportName = rowCells[this.mainConfig.sportNamePosition].getValue();

			var that = this;
			$.ajax(AjaxTeam.updateTeam(teamModel)).done(function (response) {
				var oTable = that.getView().byId(that.mainConfig.teamTableId);
				oTable.getModel(that.mainConfig.teamsModelName).refresh(true);
			});
		},
		onDelete: function (oEvent) {
			var teamModel = this.teamModel.getData();
			var rowCells = oEvent.getSource().getParent().getCells();
			teamModel.teamId = rowCells[this.mainConfig.teamIdPosition].getValue();

			var that = this;
			$.ajax(AjaxTeam.deleteTeam(teamModel.teamId)).done(function (response) {
				var oTable = that.getView().byId(that.mainConfig.teamTableId);
				oTable.getModel(that.mainConfig.teamsModelName).refresh(true);
			});
		},

		onSaveP: function (oEvent) {
			var playerModel = this.playerModel.getData();
			var rowCells = oEvent.getSource().getParent().getCells();

			playerModel.pId = rowCells[this.mainConfig.playerIdPosition].getValue();
			playerModel.name = rowCells[this.mainConfig.playerNamePosition].getValue();
			playerModel.country = rowCells[this.mainConfig.countryPosition].getValue();

			var that = this;
			$.ajax(AjaxPlayer.updatePlayer(playerModel)).done(function (response) {
				var oTable = that.getView().byId(that.mainConfig.playerTableId);
				oTable.getModel(that.mainConfig.playersModelName).refresh(true);
			});
		},
		onDeleteP: function (oEvent) {
			var playerModel = this.playerModel.getData();
			var rowCells = oEvent.getSource().getParent().getCells();

			playerModel.pId = rowCells[this.mainConfig.playerIdPosition].getValue();

			var that = this;
			$.ajax(AjaxPlayer.deletePlayer(playerModel.pId)).done(function (response) {
				var oTable = that.getView().byId(that.mainConfig.playerTableId);
				oTable.getModel(that.mainConfig.playersModelName).refresh(true);
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