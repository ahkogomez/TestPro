package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;

public class Login {

	public static void main(String args[]) {
		
		WebDriver driver = new ChromeDriver();
		driver.get("https://www.testingautomationframework.com/");
		
		//click login
		WebElement element = driver.findElement(By.xpath("//div[@class='execphpwidget']//a[contains(text(),'Login')]"));
		element.click();
		
		WebElement usernameElement = driver.findElement(By.id("username"));
		usernameElement.sendKeys("ahkogomez");
		
		WebElement pwdElement = driver.findElement(By.id("password"));
		pwdElement.sendKeys("sexyback");
		
		driver.findElement(By.name("login")).click();
		
		driver.close();
		
	}
}
