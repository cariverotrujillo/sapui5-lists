sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("logaligroup.applists.controller.ListTypes", {
        onInit: function () {
            var oJSONModel = new sap.ui.model.json.JSONModel()
            var oView = this.getView()
            oJSONModel.loadData("/localService/mockdata/ListData.json", false)
            oView.setModel(oJSONModel)
        }
    });
});
