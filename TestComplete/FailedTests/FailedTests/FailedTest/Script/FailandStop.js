var common = require("Common");
var datadriver = require("DataDriver");

function FailandWarning(){
  // will pass if logged in
  // will fail and warn if signed-out
  common.OpenURL("firefox", "http://automationpractice.com/index.php");
   let page = Sys.Browser("*").Page("*");
   page.NativeWebObject.Find("contentText", "Women", "a").Click();

   page.NativeWebObject.Find("contentText", "Blouse", "a").Click();
   
   aqUtils.Delay(3000);
   page.NativeWebObject.Find("id", "wishlist_button", "a").Click();
   aqUtils.Delay(3000);
   alertmsg = page.NativeWebObject.Find("class", "fancybox-error", "p");
   aqObject.CheckProperty(alertmsg, "contentText", cmpEqual, "Added to your wishlist.");
   
   Browsers.Item("firefox").Navigate("http://automationpractice.com/index.php?fc=module&module=blockwishlist&controller=mywishlist");
   CheckTable();
   
   
}

function CheckTable(){
  var page = Sys.Browser("*").Page("*");

  var table = page.FindChild("tagName", "table", 10);
  if (table.Exists)
  {
    // Goes through the rows and cells of the table
    for (var i = 0; i < table.rows.length; i++)
    {
      Log.AppendFolder("Row " + i);
      for (var j = 0; j < table.rows.item(i).cells.length; j++)
        Log.Message("Cell " + j + ": " + table.rows.item(i).cells.item(j).innerText);
      Log.PopLogFolder();
    }
  }
  else
    Log.Warning("The table was not found");

}