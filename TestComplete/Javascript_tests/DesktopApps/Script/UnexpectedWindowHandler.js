function EventControl1_OnOverlappingWindow(Sender, Window, OverlappingWindow, LogParams)
{
  try{
    Sys.Process("Orders").WinFormsObject("OrderForm").Activate();
  }
  catch(e){
    Log.Error(e);
  }
}