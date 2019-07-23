﻿var common = require("Common");
var datadriver = require("DataDriver");

function TCValidLogin(){
  driver = datadriver.getData("D:\\TestComplete\\SampleStore\\testdata\\validcred.xlsx", sheet="Sheet1");
  //driver = datadriver.getData("D:\\TestComplete\\SampleStore\\testdata\\csv_validcred.csv");
  while(!driver.EOF()){
    InputCredentials(driver.Value("email"), driver.Value("password"));
    verifySuccess(driver.Value("accountname"));
    signOut();
    driver.Next();
  }
}

function TCInvalidLogin(){
  driver = datadriver.getData("D:\\TestComplete\\SampleStore\\testdata\\invalidcred.xlsx", sheet="Sheet1");
  //driver = datadriver.getData("D:\\TestComplete\\SampleStore\\testdata\\csv_invalidcreds.csv");
  while(!driver.EOF()){
    InputCredentials(driver.Value("email"), driver.Value("password"));
    verifyWrongCredentials(driver.Value("errortype"));
    driver.Next();
  }
}

function InputCredentials(email, password){

  Sys.Browser("*").Page("*").NativeWebObject.Find("class", "login", "a").Click();
  
  aqUtils.Delay(3000);
  let page = Sys.Browser("*").Page("*");
  Log.Message(page.contentDocument.title);
  aqObject.CheckProperty(page.contentDocument, "title", cmpContains, "Login - My Store");
  
  //aqUtils.Delay(1000);
  if (email == "{BLANK}") email = "";
  page.NativeWebObject.Find("id", "email", "input").setText(email);
  if (password == "{BLANK}") password = "";
  page.NativeWebObject.Find("id", "passwd", "input").setText(password);
  
  page.NativeWebObject.Find("id", "SubmitLogin", "button").Click();
}

function verifySuccess(accntname){
  
  aqUtils.Delay(3000);
  var page = Sys.Browser("*").Page("*");
  Log.Message(page.contentDocument.title);
  aqObject.CheckProperty(page.contentDocument, "title", cmpContains, "My account - My Store");
  
  aqObject.CheckProperty(page.NativeWebObject.Find("class", "logout", "a") , "contentText", cmpContains, "Sign out");
  
  accntnameobj = (page.NativeWebObject.Find("class", "account", "a")).FindChild("tagName", "span");
  //accntname = "Anna Katrina Gomez" //user account name
  aqObject.CheckProperty(accntnameobj, "contentText", cmpContains, accntname);
  
}

function signOut(){
   var page = Sys.Browser("*").Page("*");
   page.NativeWebObject.Find("class", "logout", "a").Click();
   aqUtils.Delay(3000);
}

function verifyWrongCredentials(errortype){
  aqUtils.Delay(3000);
  var page = Sys.Browser("*").Page("*");

  var alertbox = page.NativeWebObject.Find("class", "alert alert-danger", "div") 
  aqObject.CheckProperty(alertbox.FindChild("tagName", "p"), "contentText", cmpEqual , "There is 1 error");
  errorstatement = {
    "no email":"An email address required.",
    "inv email": "Invalid email address.",
    "no pwd": "Password is required.",
    "wrong cred": "Authentication failed.",
  }
  //errortype = "no email"
  aqObject.CheckProperty(alertbox.FindChild("tagName", "li"), "contentText", cmpEqual, errorstatement[errortype]);

}