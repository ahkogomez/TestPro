function OpenFile (){
  
  
  //Moves the mouse cursor to the menu item specified and then simulates a single click.
  Aliases.notepad.wndNotepad.MainMenu.Click("File|Open...");
  //Checks whether the 'WndCaption' property of the Aliases.notepad.dlgOpen object equals 'Open'.
  aqObject.CheckProperty(Aliases.notepad.dlgOpen, "WndCaption", cmpEqual, "Open");
  //Clicks the 'btnCancel' button.
  Aliases.notepad.dlgOpen.btnCancel.ClickButton();

  //Clicks the 'Edit' object.
  Aliases.notepad.wndNotepad.Edit.Click(139, 113);
  //Enters 'hello world' in the 'Edit' object.
  Aliases.notepad.wndNotepad.Edit.Keys("hello world");
  //Clicks the 'Edit' object.
  Aliases.notepad.wndNotepad.Edit.Click(208, 36);
}