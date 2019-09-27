package tafIntegration;


import java.util.HashMap;
import java.util.Map;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;

import au.com.testpro.framework.java.superclasses.JavaFrameworkSuperClass;

public abstract class JavaScriptSuperClass extends JavaFrameworkSuperClass {
	
	public static String homeURL;

	public static WebDriver driver;

	public void startBrowser(String browser, String URL) {

		homeURL = URL;

		if (browser.equalsIgnoreCase("FireFox")) {
			driver = new FirefoxDriver();

		} else if (browser.equalsIgnoreCase("Chrome")) {

			ChromeOptions o = new ChromeOptions();
			o.addArguments("disable-extensions");
			o.addArguments("--start-maximized");

			Map<String, Object> prefs = new HashMap<String, Object>();
			prefs.put("credentials_enable_service", false);
			prefs.put("profile.password_manager_enabled", false);
			o.setExperimentalOption("prefs", prefs);

			driver = new ChromeDriver(o);

		} else if (browser.equalsIgnoreCase("Edge")) {
			driver = new EdgeDriver();
		} else { // default
			driver = new InternetExplorerDriver();
		}

		driver.get(URL);

		System.out.println(" use driver in JavaScriptSuperClass");
	}
	
}
