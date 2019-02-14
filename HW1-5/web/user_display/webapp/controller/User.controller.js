sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("sap.ui.demo.db.controller.User", {
		onInit: function(){
			console.log("oninit");
		},
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},
		userListFactory : function(sId, oContext) {
			var oUIControl;
			oUIControl = this.byId("userExtended").clone(sId);
			return oUIControl;
		}
    });
});
