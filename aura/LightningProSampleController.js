({
	getRecords : function(cmp, event, helper) {
        
        let columns = [
            {
                'label':'Name',
             	'name':'Name',
                'type':'url',
                'width':100,
                'class':'testheader',
                'resizeable':true,
                'clickable':true //support only for url
            },            
            {
                'label':'Stage Name',
             	'name':'StageName',
                'type':'url',
                 'width':100,
                'editable':false,
                'visible':true,
                'cellClass':'checkbxFix',
                //'displayLabel':'Name',
                'target':'_self',
                'resizeable':true
            },
             {
                'label':'checkbox',
             	'name':'checkbox',
                'enableEditOn':'load',
                'type':'boolean',
                'resizeable':true
            },
            {
                'label':'Currency',
                'name':'currency',
                'enableEditOn':'load',
                'editable':true,
                'type':'currency',
                'visible':true,
                'resizeable':true
            },
            {
                'label':'Number 1',
                'enableEditOn':'load',
                'name':'Number1',
                'type':'number',
                'editable':true,
            },
            {
                'label':'Number 2',
                'enableEditOn':'load',
                'name':'Number2',
                'type':'number',
                'editable':true,
               
            },
            {
                'label':'Number3',
                'enableEditOn':'load',
                'name':'Number3',
                'type':'number',
                'editable':true,
            },
            {
                'label':'Number 4',
                'enableEditOn':'load',
                'name':'Number4',
                'type':'number',
                'editable':true,
                'enableEditOn':'load',
            },
            {
                'label':'',
                'width':300,
                'type':'action',
                'sortable':false,
                'actions' : [
                     {
                        "visible":function(row){
                            return row.StageName != 'closed';
                        },
                        "type":'button',
                        "attributes": { //lightning:button Attributes
                            "label" : 'delete',
                            "name" : 'delete'
                        }
                    }, 
                    {
                        "visible":function(row){
                            return row.StageName != 'closed';
                        },
                        "type":'button',
                        "attributes": {
                            "label" : 'close',
                            "name" : 'closestage'
                        }
                    },
                    {
                        "visible":function(row){
                            return row.StageName != 'closed';
                        },
                        "type":"menu",
                        "attributes": {
                            "label":"Action",
                            "menuOptions": [
                                {
                                    "name" : "Action1",
                                    "label":"Action1",
                                },
                                {
                                    "name" : "Action2",
                                    "label":"Action2",
                                    "class":"dd"
                                }
                            ]
                        }
                    }       
                ],
            },
            
        ];       


        let config = {
            'searchByColumn':true,    
             //'searchBox':false,
            "globalAction":[
                
                { 
                        "type":"button",
                		"visible":true,
                        "attributes": {
                            "label":"Mark as Closed",
                            "class":'slds-button slds-button_brand',
                            "name":"changeClosedstate"
                		}
                },
                {
                "visible":true,
                "type":"button",
                "attributes": {
                    "name":"export",
                    "label":"Export table",
                    "class":'slds-button slds-button_brand',
                }
                },    
                {
                "type":"menu",
                "attributes": {
                    "label":"Actions",
                    "menuOptions":[
                        {
                        "name" : "test_1",
                        "label":"Test1",
                        },
                        {
                        "name" : "test_2",
                        "label":"Test2",
                        "class":"dd"
                        }
            		]
            	}
                }   
            ],
        };
        
        	cmp.set("v.columnConfig",config);
            cmp.set("v.rows",helper.formTestData(cmp));
            cmp.set("v.colMap",columns);

            cmp.find("table").initialize({
                "order":[],
                "itemMenu":[1,5,7,9],
                "itemsPerPage":7
            });

	},
    handleActionClick: function(cmp,event,helper){
        let row =  event.getParam("row"),
            selectedRows = cmp.get("v.selectedRows");
        
        const actionId = event.getParam("actionId");
		
        console.log('actionId',actionId,'row',row);
        
        if(actionId == 'delete'){
            if(row) {
                let rows = cmp.get("v.rows");
                let indx = -1;
                rows.map((row1,index) => {
                    if(row1.Id == row.Id){
                    indx = index;
                } 
                });
                
                rows.splice(indx,1);
                cmp.set("v.rows", rows);
                cmp.find('table').rerenderRows();
            } 
        }
        if(actionId == 'closestage'){
            var rows = cmp.get("v.rows");
            let indx = -1;
            rows.map((row1,index) => {
                if(row1.Id == row.Id){
                indx = index;
            } 
                     });
            console.log(indx)
            rows[indx].StageName = 'closed';
            cmp.set("v.rows", rows);
            cmp.find('table').rerenderRows();
        }
        if(actionId == 'export') {
            cmp.find('table').exportAs({"filename":"test", "filetype" : "csv", type:"All_Rows",useValuePropForReference:true});
        } 
        if(actionId == 'changeClosedstate'){
            
                let rows = cmp.get("v.rows"),
                	isError = false;
            
                rows.map((row) => {
                    if(selectedRows.indexOf(row.Id) != -1 && helper.validateRow(cmp,row)){
                    	row.StageName = 'closed';
                	} else if(selectedRows.indexOf(row.Id) != -1 && !helper.validateRow(cmp,row)){
                    	isError = true;
                	}
            	});
            
        	if(!isError){
                cmp.set("v.rows", rows);
                cmp.set("v.selectedRows", []);

                cmp.find('table').rerenderRows();
            }
        }
    },

    handleRowSelection: function(cmp,event,helper){
         let row = event.getParam("row");
        
        console.log(row,cmp.get("v.selectedRows"));
    },
    handleCellChange : function(cmp,event,helper){
        var row = event.getParam("row");
        let errorMap = cmp.get("v.errors");
        
        const eventName = event.getParam("eventName"),
              fieldName = event.getParam("columnName");
        
        console.log('eventName',eventName,'fieldName',fieldName);
            
        
        if(event.getParam("eventName") == 'click') {
            window.open('/'+row.Id);
        }
        
        if(event.getParam("eventName") == 'change') {
            if(fieldName == 'Number1' || fieldName == 'Number2'){
                if(row.Number2 > row.Number1){
                    if(!errorMap["rows"][row.Id]){
                        errorMap["rows"][row.Id] = {
                            "messages" : [],
                            "columns" : []
                        };
                    }
                    
                    errorMap["rows"][row.Id]['messages'] = ['Number 2 cannot be greater than number 1'];
                    errorMap["rows"][row.Id]['columns'] = ['Number1','Number2'];
                    
                } else if(errorMap["rows"][row.Id]){
                    delete errorMap["rows"][row.Id];
                    
                }
                
                cmp.set("v.errors",errorMap);
            }

        }
    },

})