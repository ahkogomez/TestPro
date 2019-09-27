package guru99.junit;


import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class StartBrowser {
	
	private static WebDriver driver = new ChromeDriver();
	
	@Test
	 public static WebDriver OpenBrowser() {
		 	
			driver.get("https://www.testingautomationframework.com/");
			return driver;
	 }
}
