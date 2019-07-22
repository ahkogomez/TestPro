﻿function Main()
{
   if(Project.Variables.Input != null){
    Log.Message("using command line argument")
    var driver = DDT.CSVDriver(Project.Variables.Input);
  }
  else {
    Log.Message("running in test complete")
    var driver = DDT.CSVDriver("D:\\TestComplete\\Javascript_tests\\testdata_orders.csv");
  }
  
  let process = TestedApps.Orders.Run();
  var i = 0;
  var FolderID = new Array();
  
  while (!driver.EOF()){
    
    FolderID[i] = Log.CreateFolder("Row"+i);
    Log.PushLogFolder(FolderID[i]);
    newOrder(process, driver);
    i++;
    Log.PopLogFolder();
    driver.Next();
  }
  
  CloseOrders(process);
  CloseCSV();
  
}

function newOrder(process, driver){
  
  w = Sys.Process("Orders").WinFormsObject("MainForm");
  w.MainMenu.Click("Orders|New order...")
  
  orderform = Sys.Process("Orders").WinFormsObject("OrderForm").WinFormsObject("Group")
  
  let product = driver.Value("product");
  let qty = driver.Value("quantity");
  
  orderform.WinFormsObject("ProductNames").ClickItem(product);
  orderform.WinFormsObject("Quantity").set_Text(qty);
  orderform.WinFormsObject("Date").set_Text(driver.Value("date"));
  orderform.WinFormsObject("Customer").set_Text(driver.Value("name"));
  orderform.WinFormsObject("Street").set_Text(driver.Value("street")); 
  orderform.WinFormsObject("City").set_Text(driver.Value("city")); 
  orderform.WinFormsObject("State").set_Text(driver.Value("state"));
  orderform.WinFormsObject("Zip").set_Text(driver.Value("zip"));
  orderform.WinFormsObject(driver.Value("cardtype")).Click(); //Mastercard or AE
  orderform.WinFormsObject("CardNo").set_Text(driver.Value("cardnum"));
  orderform.WinFormsObject("ExpDate").set_Text(driver.Value("expdate"));
  
  //check

  Log.Message(orderform.WinFormsObject("Price").wText);
  let price = {"MyMoney":100, "FamilyAlbum":80, "ScreenSaver":20}
  aqObject.CheckProperty(orderform.WinFormsObject("Price"),"wText",cmpContains,String(price[product]));
  
  Log.Message(orderform.WinFormsObject("Discount").wText);
  let discount = {"MyMoney":8, "FamilyAlbum":15, "ScreenSaver":10}
  
  if(driver.Value("Quantity") >= 10){  
    aqObject.CheckProperty(orderform.WinFormsObject("Discount"),"wText",cmpContains,String(discount[product]));
    var total =  (price[product] * qty) * ((100 - discount[product])/100)
  }
  else{
    aqObject.CheckProperty(orderform.WinFormsObject("Discount"),"wText",cmpContains,"0");
    var total =  (price[product] * qty)
  }
  
  Log.Message(orderform.WinFormsObject("groupBox1").WinFormsObject("Total").wText);
  aqObject.CheckProperty(orderform.WinFormsObject("groupBox1").WinFormsObject("Total"),"wText",cmpContains,String(total));

  Sys.Process("Orders").WinFormsObject("OrderForm").WinFormsObject("ButtonOK").Click();
}

function CloseOrders(process){
  process.WinFormsObject('MainForm').Close();
  
  let msgBox = process.Window('#32770', 'Confirmation');
  if (msgBox.Exists)
  {
    msgBox.Window('Button', '&No').ClickButton();
  }

  
}
function CloseCSV(){
  DDT.CloseDriver(DDT.CurrentDriver.Name);
}