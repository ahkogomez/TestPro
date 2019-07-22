function main(csvpath){ 
  readCSV(csvpath);
  while (! DDT.CurrentDriver.EOF())
  {    var data = processrow();
       
       OpenURL("https://www.gio.com.au/personal-life-insurance/life-protection-insurance.html");
       GoToLifeQuote();
       FillForm(data);
       CloseBrowser();
       
       DDT.CurrentDriver.Next();
  }
  CloseCSV();
}

function OpenURL(url){
  Browsers.Item(btFirefox).Run(url);
}

function readCSV(csvpath){
  driver = DDT.CSVDriver(csvpath);
}

function processrow(){
  var line = {};
  line.dod = driver.Value(0); 
  var date = new Date(driver.Value(1));
  line.birthday = date.getDate();
 
  const monthnames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  line.birthmonth = monthnames[date.getMonth()];
 
  line.birthyear = String(date.getFullYear());
  
  line.gender = driver.Value(2);
  
  line.smoking = driver.Value(3);
  
  line.lifecover = driver.Value(4);
  
  line.coveramount = currencyFormat(driver.Value(5));
  
  line.family = driver.Value(6);
  
  
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
  let page = Sys.Browser("*").Page("*");
  let cursor = page.EvaluateXPath("//div[@class='dod-section']//span[contains(text(),\'"+data.dod+"\')]",);
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
  cursor = page.EvaluateXPath("//select[@id='topCoverAmount']");
  cursor[0].ClickItem(data.coveramount);
  cursor = page.EvaluateXPath("//div[@id='familyDiscountButtons']//span[contains(text(),'No')]");
  cursor[0].Click();
  cursor = page.EvaluateXPath("//button[@id='getQuoteBtn']");
  cursor[0].Click();
  aqUtils.Delay(5000);
}

function CloseBrowser(){
   aqUtils.Delay(1000);
   Sys.Browser("*").Close();
   // Closes the driver
}

function CloseCSV(){
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}
