function EventControl1_OnStopTest(Sender) {
  
  const INPUT = "Input";
  Log.Message("Stop")

  if (Project.Variables.VariableExists(INPUT)) {
     Project.Variables.RemoveVariable(INPUT);
  }
}