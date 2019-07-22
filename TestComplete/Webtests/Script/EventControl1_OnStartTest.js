function EventControl1_OnStartTest(Sender) {
  
  const INPUT = "Input";
  
  Log.Message("Start")

  var found = false;

  for (let i = 1; i <= BuiltIn.ParamCount() && !found; i++) {
    let parm = BuiltIn.ParamStr(i);
    
    Log.Message(parm);
    let p = aqString.Find(parm, "Data", 0, true);
    
    found = p == 0; 

    if (found) {
       var parts = parm.split("=");
    
       if (!Project.Variables.VariableExists(INPUT)) {
          Project.Variables.AddVariable(INPUT, "String");
       }

       Project.Variables.$set("VariableByName", INPUT, parts[1]);
    }
  }
}