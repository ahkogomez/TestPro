//only works with firefox
function AddToCart()
{
  if(Project.Variables.Input != null){
    Log.Message("using command line argument")
    var driver = DDT.CSVDriver(Project.Variables.Input);
  }
  else {
    Log.Message("running in test complete")
    var driver = DDT.CSVDriver("D:\\TestComplete\\Webtests\\testdata\\testdata_bigw.csv");
  }
  
 // browser = driver.Value("browser");
  item = driver.Value("Item")
  OpenURL("firefox", "https://www.bigw.com.au/");
  
  var page = Sys.Browser("*").Page("*");
  page.NativeWebObject.Find("placeholder", "Search bigw.com.au", "input").SetText(item);
  page.NativeWebObject.Find("class", "siteSearchSubmit btn", "button").Click();
  
  aqUtils.Delay(3000);
  
  let cur = page.EvaluateXPath("//div[@class='productSlot']/div[@class='productDescription']/h4/a");
  var title = cur[0].getAttribute("title");
  Log.Message(title);
  
  aqUtils.Delay(100);
  cur[0].Click(); //click first item in search
  
  aqUtils.Delay(2000);
  
  //click add to cart
  page.NativeWebObject.Find("id", "addToCartButton", "button").Click();
  
  //find price (not used yet)
  obj = page.NativeWebObject.Find("class", "priceClass", "span")
  var price = obj.getAttribute("contentText");
  Log.Message(price);
  
  //aqUtils.Delay(2000);
  
  //check if item is in cart
  page.NativeWebObject.Find("class", "minicart", "a").Click();
  aqUtils.Delay(2000);
  var obj = page.NativeWebObject.Find("class", "item-descriptions", "div");
  obj = obj.FindChild("tagName", "a", 2);
  aqObject.CheckProperty(obj, "contentText", cmpEqual, title)
  
  page.NativeWebObject.Find("class", "submitRemoveProduct", "a").Click();
  
  CloseBrowser();
  
  CloseCSV();
  //click first item from search
  //page.NativeWebObject.Find("class", "productSlot", "div").Click();

  //let pcode = obj.getAttribute("data-product-code");
  //Log.Message(pcode);
  //obj.FindChild(["tagName","class"], ["h4", "name"]).Click();
}
function OpenURL(browser, url){
  
  // Launch firefox if it is not running
  if (! Sys.WaitBrowser(browser, 3000).Exists)
    Browsers.Item(browser).Run(url);
  else
    Browsers.Item(browser).Navigate(url);
}

function CloseBrowser(){
   aqUtils.Delay(1000);
   Sys.Browser("*").Close();
   // Closes the driver
}

function CloseCSV(){
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}