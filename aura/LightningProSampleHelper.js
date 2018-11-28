({

    validateRow : function(cmp,row){
         let errorMap = cmp.get("v.errors"),
             isError = false;
        
        if(row.Number2 > row.Number1){
            if(!errorMap["rows"][row.Id]){
                errorMap["rows"][row.Id] = {
                    "messages" : [],
                    "columns" : []
                };
            }
            
            errorMap["rows"][row.Id]['messages'] = ['Number 2 cannot be greater than number 1', 'Hello world'];
            errorMap["rows"][row.Id]['columns'] = ['Number1','Number2'];
            isError = true;
        } else {
            if(errorMap["rows"][row.Id]){
                delete errorMap["rows"][row.Id]; 
            }
        }
        console.log('errorMap',errorMap);
        cmp.set("v.errors",errorMap);
        
        if(isError) {
            return false;
        } else {
            return true;
        } 
        
    },
    formTestData : function(cmp){
        let rows = [];
        
        for(let i=1;i<=50;i++){
            rows.push({
                'Id' : 'test'+i,
                'Name':'test'+i,
                'StageName':(i%2 == 0 ? 'closed' : 'open'),
                'checkbox':(i%2 == 0 ? false : true),
                'currency':(i%2 == 0 ? 100 : 500),
                'Image':'/resource/1542101004000/img',
                'Number1':(i%2 == 0 ? 1000 : 500),
                'Number2':(i%2 == 0 ? 100 : 5000),
                'Number3':(i%2 == 0 ? 100 : 500),
                'Number4':(i%2 == 0 ? 100 : 500)
            });
        }
        
        return rows;
    }
})