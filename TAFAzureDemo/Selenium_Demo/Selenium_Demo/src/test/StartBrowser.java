package test;

import org.junit.Test;

import tafIntegration.JavaScriptSuperClass;

public class StartBrowser extends JavaScriptSuperClass {

	/**
	 * @testpro app="Demo" action="start_browser" 
	 * 			description="start testingautomationframework.com browser session"
	 */

	@Override
	public void execute() {
		// TODO Auto-generated method stub
		try {
			
			setMessage("opening: " + getData("webpage"));
			startBrowser("Chrome", getData("webpage"));

			
		} catch (Exception e) {
			setMessage(" ===== exception occurred in StartBrowser script. \n" + e.toString());
			logStoreException(e);
			e.printStackTrace();
		}

	}
	
	@Test
	public void test() {
		executeCsv("C:\\Demo\\Selenium_Demo\\Selenium_Demo\\openwebpage.csv");
		System.out.println(" startbrowser completed. ");
	}

}
