var common = require("Common");
var datadriver = require("DataDriver");

if(ProjectSuite.Variables.SUITE_BROWSER != null){
    var browser = ProjectSuite.Variables.SUITE_BROWSER;
}
else{
    var browser = "firefox";
}

function OpenStore(){
  common.OpenURL(browser, "http://automationpractice.com");
  let page = Sys.Browser(browser).Page("*");
  aqObject.CheckProperty(page.contentDocument, "title", cmpEqual, "My Store");
  
  SetProjectBrowser(browser);
}

function CloseStore(){
  common.CloseBrowser(browser);
}

function SetProjectBrowser(browser){
  if (!Project.Variables.VariableExists("PROJECT_BROWSER")) {
          Project.Variables.AddVariable("PROJECT_BROWSER", "String");
       }
       Project.Variables.$set("VariableByName", "PROJECT_BROWSER", browser);
}