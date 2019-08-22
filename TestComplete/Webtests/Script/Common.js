function OpenURL(browser, url){

  // Launch browser if it is not running
  if (! Sys.WaitBrowser(browser, 5000).Exists)
    Browsers.Item(browser).Run(url);
  else
    Browsers.Item(browser).Navigate(url);
   if(!IsMaximized(Sys.Browser(browser).BrowserWindow(0)))
      Sys.Browser(browser).BrowserWindow(0).Maximize();
}

// Returns True if the specified Window is maximized; otherwise False.
function IsMaximized(Window)
{
    var WS_MAXIMIZED = 0x01000000;
    // Declaring the WinAPI hexadecimal value for the maximized window
    return (Window.WndStyles & WS_MAXIMIZED) == WS_MAXIMIZED;
}
  
function CloseBrowser(){
   aqUtils.Delay(1000);
   Sys.Browser("*").Close();
   // Closes the driver
}

function CloseDataDriver(driver){
  Log.Message("closing: "+ driver.Name);
  DDT.CloseDriver(driver.Name);
}

module.exports.OpenURL = OpenURL;
module.exports.CloseBrowser = CloseBrowser;
module.exports.CloseDataDriver = CloseDataDriver;