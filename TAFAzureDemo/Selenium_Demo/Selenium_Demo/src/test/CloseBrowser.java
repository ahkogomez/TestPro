package test;

import tafIntegration.JavaScriptSuperClass;

public class CloseBrowser extends JavaScriptSuperClass {

	/**
	 * @testpro app="Demo" action="close_browser" 
	 * 			description="close browser  session"
	 */

	@Override
	public void execute() {
		// TODO Auto-generated method stub

		try {
			
			driver.quit();
		} catch (Exception e) {
			setMessage(" ===== exception occurred in Close_Browser script. \n" + e.toString());
			logStoreException(e);
			e.printStackTrace();
		} finally {
			
		}
	}

}
