package tafIntegration;

import au.com.testpro.framework.java.superclasses.TafJavaScriptLoaderSuperClass;

/**
 * Bootstrap loader script which initialises the Spring container in which the
 * TestPro Automation Framework (TAF) runs when invoking a Java Test Script
 * running environment (JVM).
 * 
 */
public class TafJavaScriptLoader extends TafJavaScriptLoaderSuperClass {

	/**
	 * Starts the TestPro Automation Framework.
	 * 
	 */

	public static void main(String[] args) {
		TafJavaScriptLoader loader = new TafJavaScriptLoader();
		loader.startJavaTestScriptFramework(args);
	}
}
