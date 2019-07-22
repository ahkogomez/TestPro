﻿var common = require("Common");
var datadriver = require("datadriver");

function NavigateShop(){
  
   driver = datadriver.getData("D:\\TestComplete\\Javascript_tests\\testdata\\testdata_teashop.csv");
   Log.Message(driver.Name);
   
   while (!driver.EOF()){
      common.OpenURL(driver.Value(0),"http://www.practiceselenium.com/");
      var page = Sys.Browser("*").Page("*");
      page.NativeWebObject.Find("contentText", driver.Value("link"), "a").Click();
      aqUtils.Delay(500);
      aqObject.CheckProperty(page,"URL", cmpContains, driver.Value("linkurl"), CaseSensitive=false);
      common.CloseBrowser();
      driver.Next();
   }
  
}