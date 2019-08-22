function main()
{
  if(Project.Variables.Input != null){
    Log.Message("using command line argument")
    var driver = DDT.CSVDriver(Project.Variables.Input);
  }
  else {
    Log.Message("running in test complete")
    var driver = DDT.CSVDriver("D:\\TestProScripts\\TestComplete\\Webtests\\testdata\\formy_testdata.csv");
  }
    
  var i = 0;
  var FolderID = new Array();
  
  while (!driver.EOF()) 
  {     browser = driver.Value("browser");

        FolderID[i] = Log.CreateFolder(browser);
        Log.PushLogFolder(FolderID[i]);
        
        OpenURL(browser,"https://formy-project.herokuapp.com/form");
        fillup(processrow(driver));
        CheckSuccess();
        CloseBrowser(browser);
        
        i++;
        Log.PopLogFolder();
        driver.Next();

  }
  CloseCSV();
}

function OpenURL(browser, url){

  // Launch firefox if it is not running
  if (! Sys.WaitBrowser(browser, 5000).Exists)
    Browsers.Item(browser).Run(url);
  else
    Browsers.Item(browser).Navigate(url);
   
   Sys.Browser().BrowserWindow(0).Maximize();
}

function processrow(driver){
 
  var line = {};
  line.fname = driver.Value("firstname");
  line.lname = driver.Value("lastname"); 
  line.job = driver.Value("job"); 
  education = {"high school":"radio-button-1", "college":"radio-button-2", "grad school":"radio-button-3"};
  line.educ = education[driver.Value("education")];
  
  if(String(driver.Value("sex")).toLowerCase()=="m")
      line.sex = "checkbox-1";
  else if(String(driver.Value("sex")).toLowerCase()=="f")
      line.sex = "checkbox-2";
  else
      line.sex = "checkbox-3";
  
  if(driver.Value("experience")<= 1)
      line.experience = "0-1";
  else if(driver.Value("experience")<= 4)
      line.experience = "2-4";
  else if(driver.Value("experience")<= 9)
      line.experience = "5-9";
  else
       line.experience = "10+";
  
  line.date = driver.Value("date");
  
  return line;
}
function fillup(data)
{
  var page = Sys.Browser("*").Page("*");

  // Find an object that corresponds to the specified criteria
  page.NativeWebObject.Find("id", "first-name", "input").SetText(data.fname);
  page.NativeWebObject.Find("id", "last-name", "input").SetText(data.lname);
  page.NativeWebObject.Find("id", "job-title", "input").SetText(data.job);
  page.NativeWebObject.Find("id", data.educ, "input").Click();
  page.NativeWebObject.Find("id", data.sex, "input").Click();
  page.NativeWebObject.Find("id", "select-menu", "select").ClickItem(data.experience);
  page.NativeWebObject.Find("id", "datepicker", "input").SetText(data.date);
  page.NativeWebObject.Find("contentText", "Submit", "a").Click();
  if(browser == "edge"){
    page.NativeWebObject.Find("contentText", "Submit", "a").Click();
  }
  
}

function CheckSuccess(){
  aqUtils.Delay(1000);
  var page = Sys.Browser("*").Page("*");
  aqObject.CheckProperty(page,"URL",cmpEqual,"https://formy-project.herokuapp.com/thanks");
  aqUtils.Delay(1000);
  if (browser != "iexplore" && browser != "edge"){
    var success = page.NativeWebObject.Find("class", "alert alert-success", "div");
    Log.Message(success.innerHTML);
    aqObject.CheckProperty(success, "innerHTML", cmpContains, "The form was successfully submitted!");
  }
  
 // if(browser == "edge" || browser == "iexplore"){
 //   aqObject.CheckProperty(success, "innerText", cmpContains, "The form was successfully submitted!");
 // }
}
function CloseBrowser(browser){
   aqUtils.Delay(1000);
   Sys.Browser(browser).Close();
   // Closes the driver
}

function CloseCSV(){
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}