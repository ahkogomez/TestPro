
function saveQuotes(){
  driver = getdata("D:\\TestComplete\\Webtests\\testdata\\testdata.csv");
  aqFileSystem.DeleteFile("D:\\TestComplete\\Webtests\\testdata\\GIOQuotes.csv");
  
  while (!driver.EOF())
  {    var data = processrow(driver);
       
       OpenURL("https://www.gio.com.au/personal-life-insurance/life-protection-insurance.html");
       GoToLifeQuote();
       FillForm(data);
       GetQuotesData();
       CloseBrowser(); 
       
       driver.Next();
  }
  CloseCSV();
}

function verifyquotes(){
  driver = getdata("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\testdata.csv");
  var quotes = DDT.CSVDriver("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\GIOQuotes.csv");
  while (!driver.EOF())
  {    var data = processrow(driver);
       
       OpenURL("https://www.gio.com.au/personal-life-insurance/life-protection-insurance.html");
       GoToLifeQuote();
       FillForm(data);
       checkquotes(quotes);
       CloseBrowser(); 
       
       driver.Next();
       quotes.Next();
  }
  CloseCSV();
}

function verifyquotessingle(){
  driver = getdata("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\testdata.csv");
  //var quotes = DDT.CSVDriver("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\GIOQuotes.csv");
  while (!driver.EOF())
  {    var data = processrow(driver);
       
       OpenURL("https://www.gio.com.au/personal-life-insurance/life-protection-insurance.html");
       GoToLifeQuote();
       FillForm(data);
       checkquotes(driver);
       CloseBrowser(); 
       
       driver.Next();
  }
  CloseCSV();
}
function getdata(filename){
  if(Project.Variables.Input != null){
    Log.Message("using command line argument")
    return driver = DDT.CSVDriver(Project.Variables.Input);
  }
  else {
    Log.Message("running in test complete")
    return driver = DDT.CSVDriver(filename);
  }
}


function OpenURL(url){
  if(ProjectSuite.Variables.SUITE_BROWSER != null){
    Browsers.Item(ProjectSuite.Variables.SUITE_BROWSER).Run(url);
  }
  else{
    Browsers.Item(btFirefox).Run(url);
  }
  
}


function processrow(driver){
  var line = {};
  line.dod = driver.Value("dod"); 
  var date = new Date(driver.Value("birthday"));
  line.birthday = date.getDate();
 
  const monthnames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  line.birthmonth = monthnames[date.getMonth()];
  line.birthyear = String(date.getFullYear());
  line.gender = driver.Value("gender");
  line.smoking = driver.Value("smoking");
  line.lifecover = driver.Value("lifecover");
  line.coveramount = currencyFormat(driver.Value("lifecoveramount"));
  line.family = driver.Value("familydiscount");
  
  return line;
}

