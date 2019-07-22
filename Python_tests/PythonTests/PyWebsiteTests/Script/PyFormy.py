﻿#browser = "chrome"
def main():
  try:
    driver = DDT.CSVDriver(Project.Variables.Input)
    Log.Message("using command line argument")
  except:
    driver = DDT.CSVDriver("D:\\TestComplete\\Python_tests\\PythonTests\\testdata\\formy_testdata.csv")
    Log.Message("running in test complete")
    
  i = 0;
  FolderID = []
  
  while not driver.EOF():
    global browser 
    browser = driver.Value["browser"]
    
    FolderID.append(Log.CreateFolder(browser));
    Log.PushLogFolder(FolderID[i]);
        
    OpenURL(browser,"https://formy-project.herokuapp.com/form")
    fillup(processrow(driver))
    CheckSuccess()
    CloseBrowser()
    
    i+=1
    Log.PopLogFolder()
    driver.Next()

  CloseCSV();


def OpenURL(browser, url):

  # Launch firefox if it is not running
  if not Sys.WaitBrowser(browser, 5000).Exists:
    Browsers.Item[browser].Run(url)
  else:
    Browsers.Item[browser].Navigate(url)
   
  Sys.Browser("*").BrowserWindow(0).Maximize()


  
def processrow(driver):
 
  line = {}
  line['fname'] = driver.Value["firstname"]
  line['lname'] = driver.Value["lastname"]
  line['job'] = driver.Value["job"] 
  education = {"high school":"radio-button-1", "college":"radio-button-2", "grad school":"radio-button-3"}
  line['educ'] = education[driver.Value["education"]]
  
  if(driver.Value["sex"].lower()=="m"):
      line['sex'] = "checkbox-1"
  elif(driver.Value["sex"].lower()=="f"):
      line['sex'] = "checkbox-2"
  else:
      line['sex']= "checkbox-3"
  
  if(driver.Value["experience"]<= 1):
      line['experience'] = "0-1"
  elif(driver.Value["experience"]<= 4):
      line['experience'] = "2-4"
  elif(driver.Value["experience"]<= 9):
      line['experience'] = "5-9"
  else:
       line['experience'] = "10+"
  
  line['date'] = driver.Value["date"]
  
  return line

def fillup(data):

  page = Sys.Browser("*").Page("*");

  # Find an object that corresponds to the specified criteria
  page.NativeWebObject.Find("id", "first-name", "input").SetText(data['fname']);
  page.NativeWebObject.Find("id", "last-name", "input").SetText(data['lname']);
  page.NativeWebObject.Find("id", "job-title", "input").SetText(data['job']);
  page.NativeWebObject.Find("id", data['educ'], "input").Click();
  page.NativeWebObject.Find("id", data['sex'], "input").Click();
  page.NativeWebObject.Find("id", "select-menu", "select").ClickItem(data['experience']);
  page.NativeWebObject.Find("id", "datepicker", "input").SetText(data['date']);
  page.NativeWebObject.Find("contentText", "Submit", "a").Click();
  if(browser == "edge"):
    page.NativeWebObject.Find("contentText", "Submit", "a").Click();

def CheckSuccess():
  aqUtils.Delay(1000);
  page = Sys.Browser("*").Page("*")
  aqObject.CheckProperty(page,"URL",cmpEqual,"https://formy-project.herokuapp.com/thanks");
  aqUtils.Delay(1000);
  
  if (browser != "iexplore" and browser != "edge"):
    success = page.NativeWebObject.Find("class", "alert alert-success", "div");
    Log.Message(success.innerHTML);
    aqObject.CheckProperty(success, "innerHTML", cmpContains, "The form was successfully submitted!");

def CloseBrowser():
   aqUtils.Delay(1000);
   Sys.Browser("*").Close();
   # Closes the driver


def CloseCSV():
  DDT.CloseDriver(DDT.CurrentDriver.Name);
