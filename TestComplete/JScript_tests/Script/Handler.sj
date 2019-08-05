﻿function EventControl1_OnStartTest(Sender) {
  
  var INPUT = "Input";
  
  Log.Message("Start");
  var found = findparams("Data", "Input");
  
  if (found){
    if(checkFile(Project.Variables.Input) == "excel"){
      findparams("Sheet", "Sheet");
    }
  }
  
}

function EventControl1_OnStopTest(Sender) {
  
  var INPUT = "Input";
  Log.Message("Stop");

  if (Project.Variables.VariableExists(INPUT)) {
     Project.Variables.RemoveVariable(INPUT);
  }
  
  if (Project.Variables.VariableExists("Sheet")) {
     Project.Variables.RemoveVariable("Sheet");
  }
}

function findparams(type,inputname){
  
  var found = false;

  for (var i = 1; i <= BuiltIn.ParamCount() && !found; i++) {
    var parm = BuiltIn.ParamStr(i);
    
    Log.Message(parm);
    var p = aqString.Find(parm, type, 0, true);
    
    found = p == 0; 

    if (found) {
       var parts = parm.split("=");
       
       if (!Project.Variables.VariableExists(inputname)) {
          Project.Variables.AddVariable(inputname, "String");
       }
       Project.Variables.VariableByName(inputname) = parts[1];
    }
  }
  
  return found;
}

function checkFile(file) {
  //from: https://gist.github.com/niczak/5470218
  var extension = file.substr((file.lastIndexOf('.') +1));
  if (/(csv)$/ig.test(extension)) {
     return "csv";
  }
  else if (/(xlsx|xls)$/ig.test(extension)){
     return "excel";
  }
  else{
    return "nan";
  }
}