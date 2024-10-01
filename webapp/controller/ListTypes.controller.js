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
        },
        getGroupHeader : function(oGroup){
            var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                title: oGroup.key,
                upperCase: true
            })
            return groupHeaderListItem


        },
        onShowSelecteditem: function(){
            var list = this.getView().byId("_IDGenList1")
            var selectedItems = list.getSelectedItems()
            var i18n = this.getView().getModel("i18n").getResourceBundle()

            if (selectedItems.length === 0){
                sap.m.MessageToast.show(i18n.getText("noselection"))
            }else{
                var textMessage = i18n.getText("selection")
                for (var item in selectedItems) {

                    var context = selectedItems[item].getBindingContext()
                    var oContext = context.getObject()
                    textMessage = textMessage + "-" + oContext.Material
                    sap.m.MessageToast.show(textMessage)
                }
            }
        },
        DeletedSelected: function(){
            var i18n = this.getView().getModel("i18n").getResourceBundle()
            var list = this.getView().byId("_IDGenList1")
            var selectedItems = list.getSelectedItems()
            var model = this.getView().getModel()
            var products = model.getProperty("/Products")

            if (selectedItems.length === 0){
                sap.m.MessageToast.show(i18n.getText("noselection"))
            } else{ 

                var arrayid = []
                var textMessage = i18n.getText("selecteddeleted")
                for (var i in selectedItems) {

                    var context = selectedItems[i].getBindingContext()
                    var oContext = context.getObject()
                    arrayid.push(oContext.Id)
                    textMessage = textMessage + "-" + oContext.Material
                    
                    
                }

                products = products.filter(function(p){
                    return !arrayid.includes(p.Id)
                })

                model.setProperty("/Products", products)
                list.removeSelections()
                sap.m.MessageToast.show(textMessage)
            }
        },
        onDeleteRow: function(oEvent){
            var selectedrows = oEvent.getParameter("listItem")
            var context = selectedrows.getBindingContext()
            var splitpath = context.getPath().split("/")
            var index = splitpath[splitpath.length-1]
            var model =  this.getView().getModel()
            var products = model.getProperty("/Products")
            products.splice(index, 1)
            model.refresh()

        }
    });
});
