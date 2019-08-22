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
}

function CloseStore(){
  common.CloseBrowser(browser);
}