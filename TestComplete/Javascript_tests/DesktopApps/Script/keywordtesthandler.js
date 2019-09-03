function setexternalvar(){
  if(Project.Variables.Input != null){
    Log.Message("using cmd");
    var driver = DDT.CSVDriver(Project.Variables.Input);
    KeywordTests.Test2.Variables.Var1 = driver.Value("message");
  }
  
}