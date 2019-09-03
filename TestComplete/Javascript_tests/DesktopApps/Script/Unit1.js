function Test1()
{
  //Runs the "Orders" tested application.
  TestedApps.Orders.Run();
  Project.Variables.KeywordVariables.Reset();
  for(; !Project.Variables.KeywordVariables.IsEOF();)
  {
    Project.Variables.KeywordVariables.Reset();
    for(; !Project.Variables.KeywordVariables.IsEOF();)
    {
      //Moves the mouse cursor to the menu item specified and then simulates a single click.
      Aliases.Orders.MainForm.MainMenu.Click("Orders|New order...");
      //Selects the KeywordTests.Test1.Variables.KeywordVariables("product") item of the 'ProductNames' combo box.
      Aliases.Orders.OrderForm.Group.ProductNames.ClickItem(Project.Variables.KeywordVariables.Value("product"));
      //Sets the value of the UpDown control 'Quantity' to KeywordTests.Test1.Variables.KeywordVariables("quantity").
      Aliases.Orders.OrderForm.Group.Quantity.wValue = Project.Variables.KeywordVariables.Value("quantity");
      //Sets the date KeywordTests.Test1.Variables.KeywordVariables("date") in the 'Date' date/time picker.
      Aliases.Orders.OrderForm.Group.Date.wDate = Project.Variables.KeywordVariables.Value("date");
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("name") in the 'Customer' text editor.
      Aliases.Orders.OrderForm.Group.Customer.SetText(Project.Variables.KeywordVariables.Value("name"));
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("street") in the 'Street' text editor.
      Aliases.Orders.OrderForm.Group.Street.SetText(Project.Variables.KeywordVariables.Value("street"));
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("city") in the 'City' text editor.
      Aliases.Orders.OrderForm.Group.City.SetText(Project.Variables.KeywordVariables.Value("city"));
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("state") in the 'State' text editor.
      Aliases.Orders.OrderForm.Group.State.SetText(Project.Variables.KeywordVariables.Value("state"));
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("zip") in the 'Zip' text editor.
      Aliases.Orders.OrderForm.Group.Zip.SetText(Project.Variables.KeywordVariables.Value("zip"));
      //The beginning of the Group group
      //The end of the Group group
      if(Project.Variables.KeywordVariables.Value("cardtype") == "Visa")
      {
        //Clicks the 'Visa' button.
        Aliases.Orders.OrderForm.Group.Visa.ClickButton();
      }
      if(Project.Variables.KeywordVariables.Value("cardtype") == "Mastercard")
      {
        //Clicks the 'MasterCard' button.
        Aliases.Orders.OrderForm.Group.MasterCard.ClickButton();
      }
      if(Project.Variables.KeywordVariables.Value("cardtype") == "AE")
      {
        //Clicks the 'AE' button.
        Aliases.Orders.OrderForm.Group.AE.ClickButton();
      }
      //The beginning of the Group group
      //The end of the Group group
      //Enters the text KeywordTests.Test1.Variables.KeywordVariables("cardnum") in the 'CardNo' text editor.
      Aliases.Orders.OrderForm.Group.CardNo.SetText(Project.Variables.KeywordVariables.Value("cardnum"));
      //Sets the date KeywordTests.Test1.Variables.KeywordVariables("expdate") in the 'ExpDate' date/time picker.
      Aliases.Orders.OrderForm.Group.ExpDate.wDate = Project.Variables.KeywordVariables.Value("expdate");
      //Clicks the 'ButtonOK' button.
      Aliases.Orders.OrderForm.ButtonOK.ClickButton();
      Project.Variables.KeywordVariables.Next();
    }
    Project.Variables.KeywordVariables.Next();
  }
  //Closes the 'MainForm' window.
  Aliases.Orders.MainForm.Close();
  //Clicks the 'btnNo' button.
  Aliases.Orders.dlgConfirmation.btnNo.ClickButton();
}