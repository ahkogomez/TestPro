var gio = require("TestGIOLife");

function verifyquotessingle(){
  driver = gio.getdata("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\testdata.csv");
  //var quotes = DDT.CSVDriver("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\GIOQuotes.csv");
  while (!driver.EOF())
  {    var data = gio.processrow(driver);
       
       gio.OpenURL("https://www.gio.com.au/personal-life-insurance/life-protection-insurance.html");
       gio.GoToLifeQuote();
       gio.FillForm(data);
       gio.checkquotes(driver);
       gio.CloseBrowser(); 
       
       driver.Next();
  }
  gio.CloseCSV();
}
