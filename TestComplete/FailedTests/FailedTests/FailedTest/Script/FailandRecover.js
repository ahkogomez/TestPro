var common = require("Common");
var datadriver = require("DataDriver");

function FailandRecover(){
  
   driver = datadriver.getData("D:\\TestProScripts\\TestComplete\\FailedTests\\FailedTests\\Data\\checkwebtitle.csv")
   
   while(!driver.EOF()){
      common.OpenURL(driver.Value("browser"), driver.Value("webpage"))
      let page = Sys.Browser(driver.Value("browser")).Page("*");
   
      //this line will fail
      aqObject.CheckProperty(page.contentDocument, "title", cmpContains, "Login - My Store");
    
      //this line should pass
      aqObject.CheckProperty(page.contentDocument, "title", cmpContains, driver.Value("title"));
      common.CloseBrowser(driver.Value("browser"));
      
      driver.Next();
   }
   

}