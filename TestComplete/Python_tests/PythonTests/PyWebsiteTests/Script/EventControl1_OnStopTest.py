def EventControl1_OnStopTest(Sender):
  CONST_INPUT = "Input";
  Log.Message("Stop")

  if (Project.Variables.VariableExists(CONST_INPUT)): 
     Project.Variables.RemoveVariable(CONST_INPUT)
