var customizeTable = {};
customizeTable.showTable = function(maxRows, listProject, commonService,
         templateCode, translateService, dialogs, $window, testSuite, testCase, testPlan) {
    /**
     * customize data
     */
    var getData = (function() {
        return function() {
            var page = parseInt(window.location.hash.replace('#', ''), 10) || 1, limit = maxRows, row = (page - 1)
                    * limit, count = page * limit, part = [];
            for (; row < count; row++) {
                part.push(listProject[row]);
                if(null==listProject[row]){
                    break;
                }
            }

            return part;
        };
    })();

    /**
     * customize validator cell
     */
    notNullValidator = function(value, callback) {
        if (null == value || value.length == 0) {
            $("#save").prop("disabled", true);
            callback(false);
        } else {
            $("#save").prop("disabled", false);
            callback(true);
        }
    };
    validatorDropdown = function(value, callback) {
        if (value == 'NG') {
            $("#save").prop("disabled", true);
            callback(false);
        } else {
            $("#save").prop("disabled", false);
            callback(true);
        }
    };
    /**
     * declare global parameter
     */
    var rowDataChange = [];

    /**
     * declare hot object
     */
    var $$ = function(id) {
        return document.getElementById(id);
    },
    container = $$('hot'),
    hot,
    save = $$('save'),
    notNullValidator;
    var colHeader='', colData= [];
    /**
     * change header and column of table for every template
     */
    switch (templateCode) {
    case "1":
    case  1:
     // test plan
        colHeader= ["テスト計画ID"
                    ,"プロジェクトID"
                    ,"親テスト計画ID"
                    ,"テスト計画名"
                    ,"テスト目的"
                    ,"テスト対象"
                    ,"開始日"
                    ,"終了日 "
                    ,"要員数"
                    ,"規模単位コード "
                    ,"承認者"
                    ,"テスト密度目標値"
                    ,"テスト密度目標領域値"
                    ,"インシデント密度目標値"
                    ,"インシデント密度目標領域値"];
        colData= [{data:'testPlanId',       type : 'numeric' ,  readOnly: true}
                 ,{data:'projectId',        type : 'numeric',   readOnly: true}
                 ,{data:'parentId',
                   type : 'numeric',
                   editor: 'select2',
                   select2Options: {
                       data:  testSuite,
                       dropdownAutoWidth: true,
                       width: 'resolve',
                      containerCssClass: "aaa-bbb"
                   }
                 }
                 ,{data:'testPlanName',     type :'text',         validator: notNullValidator}
                 ,{data:'testObjective',    type : 'text'}
                 ,{data:'testObject',       type : 'text'}
                 ,{data:'beginDate',        type : 'date',        dateFormat: 'YYYY/MM/DD',
                  correctFormat: true,      validator: Handsontable.DateValidator}
                 ,{data:'endDate',          type: 'date',        dateFormat: 'YYYY/MM/DD',
                   correctFormat: true,     validator: Handsontable.DateValidator}
                 ,{data:'staffCount',       type : 'numeric',    validator: Handsontable.NumericValidator}
                 ,{data:'scaleUinitCode',   type : 'numeric'}
                 ,{data:'approvals',        type : 'numeric'}
                 ,{data:'insidentDensityTargetValue',   type : 'numeric',   validator: Handsontable.NumericValidator, format: '#.#'}
                 ,{data:'insidentDensityTargetZone',    type : 'numeric',   validator: Handsontable.NumericValidator, format: '#.#'}
                 ,{data:'testDensityTargetValue',       type : 'numeric',   validator: Handsontable.NumericValidator, format: '#.#'}
                 ,{data:'testDensityTargetZone',        type : 'numeric',   validator: Handsontable.NumericValidator, format: '#.#'}];
        break;
    case "2":
     // test suite
        colHeader= ["テストスイートID"
                    ,"プロジェクトID"
                    ,"テスト計画ID"
                    ,"親テストスイートID"
                    ,"テストスイート名"
                    ," 計画規模値"
                    ,"実績規模値 "];
        colData= [{data:'testSuiteId',      type : 'numeric', readOnly: true}
                ,{data:'projectId',         type : 'numeric', readOnly: true}
                ,{data:'testPlanId',
                  type : 'numeric',
                  validator: Handsontable.NumericValidator,
                  editor: 'select2',
                  select2Options: {
                      data:  testPlan,
                      dropdownAutoWidth: true,
                      width: 'resolve'
                  }}
                ,{data:'parentId',          type:'numeric'}
                ,{data:'testSuiteName',     type : 'text',     validator: notNullValidator}
                ,{data:'planScaleValue',    type : 'numeric',  validator: Handsontable.NumericValidator,format: '#.#'}
                ,{data:'actualScaleValue',  type : 'numeric'   ,format: '#.#'}];
        break;
    case "3":
     // test case
        colHeader= ["テストケースID"
                    ,"テストスイートID"
                    ,"テストケース名"
                    ,"開始日時"
                    ,"終了日時"];
        colData= [{data:'testCaseId',       type : 'numeric',   readOnly: true}
                 ,{data:'testSuiteId',
                   type : 'numeric',
                   validator: Handsontable.NumericValidator,
                   editor: 'select2',
                   select2Options: {
                       data:  testSuite,
                       dropdownAutoWidth: true,
                       width: 'resolve'
                   }}
                 ,{data:'testCaseName',     type : 'text' ,         validator: notNullValidator}
                 ,{data:'beginDatetime',    type: 'date',       dateFormat: 'YYYY/MM/DD',
                   correctFormat: true,     validator: Handsontable.DateValidator}
                 ,{data:'endDatetime',      type: 'date',       dateFormat: 'YYYY/MM/DD',
                   correctFormat: true,     validator: Handsontable.DateValidator}];
        break;
    case "4":
     // test excution
        colHeader= ["テスト実行ID"
                    ,"テストケースID"
                    ,"テスト実行結果"
                    ," 開始日"
                    ,"終了日"
                    ,"担当者"];
        colData= [{data:'testExecutionId',  type: 'numeric', readOnly: true}
                 ,{data:'testCaseId',
                   type: 'numeric',
                   editor: 'select2',
                   select2Options: {
                       data:  testCase,
                       dropdownAutoWidth: true,
                       width: 'resolve'
                   }}
                 ,{data:'result',
                   type: 'dropdown',
                   validator: validatorDropdown,
                   source:['OK', 'NG'],
                 }
                 ,{data:'beginDatetime',    type: 'date',            dateFormat: 'YYYY/MM/DD',
                   correctFormat: true,     validator: Handsontable.DateValidator}
                 ,{data:'endDatetime',      type: 'date',    dateFormat: 'YYYY/MM/DD',  correctFormat: true}
                 ,{data:'assignedToName',   type: 'text',            validator: notNullValidator}];
        break;
    case "5":
     // insident
        colHeader= ["インシデントID"
                    ,"プロジェクトID"
                    ,"題名"
                    ,"説明"
                    ,"インシデント状態コード"
                    ,"担当者"
                    ,"事象種別コード "
                    ,"原因種別コード"
                    ,"工程種別コード"
                    ,"テストスイートID"
                    ,"テストケースID"
                    ,"開始日時"
                    ,"終了日時"
                    ,"工数"];
        colData= [{data:'insidentId',   type: 'numeric', readOnly: true}
                 ,{data:'projectId',    type: 'numeric', readOnly: true}
                 ,{data:'subject',      type: 'text',     validator: notNullValidator}
                 ,{data:'description',  type:'text',      validator: notNullValidator}
                 ,{data:'incidentStatusCode',   type: 'numeric',              validator: Handsontable.NumericValidator}
                 ,{data:'assignedToName',       type: 'text',                 validator: notNullValidator}
                 ,{data:'eventKindCode',        type: 'numeric'}
                 ,{data:'causeKindCode',        type: 'numeric'}
                 ,{data:'processKindCode',      type: 'numeric'}
                 ,{data:'testSuiteId',
                     editor: 'select2',
                     type:'numeric',
                     select2Options: {
                         data:  testSuite,
                         dropdownAutoWidth: true,
                         width: 'resolve'
                     }
                 }
                 ,{data:'testCaseId',
                     editor: 'select2',
                     type:'numeric',
                     select2Options: {
                         data:  testCase,
                         dropdownAutoWidth: true,
                         width: 'resolve'
                     }
                 }
                 ,{data:'beginDatetime',        type: 'date',           dateFormat: 'YYYY/MM/DD',
                   correctFormat: true,         validator: Handsontable.DateValidator}
                 ,{data:'endDatetime',          type: 'date',           dateFormat: 'YYYY/MM/DD',
                   correctFormat: true}
                 ,{data:'estimatedHours',       type: 'numeric'}];
        break;
    }
    /**
     * init table
     */
    var setting= {
            /**
             * setting option for handsometable
             */
            data : getData(),
            colHeaders : true,
            rowHeaders : true,
            autoWrapRow : true,
           contextMenu : ['row_above', 'row_below', 'remove_row', 'undo', 'redo', 'clear_column'],
            dropdownMenu : ['filter_by_condition', 'filter_action_bar'],
            manualRowMove : true,
            manualColumnMove : true,
            filters : true,
            columns : colData,
            colHeaders : colHeader,
            allowRemoveColumn : false,
            allowInsertColumn : false,
            outsideClickDeselects : false,
            removeRowPlugin : true,
            currentRowClassName : 'currentRow',
            minSpareRows:1,
            search: true,
            language:'ja',
            afterRemoveRow : function(index, amount) {
                $("#save").prop("disabled", false);
            },
            afterRowMove:function(start, end){
                $("#save").prop("disabled", false);
            },
            afterChange:function(changes, source){
                if(source=='loadData'){
                    return;
                }else{
                    $("#save").prop("disabled", false);
                }

            },
            afterContextMenuHide:function(context){
                //context.menu.menuItems = context.itemsFactory.defaultOrderPattern;
            },
            afterContextMenuShow:function(context){
                //context.menu.menuItems = context.itemsFactory.defaultOrderPattern;
            },
        };
    hot = new Handsontable(container,setting);

    // set focus cel 0,0
    hot.selectCell(0, 0);

   // click save button on screen
    Handsontable.Dom.addEvent(save, 'click', function() {
        // choose type template
        switch (templateCode) {
        case "1":
            // test plan
            repairDataPlan(1);
            if (validatorPlan(rowDataChange) == false) {
                return;
            }
                var dlgConfirm = dialogs.confirm(translateService.getMessage('c.taa.fw.title'), translateService.getMessage('i.taa.fw.0002'), {size : 'sm'});
                dlgConfirm.result.then(function(btn) {
                    // save test plan
                    commonService.setLoading(true);
                    commonService.doPost('/showDataImport/autoSavePlan',
                            JSON.stringify(rowDataChange)).then(
                            function(result, status) {
                                commonService.setLoading(false);
                                var dlgNotifym = dialogs.notify(translateService.getMessage('i.taa.fw.title'),
                                                translateService.getMessage('i.taa.fw.0007'), {size : 'sm'});
                                dlgNotifym.result.then(function(btn) {
                                    setTimeout(function() { $window.location.reload(true); }, 500);

                                });
                            });
                });
            break;
        case "2":
            // test suite
            repairDataSuite(2);
            if (validatorSuite(rowDataChange) == false) {
                return;
            }
                var dlgConfirm = dialogs.confirm(translateService.getMessage('c.taa.fw.title'), translateService.getMessage('i.taa.fw.0002'), {size : 'sm'});
                dlgConfirm.result.then(function(btn) {
                    // save test suite
                    commonService.setLoading(true);
                    commonService.doPost('/showDataImport/autoSaveSuite',
                            JSON.stringify(rowDataChange)).then(
                            function(result, status) {
                                commonService.setLoading(false);
                                var dlgNotifym = dialogs.notify(translateService.getMessage('i.taa.fw.title'),
                                                translateService.getMessage('i.taa.fw.0007'), {size : 'sm'});
                                dlgNotifym.result.then(function(btn) {
                                    setTimeout(function() {  $window.location.reload(true); }, 500);
                                });
                            });
                });
            break;
        case "3":
            // test case
            repairDataCase(3);
            if (validatorCase(rowDataChange) == false) {
                return;
            }
                var dlgConfirm = dialogs.confirm(translateService.getMessage('c.taa.fw.title'), translateService.getMessage('i.taa.fw.0002'), {size : 'sm'});
                dlgConfirm.result.then(function(btn) {
                    // save test case
                    commonService.setLoading(true);
                    commonService.doPost('/showDataImport/autoSaveCase',
                            JSON.stringify(rowDataChange)).then(
                            function(result, status) {
                                commonService.setLoading(false);
                                var dlgNotifym = dialogs.notify(translateService.getMessage('i.taa.fw.title'),
                                                translateService.getMessage('i.taa.fw.0007'), {size : 'sm'});
                                dlgNotifym.result.then(function(btn) {
                                    setTimeout(function() { $window.location.reload(true);}, 500);

                                });
                            });
                });
            break;
        case "4":
            // test excution
            repairDataExcution(4);
            if (validatorExcution(rowDataChange) == false) {
                commonService.setLoading(false);
                return;
            }
                var dlgConfirm = dialogs.confirm(translateService.getMessage('c.taa.fw.title'), translateService.getMessage('i.taa.fw.0002'), {size : 'sm'});
                dlgConfirm.result.then(function(btn) {
                    // save test excution
                    commonService.setLoading(true);
                    commonService.doPost('/showDataImport/autoSaveExcution',
                            JSON.stringify(rowDataChange)).then(
                            function(result, status) {
                                commonService.setLoading(false);
                                var dlgNotifym = dialogs.notify(translateService.getMessage('i.taa.fw.title'),
                                                translateService.getMessage('i.taa.fw.0007'), {size : 'sm'});
                                dlgNotifym.result.then(function(btn) {
                                    setTimeout(function() { $window.location.reload(true);}, 500);
                                });
                            });
                });
            break;
        case "5":
            repairDataInsident(5);
            if (validatorInsident(rowDataChange) == false) {
                return;
            }
                var dlgConfirm = dialogs.confirm(translateService.getMessage('c.taa.fw.title'), translateService.getMessage('i.taa.fw.0002'), {size : 'sm'});
                dlgConfirm.result.then(function(btn) {
                    // test insident
                    commonService.setLoading(true);
                    commonService.doPost('/showDataImport/autoSaveInsident',
                            JSON.stringify(rowDataChange)).then(
                            function(result, status) {
                                commonService.setLoading(false);
                                var dlgNotifym = dialogs.notify(translateService.getMessage('i.taa.fw.title'),
                                                translateService.getMessage('i.taa.fw.0007'), {size : 'sm'});
                                dlgNotifym.result.then(function(btn) {
                                    setTimeout(function() { $window.location.reload(true);}, 500);
                                });
                            });
                });

            break;
        }

    });
    /**
     * this is pagging function
     */
    Handsontable.Dom.addEvent(window, 'hashchange', function(event) {
        hot.loadData(getData());
    });
    function bindDumpButton() {
        if (typeof Handsontable === "undefined") {
            return;
        }

        Handsontable.Dom.addEvent(document.body, 'click', function(e) {
            var element = e.target || e.srcElement;
            if (element.nodeName == "BUTTON" && element.name == 'dump') {
                var name = element.getAttribute('data-dump');
                var instance = element.getAttribute('data-instance');
                var hot = window[instance];
            }
        });
    }
    bindDumpButton();

    /**
     * post all data of suite on sreen to server
     */
    function validatorPlan(rowDataChange) {
        for (var row = 0; row < rowDataChange.length; row++) {
            var rowValid = rowDataChange[row]['rowChange'];
            if (null == rowDataChange[row]['testPlanName'] || 0 === rowDataChange[row]['testPlanName'].length) {
                hot.selectCell(rowValid, 3);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['beginDate'] || 0 === rowDataChange[row]['beginDate'].length) {
                hot.selectCell(rowValid, 6);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['endDate'] || 0 === rowDataChange[row]['endDate'].length) {
                hot.selectCell(rowValid, 7);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (null == rowDataChange[row]['staffCount'] || 0 === rowDataChange[row]['staffCount'].length) {
                hot.selectCell(rowValid, 8);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (null == rowDataChange[row]['insidentDensityTargetValue'] || 0 === rowDataChange[row]['insidentDensityTargetValue'].length) {
                hot.selectCell(rowValid, 11);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (null == rowDataChange[row]['insidentDensityTargetZone'] || 0 === rowDataChange[row]['insidentDensityTargetZone'].length) {
                hot.selectCell(rowValid, 12);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (null == rowDataChange[row]['testDensityTargetValue'] || 0 === rowDataChange[row]['testDensityTargetValue'].length) {
                hot.selectCell(rowValid, 13);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (null == rowDataChange[row]['testDensityTargetZone'] || 0 === rowDataChange[row]['testDensityTargetZone'].length) {
                hot.selectCell(rowValid, 14);
                hot.getActiveEditor().beginEditing();
                return false;
            };
        }
        return true;
    }

    /**
     * post all data of suite on sreen to server
     */
    function validatorSuite(rowDataChange) {
        for (var row = 0; row < rowDataChange.length; row++) {
            var rowValid = rowDataChange[row]['rowChange'];
            if (null == rowDataChange[row]['testPlanId'] || 0 === rowDataChange[row]['testPlanId'].length) {
                hot.selectCell(rowValid, 2);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['testSuiteName'] || 0 === rowDataChange[row]['testSuiteName'].length) {
                hot.selectCell(rowValid, 4);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['planScaleValue'] || 0 === rowDataChange[row]['planScaleValue'].length) {
                hot.selectCell(rowValid, 5);
                hot.getActiveEditor().beginEditing();
                return false;
            };
        }
        return true;
    }

    /**
     * post all data of case on sreen to server
     */
    function validatorCase(rowDataChange) {
        for (var row = 0; row < rowDataChange.length; row++) {
            var rowValid = rowDataChange[row]['rowChange'];
            if (null == rowDataChange[row]['testSuiteId'] || 0 === rowDataChange[row]['testSuiteId'].length) {
                hot.selectCell(rowValid, 1);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['testCaseName'] || 0 === rowDataChange[row]['testCaseName'].length) {
                hot.selectCell(rowValid, 2);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['beginDatetime'] || 0 === rowDataChange[row]['beginDatetime'].length) {
                hot.selectCell(rowValid, 3);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['endDatetime'] || 0 === rowDataChange[row]['endDatetime'].length) {
                hot.selectCell(rowValid, 4);
                hot.getActiveEditor().beginEditing();
                return false;
            }else if (rowDataChange[row]['beginDatetime'] > rowDataChange[row]['endDatetime']) {
                hot.selectCell(row, 3);
                hot.getActiveEditor().beginEditing();
                return false;
            };
        }
        return true;
    }

    /**
     * post all data of excution on sreen to server
     */
    function validatorExcution(rowDataChange) {
        for (var row = 0; row < rowDataChange.length; row++) {
            var rowValid = rowDataChange[row]['rowChange'];
            if (null == rowDataChange[row]['testCaseId'] || 0 === rowDataChange[row]['testCaseId'].length) {
                hot.selectCell(rowValid, 1);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['result'] || 0 === rowDataChange[row]['result'].length) {
                hot.selectCell(rowValid, 2);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['beginDatetime'] || 0 === rowDataChange[row]['beginDatetime'].length) {
                hot.selectCell(rowValid, 3);
                hot.getActiveEditor().beginEditing();
                return false;
            } else if (null == rowDataChange[row]['assignedToName'] || 0 === rowDataChange[row]['assignedToName'].length) {
                hot.selectCell(rowValid, 5);
                hot.getActiveEditor().beginEditing();
                return false;
            };

        }
        return true;
    }

    /**
     * post all data of insident on sreen to server
     */
    function validatorInsident(rowDataChange) {
        for (var row = 0; row < rowDataChange.length; row++) {

                var rowValid = rowDataChange[row]['rowChange'];
                if (null == rowDataChange[row]['subject'] || 0 === rowDataChange[row]['subject'].length) {
                    hot.selectCell(rowValid, 2);
                    hot.getActiveEditor().beginEditing();
                    return false;
                } else if (null == rowDataChange[row]['description'] || 0 === rowDataChange[row]['description'].length) {
                    hot.selectCell(rowValid, 3);
                    hot.getActiveEditor().beginEditing();
                    return false;
                } else if (null == rowDataChange[row]['incidentStatusCode'] || 0 === rowDataChange[row]['incidentStatusCode'].length) {
                    hot.selectCell(rowValid, 4);
                    hot.getActiveEditor().beginEditing();
                    return false;
                } else if (null == rowDataChange[row]['assignedToName'] || 0 === rowDataChange[row]['assignedToName'].length) {
                    hot.selectCell(rowValid, 5);
                    hot.getActiveEditor().beginEditing();
                    return false;
                } else if (null == rowDataChange[row]['beginDatetime'] || 0 === rowDataChange[row]['beginDatetime'].length) {
                    hot.selectCell(rowValid, 11);
                    hot.getActiveEditor().beginEditing();
                    return false;
                };

        }
        return true;
    }

    /**
     * convert test suite entity after post to server
     */
    function repairDataPlan(templateCode) {
        rowDataChange = [];
        for(var index = 0 ; index < hot.getData().length-1; index ++){
            var rowData = hot.getDataAtRow(index);
            var plan = {
                'testPlanId' : rowData[0],
                'projectId' : rowData[1],
                'parentId' : rowData[2],
                'testPlanName' : rowData[3],
                'testObjective' : rowData[4],
                'testObject' : rowData[5],
                'beginDate' : rowData[6],
                'endDate' : rowData[7],
                'staffCount' : rowData[8],
                'scaleUinitCode' : rowData[9],
                'approvals' : rowData[10],
                'insidentDensityTargetValue' : rowData[11],
                'insidentDensityTargetZone' : rowData[12],
                'testDensityTargetValue' : rowData[13],
                'testDensityTargetZone' : rowData[14],
                'templateCode' : templateCode,
                'rowChange' : index+1,
            };
            rowDataChange.push(plan);
        };
    }

    /**
     * convert test suite entity after post to server
     */
    function repairDataSuite(templateCode) {
        rowDataChange = [];
        for(var index = 0 ; index < hot.getData().length-1; index ++){
            var rowData = hot.getDataAtRow(index);
            var suite = {
                'testSuiteId' : rowData[0],
                'projectId' : rowData[1],
                'testPlanId' : rowData[2],
                'parentId' : rowData[3],
                'testSuiteName' : rowData[4],
                'planScaleValue' : rowData[5],
                'actualScaleValue' : rowData[6],
                'templateCode' : templateCode,
                'rowChange' : index+1,
            };
            rowDataChange.push(suite);
        };
    }

    /**
     * convert test case entity after post to server
     */
    function repairDataCase(templateCode) {
        rowDataChange = [];
        for(var index = 0 ; index < hot.getData().length-1; index ++){
            var rowData = hot.getDataAtRow(index);
            var cases = {
                'testCaseId' : rowData[0],
                'testSuiteId' : rowData[1],
                'testCaseName' : rowData[2],
                'beginDatetime' : rowData[3],
                'endDatetime' : rowData[4],
                'templateCode' : templateCode,
                'rowChange' : index+1,
            };
        rowDataChange.push(cases);
        };
    }

    /**
     * convert test excution entity after post to server
     */
    function repairDataExcution(templateCode) {
        rowDataChange = [];
        for(var index = 0 ; index < hot.getData().length-1; index ++){
            var rowData = hot.getDataAtRow(index);
            var excution = {
                'testExecutionId' : rowData[0],
                'testCaseId' : rowData[1],
                'result' : rowData[2],
                'beginDatetime' : rowData[3],
                'endDatetime' : rowData[4],
                'assignedToName' : rowData[5],
                'templateCode' : templateCode,
                'rowChange' : index +1,
            };
            rowDataChange.push(excution);
        };
    }

    /**
     * convert test insident entity after post to server
     */
    function repairDataInsident(templateCode) {
        rowDataChange = [];
        for(var index = 0 ; index < hot.getData().length-1; index ++){
            var rowData = hot.getDataAtRow(index);
            var insident = {
                    'insidentId' : rowData[0],
                    'projectId' : rowData[1],
                    'subject' : rowData[2],
                    'description' : rowData[3],
                    'incidentStatusCode' : rowData[4],
                    'assignedToName' : rowData[5],
                    'eventKindCode' : (rowData[6] == null ? 0 : rowData[6]),
                    'causeKindCode' : (rowData[7] == null ? 0 : rowData[7]),
                    'processKindCode' : (rowData[8] == null ? 0 : rowData[8]),
                    'testSuiteId' : rowData[9],
                    'testCaseId' : rowData[10],
                    'beginDatetime' : rowData[11],
                    'endDatetime' : rowData[12],
                    'estimatedHours' : (rowData[13] == null ? 0 : rowData[13]),
                    'templateCode' : templateCode,
                    'rowChange' : index+1,
                };
            rowDataChange.push(insident);
        }
    }

    /**
     * this is customize auto completed
     */
    "use strict";
    var Select2Editor = Handsontable.editors.TextEditor.prototype.extend();

    Select2Editor.prototype.prepare = function (row, col, prop, td, originalValue, cellProperties) {

        Handsontable.editors.TextEditor.prototype.prepare.apply(this, arguments);

        this.options = {};

        if (this.cellProperties.select2Options) {
            this.options = $.extend(this.options, cellProperties.select2Options);
        }
    };

    Select2Editor.prototype.createElements = function () {
        this.$body = $(document.body);

        this.TEXTAREA = document.createElement('input');
        this.TEXTAREA.setAttribute('type', 'text');
        this.$textarea = $(this.TEXTAREA);

        Handsontable.Dom.addClass(this.TEXTAREA, 'handsontableInput');

        this.textareaStyle = this.TEXTAREA.style;
        this.textareaStyle.width = 0;
        this.textareaStyle.height = 0;

        this.TEXTAREA_PARENT = document.createElement('DIV');
        Handsontable.Dom.addClass(this.TEXTAREA_PARENT, 'handsontableInputHolder');

        this.textareaParentStyle = this.TEXTAREA_PARENT.style;
        this.textareaParentStyle.top = 0;
        this.textareaParentStyle.left = 0;
        this.textareaParentStyle.display = 'none';

        this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);

        this.instance.rootElement.appendChild(this.TEXTAREA_PARENT);

        var that = this;
        this.instance._registerTimeout(setTimeout(function () {
            that.refreshDimensions();
        }, 0));
    };

    var onSelect2Changed = function () {
        this.close();
        this.finishEditing();
    };
    var onSelect2Closed = function () {
        this.close();
        this.finishEditing();
    };
    var onBeforeKeyDown = function (event) {
        var instance = this;
        var that = instance.getActiveEditor();

        var keyCodes = Handsontable.helper.KEY_CODES;
        var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey; //catch CTRL but not right ALT (which in some systems triggers ALT+CTRL)


        //Process only events that have been fired in the editor
        if (!$(event.target).hasClass('select2-input') || event.stopImmediatePropagation()) {
            return;
        }
        if (event.keyCode === 17 || event.keyCode === 224 || event.keyCode === 91 || event.keyCode === 93) {
            //when CTRL or its equivalent is pressed and cell is edited, don't prepare selectable text in textarea
            event.stopImmediatePropagation();
            return;
        }

        var target = event.target;

        switch (event.keyCode) {
            case keyCodes.ARROW_RIGHT:
                if (Handsontable.Dom.getCaretPosition(target) !== target.value.length) {
                    event.stopImmediatePropagation();
                } else {
                    that.$textarea.select2('close');
                }
                break;

            case keyCodes.ARROW_LEFT:
                if (Handsontable.Dom.getCaretPosition(target) !== 0) {
                    event.stopImmediatePropagation();
                } else {
                    that.$textarea.select2('close');
                }
                break;

            case keyCodes.ENTER:
                var selected = that.instance.getSelected();
                var isMultipleSelection = !(selected[0] === selected[2] && selected[1] === selected[3]);
                if ((ctrlDown && !isMultipleSelection) || event.altKey) { //if ctrl+enter or alt+enter, add new line
                    if (that.isOpened()) {
                        that.val(that.val() + '\n');
                        that.focus();
                    } else {
                        that.beginEditing(that.originalValue + '\n');
                    }
                    event.stopImmediatePropagation();
                }
                event.preventDefault(); //don't add newline to field
                break;

            case keyCodes.A:
            case keyCodes.X:
            case keyCodes.C:
            case keyCodes.V:
                if (ctrlDown) {
                    event.stopImmediatePropagation(); //CTRL+A, CTRL+C, CTRL+V, CTRL+X should only work locally when cell is edited (not in table context)
                }
                break;

            case keyCodes.BACKSPACE:
            case keyCodes.DELETE:
            case keyCodes.HOME:
            case keyCodes.END:
                event.stopImmediatePropagation(); //backspace, delete, home, end should only work locally when cell is edited (not in table context)
                break;
        }

    };

    Select2Editor.prototype.open = function (keyboardEvent) {
        this.refreshDimensions();
        this.textareaParentStyle.display = 'block';
        this.instance.addHook('beforeKeyDown', onBeforeKeyDown);

        this.$textarea.css({
            height: $(this.TD).height() + 4,
            'min-width': $(this.TD).outerWidth() - 4
        });

        //display the list
        this.$textarea.show();

        var self = this;
        this.$textarea.select2(this.options)
            .on('change', onSelect2Changed.bind(this))
            .on('select2-close', onSelect2Closed.bind(this));

        self.$textarea.select2('open');

        // Pushes initial character entered into the search field, if available
        if (keyboardEvent && keyboardEvent.keyCode) {
            var key = keyboardEvent.keyCode;
            var keyText = (String.fromCharCode((96 <= key && key <= 105) ? key-48 : key)).toLowerCase();
            self.$textarea.select2('search', keyText);
        }
    };

    Select2Editor.prototype.init = function () {
        Handsontable.editors.TextEditor.prototype.init.apply(this, arguments);
    };

    Select2Editor.prototype.close = function () {
        this.instance.listen();
        this.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
        this.$textarea.off();
        this.$textarea.hide();
        Handsontable.editors.TextEditor.prototype.close.apply(this, arguments);
    };

    Select2Editor.prototype.val = function (value) {
        if (typeof value == 'undefined') {
            return this.$textarea.val();
        } else {
            this.$textarea.val(value);
        }
    };

    Select2Editor.prototype.focus = function () {

        this.instance.listen();

        // DO NOT CALL THE BASE TEXTEDITOR FOCUS METHOD HERE, IT CAN MAKE THIS EDITOR BEHAVE POORLY AND HAS NO PURPOSE WITHIN THE CONTEXT OF THIS EDITOR
        //Handsontable.editors.TextEditor.prototype.focus.apply(this, arguments);
    };

    Select2Editor.prototype.beginEditing = function (initialValue) {
        var onBeginEditing = this.instance.getSettings().onBeginEditing;
        if (onBeginEditing && onBeginEditing() === false) {
            return;
        }

        Handsontable.editors.TextEditor.prototype.beginEditing.apply(this, arguments);

    };

    Select2Editor.prototype.finishEditing = function (isCancelled, ctrlDown) {
        this.instance.listen();
        return Handsontable.editors.TextEditor.prototype.finishEditing.apply(this, arguments);
    };

    Handsontable.editors.Select2Editor = Select2Editor;
    Handsontable.editors.registerEditor('select2', Select2Editor);
};
