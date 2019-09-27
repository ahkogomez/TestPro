package guru99.junit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import guru99.junit.StartBrowser;

public class TestLogin {
	

	WebDriver driver =  StartBrowser.OpenBrowser();
	
	 @Test
	 public void Login() {
			
			//click login
			WebElement element = driver.findElement(By.xpath("//div[@class='execphpwidget']//a[contains(text(),'Login')]"));
			element.click();
			
			WebElement usernameElement = driver.findElement(By.id("username"));
			usernameElement.sendKeys("ahkogomez");
			
			WebElement pwdElement = driver.findElement(By.id("password"));
			pwdElement.sendKeys("sexyback");
			
			driver.findElement(By.name("login")).click();
			
			
	 }
	 
	 @After
	 public void CloseBrowser() {
		 	driver.close();
	 }
	 
	 
	 
}
