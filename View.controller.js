sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
     "sap/m/MessageToast",
     "sap/ui/model/Filter",
     "sap/ui/model/FilterOperator"
], (Controller, Fragment, MessageToast, Filter, FilterOperator) => {
    "use strict";

    
    return Controller.extend("com.kt.com.project7.controller.Main", {
        onInit() {
          this.getView().setModel(new sap.ui.model.json.JSONModel({ states: [] }), "stateModel");
        },
        
        onCandidatepress:function(){
            var randomId = "ID-" + Math.floor(Math.random() * 1000000);
            this.getView().getModel("Omodel").setProperty("/CandidateId", randomId)
             
            if (!this._oDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "com.kt.com.project7.fragment.Candidate",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(this._oDialog);
                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },
        onCancelpress:function(){
                    
          var oModel = this.getView().getModel("Omodel");
              // clear input data
          oModel.setProperty("/Name", "");
          oModel.setProperty("/skill", "");
          oModel.setProperty("/MobileNo", "");
          oModel.setProperty("/totalexp", "");
          oModel.setProperty("/relevantexp", "");
          oModel.setProperty("/noticeperiod", "");
          oModel.setProperty("/howsooncanjion", "");
          oModel.setProperty("/currentlocation", "");
          oModel.setProperty("/selectedState", "");
          oModel.setProperty("/newjoblocation", "");
          oModel.setProperty("/avalableforinterview", "");
          oModel.setProperty("/ctc", "");
          oModel.setProperty("/ectc", "");
                    // clear valuestate error

          oModel.setProperty("/valueStatectc", "None");
          oModel.setProperty("/valueStateectc", "None");
          oModel.setProperty("/valueStateName", "None");
          oModel.setProperty("/valueStateMobileNo", "None");

          
            this._oDialog.close();
        },

       
      
        onNamechange:function(){
                 
            var oModel = this.getView().getModel("Omodel");
            var sValue = oModel.getProperty("/Name"); // Get the current input value
      
           
            var reg = /^[A-Za-z]+$/;

            // var oInput = oEvent.getSource();
            // oInput.setValue(sFilteredValue);

           
            if (reg.test(sValue)) {
            //  if input the value is correct
              oModel.setProperty("/valueStateName", "None");
              oModel.setProperty("/ValueStateTextName", "");

            } else {
              // Input is valid, clear the error state
              oModel.setProperty("/valueStateName", "Error");
              oModel.setProperty("/ValueStateTextName", "Only alphabets are allowed");
            }
        },
        onchangeofmobNumber:function(oEvent){
            var oModel = this.getView().getModel("Omodel");
            var sValue = oEvent.getParameter("value");

            // Use a regular expression to allow only numbers
            var isValid = sValue.replace(/[^0-9]/g, "");// Matches numbers up to 10 digits
      
             var oInput = oEvent.getSource();
             oInput.setValue(isValid);

            if (sValue !== isValid) {
                // Set the filtered value back into the model and show an error
                oModel.setProperty("/MobileNo", isValid);
                oModel.setProperty("/valueStateMobileNo", "Error");
              } else {
                // Input is valid, clear the error state
                oModel.setProperty("/MobileNo", isValid);
                oModel.setProperty("/valueStateMobileNo", "None");
              }
             
            
        },
        onCtcchange:function(){
            var oModel = this.getView().getModel("Omodel");
            var sCTC = oModel.getProperty("/ctc");
            var sECTC = oModel.getProperty("/ectc");
      
            // Convert values to numbers (treat empty strings as 0)
            var nCTC = parseFloat(sCTC) || 0;
            var nECTC = parseFloat(sECTC) || 0;
      
            // Reset ValueStates initially
            oModel.setProperty("/valueStatectc", "None");
            oModel.setProperty("/valueStateectc", "None");
      
            // Validate ECTC should be greater than CTC
            if (sCTC && sECTC) {
              if (nECTC <= nCTC) {
                // ECTC is invalid
                oModel.setProperty("/valueStateectc", "Error");
                oModel.setProperty("/ValueStateTextectc", "ECTC must be greater than CTC.");
              } else {
                // Valid case
                oModel.setProperty("/valueStateectc", "None");
              }
            }
    },

    // onchangeofmail:function(){
    //     var oModel = this.getView().getModel("Omodel");

    //     var smail = oModel.getProperty("/email");

    //     var sEmail = sValue.replace(^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$);
            
    //     var oInput = oEvent.getSource();
    //        oInput.setValue(isValid);

    //     if (smail && sEmail.test(smail)) {
    //         // Valid email
    //         oModel.setProperty("/mailvalueStat", "None");
    //       } else {
    //         // Invalid email
    //         oModel.setProperty("/mailvalueStat", "Error");
    //       }

    // },
    onSavepress:function(){
        var oModel = this.getView().getModel("Omodel");

      // Get the current input values
      var srandomid = oModel.getProperty("/CandidateId");
      var sname = oModel.getProperty("/Name");
      var askill = oModel.getProperty("/skill");
      var snumber = oModel.getProperty("/MobileNo");
      var stotalexp = oModel.getProperty("/totalexp");
      var srelevantexp = oModel.getProperty("/relevantexp");
      var sCTC = oModel.getProperty("/ctc");
      var sECTC = oModel.getProperty("/ectc");
      var snoticeperiod = oModel.getProperty("/noticeperiod");
      var showsoon = oModel.getProperty("/howsooncanjion");
      var scurrent = oModel.getProperty("/currentlocation");
      var sState = oModel.getProperty("/selectedState");
      var snewjoblocation = oModel.getProperty("/newjoblocation");
      var savalable = oModel.getProperty("/avalableforinterview");
      

           

            if (oModel.getProperty("/valueStateName") === "Error") {
                MessageToast.show("Fix the errors before submitting.");
                return
            } 

      // Check if both values are valid
      if (oModel.getProperty("/valueStateectc") === "Error") {
        sap.m.MessageToast.show("Please correct the errors before saving.");
        return;
      }

      if (!sname || !snumber || !askill || !sCTC || !sECTC || !scurrent ||  !savalable) {
        sap.m.MessageToast.show(" required to fill all field.");
        return;
      }

      // Add the new entry to the table data
      var aformData = oModel.getProperty("/formData");
      aformData.push({
        ID:srandomid,
        name:sname,
        Vskill:askill,
        Vnumber:snumber,
        Vtotalexp:stotalexp,
        Vrelevantexp:srelevantexp,
        Vnoticperiod:snoticeperiod,
        Vhowsoon:showsoon,
        Vcurrent:scurrent,
        VState:sState,
        Vnewjoblocation:snewjoblocation,
        Vavailable:savalable,
        VcurrentCTC: sCTC,
        VexpectedCTC: sECTC
      });

      // Update the table data in the model
      oModel.setProperty("/formData", aformData);

      // Clear input fields after saving
      oModel.setProperty("/Name", "");
      oModel.setProperty("/skill", "");
      oModel.setProperty("/MobileNo", "");
      oModel.setProperty("/totalexp", "");
      oModel.setProperty("/relevantexp", "");
      oModel.setProperty("/noticeperiod", "");
      oModel.setProperty("/howsooncanjion", "");
      oModel.setProperty("/currentlocation", "");
      oModel.setProperty("/selectedState", "");
      oModel.setProperty("/newjoblocation", "");
      oModel.setProperty("/avalableforinterview", "");
      oModel.setProperty("/ctc", "");
      oModel.setProperty("/ectc", "");

      // Reset ValueStates
      oModel.setProperty("/valueStatectc", "None");
      oModel.setProperty("/valueStateectc", "None");

    
      // Show success message
      sap.m.MessageToast.show("Data saved successfully!");
      this._oDialog.close();
    },

    onDialogClose:function(){
        this.getView().getModel("Omodel").setProperty("/CandidateId", "");
    },
    onCountryChange:function(oEvent){


      // var sSelectedCountry = oEvent.getSource().getSelectedKey();

      // if (!sSelectedCountry) {
      //     // Show error if no country is selected
      //     oEvent.getSource().setValueState("Error");
      //     oEvent.getSource().setValueStateText("Please select a country.");
      //     this.getView().getModel("stateModel").setProperty("/states", []);
      //     return;
      // }

      // // Clear the Value State
      // oEvent.getSource().setValueState("None");

      // // Filter states based on selected country
      // var oModel = this.getView().getModel("Omodel");
      // var aCountries = oModel.getProperty("Omodel>/countries");
      // var aFilteredStates = [];

      // aCountries.filter(function (oItem) {
      //     if (oItem.country === sSelectedCountry) {
      //         aFilteredStates = oItem.states;
      //     }
      // });

      // // Update the state model
      // this.getView().getModel("stateModel").setProperty("/states", aFilteredStates);











      var sSelectedCountry = oEvent.getSource().getSelectedKey();

      if (!sSelectedCountry) {
          oEvent.getSource().setValueState("Error");
          oEvent.getSource().setValueStateText("Please select a country.");
          return;
      }

      
      oEvent.getSource().setValueState("None");

      // Create a filter for the selected country
      var oFilter = new Filter("country", FilterOperator.EQ, sSelectedCountry);

      // Apply the filter on the states binding
      var oStateComboBox = this.byId("idStateComboBox");
      var oBinding = oStateComboBox.getBinding("items");

      if (oBinding) {
          oBinding.filter([oFilter]);
      }






        
      //   var sSelectedCountry = oEvent.getSource().getSelectedKey(); // Get the selected country key
      // var oModel = this.getView().getModel("Omodel");

      // // Fetch states for the selected country
      // var aStates = oModel.getProperty("/countryStates/" + sSelectedCountry);

      
      // oModel.setProperty("/states", aStates || []);

      // // Clear the selected state
      // oModel.setProperty("/selectedState", "");
    },

    onstatechange:function(oEvent){
      var sSelectedState = oEvent.getSource().getSelectedKey();

      if (!sSelectedState) {
          // Set value state error if no state is selected
          oEvent.getSource().setValueState("Error");
          oEvent.getSource().setValueStateText("Please select a state.");
          return;
      }

      // Clear any previous error state
      oEvent.getSource().setValueState("None");
    },
    onEditsavepress:function(){
      const oModel = this.getOwnerComponent().getModel("Dmodel")

      var bEditMode = oModel.getProperty("/EditMode");

      if (!bEditMode) {
          oModel.setProperty("/EditMode", true); // Set to 'Edit' mode

          var aTableData = oModel.getProperty("/Studentdata");
          aTableData.forEach(function (oRow) {
              oRow.editable = true; 
          });
          oModel.setProperty("/Studentdata", aTableData);
      }else {
        
          oModel.setProperty("/EditMode", false); 

          // Disable editing for all rows in the table
          var aTableData = oModel.getProperty("/Studentdata");
          aTableData.forEach(function (oRow) {
              oRow.editable = false; 
          });
          oModel.setProperty("/Studentdata", aTableData);

       
          MessageToast.show("Data saved successfully!");
      }
    }
       

    });
});
