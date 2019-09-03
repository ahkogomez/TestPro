function CloseNotepad(){
//Closes the 'wndNotepad' window.
  Aliases.notepad.wndNotepad.Close();
  //Clicks the 'btnDontSave' button.
  Aliases.notepad.dlgNotepad.Notepad.CtrlNotifySink.btnDontSave.ClickButton();
}