var common = require("Common");
var datadriver = require("datadriver")

function NavigateShop(){
  
   driver = datadriver.getData("D:\\TestComplete\\Webtests\\testdata\\testdata_teashop.xlsx", sheet="tea");
   while (!driver.EOF()){
      common.OpenURL("firefox","http://www.practiceselenium.com/");
      var page = Sys.Browser("*").Page("*");
      page.NativeWebObject.Find("contentText", driver.Value("link"), "a").Click();
      aqUtils.Delay(500);
      aqObject.CheckProperty(page,"URL", cmpContains, driver.Value("linkurl"), CaseSensitive=false);
      common.CloseBrowser();
      driver.Next();  
   }
  
}

function AddToCart(){
      driver1 = DDT.ExcelDriver("D:\\TestComplete\\Webtests\\testdata\\testdata_browsers.xlsx", sheet="browser")
      var i = 0;
      var FolderID = new Array();
      
      while(!driver1.EOF()){
        browser = driver1.Value("browser");
        common.OpenURL(browser,"http://www.practiceselenium.com/");
      
        FolderID[i] = Log.CreateFolder(browser);
        Log.PushLogFolder(FolderID[i]);
        
        var page = Sys.Browser("*").Page("*");
        page.NativeWebObject.Find("contentText", "Menu", "a").Click();
        aqUtils.Delay(1000);
        aqObject.CheckProperty(page,"URL", cmpContains, "menu", CaseSensitive=false);
      
        driver2 = DDT.CSVDriver("D:\\TestComplete\\Webtests\\testdata\\testdata_teacheckout.csv")
      
        while(!driver2.EOF()){
          aqUtils.Delay(500);
          //page.NativeWebObject.Find("class", "*button-content*", "span").Click();
          page.NativeWebObject.Find("contentText", "Check Out", "span").Click();
          aqObject.CheckProperty(page,"URL", cmpContains, "check-out", CaseSensitive=false);
          fillinfo(page,driver2);
          aqUtils.Delay(500);
          aqObject.CheckProperty(page,"URL", cmpContains, "menu", CaseSensitive=false);
          driver2.Next();
        }
        
        common.CloseDataDriver(driver2); //close driver2
        i++;
        Log.PopLogFolder();
        common.CloseBrowser();
        driver1.Next();
      }
       common.CloseDataDriver(driver1); //close driver1
      
}

function fillinfo(page, driver){
     aqUtils.Delay(500);
     page.NativeWebObject.Find("id", "email", "input").SetText(driver.Value("email"));
     page.NativeWebObject.Find("id", "name", "input").SetText(driver.Value("name"));
     page.NativeWebObject.Find("id", "address", "textarea").Keys(driver.Value("address"));
     page.NativeWebObject.Find("id", "card_type", "select").ClickItem(driver.Value("cardtype"));
     page.NativeWebObject.Find("id", "card_number", "input").SetText(driver.Value("cardnum"));
     page.NativeWebObject.Find("id", "cardholder_name", "input").SetText(driver.Value("cardname"));
     page.NativeWebObject.Find("id", "verification_code", "input").SetText(driver.Value("cardcode"));
     
     page.NativeWebObject.Find("contentText", "Place Order", "button").Click();
     
}