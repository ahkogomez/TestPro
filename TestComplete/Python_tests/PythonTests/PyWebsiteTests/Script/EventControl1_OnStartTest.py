﻿def EventControl1_OnStartTest(Sender):
  
  CONST_INPUT = "Input"
  
  Log.Message("Start")

  found = False
  i = 1
  while (i <= BuiltIn.ParamCount() and not found):
    parm = BuiltIn.ParamStr(i);
    Log.message(parm)
    p = aqString.Find(parm, "Data", 0, True);

    found = p == 0;
    
    if (found):
      parts = parm.split("=");
      if not Project.Variables.VariableExists(CONST_INPUT):
          Project.Variables.AddVariable(CONST_INPUT, "String")
      Log.Message(parts[1])

      Project.Variables.VariableByName[CONST_INPUT] = parts[1]
    
    i+=1   
