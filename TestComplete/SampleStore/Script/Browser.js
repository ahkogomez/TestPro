var common = require("Common");
var datadriver = require("DataDriver");

function OpenStore(){
  common.OpenURL("firefox", "http://automationpractice.com");
  let page = Sys.Browser("firefox").Page("*");
  aqObject.CheckProperty(page.contentDocument, "title", cmpEqual, "My Store");
}

function CloseStore(){
  common.CloseBrowser();
}