function currencyFormat(num) {
  //from: https://blog.abelotech.com/posts/number-currency-formatting-javascript/
  return '$ ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
 
function GoToLifeQuote(){
  let page = Sys.Browser("*").Page("*");
  let arr = page.EvaluateXPath("//a[contains(text(), 'Get a quote in 30 seconds')]");
   // Check the result 
   if (!strictEqual(arr, null))
   {
     // and click the first element that was found 
    arr[0].Click(); // Note we refer to the array item 
   }
   else 
   { 
     // If nothing was found, post a message to the log 
     Log.Error("Nothing was found.");
   }
    aqUtils.Delay(1000);
   //check if on correct page
   page = Sys.Browser("*").Page("*");
   if (!strictEqual(page.EvaluateXPath("//h1[contains(text(),'Life Protect')]"),null))
   {
     Log.Message("OK!");
   }
   else{
     Log.Error("Not on Life Protect!")
   }
}

function FillForm(data){
  aqUtils.Delay("3000");
  let page = Sys.Browser("*").Page("*");
  let cursor = page.EvaluateXPath("//div[@class='dod-section']//span[contains(text(),\'"+data.dod+"\')]");
  Log.Message(data.dod);
  cursor[0].Click();
  cursor = page.EvaluateXPath("//select[contains(@id,'dateOfBirth_Days')]");
  cursor[0].ClickItem(data.birthday);
  cursor = page.EvaluateXPath("//select[contains(@id,'dateOfBirth_Months')]");
  cursor[0].ClickItem(data.birthmonth);
  cursor = page.EvaluateXPath("//select[contains(@id,'dateOfBirth_Years')]");
  cursor[0].ClickItem(data.birthyear);
  cursor = page.EvaluateXPath("//div[@id='genderButtons']//span[contains(text(),\"" + data.gender +"\")]");
  cursor[0].Click();
  cursor = page.EvaluateXPath("//div[@id='smokerButtons']//span[contains(text(),\"" + data.smoking +"\")]");
  cursor[0].Click();
  cursor = page.EvaluateXPath("//div[@id='coverAmountDefinedButtons']//span[contains(text(),\"" + data.lifecover +"\")]");
  cursor[0].Click();
  
  aqUtils.Delay(100);
  page = Sys.Browser("*").Page("*");
  aqUtils.Delay(100);
  cursor = page.EvaluateXPath("//select[@id='topCoverAmount']");
  Log.Message(data.coveramount);
  cursor[0].Click();
  cursor[0].ClickItem(data.coveramount);
  
  cursor = page.EvaluateXPath("//div[@id='familyDiscountButtons']//span[contains(text(),\"" + data.family +"\")]");
  cursor[0].Click();
  cursor = page.EvaluateXPath("//button[@id='getQuoteBtn']");
  cursor[0].Click();
  aqUtils.Delay(3000);
}
function GetQuotesData(){
  var removeComma = function(str){
        return str.replace(/,/g, '').trim();
  }
  var sPath = "D:\\TestComplete\\Javascript_tests\\testdata\\GIOQuotes.csv"
  
  if (!aqFile.Exists(sPath)){
      aqFile.Create(sPath);
      aqFile.WriteToTextFile(sPath, "cover1,premium1,cover2,premium2,cover3,premium3\n", aqFile.ctANSI, false);
  }

  
  let page = Sys.Browser("*").Page("*");
  for(let x = 0; x < 3; x++){
      let coverid = "coverAmount_"+String(x);
      let premiumid = "premium_"+String(x);
     
      obj = page.NativeWebObject.Find("id", coverid, "div");
      aqFile.WriteToTextFile(sPath, removeComma(obj.FindChild("tagName","strong").contentText)+",", aqFile.ctANSI, false);
      aqFile.WriteToTextFile(sPath, page.NativeWebObject.Find("id", premiumid, "strong").contentText+",", aqFile.ctANSI, false);
  }
  aqFile.WriteToTextFile(sPath, "\n", aqFile.ctANSI, false);
  Log.Message("saving quote done");
  
}

function checkquotes(quotes){
  Log.Message("checking quotes");
  var addComma = function(str){
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  let page = Sys.Browser("*").Page("*");

  var y = 0;
  while(y < 6){
      let coverid = "coverAmount_"+String(y/2);
      let premiumid = "premium_"+String(y/2);
      
      let coverdata = "cover"+String((y/2)+1); //ex. cover1
      let premiumdata = "premium"+String((y/2)+1); //ex. premium1
      //check coveramount
      obj = page.NativeWebObject.Find("id", coverid, "div");
      aqObject.CheckProperty(obj.FindChild("tagName","strong"), "contentText", cmpContains, addComma(quotes.Value(coverdata)));
      
      //check premium amount
      aqObject.CheckProperty(page.NativeWebObject.Find("id", premiumid, "strong"), "contentText", cmpEqual, quotes.Value(premiumdata));
      y = y+2;
  }

}
function CloseBrowser(){
   aqUtils.Delay(1000);
   
   if(ProjectSuite.Variables.SUITE_BROWSER != null){
       Sys.Browser(ProjectSuite.Variables.SUITE_BROWSER).Close();
  }
  else{
    Sys.Browser("*").Close();
  }
   
  
   // Closes the driver
}

function CloseCSV(){

  DDT.CloseDriver(DDT.CurrentDriver.Name);
}

module.exports.OpenURL = OpenURL;
module.exports.getdata = getdata;
module.exports.GoToLifeQuote = GoToLifeQuote;
module.exports.FillForm=FillForm;
module.exports.checkquotes=checkquotes;
module.exports.CloseBrowser=CloseBrowser; 
module.exports.CloseCSV = CloseCSV;
module.exports.processrow = processrow;