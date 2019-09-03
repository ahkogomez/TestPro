function Test2()
{
  //Reads the whole contents of the specified text file. 
  var LastResult;
  LastResult = aqFile.ReadWholeTextFile("D:\\TestProScripts\\TestComplete\\Javascript_tests\\testdata\\notepad_data.csv", aqFile.ctANSI);
  //Runs the "notepad" tested application.
  TestedApps.notepad.Run();
  Project.Variables.Var1.Reset();
  for(; !Project.Variables.Var1.IsEOF();)
  {
    //Clicks the 'wndNotepad' object.
    Aliases.notepad.wndNotepad.Click(32, 43);
    //Moves the mouse cursor to the menu item specified and then simulates a single click.
    Aliases.notepad.wndNotepad.MainMenu.Click("File|Open...");
    //Checks whether the 'WndCaption' property of the Aliases.notepad.dlgOpen object equals 'Open'.
    aqObject.CheckProperty(Aliases.notepad.dlgOpen, "WndCaption", cmpEqual, "Open");
    //Clicks the 'btnCancel' button.
    Aliases.notepad.dlgOpen.btnCancel.ClickButton();
    //Clicks the 'Edit' object.
    Aliases.notepad.wndNotepad.Edit.Click(139, 113);
    //Enters KeywordTests.Test2.Variables.Var1("message") in the 'Edit' object.
    Aliases.notepad.wndNotepad.Edit.Keys(Project.Variables.Var1.Value("message"));
    //Clicks the 'Edit' object.
    Aliases.notepad.wndNotepad.Edit.Click(208, 36);
    //Closes the 'wndNotepad' window.
    Aliases.notepad.wndNotepad.Close();
    //Clicks the 'btnDontSave' button.
    Aliases.notepad.dlgNotepad.Notepad.CtrlNotifySink.btnDontSave.ClickButton();
    Project.Variables.Var1.Next();
  }
}