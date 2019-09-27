package test;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SearchEbayAU extends tafIntegration.JavaScriptSuperClass {
	/**
	 * @testpro app="Demo" action="searchEbayAU" description="search products in ebay"
	 * @since May 2019
	 * @author Anna Gomez
	 */
	public void execute() {
		try {
				String brand = getData("Brand");	
				String product = getData("Product");
				
				driver.manage().window().maximize();
				WebElement element = driver.findElement(By.xpath(" //input[@id='gh-ac']"));
				element.sendKeys(product + "+" + brand + "\n");
				
				Thread.sleep(3000);
				
		} catch (Exception ex) {

			logStoreException(ex);

		} finally {

		}

	}
	
	@Test
	public void test() {
		executeCsv("D:\\Selenium_Demo\\Shopper\\searchebay.csv");	
		System.out.println("search completed. ");
	}
}